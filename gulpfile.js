// 加载插件
var gulp = require('gulp'), //引用项目gulp
    jade = require('gulp-jade'), //jade
    sass = require('gulp-ruby-sass'), //编译sass
    autoprefixer = require('gulp-autoprefixer'), //补全浏览器前缀
    uglify = require('gulp-uglify'),//压缩js
    imagemin = require('gulp-imagemin'), //图片压缩
    changed = require('gulp-changed'), // 只操作有过修改的文件
    rimraf = require('gulp-rimraf'), //清空文件夹

    livereload = require('gulp-livereload'), // 网页自动刷新（文件变动后即时刷新页面）
    webserver = require('gulp-webserver'); // 本地服务器

/* = 全局设置
-------------------------------------------------------------- */
var srcPath = {
  jade  : 'src/jade',
  scss  : 'src/scss',
  script: 'src/script',
  images: 'src/images'
};
var destPath = {
  html: 'dist',
  css : 'dist/css',
  js  : 'dist/js',
  img : 'dist/img'
};




/* = 开发环境( Ddevelop Task )
-------------------------------------------------------------- */

// HTML处理
gulp.task('html',function(){
    return gulp.src(srcPath.jade+'/**/*.jade') // 指明源文件路径
        .pipe(changed( destPath.html ))
        .pipe(jade({pretty:true}))
        .pipe(gulp.dest(destPath.html))// 输出路径
});

//CSS处理
gulp.task('css', function () {
    return sass(srcPath.scss+'/**/*.scss', { style: 'compact' , /*sourcemap: true*/ }) // 指明源文件路径、并进行文件匹配（编译风格：简洁格式）
        .on('error', function (err) {console.error('Error!', err.message);}) // 显示错误信息
        //.pipe(changed( destPath.css ))
        //.pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))// 主流浏览器的最新两个版本,是否美化属性值
        .pipe(gulp.dest( destPath.css )); // 输出路径
});

//JS处理
gulp.task('js', function() {
    return gulp.src(srcPath.script+'/**/*.js') // 指明源文件路径、并进行文件匹配
        .pipe(changed( destPath.js ))
        .pipe(uglify()) // 使用uglify进行压缩，并保留部分注释
        .pipe(gulp.dest( destPath.js )); // 输出路径
});

//IMG处理
gulp.task('img', function(){
  return gulp.src(srcPath.images+'/**/*.{png,jpg,gif,svg}') // 指明源文件路径、并进行文件匹配
    .pipe(changed( destPath.img ))
    .pipe(imagemin())
    .pipe(gulp.dest( destPath.img )); // 输出路径
});

// 实时刷新
gulp.task('webserver', function() {
  gulp.src( 'dist' ) // 服务器目录（.代表根目录）
  .pipe(webserver({ // 运行gulp-webserver
    livereload: true, // 启用LiveReload
    open: true // 服务器启动时自动打开网页
  }));
});


// 监听任务
gulp.task('watch',function(){
  gulp.watch(srcPath.jade+'/**/*.jade', ['html']);// 监听 jade
  gulp.watch(srcPath.scss+'/**/*.scss', ['css']);// 监听 scss  
  gulp.watch(srcPath.script+'/**/*.js', ['js']);// 监听 script
  gulp.watch(srcPath.images+'/**/*.{png,jpg,gif,svg}', ['img']);// 监听 images
});

//默认执行
gulp.task('default',['webserver','watch']);
gulp.task('start',['clean'],function(){
  return gulp.start('html','css','js','img')
})



/* = 发布环境( Release Task )
-------------------------------------------------------------- */


// 清理文件
gulp.task('clean', function() {
  return gulp.src([ destPath.html , destPath.css , destPath.js , destPath.img ], {read: false})
    .pipe(rimraf())
});
// 样式处理
gulp.task('bulidCss', function () {
  return sass( srcPath.scss+'/**/*.scss', { style: 'compressed' }) // 指明源文件路径、并进行文件匹配（编译风格：压缩）
    .on('error', function (err) {console.error('Error!', err.message); })// 显示错误信息
    .pipe(gulp.dest( destPath.css )); // 输出路径
});

// 打包发布
gulp.task('bulid', ['clean'], function(){ // 开始任务前会先执行[clean]任务
  return gulp.start('html','bulidCss','js','img'); // 等[clean]任务执行完毕后再执行其他任务
});


/* = 帮助提示( Help )
-------------------------------------------------------------- */
  gulp.task('help',function () {
    console.log('----------------- 开发环境 -----------------');
    console.log('gulp default   开发环境（默认任务）');
    console.log('gulp html    HTML处理');
    console.log('gulp css    样式处理&添加源文件路径');
    console.log('gulp js    JS文件压缩');
    console.log('gulp img    图片压缩');
    console.log('---------------- 发布环境 -----------------');
    console.log('gulp clean   清理文件');
    console.log('gulp bulidCss   样式处理');
    console.log('gulp bulid   打包发布');
    console.log('---------------------------------------------');
  });

