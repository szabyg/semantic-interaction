/*
 * Copyright 2011 IKS Project
 * Copyright 2011 SIF Software GmbH, Vienna
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
 * @fileOverview Semantic Interaction Framework - DSF - Analysis
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

/**
 * Iterates through all {@link SIF.ConnectorManager.connectors} and 
 * calls {@link SIF.Connector#analyze}. The result is passed
 * to the context of the corresponding {@link SIF.Smartobject} this.
 * {@link SIF.Smartobject#getContext()#update}. 
 * @optional {Array} filter An optional argument. If set, only
 * connectors that matches the contained names are applied.
 * @return {SIF.Smartobject} The object itself
 */
SIF.Smartobject.prototype.analyze = function (filter) {
	var that = this;
	var success = function (newRdf, connector) {
		that.getContext().update(newRdf, connector);
	};
	
	var error = function (message) {
		SIF.Log.log("warn", "SIF.Smartobject.analyze", message);
	}
	
	$.each (SIF.ConnectorManager.connectors, function () {
		if (filter) {
			if ($.inArray(this.id, filter) != -1) {
				this.analyze(that.object, success, error);
			}
		} else {
			this.analyze(that.object, success, error);	
		}
	});
	
	return this;
}
