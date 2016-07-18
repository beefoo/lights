var MeetingListView = (function() {
  function MeetingListView(options) {
    var defaults = {
      el: '<div id="meeting-list">',
      template: _.template(TEMPLATES['meeting_list.ejs']),
      relationship: false,
      meetings: []
    };
    this.opt = _.extend(defaults, CONFIG, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.loadListeners();
  }

  MeetingListView.prototype.init = function(){
    this.opt.meetings = _.sortBy(this.opt.meetings, function(m){
      var d = new Date(m);
      return -d.getTime();
    });
    this.render();
  };

  MeetingListView.prototype.el = function(){
    return this.$el;
  };

  MeetingListView.prototype.loadListeners = function(){
    var _this = this;

    this.$el.on('click', '.add-meeting', function(e){
      e.preventDefault();

      $.publish('modals.open', [MeetingFormView, {relationship: _this.opt.relationship, meetings: _this.opt.meetings}]);
    });

    this.$el.on('click', '.edit-meeting', function(e){
      e.preventDefault();

      var meeting = _.findWhere(_this.opt.meetings, { id: $(this).attr('data-id') });
      $.publish('modals.open', [MeetingFormView, {meetings: _this.opt.meetings, meeting: meeting, relationship: _this.opt.relationship}]);
    });

    this.$el.on('click', '.edit-relationship', function(e){
      e.preventDefault();

      $.publish('modals.open', [RelationshipFormView, {relationship: _this.opt.relationship, meetings: _this.opt.meetings}]);
    });

  };

  MeetingListView.prototype.render = function(){
    this.$el.html(this.template(this.opt));
  };

  return MeetingListView;

})();
