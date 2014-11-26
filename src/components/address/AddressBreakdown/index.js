"use strict";

var React     = require('react/addons');
var I18nMixin = require('../../mixins/I18n');
var AddressInput     = require('../AddressInput');

module.exports = React.createClass({
  mixins: [I18nMixin],

  displayName: "AddressBreakdown",

  propTypes: {
    address: React.PropTypes.object,
    region: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      address: null,
      region: 'US',
      defaultI18n: {
        street_address: 'Address',
        street_address_2: 'Address 2',
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
      <div className="Address__Breakdown">
        <AddressInput
          focusOnMount={ true }
          ref={ 'street_address' }
          key={ 'street_address' }
          id={ 'street_address' }
          label={ this.t('street_address', { scope: iso }) }
          value={ address.street_address }
          onChange={ this.props.onChange('street_address') } />
        <AddressInput
          key={ "street_address_2" }
          ref={ 'street_address_2' }
          id={ 'street_address_2' }
          label={ this.t('street_address_2', { scope: iso }) }
          value={ address.street_address_2 }
          onChange={ this.props.onChange('street_address_2') } />
        <AddressInput
          key={ "locality" }
          ref={ 'locality' }
          id={ 'locality' }
          label={ this.t('locality', { scope: iso }) }
          value={ address.locality }
          width={ "wide" }
          onChange={ this.props.onChange('locality') } />
        <AddressInput
          key={ 'region' }
          ref={ 'region' }
          id={ 'region' }
          label={ this.t('region', { scope: iso }) }
          value={ address.region }
          width={ "narrow" }
          onChange={ this.props.onChange('region') } />
        <AddressInput
          key={ "country_name" }
          ref={ 'country_name' }
          id={ 'country_name' }
          label={ this.t('country_name', { scope: iso }) }
          value={ address.country_name }
          width={ "wide" }
          onChange={ this.props.onChange('country_name') } />
        <AddressInput
          key={ "postal_code" }
          ref={ 'postal_code' }
          id={ 'postal_code' }
          label={ this.t('postal_code', { scope: iso })}
          value={ address.postal_code }
          width={ "narrow" }
          onChange={ this.props.onChange('postal_code') } />
        { this.props.children }
      </div>
    );
  }
});
