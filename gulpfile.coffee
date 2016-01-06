# gulpfile.coffee: build script for front assets
#
# gulp        - build assets
# gulp watch  - build assets continuously

sources =
  bower:    'bower.json'
  main:     'sources/js/boot.js'
  js:       'sources/js/**/*.js'
  css:      'sources/css/**/*.css'
  static:   ['sources/static/**/*']

dist =
  deploy: './dist'
  font:   './font'

libs =
  js: [
    'jquery/dist/jquery.min.js'
    'Materialize/dist/js/materialize.min.js'
  ]
  css: [
    'Materialize/dist/css/materialize.min.css'
    'github-markdown-css/github-markdown.css'
  ]
  font: [
    'Materialize/dist/font/*/**'
  ]
  static: [
  ]

bower       = require 'bower'
del         = require 'del'
gulp        = require 'gulp'
gutil       = require 'gulp-util'
concat      = require 'gulp-concat'
coffee      = require 'gulp-coffee'
nodemon     = require 'gulp-nodemon'
plumber     = require 'gulp-plumber'
uglify      = require 'gulp-uglify'
streamify   = require 'gulp-streamify'
source      = require 'vinyl-source-stream'
browserify  = require 'browserify'
babelify    = require 'babelify'

gulp.task 'default', ['clean'], ->
  gulp.start 'compile:lib', 'compile:js', 'compile:css', 'compile:static'

gulp.task 'clean', (cb) ->
  del dist.deploy, {force:true}, cb

gulp.task 'watch', ->
  gulp.watch sources.bower,  ['compile:lib']
  gulp.watch sources.js,     ['compile:js']
  gulp.watch sources.css,    ['compile:css']
  gulp.watch sources.static, ['compile:static']


gulp.task 'compile:lib', ->
  bower.commands.install().on 'end', ->
    gulp.src libs.js.map (e) -> "bower_components/#{e}"
      .pipe concat 'lib.js'
      .pipe gulp.dest dist.deploy
    gulp.src libs.css.map (e) -> "bower_components/#{e}"
      .pipe concat 'lib.css'
      .pipe gulp.dest dist.deploy
    gulp.src libs.static.map (e) -> "bower_components/#{e}"
      .pipe gulp.dest dist.deploy
    gulp.src libs.font.map (e) -> "bower_components/#{e}"
      .pipe gulp.dest dist.font


gulp.task 'compile:js', ->
  browserify sources.main, { debug: true, detectGlobals: false, builtins: [] }
    .transform babelify.configure({ stage: 0 })
    .bundle()
    .on 'error', (err) ->
      console.log gutil.colors.red "Oops! you have ERROR! \n" + err.message
      this.emit 'end'
    .pipe source "app.js"
    # .pipe streamify uglify()
    .pipe gulp.dest dist.deploy


gulp.task 'compile:css', ->
  gulp.src sources.css
    .pipe plumber()
    .pipe concat 'app.css'
    .pipe gulp.dest dist.deploy

gulp.task 'compile:static', ->
  gulp.src sources.static
    .pipe gulp.dest dist.deploy
