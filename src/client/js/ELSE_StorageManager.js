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
_ELSE_._STORAGE_MANAGER = (function() {

	var _HAS_SESSION_STORAGE	= false;
	var _HAS_LOCAL_STORAGE		= false;
	var _USE_CRYPT					= false;
	var _CRYPTKEY					= null;
	
	function _getKeyPass() {
			return _CRYPTKEY.substr(6, 16);
	}

	return {
	
		/**
		 * Called by CoreEngine for custom initailizations
		 * @param boolean bUseCrypt
		 */
		initialize : function(bUseCrypt, sCryptKey) {
			_USE_CRYPT = bUseCrypt || false;
			_CRYPTKEY = sCryptKey || null;

			if	(window.sessionStorage) {
				_HAS_SESSION_STORAGE = true;
			}
			if (window.localStorage) {
				_HAS_LOCAL_STORAGE = true;
			}			
		},

		/**
		 * Write data in localStorage. LocalStorage accept string only,
		 * if value is an object it will be converted with JSON.stringify
		 *
		 * @param K string Key index
		 * @param V Mixed  Value
		 * @param bIsObject {Boolean} true : if V is an object
		 *							         false : V is a string
		 *
		 * @return {Boolean} true si l'écriture dans le localStorage est un succès, sinon false
		 */
		L_WRITE : function(K, V, bIsObject) {
			bIsObject = bIsObject || false;

			var str = V;
			if (true === bIsObject) {
				str = JSON.stringify(V);
			}

			if (_USE_CRYPT) {
				str = _ELSE_._XXTEA.encrypt(str, _getKeyPass());
			}

			try {
				window.localStorage.setItem(K, str);
				return true;
			}
			catch (e) {
				console.error(e);
				return false;
			}
			return false;
		},

		/**
		 * Read data from localStorage.
		 * If we want an object (bAsObject == true) we use JSON.parse
		 *
		 * @param K String Key index
		 * @param bAsObject Boolean true : we want an object
		 *							  		false : return stored string
		 *
		 * @return mixed value (string or object) or false 
		 */
		L_READ : function(K, bAsObject) {
			bAsObject = bAsObject || false;
			try {
				var str = window.localStorage.getItem(K);
				
				if ( null == str ) {
					return false;
				}
				
				if (_USE_CRYPT) {
					str = _ELSE_._XXTEA.decrypt(str, _getKeyPass());
				}
				
				return (bAsObject == true)? JSON.parse(str) : str;
			}
			catch(e) {
				return false;
			}

			return false;
		},

		/**
		 * Removing the value for a given named key in localStorage
		 *
		 * @param K string The key
		 *
		 * @return boolean true if success, false otherwise
		 */
		L_DELETE : function(K) {
			try {
				window.localStorage.removeItem(K);
				return true;
			}
			catch(e) {
				console.error(e);
				return false;
			}
			return false;
		},

		/**
		 * Clear the entire localStorage
		 *
		 * @return boolean true if success, false otherwise
		 */
		L_CLEAR : function() {
			try {
				window.localStorage.clear();
				return true;
			}
			catch(e) {
				console.error(e);
				return false;
			}
		},
		

		/**
		 * Ecrit la donnée V à l'index K dans le sessionStorage
		 *
		 * @param K {String} Index à utiliser pour écrire la donnée
		 * @param V {String} Donnée à stocker
		 */
		S_WRITE : function(K, V) {
			window.sessionStorage.setItem(K, V);
		},

		/**
		 * Lit la valeur à l'index K depuis le sessionStorage
		 *
		 * @param K {String} Index à utiliser pour lire la donnée
		 */
		S_READ : function(K) {
			return window.sessionStorage.getItem(K);
		},


		/**
		 * Removing the value for a given named key in sessionStorage
		 * 
		 * @param K {String} Index à utiliser pour la suppression
		 */
		S_DELETE : function(K) {
			window.sessionStorage.removeItem(K);
		},

		/**
		 * Clear the entire sessionStorage
		 */
		S_CLEAR : function() {
			window.sessionStorage.clear();
		},

	}

}());

_ELSE_.SM = _ELSE_._STORAGE_MANAGER;

