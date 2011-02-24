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
 * @fileOverview Semantic Interaction Framework - Connector
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

if (!SIF.Connectors) SIF.Connectors = {};

/**
 * A {@link SIF.Connector} is the connection between a (semantic) back-end and the semantic
 * interaction framework.
 * 
 * @namespace SIF.Connector
 * @class SIF.Connector The parent class to inherit connector functionality from.
 * @see SIF.ConnectorManager#register
 * @param {String} connectorId A unique id for the connector.
 * @param {String} connectorName (optional) A name for the connector.
 * @constructor
 */
SIF.Connector = function(connectorId, connectorName) {
	
	this.connectorId = connectorId;
	this.connectorName = (connectorName) ? connectorName : connectorId;

	SIF.ConnectorManager.register(this);
};

/**
 * {@link SIF.Connector} specific options
 * @property
 * @type Object
 */
SIF.Connector.prototype.options = {};

/**
 * Initialize {@link SIF.Connector}.<br />
 * To be overwritten!
 * @return void.
 */
SIF.Connector.prototype.init = function() {};

/**
 * Analyzes the given object and passes a
 * {@link jQuery.rdf} object to the success callback.
 * Passes a {@link String} to the error callback if
 * something went wrong.<br />
 * This is an asynchronous function.
 * @param {Object} obj The object to be analyzed.
 * @param {Function} success The success callback. Retrieves {@link jQuery.rdf}.
 * @param {Function} error The error callback. Retrieves {@link String}.
 * @return void
 */
SIF.Connector.prototype.analyze = function (obj, success, error) {};

/**
 * Queries the backend for all triples regarding the given entity. 
 * @param {Object} obj The object to be queried for.
 * @param {Function} success The success callback. Retrieves {@link jQuery.rdf}.
 * @param {Function} error The error callback. Retrieves {@link String}.
 * @return void
 */
SIF.Connector.prototype.query = function (obj, success, error) {};

/**
 * Serializes the annotation of the knowledge in the object.
 * @param {Object} obj The object to be queried for.
 * @param {jQuery.rdf} rdf The RDF data to be serialized.
 * @param {Function} success The success callback. Retrieves the {@link jQuery} object.
 * @param {Function} error The error callback. Retrieves {@link String}.
 * @return void
 */
SIF.Connector.prototype.serialize = function (obj, rdf, success, error) {};