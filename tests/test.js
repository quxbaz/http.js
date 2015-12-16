chai.should();
var http = require('../http');

describe('http.js', function() {

  var server;

  before(function() {
    server = sinon.fakeServer.create();
    server.respondWith('GET', '/is/ok', [200, {'Content-Type': 'text/plain'}, 'OK']);
  });

  it("performs a GET and verifies the response data.", function(done) {
    http.get('/is/ok').then(function(data) {
      data.should.eql('OK');
      done();
    });
    server.respond();
  });

  it("checks for valid options", function() {
    (function() {
      http.get('/is/ok', {foo: 'bar'});
    }).should.throw();
    (function() {
      http.get('/is/ok', 'text');
    }).should.throw();
    (function() {
      http.get('/is/ok', {responseType: 'text'});
    }).should.not.throw();
    server.respond();
  });

});
