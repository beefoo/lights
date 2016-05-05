var SpaceView = (function() {
  function SpaceView(options) {
    var defaults = {
      el: '#main',
      template: _.template(TEMPLATES['space.ejs'])
    };
    this.opt = _.extend(defaults, options);
    this.init();
  }

  SpaceView.prototype.init = function(){
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.render();
    this.loadListeners();
  };

  SpaceView.prototype.loadListeners = function(){
    var _this = this;

    // listen for user login
    $.subscribe('users.login', function(e, user){

    });
  };

  SpaceView.prototype.render = function(){
    this.$el.html(this.template(this.opt));
  };

  return SpaceView;

})();
