const os = require("os");
const nmap = require("libnmap");
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
commands["iface"] = (irc, args) => {
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
commands["nmap"] = function (irc, args) {
  if (args.length < 1 || args.length > 2) {
    irc.say(channel, "Argument error");
    return;
  }
  let opts = {};
  if (args.length == 2) {
    opts["range"] = [args[0]];
    opts["ports"] = args[1];
  } else {
    opts["range"] = [args[0]];
  }
  irc.say(channel, `Scanning hosts ${opts["range"]}...`);
  nmap.scan(opts, (err, report) => {
    if (err) {
      irc.say(channel, `[ERROR] ${JSON.stringify(err)}`);
      return;
    }
    let msg = "";
    for (let block in report) {
      let hosts = report[block]["host"] || [];
      for (let host of hosts) {
        msg += `${host["address"][0]["item"]["addr"]}\n\t`;
        let ports = host["ports"][0]["port"] || [];
        for (let port of ports) {
          msg += `${port["item"]["protocol"]}/${port["item"]["portid"]} `;
        }
        msg += "\n";
      }
    }
    irc.say(channel, msg);
  });
};
commands["nrf"] = (irc, args) => {
  irc.say(channel, "Quering services of NFs from NRF...");
};
commands["kill-pdu"] = (irc, args) => {
  irc.say(channel, "Releasing SM context...");
};
commands["exec"] = (irc, args) => {
  irc.say(channel, "Executing command...");
};

module.exports = commands;
