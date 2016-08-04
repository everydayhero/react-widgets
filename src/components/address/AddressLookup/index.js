'use strict';

var React               = require('react');
var PureRenderMixin     = require('react-addons-pure-render-mixin');
var cx                  = require('classnames');
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
  displayName: 'AddressLookup',

  mixins: [I18nMixin, PureRenderMixin],

  propTypes: {
    address: React.PropTypes.object,
    output: React.PropTypes.func,
    prefix: React.PropTypes.string,
    validations: React.PropTypes.object,
    required: React.PropTypes.bool,
    validate: React.PropTypes.func,
    spacing: React.PropTypes.string,
    country: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      address: null,
      prefix: '',
      validations: {},
      required: true,
      country: 'AU',
      spacing: 'loose',
      output: function() {},
      validate: function() {},
      defaultI18n: {
        inputLabel: 'Street Address',
        inputLabelUK: 'Postcode',
        manualEntryButton: 'Enter address manually',
        resetButton: 'Clear and search again',
        emptyError: 'Please enter an address'
      }
    };
  },

  getInitialState: function() {
    var iso = this.props.country === 'UK' ? 'UK' : this.props.country;
    var country = _.find(countryList, { iso: iso });
    var lookupEnabled = this.props.country !== 'IE';
    var customEntry = !lookupEnabled && !this.props.address;
    return {
      lookupEnabled: lookupEnabled,
      focusOnMount: false,
      choosingCountry: false,
      country: country,
      input: '',
      addressList: [],
      address: this.props.address,
      custom: customEntry ? this.getEmptyAddress(country) : null,
      loading: false,
      showDropdown: false,
      error: false,
      emptyPrompt: 'Sorry, we could\'t find that address',
      fauxFocus: 0,
      cancelSearch: function() {},
      cancelFind: function() {}
    };
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.showDropdown) addEventListener('keydown', this.keyHandler);
    if (!nextState.showDropdown) removeEventListener('keydown', this.keyHandler);
  },

  componentWillUnmount: function() {
    removeEventListener('keydown', this.keyHandler);
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
      addressList: [],
      address: null,
      loading: false,
      error: null
    });
  },

  setCountry: function(country) {
    this.setState({
      country: country || this.state.country,
      choosingCountry: false,
      focusOnMount: !!country
    });
  },

  setInput: function(input) {
    this.setState({
      focusOnMount: false,
      loading: false,
      input: input,
      error: null,
      addressList: []
    });
    this.getList(input);
  },

  reset: function() {
    this.setState({
      loading: false,
      input: '',
      addressList: [],
      address: null,
      custom: null,
      showDropdown: false,
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

  getEmptyAddress: function(country) {
    return {
      street_address: '',
      extended_address: '',
      locality: '',
      postal_code: '',
      region: '',
      country_name: country.name,
      paf_validated: false
    };
  },

  setManualEntry: function() {
    this.setState({
      addressList: [],
      error: false,
      custom: this.getEmptyAddress(this.state.country)
    });
  },

  output: function() {
    this.props.output(this.state.custom || this.state.address);
  },

  isPAFLookup: function () {
    return this.state.country.iso === 'UK';
  },

  isGoogleLookup: function () {
    return !this.isPAFLookup();
  },

  getList: _.debounce(function(input) {
    var minChars = this.isPAFLookup() ? 5 : 7;
    this.state.cancelSearch();
    if (input.length >= minChars) {
      this.setState({
        loading: true,
        addressList: [],
        cancelSearch: addressAPI.search(input, this.state.country.iso, this.setList)
      });
    }
  }, 250, { trailing: true }),

  getAddress: function(id) {
    this.state.cancelFind();
    this.setState({
      loading: true,
      cancelFind: addressAPI.find(id, this.state.country.iso, this.setAddress)
    });
  },

  setList: function(list) {
    this.setState({
      error: false,
      addressList: (list && list.addresses) || [],
      showDropdown: true,
      loading: false
    });
  },

  setAddress: function(address) {
    if (this.validate(address && address.address, this.setError)) {
      address.address.paf_validated = this.isPAFLookup();
      this.setState({
        error: false,
        address: address.address,
        addressList: [],
        showDropdown: false,
        loading: false,
        focusOnMount: true
      }, this.output);
    }
    this.props.validate(address);
  },

  setError: function(bool) {
    this.setState({
      error: !bool,
      showDropdown: !bool,
      addressList: [],
      address: null,
      loading: false
    });
  },

  validate: function(val, callback) {
    var bool = _.isEmpty(val);
    callback(!bool);
    return !bool;
  },

  validateSearch: _.debounce(function () {
    var address = this.state.address || this.state.custom;
    if (this.props.required &&
        !this.state.choosingCountry &&
        !address) {
      this.setState({
        showDropdown: true,
        error: true
      });
    }
  }, 250),

  renderListing: function() {
    if (!this.state.addressList.length) {
      return (
        <div className="AddressListing">
          <em>{ this.state.emptyPrompt }</em>
        </div>
      );
    }

    return this.state.addressList.map(function(d, i) {
      return (
        <AddressListing
          key={ d.id + i }
          index={ i }
          focused={ i === this.state.fauxFocus }
          onMouseEnter={ this.setFauxFocus }
          id={ d.id }
          label={ d.label }
          onClick={ this.getAddress }/>
      );
    }, this);
  },

  renderStatus: function(bool) {
    return bool && (
      <AddressStatus
        loading={ this.state.loading }
        error={ !!this.state.error }
        success={ !!this.state.addressList.length } />
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
        i18n={{
          name: this.props.prefix + 'lookup',
          label: this.t('inputLabel' + this.state.country.iso) || this.t('inputLabel')
        }}
        error={ this.state.error }
        validate={ this.validateSearch }
        value={ this.state.input }
        spacing={ 'compact' }
        autoFocus={ this.state.focusOnMount }
        output={ this.setInput } />
    );
  },

  renderDropdown: function() {
    var classes = cx({
      'AddressLookup__list': true,
      'AddressLookup__list-google': this.isGoogleLookup()
    });
    var hasAddress = !!this.state.address || !!this.state.custom;
    return this.state.showDropdown && !hasAddress && (
      <div className={ classes }>
        <div className="AddressLookup__scroll-container">
          { this.renderListing() }
        </div>

        <div className="AddressLookup__manual-wrapper">
          { this.renderManualButton() }
        </div>
      </div>
    );
  },

  renderResetButton: function(address) {
    return address && this.state.lookupEnabled && (
      <div className="AddressLookup__reset-wrapper">
        <button
          className="AddressLookup__reset hui-Button hui-Button--primary-borderless hui-Button--hasIcon hui-Button--iconLeft"
          tabIndex="0"
          onClick={ this.reset }
          onKeyPress={ this.reset }>
          <span className="hui-IconWrapper hui-Button__icon">
            <i className="hui-Icon fa fa-remove" />
          </span>
          <span className="hui-Button__label AddressLookup__reset-label">
            { this.t('resetButton') }
          </span>
        </button>
      </div>
    );
  },

  renderManualButton: function() {
    return (
      <button
        className="hui-Button hui-Button--secondary AddressLookup__manual"
        tabIndex="0"
        onClick={ this.setManualEntry }
        onKeyPress={ this.setManualEntry }>

        <span className="hui-Button__label AddressLookup__manual-label">
          { this.t('manualEntryButton') }
        </span>
      </button>
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
        validations={ props.validations }
        required={ props.required }
        address={ address }
        region={ state.country }
        spacing={ props.spacing }
        onCountryChange={ this.setCountry }
        onChange={ this.setCustom } />
    );
  },

  renderError: function () {
    return(
        this.state.error &&
          <div className="AddressLookup__error">
            { this.t('emptyError') }
          </div>
    );
  },

  render: function() {
    var address = this.state.custom || this.state.address;
    var classes = cx({
      'AddressLookup': true,
      'AddressLookup--compact': this.props.spacing === 'compact',
      'AddressLookup--tight': this.props.spacing === 'tight',
      'AddressLookup--loose': this.props.spacing === 'loose'
    });
    return (
      <div className={ classes }>
        { this.renderCountry(!address) }
        { this.renderStatus(!this.state.choosingCountry) }
        { this.renderInput(!address && !this.state.choosingCountry) }
        { this.renderDropdown() }
        { this.renderResetButton(address) }
        { this.renderAddress(address) }
        { this.renderError() }
      </div>
    );
  }
});
