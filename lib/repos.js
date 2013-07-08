/**
 * webmaker repository settings
 */
module.exports = function(npm) {

  // installl commands for a node application
  function node() {
    return [
      "rm -rf node_modules",
      npm + " install",
      npm + " cache clean"
    ];
  }

  // install commands for a python application
  function python() {
    return [
      "pip install --user -r requirements.txt"
    ];
  }

  return {
    "htmlsanitizer.org": {
      install: python(),
      env: false,
      run: "python app.py",
      process: false
    },
    "thimble.webmaker.org": {
      install: node(),
      evn: "cp env.dist .env",
      run: "node app",
      process: false
    },
    "popcorn.webmaker.org": {
      install: node(),
      env: false,
      run: "node server",
      process: false
    },
    "node-webmaker-loginapi": {
      install: node(),
      env: false,
      run: false,
      process: false
    },
    "login.webmaker.org": {
      install: node(),
      env: "cp env.sample .env",
      run: "node app",
      process: false
    },
    "webmaker.org": {
      install: node(),
      env: "cp env.dist .env",
      run: "node app",
      process: false
    },
    "makeapi-client": {
      install: node(),
      env: false,
      run: false,
      process: false
    },
    "MakeAPI": {
      install: node(),
      env: "cp env.sample .env",
      run: "node server",
      process: false
    }
  };
};
