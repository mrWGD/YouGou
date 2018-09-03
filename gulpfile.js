// 规范CommonJS 
var gulp = require('gulp');


//	拷贝html文件
gulp.task('copyhtml', function() {
	return gulp.src('html/*.html')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
	

})

gulp.task('copyphp', function() {
	return gulp.src('*.php')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
	

})

//图片整理
gulp.task('images', function() {
	return gulp.src('images/**/*')
	.pipe(gulp.dest('dist/images'))
	.pipe(connect.reload());
	

})

//拷贝js文件
gulp.task('copyjs', function() {
	return gulp.src(['*.js', '!gulpfile.js'])
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
	

})

//处理scss文件
var scss = require('gulp-sass-china');
gulp.task('scss', function() {
	return gulp.src('scss/*.scss')
	.pipe(scss())
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
	


})

//拷贝data数据
gulp.task('data', function() {
	return gulp.src(['*.json', "!package.json", "!package-lock.json"])
	
	.pipe(gulp.dest('dist/data'))
	.pipe(connect.reload());
	


})


//一次性执行上述五个任务
gulp.task('build', ["copyhtml", "images", "copyjs", "scss", "data" ], function(){
	console.log("编译完成");
})


//gulp监听
gulp.task('watch', function() {
	gulp.watch("html/*.html", ["copyhtml"]);
	gulp.watch('images/**/*', ["images"]);
	gulp.watch(["*.js", "!gulpfile.js"], ["copyjs"]);
	gulp.watch("scss/*.scss", ["scss"]);
	gulp.watch(['*.json', "!package.json", "!package-lock.json"], ["data"]);
})
//启动服务器
var connect = require('gulp-connect');
gulp.task('server', function() {
	connect.server({
		root: 'dist',
	    port: 8899,
	    livereload: true

	})
	


})
gulp.task('default',['watch', 'server']);