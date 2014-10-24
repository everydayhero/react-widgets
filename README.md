# Widgets

Widgets are small Javascript components that integrate with EverydayHero's API. These include search components and components for showing leaderboard and fundraising totals for campaigns, charities, and networks. Unlike iframe snippets, using widgets allows you to customise the base-level styling to suit your needs.

## Location

You can find the minified assets at the following locations:

- `//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js`
- `//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css`

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
    <script src="//edh-widgets.s3.amazonaws.com/widgets.js"></script>
    <link href="//edh-widgets.s3.amazonaws.com/widgets.css" media="all" rel="Stylesheet" type="text/css" />
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
- `i18n`:        *optional* object containing localised text. Default i18n is:

```
  {
    title: 'Funds Raised',
    symbol: '$'
  }
```

```html
<html>
  <head>
    <script src="//edh-widgets.s3.amazonaws.com/widgets.js"></script>
    <link href="//edh-widgets.s3.amazonaws.com/widgets.css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="FundsRaisedExample">Loading...</div>
    <script>
      edh.widgets.renderWidget( 'FundsRaisedExample', 'FundsRaised', {campaignUid: 'au-0'});
    </script>
  </body>
</html>
```

#### Total Heroes (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `i18n`:        *optional* object containing localised text. Default i18n is:

```
  {
    title: 'Heroes'
  }
```

```html
<html>
  <head>
    <script src="//edh-widgets.s3.amazonaws.com/widgets.js"></script>
    <link href="//edh-widgets.s3.amazonaws.com/widgets.css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="TotalHeroesExample">Loading...</div>
    <script>
      edh.widgets.renderWidget( 'TotalHeroesExample', 'TotalHeroes', {campaignUid: 'au-0'});
    </script>
  </body>
</html>
```

#### Total Charities (Campaign)

- `campaignUid`: *required* string campaign uid to filter results by campaign.
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
    <script src="//edh-widgets.s3.amazonaws.com/widgets.js"></script>
    <link href="//edh-widgets.s3.amazonaws.com/widgets.css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="TotalCharitiesExample">Loading...</div>
    <script>
      edh.widgets.renderWidget( 'TotalCharitiesExample', 'TotalCharities', {campaignUid: 'au-0'});
    </script>
  </body>
</html>
```

#### Campaign Goal (Campaign)

- `goal`: *required* string. Set a goal in cents to be rendered as a dollar amount.
- `renderIcon`: *optional* boolean. Set to `true` by default.
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
    <script src="//edh-widgets.s3.amazonaws.com/widgets.js"></script>
    <link href="//edh-widgets.s3.amazonaws.com/widgets.css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <div id="TotalCharitiesExample">Loading...</div>
    <script>
      edh.widgets.renderWidget( 'GoalExample', 'Goal', {goal: '500000', i18n: {title: '2015 Goal'}});
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
