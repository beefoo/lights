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
    return {
      id: 0,
      name: 'Unknown',
      method: 'in_person',
      rhythm: 'week_1',
      notes: '',
      active: 1,
      order: 0,
      light: 'workspace'
    };
  };

  RelationshipModel.prototype.fields = function(){
    var defaults = this.defaultProps();
    return _.keys(defaults);
  };

  RelationshipModel.prototype.getLastMeeting = function(meetings){
    // sort dates descending order
    var meetings = _.map(meetings, function(m){ return _.extend({},m,{date: UTIL.normalizeDate(m.date)}); });
    meetings = _.sortBy(meetings, function(m){ return -m.date.getTime(); });

    // require at least one meeting
    if (!meetings.length) return false;

    return meetings[0];
  };

  RelationshipModel.prototype.getLevel = function(meetings){
    // find the difference between now and last meeting
    var meeting = this.getLastMeeting(meetings);
    if (!meeting) return 1;
    var date = meeting.date;
    var now = new Date();
    var diff = now.getTime() - date.getTime();
    var diffDays = diff / (1000*60*60*24);

    // compare to intended rhythm
    var rhythm = this.getRhythm();
    var unitDays = 1;
    switch (rhythm.unit) {
      case 'year':
        unitDays = 365;
        break;
      case 'month':
        unitDays = 365/12;
        break;
      case 'week':
        unitDays = 7;
        break;
      default:
        break;
    }
    var rhythmDays = rhythm.amount * unitDays;
    var amount = UTIL.lim(diffDays / rhythmDays, 0, 1);
    var level = Math.round(UTIL.lerp(9, 0, amount));

    return level;
  };

  RelationshipModel.prototype.getRhythm = function(){
    if (!this.props.rhythm || !this.props.rhythm.length) return false;

    var parts = this.props.rhythm.split('_');
    var rhythm = false;

    if (parts.length==2) {
      rhythm = {
        unit: parts[0],
        amount: parseInt(parts[1])
      }
    }

    return rhythm;
  };

  RelationshipModel.prototype.id = function(){
    return this.props.id;
  };

  RelationshipModel.prototype.isActive = function(){
    return this.props.active;
  };

  RelationshipModel.prototype.onUpdate = function(){

  };

  RelationshipModel.prototype.toJSON = function(){
    return _.clone(this.props);
  };

  RelationshipModel.prototype.update = function(data){
    var _this = this,
        dataFields = _.keys(data),
        fields = this.fields();

    _.each(fields, function(f){
      if (_.contains(dataFields, f)) _this.props[f] = data[f];
    });

    this.onUpdate();
  };

  return RelationshipModel;

})();
