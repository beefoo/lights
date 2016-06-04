var SpaceModel = (function() {
  function SpaceModel(props) {
    var defaults = this.defaultProps();
    this.props = _.extend(defaults, props);
    this.init();
  }

  SpaceModel.prototype.init = function(){
    this.parseData(this.props.data);
  };

  SpaceModel.prototype.addRelationship = function(data){
    var relationship = new RelationshipModel(data);
    this.props.relationships.push(relationship);
    this.save();
    return relationship;
  };

  SpaceModel.prototype.defaultProps = function(){
    return {
      data: {},
      relationships: [],
      meetings: []
    }
  };

  SpaceModel.prototype.parseData = function(data){
    var f;
    data = data || {};

    // retrieve relationships
    if (data.relationships) {
      f = data.relationships.fields;
      this.props.relationships = _.map(data.relationships.data, function(d){
        var props = _.object(f, d);
        return new RelationshipModel(props);
      });
    }

    // Retrieve meetings
    if (data.meetings) {
      f = data.meetings.fields;
      this.props.meetings = _.map(data.meetings.data, function(d){
        var props = _.object(f, d);
        return new MeetingModel(props);
      });
    }
  };

  SpaceModel.prototype.save = function(){
    var _this = this,
        data = {data: this.toString()};

    $.post(CONFIG.base_url + '/spaces/save', data, function(resp){
      console.log(resp);

      // success
      if (resp.status) {
        _this.userData = resp.user;
        $.publish('spaces.save.success', resp.message);

      // failure
      } else {
        $.publish('spaces.save.failure', resp.message);
      }

    },'json');
  };

  SpaceModel.prototype.toJSON = function(){
    return {
      relationships: _.map(this.props.relationships, function(r){ return r.toJSON(); }),
      meetings: _.map(this.props.meetings, function(r){ return r.toJSON(); }),
    };
  };

  SpaceModel.prototype.toString = function(){
    // retrieve data fields
    var relationship_model = new RelationshipModel();
    var meeting_model = new MeetingModel();
    var relationship_fields = relationship_model.fields();
    var meeting_fields = meeting_model.fields();

    // make the data tinier by separating out fields
    var data = {
      relationships: {
        fields: relationship_fields,
        data: this._collectionToArray(this.props.relationships, relationship_fields)
      },
      meetings: {
        fields: meeting_fields,
        data: this._collectionToArray(this.props.meetings, meeting_fields)
      }
    };

    // stringify
    return JSON.stringify(data);
  };

  SpaceModel.prototype.updateRelationship = function(id, data){
    var r = _.find(this.props.relationships, function(r){ return r.id()==id; });
    if (r) r.update(data);
    this.save();
  };

  SpaceModel.prototype._collectionToArray = function(collection, fields){
    return _.map(collection, function(item){
      var arr = [];
      var obj = item.toJSON();
      _.each(fields, function(f){
        arr.push(obj[f]);
      })
      return arr;
    });
  };

  return SpaceModel;

})();
