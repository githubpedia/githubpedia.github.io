
var q = getVars["q"];
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
      costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
          newValue = Math.min(Math.min(newValue, lastValue),
          costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
    costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}
$.get("/pages", function(data) {
  data.split(/\r?\n/g).filter(function(a) {
    return a.replace(/\s/g, '').length;
  }).sort(function(a, b) {
    if(similarity(a, q) > similarity(b, q))
      return -1;
    else
      return 1;
    return 0;
  }).forEach(function(line) {
    splitLine = line.split(/\t{1,}/g);
    if(similarity(splitLine[0], q) < 0.5)
      return;
    $("#-ghp-searchResults").append("<h2><a href=\"/?page=wiki&thing=" + splitLine[1] + "\">" + splitLine[0] + "</a></h2>");
  });
});
