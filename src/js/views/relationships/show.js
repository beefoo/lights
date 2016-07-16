var RelationshipView = (function() {
  function RelationshipView(options) {
    var defaults = {
      template: _.template(TEMPLATES['relationship.ejs']),
      relationship: false,
      widthRange: [20, 50],
      aspectRatio: (480/662)
    };
    this.opt = _.extend(defaults, options);

    this.init();
  }

  RelationshipView.prototype.init = function(){
    this.template = this.opt.template;

    // this.relationshipModel = false;
    // if (this.opt.relationship) {
    //   this.relationshipModel = new RelationshipModel(this.opt.relationship);
    // }

    this.setWindowSize();
    this.render();
    this.loadListeners();
  };

  RelationshipView.prototype.el = function(){
    return this.$el;
  };

  RelationshipView.prototype.getGestureData = function(e){
    return {
      x: e.center.x,
      y: e.center.y
    }
  };

  RelationshipView.prototype.getGestureDelta = function(g0, g1){
    return {
      x: g1.x - g0.x,
      y: g1.y - g0.y
    }
  };

  RelationshipView.prototype.getPosition = function(){
    var $el = this.$el;
    return {
      x: parseFloat($el.css('left')),
      y: parseFloat($el.css('top'))
    }
  };

  RelationshipView.prototype.getWidth = function(top){
    return UTIL.lerp(this.opt.widthRange[0], this.opt.widthRange[1], top / 100);
  };

  RelationshipView.prototype.getWidthPx = function(y){
    return UTIL.lerp(this.opt.widthRange[0], this.opt.widthRange[1], y / this.windowHeight) / 100 * this.windowWidth;
  };

  RelationshipView.prototype.id = function(){
    return this.opt.relationship ? this.opt.relationship.id : '';
  };

  RelationshipView.prototype.loadListeners = function(){
    var _this = this;
    var h = new Hammer(this.$el[0]);

    this.$el.on('click', function(e){
      e.preventDefault();
    });

    // let the pan gesture support all directions.
    h.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    // tap
    h.on('tap', function(e) {
      e.preventDefault();
      _this.showForm();
    });

    var startPos, startGesture;
    h.on("panstart", function(e){
      e.preventDefault();
      _this.setWindowSize();
      startPos = _this.getPosition();
      startGesture= _this.getGestureData(e);
    });

    // pan moves
    h.on("panmove", function(e){
      e.preventDefault();
      var g = _this.getGestureData(e);
      var delta = _this.getGestureDelta(startGesture, g);
      _this.move(startPos, delta);
    });

    // pan ends
    h.on("panend", function(e){
      e.preventDefault();
      var g = _this.getGestureData(e);
      var delta = _this.getGestureDelta(startGesture, g);
      _this.move(startPos, delta);
      _this.updatePosition();
    });
  };

  RelationshipView.prototype.move = function(pos, delta){
    var x = pos.x + delta.x;
    var y = pos.y + delta.y;
    var w = this.getWidthPx(y);
    var r = this.opt.relationship;
    var aspectRatio = this.opt.aspectRatio;
    this.$el.css({
      left: x + 'px',
      top: y + 'px',
      width: w + 'px',
      height: (w * aspectRatio) + 'px'
    });
  };

  RelationshipView.prototype.remove = function(){
    this.$el && this.$el.remove();
  };

  RelationshipView.prototype.render = function(){
    var r = this.opt.relationship;
    var aspectRatio = this.opt.aspectRatio;
    var w = this.getWidth(r.top);

    this.$el = this.$el || $('<a href="#/relationships/edit" class="relationship" data-id="'+r.id+'"></a>');

    this.$el.css({
      width: w + 'vw',
      height: (w * aspectRatio) + 'vw',
      top: r.top + 'vh',
      left: r.left + 'vw'
    });

    // this.opt.relationship.level = 0;

    this.$el.html(this.template(this.opt));
  };

  RelationshipView.prototype.setWindowSize = function(){
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();
  };

  RelationshipView.prototype.showForm = function(){
    var data = {relationship: this.opt.relationship};
    $.publish('modals.open', [RelationshipFormView, data]);
  };

  RelationshipView.prototype.update = function(data){
    this.opt.relationship = _.extend({}, this.opt.relationship, data);
    this.render();
  };

  RelationshipView.prototype.updatePosition = function(){
    var r = this.opt.relationship;
    var $el = this.$el;
    var vw = this.windowWidth;
    var vh = this.windowHeight;
    var x = parseFloat($el.css('left'));
    var y = parseFloat($el.css('top'));
    var z = parseFloat($el.width());
    $.publish('relationship.update', {
      id: r.id,
      left: (x/vw*100),
      top: (y/vh*100),
      width: (z/vw*100)
    });
  };

  return RelationshipView;

})();
