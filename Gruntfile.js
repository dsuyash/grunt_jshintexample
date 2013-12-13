module.exports = function(grunt) {
 
  // configure the tasks
  grunt.initConfig({
 
    jshint: {
	options: {
     	curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
         jQuery: true
       }},
    	all: ['js/*.js']
    }
 
  });
 
  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  // define the tasks
  grunt.registerTask('validate', ['jshint']);
  
};
