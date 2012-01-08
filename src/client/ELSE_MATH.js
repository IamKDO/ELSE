/* ============================================================================
	ELSE_MATH.js is part of ELSE, the Extended Library for Surveys Engine
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

_ELSE_.abs		= Math.abs;
_ELSE_.acos		= Math.acos;
_ELSE_.asin		= Math.asin;
_ELSE_.atan		= Math.atan;
_ELSE_.ceil 	= Math.ceil;
_ELSE_.cos		= Math.cos;
_ELSE_.floor	= Math.floor;
_ELSE_.max		= Math.max;
_ELSE_.min		= Math.min;
_ELSE_.pow		= Math.pow;
_ELSE_.round	= Math.round;
_ELSE_.sin		= Math.sin;
_ELSE_.sqrt		= Math.sqrt;

// Prototypes -----------------------------------------------------------------
Number.prototype.between = function(min, max) {
	return (this < min || this > max) ? false : true;
};


