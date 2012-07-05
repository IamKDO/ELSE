/* ============================================================================
	ELSE_STRING.js is part of ELSE, the Extended Library for Surveys Engine
	Copyright (C) <2011>  <kdo@zpmag.com>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation, either version 3 of the
	License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	============================================================================
*/

String.prototype.left = function(n) { 
	if (n >= this.length) {
		return this;
	}
	return this.substr(0, n);
};


String.prototype.right = function(n) {
	var L = this.length;
	if (n >= L) {
		return this;
	}
	return this.substr(L-n, n);
};

// Trimming functions prototype -----------------------------------------------
String.prototype.trim = function() {
	return this.replace(/^\s+/, "").replace(/\s+$/, "");
};

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
};

String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
};
// ----------------------------------------------------------------------------

String.prototype.repeat = function(n) {
	return new Array( n + 1 ).join( this );
};

// ELSE wrapping
_ELSE_.CONCAT = function() {
	var R = "";
	// iterate through non-separator arguments
	for (var i = 0; i < arguments.length; i++) {
		R += arguments[i];
	}
 	return R;
};

_ELSE_.LEFT = function(str, len) {
	return str.left(len);
};

_ELSE_.LOWER = function(str) {
	return str.toLowerCase();	
};

_ELSE_.LTRIM = function(str) {
	return str.ltrim();	
};

_ELSE_.REPEAT = function(str, n) {
	return str.repeat(n);
};

_ELSE_.RIGHT = function(str, len) {
	return str.right(len);
};

_ELSE_.RTRIM = function(str) {
	return str.rtrim();
};

_ELSE_.TRIM = function(str) {
	return str.trim();
};

_ELSE_.UPPER = function(str) {
	return str.toUpperCase();
};
