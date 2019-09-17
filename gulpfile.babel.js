/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

//import path from 'path';
import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';

const $ = gulpLoadPlugins();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');

// Clean output directory
gulp.task('clean', () => del(['app/*'], {dot: true}));

// Optimize images
gulp.task('images', () =>
    gulp.src('resources/css/img/**/*')
    .pipe($.cache($.imagemin({
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest('app/css/img'))
    .pipe($.size({title: 'image'}))
);

// Resize and/or Format main image files
gulp.task('resize', function() {
    return gulp.src('resources/img/*.{png,jpg}')
    .pipe($.responsive({
        '*.jpg': [{
            width: 400,
            rename: {suffix: '_1px'},
            format: 'webp',
            quality: 70
        },{
            width: 400,
            quality: 80,
            format: 'jpg'
        }],
        '*.png': [{
            width: 400,
            rename: {suffix: '_1px'},
            format: 'webp',
            quality: 70
        },{
            width: 400,
            quality: 80
        }],
    }, {
        // Use progressive (interlace) scan for jpg and png output
        progressive: true,
        // Strip all metadata
        withMetadata: false,
        // Turn on enlargement 
        withoutEnlargement: false,
    }))
    .pipe(gulp.dest('app/img'));
});

// Resize thumbnail image files
gulp.task('thumbnail', () => {
    return gulp.src('resources/img/thumbnail/*')
    .pipe($.responsive({
        '*.jpg': [{
            width: 250,
            format: 'jpg'
        }, {
            width: 500,
            rename: {suffix: '-500'},
            format: 'jpg'
        }],
    }, {
        // Use progressive (interlace) scan for jpg and png output
        progressive: true,
        // Strip all metadata
        withMetadata: false,
        // Turn on enlargement 
        withoutEnlargement: false,
    }))
    .pipe(gulp.dest('app/img'));
});

// Lint JavaScript
gulp.task('lint', () =>
    gulp.src(['app/js/**/*.js', 'app/sw.js', '!node_modules/**'], {allowEmpty: true})
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
);

// Copy all files at the root level (app)
gulp.task('copy', () => 
    gulp.src([
        'resouces/*',
        '!resources/index.html'
    ], {
        dot: true
    }).pipe(gulp.dest('app'))
      .pipe($.size({title: 'copy'}))
);

// Scan your HTML for assests & optimize them
gulp.task('html', () => {
    return gulp.src('app/**/*.html')
    .pipe($.useref({
        searchPath: '{.tmp, app}',
        noAssets: true
    }))

    // Minify any html
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('./'))
});

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    // For best performance, don't add Sass partials to 'gulp.src'
    return gulp.src([
        'resources/css/**/*.css',
        'resources/css/**/*.scss',
        '!resources/img/**'
    ])
        .pipe($.newer('.tmp/css'))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precition: 10
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('.tmp/css'))
        // Concatenate and minify styles
        .pipe($.if('*.css', $.cssnano()))
        .pipe($.size({title: 'css'}))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('app/css'))
        .pipe(gulp.dest('.tmp/css'));
});


//Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.

gulp.task('scripts', () => 
    gulp.src(['./resources/js/**/*.js'])
        .pipe($.newer('.tmp/js'))
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/js'))
        .pipe($.uglify({
            output:{
                comments: 'some'
            }
        }))
        // Output files
        .pipe($.size({title: 'js'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('app/js'))
        .pipe(gulp.dest('.tmp/js'))
);

// Build production files, the default task
 gulp.task('default', gulp.series('clean', cb => {
    runSequence(
        'copy',
        ['html', 'styles', 'scripts', 'resize', 'images', 'thumbnail','lint'],
        cb
    )
 })
); 