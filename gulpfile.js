import gulp from 'gulp';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';
import frontMatter from 'gulp-front-matter';
import wrapper from 'layout-wrapper';
import rename from 'gulp-rename';
import browser from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import del from 'del';
import fs from 'fs';
import webp from 'gulp-webp';
import merge from 'merge-stream';
import pathModule from 'path';
import { fileURLToPath } from 'url';
import gulpCached from 'gulp-cached';
import cssnano from 'cssnano';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import sortMediaQueries from 'postcss-sort-media-queries';

const sass = gulpSass(dartSass);
const browserSync = browser.create();

// __dirname fix cho ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = pathModule.dirname(__filename);

// Cấu hình path
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

const rootFolder = pathModule.basename(process.cwd());

// Đọc file cấu hình XAMPP
const filePath = 'build_xampp.txt';
let path_xampp = '';
if (fs.existsSync(filePath)) {
  path_xampp = fs.readFileSync(filePath, 'utf8').trim();
}

// Load dữ liệu JSON
const pkg = JSON.parse(fs.readFileSync(path.json.package, 'utf8'));
const newsListJson = JSON.parse(fs.readFileSync(path.json.newsList, 'utf8'));

global.jsonData = {
  newsListJson,
};

// Clean assets
function clean() {
  return del(['./public/assets/']);
}

// Hàm xử lý copy nhiều đích
function copyTo(src, ...dests) {
  let stream = gulp.src(src);
  dests.forEach(dest => {
    stream = stream.pipe(gulp.dest(dest));
  });
  return stream;
}

// CSS
function style() {
  const dests = [
    './public/assets/css',
    `./src/wp-bridge/wp-content/themes/${rootFolder}/assets/css`,
    path_xampp ? `${path_xampp}/assets/css` : null
  ];
  const processors = [
    sortMediaQueries({ sort: 'mobile-first' }),
    cssnano()
  ];

  return gulp.src('./src/assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulpCached('linting'))
    .pipe(gulp.dest(dests[0]))
    .pipe(gulp.dest(dests[1]));
}

// SCSS
function scss() {
  const dests = ['./public/assets/scss',`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/scss`].filter(Boolean);;
  if (path_xampp) dests.push(`${path_xampp}/assets/scss`);
  return copyTo('./src/assets/scss/**/*.scss', ...dests);
}

// JS
function scripts() {
  const dests = ['./public/assets/js',`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/js`, path_xampp ? `${path_xampp}/assets/js` : null].filter(Boolean);;
  return copyTo('./src/assets/js/**/*.js', ...dests);
}

// Vender
function vender() {
  const dests = ['./public/assets/vender',`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/vender`, path_xampp ? `${path_xampp}/assets/vender` : null].filter(Boolean);
  return copyTo('./src/assets/vender/**/*.+(php|png|jpg|scss|css|js)', ...dests);
}

// Images
// function images() {
//   const dests = ['./public/assets/images',`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/images`, path_xampp ? `${path_xampp}/assets/images` : null].filter(Boolean);
//   return copyTo('./src/assets/images/**/*.+(jpg|jpeg|png|gif|webp|svg|ico)', ...dests);
// }

function images() {
  const dests = [
    './public/assets/images',
    `./src/wp-bridge/wp-content/themes/${rootFolder}/assets/images`,
    path_xampp ? `${path_xampp}/assets/images` : null
  ].filter(Boolean);

  // Ảnh gốc
  const originalImages = gulp.src('./src/assets/images/**/*.+(gif|svg|ico|webp)')
    .pipe(gulp.dest(dests[0]))
    .pipe(gulp.dest(dests[1]));

  // Convert sang WebP
  const webpImages = gulp.src('./src/assets/images/**/*.+(jpg|jpeg|png)')
    .pipe(webp())
    .pipe(gulp.dest(dests[0]))
    .pipe(gulp.dest(dests[1]));

  return merge(originalImages,webpImages);
}

// Videos
function videos() {
  const dests = ['./public/assets/videos',`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/videos`, path_xampp ? `${path_xampp}/assets/videos` : null].filter(Boolean);
  return copyTo('./src/assets/videos/**/*.+(mp4|webm|ogg)', ...dests);
}

// Theme WP
function wp_bridge() {
  const dests = ['./public/wp-bridge'];
  if (path_xampp) dests.push(path_xampp);
  return copyTo('./src/wp-bridge/**/*.+(php|png|jpg|css|js)', ...dests);
}

// Templates
function templates() {
  return gulp.src(path.ejs.src)
    .pipe(plumber())
    .pipe(frontMatter({ property: 'data' }))
    .pipe(ejs())
    .pipe(wrapper({
      layout: path.ejs.layoutDir,
      data: {
        name: 'ホゲのサイト',
        layoutsDir: path.ejs.layoutDir,
      },
      engine: 'ejs',
      frontMatterProp: 'data',
    }))
    .pipe(ejs(pkg, { ext: '.html' }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(path.ejs.dist));
}

function addUnlinkHandler02(watcher, srcDir, distDir) {
  watcher.on('unlink', (filepath) => {
    const filePathFromSrc = pathModule.relative(srcDir, filepath); // lấy đường dẫn tương đối so với srcDir
    const destFilePath = pathModule.join(distDir, filePathFromSrc); // map sang distDir
    del.sync(destFilePath);
    console.log(`🗑️ Deleted: ${destFilePath}`);
  });
}
function addUnlinkHandler(watcher, srcDir, distDirs = []) {
  watcher.on("unlink", (filepath) => {
    const filePathFromSrc = pathModule.relative(srcDir, filepath); // vd: "main/app.js"

    distDirs.forEach(distDir => {
      const destFilePath = pathModule.join(distDir, filePathFromSrc);
      del.sync(destFilePath);
      console.log(`🗑️ Deleted: ${destFilePath}`);
    });
  });
}


function addUnlinkHandler01(watcher, srcDir, distDir, options = {}) {
  watcher.on('unlink', (filepath) => {
    const filePathFromSrc = pathModule.relative(srcDir, filepath);
    let destFilePath = pathModule.join(distDir, filePathFromSrc);

    // Nếu là EJS thì đổi sang .html
    if (options.extReplace) {
      destFilePath = destFilePath.replace(/\.ejs$/, options.extReplace);
    }

    del.sync(destFilePath);
    console.log(`🗑️ Deleted: ${destFilePath}`);
  });
}

// function addScssUnlinkHandler(watcher, srcDir, distDir) {
//   watcher.on("unlink", (filepath) => {
//     const filePathFromSrc = pathModule.relative(srcDir, filepath); // ví dụ: "components/foo.scss"
//     const baseName = filePathFromSrc.replace(/\.scss$/, "");       // "components/foo"

//     const cssFile = pathModule.join(distDir, baseName + ".css");
//     const mapFile = pathModule.join(distDir, baseName + ".css.map");

//     del.sync([cssFile, mapFile]);
//     console.log(`🗑️ Deleted: ${cssFile}, ${mapFile}`);
//   });
// }

function addScssUnlinkHandler(watcher, srcDir, distDirs = []) {
  watcher.on("unlink", (filepath) => {
    const filePathFromSrc = pathModule.relative(srcDir, filepath); 
    const baseName = filePathFromSrc.replace(/\.scss$/, ""); // bỏ đuôi .scss

    distDirs.forEach(distDir => {
      const cssFile = pathModule.join(distDir, baseName + ".css");
      const mapFile = pathModule.join(distDir, baseName + ".css.map");

      del.sync([cssFile, mapFile]);
      console.log(`🗑️ Deleted: ${cssFile}, ${mapFile}`);
    });
  });
}


// PostCSS
function post_css() {
  const processors = [
    sortMediaQueries({ sort: 'mobile-first' }),
  ];
  return gulp.src('./src/assets/scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/assets/css'));
}

// Watch task
// function watchFiles() {
//   browserSync.init({
//     watch: true,
//     server: { baseDir: './public' },
//     port: 8080,
//   });

//   gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel(style));
//   gulp.watch('./src/assets/vender/**', vender);
//   gulp.watch('./src/assets/js/**/*.js', gulp.parallel(scripts));
//   gulp.watch('./src/assets/images/**', images);
//   gulp.watch('./src/assets/videos/**', videos);
//   gulp.watch('./src/wp-bridge/**', wp_bridge);
//   gulp.watch('./src/**/*.ejs', templates);
//   gulp.watch(['./public/*.html', './src/assets/sass/**/*.scss']).on('change', browserSync.reload);

  
// }
function watchFiles() {
  browserSync.init({
    watch: true,
    server: { baseDir: './public' },
    port: 8080,
  });

  // SCSS
  // gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel(style));
   // SCSS
  const scssWatcher = gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel(style));
  const scssDestDirs = [
    pathModule.resolve('./public/assets/css'),
    pathModule.resolve(`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/css`)
  ];
  if (path_xampp) scssDestDirs.push(pathModule.resolve(`${path_xampp}/assets/css`));

  addScssUnlinkHandler(
    scssWatcher,
    pathModule.resolve('./src/assets/scss'),
    scssDestDirs
  );
  
  // Vender
  const venderWatcher = gulp.watch('./src/assets/vender/**', vender);
  addUnlinkHandler(venderWatcher, pathModule.resolve('./src/assets/vender'), [
    pathModule.resolve('./public/assets/vender'),
    pathModule.resolve(`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/vender`),
    path_xampp ? pathModule.resolve(`${path_xampp}/assets/vender`) : null
  ].filter(Boolean));

  // JS
  const jsWatcher = gulp.watch('./src/assets/js/**/*.js', gulp.parallel(scripts));
  addUnlinkHandler(jsWatcher, pathModule.resolve('./src/assets/js'), [
    pathModule.resolve('./public/assets/js'),
    pathModule.resolve(`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/js`),
    path_xampp ? pathModule.resolve(`${path_xampp}/assets/js`) : null
  ].filter(Boolean));

  // Images
  const imgWatcher = gulp.watch('./src/assets/images/**', images);
  addUnlinkHandler(imgWatcher, pathModule.resolve('./src/assets/images'), [
    pathModule.resolve('./public/assets/images'),
    pathModule.resolve(`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/images`),
    path_xampp ? pathModule.resolve(`${path_xampp}/assets/images`) : null
  ].filter(Boolean));

  // Videos
  const videoWatcher = gulp.watch('./src/assets/videos/**', videos);
  addUnlinkHandler(videoWatcher, pathModule.resolve('./src/assets/videos'), [
    pathModule.resolve('./public/assets/videos'),
    pathModule.resolve(`./src/wp-bridge/wp-content/themes/${rootFolder}/assets/videos`),
    path_xampp ? pathModule.resolve(`${path_xampp}/assets/videos`) : null
  ].filter(Boolean));

  // Theme WP
  const themeWatcher = gulp.watch('./src/wp-bridge/**', wp_bridge);
  addUnlinkHandler02(themeWatcher, pathModule.resolve('./src/wp-bridge'), pathModule.resolve('./public/wp-bridge'));

  // EJS
  // gulp.watch('./src/**/*.ejs', templates);
  const ejsWatcher = gulp.watch('./src/**/*.ejs', templates);
  addUnlinkHandler01(
    ejsWatcher,
    pathModule.resolve('./src'),
    pathModule.resolve('./public'),
    { extReplace: '.html' }
  );

  // Reload
  gulp.watch(['./public/*.html', './src/assets/sass/**/*.scss']).on('change', browserSync.reload);
}


// Export
const build = gulp.series(
  clean,
  gulp.parallel(style, vender, scripts, images, videos, wp_bridge, templates)
);

export {
  style,
  scss,
  scripts,
  vender,
  images,
  videos,
  wp_bridge,
  templates,
  watchFiles as watch,
  post_css,
  build,
  clean
};
