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


SIF.Smartobject = function (obj) {

	if (obj == undefined) {
		// special type of object (e.g., user, document, ...)
		this.id = SIF.Utils.guid();
	} 
	else {
		if (obj.attr('id') == undefined) {
			obj.attr('id', SIF.Utils.guid());
		}
		this.id = obj.attr('id');
		this.object = obj;
	}
	this.context = new SIF.Context("object." + this.id, this);
	
	SIF.EventRegistry.trigger(new SIF.Event("ready", this, null));
}

/**
 * Needed for chaining.
 */
SIF.Smartobject.prototype.sif = function(method) {
	var args = Array.prototype.slice.call(arguments, 1),
		smartObject = SIF.getSmartObject(jQuery(this));
	if ( arguments.length ) {
		return smartObject[method].apply(smartObject, args);
	}
	return smartObject;
};

SIF.Smartobject.prototype.matches = {};

SIF.Smartobject.prototype.copy = function () {
	var copy = new SIF.Smartobject();
	copy.id = this.id;
	copy.object = this.object;
	copy.context = this.context;
	copy.matches = this.matches;
	
	return copy;
}

SIF.Smartobject.prototype.getContext = function () {
	return this.context;
}

SIF.Smartobject.prototype.clearContext = function () {
	this.context.clear();
}
