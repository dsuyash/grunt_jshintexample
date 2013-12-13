module.exports = function(grunt) {
 
  // configure the tasks
  grunt.initConfig({
 
    copy: {
      build: {
        cwd: 'app',
        src: [ '**', '!**/*.styl', '!**/*.coffee', '!**/*.jade' ],
        dest: 'build',
        expand: true
      },
    },
 
    clean: {
      build: {
        src: [ 'build' ]
      },
      stylesheets: {
        src: [ 'build/**/*.css', '!build/css/application.css' ]
      },
      scripts: {
        src: [ 'build/**/*.js', '!build/js/application.js','!build/lib/**' ]
      },
      po:{
	src: [ 'build/po' ]
      },
    },
 
    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: 'build'
      }
    },
 
    cssmin: {
      build: {
        files: {
          'build/css/application.css': [ 'build/css/*.css' ]
        }
      }
    },
 
    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: {
          'build/js/application.js': [ 'build/js/*.js' ]
        }
      }
    },
 
    jshint: {
	options: {
     	curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
         jQuery: true
       }},
    	all: ['Gruntfile.js', 'build/js/application.js']
    },
 
    watch: {
     
    },
    nggettext_extract: {
            pot: {
                files: {
                    'po/template.pot': ['app/partials/*.html','app/index.html']
                }
            },
        },

	nggettext_compile: {
	    all: {
		files: {
		    'build/js/translations.js': ['po/*.po']
		}
	    },
	},
 
    connect: {
      server: {
        options: {
          port: 4000,
          base: 'build',
          hostname: '*'
        }
      }
    }
 
  });
 
  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-angular-gettext');

  // define the tasks
  grunt.registerTask('validate', ['jshint']);
  grunt.registerTask('translate', ['nggettext_extract']);
  grunt.registerTask('translatecompile', ['nggettext_compile']);

  grunt.registerTask(
    'stylesheets', 
    'Compiles the stylesheets.', 
    [ 'autoprefixer', 'cssmin', 'clean:stylesheets' ]
  );
 
  grunt.registerTask(
    'scripts', 
    'Compiles the JavaScript files.', 
    [  'uglify', 'clean:scripts' ]
  );
 
  grunt.registerTask(
    'build', 
    'Compiles all of the assets and copies the files to the build directory.', 
    [ 'clean:build', 'copy','translatecompile', 'stylesheets', 'scripts']
  );
 
  grunt.registerTask(
    'default', 
    'Watches the project for changes, automatically builds them and runs a server.', 
    [ 'clean:build', 'copy', 'stylesheets', 'scripts', 'connect', 'watch' ]
  );
};
