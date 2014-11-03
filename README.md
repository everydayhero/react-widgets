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

## Modal Widgets

Modal widgets cover the entire page while they are visible. There are two methods of triggering modal widgets, `initModal` will show the modal widget when the target element is clicked and `showModal` will show the modal widget immediately:

```javascript
edh.widgets.initModal(element, name, options)
```
- `element` is an html dom element or element ID of a link or button,
- `name` is the name of desired modal widget, and
- `options` depends on the type of widget (see below).

```javascript
edh.widgets.showModal(name, options)
```
- `name` is the name of desired modal widget, and
- `options` depends on the type of widget (see below).

### Search

#### CharitySearch

The charity search modal widget allows you to search for a charity by name to donate, fundraise, or perform a custom action. By default, it searches for all charities in a given country, but can also be restricted to charities part of a given campaign.

##### Options

- `action`: *required* action to perform on charity select, either 'donate', 'fundraise' or 'custom'. *Note: 'donate' action is currently not supported for country 'us'.*
- `onSelect`: *optional* function called on selecting a result when action set to 'custom'.
- `campaignUid`: *optional* string campaign uid to filter charity results.
- `campaignSlug`: *optional* string campaign slug for given campaign uid.
- `country`: *optional* string country code of region, either 'au', 'nz', 'uk' or 'us'.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    title: 'Search for a Charity',
    donateAction: 'Give to this Charity',
    fundraiseAction: 'Fundraise for this Charity',
    selectAction: 'Select',
    emptyLabel: "We couldn't find any matching Charities."
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
  </head>
  <body>
    <a id="CharitySearchExample">Support a Charity</a>
    <script>
      edh.widgets.initModal('CharitySearchExample', 'CharitySearch', { country: 'uk', action: 'donate' });
    </script>
  </body>
</html>
```

#### PageSearch

The supporter page search modal widget allows you to search for a supporter page by name to visit or perform a custom action. By default, it searches for all pages in a given country, but can also be restricted to pages part of a given campaign or charity.

##### Options

- `onSelect`: *optional* function called on selecting a result. Default redirects to supporter page.
- `campaignUid`: *optional* string campaign uid to filter page results.
- `charityUid`: *optional* string charity uid to filter page results.
- `country`: *optional* string country code of region, either 'au', 'nz', 'uk' or 'us'.
- `pageType`: *optional* string type of page either 'user', 'team' or 'all' (default).
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    title: 'Search for a Supporter Pages',
    selectAction: 'Support',
    emptyLabel: 'No results'
    emptyLabel: "We couldn't find any matching Supporter Pages."
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
  </head>
  <body>
  </head>
  <body>
    <a id="PageSearchExample">Support a friend</a>
    <script>
      edh.widgets.initModal('PageSearchExample', 'PageSearch', { country: 'uk' });
    </script>
  </body>
</html>
```

## Inline Widgets

Inline widgets are rendered into a target html dom element by using `renderWidget`:

```javascript
edh.widgets.renderWidget(element, name, options)
```
- `element` is an html dom element or element ID of a div element,
- `name` is the name of desired inline widget, and
- `options` depends on the type of widget (see below).

### Totals

#### Funds Raised (Campaign)

Displays the total funds raised for a single specified campaign as a dollar amount.

##### Options

- `campaignUid`: *required* string. Campaign uid.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    title: 'Raised to Date',
    symbol: '$'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
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

Displays the total number of fundraisers (that have a page) for a single specified campaign.

##### Options

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    title: 'Heroes'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
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

Displays the total number of charities associated with a single specified campaign.

##### Options

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    title: 'Charities'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
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

Set a goal in cents to display as a campaign goal.

##### Options

- `goal`: *required* number. Set a goal in **cents** to be rendered as a dollar amount.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    title: 'Goal',
    symbol: '$'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
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

Displays the total recorded distance that fundraisers have run for a single specified campaign in either **kilometers** or **miles**.

##### Options

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `unit`: *optional* string. Can be set to either `'km'` or `'miles'`. Converts input to whichever is defined. Set to `'miles'` by default.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    title: 'Miles',
    emptyLabel: 'No data to display.'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
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

Displays the total recorded time that fundraisers have run for a single specified campaign in **hours**.

##### Options

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `renderIcon`: *optional* boolean. Set to `true` by default.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    title: 'Hours',
    emptyLabel: 'No data to display.'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
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

Displays a set of fundraiser profile images (that have a page) for a single specified campaign.

##### Options

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `backgroundColor`: *optional* string. Set to `'#EBEBEB'` by default.
- `textColor`: *optional* string. Set to `'#333333'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    heading: 'Fundraisers',
    emptyLabel: 'No fundraisers to display.'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
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

#### Leaderboard (Campaign)

Displays a leaderboard sorted by funds raised (highest first) for a single specified campaign. Can be set to show leaderboards for teams or individuals.

##### Options

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `type`: *optional* string. Set a type of either `'team'` or `'individual'`. Set to `'individual'` by default.
- `limit`: *optional* string. Set to `'12'` by default. Determines how many results are returned.
- `backgroundColor`: *optional* string. Set to `'#EBEBEB'` by default.
- `textColor`: *optional* string. Set to `'#333333'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    raisedTitle: 'Raised',
    membersTitle: 'Members',
    rankTitle: 'Ranked',
    symbol: '$',
    heading: 'Leaderboard > Top Individuals'
  }
  `
  ``

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
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

Displays an SVG map. Each point represents a fundraiser (that has created a page).

##### Options

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `region`: *required* string. Set the region/country to display using a region code, e.g. `'US'`.
- `limit`: *optional* string. Set to `'100'` by default. Determines how many results are returned. **Note:** Returns geo-location data from returned user generated pages. Some pages may not have this data available.
- `color`: *optional* string. Set to `'#525252'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    heading: 'Program Reach',
    legend: 'Heroes'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
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

Displays a set of teams for a single specified campaign.

##### Options

- `campaignUid`: *required* string campaign uid to filter results by campaign.
- `page_size`: *optional* string. Set to `'12'` by default. Determines how many results are returned.
- `backgroundColor`: *optional* string. Set to `'#EBEBEB'` by default.
- `textColor`: *optional* string. Set to `'#333333'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    heading: 'Teams',
    emptyLabel: 'No teams to display.'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
  </head>
  <body>
    <div id="TeamsExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('TeamsExample', 'Teams', { campaignUid: 'us-0' });
    </script>
  </body>
</html>
```

### Calls to Action

#### Call To Action Box

Displays a call to action box with links to the *getting started* and *sign in* page for the specified campaign. A registration URL must also be provided.

- `campaignUid`: *required* string. Campaign uid to automatically insert 'sign in' and 'get started links'.
- `registrationUrl`: *required* string. Pass a URL to your registration page.
- `backgroundColor`: *optional* string. Set to `'#525252'` by default.
- `textColor`: *optional* string. Set to `'#FFFFFF'` by default.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
    {
      title: 'Get Involved',
      registerLabel: 'Register Now',
      getStartedLabel: 'Start Fundraising',
      signInLabel: 'Sign in'
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
    <div id="CallToActionBoxExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('CallToActionBoxExample', 'CallToActionBox', { campaignUid: 'us-0', registrationUrl: 'https://your-registration-url.com/' });
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
