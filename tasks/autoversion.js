/*
 * grunt-autoversion
 * https://github.com/takumi4ichi/grunt-autoversion
 *
 * Copyright (c) 2014 takumi4ichi
 * Licensed under the BSD license.
 */

/*global module, require, console*/

module.exports = function(grunt) {

'use strict';

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('autoversion', 'get version by git status, wirte to package.json', function() {


    var options = this.options({
        cmd: 'git status',
        regex: /^On branch (?:.+\/)?(.+?)$/m,
        updates: [
            {
                file: 'package.json',
                field: 'version'
            }
        ]
    }),
    exec = require('child_process').exec,
    child;


    child = exec(options.cmd, function (error, stdout, stderr) {
        var matches, pkg, fs = require('fs');
        if (error !== null) {
            console.log('error:', error);
        }else{
            matches = stdout.match(options.regex);
            console.log(matches);
            if (matches && matches[1]) {
                options.updates.filter(function (update) {
                    if (!grunt.file.exists(update.file)) {
                        return false;
                    } else {
                        return true;
                    }
                }).map(function(update) {
                    pkg = grunt.file.readJSON(update.file);
                    pkg[update.field] = matches[1];
                    grunt.file.write(update.file, JSON.stringify(pkg, null, 2));
                } );
            }
        }
    });

  });

};
