const gulp        = require('gulp');
const browserSync = require('browser-sync').create();

function reload(){
  browserSync.reload();
  done();
}

function watchTask(){
  browserSync.init({
      server: {
        baseDir: `./`,
        notify: false,
        open: true,
        cors: true,
        ui: false
      }

  });
  gulp.watch([`js/*.js`], gulp.series(reload));
}

function start() {
  watchTask();
}

exports.default = watchTask;
exports.start = start;
