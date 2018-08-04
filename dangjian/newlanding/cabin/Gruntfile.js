module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 压缩JS代码
        uglify: {
            options: {
                mangle: {
                    except: ['require']
                },
                compress: {
                    drop_console: true //删除全部console信息
                }
            },
            // compressJs: {
            //     files: [{
            //         expand: true,
            //         cwd: 'src',
            //         src: ['**/*.js', '!h5/view/2017/618/*.js'],
            //         dest: 'dist'
            //     }]
            // },
            compressJs: {
                files: {
                    'dist/cabin/core/cabin.js': [
                        'src/cabin/layout/layout.js',
                        'src/cabin/layout/layout.class.js',
                        'src/cabin/layout/monitor.js',
                        'src/cabin/page/page.js',
                        'src/cabin/widgets/minipop/minipop.js',
                        'src/cabin/widgets/nextpage/nextpage.js',
                        'src/cabin/widgets/pop/pop.js',
                        'src/cabin/widgets/loading/loading.js',
                        'src/cabin/widgets/tips/tips.js',
                        'src/cabin/core/cabin.js',
                        'src/cabin/common/cookie/cookie.js',
                        'src/cabin/common/tools/tools.js'
                    ]
                }
            },
            compressAllJs: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/cabin/common', //js目录下
                        src: '**/*.js', //所有js文件
                        dest: 'dist/cabin/common' //输出到此目录下
                    },
                    {
                        expand: true,
                        cwd: 'src/cabin/config', //js目录下
                        src: '**/*.js', //所有js文件
                        dest: 'dist/cabin/config' //输出到此目录下
                    },
                    {
                        expand: true,
                        cwd: 'src/cabin/main', //js目录下
                        src: '**/*.js', //所有js文件
                        dest: 'dist/cabin/main' //输出到此目录下
                    },
                    {
                        expand: true,
                        cwd: 'src/cabin/demolayout', //js目录下
                        src: '**/*.js', //所有js文件
                        dest: 'dist/cabin/demolayout' //输出到此目录下
                    },
                    {
                        expand: true,
                        cwd: 'src/cabin/lib', //js目录下
                        src: '**/*.js', //所有js文件
                        dest: 'dist/cabin/lib' //输出到此目录下
                    },
                    {
                        expand: true,
                        cwd: 'src/cabin/pages', //js目录下
                        src: '**/*.js', //所有js文件
                        dest: 'dist/cabin/pages' //输出到此目录下
                    },
                    {
                        expand: true,
                        cwd: 'src/cabin/widgets', //js目录下
                        src: '**/*.js', //所有js文件
                        dest: 'dist/cabin/widgets' //输出到此目录下
                    },
                    {
                        expand: true,
                        cwd: 'src/cabin/modules', //js目录下
                        src: '**/*.js', //所有js文件
                        dest: 'dist/cabin/modules' //输出到此目录下
                    },
                ]
            }
        },
        /* scss */
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['cabin/theme/**/*.scss','!cabin/theme/base/**/*.scss','!cabin/theme/**/var.scss'],
                    dest: 'src',
                    ext: '.css'
                }]
            }
        },
        /*scss动态编译*/
        watch: {
            scripts: {
                files: ['src/cabin/theme/**/*.scss'],
                tasks: ['sass', 'clean:scss'],
                options: {
                    spawn: false
                }
            }
        },
        // 压缩css代码
        cssmin: {
            options: {
                process: function (content, srcpath) {
                    console.log(content);
                    return content.replace(/[sad ]/g, '_');
                }
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.css',
                    dest: 'dist'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true, //清除HTML注释
                    collapseWhitespace: true, //压缩HTML
                    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
                    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
                    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
                    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
                    minifyJS: true, //压缩页面JS
                    minifyCSS: true //压缩页面CSS
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.tpl',
                    dest: 'dist'
                }]
            }
        },

        // 清理字符
        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.{html,htm,eot,ttf,woff}'],
                        dest: 'dist'
                    }
                ]
            },
            image: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.{png,jpg,jpeg,gif,webp,svg,ico,mp3}'],
                        dest: 'dist'
                    }
                ]
            },
            // 替换css内部图片地址
            fixCss: {
                expand: true,
                cwd: 'dist',
                src: ['**/*.css', '!h5/view/2017/618/*.css'],
                dest: 'dist',
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/\/src\//g, '/dist/');
                    }
                }
            },
            fixJs: {
                expand: true,
                cwd: 'dist',
                src: ['**/*.js', '!h5/view/2017/618/*.js'],
                dest: 'dist',
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/h5\/src\/h5/g, 'h5/dist/h5');
                    }
                }
            },
            task618: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: 'h5/view/2017/618/*.js',
                    dest: 'dist'
                }]
            }

        },

        // 清空文件
        clean: {
            all: 'dist/*',
            scss: '.sass-cache'
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-license');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', [
        'clean:all',
        'copy:html',
        'copy:image',
        // 压缩js
        'uglify',
        'sass:dist',
        // 压缩css
        'cssmin',
        'htmlmin',
        'copy:fixCss',
        'copy:fixJs',
        'copy:task618',
        'clean:scss'
    ]);

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['build']);

    grunt.registerTask('watchScss', ['watch']);
};
