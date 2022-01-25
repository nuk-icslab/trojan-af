const os = require("os");
const config = require("./config");
const channel = config.irc.channel;
const prefix = config.prefix;

var commands = {};

commands["help"] = async (irc, args) => {
  let msg =
    "List of available commands:\n" +
    `${prefix}help : Show this message.\n` +
    `${prefix}iface : List the interfaces of this host.\n` +
    `${prefix}nmap {hosts} [ports] : Scan the subnet.\n` +
    `${prefix}nrf  : Retrieve services of NFs from NRF.\n` +
    `${prefix}kill-pdu {SMF URI} [smContextRef] : Release the SM context form SMF.` +
    `${prefix}exec {command} [args] : Run the command in a shell.`;
  irc.say(channel, msg);
};
commands["iface"] = async (irc, args) => {
  const interfaces = os.networkInterfaces();
  let msg = `Interfaces of ${os.hostname()}:\n`;
  for (let name in interfaces) {
    msg += `${name}\n`;
    for (let addr of interfaces[name]) {
      msg += `\t${addr.mac} ${addr.cidr}\n`;
    }
  }
  irc.say(channel, msg);
};
commands["nmap"] = async (irc, args) => {
  irc.say(channel, "Scanning hosts...");
};
commands["nrf"] = async (irc, args) => {
  irc.say(channel, "Quering services of NFs from NRF...");
};
commands["kill-pdu"] = async (irc, args) => {
  irc.say(channel, "Releasing SM context...");
};
commands["exec"] = async (irc, args) => {
  irc.say(channel, "Executing command...");
};

module.exports = commands;
