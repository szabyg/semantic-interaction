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

/**
 * @fileOverview Semantic Interaction Framework - Core
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

/**
 * Base {@link SIF} Object
 * @namespace SIF
 * @class SIF The {@link SIF} base object, which contains all the core functionality
 * @singleton
 * @constructor
 */
var SIF = function () {};

/**
 * {@link SIF} specific options
 * @property
 * @type Object
 */
SIF.prototype.options = {};

/**
 * Contains all registered objects of type {@link SIF.Smartobjects} in {@link SIF}.
 * @property
 * @type Array
 */
SIF.prototype.smartobjects = [];

/**
 * Logs a message to the console
 * @param level Level of the log ("error", "warn" or "info", "debug")
 * @param component Component that calls the log
 * @param message log message
 * @return void
 * @hide
 */
SIF.prototype.log = function(level, component, message) {
	SIF.Log.log(level, component, message);
};

/**
 * Initialize the whole {@link SIF}.
 * Initializes the ConnectorManager.
 * Initializes the ContextManager.<br />
 * Triggers 'ready' event on {@link SIF}.
 * @return void.
 */
SIF.prototype.init = function () {

	// initialize the Log
	this.Log.init();
	SIF.log("info", "core.js", "initializing the SIF core!");

	//initialize the connectors
	SIF.log("debug", "core.js", "initializing the connector manager");
	this.ConnectorManager.init();

	//initialize the contexts
	SIF.log("debug", "core.js", "initializing the context manager");
	this.ContextManager.init();

	SIF.log("info", "core.js", "finished initializing the SIF core!");
	SIF.EventRegistry.trigger(new SIF.Event("ready", SIF, null));
}

/**
 * Retrieves the {@link SIF.Smartobject} that corresponds to the given jQuery object.
 * @param {jQuery} obj The object to be retrieved
 * @return {SIF.Smartobject}
 */
SIF.prototype.getSmartObject = function (obj) {
	obj = jQuery(obj);
	//iterate over this.smartobjects
	for (var i = 0; i < this.smartobjects; i++) {
		var sObj = this.smartobjects[i];
		if (sObj instanceof SIF.Smartobject && sObj.object.get(0) === obj.get(0)) {
			return sObj;
		}
	}
	//register a new element!
	var sObj = new SIF.Smartobject(obj);
	
	this.smartobjects.push(sObj);
	SIF.EventRegistry.trigger(new SIF.Event("registered", obj, null));
	SIF.EventRegistry.trigger(new SIF.Event("registered", sObj, null));
	SIF.EventRegistry.trigger(new SIF.Event("objectRegistered", SIF, sObj));
	
	return sObj;
}

SIF = new SIF();

jQuery.isSIF = true;

jQuery(document).ready(function () {
	
    if (jQuery.isSIF) {
    	SIF.init();
    }
});
