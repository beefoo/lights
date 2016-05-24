var SpaceView = (function() {
  function SpaceView(options) {
    var defaults = {
      el: '#main',
      id: 'space',
      template: _.template(TEMPLATES['space.ejs'])
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

    
  };

  SpaceView.prototype.render = function(){
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);
  };

  return SpaceView;

})();
