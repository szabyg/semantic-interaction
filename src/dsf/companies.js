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
 * @fileOverview Semantic Interaction Framework - DSF - Companies
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

/**
 * Retrieves and !filters! all companies from a {@link SIF.Smartobject}.
 * A company has a name, latitude, longitude, url.
 * @example
 * var company = 
 * {
 *   name      : "DFKI GmbH",
 *   latitude  : "49.23485",
 *   longitude : "6.994402",
 *   url       : "http://www.dfki.de"
 * }
 * @return {Object}
 */

SIF.Smartobject.prototype.companies = function () {
	var copy = this.copy();
	for (var i = 0; i < SIF.ConnectorManager.connectors.length; i++) {
		var connector = SIF.ConnectorManager.connectors[i];
		var connectorId = connector.id;
		if (connector.companies) {
			var rdf = copy.getContext().rdf[connectorId];
			if (rdf) {
				copy.matches[connectorId] = connector.companies(rdf);
			} else {
				copy.matches[connectorId] = jQuery.rdf();
			}
		}
	}
	return copy;
}