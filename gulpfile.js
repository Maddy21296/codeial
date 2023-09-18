const gulp = require('gulp');
// this will conver scss into css
const sass = require('gulp-sass')(require('sass'));
// this lib will minify the css
const cssnano = require('gulp-cssnano');

const img = require('imagemin');

const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
// const del = require('del');

// this gulp task will minify the css
gulp.task('css', async function(){

   // this lib will remname the assets
   const rev = await import('gulp-rev').then((module) => module.default || module.rev);


   console.log(rev);

   console.log('Minifying css...');

   // this is for the development
   gulp.src('./assets/sass/**/*.scss') // where to look for scss files sass/**  means all the folder inside sass and /*.scss all the files whith scss extension
   .pipe(sass()) // converting all of the files into css
   .pipe(cssnano()) // minifying all the converted files
   .pipe(gulp.dest('./assets.css')) // defining where to store the final result

   // this is for the production
   return gulp.src('./assets/**/*.css')
   .pipe(rev())// this will rename all the files
   .pipe(gulp.dest('./public/assets'))
   .pipe(rev.manifest({ // menifest maintain a map bw the original file name and the new name of the file
        cwd: 'public',
        merge: true
   }))
   .pipe(gulp.dest('./public/assets'));
});

// this gulp task will minify the js
gulp.task('js', async function(){

    // this lib will remname the assets
    const rev = await import('gulp-rev').then((module) => module.default || module.rev);
 
 
    console.log(rev);
 
    console.log('Minifying js...');
 
    // this is for the development
    gulp.src('./assets/sass/**/*.js') // where to look for scss files sass/**  means all the folder inside sass and /*.scss all the files whith scss extension
    .pipe(uglify()) // converting all of the files into js
    .pipe(rev()) // minifying all the converted files
    .pipe(gulp.dest('./assets.js')) // defining where to store the final result
 
    // this is for the production
    return gulp.src('./assets/**/*.js')
    .pipe(rev())// this will rename all the files
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({ // menifest maintain a map bw the original file name and the new name of the file
         cwd: 'public',
         merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
 });
 

// this gulp task will minify the css
gulp.task('images', async function(){

    // this lib will remname the assets
    const rev = await import('gulp-rev').then((module) => module.default || module.rev);
 
 
    console.log(rev);
 
    console.log('Minifying images...');
 
    // this is for the development
    gulp.src('./assets/sass/**/*.+(png|hpg|svg|gif|jpeg') // where to look for scss files sass/**  means all the folder inside sass and /*.scss all the files whith scss extension
    .pipe(imagemin()) // converting all of the files into image
    .pipe(rev()) // minifying all the converted files
    .pipe(gulp.dest('./assets.images')) // defining where to store the final result
 
    // this is for the production
    return gulp.src('./assets/**/*.+(png|hpg|svg|gif|jpeg')
    .pipe(rev())// this will rename all the files
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({ // menifest maintain a map bw the original file name and the new name of the file
         cwd: 'public',
         merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
 });
 
// empty the public assets directory
// gulp.task('clean:assets',async function(){
//     del.sync(['./public/assets'],{force:true});
// });

gulp.task('build',gulp.series('css','js','images'),async function(){
    console.log('Building assets');
    done();
});
// gulp.task('js',(done) => {
//     console.log('minifying js...');
//     gulp.src('./assets/sass/**/*.js')
//     // .pipe(uglify-es()) 
//     .pipe(rev()) 
//     .pipe(gulp.dest('./public/assets'))

//     .pipe(rev.manifest({
//         cwd:'public', // cwd means current working directory
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });



// const gulp = require('gulp');

// // const sass = require('gulp-sass');
// const cssnano = require('gulp-cssnano');
// import rev from 'gulp-rev';
// // const rev = require('gulp-rev');
// const uglify = require('gulp-uglify-es').default;
// const imagemin = require('gulp-imagemin');
// const del = require('del');
// const sass = require('gulp-sass')(require('sass'));

// gulp.task('css', function(done){
//     console.log('minifying css...');
//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'));

//      gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });

// gulp.task('js', function(done){
//     console.log('minifying js...');
//      gulp.src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done()
// });

// gulp.task('images', function(done){
//     console.log('compressing images...');
//     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });

// // empty the public/assets directory
// gulp.task('clean:assets', function(done){
//     del.sync('./public/assets');
//     done();
// });

// gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
//     console.log('Building assets');
//     done();
// });