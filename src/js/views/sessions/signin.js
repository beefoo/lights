var SigninView = (function() {
  function SigninView(options) {
    var defaults = {
      el: '#main',
      id: 'sign-in',
      template: _.template(TEMPLATES['signin.ejs'])
    };
    this.opt = _.extend(defaults, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.opt.user = this.opt.user_model.getUserData();

    this.loadListeners();
  }

  SigninView.prototype.init = function(){
    this.render();
  };

  SigninView.prototype.isActive = function(){
    return (this.$el.attr('view') == this.opt.id);
  };

  SigninView.prototype.loadListeners = function(){
    var _this = this;

    // listen for form submission
    this.$el.on('submit', '.signin-form', function(e){
      e.preventDefault();
      var email = $(this).find('input[name="email"]').val();
      var pass = $(this).find('input[name="pass"]').val();
      _this.submit(email, pass);
    });

    // listen for user login success
    $.subscribe('users.signin.success', function(e, user, message){
      _this.onSuccess(user, message);
    });

    // listen for user login failure
    $.subscribe('users.signin.failure', function(e, message){
      _this.onFailure(message);
    });

    // listen for auth success
    $.subscribe('users.auth.success', function(e, user, message){
      _this.onAuth(user, message);
    });

    // listen for sign out
    $.subscribe('users.signout', function(e, message){
      _this.onSignout(message);
    });
  };

  SigninView.prototype.onAuth = function(user, message){
    this.opt.user = user;
    if (this.isActive()) {
      this.render();
    }
  };

  SigninView.prototype.onFailure = function(message){
    this.$el.find('.message').html(message).addClass('active');
    this.$el.find('[type="submit"]').prop('disabled', false).text('Submit');
  };

  SigninView.prototype.onSignout = function(message){
    this.opt.user = false;
    if (this.isActive()) {
      this.render();
    }
  };

  SigninView.prototype.onSuccess = function(user, message){
    this.opt.user = user;
    this.$el.find('.message').html(message).addClass('active');
    setTimeout(function(){
      window.location.hash = '/';
    }, 2000);
  };

  SigninView.prototype.render = function(){
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);
  };

  SigninView.prototype.submit = function(email, password){
    // console.log(email, password)
    this.$el.find('[type="submit"]').prop('disabled', true).text('Logging In...');
    this.opt.user_model.signin(email, password);
  };

  return SigninView;

})();
