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
 * Convert jQuery object into a SIF.Smartobject.
 *  @return {SIF.Smartobject}
 */
jQuery.fn.sif = function(method) {
	var args = Array.prototype.slice.call(arguments, 1),
		smartObject = SIF.getSmartObject(jQuery(this));
	if ( arguments.length ) {
		return smartObject[method].apply(smartObject, args);
	}
	return smartObject;
};

/**
 * Convert jQuery object into a SIF.Smartobject.
 * Fallback in case of namespace collision
 * @return {SIF.Smartobject}
 */
jQuery.fn.SIF_sif = function() {
	var args = Array.prototype.slice.call(arguments, 1),
		smartObject = SIF.getSmartObject(jQuery(this));
	if ( arguments.length ) {
		return smartObject[method].apply(smartObject, args);
	}
	return smartObject;
};