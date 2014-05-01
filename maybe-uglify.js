'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	path = require('path'),
	through = require('through2');

module.exports = function (opts) {
	opts = opts || {};

	function stream(file, encoding, callback) {

		var base = path.basename(file.path, ".js");

		// if its already min, pass through and do not alter
		if (base.substr(base.length - 4) === ".min") {
			this.push(file);
			return callback();
		}

		// otherwise uglify
		gulp.src(file.path).pipe(uglify()).on('data', function (buffer) {
			this.push(buffer);
			callback();
		}.bind(this));
	}

	return through.obj(stream);
};