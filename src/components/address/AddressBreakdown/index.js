"use strict";

var React           = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var cx              = require('react/lib/cx');
var I18nMixin       = require('../../mixins/I18n');
var Input           = require('../../forms/Input');
var Select          = require('../../forms/Select');
var countryList     = require('../CountrySelect/countries');

module.exports = React.createClass({
  displayName: "AddressBreakdown",

  mixins: [I18nMixin, PureRenderMixin],

  propTypes: {
    address: React.PropTypes.object,
    region: React.PropTypes.object.isRequired,
    autoFocus: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    prefix: React.PropTypes.string,
    required: React.PropTypes.bool,
    validations: React.PropTypes.object,
    validate: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      address: null,
      autoFocus: false,
      prefix: '',
      required: false,
      validations: {},
      validate: function() {},
      defaultI18n: {
        street_address: 'Address',
        extended_address: 'Address 2',
        locality: 'Suburb',
        region: 'State',
        postal_code: 'Postcode',
        country_name: 'Country',
        GB: {
          locality: 'City',
          region: 'County'
        },
        US: {
          locality: 'City',
          postal_code: 'ZIP'
        },
        NZ: {
          region: 'City',
          postal_code: 'Post Code'
        },
        IE: {
          region: 'County',
          postal_code: 'Postal Code'
        },
        CA: {
          locality: 'City',
          region: 'Province',
          postal_code: 'Postal Code'
        }
      }
    };
  },

  handleCountryChange: function(val, obj) {
    this.props.onChange('country_name')(val);
    this.props.validate(val);
    this.props.onCountryChange(obj);
  },

  fieldErrorMessage: function (field, label) {
    var validations = this.props.validations[field];
    if (validations && validations.required) {
      return label + ' cannot be blank';
    }
  },

  render: function() {
    var t = this.t;
    var props = this.props;
    var address = props.address;
    var iso = props.region.iso;
    var onChange = props.onChange;
    var prefix = props.prefix;
    var required = props.required;
    var validations = props.validations;
    var validate = props.validate;
    var classes = cx({
      'AddressBreakdown': true,
      'AddressBreakdown--compact': props.spacing === 'compact',
      'AddressBreakdown--tight': props.spacing === 'tight',
      'AddressBreakdown--loose': props.spacing === 'loose'
    });
    return (
      <div className={ classes }>
        <Input
          autoFocus={ props.autoFocus }
          ref={ 'street_address' }
          key={ 'street_address' }
          i18n={{
            name: prefix + 'street_address',
            label: t('street_address', { scope: iso }),
            error: this.fieldErrorMessage('street_address', t('street_address', { scope: iso }))
          }}
          value={ address.street_address }
          required={ (!!validations.street_address && validations.street_address.required) || required }
          validate={ validate }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('street_address') } />
        <Input
          key={ 'extended_address' }
          ref={ 'extended_address' }
          i18n={{
            name: prefix + 'extended_address',
            label: t('extended_address', { scope: iso }),
            error: this.fieldErrorMessage('extended_address', t('extended_address', { scope: iso }))
          }}
          value={ address.extended_address }
          required={ !!validations.extended_address && validations.extended_address.required }
          validate={ validate }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('extended_address') } />
        <Input
          key={ 'locality' }
          ref={ 'locality' }
          i18n={{
            name: prefix + 'locality',
            label: t('locality', { scope: iso }),
            error: this.fieldErrorMessage('locality', t('locality', { scope: iso }))
          }}
          value={ address.locality }
          required={ (!!validations.locality && validations.locality.required) || required }
          validate={ validate }
          width={ 'wide' }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('locality') } />
        <Input
          key={ 'region' }
          ref={ 'region' }
          i18n={{
            name: prefix + 'region',
            label: t('region', { scope: iso }),
            error: this.fieldErrorMessage('region', t('region', { scope: iso }))
          }}
          required={ (!!validations.region && validations.region.required) || required }
          validate={ validate }
          value={ address.region }
          width={ 'narrow' }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('region') } />
        <Select
          key={ "country_name" }
          ref={ 'country_name' }
          i18n={{
            name: prefix + 'country_name',
            label: t('country_name', { scope: iso }),
            error: this.fieldErrorMessage('country_name', t('country_name', { scope: iso }))
          }}
          value={ address.country_name }
          width={ 'wide' }
          required={ (!!validations.country_name && validations.country_name.required) || required }
          validate={ validate }
          spacing={ 'tight' }
          options={ countryList }
          output={ this.handleCountryChange } />
        <Input
          key={ 'postal_code' }
          ref={ 'postal_code' }
          i18n={{
            name: prefix + 'postal_code',
            label: t('postal_code', { scope: iso }),
            error: this.fieldErrorMessage('postal_code', t('postal_code', { scope: iso }))
          }}
          validate={ validate }
          value={ address.postal_code }
          width={ 'narrow' }
          required={ (!!validations.postal_code && validations.postal_code.required) || required }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('postal_code') } />
        { props.children }
        <input type="hidden" name={ props.prefix + "country_iso" } value={ iso } />
        <input type="hidden" name={ props.prefix + "paf_validated" } value={ address.paf_validated } />
      </div>
    );
  }
});
