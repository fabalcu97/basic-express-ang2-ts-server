// External modules
	var gulp = require('gulp-param')(require('gulp'), process.argv);
	var shell = require('shelljs');
	var path = require('path');
	var open = require('open');
	var runSequence = require('run-sequence');
	var tsconfig = require('./tsconfig.json');
	var fs = require('fs-extra');
	var replace = require("replace");

/**
 * Items
 */

	// Servers
		gulp.task('server:start', function () {
			require('./dist/server.bundle.js');
		});
		gulp.task('server:build', function () {
			return shell.exec('node_modules/.bin/webpack');
		});

/**
 * Global actions
 */

	// Build
		gulp.task('build', function () {
			runSequence([
				'server:build'
			]);
		});

	// Serve
		gulp.task('serve', function (build, buildAll) {
			var sequence = [];
			if (build || buildAll) {
				sequence.push('server:build');
			}
			sequence.push('server:start');
			runSequence(sequence);
		});

	// Init
		gulp.task('init', function () {
			runSequence([
				'build'
			]);
		});