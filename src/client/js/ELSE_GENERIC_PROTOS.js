/* ============================================================================
	ELSE_GENERIC_PROTOS.js
	is part of ELSE, the Extended Library for Surveys Engine
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

// ============================================================================
// Function
// ----------------------------------------------------------------------------
Function.prototype.createDelegate = function(scope) {
	var fn = this;
	return function() {
		// Forward to the original function using 'scope' as 'this'.
		return fn.apply(scope, arguments);
	};
};

Function.prototype.repeat = function(delay,args,scope){
	var fn = this.createDelegate(scope||window,args);
	return setInterval(fn, delay);
};

Function.prototype.defer = function(delay, scope, args) {
	var fn = this.createDelegate(scope, args);
	return setTimeout(fn, delay);
	fn();
};

// ============================================================================
// Array
// ----------------------------------------------------------------------------

Array.prototype.swap = function(src, dst) {
	tmp = this[dst];
	this[dst] = this[src];
	this[src] = tmp;
};

Array.prototype.replace = function(dst, content) {
	this.splice(dst,1, content); 
}

Array.prototype.moveTo = function(src, dest) {
	if (dest >= this.length) {
		var k = dest - this.length;
		while ((k--) + 1) {
			this.push(undefined);
		}
	}
	this.splice(dest, 0, this.splice(src, 1)[0]);
};

Array.prototype.kill = function(indice) {
	this.splice (indice, 1);
};

// ============================================================================
// Node : Class manipulation prototypes
// ----------------------------------------------------------------------------

Node.prototype.hasClass = function(sClass) {
	return this.className.match(new RegExp('(\\s|^)'+sClass+'(\\s|$)'));
}

Node.prototype.addClass = function(sClass) {
	if (!this.hasClass(sClass)) {
		this.className += " "+sClass;
	}
}

Node.prototype.removeClass = function(sClass) {
	if (this.hasClass(sClass)) {
		var reg = new RegExp('(\\s|^)'+sClass+'(\\s|$)');
		this.className = this.className.replace(reg,' ');
	}
}
//=============================================================================

