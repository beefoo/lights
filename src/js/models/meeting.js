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

  MeetingModel.prototype.onUpdate = function(){
    // parse date
    this.props.date = this._parseDate(this.props.date);
  };

  MeetingModel.prototype.toJSON = function(){
    return _.clone(this.props);
  };

  MeetingModel.prototype._parseDate = function(value){
    var date = false;

    if (value && _.isString(value) && value.length) value = parseInt(value);

    if (value && _.isNumber(value)) date = new Date(value);

    return date;
  };

  return MeetingModel;

})();
