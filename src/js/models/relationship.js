var RelationshipModel = (function() {
  function RelationshipModel(props) {
    var defaults = this.defaultProps();
    this.props = _.extend(defaults, props);
    this.init();
  }

  RelationshipModel.prototype.init = function(){
    // create an id if not exists
    if (!this.props.id) {
      this.props.id = UTIL.makeId(16);
    }

    // parse date if present
    if (this.props.last_meeting_at && this.props.last_meeting_at.length && !this.props.last_meeting_at instanceof Date) {
      this.props.last_meeting_at = new Date(this.props.last_meeting_at);
    }

    // parse rhythm
  };

  RelationshipModel.prototype.defaultProps = function(){
    return {
      id: 0,
      name: 'Unknown',
      method: 'in_person',
      rhythm: 'week_1',
      notes: '',
      last_meeting_at: '',
      active: 1,
      width: 30,
      left: 10,
      top: 10
    };
  };

  RelationshipModel.prototype.fields = function(){
    var defaults = this.defaultProps();
    return _.keys(defaults);
  };

  RelationshipModel.prototype.id = function(){
    return this.props.id;
  };

  RelationshipModel.prototype.isActive = function(){
    return this.props.active;
  };

  RelationshipModel.prototype.toJSON = function(){
    return _.clone(this.props);
  };

  RelationshipModel.prototype.update = function(data){
    var _this = this,
        fields = this.fields();

    _.each(fields, function(f){
      if (data[f]) _this.props[f] = data[f];
    });
  };

  return RelationshipModel;

})();
