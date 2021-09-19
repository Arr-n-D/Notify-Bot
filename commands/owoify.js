const owoify = require('owoify-js').default;
module.exports = {
    name: 'owoify',
    usage: 'owoify [message]',
    requiresArgs: true,
    execute(msg, args, client) {
        var response = owoify(args.join(" "));
        msg.channel.send(response);
    },
};