'use strict';

var React               = require('react');
var PureRenderMixin     = require('react-addons-pure-render-mixin');
var cx                  = require('classnames');
var _                   = require('lodash');
var countries           = require('./countries');
var Input               = require('../../forms/Input');
var CountrySelectItem   = require('../CountrySelectItem');
var FlagIcon            = require('../../helpers/FlagIcon');
var addEventListener    = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');

module.exports = React.createClass({
  displayName: 'CountrySelect',

  mixins: [PureRenderMixin],

  propTypes: {
    prefix: React.PropTypes.string,
    selected: React.PropTypes.object.isRequired,
    open: React.PropTypes.bool,
    onOpen: React.PropTypes.func,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      prefix: '',
      open: false
    };
  },

  getInitialState: function() {
    return {
      filter: '',
      filteredList: null,
      fauxFocus: 0,
      countries: countries
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.open) addEventListener('keydown', this.keyHandler);
    if (!nextProps.open) {
      this.setFauxFocus(0);
      removeEventListener('keydown', this.keyHandler);
    }
  },

  componentWillUnmount: function() {
    removeEventListener('keydown', this.keyHandler);
  },

  keyHandler: function(e) {
    var key = e.keyCode || e.which;
    var i = this.state.fauxFocus;
    var list = this.state.filteredList || this.state.countries;
    if (key === 40) {
      e.preventDefault();
      i = (i + 1) % list.length;
      return this.setFauxFocus(i);
    }
    if (key === 38) {
      e.preventDefault();
      i = i <= 0 ? list.length - 1 : i - 1;
      return this.setFauxFocus(i);
    }
    if (key === 13) {
      e.preventDefault();
      this.setFilter('');
      return this.setCountry(list[i]);
    }
  },

  setFilter: function(text) {
    this.setState({
      filter: text,
      filteredList: this.setFilteredList(text)
    });
  },

  setFilteredList: function(text) {
    if (!text) return null;
    return _.filter(this.state.countries, function(d) {
      return d.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    });
  },

  setFauxFocus: function(i) {
    this.setState({ fauxFocus: i });
  },

  reset: function() {
    return {
      filter: '',
      filteredList: null,
      fauxFocus: 0
    };
  },

  setCountry: function(country) {
    this.reset();
    this.props.onChange(country);
  },

  renderCountries: function() {
    var countries = this.state.filteredList || this.state.countries;
    return _.map(countries, function(d, i) {
      return (
        <CountrySelectItem
          key={ d.name + i }
          index={ i }
          focused={ i === this.state.fauxFocus }
          onMouseEnter={ this.setFauxFocus }
          country={ d }
          onClick={ this.setCountry }/>
      )
    }, this);
  },

  renderToggle: function(bool) {
    var iso = this.props.selected.iso === 'GB' ? 'UK' : this.props.selected.iso;
    return bool && (
      <div className="CountrySelect__toggle" onKeyPress={ this.props.onOpen } onClick={ this.props.onOpen } tabIndex="0">
        { iso }
        <FlagIcon className="CountrySelect__flag" country={ this.props.selected.iso } />

        <span className="CountrySelect__caret hui-IconWrapper hui-Button__icon">
          <i className="hui-Icon fa fa-caret-down" />
        </span>
      </div>
    );
  },

  renderInput: function(bool) {
    return bool && (
      <Input
        autoFocus
        ref="countryFilter"
        key="countryFilter"
        i18n={{
          name: this.props.prefix + 'countryFilter',
          label: 'Find Country'
        }}
        spacing="compact"
        value={ this.state.filter }
        output={ this.setFilter } />
    );
  },

  renderCountryList: function(bool) {
    return bool && (
      <div className="CountrySelect__list">
        { this.renderCountries() }
      </div>
    );
  },

  render: function() {
    var classes = cx({
      'CountrySelect': true,
      'CountrySelect--open': this.props.open
    });
    return (
      <div className={ classes }>
        { this.renderToggle(!this.props.open) }
        { this.renderInput(this.props.open) }
        { this.renderCountryList(this.props.open) }
      </div>
    );
  }
});
