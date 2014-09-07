/**
 * @module KEY_HANLDER
 * a singleton for registering functions on keyup and keydown events
 * @return {Object} the KEY_HANDLER module
 */
var KEY_HANDLER = (function () {
	var handler = {},
	callbacks = [],
	keyupCallbacks = [];


	handler.codes = {
		"i" : 73,
		"right": 39,
		"right-arrow": 39,
		"left": 37,
		"left-arrow":37,
		"up": 38,
		"up-arrow": 38,
		"down": 40,
		"down-arrow": 40,
		"space": 32,
		"spacebar": 32,
		"+" : 187,
		"-" : 189

	};

	/**
	 * undos inconsitencies in keyCodes on firefox keydown and keyup events
	 * @param  {Number} code the raw keycode
	 * @return {Number}      the returned normalized keyCode
	 */
	function firefoxKeycodeNormalizer (code) {

		switch(code) {
			case 173 : 
				return 189;
				break;
			case 61 : 
				return 187;
			break;
		}

		return code;
	}

	/**
	 * keydown event handler
	 * loops through all registered 'keydown' callbacks, calling them
	 * @param  {Event} e the key Event
	 * @return {null}
	 */
	window.addEventListener('keydown', function (e) {

		var code = e.keyCode;

		code = firefoxKeycodeNormalizer(code);
		
		for(var i = 0; i < callbacks.length; i += 1) {
			if(callbacks[i].code === code) {
				e.preventDefault();
				callbacks[i].callback();
			}
		}


	}, false);

	/**
	 * keyup event handler
	 * loops through all registered 'keyup' callbacks, calling them
	 * @param  {Event} e the key Event
	 * @return {null}
	 */
	window.addEventListener('keyup', function (e) {

		var code = e.keyCode;

		code = firefoxKeycodeNormalizer(code);
		
		for(var i = 0; i < keyupCallbacks.length; i += 1) {
			if(keyupCallbacks[i].code === code) {
				e.preventDefault();
				keyupCallbacks[i].callback();
			}
		}

	}, false);


	/**
	 * @public
	 * @param  {String}   key      the key string for the key to listen to (should be in handler.codes)
	 * @param  {Function} callback the callback function to register
	 * @return {null}  
	 */
	handler.on = function (key, callback) {

		var assigned = false;
		for(var ke in handler.codes) {
			if(ke === key) {
				assigned = true;
			}
		}

		if(!assigned) {
			return console.error('key not assigned, use onKeyCode instead');
		}

		if(typeof callback !== 'function') {
			return console.error('proper callback function must be specified');
		}

		callbacks.push({
			code : handler.codes[key],
			callback : callback
		});

	};


	/**
	 * @public
	 * @param  {String}   key      the key string for the key to listen to (should be in handler.codes)
	 * @param  {Function} callback the callback function to register
	 * @return {null}  
	 */
	handler.off = function (key, callback) {

		var assigned = false;
		for(var ke in handler.codes) {
			if(ke === key) {
				assigned = true;
			}
		}

		if(!assigned) {
			return console.error('key not assigned, use onKeyCode instead');
		}

		if(typeof callback !== 'function') {
			return console.error('proper callback function must be specified');
		}


		keyupCallbacks.push({
			code : handler.codes[key],
			callback : callback
		});
	};


	/**
	 * @public
	 * @param  {Number}   keyCode  the keycode to listen for
	 * @param  {Function} callback the callback to register
	 * @return {null}
	 */
	handler.onKeyCode = function (keyCode, callback) {

		if(typeof callback !== 'function') {
			return console.error('proper callback function must be specified');
		}

		callbacks.push({
			code : keyCode,
			callback : callback
		});
	};

	handler.reset = function() {
		callbacks = [];
		keyupCallbacks = [];
	}

	return handler;
	
}());

module.exports = KEY_HANDLER;