"use strict";

var React     = require('react/addons');
var I18nMixin = require('../../mixins/I18n');
var Input     = require('../../forms/Input');

module.exports = React.createClass({
  mixins: [I18nMixin],

  displayName: "AddressBreakdown",

  propTypes: {
    address: React.PropTypes.object,
    prefix: React.PropTypes.string,
    region: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      address: null,
      prefix: '',
      region: 'US',
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
    var address = this.props.address;
    var iso = this.props.region;
    return (
      <div className="AddressBreakdown">
        <Input
          required={ this.props.required }
          autoFocus={ true }
          ref={ 'street_address' }
          key={ 'street_address' }
          i18n={{
            name: this.props.prefix + 'street_address',
            label: this.t('street_address', { scope: iso })
          }}
          value={ address.street_address }
          spacing={ 'tight' }
          output={ this.props.onChange('street_address') } />
        <Input
          key={ "extended_address" }
          ref={ 'extended_address' }
          i18n={{
            name: this.props.prefix + 'extended_address',
            label: this.t('extended_address', { scope: iso })
          }}
          value={ address.extended_address }
          spacing={ 'tight' }
          output={ this.props.onChange('extended_address') } />
        <Input
          required={ this.props.required }
          key={ "locality" }
          ref={ 'locality' }
          i18n={{
            name: this.props.prefix + 'locality',
            label: this.t('locality', { scope: iso })
          }}
          value={ address.locality }
          width={ "wide" }
          spacing={ 'tight' }
          output={ this.props.onChange('locality') } />
        <Input
          required={ this.props.required }
          key={ 'region' }
          ref={ 'region' }
          i18n={{
            name: this.props.prefix + 'region',
            label: this.t('region', { scope: iso })
          }}
          value={ address.region }
          width={ "narrow" }
          spacing={ 'tight' }
          output={ this.props.onChange('region') } />
        <Input
          required={ this.props.required }
          key={ "country_name" }
          ref={ 'country_name' }
          i18n={{
            name: this.props.prefix + 'country_name',
            label: this.t('country_name', { scope: iso })
          }}
          value={ address.country_name }
          width={ "wide" }
          spacing={ 'tight' }
          output={ this.props.onChange('country_name') } />
        <Input
          required={ this.props.required }
          key={ "postal_code" }
          ref={ 'postal_code' }
          i18n={{
            name: this.props.prefix + 'postal_code',
            label: this.t('postal_code', { scope: iso })
          }}
          value={ address.postal_code }
          width={ "narrow" }
          spacing={ 'tight' }
          output={ this.props.onChange('postal_code') } />
          <input type="hidden" name={ this.props.prefix + "paf_validated" } value={ address.paf_validated } />
      </div>
    );
  }
});
