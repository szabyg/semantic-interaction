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
 * @fileOverview Semantic Interaction Framework - Persons
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

if ( !SIF.Dsfs ) SIF.Dsfs = {};

/**
 * register the dsf with a unique name
 */
SIF.Dsfs.employees = new SIF.Dsf('sif.dsf.employees');

SIF.Dsfs.employees.options = {};

SIF.Dsfs.employees.connectorMappers = {};

SIF.Dsfs.employees.init = function () {
};

/**
 * Retrieves and !filters! all employees from a {@link SIF.Smartobject}.
 * A company has a name, latitude, longitude, url.
 * @example
 * var employee = 
 * {
 *   firstname : "Sebastian",
 *   lastname  : "Germesin",
 *   email     : "sebastian.germesin@dfki.de",
 *   affiliation : jQuery.uri("<...>")
 * }
 * @return {Object}
 */
SIF.Smartobject.prototype.employees = function () {
	var copy = this.copy();
	copy.matches = {};
	for (var connectorId in SIF.ConnectorManager.connectors) {
		var mapper = SIF.Dsfs.employees.connectorMappers[connectorId];

		if (mapper) {
			var rdf = copy.getContext().rdf[connectorId];
			if (rdf) {
				copy.matches[connectorId] = mapper(rdf, this.matches);
			} else {
				copy.matches[connectorId] = [];
			}
		}
	}
	return copy;
}

/**
 * Returns an array of {@link jQuery.uri}s.
 */
SIF.Dsfs.employees.connectorMappers['sif.connector.Rdfa'] = function (rdf, matches) {
	var ret = [];
	rdf
    .where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdf.data-vocabulary.org/#Person>')
	.where('?subject <http://rdf.data-vocabulary.org/#affiliation> ?affiliation')
	.where('?subject <http://rdf.data-vocabulary.org/#firstname> ?name')
	.where('?subject <http://rdf.data-vocabulary.org/#lastname> ?lastname')
	.where('?subject <http://rdf.data-vocabulary.org/#mbox> ?email')
	.filter(function () {
		var affiliation = this.affiliation;
		var contains = false;
		$.each (matches, function () {
			if (this.uri.toString() === affiliation.toString()) {
				contains = true;
				return;
			}
		});
		return contains;
	})
	.each (function () {
		var employee =  {
				uri : this.subject,
				affiliation : this.affiliation,
				name : this.name.toString(),
				lastname : this.lastname.toString(),
				email: this.email.toString()
		};
		ret.push(employee);
	});
    
	return ret;
}