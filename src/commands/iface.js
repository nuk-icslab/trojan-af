const os = require("os");
const color = require("irc-colors");

module.exports = {
  name: "iface",
  param: "",
  description: "List the interfaces of this host.",
  action: (irc_log, args) => {
    const interfaces = os.networkInterfaces();
    irc_log(color.olive(`Interfaces of ${os.hostname()}:`));
    for (let name in interfaces) {
      irc_log(color.bold(`${name}`));
      for (let addr of interfaces[name]) {
        irc_log(`\t${addr.mac} ${addr.cidr}`);
      }
    }
  },
};
