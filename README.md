# gulp-website
使用gulp架构的自动化网站模板，分开发环境和发布环境，实现jade、sass的编译，本地服务器热更新等功能


##使用到的相关插件
*[gulp](https://www.npmjs.com/package/gulp) //引用项目gulp
*[gulp-jade](https://www.npmjs.com/package/gulp-jade) //jade编译
*[gulp-ruby-sass](https://www.npmjs.com/package/gulp-ruby-sass) //编译sass
*[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) //补全浏览器前缀
*[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) //压缩js
*[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) //图片压缩
*[gulp-changed](https://www.npmjs.com/package/gulp-changed) // 只操作有过修改的文件
*[gulp-rimraf](https://www.npmjs.com/package/gulp-rimraf) //清空文件夹
*[gulp-livereload](https://www.npmjs.com/package/gulp-livereload) // 网页自动刷新（文件变动后即时刷新页面）
*[gulp-webserver](https://www.npmjs.com/package/gulp-webserver) // 本地服务器

###gulp命令列表
>----------------- 开发环境 -----------------
 gulp default   开发环境（默认任务）
 gulp html    HTML处理
 gulp css    样式处理&添加源文件路径
 gulp js    JS文件压缩
 gulp img    图片压缩
 ---------------- 发布环境 -----------------
 gulp clean   清理文件
 gulp bulidCss   样式处理
 gulp bulid   打包发布
 ---------------------------------------------