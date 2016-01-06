var gulp              = require("gulp");
var gutil             = require("gulp-util");
var sourcemaps        = require("gulp-sourcemaps");
var webpack           = require("webpack");
var WebpackDevServer  = require("webpack-dev-server");
var webpackConfig     = require("./webpack.config.js");
var stream            = require("webpack-stream");

var postcss           = require('gulp-postcss');
var autoprefixer      = require('autoprefixer');
var precss            = require('precss');
var cssnext           = require('cssnext');

var path = {
  HTML: 'index.html',
  ALL: ['src/**/*.js', 'index.html'],
  JS: ['src/**/*.js'],
  CSS: ['src/**/*.css'],
  MINIFIED_OUT: 'build/build.min.js',
  DEST_SRC: 'src',
  DEST_BUILD: 'build',
  DEST: 'build',
};

// Set up webpack
gulp.task("webpack", [], function(){
  return gulp.src(path.ALL) // gulp looks for all source files under specified path
    .pipe(sourcemaps.init())
    .pipe(stream(webpackConfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.DEST));
});

gulp.task("webpack-dev-server", function (callback) {
  // start a webpack-dev-server
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  new WebpackDevServer(webpack(myConfig), {
    // server and middleware options
    publicPath: "/" + myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(9000, "localhost", function(err){
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // server listening
    gutil.log("[webpack-dev-server]", "http://localhost:9000/webpack-dev-server/index.html");

    // Keep the server alive or continue?
    // callback();
  });
})

// Set up POSTCSS
gulp.task('css', function(){
  var processors = [
    autoprefixer({browsers:['last 2 versions']}),
    cssnext, 
    precss
  ];
  return gulp.src('src/css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function(){
  gulp.watch(path.ALL, ['webpack']);
  gulp.watch(path.CSS, ['css']);
});

gulp.task('default', ['webpack-dev-server', 'watch']);
