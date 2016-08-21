var SpaceView = (function() {
  function SpaceView(options) {
    var defaults = {
      el: '#main',
      id: 'space',
      template: _.template(TEMPLATES['space.ejs']),
      space: false,
      readonly: false
    };
    this.opt = _.extend(defaults, options);
    this.space = false;
    this.$el = $(this.opt.el);
    this.$relationshipViews = [];
    this.template = this.opt.template;
    this.opt.user = this.opt.user_model.getUserData();
    this.hueLights = [];
    this.loadListeners();
  }

  SpaceView.prototype.init = function(){
    this.render();
  };

  SpaceView.prototype.addMeeting = function(data){
    var meeting = this.space.addMeeting(data);
    meeting = meeting.toJSON();

    var view = _.find(this.$relationshipViews, function(v){ return v.id()==meeting.relationship_id; });
    if (view) view.addMeeting(meeting);
  };

  SpaceView.prototype.addRelationship = function(data){
    var relationship = this.space.addRelationship(data);
    var view = new RelationshipView({relationship: relationship.toJSON()});
    this.$el.find('.empty').removeClass('active');
    this.$el.find('.relationships').append(view.el());
    this.$relationshipViews.push(view);

    // show meeting form
    $.publish('modals.open', [MeetingFormView, {relationship: relationship.toJSON()}]);
  };

  SpaceView.prototype.deleteMeeting = function(id){
    // update space
    var meeting = this.space.deleteMeeting(id);
    meeting = meeting.toJSON();

    var view = _.find(this.$relationshipViews, function(v){ return v.id()==meeting.relationship_id; });
    if (view) view.deleteMeeting(id);
  };

  SpaceView.prototype.deleteRelationship = function(id){
    // update space
    var relationship = this.space.deleteRelationship(id);

    // update view
    var view = _.find(this.$relationshipViews, function(v){ return v.id()==id; });
    if (view) view.remove();

    // remove view
    this.$relationshipViews = _.reject(this.$relationshipViews, function(v){ return v.id()==id; });
  };

  SpaceView.prototype.isActive = function(){
    return (this.$el.attr('view') == this.opt.id);
  };

  SpaceView.prototype.loadListeners = function(){
    var _this = this;

    this.$el.on('click', '.add-relationship', function(e){
      e.preventDefault();
      $.publish('modals.open', [RelationshipFormView, {}]);
    });

    $(document).keydown(function(e) {
      if (e.keyCode == 83 && e.ctrlKey) { // ctrl + s
        e.preventDefault();
        _this.save();
      }
    });

    $.subscribe('users.refresh', function(e, user, message){
      _this.opt.user = user;
      _this.render();
    });

    $.subscribe('users.signup.success', function(e, user, message){
      _this.opt.user = user;
      _this.render();
    });

    $.subscribe('users.signout', function(e, message){
      _this.opt.user = false;
      _this.render();
    });

    $.subscribe('relationship.create', function(e, data){
      console.log('Creating relationship', data);
      _this.addRelationship(data);
    });

    $.subscribe('relationship.update', function(e, data){
      console.log('Updating relationship', data);
      var id = data.id;
      data = _.omit(data, 'id');
      _this.updateRelationship(id, data);
    });

    $.subscribe('relationship.delete', function(e, id){
      console.log('Deleting relationship', id);
      _this.deleteRelationship(id);
    });

    $.subscribe('meeting.create', function(e, data){
      console.log('Creating meeting', data);
      _this.addMeeting(data);
    });

    $.subscribe('meeting.update', function(e, data){
      console.log('Updating meeting', data);
      var id = data.id;
      data = _.omit(data, 'id');
      _this.updateMeeting(id, data);
    });

    $.subscribe('meeting.delete', function(e, id){
      console.log('Deleting meeting', id);
      _this.deleteMeeting(id);
    });

    $.subscribe('hue.light.load', function(e, hueLight){
      console.log('Load Hue light', hueLight);
      _this.onHueLightLoad(hueLight);
    });

    $.subscribe('hue.light.toggle', function(e, hueLightId){
      _this.toggleHueLight(hueLightId);
    });

  };

  SpaceView.prototype.loadSpace = function(){
    if (!this.opt.user) {
      this.space = false;
      return false;
    }
    var props = this.opt.user.space || {};
    this.space = new SpaceModel(props);
  };

  SpaceView.prototype.onHueLightLoad = function(hueLight){
    this.hueLights.push(hueLight);
    this.render();
  };

  SpaceView.prototype.render = function(){
    var _this = this;

    this.loadSpace();
    this.opt.space = this.space ? this.space.toJSON() : false;
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);

    // render relationships
    var $relationships = $('<div class="relationships">');
    if (this.opt.space) {
      var meetings = this.opt.space.meetings;
      // sort by light order
      var orderedRelationships = this._sortByList(this.opt.space.relationships, this.opt.lights, 'light', 'value');
      _.each(orderedRelationships, function(r){
        if (r.active) {
          var rmeetings = _.where(meetings, {relationship_id: r.id, active: 1});
          var view = new RelationshipView({relationship: r, meetings: rmeetings, readonly: _this.opt.readonly});
          var light = view.light();
          var hueLight = _.findWhere(_this.hueLights, {id: light.hueLightId});
          if (hueLight) view.setHueLight(hueLight);
          $relationships.append(view.el());
          _this.$relationshipViews.push(view);
        }
      });
    }
    this.$el.find('.relationships-wrapper').html($relationships);
  };

  SpaceView.prototype.save = function(){
    this.space.save();
  };

  SpaceView.prototype.toggleHueLight = function(hueLightId){
    var views = _.filter(this.$relationshipViews, function(v){
      var light = v.light();
      return hueLightId==light.hueLightId;
    });

    _.each(views, function(view){
      view.toggleHueLight();
    });
  };

  SpaceView.prototype.updateMeeting = function(id, data){
    // update space
    var meeting = this.space.updateMeeting(id, data);
    meeting = meeting.toJSON();

    // update view
    var view = _.find(this.$relationshipViews, function(v){ return v.id()==meeting.relationship_id; });
    if (view) view.updateMeeting(id, data);
  };

  SpaceView.prototype.updateRelationship = function(id, data){
    // update space
    var relationship = this.space.updateRelationship(id, data);

    // update view
    var view = _.find(this.$relationshipViews, function(v){ return v.id()==id; });
    if (view) view.update(data);
  };

  SpaceView.prototype._sortByList = function(list, list_order_by, key, key_order_by) {
    var order = _.pluck(list_order_by, key_order_by);
    var sorted = _.sortBy(list, function(item){
      return _.indexOf(order, item[key]);
    });
    return sorted;
  };

  return SpaceView;

})();
