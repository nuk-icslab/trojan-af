const config = require("./config");
const prefix = config.prefix;

const iface_cmd = require("./commands/iface");
const nmap_cmd = require("./commands/nmap");
const nrf_cmd = require("./commands/nrf");
const kill_pdu_cmd = require("./commands/kill-pdu");
const exec_cmd = require("./commands/exec");

var commands = {};
var usages = {};
const help_cmd = {
  name: "help",
  param: "",
  description: "Show this message.",
  action: async (irc_log, args) => {
    let msg = "List of available commands:\n";
    for (let name in usages) {
      msg += `\t${usages[name]}\n`;
    }
    irc_log(msg);
  },
};

function register_command(cmd) {
  commands[cmd.name] = cmd.action;
  usages[cmd.name] = `${prefix}${cmd.name} ${cmd.param} : ${cmd.description}`;
}

register_command(help_cmd);
register_command(iface_cmd);
register_command(nmap_cmd);
register_command(nrf_cmd);
register_command(kill_pdu_cmd);
register_command(exec_cmd);

module.exports = commands;
