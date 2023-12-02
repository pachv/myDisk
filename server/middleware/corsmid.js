function cors(req, res, next) {
    res.headers("Access-Control-Allow-Origin", "*");
    res.headers("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.headers("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
}

module.exports = cors