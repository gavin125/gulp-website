# gulp-website
使用gulp架构的自动化网站模板，分开发环境和发布环境，实现jade、sass的编译，本地服务器热更新等功能


## 使用到的相关插件
* [gulp](https://www.npmjs.com/package/gulp) //引用项目gulp  
* [gulp-jade](https://www.npmjs.com/package/gulp-jade) //jade编译  </br>
* [gulp-ruby-sass](https://www.npmjs.com/package/gulp-ruby-sass) //编译sass </br>
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) //补全浏览器前缀 </br>
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) //压缩js </br>
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) //图片压缩 </br>
* [gulp-changed](https://www.npmjs.com/package/gulp-changed) // 只操作有过修改的文件 </br>
* [gulp-rimraf](https://www.npmjs.com/package/gulp-rimraf) //清空文件夹 </br>
* [gulp-livereload](https://www.npmjs.com/package/gulp-livereload) // 网页自动刷新（文件变动后即时刷新页面） </br>
* [gulp-webserver](https://www.npmjs.com/package/gulp-webserver) // 本地服务器 </br>

### gulp命令列表
>----------------- 开发环境 -----------------</br>
 gulp default   开发环境（默认任务）</br>
 gulp html    HTML处理</br>
 gulp css    样式处理&添加源文件路径</br>
 gulp js    JS文件压缩</br>
 gulp img    图片压缩</br>
 ---------------- 发布环境 -----------------</br>
 gulp clean   清理文件</br>
 gulp bulidCss   样式处理</br>
 gulp bulid   打包发布</br>
 ---------------------------------------------</br>