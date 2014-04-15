var fs = require("fs");

if (!fs.existsSync(".progress")) {
  fs.writeFileSync(".progress", '');
}

module.exports = {
  getCurrent: function() {
    return fs.readFileSync(".progress").toString();
  },
  mark: function(repoName, state) {
    fs.writeFileSync(".progress", repoName + ":" + state);
  },
  finish: function() {
    fs.writeFileSync(".progress", "installed");
  },
  reset: function() {
    fs.writeFileSync(".progress", '');
  }
};
