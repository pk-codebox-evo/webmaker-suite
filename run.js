console.log("\n=======================================");
console.log("Starting all apps in the Webmaker suite");
console.log("=======================================");

var spawn = require("child_process").spawn,
    repos = require("./lib/repos")();

Object.keys(repos).forEach(function (appName) {
  var app = repos[appName];
  if (app.run) {
    var args = app.run.split(' ');
    cmd = args.splice(0,1)[0];
    console.log("> "+app.run + " ("+appName+")");
    process.chdir(appName);
    var sp = spawn(cmd, args);
    process.chdir("..");
    app.process = sp;
    sp.stdout.on('data', function (data) { console.log("[" + appName + "] " + data); });
    sp.stderr.on('data', function (data) { console.log("[" + appName + "] " + data); });
    sp.on('error', function () {
      console.log("[" + appName + "]" + error, arguments);
      sp.kill();
      app.process = false;
    });
    sp.on('close', function (code) {
      console.log('child process exited with code ' + code);
      sp.kill()
      app.process = false;
    });
  }
});

// catch ctrl-c and kill all apps before exiting
