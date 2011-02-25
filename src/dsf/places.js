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

if ( !SIF.Dsfs ) SIF.Dsfs = {};

/**
 * register the dsf with a unique name
 */
SIF.Dsfs.places = new SIF.Dsf('sif.dsf.places');

SIF.Dsfs.places.options = {};

SIF.Dsfs.places.connectorMappers = {};

SIF.Dsfs.places.init = function () {
};

/**
 * Retrieve all places from a {@link SIF.Smartobject}.
 * A person has a name.
 * @example
 * var place = 
 * {
 *   name : "Vienna"
 * }
 * @return {Object}
 */
SIF.Smartobject.prototype.places = function () {
	var copy = this.copy();
	copy.matches = [];
	for (var connectorId in SIF.ConnectorManager.connectors) {
		var mapper = SIF.Dsfs.places.connectorMappers[connectorId];
		if (mapper) {
			var rdf = copy.getContext().rdf[connectorId];
			if (rdf) {
				copy.matches = copy.matches.concat(mapper(rdf, this.matches));
			}
		}
	}
	return copy;
}

SIF.Dsfs.places.connectorMappers['sif.connector.Rdfa'] = function (rdf) {
	 var ret = [];
	rdf
	.where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdf.data-vocabulary.org/#Address>')
	.where('?subject <http://rdf.data-vocabulary.org/#locality> ?name')
	.each (function () {
		var place =  {
				uri : this.subject,
				name : this.name.toString()
		};
		ret.push(place);
	});
    
	return ret;
}

SIF.Dsfs.places.connectorMappers['sif.connector.Stanbol'] = function (rdf) {
	 var ret = [];
	
	 rdf
	.where('?subject <http://fise.iks-project.eu/ontology/entity-reference> ?object')
	.where('?subject <http://fise.iks-project.eu/ontology/entity-type> <http://dbpedia.org/ontology/Place>')
	.where('?subject <http://fise.iks-project.eu/ontology/entity-label> ?name')
	.where('?subject <http://fise.iks-project.eu/ontology/confidence> ?confidence')
	.each (function () {
		var place =  {
				uri : this.subject,
				name : this.name.toString(),
				confidence : this.confidence.toString()
		};
		ret.push(place);
	});
		
	return ret;
}