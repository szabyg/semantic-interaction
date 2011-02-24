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
 * @fileOverview Semantic Interaction Framework - DBPedia Connector
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

if ( !SIF.Connectors ) SIF.Connectors = {};

/**
 * register the connector with a unique name
 */
SIF.Connectors.dbpedia = new SIF.Connector('sif.connector.DBPedia');

SIF.Connectors.dbpedia.options = {
		"dbpedia_url" : "",
		"dataType" : "application/rdf+json",
		"proxy_url" : "../../utils/proxy/proxy.php"
};

SIF.Connectors.dbpedia.init = function () {
	//TODO: what needs to be initialized for dbpedia?
}

SIF.Connectors.dbpedia.query = function (uri, success, error) {
	//TODO:
}

SIF.Connectors.dbpedia.analyze = function (uri, success, error) {	
	//TODO:
}