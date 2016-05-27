var SignupView = (function() {
  function SignupView(options) {
    var defaults = {
      el: '#main',
      id: 'sign-up',
      template: _.template(TEMPLATES['signup.ejs'])
    };
    this.opt = _.extend(defaults, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.opt.user = this.opt.user_model.getUserData();

    this.loadListeners();
  }

  SignupView.prototype.init = function(){
    this.render();
  };

  SignupView.prototype.isActive = function(){
    return (this.$el.attr('view') == this.opt.id);
  };

  SignupView.prototype.loadListeners = function(){
    var _this = this;

    // listen for form submission
    this.$el.on('submit', '.signup-form', function(e){
      e.preventDefault();
      var username = $(this).find('input[name="username"]').val();
      var email = $(this).find('input[name="email"]').val();
      var passwd = $(this).find('input[name="passwd"]').val();
      _this.submit(username, email, passwd);
    });

    // listen for user login success
    $.subscribe('users.signup.success', function(e, user, message){
      _this.onSuccess(user, message);
    });

    // listen for user login failure
    $.subscribe('users.signup.failure', function(e, message){
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

  SignupView.prototype.onAuth = function(user, message){
    this.opt.user = user;
    if (this.isActive()) {
      this.render();
    }
  };

  SignupView.prototype.onFailure = function(message){
    this.$el.find('.message').html(message).addClass('active');
    this.$el.find('[type="submit"]').prop('disabled', false).text('Submit');
  };

  SignupView.prototype.onSignout = function(message){
    this.opt.user = false;
    if (this.isActive()) {
      this.render();
    }
  };

  SignupView.prototype.onSuccess = function(user, message){
    this.opt.user = user;
    this.$el.find('.message').html(message).addClass('active');
    setTimeout(function(){
      window.location.hash = '/';
    }, 2000);
  };

  SignupView.prototype.render = function(){
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);
  };

  SignupView.prototype.submit = function(username, email, passwd){
    // console.log(login, password)
    this.$el.find('[type="submit"]').prop('disabled', true).text('Submitting...');
    this.opt.user_model.signup(username, email, passwd);
  };

  return SignupView;

})();
