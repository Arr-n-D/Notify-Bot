module.exports = {
  name: "register",
  usage: "lmgtfy [search]",
  requiresArgs: true,
  execute(msg, args, client) {
    var url = "https://lmgtfy.app/?q=";
    url = url + args.join("+");
    msg.channel.send(url);
  },
};
