var AccountView = (function() {
  function AccountView(options) {
    var defaults = {
      el: '#main',
      id: 'account',
      template: _.template(TEMPLATES['account.ejs'])
    };
    this.opt = _.extend(defaults, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.opt.user = this.opt.user_model.getUserData();

    this.loadListeners();
  }

  AccountView.prototype.init = function(){
    this.render();
  };

  AccountView.prototype.isActive = function(){
    return (this.$el.attr('view') == this.opt.id);
  };

  AccountView.prototype.loadListeners = function(){
    var _this = this;

    // listen for form submission
    this.$el.on('submit', '.account-form', function(e){
      e.preventDefault();
      var email = $(this).find('input[name="email"]').val();
      var pass = $(this).find('input[name="pass"]').val();
      var current_pass = $(this).find('input[name="current_pass"]').val();
      _this.submit(email, pass, current_pass);
    });

    // listen for user update success
    $.subscribe('users.update.success', function(e, user, message){
      _this.onSuccess(user, message);
    });

    // listen for user update failure
    $.subscribe('users.update.failure', function(e, message){
      _this.onFailure(message);
    });

    // listen for auth success
    $.subscribe('users.auth.success', function(e, user, message){
      _this.onAuth(user, message);
    });
    $.subscribe('users.signin.success', function(e, user, message){
      _this.onAuth(user, message);
    });
    $.subscribe('users.signup.success', function(e, user, message){
      _this.onAuth(user, message);
    });

    // listen for sign out
    $.subscribe('users.signout', function(e, message){
      _this.onSignout(message);
    });
  };

  AccountView.prototype.onAuth = function(user, message){
    this.opt.user = user;
    if (this.isActive()) {
      this.render();
    }
  };

  AccountView.prototype.onFailure = function(message){
    this.$el.find('.message').html(message).addClass('active');
    this.$el.find('[type="submit"]').prop('disabled', false).text('Submit');
  };

  AccountView.prototype.onSignout = function(message){
    this.opt.user = false;
    if (this.isActive()) {
      this.render();
    }
  };

  AccountView.prototype.onSuccess = function(user, message){
    this.opt.user = user;
    this.$el.find('.message').html(message).addClass('active');
    this.$el.find('[type="submit"]').prop('disabled', false).text('Submit');
    this.$el.find('[type="password"]').val('');
  };

  AccountView.prototype.render = function(){
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);
  };

  AccountView.prototype.submit = function(email, pass, current_pass){
    this.$el.find('[type="submit"]').prop('disabled', true).text('Submitting...');
    this.opt.user_model.update(email, pass, current_pass);
  };

  return AccountView;

})();
