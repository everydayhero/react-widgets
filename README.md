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
- `onSelect`: *optional* function called on selecting a result when `action` set to 'custom'.
- `campaignUid`: *optional* string campaign uid to filter charity results.
- `campaignSlug`: *optional* string campaign slug for given campaign uid.
- `country`: *optional* string country code of region, either 'au', 'nz', 'uk' or 'us'.
- `promotedCharityUids`: *optional* array of charity uids for charities to show by default for empty query.
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
    title: 'Search for a Supporter Page',
    selectAction: 'Support',
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

Displays the total funds raised for specified campaigns as a dollar amount. Either a single or multiple campaign uids can be provided to scope this widget.

##### Options

- `campaignUids`: *required* array of campaign uids.
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
      edh.widgets.renderWidget('FundsRaisedExample', 'FundsRaised', { campaignUids: ['us-0'] });
    </script>
  </body>
</html>
```

#### Total Heroes (Campaign)

Displays the total number of fundraisers (that have an everydayhero page) for specified campaigns. Either a single or multiple campaign uids can be provided to scope this widget.

##### Options

- `campaignUids`: *required* array of campaign uids.
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
      edh.widgets.renderWidget('TotalHeroesExample', 'TotalHeroes', { campaignUids: ['us-0'] });
    </script>
  </body>
</html>
```

#### Total Charities (Campaign)

Displays the total number of charities associated with specified campaigns. Either a single or multiple campaign uids can be provided to scope this widget.

##### Options

- `campaignUids`: *required* array of campaign uids.
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
      edh.widgets.renderWidget('TotalCharitiesExample', 'TotalCharities', { campaignUids: ['us-0'] });
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

Displays the total recorded distance that fundraisers have run for specified campaigns. The result can be displayed as either **kilometers** or **miles**. Either a single or multiple campaign uids can be provided to scope this widget.

##### Options

- `campaignUids`: *required* array of campaign uids.
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
      edh.widgets.renderWidget('TotalDistanceExample', 'TotalDistance', { campaignUids: ['us-0'] });
    </script>
  </body>
</html>
```

#### Total Hours (Campaign)

Displays the total recorded time that fundraisers have run for specified campaigns in **hours**. Either a single or multiple campaign uids can be provided to scope this widget.

##### Options

- `campaignUids`: *required* array of campaign uids.
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
      edh.widgets.renderWidget('TotalHoursExample', 'TotalHours', { campaignUids: ['us-0'] });
    </script>
  </body>
</html>
```

### Charities

#### Promoted Charities

Displays promoted charities that are passed in as a list of tabs and charity ids.

##### Options

- `tabs`: *required* array, contains objects. Each object requires a 'category' and a 'charityUids' array.
- `action`: *required* string. Defines action to perform on charity select. Must be specified as either 'donate', 'fundraise' or 'custom'. *Note: 'donate' action is currently not supported for country 'us'.*
- `onSelect`: *optional* function called on selecting a result when `action` set to 'custom'.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    heading: 'Promoted Charities',
    subheading: 'Choose a tab below to view promoted charities within each category.'
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
    <div id="CharitiesExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('CharitiesExample', 'PromoCharities', {
        action: 'fundraise',
        tabs: [
          {
            category: 'Helping People',
            charityUids: [
              'au-3395',
              'au-24',
              'au-494'
            ]
          },
          {
            category: 'Helping Animals',
            charityUids: [
              'au-522',
              'au-1661',
              'au-914'
            ]
          },
          {
            category: 'Helping Environment',
            charityUids: [
              'au-1546',
              'au-389',
              'au-937'
            ]
          }
        ]
      });
    </script>
  </body>
</html>
```

##### Example with a custom `onSelect` function.

```js
edh.widgets.renderWidget('CharitiesExample', 'PromoCharities', {
  action: 'custom',
  onSelect: function(charity) {
    console.log(charity);
  },
  tabs: [
    {
      category: 'Helping People',
      charityUids: [
        'au-3395',
        'au-24',
        'au-494'
      ]
    },
    {
      category: 'Helping Animals',
      charityUids: [
        'au-522',
        'au-1661',
        'au-914'
      ]
    },
    {
      category: 'Helping Environment',
      charityUids: [
        'au-1546',
        'au-389',
        'au-937'
      ]
    }
  ]
});
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
- `limit`: *optional* number. Set to `24` by default. Determines how many results are returned in total.
- `pageSize`: *optional* number. Set to `12` by default. Determines how many results to show per page.
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


### Forms

#### Address Lookup

Displays a form input field and country selector, which allows users to lookup their address by fuzzy matching through the Google Places API, or via United Kingdom postcode through the PostCode Anywhere API. Once they find their address, it is broken down into parts for editing and database accuracy.

##### Options

- `required`: *optional* sets the address field as being required. Defaults to 'false'.
- `prefix`: *optional* string to add a unique identifier to the input elements, for use when multiple AddressLookup widgets appear on the same page / post to the same form. Defaults to ''.
- `country`: *optional* two-digit capitalized country ISO code (AU, GB, US, NZ, IE, etc). Default is 'US'.
- `address`: *optional* object containing a pre-existing address to display. If provided, lookup functionality is not available. Use when user address already provided or when page reloads on form validation. Default is 'null'. Takes the form:
  ```js
  {
    street_address: '',
    extended_address: '',
    locality: '',
    postal_code: '',
    region: '',
    country_name: ''
  }
  ```
- `paf_valid`: *optional* boolean. Supply only when address has prevously been validated. Default is 'false'.
- `output`: *optional* function to get user's final selected address.
- `i18n`: *optional* object containing localised text. Default i18n is:

  ```js
  {
    inputLabel: 'Address Lookup',
    inputLabelGB: 'Postcode Lookup',
    manualEntryButton: 'Enter Manually',
    error: {
      empty: "Sorry, we couldn't find that address",
      '500': "Something went wrong, please try again"
    }
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
    <div id="AddressLookupExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('AddressLookupExample', 'AddressLookup', { country: 'GB' });
    </script>
  </body>
</html>
```


#### Amount

Displays a radio group and input field, which allows users to choose from four predefined values, or input a custom value. Will default to the second predefined value on load, and when custom value is 0.

##### Options

- `name`: *optional* string to identify the radio group and input in a form. Default is 'Amount'.
- `amounts`: *optional* array of exactly four predefined numbers (not strings). Default is [500, 700, 1500, 3000].
- `output`: *optional* function to get selected amount.
- `currency`: *optional* string of currency symbol. Default is '$'.

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
  </head>
  <body>
    <div id="AmountExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('AmountExample', 'Amount', { name: 'target_value' });
    </script>
  </body>
</html>
```


#### Input

Displays an input field which can accept input masking, asynchronous validation, modal activation, layout modification, default values, and various input relevant properties.

##### Options

- `readOnly`: *optional* boolean to prevent users from altering the input by typing. Best used with a modal attached. Default is 'false'.
- `disabled`: *optional* boolean to prevent users from changing the input, and displays as disabled. Default is 'false'.
- `autoFocus`: *optional* boolean to determine if the input should gain focus as soon as it is loaded. Should only be true for one input on the page. Default is 'false'.
- `required`: *optional* boolean to trigger optional validation methods and ensure the input isn't left blank. Default is 'false'.
- `mask`: *optional* function to modify user input as it is entered. Default is 'null'. Is passed the current input string. Example:
  ```javascript
  function mask(input) {
   var maskedString = input; // masking logic here
   return maskedString;
  }
  ```
- `validate`: *optional* function to validate the user input when the field loses focus. Is passed the current input string and a callback to set valid state. Default is 'null'. Example:
  ```javascript
  function validate(input, callback) {
   var boolean = !!input; // validation logic here
   return callback(boolean);
  }
  ```
- `output`: *optional* function to catch input changes as they are made. Default is 'null'. Is passed the current input string. Example:
  ```javascript
  function output(input) {
    // act on changes within the input here
  }
  ```
- `modal`: *optional* function executed when field gains focus. Best used to open a modal or reveal additional UI for the field. Default is 'null'. Is passed an object containing the input dom element, the current input string, and a callback to alter the value. Example:
  ```javascript
  function modal(object) {
    // you can animate the modal opening from object.element
    // you can use object.value for modal's initial value
    // you can set the new value of the input from object.callback(value)
  }
  ```
- `type`: *optional* string defining the html input type. Default is 'text'.
- `icon`: *optional* string to specify an icon to appear to the right. Valid strings are Font Awesome icon names (without the 'fa-' prefix). Default is 'null'.
- `width`: *optional* string to specify the width of the field. Valid options are: "full", "wide", "half", and "narrow". Default is "full".
- `spacing`: *optional* string to specify the vertical spacing beneath each input. Valid options are: "", "loose", and "tight". Default is "".
- `value`: *optional* string for input's initial value. Default is "".
- `i18n`: *required* object containing localised text. Valid i18n is:
  ```javascript
  {
    name: 'input', //becomes the input's ID
    label: 'Input', //visible label for the input
    hint: 'What is this input for?', //visible hint when input is focused
    error: "Please don't leave this blank" //message to display if not valid
  }
  ```
Default i18n is:
  ```javascript
  {
    name: 'input',
    label: 'Input'
  }
  ```

##### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css" rel="stylesheet">
    <script src="//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js"></script>
  </head>
  <body>
    <div id="InputExample">Loading...</div>
    <script>
      edh.widgets.renderWidget('InputExample', 'Input', { i18n: { name: 'input_example', label: 'Example Input', hint: 'Enter some text', error: 'Please enter some text' } });
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

OSX users may need to increase the maximum number of open files (default is 256) using `ulimit -Sn 1000` to use build, watch, and scripts commands.

```sh
$ npm run setup       # install global dependencies, node modules and build production assets
$ npm run build       # build production assets
$ npm run build-dev   # build un minified assets (for debugging)
$ npm run watch       # watch assests and build production
$ npm run watch-dev   # watch assests and build un minified assets (for debugging)
$ npm run jshint      # check javascript code quality
$ npm run scripts     # build production scripts
$ npm run scripts-dev # build un-minified scripts (for debugging)
$ npm run styles      # build production styles
$ npm run styles-dev  # build un-minified styles (for debugging)
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
