var MeetingFormView = (function() {
  function MeetingFormView(options) {
    var defaults = {
      el: '<div id="meeting-add">',
      template: _.template(TEMPLATES['meeting_form.ejs']),
      meeting: false,
      relationship: false
    };
    this.opt = _.extend(defaults, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.loadListeners();
  }

  MeetingFormView.prototype.init = function(){
    this.opt.method = this.opt.relationship ? this.opt.relationship.method || 'in_person';
    this.opt.method = _.clone(this.opt.methods[this.opt.method]);
    this.render();
  };

  MeetingFormView.prototype.close = function(){
    $.publish('modals.close');
  };

  MeetingFormView.prototype.daysAgo = function(days){
    var d = new Date();
    d.setDate(d.getDate()-days);

    var method = this.opt.method;
    var relationship = this.opt.relationship;
    var data = {
      date: d.getTime(),
      relationship_id: relationship.id,
      method: method
    };
    this.submit(data);
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

  };

  MeetingFormView.prototype.render = function(){
    this.$el.html(this.template(this.opt));
  };

  MeetingFormView.prototype.submit = function(data){
    $.publish('meeting.create', data);

    this.opt.meeting = data;
    this.close();
  };

  return MeetingFormView;

})();
