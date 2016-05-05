var sourceRoot = "./src";
var publicRoot = ".";
var sourceAssets  = sourceRoot;
var publicAssets = publicRoot;

module.exports = {
  include: {
    dest: publicAssets + '/js/',
    opt: {},
    src: [
      sourceAssets + '/js/lights.js'
    ]
  },
  sass: {
    src: sourceAssets + "/scss/**/*.scss",
    dest: publicAssets + "/css",
    opt: {outputStyle: 'compressed'}
  },
  templates: {
    src: sourceAssets + "/templates/**/*.ejs",
    dest: sourceAssets + '/js/',
    outputFile: 'templates.js',
    variable: 'TEMPLATES',
    opt: {}
  },
  uglify: {
    dest: publicAssets + '/js/',
    opt: {},
    src: sourceAssets + "/js/**/*.js",
  }
};
