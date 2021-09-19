//GETRANDOMINT

module.exports = {
    name: 'capitalise',
    usage: 'capitalise [message]',
    requiresArgs: true,
    execute(msg, args, client) {
        var chars = [];
        var final = "";
        for (var i = 0; i < args.length; i++) {
            buffer = "";
            chars = args[i].split("");
            for (var j = 0; j < chars.length; j++) {
                charCase = getRandomInt(2) + 1;
                if (charCase == 1) {
                    buffer += chars[j].toLowerCase();
                } else {
                    buffer += chars[j].toUpperCase();
                }
            }
            final += buffer + " ";
        }
        msg.channel.send(final);
    },
};

function toCrazyCase(body) {
    var chars = body.split("");
    var newChars = [];
    for (var j = 0; j < chars.length; j++) {
        charCase = Math.floor(Math.random() * Math.floor(max)) + 1;
        if (charCase == 1) {
            newChars.push(chars[j].toLowerCase());
        } else {
            newChars.push(chars[j].toUpperCase());
        }
    }
    message = newChars.join("");
    return message;
}