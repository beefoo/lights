$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

// Utility functions
(function() {
  window.UTIL = {};

  UTIL.formatDate = function(date) {
    var d = new Date(date);

    // format date
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var str = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getUTCDate() + ", " + d.getFullYear();

    return str;
  };

  UTIL.formatDateInput = function(date) {
    var d = new Date(date);
    return d.toISOString().slice(0,10);
  };

  // Linear interpolation
  UTIL.lerp = function(a, b, t) {
    return a + (b-a)*t;
  };

  // Make a random id
  UTIL.makeId = function(length){
    var text = "",
        alpha = "abcdefghijklmnopqrstuvwxyz",
        alphanum = "abcdefghijklmnopqrstuvwxyz0123456789",
    length = length || 8;
    for(var i=0; i < length; i++) {
      if (i <= 0) { // must start with letter
        text += alpha.charAt(Math.floor(Math.random() * alpha.length));
      } else {
        text += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
      }
    }
    return text;
  };

  UTIL.normalizeDate = function(date){
    var d = new Date(date);
    // account for time zone difference
    d = new Date(d.getTime() + d.getTimezoneOffset()*60000);
    return d;
  };

  // Round to decimal
  UTIL.round = function(num, dec) {
    num = parseFloat(num);
    dec = dec || 0;
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  };

  UTIL.timeAgo = function(date) {
    // determine time ago
    var d = UTIL.normalizeDate(date);
    var now = new Date();
    // ignore hours
    d.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    var diff = now.getTime() - d.getTime();
    var day = 1000 * 60 * 60 * 24;
    var days = diff / day;
    var time_ago = "today";

    if (days > (365 + 7)) time_ago = "over a year ago";
    else if (days > (365 - 7)) time_ago = "about a year ago";
    else if (days >= 2) {
      // determine months
      var monthDiff = now.getMonth() - d.getMonth();
      var dateDiff = now.getUTCDate() - d.getUTCDate();
      var months = 0;
      if (monthDiff > 0 && dateDiff >= 0) {
        months = monthDiff;
        days = dateDiff;
      }

      // remaining weeks, days
      var weeks = Math.floor(days / 7);
      days = days % 7;

      // build string
      var units = [];
      if (months > 1) units.push(months + " months");
      else if (months > 0) units.push("one month");
      if (weeks > 1) units.push(weeks + " weeks");
      else if (weeks > 0) units.push("one week");
      if (days > 1) units.push(days + " days");
      else if (days > 0) units.push("one day");
      time_ago = "about " + units.join(", ") + " ago";

    } else if (days >= 1) {
      time_ago = "yesterday";
    }

    return time_ago;
  };

})();
