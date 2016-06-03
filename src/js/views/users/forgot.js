var ForgotView = (function() {
  function ForgotView(options) {
    var defaults = {
      el: '#main',
      id: 'forgot',
      template: _.template(TEMPLATES['forgot.ejs'])
    };
    this.opt = _.extend(defaults, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.opt.user = this.opt.user_model.getUserData();

    this.loadListeners();
  }

  ForgotView.prototype.init = function(){
    this.render();
  };

  ForgotView.prototype.isActive = function(){
    return (this.$el.attr('view') == this.opt.id);
  };

  ForgotView.prototype.loadListeners = function(){
    var _this = this;

    // listen for form submission
    this.$el.on('submit', '.forgot-form', function(e){
      e.preventDefault();
      var email = $(this).find('input[name="email"]').val();
      _this.submit(email);
    });

    // listen for user update success
    $.subscribe('users.forgot.success', function(e, message){
      _this.onSuccess(message);
    });

    // listen for user update failure
    $.subscribe('users.forgot.failure', function(e, message){
      _this.onFailure(message);
    });

    // listen for auth success
    $.subscribe('users.refresh', function(e, user, message){
      _this.onAuth(user, message);
    });

    // listen for sign out
    $.subscribe('users.signout', function(e, message){
      _this.onSignout(message);
    });
  };

  ForgotView.prototype.onAuth = function(user, message){
    this.opt.user = user;
    if (this.isActive()) {
      this.render();
    }
  };

  ForgotView.prototype.onFailure = function(message){
    this.$el.find('.message').html(message).addClass('active');
    this.$el.find('[type="submit"]').prop('disabled', false).text('Submit');
  };

  ForgotView.prototype.onSignout = function(message){
    this.opt.user = false;
    if (this.isActive()) {
      this.render();
    }
  };

  ForgotView.prototype.onSuccess = function(message){
    this.$el.find('.message').html(message).addClass('active');
    this.$el.find('[type="submit"]').prop('disabled', false).text('Submit');
  };

  ForgotView.prototype.render = function(){
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);
  };

  ForgotView.prototype.submit = function(email, pass, current_pass){
    this.$el.find('[type="submit"]').prop('disabled', true).text('Submitting...');
    this.opt.user_model.forgot(email);
  };

  return ForgotView;

})();
