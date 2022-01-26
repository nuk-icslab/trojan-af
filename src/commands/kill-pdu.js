const Http2Req = require("./http2_req");
const color = require("irc-colors");

module.exports = {
  name: "kill-pdu",
  param: "{SMF URI} [smContextRef]",
  description: "Release the SM context form SMF.",
  action: async (irc_log, args) => {
    if (args.length < 1 || args.length > 2) {
      irc_log(color.red("Wrong parameter"));
      return;
    }

    let lb = 1;
    let ub = 20;
    if (args.length == 2) {
      lb = parseInt(args[1]);
      ub = lb;
    }

    const smf_req = new Http2Req(args[0]);
    for (let i = lb; i <= ub; i++) {
      irc_log(`Releasing SM context ${i}...`);

      let path = `/nsmf-pdusession/v1/sm-contexts/${i}/release`;
      try {
        let smf_data = await smf_req.request(path, "POST");
        if (!smf_data) {
          irc_log(color.green(`Successfully released SM context ${i}`));
        } else {
          smf_data = JSON.parse(smf_data);
          if ("error" in smf_data && smf_data["error"]["status"] == "404") {
            irc_log(color.gray(`SM context ${i} not found`));
          } else {
            throw smf_data;
          }
        }
      } catch (err) {
        irc_log(color.red(`[error] ${JSON.stringify(err)}`));
      }
    }
  },
};
