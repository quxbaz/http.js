/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	chai.should();
	var http = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var validOptions = ['responseType'];

	function checkForValidOptions(opts) {
	  for (var key in opts) {
	    if (opts.hasOwnProperty(key) && validOptions.indexOf(key) == -1)
	      throw '"' + key + '" is not a valid option.';
	  }
	}

	module.exports = {
	  get: function(url, opts) {
	    if (typeof opts == 'undefined')
	      var opts = {};
	    else if (typeof opts != 'object')
	      throw '@opts must be an object.';
	    checkForValidOptions(opts);
	    var request = new XMLHttpRequest();
	    request.open('GET', url, true);
	    if (opts.hasOwnProperty('responseType'))
	      request.responseType = opts.responseType;
	    var promise = new Promise(function(resolve, reject) {
	      request.onload = function() {
	        resolve(request.response);
	      };
	      request.onerror = function() {
	        reject(request.response);
	      };
	    });
	    request.send();
	    return promise;
	  }
	};


/***/ }
/******/ ]);