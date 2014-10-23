/** @jsx React.DOM */
"use strict";

var _            = require('lodash');
var React        = require('react');
var I18nMixin    = require('../../mixins/I18n');
var staticPages  = require('../../../api/staticPages');
var Icon         = require('../../helpers/Icon');
var numeral      = require('numeral');

module.exports = React.createClass({
  mixins: [I18nMixin],
  displayName: "MapUS",
  propTypes: {
    campaignUid: React.PropTypes.string,
    page_type: React.PropTypes.string,
    limit: React.PropTypes.string,
    page: React.PropTypes.string,
    i18n: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      campaignUid: '',
      page_type: 'individual',
      limit: '100',
      page: '1',
      color: '#555',
      defaultI18n: {
        heading: 'Program Reach',
        legend: 'Heroes'
      }
    }
  },

  getInitialState: function() {
    return {
      isLoading: false,
      pointData: []
    };
  },

  componentWillMount: function() {
    this.setState({
      isLoading: true
    });

    var props = this.props;

    staticPages.find(props.campaignUid, props.page_type, props.limit, props.page, this.processData);
  },

  processData: function(page_data) {
    var locations = _.map(page_data.pages, function(value, i) {
      var page = page_data.pages[i];

      return {
        location: page.coordinate
      }
    });

    this.onSuccess(locations);
  },

  onSuccess: function(locations) {
    this.setState({
      isLoading: false,
      pointData: locations
    });

    window.drawMarkersMap = (function() {

      var data = new google.visualization.DataTable();
          data.addColumn('number', 'Lat');
          data.addColumn('number', 'Long');
          data.addColumn('number', 'Value');

      if (!this.state.isLoading) {
        _.each(this.state.pointData, function(d,i) {
          if (d.location) {
            data.addRows([
              [d.location.lat,d.location.lon,0]
            ]);
          }
        });
      }

      var options = {
        region: 'US',
        displayMode: 'markers',
        resolution: 'provinces',
        legend: 'none',
        enableRegionInteractivity: 'false',
        sizeAxis: {minSize:5,  maxSize: 5},
        colorAxis: {minValue: 1, maxValue:1,  colors: [this.props.color]},
        tooltip: {trigger: 'none'}
      };

      var chart = new google.visualization.GeoChart(
        document.getElementById('map')
      );
      chart.draw(data, options);

    }).bind(this);

    var s = document.createElement('script');
    s.src = 'https://www.google.com/jsapi?autoload={"modules":[{"name":"visualization","version":"1","packages":["geochart"],"callback":"drawMarkersMap"}]}';
    document.head.appendChild( s );

  },

  renderMap: function() {
    if (this.state.isLoading) {
      return <Icon className="MapUS__loading" icon="refresh" spin={ true }/>;
    } else {
      return <div className="MapUS__map" id="map"></div>
    }
  },

  render: function() {
    var heading = this.t('heading');
    var legend = this.t('legend');
    var keyStyle = {
      backgroundColor: this.props.color
    }

    return (
      <div className={ "MapUS" }>
        <h3 className="MapUS__heading">{ heading }</h3>
        <div className="MapUS__legend">
          <p><span className="MapUS__legend-key" style={ keyStyle }></span>  { legend }</p>
        </div>
        <div className="MapUS__content">
          { this.renderMap() }
        </div>
      </div>
    );
  }
});
