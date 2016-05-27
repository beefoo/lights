var HeaderView = (function() {
  function HeaderView(options) {
    var defaults = {
      el: '#header',
      template: _.template(TEMPLATES['header.ejs'])
    };
    this.opt = _.extend(defaults, options);
    this.init();
  }

  HeaderView.prototype.init = function(){
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.opt.user = this.opt.user_model.getUserData();
    this.render();
    this.loadListeners();
  };

  HeaderView.prototype.flashMessage = function(message){
    var $message = this.$el.find('.message');
    $message.text(message).addClass('active');
    setTimeout(function(){
      $message.removeClass('active').text('');
    }, 4000);
  };

  HeaderView.prototype.loadListeners = function(){
    var _this = this;

    this.$el.on('click', '.sign-out-link', function(e){
      e.preventDefault();
      _this.opt.user_model.signout();
    })

    $.subscribe('users.signin.success', function(e, user, message){
      _this.opt.user = user;
      _this.render();
    });

    $.subscribe('users.signup.success', function(e, user, message){
      _this.opt.user = user;
      _this.render();
    });

    $.subscribe('users.auth.success', function(e, user, message){
      _this.opt.user = user;
      _this.render();
    });

    $.subscribe('users.signout', function(e, message){
      _this.opt.user = false;
      _this.render();
      _this.flashMessage(message);
    });
  };

  HeaderView.prototype.render = function(){
    this.$el.html(this.template(this.opt));
  };

  return HeaderView;

})();
