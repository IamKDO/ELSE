/* ============================================================================
	ELSE_CoreEngine.js
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

//_EE_.STMNGR = new StorageManager();

_ELSE_._CORE_ENGINE = (function() {

	var PS_CE = new _ELSE_._PUBSUB();
	
	function _saveData(data) {
		
	}
	
	return {
		

		init	: function() {
			_ELSE_.SM = _ELSE_._STORAGE_MANAGER;
			
			PS_CE._PUB("CORE::INIT", null);
			
			PS_CE._SUB("FORM::SAVE", _saveData);
		}

	};
}());