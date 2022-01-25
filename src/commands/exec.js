
module.exports = {
  name: "exec",
  param: "{command} [args]",
  description: "Run the command in a shell.",
  action: (irc_log, args) => {
    irc_log("Executing command...");
  },
};
