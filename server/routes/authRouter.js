require("dotenv").config()
const Router = require("express")
const User = require("../models/User")
const router = new Router()
const bcrypt = require("bcrypt")
const {check,validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")

const log = require("../log/log")

// middleware

const authMiddleware = require("../middleware/authMiddleware/authMiddleware")

router.post("/sign-in", 
    [
        check("email" , "Uncorrect email").isEmail(),
        check("password", "Password must be at least 8 symbols").isLength({min:8})
    ],
    async (req,res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()){
            log.Error(...errors)
        }

        const {email,password} = req.body

        const user = await User.findOne({email})

        if (user) {
            log.Error(`user can't be crated : user ${email} already exist`);
            return res.status(400).json({ message : `user can't be crated : user ${email} already exist` })
        }

        const hashedPassword = await bcrypt.hash(password,3)

        const newUser = new User({email : email, password : hashedPassword})
        await newUser.save()

        log.Info(`user ${email} was created`);
        return res.json({message : `user ${email} was created`})
        
    } catch (e) {
        log.Error(e)
        res.send({message : `server error : ${e}`})
    }
})

router.get("/auth", authMiddleware, async (req,res) => {
    try {
        const user = await User.findOne({id : req.user.id})

        console.log("okk")

        const token = jwt.sign({id : user.id,email : user.email},process.env.secretKey,{expiresIn: "30d"})

        log.Info(`user ${user.id} successfully logged in`)

        return res.json({
            token,
            user : {
                id : user.id,
                email: user.email,
                diskSpace : user.diskSpace,
                usedSpace : user.usedSpace,
                avatar : user.avatar
            }
        })
    } catch (e) {
        log.Error(`wasn't able to log in : ${e}`)
        res.send({message : `wasn't able to log in : ${e}`})
    }
})


router.post("/login", async (req,res) => {
    try {

        const {email,password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            log.Error(`user with email ${email} doesn't exist`)
            return res.status(404).json({ message : `user with email ${email} doesn't exist` })
        }

        const passwordIsCorrect = await bcrypt.compareSync(password,user.password)

        if (!passwordIsCorrect) {
            log.Error("wrong password")
            return res.status(404).json({message : "wrong password"})
        }

        const token = jwt.sign({id : user.id,email : user.email},process.env.secretKey,{expiresIn: "30d"})

        log.Info(`user ${email} successfully logged in`)

        return res.json({
            token,
            user : {
                id : user.id,
                email: user.email,
                diskSpace : user.diskSpace,
                usedSpace : user.usedSpace,
                avatar : user.avatar
            }
        })

    } catch (e) {
        log.Error(`wasn't able to log in : ${e}`)
        res.send({message : `wasn't able to log in : ${e}`})
    }
})

// TODO : add auth middleware
router.delete("/delete-user", authMiddleware, async (req,res) => {
    try {

        const {email} = req.body

        await User.findOneAndDelete({email})

        // TODO : delete all files related to this user

        log.Info(`user ${email} was deleted`)

        return res.status(200).json(`user ${email} was deleted`)



    } catch (e) {
        log.Error(`wasn't able to delete user : ${e}` )
        res.send({message : `wasn't able to delete user : ${e}`})
    }
})

router.put("/change-email", authMiddleware, async (req,res) => {
    try {

        const {oldEmail,newEmail,password} = req.body

        const user = await User.findOne({email: oldEmail})

        if (!user) {
            log.Error(`email can't be changed : user ${oldEmail} doesn't exist`)
            return res.status(404).json({ message : `email can't be changed : user ${oldEmail} doesn't exist` })
        }

        const passwordsMatch = await bcrypt.compareSync(password,user.password)


        if (!passwordsMatch) {
            log.Error(`email can't be changed : passwords doesn't match with user ${oldEmail}`)
            return res.status(404).json({ message : `email can't be changed : passwords doesn't match with user ${oldEmail}` })
        }

        user.email = newEmail

        await user.save()

        log.Info(`email was changed from ${oldEmail} to ${newEmail}`)
        return res.status(200).json("email was changed")

    } catch (e) {
        log.Error(`wasn't able to change the email : ${e}` )
        res.send({message : `wasn't able to change the email : ${e}`})
    }
})

router.put("/change-password",authMiddleware, async (req,res) => {
    try {

        const {email,oldPassword,newPassword} = req.body

        const user = await User.findOne({email})

        if (!user) {
            log.Error(`password can't be changed : user ${email} doesn't exist`)
            return res.status(404).json({ message : `password can't be changed : user ${email} doesn't exist` })
        }

        const passwordsMatch = await bcrypt.compareSync(oldPassword,user.password)

        if (!passwordsMatch) {
            log.Error(`password can't be changed : passwords doesn't match with user ${email}`)
            return res.status(404).json({ message : `password can't be changed : passwords doesn't match with user ${email}` })
        }

        user.password = newPassword
        await user.save()

        log.Info(`user ${email} changed the password`)
        return res.status(200).json("password was changed")


    } catch (e) {
        log.Error(`wasn't able to change the password : ${e}` )
        res.send({message : `wasn't able to change the password : ${e}`})
    }
})

module.exports = router