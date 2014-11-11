module.exports = function(grunt) {
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', '_dev/js/*.js']
    }, //jshint
    uglify: {
      build: {
        src: '_dev/js/*.js',
        dest: '_dev/js/minified/uglified.js'
      }
    }, //uglify
    concat: {
      dist: {
        src: ['_dev/js/libs/*.js', '_dev/js/minified/uglified.js'],
        dest: 'js/script.min.js',
      }
    }, //concat
    sass: {
      dist: {                            
        options: {                       
          style: 'compressed'
        },
        files: {                        
          'css/style.css': ['_dev/sass/*.scss', '_dev/sass/**/*.scss', '_dev/sass/**/**/*.scss' ] // 'dest': 'src'
        }
      }
    }, //sass
    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/style.css',
        dest: 'css/prefixed/'
      }
    }, //autoprefixer
    cssmin: {
      combine: {
        files: {
          'css/style.css': ['css/prefixed/style.css'] // dest : src
        }
      }
    }, //cssmin
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    }, //imagemin
    connect: {
       server: {
        options: {
          port: 8000,
          base: './'
        }
      }
    }, //connect
    watch : {
      options : { 
          livereload: true, 
      }, 
      scripts : {
        files : ['Gruntfile.js', '_dev/js/*.js'],
        tasks : ['uglify', 'jshint', 'concat']       
      }, // scripts
      images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
            tasks: ['imagemin'],
            options: {
              spawn: false,
            } 
      }, // images
      css : {
        files : ['_dev/sass/*.scss', 
          '_dev/sass/partials/*.scss', 
          '_dev/sass/partials/**/*.scss'],
        tasks : ['sass', 'autoprefixer', 'cssmin']
      }, // css
      html : {
        files : ['*.html', '*.php', '*.jsp'],
        tasks : [],
        options : {
          spawn: false 
        }
      }
    } // watch

  }); //initConfig
  
  grunt.registerTask('default', ['connect', 'watch']);

  // A very basic custom 'logger' task.
  grunt.registerTask('logger', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });
}; // exports
