var path = require("path");
    npmString = (function(p, path) {
      if (p.platform === "win32") {
        console.log("Boostrapping 'npm' commands for windows");
        return "npm.cmd";
      }
      return "npm";
    }(process, path));
module.exports = npmString;
