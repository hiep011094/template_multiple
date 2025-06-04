import gulp from 'gulp';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';
import frontMatter from 'gulp-front-matter';
import wrapper from 'layout-wrapper';
import rename from 'gulp-rename';
var cache = require('gulp-cached');

import browser from 'browser-sync';
const browserSync = browser.create();
import autoprefixer from 'gulp-autoprefixer';
const sass = require('gulp-sass')(require('sass'));
import sourcemaps from 'gulp-sourcemaps';
import sortMediaQueries from 'postcss-sort-media-queries';
import postcss from 'gulp-postcss';
import del from 'del';

const path = {
    ejs: {
        layoutDir: `${__dirname}/src/layouts`,
        src: ['./src/**/*.ejs', '!./src/**/_*.ejs'],
        dist: './public/',
    },
    json: {
        package: './package.json',
        newsList: './src/_data/newsList.json',
    },
};

const fs = require("fs");

const filePath = "build_xampp.txt";
let path_xampp = "";
if (fs.existsSync(filePath)) {
    path_xampp = fs.readFileSync(filePath, "utf8");
}

global.jsonData = {};
jsonData.newsListJson = require(path.json.newsList);

// Clean assets
function clean() {
    return del(['./public/assets/']);
}

export function style() {
    if(path_xampp){
        return gulp
        .src('./src/assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'expanded',
            }).on('error', sass.logError)
        )
        .pipe(sourcemaps.write('.'))
        .pipe(cache('linting'))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(gulp.dest(path_xampp + '/assets/css'));
    }else{
        return gulp
        .src('./src/assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'expanded',
            }).on('error', sass.logError)
        )
        .pipe(sourcemaps.write('.'))
        .pipe(cache('linting'))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(gulp.dest('./public/theme_wp/assets/css'));
    }
    
}

//scss
export function scss() {
    if(path_xampp){
        return gulp
        .src('./src/assets/scss/**/*.scss')
        .pipe(gulp.dest('./public/assets/scss'))
        .pipe(gulp.dest(path_xampp + '/assets/scss'));
    }else{
        return gulp
        .src('./src/assets/scss/**/*.scss')
        .pipe(gulp.dest('./public/assets/scss'));
    }
    
}

//JS
export function scripts() {
    if(path_xampp){
        return gulp
        .src('./src/assets/js/**/*.js')
        .pipe(gulp.dest('./public/assets/js'))
        .pipe(gulp.dest(path_xampp + '/assets/js'));
    }else{
        return gulp
        .src('./src/assets/js/**/*.js')
        .pipe(gulp.dest('./public/assets/js'))
        .pipe(gulp.dest('./public/theme_wp/assets/js'));
    }
    
}

export function vender() {
    if(path_xampp){
        return gulp
        .src('./src/assets/vender/**/*.+(php|png|jpg|scss|css|js)')
        .pipe(gulp.dest('./public/assets/vender'))
        .pipe(gulp.dest(path_xampp + '/assets/css'));
    }else{
        return gulp
        .src('./src/assets/vender/**/*.+(php|png|jpg|scss|css|js)')
        .pipe(gulp.dest('./public/assets/vender'))
        .pipe(gulp.dest('./public/theme_wp/assets/vender'));
    }
    
}

//Images
export function images() {
    if(path_xampp){
        return gulp
        .src('./src/assets/images/**/*.+(jpg|jpeg|png|gif|webp|svg|ico)')
        .pipe(gulp.dest('./public/assets/images'))
        .pipe(gulp.dest(path_xampp + '/assets/images'));
    }else{
        return gulp
        .src('./src/assets/images/**/*.+(jpg|jpeg|png|gif|webp|svg|ico)')
        .pipe(gulp.dest('./public/assets/images'))
        .pipe(gulp.dest('./public/theme_wp/assets/images'));
    }
    
}

//videos
export function videos() {
    if(path_xampp){
        return gulp
        .src('./src/assets/videos/**/*.+(mp4|webm|ogg)')
        .pipe(gulp.dest('./public/assets/videos'))
        .pipe(gulp.dest(path_xampp + '/assets/videos'));
    }else{
        return gulp
        .src('./src/assets/videos/**/*.+(mp4|webm|ogg)')
        .pipe(gulp.dest('./public/assets/videos'))
        .pipe(gulp.dest('./public/theme_wp/assets/videos'));
    }
    
}

//videos
export function theme_wp() {
    if(path_xampp){
        return gulp
        .src('./src/theme_wp/**/*.+(php|png|jpg|css|js)')
        .pipe(gulp.dest('./public/theme_wp'))
        .pipe(gulp.dest(path_xampp));
    }else{
        return gulp
        .src('./src/theme_wp/**/*.+(php|png|jpg|css|js)')
        .pipe(gulp.dest('./public/theme_wp'));
    }
    
}

export function templates() {
    var extName = require(path.json.package);
    return gulp
        .src(path.ejs.src)
        .pipe(plumber())
        .pipe(
            frontMatter({
                property: 'data',
            })
        )
        .pipe(ejs())
        .pipe(
            wrapper({
                layout: path.ejs.layoutDir,
                data: {
                    name: 'ホゲのサイト',
                    layoutsDir: path.ejs.layoutDir,
                },
                engine: 'ejs',
                frontMatterProp: 'data',
            })
        )
        .pipe(
            ejs(extName, {
                ext: '.html',
            })
        )
        .pipe(
            rename({
                extname: '.html',
            })
        )
        .pipe(gulp.dest(path.ejs.dist));
}

export function watch() {
    browserSync.init({
        watch: true,
        server: {
            baseDir: './public',
        },
        port: 8080,
    });

    gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel(style));
    gulp.watch('./src/assets/vender/**', vender);
    gulp.watch('./src/assets/js/**/*.js', gulp.parallel(scripts));
    gulp.watch('./src/assets/images/**', images);
    gulp.watch('./src/assets/videos/**', videos);
    gulp.watch('./src/theme_wp/**', theme_wp);
    gulp.watch('./src/**/*.ejs', templates);
    gulp.watch(['./public/*.html', './src/assets/sass/**/*.scss']).on(
        'change',
        browserSync.reload
    );
}

function post_css() {
    let processors = [
        sortMediaQueries({
            sort: 'mobile-first',
        }),
    ];
    return gulp
        .src('./src/assets/scss/*.scss')
        .pipe(
            sass({
                outputStyle: 'expanded',
            }).on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(postcss(processors))
        .pipe(gulp.dest('./public/assets/css'));
}

exports.build = gulp.series(
    clean,
    gulp.parallel(style, vender, scripts, images, videos, theme_wp, templates)
);
exports.watch = watch;
exports.post_css = post_css;
