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
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';

const $ = gulpLoadPlugins();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');

// Resize and/or Format image files
gulp.task('resize', function() {
    return gulp.src('resources/img/*.{png,jpg}')
    .pipe($.responsive({
        '*.jpg': [{
            width: 400,
            rename: {suffix: '_1x'},
            format: 'webp',
            quality: 70
        }, {
            width: 800,
            rename: {suffix: '_2x'},
            format: 'webp',
            quality: 75
        },{
            width: 800,
            quality: 80
        }, {
            width: 1600,
            rename: {suffix: '-1600'},
            format: 'webp'
        }],
        '*.png': [{
            width: 400,
            rename: {suffix: '_1x'},
            format: 'webp',
            quality: 70
        }, {
            width: 800,
            rename: {suffix: '_2x'},
            format: 'webp',
            quality: 75
        }, {
            width: 800,
            quality: 80
        }, {
            width: 1600,
            rename: {suffix: '-1600'},
            format: 'webp'
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

// Clean output directory
gulp.task('clean', () => del(['app/*'], {dot: true}));

// Build production files, the default task
/* gulp.task('default', ['clean'], cb => 
    runSequence(
        'copy',
        ['resize'],
        cb
    )
); */