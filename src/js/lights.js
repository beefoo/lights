//=include vendor/jquery-1.12.1.min.js
//=include vendor/underscore-min.js
//=include vendor/ba-tiny-pubsub.min.js
//=include config.js
//=include utilities.js
//=include templates.js
//=include models/**/*.js
//=include views/**/*.js

$(function(){
  var defaults = _.extend({}, CONFIG);

  var header = new HeaderView(defaults);
  var main = new SpaceView(defaults);
  var user = new UserModel(defaults);
});
