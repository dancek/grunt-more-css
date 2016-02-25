/*
 * grunt-more-css
 * https://github.com/dancek/grunt-more-css
 *
 * Copyright (c) 2015 Hannu Hartikainen
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

var moreCss = require('more-css');
var chalk = require('chalk');
var maxmin = require('maxmin');

module.exports = function(grunt) {

  grunt.registerMultiTask('more_css', 'Minify CSS using more-css.', function() {
    // option defaults
    var options = this.options({
      radical: true,
      report: 'min'
    });

    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
          return false;
        } else {
          return true;
        }
      });

      // read CSS
      var css = src.map(function (p) {
        return fs.readFileSync(p, {
          encoding: 'utf8'
        });
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      if (css.length === 0) {
        grunt.log.warn('Destination ' + chalk.cyan(f.dest) + ' not written because src files were empty.');
        return;
      }

      // Minify files, warn and fail on error.
      var minified;
      try {
        minified = moreCss.compress(css, options.radical);
      } catch (e) {
        console.log(e);
        var err = new Error('Minification failed.');
        if (e.message) {
          err.message += '\n' + e.message + '. \n';
          if (e.line) {
            err.message += 'Line ' + e.line + ' in ' + src + '\n';
          }
        }
        err.origError = e;
        grunt.log.warn('Minifying source ' + chalk.cyan(src) + ' failed.');
        grunt.fail.warn(err);
      }

      grunt.file.write(f.dest, minified);

      // report success
      var report = '.';
      if (options.report) {
        report = ': ' + maxmin(css, minified, options.report === 'gzip');
      }
      grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created' + report);

    });
  });

};
