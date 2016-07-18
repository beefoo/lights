var MeetingFormView = (function() {
  function MeetingFormView(options) {
    var defaults = {
      el: '<div id="meeting-add">',
      template: _.template(TEMPLATES['meeting_form.ejs']),
      meeting: false,
      relationship: false,
      meetings: []
    };
    this.opt = _.extend(defaults, CONFIG, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.loadListeners();
  }

  MeetingFormView.prototype.init = function(){
    this.opt.method = this.opt.relationship ? this.opt.relationship.method : 'in_person';
    this.opt.method = _.findWhere(this.opt.methods, {value: this.opt.method});

    this.render();
  };

  MeetingFormView.prototype.close = function(){
    $.publish('modals.close');
  };

  MeetingFormView.prototype.daysAgo = function(days){
    var data = this.$el.find('.meeting-form').serializeObject();

    var d = new Date();
    d.setDate(d.getDate()-days);

    this.$el.find('.days-ago').removeClass('active');
    this.$el.find('.days-ago[days-ago="'+days+'"]').addClass('active');
    var dateString = d.toISOString().slice(0, 10);
    this.$el.find('input[name="date"]').val(dateString);
  };

  MeetingFormView.prototype.el = function(){
    return this.$el;
  };

  MeetingFormView.prototype.loadListeners = function(){
    var _this = this;

    this.$el.on('click', '.days-ago', function(e){
      e.preventDefault();
      _this.daysAgo(parseInt($(this).attr('days-ago')));
    });

    this.$el.on('submit', '.meeting-form', function(e){
      e.preventDefault();

      var data = $(this).serializeObject();
      data.date = new Date(data.date) || new Date();
      _this.submit(data);
    });

    this.$el.on('click', '.remove-meeting', function(e){
      e.preventDefault();

      _this.removeMeeting();
    });

    this.$el.on('click', '.edit-relationship', function(e){
      e.preventDefault();

      $.publish('modals.open', [RelationshipFormView, {relationship: _this.opt.relationship, meetings: _this.opt.meetings}]);
    });

    this.$el.on('click', '.view-meetings', function(e){
      e.preventDefault();

      $.publish('modals.open', [MeetingListView, {relationship: _this.opt.relationship, meetings: _this.opt.meetings}]);
    });

  };

  MeetingFormView.prototype.removeMeeting = function(){
    if (!this.opt.meeting) return false;

    var id = this.opt.meeting.id;
    $.publish('meeting.delete', id);
    this.opt.relationship = false;
    this.close();
  };

  MeetingFormView.prototype.render = function(){
    this.$el.html(this.template(this.opt));
  };

  MeetingFormView.prototype.submit = function(data){
    if (this.opt.meeting && data.id){
      $.publish('meeting.update', data);
    } else {
      $.publish('meeting.create', data);
    }

    this.opt.meeting = data;
    this.close();
  };

  return MeetingFormView;

})();
