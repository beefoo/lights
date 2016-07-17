var RelationshipFormView = (function() {
  function RelationshipFormView(options) {
    var defaults = {
      el: '<div id="relationship-add">',
      template: _.template(TEMPLATES['relationship_form.ejs']),
      relationship: false
    };
    this.opt = _.extend(defaults, CONFIG, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.loadListeners();
  }

  RelationshipFormView.prototype.init = function(){
    this.render();
  };

  RelationshipFormView.prototype.close = function(){
    $.publish('modals.close');
  };

  RelationshipFormView.prototype.el = function(){
    return this.$el;
  };

  RelationshipFormView.prototype.loadListeners = function(){
    var _this = this;

    this.$el.on('submit', '.relationship-form', function(e){
      e.preventDefault();

      var data = $(this).serializeObject();
      _this.submit(data);
    });

    this.$el.on('click', '.remove-relationship', function(e){
      e.preventDefault();

      _this.removeRelationship();
    });
  };

  RelationshipFormView.prototype.removeRelationship = function(){
    if (!this.opt.relationship) return false;

    var id = this.opt.relationship.id;
    $.publish('relationship.delete', id);
    this.opt.relationship = false;
    this.close();
  };

  RelationshipFormView.prototype.render = function(){
    this.$el.html(this.template(this.opt));
  };

  RelationshipFormView.prototype.remove = function(){
    this.$el.off('submit', '.relationship-form');
    this.$el.off('click', '.remove-relationship');
  };

  RelationshipFormView.prototype.submit = function(data){
    if (this.opt.relationship && data.id){
      $.publish('relationship.update', data);
    } else {
      $.publish('relationship.create', data);
    }

    this.opt.relationship = data;
    // show meeting form
    $.publish('modals.open', [MeetingFormView, {relationship: this.opt.relationship}]);
  };

  return RelationshipFormView;

})();
