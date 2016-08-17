var loaderUtils = require('loader-utils');

module.exports = function(template) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);

  function merge(a, b){
    function applyKeys(from, to){
      for(var key in from){
        to[key] = from[key];
      }
    }

    var r = {}
    applyKeys(a, r);
    applyKeys(b, r);
    return r;
  }

  var dataTemplate = "function(data){"
    + merge +
    "var mergedData = merge(data, " + JSON.stringify(query) +");" +
    "return "+template+"(mergedData);" +
  "}"

  return 'module.exports = ' + dataTemplate;
};
