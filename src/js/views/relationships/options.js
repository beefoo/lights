var RelationshipOptionsView = (function() {
  function RelationshipOptionsView(options) {
    var defaults = {
      el: '<div id="relationship-options">',
      template: _.template(TEMPLATES['relationship_options.ejs']),
      relationship: false,
      meetings: [],
      last_meeting: false,
      rhythm: false
    };
    this.opt = _.extend(defaults, CONFIG, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.loadListeners();
  }

  RelationshipOptionsView.prototype.init = function(){
    // determine rhythm
    var rhythm_value = this.opt.relationship.rhythm;
    this.opt.rhythm = _.findWhere(this.opt.rhythms, {value: rhythm_value});

    this.relationshipModel = new RelationshipModel(this.opt.relationship);

    this.setLastMeeting();

    this.render();
  };

  RelationshipOptionsView.prototype.el = function(){
    return this.$el;
  };

  RelationshipOptionsView.prototype.loadListeners = function(){
    var _this = this;

    this.$el.on('click', '.edit-relationship', function(e){
      e.preventDefault();
      $.publish('modals.open', [RelationshipFormView, {relationship: _this.opt.relationship, meetings: _this.opt.meetings}]);
    });

    this.$el.on('click', '.add-meeting', function(e){
      e.preventDefault();
      $.publish('modals.open', [MeetingFormView, {relationship: _this.opt.relationship, meetings: _this.opt.meetings}]);
    });

    this.$el.on('click', '.view-meetings', function(e){
      e.preventDefault();
      $.publish('modals.open', [MeetingListView, {relationship: _this.opt.relationship, meetings: _this.opt.meetings}]);
    });
  };

  RelationshipOptionsView.prototype.render = function(){
    this.$el.html(this.template(this.opt));
  };

  RelationshipOptionsView.prototype.setLastMeeting = function(){
    var lastMeeting = this.relationshipModel.getLastMeeting(this.opt.meetings);
    if (!lastMeeting) return false;

    this.opt.last_meeting = lastMeeting
    this.opt.last_meeting.method = _.findWhere(this.opt.methods, {value: lastMeeting.method});
  };

  return RelationshipOptionsView;

})();
