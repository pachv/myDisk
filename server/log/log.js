class Log {

    //colors

    // const Reset = "\x1b[0m"
    // const Bright = "\x1b[1m"
    // const Dim = "\x1b[2m"
    // const Underscore = "\x1b[4m"
    // const Blink = "\x1b[5m"
    // const Reverse = "\x1b[7m"
    // const Hidden = "\x1b[8m"
    //
    // const FgBlack = "\x1b[30m"
    // const FgRed = "\x1b[31m"
    // const FgGreen = "\x1b[32m"
    // const FgYellow = "\x1b[33m"
    // const FgBlue = "\x1b[34m"
    // const FgMagenta = "\x1b[35m"
    // const FgCyan = '\x1b[36m'
    // const FgWhite = "\x1b[37m"
    // const FgGray = "\x1b[90m"

    static debugMode = false

    _addZeroIfNeeded(number) {
        return number > 10 ? number : "0" + number.toString()
    }

    __getDate() {
        const date = new Date()
        return `${this._addZeroIfNeeded(date.getDate())}/${this._addZeroIfNeeded(date.getMonth()+1)}/${date.getFullYear()} - ${this._addZeroIfNeeded(date.getHours())}:${this._addZeroIfNeeded(date.getMinutes())}:${this._addZeroIfNeeded(date.getSeconds())}`
    }

    Info (msg) {
        console.log("\x1b[35m\x1b[34m",`[${this.__getDate()}] Info ~ ${msg}`,"\x1b[0m")
    }

    Warn(msg) {
        console.log("\x1b[31m\x1b[2m",`[${this.__getDate()}] Warn ~ ${msg}`,"\x1b[0m")
    }

    Error(err) {
        console.log("\x1b[33m",`[${this.__getDate()}] Error ~ ${err}`,"\x1b[0m")
    }

    Debug(msg) {
        if (process.env.mode === "debug")
            console.log("\x1b[32m",`[${this.__getDate()}] Debug : ${msg}`,"\x1b[0m")
    }
}

module.exports = new Log()