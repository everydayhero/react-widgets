import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import cx from 'classnames';
import _ from 'lodash';
import I18nMixin from '../../mixins/I18n';
import Input from '../Input';
import SelectOptions from '../SelectOptions';

export default React.createClass({
  displayName: 'Select',

  mixins: [I18nMixin, PureRenderMixin],

  propTypes: {
    disabled: React.PropTypes.bool,
    required: React.PropTypes.bool,
    labelKey: React.PropTypes.string,
    width: React.PropTypes.string,
    spacing: React.PropTypes.string,
    value: React.PropTypes.string,
    options: React.PropTypes.array.isRequired,
    i18n: React.PropTypes.object,
    output: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      disabled: false,
      required: false,
      output: function() {},
      labelKey: 'name',
      value: '',
      width: 'full',
      spacing: 'loose',
      defaultI18n: {
        name: 'select',
        label: 'Select'
      }
    };
  },

  getInitialState: function() {
    return {
      focused: false,
      filter: null,
      value: this.props.value
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  },

  selectHandler: function(option) {
    var value = option ? option[this.props.labelKey] : '';
    this.props.output(value, option);
    this.setState({ focused: false, filter: null, value: value });
  },

  isFuzzyMatch: function(val) {
    var j      = 0;
    var i      = 0;
    var filter = this.state.filter.toLowerCase();
    var length = filter.length;

    val = val.toLowerCase();

    while(i < length) {
      var l = filter[i++];
      if (l === ' ') continue;
      j = val.indexOf(l, j);
      if (j === -1) return false;
    }

    return true;
  },

  isExactMatch: function(val) {
    if (!this.state.filter) return true;
    return val.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1;
  },

  getFilteredOptions: function() {
    var key = this.props.labelKey;
    var exactMatches = this.props.options.filter(function(d) {
      return this.isExactMatch(d[key]);
    }, this);
    return !_.isEmpty(exactMatches) ? exactMatches : this.props.options.filter(function(d) {
      return this.isFuzzyMatch(d[key]);
    }, this);
  },

  handleInput: function(val) {
    this.setState({
      focused: true,
      value: val,
      filter: val
    });
  },

  handleFocus: function() {
    if (this.props.disabled) {
      return false;
    }
    this.setState({
      focused: true,
      filter: null
    });
  },

  renderOptions: function(bool) {
    if (!bool) return;
    var options = this.getFilteredOptions();
    var key = this.props.labelKey;
    var value = this.state.value;
    var selected = _.findIndex(options, function(option) { return option[key] === value; });
    return <SelectOptions
      options={ options }
      labelKey={ key }
      selected={ selected >= 0 ? selected : value ? 0 : -1 }
      onSelect={ this.selectHandler } />;
  },

  render: function() {
    var props = this.props;
    var width = props.width;
    var spacing = props.spacing;
    var enabled = !props.disabled;
    var classes = cx({
      'Select': true,
      'Select--full': !width || width === 'full',
      'Select--wide': width === 'wide',
      'Select--half': width === 'half',
      'Select--narrow': width === 'narrow',
      'Select--compact': spacing === 'compact',
      'Select--tight': spacing === 'tight',
      'Select--loose': spacing === 'loose'
    });

    return (
      <div className={ classes }>
        <Input
          i18n={ this.getI18n() }
          disabled={ props.disabled }
          required={ props.required }
          value={ this.state.value }
          width={ "full" }
          spacing={ "compact" }
          icon={ 'caret-down' }
          output={ enabled && this.handleInput }
          modal={ enabled && this.handleFocus }/>

        { this.renderOptions(this.state.focused) }
      </div>
    );
  }
});
