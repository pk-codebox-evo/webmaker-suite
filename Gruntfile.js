module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),
    jshint: {
      options: {
        "-W069": true // ignore "['...'] is better written in dot notation." warnings
      },
      files: [
        "Gruntfile.js",
        "install-webmaker.js",
        "update-webmaker.js",
        "lib/**/*.js"
      ]
    }
  });

  grunt.loadNpmTasks( "grunt-contrib-jshint" );

  grunt.registerTask( "default", [ "jshint" ]);
};

