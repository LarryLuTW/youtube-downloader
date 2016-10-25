var gulp = require('gulp');
var babel = require('gulp-babel');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var compilerOptions = require('./tsconfig.json').compilerOptions;

const SRC = 'src/**/*.ts';
const DEST = 'build';
const WATCH_LIST = ['src/**/*.ts', 'index.ts'];

gulp.task('tsc-es6', function () {
    return gulp.src(SRC)
        .pipe(sourcemaps.init())
        .pipe(ts(compilerOptions))
        .on('error', function (err) {
            console.log(err.stack);
            this.emit('end');
        })
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: 'src'
        }))
        .pipe(gulp.dest(DEST))
});

gulp.task('tsc-es5', function () {
    return gulp.src(SRC)
        .pipe(sourcemaps.init())
        .pipe(ts(compilerOptions))
        .on('error', function (err) {
            console.log(err.stack);
            this.emit('end');
        })
        .pipe(babel({
            presets: ['es2015'],
            plugins: [
                [
                    "transform-runtime", {
                        "polyfill": false,
                        "regenerator": true
                    }
                ]
            ]
        }))
        .on('error', function (err) {
            console.log(err.stack);
            this.emit('end');
        })
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: 'src'
        }))
        .pipe(gulp.dest(DEST))
});

gulp.task('watch', function () {
    return gulp.watch(WATCH_LIST, ['tsc-es6']);
});

gulp.task('default', ['tsc-es6', 'watch']);
gulp.task('es5', ['tsc-es5']);

