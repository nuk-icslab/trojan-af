const nmap = require("libnmap");

module.exports = {
  name: "nmap",
  param: "{hosts} [ports]",
  description: "Scan the subnet.",
  action: async (irc_log, args) => {
    if (args.length < 1 || args.length > 2) {
      irc_log("Argument error");
      return;
    }
    let opts = {};
    if (args.length == 2) {
      opts["range"] = [args[0]];
      opts["ports"] = args[1];
    } else {
      opts["range"] = [args[0]];
    }
    irc_log(`Scanning hosts ${opts["range"]}...`);
    nmap.scan(opts, (err, report) => {
      if (err) {
        irc_log(`[ERROR] ${JSON.stringify(err)}`);
        return;
      }
      let msg = "";
      for (let block in report) {
        let hosts = report[block]["host"] || [];
        for (let host of hosts) {
          msg += `${host["address"][0]["item"]["addr"]}\n\t`;
          let ports = host["ports"][0]["port"] || [];
          for (let port of ports) {
            if (port["state"][0]["item"]["state"] !== "closed") {
              msg += `${port["item"]["protocol"]}/${port["item"]["portid"]} `;
            }
          }
          msg += "\n";
        }
      }
      irc_log(msg);
    });
  },
};
