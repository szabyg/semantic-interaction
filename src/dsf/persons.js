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
SIF.Dsfs.persons = new SIF.Dsf('sif.dsf.persons');

SIF.Dsfs.persons.options = {};

SIF.Dsfs.persons.connectorMappers = {};

SIF.Dsfs.persons.init = function () {
};

/**
 * Retrieve all persons from a {@link SIF.Smartobject}.
 * A person has a firstname, lastname, email and
 * affiliation.
 * @example
 * var person = 
 * {
 *   name : "Sebastian Germesin",
 *   email     : "sebastian.germesin@dfki.de",
 *   affiliation : jQuery.uri("<...>")
 * }
 * @return {Object}
 */

SIF.Smartobject.prototype.persons = function () {
	var copy = this.copy();
	copy.matches = [];
	for (var connectorId in SIF.ConnectorManager.connectors) {
		var mapper = SIF.Dsfs.persons.connectorMappers[connectorId];

		if (mapper) {
			var rdf = copy.getContext().rdf[connectorId];
			if (rdf) {
				copy.matches = copy.matches.concat(mapper(rdf, this.matches));
			}
		}
	}
	return copy;
}

/**
 * Returns an array of companies.
 */
SIF.Dsfs.persons.connectorMappers['sif.connector.Rdfa'] = function (rdf, matches) {
    var ret = [];

    rdf
    .where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdf.data-vocabulary.org/#Person>')
	.where('?subject <http://rdf.data-vocabulary.org/#affiliation> ?affiliation')
	.where('?subject <http://rdf.data-vocabulary.org/#firstname> ?name')
	.where('?subject <http://rdf.data-vocabulary.org/#mbox> ?email')
	.each (function () {
		var company =  {
				uri : this.subject,
				name : this.name.toString(),
				affiliation : this.affiliation,
				email : this.email.toString()
		};
		ret.push(company);
	});
    
	return ret;	
}

SIF.Dsfs.persons.connectorMappers['sif.connector.Stanbol'] = function (rdf, matches) {
    var ret = [];

    rdf
    .where('?subject <http://purl.org/dc/terms/type> <http://dbpedia.org/ontology/Person>')
	.where('?subject <http://fise.iks-project.eu/ontology/selected-text> ?name')
	.where('?subject <http://fise.iks-project.eu/ontology/confidence> ?confidence')
    .each (function () {
		var company =  {
				uri : this.subject,
				name : this.name.toString(),
				affiliation : undefined,
				email : undefined,
				confidence: this.confidence.toString()
		};
		ret.push(company);
	});
    
	return ret;	
}