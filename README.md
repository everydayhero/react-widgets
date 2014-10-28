# Widgets

Widgets are small Javascript components that integrate with EverydayHero's API. These include search components and components for showing leaderboard and fundraising totals for campaigns, charities, and networks. Unlike iframe snippets, using widgets allows you to customise the base-level styling to suit your needs.

## Location

You can find the minified assets at the following locations:

- `//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js`
- `//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css`

To view the uncached version of deployed files go to:

- `https://shared-scripts.s3.amazonaws.com/widgets-[0.0.0].js`
- `https://shared-scripts.s3.amazonaws.com/widgets-[0.0.0].css`

You can view the deployed example html file at:

- `https://shared-scripts.s3.amazonaws.com/widgets-[0.0.0].html`

## Available Widgets

### Search

#### CharitySearch

- `action`:      *required* action to perform on charity select, either 'donate', 'fundraise' or 'custom'
- `callback`:    *optional* function called when action set to 'custom'.
- `campaignUid`: *optional* string campaign uid to filter charity results.
- `country`:     *required* string country code of region, either 'au', 'nz', 'uk' or 'us'.
- `i18n`:        *optional* object containing localised text. Default i18n is:
    {
      title: 'Search for a Charity',
      donateAction: 'Give to this Charity',
      fundraiseAction: 'Fundraise for this Charity',
      customAction: 'Select',
      emptylabel: 'No results'
    }

*Note: 'donate' action is currently not supported for country 'us'.*

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <a href="#" id="CharitySearchExample">Support a Charity</a>
    <script>
      edh.widgets.CharitySearchInit({
        elementId: 'CharitySearch',
        country: 'uk',
        action: 'donate'
      });
    </script>
  </body>
</html>
```

### Totals

#### Funds Raised (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `i18n`:        *optional* object containing localised text. Default i18n is:

```
  {
    title: 'Raised to Date',
    symbol: '$'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="FundsRaisedExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('FundsRaisedExample', 'FundsRaised', { campaignUid: 'us-0' });
    </script>
  </body>
</html>
```

#### Total Heroes (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

```
  {
    title: 'Heroes'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="TotalHeroesExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('TotalHeroesExample', 'TotalHeroes', { campaignUid: 'us-0' });
    </script>
  </body>
</html>
```

#### Total Charities (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `i18n`:        *optional* object containing localised text. Default i18n is:

```
  {
    title: 'Charities'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="TotalCharitiesExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('TotalCharitiesExample', 'TotalCharities', { campaignUid: 'us-0' });
    </script>
  </body>
</html>
```

#### Campaign Goal (Campaign)

- `goal`: *required* number. Set a goal in **cents** to be rendered as a dollar amount.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `i18n`:       *optional* object containing localised text. Default i18n is:

```
  {
    title: 'Goal',
    symbol: '$'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="GoalExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('GoalExample', 'Goal', { goal: 500000, i18n: { title: '2015 Goal' } });
    </script>
  </body>
</html>
```

#### Total Distance (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `unit`: *optional* string. Can be set to either `'km'` or `'miles'`. Converts input to whichever is defined. Set to `'miles'` by default.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

```
  {
    title: 'Miles',
    emptyLabel: 'No data to display.'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="TotalDistanceExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('TotalDistanceExample', 'TotalDistance', { campaignUid: 'us-0' });
    </script>
  </body>
</html>
```

#### Total Hours (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

```
  {
    title: 'Hours',
    emptyLabel: 'No data to display.'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="TotalHoursExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('TotalHoursExample', 'TotalHours', { campaignUid: 'us-0' });
    </script>
  </body>
</html>
```


### Fundraisers

#### Recent Fundraisers (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `backgroundColor`: *optional* string. Set to `'#EBEBEB'` by default.
- `textColor`: *optional* string. Set to `'#333333'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

```
  {
    heading: 'Fundraisers',
    emptyLabel: 'No fundraisers to display.'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="RecentFundraisersExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('RecentFundraisersExample', 'RecentFundraisers', { campaignUid: 'us-0' });
    </script>
  </body>
</html>
```

### Leaderboards

#### Team Leaderboard (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `limit`: *optional* string. Set to `'12'` by default. Determines how many results are returned.
- `backgroundColor`: *optional* string. Set to `'#EBEBEB'` by default.
- `textColor`: *optional* string. Set to `'#333333'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

```
  {
    raisedTitle: 'Raised',
    membersTitle: 'Members',
    symbol: '$',
    heading: 'Leaderboard > Top Teams'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="LeaderboardExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('LeaderboardExample', 'Leaderboard', { campaignUid: 'us-0' });
    </script>
  </body>
</html>
```


### Maps

#### Map (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `region`: *required* string. Set the region/country to display using a region code, e.g. `'US'`.
- `limit`: *optional* string. Set to `'100'` by default. Determines how many results are returned. **Note:** Returns geo-location data from returned user generated pages. Some pages may not have this data available.
- `color`: *optional* string. Set to `'#525252'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

```
  {
    heading: 'Program Reach',
    legend: 'Heroes'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="MapExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('MapExample', 'Map', { campaignUid: 'us-0', region: 'US' });
    </script>
  </body>
</html>
```

### Teams

#### Teams (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `page_size`: *optional* string. Set to `'12'` by default. Determines how many results are returned.
- `backgroundColor`: *optional* string. Set to `'#EBEBEB'` by default.
- `textColor`: *optional* string. Set to `'#333333'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

```
  {
    heading: 'Teams',
    emptyLabel: 'No teams to display.'
  }
```

```html
<html>
  <head>
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="TeamsExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('TeamsExample', 'Teams', { campaignUid: 'us-0' });
    </script>
  </body>
</html>
```



## Commands

```sh
$ npm run setup       # install global dependencies, node modules and build production assets
$ npm run build       # build production assets
$ npm run build-dev   # build un minified assets (for debugging)
$ npm run scripts     # build production scripts
$ npm run scripts-dev # build un minified scripts (for debugging)
$ npm run styles      # build production styles
$ npm run styles-dev  # build un minified styles (for debugging)
$ npm run watch       # watch assests and build production
$ npm run watch-dev   # watch assests and build un minified assets (for debugging)
$ npm run publish     # publish build files to S3 bucket (AWS_KEY and AWS_SECRET environment variables must be set)

$ npm test            # run tests
$ npm start           # run local server
$ node_modules/.bin/jest ./__test__/path.js # run an indivdual test file
```

## Publishing updates

* Non-breaking changes and bug fixes are a minor revision – e.g. 0.0.(2)
* Breaking changes, css and template re-factors are major revisions – 0.(2).0
* API updates and large additions/changes are major versions – e.g. (1).0.0

The version number should be updated in the `package.json` before publishing.
