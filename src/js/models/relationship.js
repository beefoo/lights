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

    this.onUpdate();
  };

  RelationshipModel.prototype.defaultProps = function(){
    var left = _.random(30, 70);
    var top = _.random(20, 40);
    return {
      id: 0,
      name: 'Unknown',
      method: 'in_person',
      rhythm: 'week_1',
      notes: '',
      active: 1,
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

  RelationshipModel.prototype.onUpdate = function(){
    // parse rhythm
    // this.props.rhythm = this._parseRhythmString(this.props.rhythm);
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

    this.onUpdate();
  };

  RelationshipModel.prototype._parseRhythmString = function(str){
    if (!str) return false;
    if (_.isObject(str)) return str;

    var parts = str.split('_');
    var rhythm = false;

    if (parts.length==2) {
      rhythm = {
        unit: parts[0],
        amount: parseInt(parts[1])
      }
    }

    return rhythm;
  };

  return RelationshipModel;

})();
