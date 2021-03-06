module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    'src/core.js',
                    'src/canvasLayer.js',
                    'src/models/base.js',
                    'src/models/pie.js',
                    'src/models/bar.js',
                    'src/models/line.js',
                    'src/charts/pie.js',
                    'src/charts/bar.js',
                    'src/charts/line.js',
                    'src/charts/categoryBar.js',
                    // 'src/charts/trigonometricCombo.js',
                    'src/components/animatedPart.js',
                    'src/components/dataset.js',
                    'src/components/grid.js',
                    'src/components/axis.js',
                    'src/components/numberAxis.js',
                    'src/components/timeAxis.js',
                    'src/components/xaxis.js',
                    'src/components/yaxis.js',
                    'src/components/categoryAxis.js',
                    'src/components/element.js',
                    'src/components/slice.js',
                    'src/components/bar.js',
                    'src/components/point.js',
                    'src/components/label.js',
                    'src/components/crosshair.js',
                    'src/components/tip.js',
                    'src/components/tooltip.js',
                    'src/end.js'
                ],
                dest: 'js/chartmander.js'
            }
        },
        uglify: {
            options: {
                compress: true
            },
            js: {
                files: {
                    'js/chartmander.min.js': ['js/chartmander.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['concat']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat']);
};
