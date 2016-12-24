if ('registerElement' in document
  && 'createShadowRoot' in HTMLElement.prototype
  && 'import' in document.createElement('link')
  && 'content' in document.createElement('template')) {
} else {
  document.write('<script src="https:\/\/cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.5/webcomponents.min.js"><\/script>')
}
window.getVars = (function() {
  var vars = {};
  vars["page"] = "index";
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
})();
$(document).ready(function() {
  $("div#content").html("<html-include src=\"page/" + getVars["page"] + ".html\"></html-include>");
  $("body").append("<script src=\"page/" + getVars["page"] + ".js\"></script>");
});
