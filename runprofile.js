var readlineSync = require('readline-sync');
module.exports = function(component, callback) {
  console.log("running:", component);
  readlineSync.question('');
  callback();
};
