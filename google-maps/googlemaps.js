/**
 * initialize Google Maps from this.mapsConversion which must be already defined
 * @constructor
 */
window.GoogleMapsRenderer = function () {

	/**
	 * @private
	 * @type {{maps: Array}}
	 */
	this.mapsDefinitions = {maps: []};

	/**
	 * @private
	 *
	 * @type {Array}
	 */
	this.renderedMaps = [];

	/**
	 * @private
	 *
	 * @type {boolean}
	 */
	this.googleMapsReady = false;

	/**
	 * adds map definition to registry and render map if google maps API client is ready to use
	 * @param definition
	 */
	this.addMap = function (definition) {
		this.mapsDefinitions.maps.push(definition);
		if (this.googleMapsReady) {
			this.renderMap(definition);
		}
	}

	/**
	 * callback to handle added maps initialization after Google maps API client successfull load
	 */
	this.render = function () {
		this.googleMapsReady = true;
		for (var i = 0; i < this.mapsDefinitions.maps.length; i++) {
			this.renderMap(this.mapsDefinitions.maps[i]);
		}
	};

	/**
	 * @private
	 *
	 * renders map by given definition
	 *
	 * https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions
	 * https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	 *
	 * @param definition
	 */
	this.renderMap = function (definition) {
		if (!this.googleMapsReady) {
			throw 'Google Maps not ready yet';
		}
		var mapOptions = {
			zoom: definition.zoom,
			center: new google.maps.LatLng(definition.center[0], definition.center[1]),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		definition.rendered = definition.rendered || {};
		var map = new google.maps.Map(definition.canvas, mapOptions);
		var markers = [];
		if (typeof definition.markers !== 'undefined') {
			for (var y = 0; y < definition.markers.length; y++) {
				var md = definition.markers[y];
				markers.push(new google.maps.Marker({
					position: new google.maps.LatLng(md.position[0], md.position[1]),
					map: map,
					title: md.title || null
				}));
			}
		}
		this.renderedMaps = {
			map: map,
			markers: markers
		};
	};

};

/**
 * loading GoogleMaps API js client asynchronously: https://developers.google.com/maps/documentation/javascript/tutorial#asynch
 */
window.googleMapsInject = function (callbackName) {

	/**
	 * @type {function}
	 */
	this.callbackName = callbackName;

	/**
	 * @type {string}
	 */
	this.mapsSRC = 'maps.googleapis.com/maps/api/js?v=3&sensor=false';

	/**
	 * @constructor
	 */
	this.init = function () {
		var that = this;
		this.addScript(this.mapsSRC, this.callbackName);
	};

	this.addScript = function (scriptURL, callbackName) {
		scriptURL = ('https:' == document.location.protocol ? 'https' : 'http') + '://'+ scriptURL;
		scriptURL += '&callback='+callbackName;
		var script = document.createElement("script")
		script.type = "text/javascript";
		script.src = scriptURL;
		document.getElementsByTagName("head")[0].appendChild(script);
	};

	this.init();
};
