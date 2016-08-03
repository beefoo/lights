var RelationshipModel = (function() {
  function RelationshipModel(props, options) {
    var defaults = this.defaultProps();
    var defaultOptions = {};
    this.props = _.extend(defaults, props);
    this.opt = _.extend(defaultOptions, CONFIG);
    if (options) this.opt = _.extend(defaultOptions, CONFIG, options);
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

  RelationshipModel.prototype.getImages = function(level){
    var light = this.getLight();
    if (!light) light = this.opt.lights[0];
    var image = this.opt.base_image_url + light.image.replace('{level}', level);
    var imageOver = image;
    if (level > 0) imageOver = this.opt.base_image_url + light.image.replace('{level}', level-1);
    return [image, imageOver];
  };

  RelationshipModel.prototype.getLastMeeting = function(meetings){
    // sort dates descending order
    var meetings = _.map(meetings, function(m){ return _.extend({},m,{date: UTIL.normalizeDate(m.date)}); });
    meetings = _.sortBy(meetings, function(m){ return -m.date.getTime(); });

    // require at least one meeting
    if (!meetings.length) return false;

    return meetings[0];
  };

  RelationshipModel.prototype.getLastMeetingMethod = function(methodValue){
    return _.findWhere(this.opt.methods, {value: methodValue})
  };

  RelationshipModel.prototype.getLevel = function(amount){
    var r = this.opt.lightLevelRange;
    var level = Math.round(UTIL.lerp(r[0], r[1], amount));
    return level;
  };

  RelationshipModel.prototype.getLevelFromMeetings = function(meetings){
    var amount = this.getPercent(meetings);
    return this.getLevel(amount);
  };

  RelationshipModel.prototype.getLight = function(){
    var lightValue = this.props.light;
    return _.findWhere(this.opt.lights, {value: lightValue});
  };

  RelationshipModel.prototype.getPercent = function(meetings){
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
    return 1.0-UTIL.lim(diffDays / rhythmDays, 0, 1);
  };

  RelationshipModel.prototype.getRhythm = function(){
    if (!this.props.rhythm || !this.props.rhythm.length) return false;

    var rhythmValue = this.props.rhythm;
    var rhythm = _.findWhere(this.opt.rhythms, {value: rhythmValue});

    return rhythm ? _.clone(rhythm) : false;
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
