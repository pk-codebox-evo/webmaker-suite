var fs = require("fs");

module.exports = function(processName) {
  var filename = "." + (processName || "progress");

  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, '');
  }

  return {
		getCurrent: function() {
			return fs.readFileSync(filename).toString();
		},

		mark: function(repoName, state) {
			fs.writeFileSync(filename, repoName + ":" + state);
		},

		finish: function() {
			fs.writeFileSync(filename, "installed");
		},

		reset: function() {
			fs.writeFileSync(filename, '');
		},

		clear: function() {
			fs.unlinkSync(filename);
		}
  };
};
