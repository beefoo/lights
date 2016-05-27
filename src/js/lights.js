//=include vendor/jquery-1.12.1.min.js
//=include vendor/underscore-min.js
//=include vendor/ba-tiny-pubsub.min.js
//=include vendor/director.min.js
//=include config.js
//=include utilities.js
//=include templates.js
//=include models/**/*.js
//=include views/**/*.js

$(function(){
  var defaults = _.extend({}, CONFIG);
  defaults.user_model = new UserModel(defaults);
  var header_view = new HeaderView(defaults);

  var routes = {
    // account
    '/account': function(){

    },

    // forgot password
    '/forgot': function(){

    },

    // sign in
    '/signin': function(){
      this.signin_view = this.signin_view || new SigninView(defaults);
      this.signin_view.init();
    },

    // sign up
    '/signup': function(){
      this.signup_view = this.signup_view || new SignupView(defaults);
      this.signup_view.init();
    },

    // home
    '': function(){
      this.space_view = this.space_view || new SpaceView(defaults);
      this.space_view.init();
    }
  };

  var router = Router(routes);

  router.configure({
    on: function(){}
  });

  router.init('/');

});
