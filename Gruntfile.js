/*
 * grunt-autoversion
 * https://github.com/takumi4ichi/grunt-autoversion
 *
 * Copyright (c) 2014 takumi4ichi
 * Licensed under the BSD license.
 */

/*global module*/

module.exports = function(grunt) {

'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.default_options %>',
        '<%= nodeunit.custom_options %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    autoversion: {
      default_options: {
        options: {
        }
      },
      custom_options: {
        options: {
            cmd: 'echo "On branch custom_errortest"'
        }
      },
      byGitStatus: {
        options: {
            cmd: 'git status'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      default_options: ['test/*_default_test.js'],
      custom_options: ['test/*_custom_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test-default', ['clean', 'autoversion:default_options', 'nodeunit:default_options']);
  grunt.registerTask('test-custom', ['clean', 'autoversion:custom_options', 'nodeunit:custom_options']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test-default', 'test-custom', 'autoversion:byGitStatus']);

};
