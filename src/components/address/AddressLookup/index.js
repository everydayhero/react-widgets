"use strict";

var React               = require('react/addons');
var I18nMixin           = require('../../mixins/I18n');
var _                   = require('lodash');
var Input               = require('../../forms/Input');
var CountrySelect       = require('../CountrySelect');
var countryList         = require('../CountrySelect/countries');
var AddressStatus       = require('../AddressStatus');
var AddressListing      = require('../AddressListing');
var AddressBreakdown    = require('../AddressBreakdown');
var addressAPI          = require('../../../api/address');
var addEventListener    = require('../../../lib/addEventListener');
var removeEventListener = require('../../../lib/removeEventListener');

module.exports = React.createClass({
  mixins: [I18nMixin],

  displayName: "AddressLookup",

  propTypes: {
    required: React.PropTypes.bool,
    output: React.PropTypes.func,
    prefix: React.PropTypes.string,
    country: React.PropTypes.string,
    address: React.PropTypes.object,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      required: false,
      output: function() {},
      country: 'US',
      prefix: '',
      address: null,
      defaultI18n: {
        inputLabel: 'Address Lookup',
        inputLabelGB: 'Postcode Lookup',
        manualEntryButton: 'Enter Manually',
        resetButton: 'Reset Address',
        error: "Sorry, we couldn't find that address"
      }
    };
  },

  getInitialState: function() {
    return {
      focusOnMount: false,
      choosingCountry: false,
      country: this.props.country === 'UK' ? 'GB' : this.props.country,
      input: '',
      addressList: null,
      address: this.props.address,
      custom: null,
      loading: false,
      error: false,
      fauxFocus: 0,
      cancelSearch: function() {},
      cancelFind: function() {}
    };
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.addressList) addEventListener(window, 'keydown', this.keyHandler);
    if (!nextState.addressList) removeEventListener(window, 'keydown', this.keyHandler);
  },

  componentWillUnmount: function() {
    removeEventListener(window, 'keydown', this.keyHandler);
  },

  keyHandler: function(e) {
    var key = e.keyCode || e.which;
    var i = this.state.fauxFocus;
    var list = this.state.addressList;
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
    if (e.keyCode === 9) {
      return this.setFauxFocus(-1);
    }
    if (key === 13 && i >= 0) {
      e.preventDefault();
      this.getAddress(list[i].id);
    }
  },

  setFauxFocus: function(i) {
    this.setState({ fauxFocus: i });
  },

  chooseCountry: function() {
    this.setState({
      choosingCountry: true,
      input: '',
      addressList: null,
      address: null,
      loading: false,
      error: null
    });
  },

  setCountry: function(country) {
    this.setState({
      country: country,
      choosingCountry: false,
      focusOnMount: true
    });
  },

  setInput: function(input) {
    if (input.length > 4) {
      this.getList(input);
    }
    this.setState({
      focusOnMount: false,
      loading: input.length > 4,
      input: input,
      error: null,
      addressList: null
    });
  },

  reset: function() {
    this.setState({
      loading: false,
      input: '',
      addressList: false,
      address: null,
      custom: null,
      focusOnMount: true
    }, this.output);
  },

  setCustom: function(key) {
    return function(value) {
      var custom = this.state.custom || _.clone(this.state.address);
      custom[key] = value;
      custom.paf_validated = false;
      this.setState({
        custom: (_.isEqual(custom, this.state.address)) ? null : custom
      }, this.output);
    }.bind(this);
  },

  setManualEntry: function() {
    var country = _.find(countryList, { iso: this.state.country });
    this.setState({
      error: null,
      addressList: null,
      custom: {
        street_address: '',
        extended_address: '',
        locality: '',
        postal_code: '',
        region: '',
        country_name: country.name,
        paf_validated: false
      }
    });
  },

  output: function() {
    this.props.output(this.state.custom || this.state.address);
  },

  getList: _.debounce(function(input) {
    this.state.cancelSearch();
    this.setState({
      loading: true,
      cancelSearch: addressAPI.search(input, this.state.country, this.setList)
    });
  }, 100, { trailing: true }),

  getAddress: function(id) {
    this.state.cancelFind();
    this.setState({
      loading: true,
      cancelFind: addressAPI.find(id, this.state.country, this.setAddress)
    });
  },

  setList: function(list) {
    if (this.validate(list.addresses, this.setError)) {
      this.setState({ error: false, addressList: list.addresses, loading: false });
    }
  },

  setAddress: function(address) {
    if (this.validate(address.address, this.setError)) {
      address.address.paf_validated = this.state.country === "GB";
      this.setState({ error: false, address: address.address, addressList: null, loading: false, focusOnMount: true }, this.output);
    }
  },

  setError: function(bool) {
    this.setState({ error: !bool, addressList: null, address: null, loading: false });
  },

  validate: function(val, callback) {
    var bool = _.isEmpty(val) || typeof val === 'string';
    callback(!bool);
    return !bool;
  },

  renderListing: function() {
    return this.state.addressList.map(function(d, i) {
      return <AddressListing
        key={ d.id + i }
        index={ i }
        focused={ i === this.state.fauxFocus }
        onMouseEnter={ this.setFauxFocus }
        id={ d.id }
        label={ d.label }
        onClick={ this.getAddress }/>;
    }, this);
  },

  renderStatus: function(bool) {
    return bool && (
      <AddressStatus
        loading={ this.state.loading }
        error={ !!this.state.error }
        success={ !!this.state.addressList } />
    );
  },

  renderCountry: function(bool) {
    return bool && (
      <CountrySelect
        ref="countrySelect"
        prefix={ this.props.prefix }
        selected={ this.state.country }
        open={ this.state.choosingCountry }
        onOpen={ this.chooseCountry }
        onChange={ this.setCountry } />
    );
  },

  renderInput: function(bool) {
    return bool && (
      <Input
        key={ this.t('inputLabel') }
        ref={ 'lookup' }
        required={ this.props.required }
        error={ this.state.error }
        validate={ this.validate }
        i18n={{
          name: this.props.prefix + 'lookup',
          label: this.state.country === 'GB' ? this.t('inputLabelGB') : this.t('inputLabel'),
          error: this.t('error')
        }}
        value={ this.state.input }
        autoFocus={ this.state.focusOnMount }
        output={ this.setInput } />
    );
  },

  renderList: function(bool) {
    return bool && (
      <div className="AddressLookup__list">
        { this.renderListing() }
      </div>
    );
  },

  renderResetButton: function() {
    return (
      <div className="AddressLookup__reset" tabIndex='0' onClick={ this.reset } onKeyPress={ this.reset }>
        { this.t('resetButton') }
      </div>
    );
  },

  renderManualButton: function(bool) {
    return bool && (
      <div className="AddressLookup__manual" tabIndex='0' onClick={ this.setManualEntry } onKeyPress={ this.setManualEntry }>
        { this.t('manualEntryButton') }
      </div>
    );
  },

  renderAddress: function(address) {
    return address && (
      <AddressBreakdown
        autoFocus={ this.state.focusOnMount }
        prefix={ this.props.prefix }
        required={ this.props.required }
        address={ address }
        region={ this.state.country }
        onChange={ this.setCustom }>
        { this.renderResetButton() }
      </AddressBreakdown>
    );
  },

  render: function() {
    var address = this.state.custom || this.state.address;
    return (
      <div className="AddressLookup">
        { this.renderCountry(!address) }
        { this.renderStatus(!this.state.choosingCountry) }
        { this.renderInput(!address && !this.state.choosingCountry) }
        { this.renderList(this.state.addressList && !address) }
        { this.renderManualButton(!!this.state.error || (this.state.addressList && !address)) }
        { this.renderAddress(address) }
      </div>
    );
  }
});
