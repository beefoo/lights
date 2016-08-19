var SpaceReadonlyView = (function() {
  function SpaceReadonlyView(options) {
    var defaults = {
      el: '#main',
      id: 'readonly_space',
      template: _.template(TEMPLATES['space.ejs']),
      space: false,
      readonly: true
    };
    this.opt = _.extend(defaults, options);
    this.space = false;
    this.$el = $(this.opt.el);
    this.$relationshipViews = [];
    this.template = this.opt.template;
  }

  // inherit from SpaceView
  SpaceReadonlyView.prototype = Object.create(SpaceView.prototype);
  SpaceReadonlyView.prototype.constructor = SpaceReadonlyView;

  SpaceReadonlyView.prototype.init = function(){
    if (this.loaded) {
      this.render();
    } else {
      this.loadSpace();
    }
  };

  SpaceReadonlyView.prototype.loadListeners = function(){

  };

  SpaceReadonlyView.prototype.loadSpace = function(){
    var _this = this;
    if (this.loaded) return false;
    this.loaded = true;

    $.getJSON(this.opt.base_url+'/spaces/show/default', function(resp){
      console.log(resp)
      if (resp && resp.space) {
        _this.space = new SpaceModel(resp.space);
        _this.render();
      }
    });
  };

  return SpaceReadonlyView;

})();
