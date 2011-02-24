/*
 * Copyright 2011 IKS Project
 * Copyright 2011 GENTICS Software GmbH, Vienna
 * Copyright 2011 evo42 communications Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

if ( !SIF.Connectors ) SIF.Connectors = {};

/**
 * register the connector with a unique name
 */
SIF.Connectors.browser = new SIF.Connector('sif.connector.browser');

SIF.Connectors.browser.options = {};

SIF.Connectors.browser.init = function () {
	//TODO: what needs to be initialized for browser?
}

SIF.Connectors.browser.analyze = function (obj, success, error) {
	if (obj != navigator) {
		error("This connector does only support the 'navigator' object.");
		return;
	}
	
	var handleGeoloc = function (pos) {
		var lat = pos.coords.latitude;
		var long = pos.coords.longitude;
		var acc = pos.coords.accuracy; // in meters
		
		var rdf = jQuery.rdf()
		  .base('http://sif.org/')
		  .prefix('dbprop', 'http://dbpedia.org/property/')
		  .add('<currentLoc> dbprop:latitude "' + lat + '" .')
		  .add('<currentLoc> dbprop:longitude "' + long + '" .')
		  .add('<currentLoc> dbprop:accuracy "' + acc + '" .');
		success(rdf);
	}
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(handleGeoloc);
	} else {
		error("Browser does not support Geolocation!");
	}
}
