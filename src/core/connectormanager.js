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
 * @fileOverview Semantic Interaction Framework - ConnectorManager
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */


/**
 * A {@link SIF.ConnectorManager} manages all {@link SIF.Connector}s in the semantic
 * interaction framework.
 * 
 * @namespace SIF.ConnectorManager
 * @class SIF.ConnectorManager
 * @constructor
 * @singleton
 */
SIF.ConnectorManager = function() {};

/**
 * Contains all registered objects of type {@link SIF.Connector} in {@link SIF}.
 * @property
 * @type Array
 */
SIF.ConnectorManager.prototype.connectors = {};

/**
 * Initialize the {@link SIF.ConnectorManager}.
 * @return void.
 */
SIF.ConnectorManager.prototype.init = function() {};

/**
 * Registers an object of type {@link SIF.Connector} in the semantic
 * interaction framework.
 * @param {SIF.Connector} The connector to be registered.
 * @return void.
 */
SIF.ConnectorManager.prototype.register = function(connector) {

	if (connector instanceof SIF.Connector) {
		this.connectors[connector.id] = connector; 	
	} else {
		alert("Trying to register a connector which is not an instance of SIF.Connector.");
	}
};

/**
 * Unregisters an object of type {@link SIF.Connector} from the semantic
 * interaction framework.
 * @param {SIF.Connector} The connector to be unregistered.
 * @return void.
 */
SIF.ConnectorManager.prototype.unregister = function(connector) {
	alert("SIF.ConnectorManager.unregister to be implemented!");
};

SIF.ConnectorManager = new SIF.ConnectorManager();

