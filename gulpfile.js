// External modules
	var gulp = require('gulp-param')(require('gulp'), process.argv);
	var shell = require('shelljs');
	var path = require('path');
	var open = require('open');
	var runSequence = require('run-sequence');
	var ts = require('gulp-typescript');
	var package = require('./package.json');
	var tsconfig = require('./tsconfig.json');
	var fs = require('fs-extra');
	var replace = require("replace");

/**
 * Items
 */

	// Dependencies
		gulp.task('typings:install', function(module, global) {
			if (!module) {
				shell.exec('node_modules/.bin/typings install');
			} else {
				shell.exec(
					'node_modules/.bin/typings install '+module+' --save'+
					(global ? ' --global' : '')
				);
			}
		});

		gulp.task('typings:search', function(module) {
			if (!module) return;
			shell.exec('node_modules/.bin/typings search '+module);
		});

		gulp.task('typings:uninstall', function(module) {
			if (!module) return;
			shell.exec(
				'node_modules/.bin/typings uninstall '+module+' --save'+
				(global ? ' --global' : '')
			);
		});

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
				'server:build',
			]);
		});
	
	// Serve
		gulp.task('serve', function (build, buildAll) {
			var sequence = [];
			if (build || buildAll) {
				sequence.push('server:build');
			}
			if (buildAll) {
				//sequence.push('webapps:build');
			}
			sequence.push('server:start');
			runSequence(sequence);
		});
	
	// Init
		gulp.task('init', function () {
			runSequence([
				'typings:install',
				'build'
			]);
		})