var SpaceView = (function() {
  function SpaceView(options) {
    var defaults = {
      el: '#main',
      id: 'space',
      template: _.template(TEMPLATES['space.ejs']),
      space: false
    };
    this.opt = _.extend(defaults, options);
  }

  SpaceView.prototype.init = function(){
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.opt.user = this.opt.user_model.getUserData();
    this.render();
    this.loadListeners();
  };

  SpaceView.prototype.loadListeners = function(){
    var _this = this;

    $.subscribe('users.refresh', function(e, user, message){
      _this.opt.user = user;
      _this.render();
    });

    $.subscribe('users.signup.success', function(e, user, message){
      _this.opt.user = user;
      _this.render();
    });

    $.subscribe('users.signout', function(e, message){
      _this.opt.user = false;
      _this.render();
    });
  };

  SpaceView.prototype.loadSpace = function(){
    if (!this.opt.user) return false;
    var props = this.opt.user.space || {};
    var space = new SpaceModel(props);
    return space.toJSON();
  };

  SpaceView.prototype.render = function(){
    this.opt.space = this.loadSpace();
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);
  };

  return SpaceView;

})();
