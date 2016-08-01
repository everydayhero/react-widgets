'use strict'

global.sinon = require('sinon');
global.chai = require('chai');
global.expect = chai.expect;
global.should = chai.should();
global.assert = chai.assert;
global.mockrequire = require('mockrequire');

chai.use(require('sinon-chai'));
