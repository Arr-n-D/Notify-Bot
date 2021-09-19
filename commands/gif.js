var giphy = require('giphy-api')();
module.exports = {
    name: 'gif',
    usage: 'gif [tags]',
    requiresArgs: true,
    execute(msg, args, client) {
        term = args.join("+");
        giphy.search(term).then(function(res) {
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            };
            itemNumber = getRandomInt(res.pagination.count);
            url = res.data[itemNumber].url;
            msg.channel.send(url);
        });
    },
};