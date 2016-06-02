var MeetingModel = (function() {
  function MeetingModel(options) {
    var defaults = {
      id: 0,
      relationship_id: 0,
      date: '',
      notes: ''
    };
    this.opt = _.extend(defaults, options);
    this.init();
  }

  MeetingModel.prototype.init = function(){};

  return MeetingModel;

})();
