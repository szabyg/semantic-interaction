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
 * Convert jQuery object into a SIF.Smartobject, e.g., 
 * $(this).sif();
 *  @return {SIF.Smartobject}
 */
jQuery.fn.sif = function() {
	var sObj = SIF.getSmartObject(this);
	if (sObj == undefined) {
		sObj = SIF.registerSmartObject(jQuery(this));
	}
	return sObj;
};

/**
 * Convert jQuery object into a SIF.Smartobject, e.g., 
 * $(this).SIF_sif();
 * Fallback in case of namespace collision
 * @return {SIF.Smartobject}
 */
jQuery.fn.SIF_sif = function() {
	var sObj = SIF.getSmartObject(this);
	if (sObj == undefined) {
		sObj = SIF.registerSmartObject(jQuery(this));
	}
	return sObj;
};

/**
 * Convert jQuery object into a SIF.Smartobject, e.g., 
 * $.sif(this);
 * @param {jQuery} obj The object to be registered
 * @return {SIF.Smartobject} or 'undefined'
 */
jQuery.sif = function(obj) {
	if (obj == undefined) {
		return undefined;
	} else {
		var sObj = SIF.getSmartObject(obj);
		if (sObj == undefined) {
			sObj = SIF.registerSmartObject(jQuery(obj));
		}
		return sObj;
	}
};

/**
 * Convert jQuery object into a SIF.Smartobject, e.g., 
 * $.SIF_sif(this);
 * Fallback in case of namespace collision
 * @param {jQuery} obj The object to be registered
 * @return {SIF.Smartobject} or 'undefined'
 */
jQuery.SIF_sif = function(obj) {
	if (obj == undefined) {
		return undefined;
	} else {
		var sObj = SIF.getSmartObject(obj);
		if (sObj == undefined) {
			sObj = SIF.registerSmartObject(jQuery(obj));
		}
		return sObj;
	}
};