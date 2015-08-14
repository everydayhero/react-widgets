---
title: React Widgets
language_tabs:
toc_footers:
includes:
  - contact
search: false
---

# Widgets

<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
<link href="//d1ig6folwd6a9s.cloudfront.net/{{ latest-version }}.css" rel="stylesheet">
<script src="//d1ig6folwd6a9s.cloudfront.net/{{ latest-version }}.js"></script>

Widgets is an [open source project](https://github.com/everydayhero/react-widgets) consisting of pre-built JavaScript components that integrate with everydayhero's API. These include search components, components for showing leaderboards, fundraising totals, fitness data and more.

Each component is responsive and can be customised via simple configuration options and CSS.

<div class="note code-example-note">
  <div class="note-icon">
    <i class="fa fa-code"></i>
  </div>
  <div class="note-title">
    Example Code
  </div>
  <div class="note-text">
    Sample code ready to copy/paste for each component will display in this column.
  </div>
</div>

## Get Started

> Step 1: Include the dependencies on your page once, (preferably) right before the closing `</head>` tag.

```html
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
<link href="//d1ig6folwd6a9s.cloudfront.net/{{ latest-version }}.css" rel="stylesheet">
<script src="//d1ig6folwd6a9s.cloudfront.net/{{ latest-version }}.js"></script>
```

> Step 2: Place the code for a widget where you would like it to display on your page.

```html
<div id="FundsRaisedExample"></div>
<script>
  edh.widgets.renderWidget('FundsRaisedExample', 'FundsRaised', {
    campaignUids: ['us-22','us-19']
  });
</script>
```

Reference the following dependencies once, right before the close `</head>` tag, on each page you plan to use widgets:

- `//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css`
- `//d1ig6folwd6a9s.cloudfront.net/{{ latest-version }}.css`
- `//d1ig6folwd6a9s.cloudfront.net/{{ latest-version }}.js`

With the dependencies added to your document see below for individual snippets that can be used to embed each widget. Each widget includes its own set of options allowing you to tailor it to your needs.

Got more questions? See the [FAQ section](#faq).


## Widget Types

### Inline Widgets

Inline widgets are rendered into a target html dom element by using `renderWidget`:

> Display a widget inline with the rest of your page content.

```js
edh.widgets.renderWidget(element, name, options)
```

- `element` is an html dom element or element ID of a div element,
- `name` is the name of desired inline widget, and
- `options` depends on the type of widget (see below).

### Modal Widgets

> Open widget inside a modal when `element` is clicked/tapped.

```js
edh.widgets.initModal(element, name, options)
```

Modal widgets cover the entire page while they are visible. There are two methods of triggering modal widgets, `initModal` will show the modal widget when the target element is clicked and `showModal` will show the modal widget immediately:

**initModal**

- `element` is an html dom element or element ID of a link or button,
- `name` is the name of desired modal widget, and
- `options` depends on the type of widget (see below).

> Open widget inside a modal on page load.

```js
edh.widgets.showModal(name, options)
```

**showModal**

- `name` is the name of desired modal widget, and
- `options` depends on the type of widget (see below).

# Search

## AggregateSearch

The aggregate search modal widget allows you to search for campaigns, charities and supporters.

### Demo

```html
<button id="AggregateSearchExample">
  Search for a supporter, charity or event
</button>
<script>
  edh.widgets.initModal('AggregateSearchExample', 'AggregateSearch', {
    country: 'uk'
  });
</script>
```

<button id="AggregateSearchExample">Search for a supporter, charity or event</button>

<script>
  edh.widgets.initModal('AggregateSearchExample', 'AggregateSearch', {
    country: 'uk'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  title: 'Search',
  inputLabel: 'Search for a supporter, charity or event',
  campaignAction: 'Get Started',
  charityAction: 'Visit Charity',
  supporterAction: 'Support',
  emptyLabel: "We couldn't find any matching supporters, charities or events.",
  noMore: 'No more results',
  loadMore: 'Show more',
  loadingMore: 'Searching'
}
```

`searchTerm` (string)<br>
Initial search term value.

`country` (string) <span class="required">Required</span> <br>
Country code of region, either 'au', 'ie', 'nz', 'uk' or 'us'.

`i18n` (object)<br>
Object containing localised text.

## CharitySearch

> The button element acts as a trigger to open the CharitySearch widget.

```html
<button id="CharitySearchExample">Find a Charity</button>
<script>
  edh.widgets.initModal('CharitySearchExample', 'CharitySearch', {
    country: 'uk'
  });
</script>
```

The charity search modal widget allows you to search for a charity by name to donate, fundraise, or perform a custom action. By default, it searches for all charities in a given country, but can also be restricted to charities part of a given campaign.

### Demo

<button id="CharitySearchExample">Find a Charity</button>

<script>
edh.widgets.initModal('CharitySearchExample', 'CharitySearch', { country: 'uk' });
</script>


### Options

> Default `i18n` translation object:

```js
{
  title: 'Search for a Charity',
  visitAction: 'Visit Charity',
  donateAction: 'Give to this Charity',
  fundraiseAction: 'Fundraise for this Charity',
  selectAction: 'Select',
  emptyLabel: "We couldn't find any matching Charities."
}
```

`action` (string)<br>
Action to perform on charity select, either 'visit' (default), 'donate', 'fundraise', or 'custom'. *Note: 'visit' and 'donate' actions are currently not supported for country 'us'.*

`onSelect` (function)<br>
Function called on selecting a result. `action` must be set to `'custom'`.<br>

`campaignUid` (string)<br>
Campaign uid to filter charity results.

`campaignSlug` (string)<br>
Campaign slug for a given campaign.

`country` (string)<br>
Country code of region, either 'au', 'ie', 'nz', 'uk' or 'us'.

`promotedCharityUids` (array)<br>
Charity uids for charities to show by default for empty query.

`i18n` (object)<br>
Object containing localised text.


## PageSearch

```html
<a id="PageSearchExample">Support a friend</a>
<script>
  edh.widgets.initModal('PageSearchExample', 'PageSearch', {
    country: 'uk'
  });
</script>
```

The supporter page search modal widget allows you to search for a supporter page by name to visit or perform a custom action. By default, it searches for all pages in a given country, but can also be restricted to pages associated with a given campaign or charity.

### Demo

<button id="PageSearchExample">Support a friend</button>

<script>
  edh.widgets.initModal('PageSearchExample', 'PageSearch', {
    country: 'uk'
  });
</script>


### Options

> Default `i18n` translation object:

```js
{
  title: 'Search for a Supporter Page',
  selectAction: 'Support',
  emptyLabel: "We couldn't find any matching Supporter Pages."
}
```

`onSelect` (function)<br>
Called on selecting a result. Default redirects to supporter page.

`campaignUid` (string)<br>
Campaign uid to filter page results.

`charityUid` (string)<br>
Charity uid to filter page results.

`country` (string)<br>
Country code of region, either 'au', 'ie', 'nz', 'uk' or 'us'.

`pageType` (string)<br>
Type of page either 'user', 'team' or 'all' (default).

`i18n` (object)<br>
Containing localised text.


# Totals

## Funds Raised

```html
<div id="FundsRaisedExample"></div>
<script>
  edh.widgets.renderWidget('FundsRaisedExample', 'FundsRaised', {
    campaignUids: ['us-22','us-19']
  });
</script>
```

Displays the total funds raised for specified campaigns, pages or charities as a dollar amount. Either a single or multiple campaign/page/charity ids can be provided as parameters to scope this widget.

### Demo

<p id="FundsRaisedExample"></p>

<script>
  edh.widgets.renderWidget('FundsRaisedExample', 'FundsRaised', {
    campaignUids: ['us-22','us-19']
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  title: 'Raised to Date',
  symbol: '$'
}
```

`campaignUid` (string)<br>
Campaign uid to filter results by campaign.

`campaignUids` (array)<br>
Campaign uids to filter results by multiple campaigns.

`pageId` (string) <br>
Page id to filter results by page.

`pageId` (array) <br>
Page ids to filter results by multiple pages.

`charityUid` (string)<br>
Charity uid to filter results by charity.

`charityUids` (array)<br>
Charity uids to filter results by multiple charities.

`startAt` (string)<br>
YYYY-MM-DD date string to get results on or after this date.

`endAt` (string)<br>
YYYY-MM-DD date string to get results on or before this date.

`renderIcon` (string or boolean)<br>
Set to `true` by default. Pass in a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon name (without the _fa_ prefix) to override the default. Set to `false` to render no icon.

`offset` (number)<br>
Set to `0` by default.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string)<br>
Accepts a CSS color value. Not set by default.

`format` (string)<br>
Set to `'0.00 a'` by default. [More format strings](http://numeraljs.com/).

`i18n` (object)<br>
Contains localised text.


## Total Supporters

```html
<div id="TotalSupportersExample"></div>
<script>
  edh.widgets.renderWidget('TotalSupportersExample', 'TotalSupporters', {
    campaignUids: ['us-0','us-1']
  });
</script>
```

Displays the total number of fundraisers (that have an everydayhero page) for specified campaigns. Either a single or multiple campaign uids can be provided to scope this widget.

### Demo

<p id="TotalSupportersExample"></p>

<script>
  edh.widgets.renderWidget('TotalSupportersExample', 'TotalSupporters', {
    campaignUids: ['us-0','us-1']
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  title: 'Supporters'
}
```

`campaignUid` (string)<br>
Campaign uid to filter results by campaign.

`campaignUids` (array)<br>
Campaign uids to filter results by multiple campaigns.

`charityUid` (string)<br>
Charity uid to filter results by charity.

`charityUids` (array)<br>
Charity uids to filter results by multiple charities.

`startAt` (string)<br>
YYYY-MM-DD date string to get results on or after this date.

`endAt` (string)<br>
YYYY-MM-DD date string to get results on or before this date.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string)<br>
Accepts a CSS color value. Not set by default.

`renderIcon` (string or boolean)<br>
Set to `true` by default. Pass in a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon name (without the _fa_ prefix) to override the default. Set to `false` to render no icon.

`format` (string)
Set to `'0,0'` by default. [More format strings](http://numeraljs.com/).

`i18n` (object)
Contains localised text.


## Total Donations

```html
<div id="TotalDonationsExample"></div>
<script>
  edh.widgets.renderWidget('TotalDonationsExample', 'TotalDonations', {
    campaignUids: ['us-0','us-1']
  });
</script>
```

Displays the total number of donations made toward a given campaign. Either a single or multiple campaign uids can be provided to scope this widget.

### Demo

<p id="TotalDonationsExample"></p>

<script>
  edh.widgets.renderWidget('TotalDonationsExample', 'TotalDonations', { campaignUids: ['us-0','us-1'] });
</script>

### Options

> Default translation text

```js
{
  title: 'Donations'
}
```

`campaignUid` (string)<br>
Campaign uid to filter results by campaign.

`campaignUids` (array)<br>
Campaign uids to filter results by multiple campaigns.

`charityUid` (string)<br>
Charity uid to filter results by charity.

`charityUids` (array)<br>
Charity uids to filter results by multiple charities.

`startAt` (string)<br>
YYYY-MM-DD date string to get results on or after this date.

`endAt` (string)<br>
YYYY-MM-DD date string to get results on or before this date.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string).<br>
Accepts a CSS color value. Not set by default.

`renderIcon` (string or boolean)<br>
Set to `true` by default. Pass in a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon name (without the _fa_ prefix) to override the default. Set to `false` to render no icon.

`format` (string)<br>
Set to `'0,0'` by default. [More format strings](http://numeraljs.com/).

`i18n` (object)<br>
Contains localised text.


## Total Charities

```html
<div id="TotalCharitiesExample"></div>
<script>
  edh.widgets.renderWidget('TotalCharitiesExample', 'TotalCharities', {
    campaignUids: ['us-0','us-1']
  });
</script>
```

Displays the total number of charities associated with specified campaigns. Either a single or multiple campaign uids can be provided to scope this widget.

### Demo

<p id="TotalCharitiesExample"></p>

<script>
  edh.widgets.renderWidget('TotalCharitiesExample', 'TotalCharities', {
    campaignUids: ['us-0','us-1']
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  title: 'Charities'
}
```

`campaignUid` (string)<br>
Campaign uid to filter results by campaign.

`campaignUids` (array)<br>
Campaign uids to filter results by multiple campaigns.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string)<br>
Accepts a CSS color value. Not set by default.

`renderIcon` (string or boolean)<br>
Set to `true` by default. Pass in a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon name (without the _fa_ prefix) to override the default. Set to `false` to render no icon.

`format` (string).<br>
Set to `'0,0 a'` by default. [More format strings](http://numeraljs.com/).

`i18n` (object)<br>
Contains localised text.



## Campaign Goal

```html
  <div id="GoalExample"></div>
  <script>
    edh.widgets.renderWidget('GoalExample', 'Goal', {
      goal: 500000,
      i18n: {
        title: '2015 Goal'
      }
    });
  </script>
```

Set and display a campaign goal. While this component can be configured to display any type of goal it renders as a dollar amount by default.

### Demo

<p id="GoalExample"></p>

<script>
  edh.widgets.renderWidget('GoalExample', 'Goal', {
    goal: 500000,
    i18n: {
      title: '2015 Goal'
    }
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  title: 'Goal',
  symbol: '$',
  suffix: ''
}
```

`goal` (number) <span class="required">Required</span><br>
Set a goal, rendered as a dollar value by default.

`renderIcon` (string or boolean)<br>
Set to `true` by default. Pass in a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon name (without the _fa_ prefix) to override the default. Set to `false` to render no icon.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string)<br>
Accepts a CSS color value. Not set by default.

`format` (string)<br>
Set to `'0[.]00 a'` by default. [More format strings](http://numeraljs.com/).

`handleCents` (boolean)<br>
Set to `true` by default. Determines whether the supplied `goal` is divided by 100 (to display as dollars).

`i18n` (object)<br>
Contains localised text.


## Goal Progress

Display the progress towards a fund raising goal for charities or campaigns.

### Demo

```html
<div id="EntityGoalProgressExample"></div>
<script>
  edh.widgets.renderWidget('EntityGoalProgressExample', 'EntityGoalProgress', {
    campaignUid: 'us-22',
    goal: 15000000
  });
</script>
```

<p id="EntityGoalProgressExample"></p>

<script>
  edh.widgets.renderWidget('EntityGoalProgressExample', 'EntityGoalProgress', {
    campaignUid: 'us-22',
    goal: 15000000
  });
</script>

### Options

`goal` (number) <span class="required">Required</span><br>
Set a goal in cents. Renders as a dollar value by default.

`campaignUid` (string or array)<br>
Campaign uid or uids to filter results by campaigns.

`charityUid` (string or array)<br>
Charity uid or uids to filter results by charities.

`startAt` (string)<br>
YYYY-MM-DD date string to get results on or after this date.

`endAt` (string)<br>
YYYY-MM-DD date string to get results on or before this date.

`format` (string)<br>
Set to `'0[.]00 a'` by default. [More format strings](http://numeraljs.com/).


## Total Distance

```html
<div id="TotalDistanceExample"></div>
<script>
  edh.widgets.renderWidget('TotalDistanceExample', 'TotalDistance', {
    campaignUids: ['us-0','us-1']
  });
</script>
```

Displays the total distance recorded by fundraisers (using MapMyFitness) for a single specified campaign in either **kilometers** or **miles**.

Either a single or multiple campaign uids can be provided to scope this widget.


### Demo

<p id="TotalDistanceExample"></p>

<script>
  edh.widgets.renderWidget('TotalDistanceExample', 'TotalDistance', {
    campaignUids: ['us-0','us-1']
  });
</script>


### Options

> Default `i18n` translation object:

```js
{
  title: 'Miles',
  emptyLabel: 'No data to display.'
}
```

`campaignUid` (string)<br>
Campaign uid to filter results by campaign.

`campaignUids` (array)<br>
Campaign uids to filter results by multiple campaigns.

`unit` (string)<br>
Can be set to either `'km'` or `'miles'`. Converts input to whichever is defined. Set to `'miles'` by default.

`renderIcon` (string or boolean)<br>
Set to `true` by default. Pass in a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon name (without the _fa_ prefix) to override the default. Set to `false` to render no icon.

`backgroundColor` (string)
Accepts a CSS color value. Not set by default.

`textColor` (string)
Accepts a CSS color value. Not set by default.

`format` (string).
Set to `'0,0[.]0[0]'` by default. [More format strings](http://numeraljs.com/).

`i18n` (object)
Contains localised text.


## Total Hours

```html
<div id="TotalHoursExample"></div>
<script>
  edh.widgets.renderWidget('TotalHoursExample', 'TotalHours', {
    campaignUids: ['us-0','us-1']
  });
</script>
```

Displays the total time recorded by fundraisers (using MapMyFitness) for a single specified campaign in **hours**.

Either a single or multiple campaign uids can be provided to scope this widget.

### Demo

<p id="TotalHoursExample"></p>

<script>
  edh.widgets.renderWidget('TotalHoursExample', 'TotalHours', {
    campaignUids: ['us-0','us-1']
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  title: 'Hours',
  emptyLabel: 'No data to display.'
}
```

`campaignUid` (string)<br>
Campaign uid to filter results by campaign.

`campaignUids` (array)<br>
Campaign uids to filter results by multiple campaigns.

`renderIcon` (string or boolean)<br>
Set to `true` by default. Pass in a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon name (without the _fa_ prefix) to override the default. Set to `false` to render no icon.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string)<br>
Accepts a CSS color value. Not set by default.

`format` (string)<br>
Set to `'0,0[.]0[0]'` by default. [More format strings](http://numeraljs.com/).

`i18n` (object)<br>
Contains localised text.


## Total Calories

```html
<div id="TotalCaloriesExample"></div>
<script>
  edh.widgets.renderWidget('TotalCaloriesExample', 'TotalCalories', {
    campaignUids: ['us-0','us-1']
  });
</script>
```

Displays the total calories recorded by fundraisers (using MapMyFitness) for a single specified campaign or multiple campaigns.


### Demo

<p id="TotalCaloriesExample"></p>

<script>
  edh.widgets.renderWidget('TotalCaloriesExample', 'TotalCalories', {
    campaignUids: ['us-0','us-1']
  });
</script>


### Options

> Default `i18n` translation object:

```js
{
  title: 'Calories',
  emptyLabel: 'No data to display.'
}
```

`campaignUid` (string)<br>
Campaign uid to filter results by campaign.

`campaignUids` (array)<br>
Campaign uids to filter results by multiple campaigns.

`renderIcon` (string or boolean)<br>
Set to `true` by default. Pass in a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icon name (without the _fa_ prefix) to override the default. Set to `false` to render no icon.

`backgroundColor` (string)
Accepts a CSS color value. Not set by default.

`textColor` (string)
Accepts a CSS color value. Not set by default.

`format` (string).
Set to `'0,0'` by default. [More format strings](http://numeraljs.com/).

`i18n` (object)
Contains localised text.


# Charities

## Promoted Charities

Displays promoted charities that are passed in as a list of tabs and charity ids.

### Demo

```html
<div id="CharitiesExample"></div>
<script>
  edh.widgets.renderWidget('CharitiesExample', 'PromoCharities', {
    action: 'custom',
    onSelect: function(charity) {
      alert("You clicked " + charity.name);
    },
    tabs: [
      {
        category: 'Helping People',
        charityUids: ['au-3395', 'au-24', 'au-494']
      },
      {
        category: 'Helping Animals',
        charityUids: ['au-522', 'au-1661', 'au-914']
      }
    ]
  });
</script>
```

<p id="CharitiesExample"></p>

<script>
  edh.widgets.renderWidget('CharitiesExample', 'PromoCharities', {
    action: 'custom',
    onSelect: function(charity) {
      alert("You clicked " + charity.name);
    },
    tabs: [
      {
        category: 'Helping People',
        charityUids: ['au-3395', 'au-24', 'au-494']
      },
      {
        category: 'Helping Animals',
        charityUids: ['au-522', 'au-1661', 'au-914']
      }
    ]
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  heading: 'Promoted Charities',
  subheading: 'Choose a tab below to view promoted charities within each category.',
  donateAction: 'Give Now',
  fundraiseAction: 'Fundraise',
  customAction: 'Select'
}
```

`tabs` (array) <span class="required">Required</span> <br>
Array of objects. Each object requires a `category` and a `charityUids` array.

`action` (string)<br>
Defines action to perform on charity select. Must be specified as either `'donate'`, `'fundraise'` or `'custom'`. **Note:** 'donate' action is currently not supported for country 'us'.

`onSelect` (function)<br>
Called on selecting a result when `action` set to `'custom'`.

`i18n` (object)<br>
Contains localised text.


# Leaderboards

## Leaderboard

Displays an individuals leaderboard sorted by funds raised (highest first) for a campaign or charity.

### Demo

```html
<div id="LeaderboardExample"></div>
<script>
  edh.widgets.renderWidget('LeaderboardExample', 'Leaderboard', {
    campaignUids: ['us-22', 'us-19']
  });
</script>
```

<p id="LeaderboardExample"></p>

<script>
  edh.widgets.renderWidget('LeaderboardExample', 'Leaderboard', {
    campaignUid: 'us-0'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  symbol: '$',
  heading: 'Top Individuals'
}
```

`campaignUid` (string)<br>
Define a campaign uid to filter results by campaign.

`campaignUids` (array)<br>
Define multiple campaign uids to filter results by campaigns.

`campaignSlug` (string)<br>
Campaign slug to filter results by campaign. Requires `country`.

`charityUid` (string)<br>
Charity uid to filter results by charity.

`charitySlug` (string)<br>
Charity slug to filter results by charity. Requires `country`.

`country` (string)<br>
Country code of region, either 'au', 'ie', 'nz', 'uk' or 'us'. Required by `campaignSlug` and `charitySlug`.

`limit` (number)<br>
Set to `24` by default. Determines how many results are returned in total.

`pageSize` (number)<br>
Set to `12` by default. Determines how many results to show per page.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string)<br>
Accepts a CSS color value. Not set by default.

`childWidth` (number)<br>
Set to `250` by default. Sets the minimum width for leaderboard items to display.

`renderImage` (boolean)<br>
Set to `true` by default. Determines whether a profile image is rendered for each leaderboard item.

`currencyFormat` (string)<br>
Set to `'0[.]00 a'` by default. [More format strings](http://numeraljs.com/).

`onHasContent` (function)<br>
Callback function.

`i18n` (object)<br>
Containing localised text.



## Team Leaderboard

Displays a team leaderboard sorted by funds raised (highest first) for a campaign or charity.

### Demo

```html
<div id="TeamLeaderboardExample"></div>
<script>
  edh.widgets.renderWidget('TeamLeaderboardExample', 'TeamLeaderboard', {
    campaignUid: 'us-0'
  });
</script>
```

<p id="TeamLeaderboardExample"></p>

<script>
  edh.widgets.renderWidget('TeamLeaderboardExample', 'TeamLeaderboard', {
    campaignUid: 'us-0'
  });
</script>


### Options

> Default `i18n` translation object:

```js
{
  raisedTitle: 'Raised',
  membersTitle: 'Members',
  symbol: '$',
  heading: 'Top Teams'
}
```

`campaignUid` (string)<br>
Campaign uid to filter results by campaign.

`campaignSlug` (string)
Campaign slug to filter results by campaign. Requires `country`.

`charityUid` (string) <br>
Charity uid to filter results by charity.

`charitySlug` (string)<br>
Charity slug to filter results by charity. Requires `country`.

`country` (string)<br>
Country code of region, either 'au', 'ie', 'nz', 'uk' or 'us'. Required by `campaignSlug` and `charitySlug`.

`limit` (number)<br>
Set to `24` by default. Determines how many results are returned in total.

`pageSize` (number)<br>
Set to `12` by default. Determines how many results to show per page.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string)<br>
Accepts a CSS color value. Not set by default.

`childWidth` (number)<br>
Set to `250` by default. Sets the minimum width for leaderboard items to display.

`altTemplate` (boolean)<br>
Set to `false` by default. Renders an alternate template set when set to `true`.

`renderImage` (boolean)<br>
Set to `true` by default. Determines whether a profile image is rendered for each leaderboard item.

`currencyFormat` (string)<br>
Set to `'0[.]00 a'` by default. [More format strings](http://numeraljs.com/).

`onHasContent` (function)<br>
Callback function.

`i18n` (object)<br>
Contains localised text.


## Fitness Leaderboard

Displays a leaderboard sorted by distance, recorded using MapMyFitness, for a campaign or charity. Ordered by highest first. This leaderboard also displays, and can be sorted by, funds raised. Can be set to show leaderboards for teams or individuals.

### Demo

```html
<div id="FitnessLeaderboardExample"></div>
<script>
  edh.widgets.renderWidget('FitnessLeaderboardExample', 'FitnessLeaderboard', {
    campaignUid: 'us-0'
  });
</script>
```

<p id="FitnessLeaderboardExample"></p>

<script>
  edh.widgets.renderWidget('FitnessLeaderboardExample', 'FitnessLeaderboard', {
    campaignUid: 'us-0'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  raisedTitle: 'Raised',
  distanceTitle: 'Distance',
  symbol: '$',
  heading: 'Top Individuals',
  kmSuffix: 'km',
  milesSuffix: 'mi'
}
```

`campaignUid` (string)<br>
Campaign uid to filter results by campaign.

`campaignSlug` (string)<br>
Campaign slug to filter results by campaign. Requires `country`.

`charityUid` (string)<br>
Charity uid to filter results by charity.

`charitySlug` (string)<br>
Charity slug to filter results by charity. Requires `country`.

`country` (string)<br>
Country code of region, either 'au', 'ie', 'nz', 'uk' or 'us'. Required by `campaignSlug` and `charitySlug`.

`type` (string)<br>
Set a type of either `'team'` or `'individual'`. Set to `'individual'` by default.

`limit` (number)<br>
Set to `100` by default. Determines how many results should be fetched via the everdayhero leaderboards API endpoint.

`pageSize` (number)<br>
Set to `5` by default. Determines how many results to display on the leaderboard at once.

`backgroundColor` (string)<br>
Not set by default.

`textColor` (string)<br>
Not set by default.

`currencyFormat` (string)<br>
Set to `0,0[.]00 a` by default. [More format strings](http://numeraljs.com/).

`distanceFormat` (string)<br>
Set to `0,0[.]00` by default. [More format strings](http://numeraljs.com/).

`i18n` (object)<br>
Contains localised text.


# Supporters

## Supporters

Displays a set of supporter cards (fundraising page summary with donate call to action) for a charity or campaign.

### Demo

```html
<div id="SupportersExample"></div>
<script>
  edh.widgets.renderWidget('SupportersExample', 'Supporters', {
    campaignUid: 'us-19'
  });
</script>
```

<p id="SupportersExample"></p>

<script>
  edh.widgets.renderWidget('SupportersExample', 'Supporters', {
    campaignUid: 'us-19'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  emptyLabel: 'No supporters to display.'
}
```

`campaignUid` (string)
Campaign uid to filter results by campaign.

`campaignSlug` (string)
Campaign slug to filter results by campaign. Requires `country`.

`charityUid` (string)
Charity uid to filter results by charity.

`charitySlug` (string)
Charity slug to filter results by charity. Requires `country`.

`country` (string)
Country code of region, either 'au', 'ie', 'nz', 'uk' or 'us'. Required by `campaignSlug` and `charitySlug`.

`limit` (number)
Number of supporter cards to show. Default is 6.

`type` string.
Set a type of either `'team'` or `'individual'`. Set to `'individual'` by default.

`i18n` (object)
Contains localised text.



## Recent Fundraisers

Displays a set of fundraiser profile images (that have a page) for a single specified campaign.

### Demo

```html
<div id="RecentFundraisersExample"></div>
<script>
  edh.widgets.renderWidget('RecentFundraisersExample', 'RecentFundraisers', {
    campaignUid: 'us-0'
  });
</script>
```

<p id="RecentFundraisersExample"></p>

<script>
  edh.widgets.renderWidget('RecentFundraisersExample', 'RecentFundraisers', {
    campaignUid: 'us-0'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  heading: 'Fundraisers',
  emptyLabel: 'No fundraisers to display.'
}
```

`campaignUid` (string or array)<br>
Campaign uid (or uids) to filter results by campaign.

`pageSize` (number)<br>
Set to `6` by default. Determines how many results are returned.

`backgroundColor` (string) <br>
Accepts a CSS color value. Not set by default.

`textColor` (string)
Accepts a CSS color value. Not set by default.

`i18n` (object)<br>
Contains localised text.


# Maps

## USA Map

Displays an SVG map. Each plotted point represents a supporter page.

### Demo

```html
<div id="MapExample"></div>
<script>
  edh.widgets.renderWidget('MapExample', 'Map', {
    campaignUid: 'us-0',
    region: 'US'
  });
</script>
```

<p id="MapExample"></p>

<script>
  edh.widgets.renderWidget('MapExample', 'Map', {
    campaignUid: 'us-19',
    region: 'US'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  heading: 'Program Reach',
  legend: 'Supporters'
}
```

`campaignUid` (string) <span class="required">Required</span> <br>
Campaign uid to filter results by campaign.

`region` (string)<br>
Set the region/country to display using a region code, e.g. `'US'`.

`limit` (string)<br>
Set to `'100'` by default. Determines how many results are returned. **Note:** Returns geo-location data from returned user generated pages. Some pages may not have this data available.

`color` (string)<br>
Set to `'#525252'` by default.

`i18n` (object)<br>
Contains localised text.



# Forms

## Address Lookup

Displays a form input field and country selector, which allows users to lookup their address by fuzzy matching through the Google Places API, or via United Kingdom postcode through the PostCode Anywhere API. Once they find their address, it is broken down into parts for editing and database accuracy.

### Demo

```html
<div id="AddressLookupExample"></div>
<script>
  edh.widgets.renderWidget('AddressLookupExample', 'AddressLookup', {
    country: 'GB'
  });
</script>
```

<p id="AddressLookupExample"></p>

<script>
  edh.widgets.renderWidget('AddressLookupExample', 'AddressLookup', {
    country: 'GB'
  });
</script>

### Options

> Pre-fill `address` object structure:

```js
{
  street_address: '',
  extended_address: '',
  locality: '',
  postal_code: '',
  region: '',
  country_name: '',
  paf_validated: false
}
```

> Default `i18n` translation object:

```js
{
  inputLabel: 'Address Lookup',
  inputLabelGB: 'Postcode Lookup',
  manualEntryButton: 'Enter Manually',
  resetButton: 'Reset Address',
  error:"Sorry, we couldn't find that address"
}
```

`required` (boolean)<br>
Sets the address field as being required. Defaults to 'false'.

`prefix` (string)<br>
Add a unique identifier to the input elements, for use when multiple AddressLookup widgets appear on the same page / post to the same form. Defaults to ''.

`spacing` (string)<br>
Specify the spacing around input. Valid options are: "compact", "loose", and "tight". Default is "loose".

`country` (string)<br>
Two-digit capitalized country ISO code (AU, GB, US, NZ, IE, etc). Default is 'US'.

`address` (object)<br>
Object containing a pre-existing address to display. If provided, lookup functionality is not available. Use when user address already provided or when page reloads on form validation. Default is `null`.

`output` (function)<br>
Get user's final selected address.

`i18n` (object)<br>
Contains localised text.



## Amount

Displays a radio group and input field, which allows users to choose from four predefined values, or input a custom value. Will default to the second predefined value on load, and when custom value is 0.

### Demo

```html
<div id="AmountExample"></div>
<script>
  edh.widgets.renderWidget('AmountExample', 'Amount', {
    name: 'target_value'
  });
</script>
```

<p id="AmountExample"></p>

<script>
  edh.widgets.renderWidget('AmountExample', 'Amount', {
    name: 'target_value'
  });
</script>

### Options

`name` (string)<br>
Identify the radio group and input in a form. Default is `'Amount'`.

`amount` (number)<br>
Value of the initial selected preset or custom amount. Default is `null`.

`amounts` (array)<br>
Array of exactly four predefined numbers (not strings). Default is `[500, 700, 1500, 3000]`.

`output` (function)<br>
Get selected amount.

`currency` (string)<br>
Currency symbol. Default is `'$'`.

`spacing` (string)<br>
Specify the spacing around the input. Valid options are: `"compact"`, `"loose"`, and `"tight"`. Default is `"loose"`.



## Input

Displays an input field which can accept input masking, asynchronous validation, modal activation, layout modification, default values, and various input relevant properties.

### Demo

<p id="InputExample"></p>

<script>
  edh.widgets.renderWidget('InputExample', 'Input', {
    i18n: {
      name: 'input_example',
      label: 'Example Input',
      hint: 'Enter some text',
      error: 'Please enter some text'
    }
  });
</script>

```html
<div id="InputExample"></div>
<script>
  edh.widgets.renderWidget('InputExample', 'Input', {
    i18n: {
      name: 'input_example',
      label: 'Example Input',
      hint: 'Enter some text',
      error: 'Please enter some text'
    }
  });
</script>
```

### Options

> Custom `mask` function used to modify user input as it's entered.

```js
function mask(input) {
 var maskedString = input; // masking logic here
 return maskedString;
}
```

> Custom `validate` function. Is passed the current input string and a callback. Runs when an input field loses focus.

```js
function validate(input, callback) {
 var boolean = !!input; // validation logic here
 return callback(boolean);
}
```

> Custom `output` function allows you to catch input changes as they are made.

```js
function output(input) {
  // act on changes within the input here
}
```

> Custom `modal` function, executed when field gains focus.

```js
function modal(object) {
  // you can animate the modal opening from object.element
  // you can use object.value for modal's initial value
  // you can set the new value of the input from object.callback(value)
}
```

> Valid `i18n` translation object:

```js
{
  name: 'input', //becomes the input's ID
  label: 'Input', //visible label for the input
  hint: 'What is this input for?', //visible hint when input is focused
  error: "Please don't leave this blank" //message to display if not valid
}
```

> Default `i18n` translation object:

```js
{
  name: 'input',
  label: 'Input'
}
```


`readOnly` (boolean)<br>
Prevent users from altering the input by typing. Best used with a modal attached. Default is `false`.

`disabled` (boolean)<br>
Prevent users from changing the input, and displays as disabled. Default is `false`.

`autoFocus` (boolean)<br>
Determine if the input should gain focus as soon as it is loaded. Should only be true for one input on the page. Default is `false`.

`autoSelect` (boolean)<br>
Determine if the input should gain focus and also have the value highlighted upon loading. Should only be true for one input on the page. Default is `false`.

`autoComplete` (boolean)<br>
Determine if the input should use the browser's autocomplete functionality. Default is `false`.

`required` (boolean)<br>
Trigger optional validation methods and ensure the input isn't left blank. Default is 'false'.

`mask` (function)<br>
Modify user input as it is entered. Default is 'null'. Is passed the current input string.

`validate` (function)<br>
Validate the user input when the field loses focus. Is passed the current input string and a callback to set valid state. Default is 'null'.

`output` (function)<br>
Catch input changes as they are made. Default is 'null'. Is passed the current input string. Example:

`modal` (function)<br>
Executed when field gains focus. Best used to open a modal or reveal additional UI for the field. Default is `null`. Is passed an object containing the input DOM element, the current input string, and a callback to alter the value.

`type` (string)<br>
Defining the html input type. Default is `'text'`.

`icon` (string)<br>
Specify an icon to appear to the right. Valid strings are Font Awesome icon names (without the 'fa-' prefix). Default is `null`.

`showIcon` (boolean)<br>
Allow disabling icons when set to 'false'. Default is `true`.

`width` (string)<br>
Specify the width of the field. Valid options are: `"full"`, `"wide",` `"half"`, and `"narrow"`. Default is `"full"`.

`spacing` (string)<br>
Specify the vertical spacing beneath each input. Valid options are: "compact", "loose", and "tight". Default is "loose".

`value` (string)<br>
Input's initial value. Not set by default.

`onEnter` (function)<br>
Callback function for onEnter event.

`animateLabel` (boolean)<br>
Make label a large hint text when there is no value or input is blurred. Animates to a small label on focus. Defaults to `false`.

`i18n` (object) <span class="required">Required</span><br>
Contains localised text.


## SearchInput

Renders search style input and allow onSubmit callback which returns the value

### Demo

```html
<div id="SearchInput"></div>
<script>
  edh.widgets.renderWidget('SearchInput', 'SearchInput', {
    onSubmit: function(value) {
      edh.widgets.showModal('AggregateSearch', { searchTerm: value, country: 'uk' });
    }
  });
</script>
```

<p id="SearchInput"></p>

<script>
  edh.widgets.renderWidget('SearchInput', 'SearchInput', {
    onSubmit: function(value) {
      edh.widgets.showModal('AggregateSearch', { searchTerm: value, country: 'uk' });
    }
  });
</script>

### Options

`autoFocus` (boolean)<br>
Determine if the input should gain focus as soon as it is loaded. Should only be true for one input on the page. Default is `false`.

`autoSelect` (boolean)<br>
Determine if the input should gain focus and also have the value highlighted upon loading. Should only be true for one input on the page. Default is `false`.

`onSubmit` (function)<br>
Callback which returns input value on enter or click search button.

`width` (string)<br>
Specify the width of the field. Valid options are: `"full"`, `"wide"`, `"half"`, and `"narrow"`. Default is `"full"`.

`label` (string)<br>
 Set to `search` by default.


# Teams

## Teams (Campaign)

Displays a set of teams for a single specified campaign.

### Demo

```html
<div id="TeamsExample"></div>
<script>
 edh.widgets.renderWidget('TeamsExample', 'Teams', {
   campaignUid: 'us-0'
  });
</script>
```

<p id="TeamsExample"></p>

<script>
 edh.widgets.renderWidget('TeamsExample', 'Teams', {
   campaignUid: 'us-0'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  heading: 'Teams',
  emptyLabel: 'No teams to display.'
}
```

`campaignUid` ((string or array))<br>
Campaign uid (or uids) to filter results by campaign.

`pageSize` (number)<br>
Set to `12` by default. Determines how many results are returned.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string)<br>
Accepts a CSS color value. Not set by default.

`i18n` (object)<br>
Contains localised text.


# Calls to Action

## Call To Action Box

Displays a call to action box with links to the **getting started** and **sign in** page for the specified campaign. A registration URL must also be provided.

### Demo

```html
<div id="CallToActionBoxExample"></div>
<script>
  edh.widgets.renderWidget('CallToActionBoxExample', 'CallToActionBox', {
    campaignUid: 'us-0',
    registrationUrl: 'https://your-registration-url.com/'
  });
</script>
```

<p id="CallToActionBoxExample"></p>

<script>
  edh.widgets.renderWidget('CallToActionBoxExample', 'CallToActionBox', {
    campaignUid: 'us-0',
    registrationUrl: 'https://your-registration-url.com/'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  title: 'Get Involved',
  registerLabel: 'Register Now',
  getStartedLabel: 'Start Fundraising',
  signInLabel: 'Sign in'
}
```

`campaignUid` (string) <span class="required">Required</span><br>
Campaign uid to automatically insert 'sign in' and 'get started links'.

`registrationUrl` (string) <span class="required">Required</span><br>
Pass a URL to your registration page.

`backgroundColor` (string)<br>
Accepts a CSS color value. Not set by default.

`textColor` (string)<br>
Accepts a CSS color value. Not set by default.

`i18n` (object)<br>
Contains localised text.


## Share Button

A share button that opens a pop-over when clicked and allows for sharing a URL. Includes the options for sharing a direct link or sharing via popular social networks.

### Demo

```html
<div id="ShareButtonExample"></div>
<script>
  edh.widgets.renderWidget('ShareButtonExample', 'ShareButton');
</script>
```

<p id="ShareButtonExample"></p>

<script>
  edh.widgets.renderWidget('ShareButtonExample', 'ShareButton');
</script>

### Options

> Default `i18n` translation object:

```js
{
  buttonLabel: 'Share this page',
  shareLinkLabel: 'Share a direct link',
  shareViaLabel: 'Share via'
}
```

`buttons` (array)<br>
Determines which social network/sharing service buttons to show. Choices include `'facebook'`, `'twitter'`, `'googleplus'` and `'pinterest'`. Default is set to display all buttons.

`shareUrl` (string)<br>
Sets the URL to share. Default is set to the current page URL.

`shareTitle` (string)<br>
Sets the title to share for some services. Default is set to the value stored in the current page `<title>` tag.

`shareImage` (string)<br>
Sets the image to share on Pinterest. Is not set by default.

`renderIcon` (boolean)<br>
Set to `true` by default.

`i18n` (object)<br>
Contains localised text.


# Events

## Upcoming Events

Displays a list of upcoming events/campaigns.

### Demo

```html
<div id="UpcomingEventsExample"></div>
<script>
  edh.widgets.renderWidget('UpcomingEventsExample', 'UpcomingEvents', {
    charityUid: 'gb-1'
  });
</script>
```

<p id="UpcomingEventsExample"></p>

<script>
  edh.widgets.renderWidget('UpcomingEventsExample', 'UpcomingEvents', {
    charityUid: 'gb-1'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  emptyLabel: 'No upcoming events available.'
}
```

`charityUid` (string) <span class="required">Required</span><br>
Charity uid to filter campaigns results.

`excludeEvents` (string)
CSV of events to exclude.

`featureEvents` (string)
CSV of events to feature. Only these events will be shown. These events must exist in the results returned from the API via campaignID(s) / charityID(s)

`i18n` (object)<br>
Contains localised.


## Countdown

Displays a countdown of days until the start of an event or campaign. Can be configured to show a call to action button that hides itself once the event has completed or is in the past.

### Demo

```html
<div id="CountDownExample"></div>
<script>
  edh.widgets.renderWidget('CountDownExample', 'CountDown', {
    date: "2017-04-24",
    linkUrl: 'https://everydayhero.com/us'
  });
</script>
```

<p id="CountDownExample"></p>

<script>
  edh.widgets.renderWidget('CountDownExample', 'CountDown', {
    date: "2017-04-24",
    linkUrl: 'https://everydayhero.com/us'
  });
</script>

### Options

> Default `i18n` translation object:

```js
{
  link_text: 'Register',
  finished: "This event has now finished.",
  past_tense: {
    one: "day ago",
    other: "days ago"
  },
  future_tense: {
    one: "day to go",
    other: "days to go"
  }
}
```

`date` (string) <span class="required">Required</span><br>
The date of your event specified as `YYYY-MM-DD`.

`linkUrl` (string)<br>
URL to link to, e.g. a registration page. Defining this option will result in showing a call to action button.

`i18n` (object)<br>
Contains localised text.



# Misc. UI Elements

## Tabs

Displays a set of tabs that transform to an accordion depending on browser window size/number of tabs.

### Demo

```html
<div id="TabsExample"></div>
<script>
  edh.widgets.renderWidget('TabsExample', 'Tabs', {
    children: [
      {
        label: 'Example Tab',
        content: '<p>Tab content goes here.</p><p>Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla.</p>'
      },
      {
        label: 'Another Tab',
        content: '<p>Lorem <strong>ipsum dolor</strong> sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus.</p>'
      },
      {
        label: 'Last Tab',
        content: '<p>An image:</p> <img src="http://placehold.it/200x100">'
      }
    ]
  });
</script>
```

<p id="TabsExample"></p>

<script>
  edh.widgets.renderWidget('TabsExample', 'Tabs', {
    children: [
      {
        label: 'Example Tab',
        content: '<p>Tab content goes here.</p><p>Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla.</p>'
      },
      {
        label: 'Another Tab',
        content: '<p>Lorem <strong>ipsum dolor</strong> sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus.</p>'
      },
      {
        label: 'Last Tab',
        content: '<p>An image:</p> <img src="http://placehold.it/200x100">'
      }
    ]
  });
</script>

### Options

`children` (array) <span class="required">Required</span><br>
Array of objects containing a `label` and `content` field to represent each tab, or array of react components.

`collapse` (string or boolean)<br>
Set to `'auto'` for automatic collapsing, `true` to force collapsing and `false` to disable collapsing. Set to `'auto'` by default.



# FAQ

## How do I change the look and feel of the widget I want to use?

Widgets embedded on your page are just like any other HTML element and can be styled with CSS. This allows you to change everything from fonts and colours to the size and shape of specific elements within the widget.

## Can I change the text labels on a widget?

> Example of a widget with custom text labels:

```js
edh.widgets.renderWidget('ShareButtonExample', 'ShareButton', {
  renderIcon: false,
  shareUrl: "http://everydayhero.com/us/",
  i18n: {
    buttonLabel: "Share now",
    shareLinkLabel: "Share a link"
  }
});
```

Each widget has an option called `i18n`. This option accepts a JavaScript object and allows you to override all text labels used within a widget. To change a label add the `i18n` object with just the key/value pairs you want replaced.

## Do I have to place the dependencies right before the closing `</body>` tag?

> Make sure the dependencies are loaded before individual widgets.

```html
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
<link href="//d1ig6folwd6a9s.cloudfront.net/{{ latest-version }}.css" rel="stylesheet">
<script src="//d1ig6folwd6a9s.cloudfront.net/{{ latest-version }}.js"></script>
<div id="FundsRaisedExample"></div>
<script>
  edh.widgets.renderWidget('FundsRaisedExample', 'FundsRaised', {
    campaignUids: ['us-0','us-1']
  });
</script>
```

It is recommended that the dependency files be added to after the opening `<body>` tag so that you can use the widgets throughout your page (or pages). However, they can be added anywhere between the `<body></body>` tags of your page, though keep in mind that the dependencies must appear before any individual widget code.

## I'm using WordPress (or another CMS) and the widget isn't working. What's going wrong?

Most content management systems, including WordPress, often strip or alter foreign code that has been added while editing content for numerous reasons. This interference will likely break the widget code and result in the widget not loading.

If you need to add widgets to your page it's best to gain access and add the code directly to your page template or source code. If you're not able to do that yourself we encourage you to contact the parties responsible for developing your website to assist.

Alternatively WordPress has numerous [plugins](https://wordpress.org/plugins/) created in order to help in these situations, allowing you to embed code without any interference. Some example plugins include [Code Embed](https://wordpress.org/plugins/simple-embed-code/) and [WP Insert Code](https://wordpress.org/plugins/wp-insert-code/).
