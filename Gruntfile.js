module.exports = function (grunt) {
	'use strict';

    // Add tasks
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');


    // Project configuration
    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: false,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                proto: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            tests: {
                options: {
                    globals: {
                        describe: true,
                        it: true
                    }
                },
                src: ['test/**/*.js']
            },
            scripts: {
                src: ['server/**/*.js', 'index.js']
            }
        },

        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    watch: ['server', 'index.js'],
                    env: {
                        DEBUG: 'engine*'
                    }
                }
            }
        },

        watch: {
            scripts: {
                files: ['server/**/*.js', 'index.js'],
                tasks: ['jshint:scripts'],
                options: {
                    spawn: false
                }
            }
        }
    });


    // Command line tasks
    grunt.registerTask('serve', ['concurrent']);
};
