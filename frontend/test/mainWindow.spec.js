const assert = require('chai').assert;
var jsdom = require('jsdom');
var $ = require('jquery')(new jsdom.JSDOM().window);
var app = require('../js/mainWindow');
var mock = require('mock-require');

mock('jquery', $);
mock.reRequire('jquery');


describe('frontend client testing', function() {
    it('should initialize a window object', function() {
        assert.typeOf(app, 'object');
    })
})