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

if (!SIF.Utils) {
	SIF.Utils = function () {};
}


/**
 * Generate a unique hexadecimal string with 4 charachters
 * @return {string} 
 */
SIF.Utils.uniqeString4 = function () {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

/**
 * Generate a unique value represented as a 32 character hexadecimal string,
 * such as 21EC2020-3AEA-1069-A2DD-08002B30309D
 * @return {string} 
 */
SIF.Utils.guid = function () {
	var S4 = SIF.Utils.uniqeString4;
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

/**
 * Calculates the distances (in kilometers) between
 * to positions.
 */
SIF.Utils.distance = function (pos1, pos2) {
	var R = 6371; // km
	var d = Math.acos(
			Math.sin(pos1.latitude) * 
			Math.sin(pos2.latitude) + 
	        Math.cos(pos1.latitude) * 
	        Math.cos(pos2.latitude) *
	        Math.cos(pos2.longitude - pos1.longitude)
	        ) * R;
	return d;
}

SIF.Utils = new SIF.Utils();