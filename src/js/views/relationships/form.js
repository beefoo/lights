var RelationshipFormView = (function() {
  function RelationshipFormView(options) {
    var defaults = {
      el: '<div id="relationship-add">',
      template: _.template(TEMPLATES['relationship_form.ejs']),
      relationship: false,
      meetings: []
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

    this.$el.on('click', '.add-meeting', function(e){
      e.preventDefault();
      if (_this.opt.relationship) $.publish('modals.open', [MeetingFormView, {relationship: _this.opt.relationship, meetings: _this.opt.meetings}]);
    });

    this.$el.on('click', '.view-meetings', function(e){
      e.preventDefault();
      if (_this.opt.relationship) $.publish('modals.open', [MeetingListView, {relationship: _this.opt.relationship, meetings: _this.opt.meetings}]);
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

  RelationshipFormView.prototype.submit = function(data){
    if (this.opt.relationship && data.id){
      $.publish('relationship.update', data);
    } else {
      $.publish('relationship.create', data);
    }
  };

  return RelationshipFormView;

})();
