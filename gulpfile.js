// 加载插件
var gulp = require('gulp'), //引用项目gulp
    jade = require('gulp-jade'), //jade
    sass = require('gulp-ruby-sass'), //编译sass
    sourcemaps  = require('gulp-sourcemaps'), //生产sass源文件指向
    autoprefixer = require('gulp-autoprefixer'), //补全浏览器前缀
    uglify = require('gulp-uglify'),//压缩js
    imagemin = require('gulp-imagemin'),//压缩图片
    pngquant = require('imagemin-pngquant'),//imagemin的插件，png深度压缩
    tinypng  = require('gulp-tinypng-compress'), //TingPNG图片压缩api
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
  root: 'dist',
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
    return sass(srcPath.scss+'/**/*.scss',{sourcemap: true, style: 'compact'}) // 指明源文件路径、并进行文件匹配
        //style编译风格：nested嵌套,compact紧凑,expanded展开,compressed
        //.pipe(changed( destPath.css ))
        .on('error', function (err) {console.error('Error!', err.message); })// 显示错误信息
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))// 主流浏览器的最新两个版本,是否美化属性值
        .pipe(gulp.dest( destPath.css )); // 输出路径
});

//JS处理
gulp.task('js', function() {
    return gulp.src(srcPath.script+'/**/*.js') // 指明源文件路径、并进行文件匹配
        .pipe(changed( destPath.js ))
        //.pipe(uglify()) // 使用uglify进行压缩，并保留部分注释
        .pipe(gulp.dest( destPath.js )); // 输出路径
});

//IMG处理
gulp.task('img', function(){
  return gulp.src(srcPath.images+'/**/*.{png,jpg,gif}') // 指明源文件路径、并进行文件匹配
    .pipe(changed( destPath.img ))
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
//初始化
gulp.task('start', ['clean'], function(){ return gulp.start('html','css','js','img'); })



/* = 发布环境( Release Task )
-------------------------------------------------------------- */


// 清理文件
gulp.task('clean', function() {
  return gulp.src( destPath.root , {read: false})
    .pipe(rimraf())//清空生产环境生产的文件夹
});
// 样式处理
gulp.task('bulidCss', function () {
  return sass( srcPath.scss+'/**/*.scss', { style: 'compressed' }) // 指明源文件路径、并进行文件匹配（编译风格：压缩）
    .on('error', function (err) {console.error('Error!', err.message); })// 显示错误信息
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))// 主流浏览器的最新两个版本,是否美化属性值
    .pipe(gulp.dest( destPath.css )); // 输出路径
});

// 图片压缩
// gulp.task('bulidImg', function(){
//   return gulp.src(srcPath.images+'test/**/*.{png,jpg,gif}') // 指明源文件路径、并进行文件匹配
//     .pipe(tinypng({
//             key: 'LPQyZZVeZsN3WIOVu8cXyUbD7sAh0T1w',
//             sigFile: 'test/.tinypng-sigs',
//             log: true
//         }))
//     //139邮箱的tingpng api:LPQyZZVeZsN3WIOVu8cXyUbD7sAh0T1w
//     .pipe(gulp.dest( destPath.img )); // 输出路径
// });
gulp.task('imgmin', function() {
  return gulp.src(srcPath.images+'/**/*.{png,jpg,gif}')
    .pipe(imagemin({
      optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
}))
    .pipe(gulp.dest(destPath.img));
});

//JS处理
gulp.task('bulidJs', function() {
    return gulp.src(srcPath.script+'/**/*.js') // 指明源文件路径、并进行文件匹配
        .pipe(uglify()) // 使用uglify进行压缩，并保留部分注释
        .pipe(gulp.dest( destPath.js )); // 输出路径
});

// 打包发布
gulp.task('bulid', ['clean'], function(){ // 开始任务前会先执行[clean]任务
  return gulp.start('html','bulidCss','bulidJs','imgmin'); // 等[clean]任务执行完毕后再执行其他任务
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

