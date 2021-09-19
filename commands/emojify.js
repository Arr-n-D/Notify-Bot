module.exports = {
    name: 'emojify',
    usage: 'emojify [string]',
    requiresArgs: true,
    execute(msg, args) {
        var str = args.join(" ");
        arg = str.toLowerCase();
        str = arg;
        var chars = str.split("");
        str = "";
        for (i = 0; i < chars.length; i++) {
            if (chars[i] === " ") {
                str = str + "  ";
            } else {
                str = str + ":regional_indicator_" + chars[i] + ":";
            }
        }
        msg.channel.send(str);
    },
};