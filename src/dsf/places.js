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
 * @fileOverview Semantic Interaction Framework - Places
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

/**
 * Retrieve all places from a {@link SIF.Smartobject}.
 * A place has a name.
 * @example
 * var place = 
 * {
 *   name : "Vienna"
 * }
 * @return {Object}
 */
SIF.Smartobject.prototype.places = function () {
	var copy = this.copy();
	for (var i = 0; i < SIF.ConnectorManager.connectors.length; i++) {
		var connector = SIF.ConnectorManager.connectors[i];

		if (connector.places) {
			var rdf = copy.getContext().rdf[connector.id];
			if (rdf) {
				copy.matches[connector.id] = connector.places(rdf);
			} else {
				copy.matches[connector.id] = jQuery.rdf();
			}
		}
	}
	return copy;
}