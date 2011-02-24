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
 * register the connector with a unique name
 */
SIF.Connectors.stanbol = new SIF.Connector('sif.connector.Stanbol');

SIF.Connectors.stanbol.options = {
		"stanbol_url" : "http://stanbol.demo.nuxeo.com/engines/",
		"dataType" : "application/rdf+json",
		"proxy_url" : "../../utils/proxy/proxy.php"
};

SIF.Connectors.stanbol.init = function () {
	//TODO: what needs to be initialized for stanbol?
}

SIF.Connectors.stanbol.analyze = function (obj, success, error) {
	var that = this;
	if (this.options.proxy_url) {
		$.ajax({
			type: "POST",
			success: function (data, textStatus, jqXHR) {
				setTimeout(function(){success(parseStanbolOutput(data), that)},100);
			},
			error: function (data, textStatus, jqXHR) {
				error("Could not retrieve data from stanbol!");
			},
			url: this.options.proxy_url, 
			data: {
    			proxy_url: this.options.stanbol_url, 
    			content: obj.html(),
    			format: this.options.dataType
			}
		});
	} else {
		$.ajax({
			type: "POST",
			success: function (data, textStatus, jqXHR) {
				setTimeout(success(parseStanbolOutput(data)),1000);
			},
			error: function (data, textStatus, jqXHR) {
				error("Could not retrieve data from stanbol!");
			},
			url: this.options.stanbol_url, 
			data: obj.html(),
			dataType: this.options.dataType
		});
	}
}

SIF.Connectors.stanbol.persons = function (rdf) {
	//TODO: support merging of two query sets!

	var ret = rdf
	.where('?subject <http://purl.org/dc/terms/type> <http://dbpedia.org/ontology/Person>')
	.where('?subject <http://fise.iks-project.eu/ontology/selected-text> ?name')
	.where('?subject <http://fise.iks-project.eu/ontology/confidence> ?confidence');
	
	return ret;
}

SIF.Connectors.stanbol.places = function (rdf) {	
	var ret = rdf
	.where('?subject <http://fise.iks-project.eu/ontology/entity-reference> ?object')
	.where('?subject <http://fise.iks-project.eu/ontology/entity-type> <http://dbpedia.org/ontology/Place>')
	.where('?subject <http://fise.iks-project.eu/ontology/entity-label> ?name')
	.where('?subject <http://fise.iks-project.eu/ontology/confidence> ?confidence');
		
	return ret;
}
	
parseStanbolOutput = function (data) {
		var rdf = jQuery.rdf();
		
		for (var subj in data) {
			var subject = subj.replace("\\/", "/");
			for (var pred in data[subj]) {
				var predicate = pred.replace("\\/", "/");
				if ($.isArray(data[subj][pred])) {
					for (var i = 0; i < data[subject][pred].length; i++) {
						var obj = data[subj][pred][i];
						
						var objectValue = data[subj][pred][i].value;
						var objectType = data[subj][pred][i].type;
						
						if (objectValue && objectType) {
							objectValue = objectValue.replace("\\/", "/");
							if (objectType === "uri") {
								var subjectRDF   = jQuery.rdf.resource('<' + subject +'>');
								var predicateRDF = jQuery.rdf.resource('<' + predicate +'>');
								var objectRDF    = jQuery.rdf.resource('<' + objectValue +'>');
								var triple = jQuery.rdf.triple(subjectRDF, predicateRDF, objectRDF);
								
								rdf.add(triple);
							} else if (objectType === "literal") {
								var objectDatatype = data[subj][pred][i].datatype;
								var subjectRDF = jQuery.rdf.resource('<' + subject + '>');
								var predicateRDF = jQuery.rdf.resource('<' + predicate + '>');
								try {
									var objectRDF = jQuery.rdf.literal('"' + objectValue.replace(/"/g, "\\\"") + '"');
								} catch(e) {
									console.error("error creating literal object for " + objectValue);
								}
								var triple = jQuery.rdf.triple(subjectRDF, predicateRDF, objectRDF);
							
								rdf.add(triple);
							}
							else {
								alert("Parsing ERROR: Expected type 'uri' OR 'literal', found: " + objectType + "!");
							}
						}
					}
				} else {
				//	alert("Parsing ERROR: Expected 'array', found: " + (typeof data[subj][pred]) + "!");
				}
			}
		}
		return rdf;
	}
