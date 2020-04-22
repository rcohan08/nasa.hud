const assert = require('chai').assert;
var jsdom = require('jsdom');
var $ = require('jquery')(new jsdom.JSDOM().window);
var app = require('../js/mainWindow');
var mock = require('mock-require');
var sinon = require('sinon');
var passThrough = require('stream').PassThrough;
var http = require('http');

mock('jquery', $);
mock.reRequire('jquery');


describe('frontend client testing', function() {
    beforeEach(function() {
        this.request = sinon.stub(http, 'request');
    });
    afterEach(function() {
        http.request.restore();
    })
    it('should initialize a window object', function() {
        assert.typeOf(app, 'object');
    })
    it('should GET a JSON response', function(done) {
        var expected = {};
        var response = new PassThrough();
        response.write(JSON.stringify(expected));
        response.end();

        var request = new PassThrough();

        this.request.calls().returns(request);

        app.downloadRoles();
    })
})