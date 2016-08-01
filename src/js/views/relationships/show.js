var RelationshipView = (function() {
  function RelationshipView(options) {
    var defaults = {
      template: _.template(TEMPLATES['relationship.ejs']),
      relationship: false,
      meetings: []
    };
    this.opt = _.extend(defaults, CONFIG, options);

    this.init();
  }

  RelationshipView.prototype.init = function(){
    this.template = this.opt.template;

    this.relationshipModel = false;
    if (this.opt.relationship) {
      this.relationshipModel = new RelationshipModel(this.opt.relationship);
    }

    this.render();
    if (!this.opt.readonly) this.loadListeners();
  };

  RelationshipView.prototype.addMeeting = function(meeting){
    this.opt.meetings.push(meeting);
    this.render();
  };

  RelationshipView.prototype.deleteMeeting = function(id){
    this.opt.meetings = _.reject(this.opt.meetings, function(m){ return m.id==id; });
    this.render();
  };

  RelationshipView.prototype.el = function(){
    return this.$el;
  };

  RelationshipView.prototype.id = function(){
    return this.relationshipModel ? this.relationshipModel.id() : '';
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
    var r = this.relationshipModel.toJSON();

    this.opt.lastMeeting = this.relationshipModel.getLastMeeting(this.opt.meetings);
    if (this.opt.lastMeeting) this.opt.lastMethod = _.findWhere(this.opt.methods, {value: this.opt.lastMeeting.method});
    this.opt.energy = this.relationshipModel.getPercent(this.opt.meetings);
    this.opt.level = this.relationshipModel.getLevel(this.opt.energy);
    this.opt.relationship = r;
    this.opt.name = r.name;
    this.opt.light = _.findWhere(this.opt.lights, {value: r.light});

    if (this.opt.readonly) {
      this.$el = this.$el || $('<div class="relationship readonly" data-id="'+r.id+'"></div>');
      this.opt.name = _.map(this.opt.name.split(' '), function(w){ return w.charAt(0).toUpperCase(); }).join(' ');

    } else {
      this.$el = this.$el || $('<a href="#/relationships/edit/'+r.id+'" class="relationship" data-id="'+r.id+'"></a>');
    }

    this.$el.attr('level', this.opt.level);
    this.$el.html(this.template(this.opt));
  };

  RelationshipView.prototype.showForm = function(){
    var data = {relationship: this.relationshipModel.toJSON(), meetings: this.opt.meetings};
    $.publish('modals.open', [RelationshipOptionsView, data]);
  };

  RelationshipView.prototype.update = function(data){
    this.relationshipModel.update(data);
    this.render();
  };

  RelationshipView.prototype.updateMeeting = function(id, data){
    this.opt.meetings = _.map(this.opt.meetings, function(m){
      if (m.id==id) return _.extend({}, m, data);
      else return m;
    });
    this.render();
  };

  return RelationshipView;

})();
