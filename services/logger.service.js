const fs = require('fs')

const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

//define the time format
function getTime() {
    let now = new Date();
    return now.toUTCString();
}

function doLog(line, level = 'Debug') {
    line = `${getTime()} - ${level} - ${line}`
    const content = fs.readFileSync('./logs/log.log')
    fs.writeFileSync('./logs/log.log', content + '\n' + line)
}

module.exports = {
    debug(line) {
        // doLog(line, "Debug")
        console.log(line, 'Debug')
    },
    info(line) {
        console.log(line, "Info")
        // doLog(line, "Info")
    },
    warn(line) {
        console.log(line, "Warn")
        // doLog(line, "Warn")
    },
    error(line) {
        console.log(line, "Error")
        // doLog(line, "Error")
    }
}