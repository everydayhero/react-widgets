'use strict'

require('./testdom')('<html><body></body></html>', {
  url: 'http://localhost:8000'
})

global.sinon = require('sinon')
global.chai = require('chai')
global.expect = chai.expect
global.should = chai.should()
global.assert = chai.assert

chai.use(require('sinon-chai'))
