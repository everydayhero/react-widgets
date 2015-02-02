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
    address: React.PropTypes.object,
    country: React.PropTypes.string,
    i18n: React.PropTypes.object,
    output: React.PropTypes.func,
    prefix: React.PropTypes.string,
    required: React.PropTypes.bool,
    validate: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      address: null,
      country: 'US',
      output: function() {},
      prefix: '',
      required: false,
      validate: function() {},
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
    this.setState({
      focusOnMount: false,
      loading: false,
      input: input,
      error: null,
      addressList: null
    });
    this.getList(input);
  },

  reset: function() {
    this.setState({
      loading: false,
      input: '',
      addressList: null,
      address: null,
      custom: null,
      focusOnMount: true
    }, this.resetComplete);
  },

  resetComplete: function() {
    this.output();
    this.validate('', this.props.validate);
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
      addressList: null,
      custom: {
        country_name: country.name,
        extended_address: '',
        locality: '',
        paf_validated: false,
        postal_code: '',
        region: '',
        street_address: ''
      },
      error: null,
    });
  },

  output: function() {
    this.props.output(this.state.custom || this.state.address);
  },

  getList: _.debounce(function(input) {
    var chars = this.state.country === 'GB' ? 5 : 7;
    this.state.cancelSearch();
    if (input.length >= chars) {
      this.setState({
        loading: true,
        addressList: null,
        cancelSearch: addressAPI.search(input, this.state.country, this.setList)
      });
    }
  }, 250, { trailing: true }),

  getAddress: function(id) {
    this.state.cancelFind();
    this.setState({
      loading: true,
      cancelFind: addressAPI.find(id, this.state.country, this.setAddress)
    });
  },

  setList: function(list) {
    if (this.validate(list && list.addresses, this.setError)) {
      this.setState({ error: false, addressList: list.addresses, loading: false });
    }
  },

  setAddress: function(address) {
    if (this.validate(address && address.address, this.setError)) {
      address.address.paf_validated = this.state.country === "GB";
      this.setState({ error: false, address: address.address, addressList: null, loading: false, focusOnMount: true }, this.output);
    }
  },

  setError: function(bool) {
    this.setState({ error: !bool, addressList: null, address: null, loading: false });
  },

  validate: function(val, callback) {
    var bool = _.isEmpty(val);
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
    var props = this.props;
    var state = this.state;

    return address && (
      <AddressBreakdown
        validate={ props.validate }
        autoFocus={ state.focusOnMount }
        prefix={ props.prefix }
        required={ props.required }
        address={ address }
        region={ state.country }
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
