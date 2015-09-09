# Widgets

Widgets is a project consisting of pre-built JavaScript components that integrate with everydayhero's API. These include search components, components for showing leaderboards, fundraising totals, fitness data and more.

## Demos and Documentation

View demos, example code and documentation here:

http://everydayhero.github.io/public-api-docs/

## Location

You can find the minified assets at the following locations:

- `//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].js`
- `//d1ig6folwd6a9s.cloudfront.net/widgets-[0.0.0].css`

To view the uncached version of deployed files go to:

- `https://shared-scripts.s3.amazonaws.com/widgets-[0.0.0].js`
- `https://shared-scripts.s3.amazonaws.com/widgets-[0.0.0].css`

You can view the deployed example html file at:

- `https://shared-scripts.s3.amazonaws.com/widgets-[0.0.0].html`

## Commands

OSX users may need to increase the maximum number of open files (default is 256) using `ulimit -Sn 1000` to use build, watch, and scripts commands.

```sh
$ npm run setup         # install global dependencies, node modules and build production assets
$ npm run build         # build production assets
$ npm run build-dev     # build un minified assets (for debugging)
$ npm run watch         # watch assets and build production (un-minified)
$ npm run jshint        # check javascript code quality
$ npm run scripts       # build production scripts
$ npm run scripts-dev   # build un-minified scripts (for debugging)
$ npm run styles        # build production styles
$ npm run styles-dev    # build un-minified styles (for debugging)
$ npm run deploy-assets # publish build files to S3 bucket (AWS_KEY and AWS_SECRET environment variables must be set)

$ npm test            # run tests
$ npm start           # run local server
$ node_modules/.bin/jest ./__test__/path.js # run an indivdual test file
```

## Publishing updates

* Non-breaking changes and bug fixes are a minor revision – e.g. 0.0.(2)
* Breaking changes, css and template re-factors are major revisions – 0.(2).0
* API updates and large additions/changes are major versions – e.g. (1).0.0

The version number should be updated in the `package.json` before publishing.
