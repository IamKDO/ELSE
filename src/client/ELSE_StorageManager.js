/* ============================================================================
	EE_StorageManager.js
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

var EE_SM = function() {};

EE_SM.prototype._HAS_SESSION_STORAGE	= false;
EE_SM.prototype._HAS_LOCAL_STORAGE		= false;
EE_SM.prototype._HAS_INDEXEDDB			= false;

EE_SM.prototype.init = function() {
	if(window.sessionStorage) {
		EE_SM._HAS_SESSION_STORAGE = true;
	}
	if(window.localStorage) {
		EE_SM._HAS_LOCAL_STORAGE = true;
	}
}

// ============================================================================
// Session storage
// ----------------------------------------------------------------------------
EE_SM.prototype.sessionWrite = function(K, V) {
	if (EE_SM._HAS_SESSION_STORAGE == true) {
		window.sessionStorage.setItem(K, V);
		return true;
	}
	return false;
};

EE_SM.prototype.sessionRead = function(K) {
	if (EE_SM._HAS_SESSION_STORAGE == true) {
		window.sessionStorage.setItem(K, V);
		return true;
	}
	return false;
};

EE_SM.prototype.sessionDelete = function(K) {
	if (EE_SM._HAS_SESSION_STORAGE == true) {
		window.sessionStorage.removeItem(K);
		return true;
	}
	return false;
};

EE_SM.prototype.sessionClear = function() {
	if (EE_SM._HAS_SESSION_STORAGE == true) {
		window.sessionStorage.clear();
		return true;
	}
	return false;
};

// ============================================================================
// Local storage
// ----------------------------------------------------------------------------
EE_SM.prototype.localWrite = function(K, V) {
	if (EE_SM._HAS_LOCAL_STORAGE == true) {
		window.localStorage.setItem(K, V);
		return true;
	}
	return false;
};

EE_SM.prototype.localRead = function(K) {
	if (EE_SM._HAS_LOCAL_STORAGE == true) {
		window.localStorage.setItem(K, V);
		return true;
	}
	return false;
};

EE_SM.prototype.localDelete = function(K) {
	if (EE_SM._HAS_LOCAL_STORAGE == true) {
		window.localStorage.removeItem(K);
		return true;
	}
	return false;
};

EE_SM.prototype.localClear = function() {
	if (EE_SM._HAS_LOCAL_STORAGE == true) {
		window.localStorage.clear();
		return true;
	}
	return false;
};

var EE_STMNGR = new StorageManager();

