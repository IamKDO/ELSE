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

// ELSE wrapping
_ELSE_.LEFT = function(str, len) {
	return str.left(len);
};

_ELSE_.RIGHT = function(str, len) {
	return str.right(len);
}
