import gulp from 'gulp';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';
import frontMatter from 'gulp-front-matter';
import wrapper from 'layout-wrapper';
import rename from "gulp-rename";
var cache = require('gulp-cached');

import browser from "browser-sync";
const browserSync = browser.create();
import autoprefixer from "gulp-autoprefixer";
const sass = require('gulp-sass')(require('sass'));
import sourcemaps from "gulp-sourcemaps";
import sortMediaQueries from "postcss-sort-media-queries";
import postcss from "gulp-postcss";
import del from "del";


const path = {
  ejs: {
    layoutDir: `${__dirname}/src/layouts`,
    src: [
      './src/**/*.ejs',
      '!./src/**/_*.ejs'
    ],
    dist: './dits/'
  },
  json: {
    package: './package.json',
    newsList: './src/_data/newsList.json'
  }
};


global.jsonData = {};
jsonData.newsListJson = require(path.json.newsList);

// Clean assets
function clean() {
    return del(["./dits/assets/"]);
}

export function style() {
   
    return gulp
        .src('./src/assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(cache('linting'))
        .pipe(gulp.dest('./dits/assets/css'))
}

//JS
export function scripts(){
    return gulp
        .src('./src/assets/js/**/*.js')
        .pipe(gulp.dest('./dits/assets/js'));
}

export function css(){
  return gulp
      .src('./src/assets/css/**/*.css')
      .pipe(gulp.dest('./dits/assets/css'));
}

//Images
export function images(){  
  return gulp
        .src('./src/assets/images/**/*.+(jpg|jpeg|png|gif|webp|svg|ico)')
        .pipe(gulp.dest("./dits/assets/images"));
}


export function templates() {
    var extName = require(path.json.package);
    return gulp.src(path.ejs.src)
    .pipe(plumber())
    .pipe(frontMatter({
      property: 'data'
    }))
    .pipe(ejs())
    .pipe(wrapper({
      layout: path.ejs.layoutDir,
      data: {
        name: 'ホゲのサイト',
        layoutsDir: path.ejs.layoutDir,      
        
      },
      engine: 'ejs',
      frontMatterProp: 'data'
    }))
    .pipe(ejs(extName, { 'ext': '.html' }))
    .pipe(rename({
        extname: ".html"
      }))
    .pipe(gulp.dest(path.ejs.dist));
  }

export function watch() {
    browserSync.init({
        watch: true,
        server: {
            baseDir: './dits'
        },
        port: 8080
    });      

    gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel(style));
    gulp.watch('./src/assets/css/**/*.css', gulp.parallel(css));
    gulp.watch('./src/assets/js/**/*.js', gulp.parallel(scripts));  
    gulp.watch('./src/assets/images/**',images)
    gulp.watch('./src/**/*.ejs',templates);
    gulp.watch(['./dits/*.html','./src/assets/sass/**/*.scss']).on('change', browserSync.reload);
    
}

function post_css() {
    // console.log(sass);
    let processors = [
        sortMediaQueries({
            sort: "mobile-first",
        }),
    ];
    return gulp.src('./src/assets/scss/*.scss')
        .pipe(sass({ outputStyle: 'expanded' })
            .on('error', sass.logError)).pipe(autoprefixer({
              cascade: false
          })).pipe(postcss(processors))
        .pipe(gulp.dest('./dits/assets/css'))
}

exports.build = gulp.series(clean, gulp.parallel(style,css, scripts, images, templates));
exports.watch = watch;
exports.post_css = post_css;