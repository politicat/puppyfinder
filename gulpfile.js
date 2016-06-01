const gulp = require('gulp');

const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');

const paths = {
  server: ['server/**/*.js'],
  client: ['client/**/*.js', 'client/styles/*.css']
};

gulp.task('eslint', () =>
  gulp.src([paths.server[0], paths.client[0], '!node_modules/**', '!client/lib/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('babel', () =>
    gulp.src(paths.server)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'))
);

gulp.task('webpack', () =>
   gulp.src('./client/app/app.js')
    .pipe(webpack( require('./webpack.config.dev.js') ))
    .pipe(gulp.dest('public/'))
);

gulp.task('watch', () => {
    gulp.watch(paths.server, ['eslint', 'babel']);
    gulp.watch(paths.client, ['eslint', 'webpack']);
});

gulp.task('start', () =>
  nodemon({
    script: 'server/server.js',
    watch: ['build/**/*'],
    env: { 'NODE_ENV': 'development' }
  })
);

gulp.task('default', ['eslint', 'babel', 'webpack', 'watch', 'start']);
