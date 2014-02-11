/**
 * replace the "localhost" entries in all
 * environments with the actual AWS hostname
 */

var fs = require("fs");

module.exports = function(hostname) {

  var files = [
    "goggles.webmaker.org/.env",
    "login.webmaker.org/.env",
    "make-valet/.env",
    "MakeAPI/.env",
    "popcorn.webmaker.org/lib/default-config.js",
    "thimble.webmaker.org/.env",
    "webmaker-profile/env.json",
    "webmaker-profile-service/.env",
    "webmaker.org/env.json"
  ];

  (function replaceHost() {
    var file = files.splice(0,1)[0];
    fs.readFile(file, 'utf8', function (err,data) {
      if (err) { return console.log(err); }
      var result = data.replace(/localhost/g, hostname);
      fs.writeFile(file, result, 'utf8', function (err) {
        if (err) return console.log(err);
        if (files.length > 0) { replaceHost(); }
      });
    });
  }());
};
