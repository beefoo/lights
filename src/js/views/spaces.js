var SpaceView = (function() {
  function SpaceView(options) {
    var defaults = {
      el: '#main',
      id: 'space',
      template: _.template(TEMPLATES['space.ejs']),
      space: false
    };
    this.opt = _.extend(defaults, options);
  }

  SpaceView.prototype.init = function(){
    this.space = false;
    this.$el = $(this.opt.el);
    this.$relationshipViews = [];
    this.template = this.opt.template;
    this.opt.user = this.opt.user_model.getUserData();
    this.render();
    this.loadListeners();
  };

  SpaceView.prototype.addRelationship = function(data){
    var relationship = this.space.addRelationship(data);
    var view = new RelationshipView({relationship: relationship.toJSON()});
    this.$el.find('.relationships').append(view.el());
    this.$relationshipViews.push(view);
  };

  SpaceView.prototype.isActive = function(){
    return (this.$el.attr('view') == this.opt.id);
  };

  SpaceView.prototype.loadListeners = function(){
    var _this = this;

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
      _this.updateRelationship(data);
    });
  };

  SpaceView.prototype.loadSpace = function(){
    if (!this.opt.user) return false;
    var props = this.opt.user.space || {};
    this.space = new SpaceModel(props);
  };

  SpaceView.prototype.render = function(){
    var _this = this;
    
    this.loadSpace();
    if (this.space) this.opt.space = this.space.toJSON();
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);

    // render relationships
    var $relationships = $('<div class="relationships">');
    _.each(this.opt.space.relationships, function(r){
      var view = new RelationshipView({relationship: r});
      $relationships.append(view.el());
      _this.$relationshipViews.push(view);
    });
    this.$el.find('.relationships-wrapper').html($relationships);
  };

  SpaceView.prototype.updateRelationship = function(data){
    var id = data.id;
    data = _.omit(data, 'id');

    // update space
    var relationship = this.space.updateRelationship(id, data);

    // update view
    var view = _.find(this.$relationshipViews, function(v){ return v.id()==id; });
    if (view) view.update(data);
  };

  return SpaceView;

})();
