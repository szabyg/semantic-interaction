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

if ( !SIF.Contexts ) SIF.Contexts = {};

/**
 * register the context with a unique name
 */
SIF.Contexts.user = new SIF.Context('sif.context.User');

SIF.Contexts.user.options = {};

SIF.Contexts.user.rdf = jQuery.rdf();

SIF.Contexts.user.init = function () {
	//retrieve name of user
	var name = "Firstname Lastname";//DEBUG: faked
	SIF.Contexts.user.rdf
	.prefix('dbprop', 'http://dbpedia.org/property/')
	.add('<currentUser> dbprop:label "' + name + '"');

	//get current location
	SIF.Connectors.browser.analyze(navigator, function (data) {
		var triples = data.databank.triples();
		triples.each(function (i, e) {
			SIF.Contexts.user.rdf.add(e);
		});
	});
	
	SIF.EventRegistry.trigger(new SIF.Event("ready", this, null));
}