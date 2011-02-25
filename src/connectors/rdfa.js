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

if ( !SIF.Connectors ) SIF.Connectors = {};

/**
 * register the connector with a unique name
 */
SIF.Connectors.rdfa = new SIF.Connector('sif.connector.Rdfa');

SIF.Connectors.rdfa.options = {};

SIF.Connectors.rdfa.init = function () {
	//TODO: what needs to be initialized for rdfa?
}

SIF.Connectors.rdfa.analyze = function (obj, success, error) {
	if (jQuery.type(obj) === 'object') {
		for (var i = 0; i < obj.length; i++) {
			var rdfa = $(obj[i]).rdfa();
			success(rdfa, this);
		}
	}
	else {
		error("Can only handle jQuery objects!");
	}
}

