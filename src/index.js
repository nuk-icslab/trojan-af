const irc = require("irc");
const config = require("./config");
const commands = require("./command");
const prefix = new RegExp(`^${config.prefix}(\\S+)`);

var client = new irc.Client(config.irc.server, config.irc.nick, {
  channels: [config.irc.channel],
});

client.addListener("error", function (message) {
  console.log("error: ", message);
});

client.addListener("message", async function (from, to, message) {
  if (!prefix.test(message)) return;
  let command = message.match(prefix)[1];
  if (command in commands) {
    let args = message.split(" ").slice(1);
    console.log(`${from} => ${to}: ${command} ${args}`);
    commands[command](client, args);
    //client.say(config.irc.channel, `Done`);
  }
});
