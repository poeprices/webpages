'use strict';
const DIST_MODE = process.argv[process.argv.length-1] === 'dist';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const compress = require('compression');
const bs = require('browser-sync').create();
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

// Just adding placeholders to keep linting happy
let dist = function(){};
let dev = function(){};

const paths = {
    root: {
        src: 'src/*.*',
        dest: 'public/'
    },
    images: {
        src: 'src/img/**/*',
        dest: 'public/img'
    },
    styles: {
        src: 'src/sass/**/*.*',
        dest: 'public/css/'
    },
    scripts: {
        src: ['src/js/*.js'],
        dest: 'public/js/'
    }
};

function root() {
    return gulp.src(paths.root.src)
        .pipe(gulp.dest(paths.root.dest));
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(plumber())
        .pipe(sass(DIST_MODE ? { outputStyle: 'compressed' } : {}))
        .pipe(autoprefixer({ browsers: ['> 5%'] }))
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest));
}

function sourcemaps(){
    // TODO: Sourcemaps
}

function minify(){
    // TODO: Minify
}

function bundle(){
    // TODO: Concatenate files together
}

function clean() {
    return del([
        'public/*.*',
        'public/**/*.*'
    ]);
}

function serve(){
    bs.init({
        server: {
            baseDir: 'public',
            middleware: [compress()]
        },
        open: false
    });
}

function watch() {
    gulp.watch(paths.root.src, root);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(['public/*.*', 'public/**/*.*'], function(done){
        bs.reload();
        done();
    });
}

dist = gulp.series(clean, gulp.parallel(root, images, styles, scripts));
dev = gulp.series(dist, gulp.parallel(watch, serve));

gulp.task('dev', dev);
gulp.task('dist', dist);
gulp.task('clean', clean);
gulp.task('default', dev);
