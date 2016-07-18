var MeetingModel = (function() {
  function MeetingModel(props) {
    var defaults = this.defaultProps();
    this.props = _.extend(defaults, props);
    this.init();
  }

  MeetingModel.prototype.init = function(){
    // create an id if not exists
    if (!this.props.id) {
      this.props.id = UTIL.makeId(16);
    }
  };

  MeetingModel.prototype.defaultProps = function(){
    return {
      id: 0,
      relationship_id: 0,
      date: '',
      notes: '',
      active: 1
    };
  };

  MeetingModel.prototype.fields = function(){
    var defaults = this.defaultProps();
    return _.keys(defaults);
  };

  MeetingModel.prototype.id = function(){
    return this.props.id;
  };

  MeetingModel.prototype.onUpdate = function(){
    // parse date
    // this.props.date = this._parseDate(this.props.date);
  };

  MeetingModel.prototype.toJSON = function(){
    return _.clone(this.props);
  };

  MeetingModel.prototype.update = function(data){
    var _this = this,
        fields = this.fields();

    _.each(fields, function(f){
      if (data[f]) _this.props[f] = data[f];
    });

    this.onUpdate();
  };

  MeetingModel.prototype._parseDate = function(value){
    var date = false;

    if (value && (_.isString(value) && value.length || _.isNumber(value))) date = new Date(value);

    return date;
  };

  return MeetingModel;

})();
