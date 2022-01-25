const { spawn } = require("child_process");
const color = require("irc-colors");

module.exports = {
  name: "exec",
  param: "{command} [args]",
  description: "Run the command in a shell.",
  action: (irc_log, args) => {
    if (args.length < 1) {
      irc_log("Please input the command");
      return;
    }
    irc_log(`Executing command ${args.join(" ")}...`);
    const cmd_name = args[0];
    const cmd_args = args.slice(1);
    const cmd = spawn(cmd_name, cmd_args);
    cmd.stdout.on("data", (data) => {
      irc_log(`[stdout] ${data}`);
    });

    cmd.stderr.on("data", (data) => {
      irc_log(`[stderr] ${data}`);
    });

    cmd.on("error", (error) => {
      irc_log(`[error] ${error.message}`);
    });

    cmd.on("close", (code) => {
      irc_log(color.green(`Child process exited with code ${code}`));
      irc_log("Done");
    });
  },
};
