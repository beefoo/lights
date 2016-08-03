'use strict';

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
  var modals_view = new ModalsView(defaults);

  var routes = {
    // account
    '/account': function(){
      this.account_view = this.account_view || new AccountView(defaults);
      this.account_view.init();
    },

    // forgot password
    '/forgot': function(){
      this.forgot_view = this.forgot_view || new ForgotView(defaults);
      this.forgot_view.init();
    },

    // reset password
    '/reset/:code': function(code){
      this.reset_view = this.reset_view || new ResetView(_.extend({},defaults,{code: code}));
      this.reset_view.init();
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
    '/app': function(){
      this.hue_view = this.hue_view || new HueView(defaults);
      this.space_view = this.space_view || new SpaceView(defaults);
      this.space_view.init();
    },

    // home
    '': function(){
      this.space_readonly_view = this.space_readonly_view || new SpaceReadonlyView(defaults);
      this.space_readonly_view.init();
    }
  };

  var router = Router(routes);
  router.init('/');

});
