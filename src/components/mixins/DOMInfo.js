"use strict";

module.exports = {
  /**
  * This Mixin can only be called in/after ComponentDidMount(), as
  * getDOMNode() is unavailable until after the component is rendered.
  */
  getComponentWidth: function () {
    return this.getDOMNode().offsetWidth;
  },

  getDevice: function() {
    if (this.getComponentWidth() < 450) { return 'mobile'; } else
    if (this.getComponentWidth() < 700) { return 'tablet'; } else
    if (this.getComponentWidth() < 950) { return 'laptop'; } else
    if (this.getComponentWidth() < 1200) { return 'desktop'; } else
    { return 'wide'; }
  },

  getDeviceFallback: function(device, obj) {
    var devices = ['mobile', 'tablet', 'laptop', 'desktop', 'wide'],
      length = devices.length,
        i = devices.indexOf(device),
        fallback,
        inc = 0;
    while (!fallback && inc++ <= length) {
      fallback = obj[devices[i - inc]] || obj[devices[i + inc]];
    }
    return fallback;
  },

  getSize: function() {
    if (this.getComponentWidth() < 200) { return 'tiny'; } else
    if (this.getComponentWidth() < 350) { return 'small'; } else
    if (this.getComponentWidth() < 500) { return 'medium'; } else
    if (this.getComponentWidth() < 650) { return 'large'; } else
    { return 'huge'; }
  },

  getChildrenWidth: function(min, count) {
    var width = this.getComponentWidth();
    var maxPerRow = Math.floor(width / min);
    var rows = Math.ceil(count / maxPerRow);
    return Math.floor(100 / Math.min(count, maxPerRow) * 100) / 100 + '%';
  }
};
