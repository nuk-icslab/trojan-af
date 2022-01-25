const os = require("os");

module.exports = {
  name: "iface",
  param: "",
  description: "List the interfaces of this host.",
  action: (irc_log, args) => {
    const interfaces = os.networkInterfaces();
    let msg = `Interfaces of ${os.hostname()}:\n`;
    for (let name in interfaces) {
      msg += `${name}\n`;
      for (let addr of interfaces[name]) {
        msg += `\t${addr.mac} ${addr.cidr}\n`;
      }
    }
    irc_log(msg);
  },
};
