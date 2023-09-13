const gulp = require('gulp');

const sass = require('gulp-sass')(require('node-sass'));

const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css',(done) => {
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass()) // this means it needs to be passed through gulp sass module
    .pipe(cssnano()) // this means it needs to be passed through gulp css nano module
    .pipe(gulp.dest('../assets.css')); // pipe is function which calling all these middlewares which are associated with gulp

    console.log('Minified CSS');
    gulp.src('../assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public', // cwd means current working directory
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js',(done) => {
    console.log('minifying js...');
    gulp.src('./assets/sass/**/*.js')
    .pipe(uglify()) 
    .pipe(rev()) 
    .pipe(gulp.dest('./public/assets'))

    .pipe(rev.manifest({
        cwd:'public', // cwd means current working directory
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('images',(done) => {
    console.log('compressing images...');
    gulp.src('./assets/sass/**/*.+(png|hpg|svg|gif|jpeg')
    .pipe(imagemin()) 
    .pipe(rev()) 
    .pipe(gulp.dest('./public/assets'))

    .pipe(rev.manifest({
        cwd:'public', // cwd means current working directory
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//empty the public assets directory
gulp.task('clean:assets',(done) => {
    del.sync(['./public/assets'],{force:true});
    done();
});

gulp.task('build',gulp.series('clean:assets','css','js','images'),(done) =>{
    console.log('Building assets');
    done();
});