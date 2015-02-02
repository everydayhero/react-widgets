"use strict";

var React     = require('react/addons');
var I18nMixin = require('../../mixins/I18n');
var Input     = require('../../forms/Input');

module.exports = React.createClass({
  mixins: [I18nMixin],

  displayName: 'AddressBreakdown',

  propTypes: {
    address: React.PropTypes.object,
    autoFocus: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    prefix: React.PropTypes.string,
    region: React.PropTypes.string,
    required: React.PropTypes.bool,
    validate: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      address: null,
      autoFocus: false,
      prefix: '',
      region: 'US',
      required: false,
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

  render: function() {
    var props = this.props;
    var address = props.address;
    var iso = props.region;
    var onChange = props.onChange;
    var prefix = props.prefix;
    var required = props.required;
    var validate = props.validate;

    return (
      <div className="AddressBreakdown">
        <Input
          autoFocus={ props.autoFocus }
          ref={ 'street_address' }
          key={ 'street_address' }
          i18n={{
            name: prefix + 'street_address',
            label: this.t('street_address', { scope: iso })
          }}
          value={ address.street_address }
          required={ required }
          showIcon={ false }
          spacing={ 'tight' }
          validate={ props.validate }
          output={ onChange('street_address') } />
        <Input
          key={ 'extended_address' }
          ref={ 'extended_address' }
          i18n={{
            name: prefix + 'extended_address',
            label: this.t('extended_address', { scope: iso })
          }}
          value={ address.extended_address }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('extended_address') } />
        <Input
          key={ 'locality' }
          ref={ 'locality' }
          i18n={{
            name: prefix + 'locality',
            label: this.t('locality', { scope: iso })
          }}
          value={ address.locality }
          width={ 'wide' }
          required={ required }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('locality') } />
        <Input
          key={ 'region' }
          ref={ 'region' }
          i18n={{
            name: prefix + 'region',
            label: this.t('region', { scope: iso })
          }}
          value={ address.region }
          width={ 'narrow' }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('region') } />
        <Input
          key={ 'country_name' }
          ref={ 'country_name' }
          i18n={{
            name: prefix + 'country_name',
            label: this.t('country_name', { scope: iso })
          }}
          value={ address.country_name }
          width={ 'wide' }
          required={ required }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('country_name') } />
        <Input
          key={ 'postal_code' }
          ref={ 'postal_code' }
          i18n={{
            name: prefix + 'postal_code',
            label: this.t('postal_code', { scope: iso })
          }}
          value={ address.postal_code }
          width={ 'narrow' }
          required={ required }
          showIcon={ false }
          spacing={ 'tight' }
          output={ onChange('postal_code') } />
        { props.children }
        <input type="hidden" name={ prefix + "paf_validated" } value={ address.paf_validated } />
      </div>
    );
  }
});
