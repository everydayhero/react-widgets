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
