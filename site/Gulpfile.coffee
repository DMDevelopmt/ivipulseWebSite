BUILD_DIR = "."

gulp = require "gulp"
sass = require "gulp-sass"
browserSync = require "browser-sync"
debug = require "gulp-debug"
plumber = require "gulp-plumber"
sourcemaps = require "gulp-sourcemaps"
autoprefixer = require "gulp-autoprefixer"
tinypng = require "gulp-tinypng-compress"
svgstore = require "gulp-svgstore"
svgmin = require "gulp-svgmin"
concat = require "gulp-concat"

browserSync.create()
reload = browserSync.reload

paths =
  root: ''
  sass: 'src/scss/'
  svg: 'src/svg/'
  output: BUILD_DIR + '/'
  img: 'src/img/'
  js: 'src/js/'
  vendors: BUILD_DIR + '/vendors/'

javascript_main_script = "app.js"

gulp.task 'build', ['sass', 'svg', 'scripts']

gulp.task 'sass', ->
  gulp.src paths.sass + '/app.scss'
  .pipe plumber()
  #.pipe sourcemaps.init()
  .pipe debug title: "sass:"
  .pipe sass
    errLogToConsole: true
  #.pipe sourcemaps.write({includeContent: false})
  #.pipe sourcemaps.init({loadMaps: true})
  .pipe autoprefixer()
  #.pipe sourcemaps.write()
  .pipe gulp.dest paths.output + "css/"
  .pipe reload({stream: true})

gulp.task 'scripts', ->
  gulp.src [
    'src/js/jquery.min.js'
    'src/js/waypoints.min.js'
    'src/js/animatescroll.min.js'
    'src/js/bootstrap.min.js'
    'src/js/owl.carousel.min.js'
    'src/js/custom.js'
    'src/js/*.js'
  ]
  .pipe concat 'app.js'
  .pipe gulp.dest './js/'


gulp.task 'serve', ->
  browserSync
    port: 8090
    open: false
    ghostMode: false
    logConnections: true
    server: paths.output

  gulp.watch paths.sass + "**/*.*", {interval: 300}, ['sass']
  gulp.watch paths.svg + "**/*.svg", {interval: 300}, ['svg-watch']
  gulp.watch paths.js + "**/*.js", {interval: 300}, ['js-watch']
#  gulp.watch paths.img + "**/*.*", {interval: 300}, ['img-watch']

gulp.task 'svg-watch', ['svg'], reload
gulp.task 'js-watch', ['js'], reload
gulp.task 'img-watch', ['tinypng'], reload

gulp.task 'tinypng', ->
  gulp.src(paths.img + '**/*.{png,jpeg,jpg}')
  .pipe tinypng({
    key: 'UvGGPFySiaVd1qaBuUEiyR_RbD5Pjzi3',
    log: true
    sigFile: 'src/tinypng.json'
  })
  .pipe(gulp.dest(paths.output + 'images'))

gulp.task 'svg', ->
  gulp.src(paths.svg + '**/*.svg')
  .pipe plumber()
  .pipe debug title: 'svg: '
  .pipe svgmin({})
  .pipe svgstore({inlineSvg: true})
  .pipe(gulp.dest(paths.output + 'images'))

gulp.task 'default', ['build', 'serve']
