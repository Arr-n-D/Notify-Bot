module.exports = {
    name: 'ping',
    usage: 'ping',
    requiresArgs: false,
    execute(msg, args) {
        var d = new Date
        start = d.getTime();
        msg.channel.send("Ping!").then((sentMessage) => {
            var d = new Date
            end = d.getTime();
            res = end - start;
            sentMessage.edit("Pong! `" + res + "ms` 🏓");
        });
    },
};