# Widgets

Widgets are small Javascript components that integrate with EverydayHero's API. These include search components and components for showing leaderboard and fundraising totals for campaigns, charities, and networks. Unlike iframe snippets, using widgets allows you to customise the base-level styling to suit your needs.

## Location

You can find the minified assets at the following locations:

- `//edh-widgets.s3.amazonaws.com/widgets.js`
- `//edh-widgets.s3.amazonaws.com/widgets.css`

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

- `campaignUid`: *required* string campaign uid to filter charity results.
- `i18n`:        *optional* object containing localised text. Default i18n is:
    {
      title: 'Funds Raised',
      symbol: '$'
    }

```html
<html>
  <head>
    <script src="//edh-widgets.s3.amazonaws.com/widgets.js"></script>
    <link href="//edh-widgets.s3.amazonaws.com/widgets.css" media="all" rel="Stylesheet" type="text/css" />
  </head>
  <body>
    <a href="#" id="CharitySearchExample">Support a Charity</a>
    <script>
      edh.widgets.renderWidget( 'FundsRaised', 'FundsRaised', {campaignUid: 'au-0'});
    </script>
  </body>
</html>
```

## Commands

```sh
$ npm run setup     # install global dependencies, node modules and build production assets
$ npm run build     # build production assets
$ npm run build-dev # build un minified assets (for debugging)
$ npm test          # run tests
$ npm start         # run local server
```
