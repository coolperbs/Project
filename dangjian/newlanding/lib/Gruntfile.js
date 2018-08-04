module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 压缩JS代码
    uglify : {
      options: {
        mangle: {
          except: ['require']
        }
      },
      compressJs: {
        files : [{
          expand : true,
          cwd: 'src',
          src: '**/*.js',
          dest: 'dist'
        }]
      }
    },
    // 压缩css代码
    cssmin: {
      options: {
        process: function (content, srcpath) {
            console.log( content );
            return content.replace(/[sad ]/g, '_');
          }
      },
      target: {
        files: [{
          expand : true,
          cwd: 'src',
          src: '**/*.css',
          dest: 'dist',
        }]
      }
    },

    // 清理字符
    copy : {
      // 替换css内部图片地址
        css : {
            expand : true,
            cwd: 'dist',
            src: '**/*.css',
            dest: 'dist',
            options : {
                process : function( content, srcpath ) {
                    return content.replace( /\/src\//g, '/dist/' );
                }
            }
        },
        image: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'], 
                dest: 'dist'
            }]
        }
    },

    // 清空文件
    clean : {
      all : 'dist/*'
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

  grunt.registerTask( 'build', [
    'clean',
    // 压缩js
    'uglify',
    // 压缩css
    'cssmin',
    'copy'
  ]);

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['build' ]);

};
