var RelationshipModel = (function() {
  function RelationshipModel(options) {
    var defaults = {
      id: 0,
      name: 'Unknown',
      method: 'in_person',
      rhythm: 2,
      unit: 'month',
      notes: '',
      tags: []
    };
    this.opt = _.extend(defaults, options);
    this.init();
  }

  RelationshipModel.prototype.init = function(){};

  return RelationshipModel;

})();
