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
 * @fileOverview Semantic Interaction Framework - Context
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

if (!SIF.Contexts) SIF.Contexts = {};

SIF.Context = function(contextId, parentObject) {
	
	this.id = contextId;
	
	this.parentObject = parentObject;

	this.options = {};
	
	SIF.ContextManager.register(this);

};

SIF.Context.prototype.rdf = {};

SIF.Context.prototype.init = function() {
	this.rdf["noconnector"] = jQuery.rdf();
};

/**
 * Add all triples in the {jQuery.rdf} object to the current context.
 * @param {SIF.Connector} connector The connector that was used to retrieve the data. 
 * If it is 'undefined', the triples go to {this.rdf.noconnector}. 
 * @trigger Triggers the 'contextChanged' event on the parentObject.
 */
SIF.Context.prototype.update = function (rdf, connector) {
	
	if (connector === undefined) {
		var triples = rdf.databank.triples();
		triples.each(function (i, e) {
			that.rdf.noconnector.add(e);
		});
	}
	else if (!this.rdf[connector.id]) {
		this.rdf[connector.id] = jQuery.rdf();
		var that = this;
		var triples = rdf.databank.triples();
		triples.each(function (i, e) {
			that.rdf[connector.id].add(e);
		});
	}
	
	
	
	SIF.EventRegistry.trigger(new SIF.Event("contextChanged", this.parentObject, null));
}

/**
 * Removes all entities / triples from the current context.
 * @trigger Triggers the 'conextCleared' event on the parentObject.
 */
SIF.Context.prototype.clear = function () {
	
	this.rdf = {};
	
	SIF.EventRegistry.trigger(new SIF.Event("contextCleared", this.parentObject, null));
}