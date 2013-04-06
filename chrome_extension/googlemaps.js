/**
 * initialize Google Maps from this.mapsConversion which must be already defined
 * @constructor
 */
window.GoogleMapsRenderer = function () {

	/**
	 * @private
	 * @type {Array}
	 */
	this.mapsDefinitions = [];

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
	 * @type {int}
	 */
	this.minAutoZoom = 10;

	/**
	 * adds map definition to registry and render map if google maps API client is ready to use
	 * returns key identification of map in this object
	 *
	 * @param definition
	 *
	 * @return int
	 */
	this.addMap = function (definition) {
		this.mapsDefinitions.push(definition);
		if (this.googleMapsReady) {
			this.renderMap(definition, this.mapsDefinitions.length - 1);
		}
		return this.mapsDefinitions.length - 1;
	}

	/**
	 * callback to handle added maps initialization after Google maps API client successfull load
	 */
	this.render = function () {
		this.googleMapsReady = true;
		for (var i = 0; i < this.mapsDefinitions.length; i++) {
			this.renderMap(this.mapsDefinitions[i], i);
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
	 * @param int mapId
	 */
	this.renderMap = function (definition, mapId) {
		if (!this.googleMapsReady) {
			throw 'Google Maps not ready yet';
		}
		var mapOptions = {
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		if (typeof definition.zoom !== 'undefined') {
			mapOptions.zoom = definition.zoom
		}
		if (typeof definition.center !== 'undefined') {
			mapOptions.center = new google.maps.LatLng(definition.center[0], definition.center[1]);
		}
		definition.rendered = definition.rendered || {};
		var renderedDefinition = {
			map: new google.maps.Map(definition.canvas, mapOptions),
			markers: [],
			bounds: new google.maps.LatLngBounds()
		};
		this.renderedMaps[mapId] = renderedDefinition;
		if (typeof definition.markers !== 'undefined') {
			for (var y = 0; y < definition.markers.length; y++) {
				this.addMarker(mapId, definition.markers[y]);
			}
		}
	};

	/**
	 * returns key identification of marker in maps definition object
	 * @private
	 *
	 * @param in renderedMapDefinitionId
	 * @param markerDefinition
	 *
	 * @return int
	 */
	this.addMarker = function (renderedMapDefinitionId, markerDefinition) {
		var rmd = this.renderedMaps[renderedMapDefinitionId];
		var md = this.mapsDefinitions[renderedMapDefinitionId];
		var options = {
			position: new google.maps.LatLng(markerDefinition.position[0], markerDefinition.position[1]),
			map: rmd.map,
			title: markerDefinition.title || null
		};
		var marker = new google.maps.Marker(options);
		rmd.bounds.extend(marker.position);
		rmd.map.fitBounds(rmd.bounds);
		rmd.markers.push(marker);
		if (rmd.map.getZoom() > this.minAutoZoom) {
			rmd.map.setZoom(this.minAutoZoom);
		}
		return rmd.markers.length - 1;
	}

	/**
	 * if quite - it does not call map bounds recalculating
	 *
	 * @param {int} mapId
	 * @param {bool} quite
	 */
	this.cleanMarkers = function (mapId, quite) {
		var rmd = this.renderedMaps[mapId];
		if (typeof rmd.markers !== 'undefined') {
			for (var i = rmd.markers.length-1; i >= 0; i--) {
				this.removeMarker(mapId, i, quite);
			}
		}
	};

	/**
	 * if quite - it does not call map bounds recalculating
	 *
	 * @param {int} mapId
	 * @param {int} markerId
	 * @param {bool} quite
	 */
	this.removeMarker = function (mapId, markerId, quite) {
		var rmd = this.renderedMaps[mapId];
		rmd.markers[markerId].setMap(null);
		rmd.bounds = new google.maps.LatLngBounds();
		rmd.markers.splice(markerId, 1);
		for (var i = 0; i < rmd.markers; i++) {
			md.bounds.extend(rmd.markers[i].position);
		}
		if (!quite) {
			rmd.map.fitBounds(rmd.bounds);
		}
	};

	/**
	 * @param string address
	 * @param callbackSuccess
	 * @param callbackError
	 */
	this.geocode = function (address, callbackSuccess, callbackError) {
		this.geocoder = this.geocoder || new google.maps.Geocoder();
		this.geocoder.geocode( { 'address': address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				callbackSuccess(results);
			} else {
				callbackError(status);
			}
		});
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
		scriptURL = 'http' + '://'+ scriptURL;
		scriptURL += '&callback='+callbackName;
		var script = document.createElement("script")
		script.type = "text/javascript";
		script.src = scriptURL;
		document.getElementsByTagName("head")[0].appendChild(script);
	};

	this.init();
};
