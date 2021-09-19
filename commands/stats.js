function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}
module.exports = {
    name: 'stats',
    usage: 'stats',
    requiresArgs: false,
    execute(msg, args, client) {
        const { startTime } = require("../data/startTime.json");
        var d = new Date();
        var timeNow = d.getTime();
        var uptime = timeNow - startTime;
        const commandCount = client.commands.map(c => c.name);
        msg.channel.send("**Client Uptime**\n`" + msToTime(uptime) + "`\n**Command Count**\n`" + commandCount.length + "`");
    },
};