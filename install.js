/****
 *
 * This is the installer for the Webmaker suite of projects.
 *
 * Run "node install", and you should be set.
 *
 * Use "node update" to bump every project to latest master.
 * (note:  not implemented yet)
 *
 * Use "node run" to fire up every project for testing.
 * (note:  not implemented yet)
 *
 ****/

/**
 * Installation script requirements
 */
var batchExec = require("./lib/batch").batchExec,
    checkError = require("./lib/batch").checkError,
    fs = require("fs");

/**
 * This function houses all the installer code
 */
function runInstaller(runtime) {
  console.log("Finished bootstrapping.");

  console.log("\n===================================================================");
  console.log("Starting installation. You might want to go make a cup of coffee...");
  console.log("===================================================================");

  // Installation requirements
  var habitat = (function() {
        var habitat = require("habitat");
        habitat.load();
        return habitat;
      }()),
      gitOptions = new habitat("git"),
      username,
      password
      gitCredentials = (function(options) {
        if (!options)
          return '';
        username = options.get("username"),
        password = options.get("password");
        if (!username || !password)
          return '';
        return username + ":" + password + "@";
      }(gitOptions));

  // Our list of apps that belong to the Webmaker Suite
  var masterRepoList = {
        "htmlsanitizer.org": [],
        "thimble.webmaker.org": ["cp env.dist .env"],
        "popcorn.webmaker.org": [],
        "node-webmaker-loginapi": [],
        "login.webmaker.org": ["cp env.sample .env"],
        "webmaker.org": ["cp env.dist .env"],
        "makeapi-client": [],
        "MakeAPI": ["cp env.sample .env"]
      },
      repositories = Object.keys(masterRepoList);

  /**
   * Set up the environment for specific repositories
   */
  function setupEnvironment(repositories, next) {
    if (repositories.length === 0) {
      return setTimeout(next, 10);
    };
    var repo = repositories.pop(),
        cmd = masterRepoList[repo];
    if (cmd.length > 0) {
      console.log("setting up .env file for "+repo);
    }
    process.chdir(repo);
    batchExec(cmd, function() {
      process.chdir("..");
      setupEnvironment(repositories, next);
    });
  }

  /**
   * Set up all the .env files so that all
   * repositories point to all the correct
   * other repositories.
   */
  function setupEnvironments() {
    console.log();
    setupEnvironment(repositories = Object.keys(masterRepoList), function() {
      console.log("\nInstallation complete.");
    });
  };

  /**
   * Run npm install + npm cache clean for a repository.
   */
  function installModule(repositories, next) {
    if (repositories.length === 0) {
      return setTimeout(next, 10);
    };
    var repo = repositories.pop();
    console.log("resolving node modules for "+repo);
    process.chdir(repo);
    batchExec(
      [ "rm -rf node_modules",
        "npm install",
        "npm cache clean" ],
      function() {
        process.chdir("..");
        installModule(repositories, next);
      }
    );
  }

  /**
   * Run npm install + npm cache clean for all repositories.
   */
  function installModules() {
    console.log();
    installModule(repositories = Object.keys(masterRepoList), function() {
      setupEnvironments();
    });
  }

  /**
   * When we have processed all repositories,
   * link them all up with relevant .env settings.
   */
  function tryNext(error, stdout, stderr) {
    checkError(error, stdout, stderr);

    // done cloning - set up the .env files
    if (repositories.length === 0) {
      installModules();
    }

    // clone the next repository
    else {
      var repo = repositories.pop(),
          repoURL = "https://" + gitCredentials + "github.com/mozilla/" + repo + ".git",
          rm = "rm -rf " + repo,
          clone = "git clone " + repoURL;
      console.log("\ncloning " + repo);
      batchExec([rm, clone], function(error, stdout, stderr) {
        checkError(error, stdout, stderr);

        process.chdir(repo);
        var commands = [
          "git submodule update --init --recursive",
          "git remote rename origin mozilla",
          "git remote add origin ssh://git@github.com/" + username + "/" + repo + ".git",
        ];
        batchExec(commands, function() {
          process.chdir("..");
          tryNext();
        });
      });
    }
  };

  /**
   * clone all the repositories
   */
  tryNext();
}

/**
 * Runtime argument parsing
 */
function getRunTime() {
  var argv = require("argv");
  argv.option({
      name: 'username',
      type: 'string',
      description: 'Username for git',
      example: "'node install --username=username --password=password'"
  });
  argv.option({
      name: 'password',
      type: 'string',
      description: 'Password for git',
      example: "'node install --username=username --password=password'"
  });
  return argv.run().options;
}

/**
 * Bootstrap and run the installation
 */
(function bootStrap(){
  console.log("Bootstrapping installer...");
  batchExec(
    [ "rm -rf node_modules",
      "npm install",
      "npm cache clean" ],
    function() {
      var runtime = getRunTime();

      // do we need an .env file?
      if (!fs.existsSync(".env")) {
        console.log("No .env file found.");

        /**
         * This funcitons writes the installer's .env file
         */
        var writeEnv = function (err, result) {
          if (err) { return onErr(err); }
          // write local .env
          var content = [
            'export GIT_USERNAME="' + result.username + '"',
            'export GIT_PASSWORD="' + result.password + '"',
            ''].join("\n");
          fs.writeFileSync(".env", content);
          console.log(".env file created.");
          runInstaller(runtime);
        };

        // do we still need a username/password combination for git?
        if (!runtime.username || !runtime.password) {
          var prompt = require("prompt");
          prompt.start();
          prompt.get(['username', 'password'], writeEnv);
        }

        // we got the user/pass information from the runtime arguments
        else {
          writeEnv(null, {
            username: runtime.username,
            password: runtime.password
          });
        }
      }

      // we already had an .env file
      else { runInstaller(runtime); }
    }
  );
}());
