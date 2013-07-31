var path = require("path");
    npmString = (function(p, path) {
      if (p.platform === "win32") {
        console.log("Boostrapping 'npm' commands for windows");
        return "npm.cmd";
      }
      return "npm";
    }(process, path)),
    bowerString = (function(p, path) {
      if (p.platform === "win32") {
        console.log("Boostrapping 'bower' command for windows");
        return "bower.cmd";
      }
      return "bower";
    }(process, path));

module.exports = {
  npm: npmString,
  bower: bowerString
};
