var SpaceView = (function() {
  function SpaceView(options) {
    var defaults = {
      el: '#main',
      id: 'space',
      template: _.template(TEMPLATES['space.ejs']),
      space: false
    };
    this.opt = _.extend(defaults, options);
    this.space = false;
    this.$el = $(this.opt.el);
    this.$relationshipViews = [];
    this.template = this.opt.template;
    this.opt.user = this.opt.user_model.getUserData();
    this.loadListeners();
  }

  SpaceView.prototype.init = function(){
    this.render();
  };

  SpaceView.prototype.addRelationship = function(data){
    var relationship = this.space.addRelationship(data);
    var view = new RelationshipView({relationship: relationship.toJSON()});
    this.$el.find('.empty').removeClass('active');
    this.$el.find('.relationships').append(view.el());
    this.$relationshipViews.push(view);
  };

  SpaceView.prototype.deleteRelationship = function(id){
    // update space
    var relationship = this.space.deleteRelationship(id);

    // update view
    var view = _.find(this.$relationshipViews, function(v){ return v.id()==id; });
    if (view) view.remove();
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

  };

  SpaceView.prototype.loadSpace = function(){
    if (!this.opt.user) {
      this.space = false;
      return false;
    }
    var props = this.opt.user.space || {};
    this.space = new SpaceModel(props);
  };

  SpaceView.prototype.render = function(){
    var _this = this;

    this.loadSpace();
    this.opt.space = this.space ? this.space.toJSON() : false;
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);

    // render relationships
    var $relationships = $('<div class="relationships">');
    if (this.opt.space) {
      _.each(this.opt.space.relationships, function(r){
        if (r.active) {
          var view = new RelationshipView({relationship: r});
          $relationships.append(view.el());
          _this.$relationshipViews.push(view);
        }
      });
    }
    this.$el.find('.relationships-wrapper').html($relationships);
  };

  SpaceView.prototype.updateRelationship = function(id, data){
    // update space
    var relationship = this.space.updateRelationship(id, data);

    // update view
    var view = _.find(this.$relationshipViews, function(v){ return v.id()==id; });
    if (view) view.update(data);
  };

  return SpaceView;

})();
