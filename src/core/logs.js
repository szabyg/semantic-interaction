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

/**
 * This is the SIF Log
 * @namespace SIF
 * @class Log
 * @singleton
 */
SIF.Log = function () {};

/**
 * Log History as array of Message Objects. Every object has the properties
 * 'level', 'component' and 'message'
 * @property
 * @type Array
 * @hide
 */
SIF.Log.prototype.logHistory = null;

/**
 * Flag, which is set as soon as the highWaterMark for the log history is reached.
 * This flag is reset on every call of flushLogHistory()
 * @hide
 */
SIF.Log.prototype.highWaterMarkReached = false;

/**
 * Initialize the logging
 * @hide
 */
SIF.Log.prototype.init = function() {
	// initialize the logging options (if not present)
	if (typeof SIF.options.logLevels == 'undefined' || !SIF.options.logLevels) {
		SIF.options.logLevels = {'error' : true, 'warn' : true};
	}

	// initialize the logHistory options (if not present)
	if (typeof SIF.options.logHistory == 'undefined' || !SIF.options.logHistory) {
		SIF.options.logHistory = {};
	}
	// set the default values for the loghistory
	if (!SIF.options.logHistory.maxEntries) {
		SIF.options.logHistory.maxEntries = 100;
	}
	if (!SIF.options.logHistory.highWaterMark) {
		SIF.options.logHistory.highWaterMark = 90;
	}
	if (!SIF.options.logHistory.levels) {
		SIF.options.logHistory.levels = {'error' : true, 'warn' : true};
	}
	this.flushLogHistory();
};

/**
 * Logs a message to the console
 * @method
 * @param {String} level Level of the log ('error', 'warn' or 'info', 'debug')
 * @param {String} component Component that calls the log
 * @param {String} message log message
 */
SIF.Log.prototype.log = function(level, component, message) {
	if (typeof level == 'undefined' || !level) {
		level = 'error';
	}
	level = level.toLowerCase();

	// now check whether the log level is activated
	if (!$.inArray(SIF.options.logLevels, level)) {
		return;
	}

	this.addToLogHistory({'level' : level, 'component' : component.toString(), 'message' : message, 'date' : new Date()});
	switch (level) {
	case 'error':
		if (window.console && console.error) {
			console.error(component.toString() + ': ' + message);
		}
		break;
	case 'warn':
		if (window.console && console.warn) {
			console.warn(component.toString() + ': ' + message);
		}
		break;
	case 'info':
		if (window.console && console.info) {
			console.info(component.toString() + ': ' + message);
		}
		break;
	case 'debug':
		if (window.console && console.log) {
			console.log(component.toString() + ' [' + level + ']: ' + message);
		}
		break;
	default:
		if (window.console && console.log) {
			console.log(component.toString() + ' [' + level + ']: ' + message);
		}
		break;
	}
};

/**
 * Log a message of log level 'error'
 * @method
 * @param {String} component Component that calls the log
 * @param {String} message log message
 */
SIF.Log.prototype.error = function(component, message) {
	this.log('error', component, message);
};

/**
 * Log a message of log level 'warn'
 * @method
 * @param {String} component Component that calls the log
 * @param {String} message log message
 */
SIF.Log.prototype.warn = function(component, message) {
	this.log('warn', component, message);
};

/**
 * Log a message of log level 'info'
 * @method
 * @param {String} component Component that calls the log
 * @param {String} message log message
 */
SIF.Log.prototype.info = function(component, message) {
	this.log('info', component, message);
};

/**
 * Log a message of log level 'debug'
 * @param {String} component Component that calls the log
 * @param {String} message log message
 */
SIF.Log.prototype.debug = function(component, message) {
	this.log('debug', component, message);
};

/**
 * Check whether the given log level is currently enabled
 * @param {String} level
 * @return true when log level is enabled, false if not
 */
SIF.Log.prototype.isLogLevelEnabled = function(level) {
	return SIF.options && SIF.options.logLevels && (SIF.options.logLevels[level] == true);
};

/**
 * Check whether error logging is enabled
 * @return true if error logging is enabled, false if not
 */
SIF.Log.prototype.isErrorEnabled = function() {
	return this.isLogLevelEnabled('error');
};

/**
 * Check whether warn logging is enabled
 * @return true if warn logging is enabled, false if not
 */
SIF.Log.prototype.isWarnEnabled = function() {
	return this.isLogLevelEnabled('warn');
};

/**
 * Check whether info logging is enabled
 * @return true if info logging is enabled, false if not
 */
SIF.Log.prototype.isInfoEnabled = function() {
	return this.isLogLevelEnabled('info');
};

/**
 * Check whether debug logging is enabled
 * @return true if debug logging is enabled, false if not
 */
SIF.Log.prototype.isDebugEnabled = function() {
	return this.isLogLevelEnabled('debug');
};

/**
 * Add the given entry to the log history. Check whether the highWaterMark has been reached, and fire an event if yes.
 * @param {Object} entry entry to be added to the log history
 * @hide
 */
SIF.Log.prototype.addToLogHistory = function(entry) {
	
	if (
		// when maxEntries is set to something illegal, we do nothing (log history is disabled)
		SIF.options.logHistory.maxEntries <= 0
		// check whether the level is one we like to have logged
		|| !SIF.options.logHistory.levels[entry.level]
	) {
		return;
	}

	// first add the entry as last element to the history array
	this.logHistory.push(entry);

	// check whether the highWaterMark was reached, if so, fire an event
	if (this.highWaterMarkReached == false) {
		if (this.logHistory.length >= SIF.options.logHistory.maxEntries * SIF.options.logHistory.highWaterMark / 100) {
			// fire the event
			SIF.EventRegistry.trigger(
				new SIF.Event(
					'logFull',
					SIF.Log
				)
			);
			// set the flag (so we will not fire the event again until the logHistory is flushed)
			this.highWaterMarkReached = true;
		}
	}

	// check whether the log is full and eventually remove the oldest entries
	while (this.logHistory.length > SIF.options.logHistory.maxEntries) {
		this.logHistory.shift();
	}
};

/**
 * Get the log history
 * @return log history as array of objects
 * @hide
 */
SIF.Log.prototype.getLogHistory = function() {
	return this.logHistory;
};

/**
 * Flush the log history. Remove all log entries and reset the flag for the highWaterMark
 * @return void
 * @hide
 */
SIF.Log.prototype.flushLogHistory = function() {
	this.logHistory = [];
	this.highWaterMarkReached = false;
};

/**
 * Create the Log object
 * @hide
 */
SIF.Log = new SIF.Log();
