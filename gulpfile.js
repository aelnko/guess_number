import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import {deleteAsync} from 'del';

// Styles

export const styles = () => {
  return gulp.src('src/sass/style.scss', { srcmaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { srcmaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src('src/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

// Images

const optimizeImages = () => {
  return gulp.src('src/img/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('src/img/*.{jpg,png}')
  .pipe(gulp.dest('build/img'))
}

// WebP

const createWebP = () => {
  return gulp.src('src/img/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/img'))
}

// SVG

const svg = () => gulp.src(['src/img/*.svg', '!src/img/icons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));

const sprite = () => {
  return gulp.src('src/img/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('social-icons.svg'))
  .pipe(gulp.dest('build/img'));
}

// Copy

const copy = (done) => {
  gulp.src([
    'src/fonts/*.{woff2,woff}',
    'src/*.ico',
  ], {
    base: 'src'
  })
  .pipe(gulp.dest('build'))
  done();
}

const fonts = (done) => {
  gulp
    .src(["src/fonts/*.{woff2,woff}"], {
      base: "src",
    })
    .pipe(gulp.dest("build/fonts"));
  done();
};

// Clean

export const clean = () => {
  return deleteAsync('build');
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('src/sass/**/*.scss', gulp.series(styles));
  gulp.watch('src/js/*.js', gulp.series(scripts));
  gulp.watch('src/*.html', gulp.series(html)).on('change', browser.reload);
}

// Build

export const build = gulp.series(
  clean,
  copy,
  copyImages,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebP,
    fonts
  ),
);

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebP,
    fonts
  ),
  gulp.series(
    server,
    watcher
  )
);