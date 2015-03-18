module.exports = function(grunt) {
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    
    uglify: {
      build: {
        src: '_dev/js/*.js',
        dest: '_dev/js/minified/uglified.js'
      }
    }, //uglify
    concat: {
      dist: {
        src: ['_dev/js/minified/uglified.js'],
        dest: 'js/nojquery.min.js',
      }
    },
    sass: {
      dist: {                            
        options: {                       
          style: 'nested'
        },
        files: {                        
          'css/expanded/style.css': ['_dev/sass/*.scss', '_dev/sass/**/*.scss', '_dev/sass/**/**/*.scss' ] // 'dest': 'src'
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
        src: 'css/expanded/style.css',
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
          port: 8002, // http://localhost:8002/
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
        tasks : ['uglify', 'concat']       
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

}; // exports
