var RelationshipModel = (function() {
  function RelationshipModel(props) {
    var defaults = this.defaultProps();
    this.props = _.extend(defaults, props);
    this.init();
  }

  RelationshipModel.prototype.init = function(){};

  RelationshipModel.prototype.defaultProps = function(){
    return {
      id: 0,
      name: 'Unknown',
      method: 'in_person',
      rhythm: 2,
      unit: 'month',
      notes: '',
      last_meeting_at: ''
    };
  };

  RelationshipModel.prototype.fields = function(){
    var defaults = this.defaultProps();
    return _.keys(defaults);
  };

  RelationshipModel.prototype.toJSON = function(){
    return _.clone(this.props);
  };

  return RelationshipModel;

})();
