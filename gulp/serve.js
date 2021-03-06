import gulp from 'gulp'
import nodemon from 'nodemon'
import path from 'path'

gulp.task('serve', ['watch'], () => {
  return nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, '../build/app'),
    ignore: ['*'],
    watch: ['nonexistent/'],
    ext: 'nonexistent'
  }).on('restart', () => {
    console.log('Patched!')
  })
})
