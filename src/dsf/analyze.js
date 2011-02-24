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
 * Iterates through all {@link SIF.ConnectorManager.connectors} and 
 * calls {@link SIF.Connector#analyze}. The result is passed
 * to the context of the corresponding {@link SIF.Smartobject} this.
 * {@link SIF.Smartobject#getContext()#update}. 
 * @optional {Array} filter An optional argument. If set, only
 * connectors that matches the contained names are applied.
 */
SIF.Smartobject.prototype.analyze = function (filter) {
	var that = this;
	var success = function (newRdf, connector) {
		that.getContext().update(connector.connectorId, newRdf);
	};
	
	var error = function (message) {
		//TODO: proper error handling
		//alert(message);
	}
	
	for (var i = 0; i < SIF.ConnectorManager.connectors.length; i++) {
		var connector = SIF.ConnectorManager.connectors[i];
		if (filter) {
			if ($.inArray(connector.connectorName, filter) != -1) {
				connector.analyze(this.object, success, error);
			}
		} else {
			connector.analyze(this.object, success, error);	
		}
	} 
}