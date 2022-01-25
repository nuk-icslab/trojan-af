const Http2Req = require("./http2_req");
const color = require("irc-colors");

module.exports = {
  name: "nrf",
  param: "{NRF URI}",
  description: "Retrieve services of NFs from NRF.",
  action: async (irc_log, args) => {
    if (args.length !== 1) {
      irc_log(color.red("Wrong parameter"));
      return;
    }

    try {
      irc_log("Quering services of NFs from NRF...");
      const nrf_req = new Http2Req(args[0]);
      let nrf_data = await nrf_req.request("/nnrf-nfm/v1/nf-instances");
      nrf_data = JSON.parse(nrf_data);

      for (let link of nrf_data["_links"]["items"]) {
        let path_regex = new RegExp("/nnrf-nfm.+", "g");
        let path = link["href"].match(path_regex)[0];
        let nf_data = await nrf_req.request(path);
        nf_data = JSON.parse(nf_data);

        irc_log(
          color.bold(`${nf_data["nfType"]} (${nf_data["nfInstanceId"]})`)
        );

        for (let e of nf_data["nfServices"]) {
          for (let ip of e["ipEndPoints"]) {
            let version = e["versions"][0]["apiVersionInUri"];
            let uri = `${e["scheme"]}://${ip["ipv4Address"]}:${ip["port"]}`;
            irc_log(
              `\t${e["nfServiceStatus"]} ${uri}/${e["serviceName"]}/${version}`
            );
          }
        }
      }
    } catch (error) {
      irc_log(color.red(error));
    }
  },
};
