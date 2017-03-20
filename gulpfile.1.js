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
	//var httpRoutes = require('./src/settings/http-routes.json');
	//var webapps = require('./src/settings/webapps.json');
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

	// Webapps
		/*var webappsDir = 'src/setup/webapps/src';
		var webappsEntries = fs.readdirSync(path.join(__dirname, webappsDir));
		webappsEntries = webappsEntries.filter(function (entry) {
			var ignore = [
				'.DS_Store',
				'ang',
				'.seed-webapp'
			];
			for (var i=0; i<ignore.length; i++) {
				if (ignore[i] == entry) return;
			}
			return entry;
		})
		webappsEntries.forEach(function (entryName) {
			var entryPath = path.join(__dirname, webappsDir, entryName);
			gulp.task('webapp['+entryName+']:build', function () {
				shell.exec('sh -c \'cd '+entryPath+' src && webpack\'');
			});
			gulp.task('webapp['+entryName+']:install', function () {
				shell.exec('sh -c \'cd '+entryPath+' src && npm install\'');
			});
			gulp.task('webapp['+entryName+']:setup:dev', function () {
				fs.copySync(
					path.join(entryPath, 'src/index.dev.html'),
					path.join(entryPath, 'src/index.html')
				);
				return;
			});
			gulp.task('webapp['+entryName+']:setup:prod', function () {
				fs.copySync(
					path.join(entryPath, 'src/dist'),
					path.join(entryPath, 'src/dist-prod')
				);
				fs.copySync(
					path.join(entryPath, 'src/index.prod.html'),
					path.join(entryPath, 'src/index.html')
				);
				return;
			});
		});
		gulp.task('webapps:build', function () {
			runSequence(webappsEntries.map(function (entryName) {
				return 'webapp['+entryName+']:build';
			}));
		});
		gulp.task('webapps:install', function () {
			runSequence(webappsEntries.map(function (entryName) {
				return 'webapp['+entryName+']:install';
			}));
		});
		gulp.task('webapps:setup:dev', function () {
			runSequence(webappsEntries.map(function (entryName) {
				return 'webapp['+entryName+']:setup:dev';
			}));
		});
		gulp.task('webapps:setup:prod', function () {
			runSequence(webappsEntries.map(function (entryName) {
				return 'webapp['+entryName+']:setup:prod';
			}));
		});
		gulp.task('webapps:new', function (name) {
			if (!name) return;
			var seedWebappPath = path.join(__dirname, 'src/setup/webapps/src/.seed-webapp'); 
			var webappPath = path.join(__dirname, 'src/setup/webapps/src/'+name); 
			fs.copySync(seedWebappPath, webappPath);
			replace({
				regex: 'REPLACE',
				replacement: name,
				paths: [path.join(webappPath, 'src/index.html')],
				recursive: false,
				silent: false,
			});
			console.log('Installing webapp dependencies');
			shell.exec('sh -c \'cd '+webappPath+' src && npm install\'');
			console.log('Webapp created..');
		});*/

	// Servers
		gulp.task('server:start', function () {
			require('./dist/server.bundle.js');
		});
		gulp.task('server:build', function () {
			return shell.exec('node_modules/.bin/webpack');
		});
		/*var servers = ['proxy', 'api', 'auth', 'statics', 'webapps'];
		servers.forEach(function (server) {
			gulp.task('start:'+server, function () {
				require('./dist/'+server+'.bundle.js');
			});
		});
		gulp.task('servers:setup:dev', function () {
			return fs.copySync('src/config.dev.ts', 'src/config.ts');
		});
		gulp.task('servers:setup:prod', function () {
			return fs.copySync('src/config.prod.ts', 'src/config.ts');
		});
		gulp.task('servers:build', function () {
			return shell.exec('node_modules/.bin/webpack');
		});
		gulp.task('servers:start', function () {
			runSequence(servers.map(function (serverName) {
				return 'start:'+serverName;
			}));
		})*/

	// Tests
		/*gulp.task('tests:build', function () {
			fs.ensureDirSync('test/project-src');
			fs.copy('src/settings', 'test/project-src/settings');
			var tsProject = ts.createProject('tsconfig.json');
			return tsProject.src('src/config.ts')
				.pipe(ts(tsProject)).js
				.pipe(gulp.dest('test/project-src'));
		});*/

/**
 * Global actions
 */

	// Build
		gulp.task('build', function () {
			runSequence([
				'server:build',
				//'webapps:build'
			]);
		});
	
	// Test
		//gulp.task('test', ['tests:build'], function () {
		//	shell.exec('node_modules/.bin/mocha -t 20000 --reporter spec test/**/*.spec.js');
		//});
	
	// Setups
		/*gulp.task('setup:dev', function () {
			runSequence([
				'servers:setup:dev',
				'webapps:setup:dev'
			]);
		});
		gulp.task('setup:prod', function () {
			runSequence([
				'servers:setup:prod',
				'webapps:setup:prod'
			]);
		});*/
	
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
		/*gulp.task('serve', function (build, buildAll) {
			var sequence = [];
			if (build || buildAll) {
				sequence.push('servers:setup:dev');
				sequence.push('servers:build');
			}
			if (buildAll) {
				sequence.push('webapps:setup:dev');
				sequence.push('webapps:build');
			}
			sequence.push('servers:start');
			runSequence(sequence);
		});*/
	
	// Init
		gulp.task('init', function () {
			runSequence([
				'typings:install',
				//'webapps:install',
				//'setup:dev',
				'build'
			]);
		})