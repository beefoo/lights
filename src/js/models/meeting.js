var MeetingModel = (function() {
  function MeetingModel(props) {
    var defaults = this.defaultProps();
    this.props = _.extend(defaults, props);
    this.init();
  }

  MeetingModel.prototype.init = function(){};

  MeetingModel.prototype.defaultProps = function(){
    return {
      id: 0,
      relationship_id: 0,
      date: '',
      notes: ''
    };
  };

  MeetingModel.prototype.fields = function(){
    var defaults = this.defaultProps();
    return _.keys(defaults);
  };

  MeetingModel.prototype.toJSON = function(){
    return _.clone(this.props);
  };

  return MeetingModel;

})();
