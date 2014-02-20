module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {      
      build: {
        files:{
          'dist/js/<%= pkg.name %>.min.js': 'src/js/<%= pkg.name %>.js',
          'dist/js/<%= pkg.name %>-panels.min.js': 'src/js/<%= pkg.name %>-panels.js'
        }        
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};