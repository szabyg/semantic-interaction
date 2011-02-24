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
 * @fileOverview Semantic Interaction Framework - ContextManager
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

/**
 * A {@link SIF.ContextManager} manages all {@link SIF.Context}s in the semantic
 * interaction framework.
 * 
 * @namespace SIF.ContextManager
 * @class SIF.ContextManager
 * @constructor
 * @singleton
 */
SIF.ContextManager = function() {};

/**
 * Contains all registered objects of type {@link SIF.Context} in {@link SIF}.
 * @property
 * @type Array
 */
SIF.ContextManager.prototype.contexts = [];

/**
 * Initialize the {@link SIF.ContextManager}.
 * @return void.
 */
SIF.ContextManager.prototype.init = function() {
};

SIF.ContextManager.prototype.register = function(context) {

	if (context instanceof SIF.Context) {
		this.contexts.push(context); 	
	} else {
		alert("Trying to register a context which is not an instance of SIF.Context.");
	}
};

SIF.ContextManager = new SIF.ContextManager();

SIF.ContextManager.toString = function() {
	return "SIF.ContextManager";
};