var path = require("path");
    npmString = (function(p, path) {
      if (p.platform === "win32") {
        console.log("Boostrapping 'npm' command for windows");
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
    }(process, path)),
    httpServerString = (function(p, path) {
      if (p.platform === "win32") {
        console.log("Boostrapping 'http-server' command for windows");
        return "http-server.cmd";
      }
      return "http-server";
    }(process, path)),
    gruntString = (function(p, path) {
      if (p.platform === "win32") {
        console.log("Boostrapping 'grunt' command for windows");
        return "grunt.cmd";
      }
      return "grunt";
    }(process, path)),
    gulpString = (function(p, path) {
      if (p.platform === "win32") {
        console.log("Boostrapping 'gulp' command for windows");
        return "gulp.cmd";
      }
      return "gulp";
    }(process, path));

module.exports = {
  npm: npmString,
  grunt: gruntString,
  bower: bowerString,
  httpserver: httpServerString,
  gulp: gulpString
};
