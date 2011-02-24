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
 * Initialize the whole {@link SIF}.
 * Initializes the ConnectorManager.
 * Initializes the ContextManager.<br />
 * Triggers 'ready' event on {@link SIF}.
 * @return void.
 */
SIF.prototype.init = function () {

	//initialize the connectors
	this.ConnectorManager.init();
	
	//initialize the contexts
	this.ContextManager.init();

	// initialize the Log
	this.Log.init();
	
	//set up special objects
	this.user = initUser ();
	this.document = initDocument();
	
	SIF.EventRegistry.trigger(new SIF.Event("ready", SIF, null));
}

/**
 * Registers a {@link jQuery} object in {@link SIF}. If the obj is already
 * registered, no events are called and the already
 * registered event is returned.<br />
 * Triggers 'registered' on the given object.<br />
 * Triggers 'registered' on the {@link SIF.Smartobject}.<br />
 * Triggers 'objectRegistered' on SIF.
 * @param {jQuery} obj The object to be registered
 * @return {SIF.Smartobject}
 */
SIF.prototype.registerSmartObject = function (obj) {
	//converting the plain jQuery object into a SIF.Smartobject
	if (SIF.getSmartObject(obj) == undefined) {
		var sObj = new SIF.Smartobject(obj);
		this.smartobjects.push(sObj);
		SIF.EventRegistry.trigger(new SIF.Event("registered", obj, null));
		SIF.EventRegistry.trigger(new SIF.Event("registered", sObj, null));
		SIF.EventRegistry.trigger(new SIF.Event("objectRegistered", SIF, sObj));
		return sObj;
	} else {
		return SIF.getSmartObject(obj);
	}
}

/**
 * Retrieves the {@link SIF.Smartobject} that corresponds to the given jQuery object.
 * @param {jQuery} obj The object to be retrieved
 * @return {SIF.Smartobject} or <b>undefined</b>
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
	//return undefined if not found!
	return undefined;
}

/**
 * Unregisters the object. The object can either be of the
 * type {@link SIF.Smartobject} or jQuery.<br />
 * Triggers 'unregistered' on the given object.<br />
 * Triggers 'unregistered' on the {@link SIF.Smartobject}.<br />
 * Triggers 'objectUnregistered' on SIF.
 * @param {SIF.Smartobject | jQuery} obj The object to be unregistered.
 * @return void.
 */
SIF.prototype.unregisterSmartObject = function (obj) {
	//test if obj instanceof SIF.Smartobject
	var sObj;
	if (!(obj instanceof SIF.Smartobject)) {
		//if not, retrieve the corresponding object first
		sObj = this.getSmartObject (obj);
	}
	else {
		sObj = obj;
	}
	
	// Find the index of the object
	var id = this.smartobjects.indexOf( obj ); 
	
	// Chec if actually found!
	if (id != -1) {
		this.smartobjects.splice(id, 1); 
	}
	SIF.EventRegistry.trigger(new SIF.Event("unregistered", obj, null));
	SIF.EventRegistry.trigger(new SIF.Event("unregistered", sObj, null));
	SIF.EventRegistry.trigger(new SIF.Event("objectUnregistered", SIF, sObj));
}

SIF = new SIF();

jQuery.isSIF = true;

jQuery(document).ready(function () {
	
    if (jQuery.isSIF) {
    	SIF.init();
    }
});

initUser = function () {
	var user = new SIF.Smartobject();

	//get current location
	if (SIF.Connectors.browser) {
		SIF.Connectors.browser.analyze(navigator, function (data) {
			var triples = data.databank.triples();
			user.getContext().update(data, SIF.Connectors.browser)
		});
	}
	
	SIF.EventRegistry.trigger(new SIF.Event("ready", user, null));
	return user;
}

initDocument = function () {
	var document = new SIF.Smartobject();
	
	SIF.EventRegistry.trigger(new SIF.Event("ready", document, null));
	return document;
}
