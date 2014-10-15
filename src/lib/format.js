function format(template, data) {
  if (!data) {
    return template;
  };

  return template.replace(/{([^{}]+)}/g, function(a, b) {
    var r = data[b];
    return r == null ? a : r;
  });
};

module.exports = format;
