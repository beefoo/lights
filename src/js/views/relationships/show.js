var RelationshipView = (function() {
  function RelationshipView(options) {
    var defaults = {
      template: _.template(TEMPLATES['relationship.ejs']),
      relationship: false
    };
    this.opt = _.extend(defaults, options);
    this.template = this.opt.template;
    this.init();
  }

  RelationshipView.prototype.init = function(){
    this.render();
    this.loadListeners();
  };

  RelationshipView.prototype.el = function(){
    return this.$el;
  };

  RelationshipView.prototype.id = function(){
    return this.opt.relationship ? this.opt.relationship.id : '';
  };

  RelationshipView.prototype.loadListeners = function(){
    var _this = this;

    this.$el.on('click', function(e){
      e.preventDefault();
      _this.showForm();
    });
  };

  RelationshipView.prototype.remove = function(){
    this.$el && this.$el.remove();
  };

  RelationshipView.prototype.render = function(){
    var r = this.opt.relationship;

    this.$el = this.$el || $('<a href="#/relationships/edit" class="relationship" data-id="'+r.id+'"></a>');
    this.$el.css({
      width: r.width + 'vw',
      height: (r.width * (480/662)) + 'vw',
      top: r.top + 'vh',
      left: r.left + 'vw'
    });
    this.$el.html(this.template(this.opt));
  };

  RelationshipView.prototype.showForm = function(){
    var data = {relationship: this.opt.relationship};
    $.publish('modals.open', [RelationshipFormView, data]);
  };

  RelationshipView.prototype.update = function(data){
    this.opt.relationship = _.extend({}, this.opt.relationship, data);
    this.render();
  };

  return RelationshipView;

})();
