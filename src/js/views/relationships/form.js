var RelationshipFormView = (function() {
  function RelationshipFormView(options) {
    var defaults = {
      el: '#modal-container',
      id: 'relationship-add',
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
  }

  RelationshipFormView.prototype.init = function(){
    this.render();
    this.loadListeners();
  };

  RelationshipFormView.prototype.close = function(){
    this.$el.off('submit', '.relationship-form');
    this.$el.html('').attr('view', '');
  };

  RelationshipFormView.prototype.loadListeners = function(){
    var _this = this;

    this.$el.on('submit', '.relationship-form', function(e){
      e.preventDefault();

      var data = $(this).serializeObject();
      _this.submit(data);
    });
  };

  RelationshipFormView.prototype.render = function(){
    this.$el.html(this.template(this.opt)).attr('view', this.opt.id);
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
