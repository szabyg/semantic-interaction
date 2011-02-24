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
 * @fileOverview Semantic Interaction Framework - Events
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

/**
 * Instantiates a {SIF.Event} object.
 * @param {String} eventName The name of the event.
 * @param {Object} eventSource The source of the event.
 * @param {Object} properties The properties that come with this event.
 * @class
 */
SIF.Event = function (eventName, eventSource, properties) {
  this.name = eventName;
  if (eventSource) {
    this.source = eventSource;
  } else {
    this.source = SIF;
  }
  this.properties = properties;
};

SIF.EventRegistry = function () {};

/**
 * Subscribe to an event on a certain source.
 * @param {Object} eventSource The source object of the event.
 * @param {String} eventName The name of the event.
 * @param {Function} handleMethod The function that is called when the event is triggered.
 * @return void.
 */
SIF.EventRegistry.prototype.subscribe = function (eventSource, eventName, handleMethod) {
	SIF.Log.log("debug", "SIF.EventRegistry", eventSource + " subscribed to the event '" + eventName + "'");
	jQuery(eventSource).bind(eventName, handleMethod);
};

/**
 * Triggering an event on a certain source.
 * @param {SIF.Event} event The event to be triggered.
 * @return void.
 */
SIF.EventRegistry.prototype.trigger = function (event) {
	SIF.Log.log("debug", "SIF.EventRegistry", "triggering event '" + event.name + "' on object '" + event.source + "'");
	jQuery(event.source).trigger(event.name, event.properties);
};

SIF.EventRegistry = new SIF.EventRegistry();


