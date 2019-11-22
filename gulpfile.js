const gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sourceMap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoPrefixer = require('autoprefixer');
const flexBugs = require('postcss-flexbugs-fixes');
const csso = require('gulp-csso');
const webpack = require('webpack-stream');
const htmlMin = require('gulp-htmlmin');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync');

const TerserPlugin = require('terser-webpack-plugin');

const server = browserSync.create();

gulp.task('html', () => gulp
  .src('source/*.html')
  .pipe(
    htmlMin({
      collapseWhitespace: true,
      removeComments: true,
    }),
  )
  .pipe(
    gulp.dest('build'),
  ));

gulp.task('css', () => gulp
  .src('source/sass/style.scss')
  .pipe(
    plumber(),
  )
  .pipe(
    sourceMap.init(),
  )
  .pipe(
    sass(),
  )
  .pipe(
    postcss(
      [
        autoPrefixer(),
        flexBugs,
      ],
    ),
  )
  .pipe(
    csso(),
  )
  .pipe(
    rename('style.min.css'),
  )
  .pipe(
    sourceMap.write('.'),
  )
  .pipe(
    gulp.dest('build/css'),
  )
  .pipe(
    server.stream(),
  ));

gulp.task('images', () => gulp
  .src('source/img/**/*.{png,jpg,jpeg,svg}')
  .pipe(
    imageMin(
      [
        imageMin.optipng({
          optimizationLevel: 3,
        }),
        imageMin.jpegtran({
          progressive: true,
        }),
        imageMin.svgo(),
      ],
    ),
  )
  .pipe(
    gulp.dest('build/img'),
  ));

gulp.task('js', () => gulp
  .src('source/js/index.js')
  .pipe(
    webpack({
      mode: 'development',
      devtool: 'source-map',
      output: {
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
        ],
      },
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    }),
  )
  .pipe(
    gulp.dest('build/js'),
  ));

gulp.task('clean', () => del('build'));

gulp.task('copy', () => gulp
  .src(
    [
      'source/fonts/**/*.{woff,woff2}',
      'source/*.ico',
    ],
    {
      base: 'source',
    },
  )
  .pipe(
    gulp.dest('build'),
  ));

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: true,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('css'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/**', gulp.series('js', 'refresh'));
  gulp.watch('source/img/**/*.{png,jpg,jpeg,svg}', gulp.series('images', 'refresh'));
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'js', 'html', 'images'));
gulp.task('start', gulp.series('build', 'server'));
