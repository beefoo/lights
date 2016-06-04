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

  RelationshipView.prototype.render = function(){
    this.$el = this.$el || $('<div class="relationship" data-id="'+this.opt.relationship.id+'"></div>');
    this.$el.html(this.template(this.opt));
  };

  RelationshipView.prototype.showForm = function(){
    this.form_view = this.form_view || new RelationshipFormView({relationship: this.opt.relationship});
    this.form_view.init();
  };

  RelationshipView.prototype.update = function(data){
    this.opt.relationship = _.extend({}, this.opt.relationship, data);
    this.render();
  };

  return RelationshipView;

})();
