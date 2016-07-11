var RelationshipFormView = (function() {
  function RelationshipFormView(options) {
    var defaults = {
      el: '<div id="relationship-add">',
      template: _.template(TEMPLATES['relationship_form.ejs']),
      methods: [
        {value: 'in_person', label: 'In Person'},
        {value: 'call', label: 'Phone / Video'},
        {value: 'text', label: 'Text / Chat'},
        {value: 'mail', label: 'Snail Mail'}
      ],
      rhythms: [
        {value: 'week_1', label: 'Week'},
        {value: 'week_2', label: '2 Weeks'},
        {value: 'month_1', label: 'Month'},
        {value: 'month_2', label: '2 Months'},
        {value: 'month_3', label: '3 Months'},
        {value: 'month_6', label: '6 Months'},
        {value: 'year_1', label: 'Year'}
      ],
      relationship: false
    };
    this.opt = _.extend(defaults, options);
    this.$el = $(this.opt.el);
    this.template = this.opt.template;
    this.loadListeners();
  }

  RelationshipFormView.prototype.init = function(){
    this.render();
  };

  RelationshipFormView.prototype.close = function(){
    $.publish('modals.close');
  };

  RelationshipFormView.prototype.el = function(){
    return this.$el;
  };

  RelationshipFormView.prototype.loadListeners = function(){
    var _this = this;

    this.$el.on('submit', '.relationship-form', function(e){
      e.preventDefault();

      var data = $(this).serializeObject();
      _this.submit(data);
    });

    this.$el.on('click', '.remove-relationship', function(e){
      e.preventDefault();

      _this.removeRelationship();
    });
  };

  RelationshipFormView.prototype.removeRelationship = function(id){
    if (!this.opt.relationship) return false;

    $.publish('relationship.delete', id);
    this.opt.relationship = false;
    this.close();
  };

  RelationshipFormView.prototype.render = function(){
    this.$el.html(this.template(this.opt));
  };

  RelationshipFormView.prototype.remove = function(){
    this.$el.off('submit', '.relationship-form');
    this.$el.off('click', '.remove-relationship');
  };

  RelationshipFormView.prototype.submit = function(data){
    if (this.opt.relationship && data.id.length){
      $.publish('relationship.update', data);
    } else {
      $.publish('relationship.create', data);
    }

    this.opt.relationship = data;
    this.close();
  };

  return RelationshipFormView;

})();
