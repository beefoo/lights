var ResetView = (function() {
  function ResetView(options) {
    var defaults = {
      el: '#main',
      id: 'reset',
      template: _.template(TEMPLATES['reset.ejs'])
    };
    this.opt = _.extend(defaults, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;

    this.loadListeners();
  }

  ResetView.prototype.init = function(){
    this.render();
  };

  ResetView.prototype.isActive = function(){
    return (this.$el.attr('view') == this.opt.id);
  };

  ResetView.prototype.loadListeners = function(){
    var _this = this;

    // listen for form submission
    this.$el.on('submit', '.reset-form', function(e){
      e.preventDefault();
      var pass = $(this).find('input[name="pass"]').val();
      _this.submit(pass);
    });

    // listen for user reset success
    $.subscribe('users.reset.success', function(e, user, message){
      _this.onSuccess(user, message);
    });

    // listen for user reset failure
    $.subscribe('users.reset.failure', function(e, message){
      _this.onFailure(message);
    });
  };

  ResetView.prototype.onFailure = function(message){
    this.$el.find('.message').html(message).addClass('active');
    this.$el.find('[type="submit"]').prop('disabled', false).text('Submit');
  };

  ResetView.prototype.onSignout = function(message){
    this.opt.user = false;
    if (this.isActive()) {
      this.render();
    }
  };

  ResetView.prototype.onSuccess = function(user, message){
    this.opt.user = user;
    this.$el.find('.message').html(message).addClass('active');
    this.$el.find('[type="submit"]').prop('disabled', false).text('Submit');
    setTimeout(function(){
      window.location.hash = '/';
    }, 2000);
  };

  ResetView.prototype.render = function(){
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);
  };

  ResetView.prototype.submit = function(pass){
    this.$el.find('[type="submit"]').prop('disabled', true).text('Submitting...');
    this.opt.user_model.reset(pass, this.opt.code);
  };

  return ResetView;

})();
