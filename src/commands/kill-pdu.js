module.exports = {
  name: "kill-pdu",
  param: "{SMF URI} [smContextRef]",
  description: "Release the SM context form SMF.",
  action: (irc_log, args) => {
    irc_log("Releasing SM context...");
  },
};
