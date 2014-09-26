/**
 * generic function for performing "things" on "components"
 */
module.exports = function componentWork(data, processor, oncomplete) {
  var components = require("./components");

  var found = [];
  Object.keys(data).forEach(function(key) {
    if(data[key]) { found.push(key); }
  });

  var componentlist = []
  Object.keys(components).forEach(function(cat) {
    Object.keys(components[cat]).forEach(function(repo) {
      if(found.indexOf(repo) > -1) {
        componentlist.push(components[cat][repo]);
      }
    });
  });

  (function process() {
    if(componentlist.length === 0) {
      return setTimeout(oncomplete, 1);
    }
    var component = componentlist.splice(0,1)[0];
    processor(component, process);
  }());

};
