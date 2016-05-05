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
    this.render();
  };

  HeaderView.prototype.render = function(){
    this.$el.html(this.template(this.opt));
  };

  return HeaderView;

})();
