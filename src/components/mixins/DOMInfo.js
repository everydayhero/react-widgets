/**
* This Mixin can only be called in/after ComponentDidMount(), as
* getDOMNode() is unavailable until after the component is rendered.
*/
/**
* This Mixin can only be called in/after ComponentDidMount(), as
* getDOMNode() is unavailable until after the component is rendered.
*/
import ReactDOM from 'react-dom';
import _ from 'lodash';
import addEventListener from '../../lib/addEventListener';

const breakpoints = {
  mobile: 450,
  tablet: 700,
  laptop: 950,
  desktop: 1200,
  wide: 1450,
  xWide: 1700
};
var sizes = {
  tiny: 200,
  small: 350,
  medium: 500,
  large: 650,
  huge: 800,
  xHuge: 950,
};
var resizeHandlers = [];

addEventListener('resize', function(e) {
  resizeHandlers.forEach(function(handler) {
    handler(e);
  });
});

function findSize(o, w) {
  return _.findKey(o, function(d) {
    return w < d;
  });
}

export default {
  getInitialState() {
    return {
      size: 'tiny',
      device: 'mobile' // Mobile first
    };
  },

  componentDidMount() {
    resizeHandlers.push(this.setSizeAndDevice);
    this.setSizeAndDevice();
  },

  componentWillUnmount() {
    _.pull(resizeHandlers, this.setSizeAndDevice);
  },

  handleResize: _.debounce(function() {
    this.setSizeAndDevice();
  }, 100, { trailing: true }),

  getChildrenWidth(min_width, count) {
    let child_count = Math.min(count, this.getChildCountFromWidth(min_width));
    return this.getChildWidth(child_count);
  },

  getChildWidth(count) {
    return Math.floor(10000 / Math.max(1, count)) * 0.01 + '%';
  },

  getChildCountFromWidth(min_width) {
    return Math.max(1, Math.floor(this.getComponentWidth() / min_width));
  },

  getDeviceFallback(device, obj) {
    let devices = ['mobile', 'tablet', 'laptop', 'desktop', 'wide'];
    let length = devices.length;
    let i = devices.indexOf(device);
    let fallback;
    let inc = 0;
    while (!fallback && inc++ <= length) {
      fallback = obj[devices[i - inc]] || obj[devices[i + inc]];
    }
    return fallback;
  },

  setSizeAndDevice() {
    let size = this.getSize();
    let device = this.getDevice();
    if (size !== this.state.size || device !== this.state.device) {
      this.setState({
        size: size,
        device: device
      });
    }
  },

  getWindowWidth() {
    return document.body.clientWidth;
  },

  getComponentWidth () {
    return ReactDOM.findDOMNode(this).offsetWidth || 0;
  },

  getDevice() {
    let w = this.getWindowWidth();
    return findSize(breakpoints, w) || 'xxWide';
  },

  getSize() {
    let w = this.getComponentWidth();
    return findSize(sizes, w) || 'xxHuge';
  }
};