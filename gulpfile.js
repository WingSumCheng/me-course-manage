var gulp = require('gulp');
var sftp = require('gulp-sftp');
var devel_braeco,
	wingsum;
try {
	devel_braeco = require('../secret.json');
	wingsum = require("./wingsum.json");
} catch(e) {

}

gulp.task('upload_static', ['build'], function(cb) {
	gulp.src('./dist/me-course-manage/**/*')
		.pipe(sftp({
			host: devel_braeco.host,
			user: devel_braeco.username,
			pass: devel_braeco.password,
			remotePath: "/home/web/dist/me-course-manage/",
			callback: function() {
				cb(null);
			}
		}));
});

gulp.task('upload_html', ['upload_static'], function() {
	gulp.src('./dist/index.html')
		.pipe(sftp({
			host: wingsum.host,
			user: wingsum.username,
			pass: wingsum.password,
			remotePath: "/home/wingsum/me-course-manage/dist",
			callback: function() {
				console.log("success");
			}
		}));
});

gulp.task('build', function(cb) {
	var task = require("./build/gulp-build.js");
	task(function() {
		cb(null);
	});
});

gulp.task('default', ['build', 'upload_static', 'upload_html'], function() {

});