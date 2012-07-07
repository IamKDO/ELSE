/* ============================================================================
	ELSE_PUBSUB.js is part of ELSE, the Extended Library for Surveys Engine
	Copyright (C) <2011>  <kdo@zpmag.com> 
	Based on the work of Morgan Roderick http://roderick.dk

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

	Copyright (c) 2010 Morgan Roderick http://roderick.dk

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
*/

_ELSE_._PUBSUB = function() {

	var messages = {};
	var lastUid = -1;

	function publish(message, data) {
		// if there are no subscribers to this message, just return here
		if ( !messages.hasOwnProperty( message ) ) {
			return false;
		}

		function deliverMessage() {
			var subscribers = messages[message];
			var throwException = function(e) {
				return function() {
					throw e;
				};
			};
			for ( var i = 0, j = subscribers.length; i < j; i++ ) {
				try {
					subscribers[i].func( message, data );
				} catch( e ) {
					setTimeout( throwException(e), 0);
				}
			}
		};
		deliverMessage();
		return true;
	};

	/**
	 * Publishes the message, passing the data to it's subscribers
	 * @param message (String): The message to publish
	 * @param data: The data to pass to subscribers
	 **/
	this._PUB = function( message, data ){
		return publish(message, data);
	},
    
	/**
	 * Subscribes the passed function to the passed message. Every returned token is unique and should be
	 * stored if you need to unsubscribe
	 * 
	 * @param	message (String): The message to subscribe to
	 * @param	func (Function): The function to call when a new message is published
	 * @return	token (String)
	 **/
	this._SUB = function( message, func ) {
		// message is not registered yet
		if ( !messages.hasOwnProperty( message ) ) {
			messages[message] = [];
		}
        
		// forcing token as String, to allow for future expansions without breaking usage
		// and allow for easy use as key names for the 'messages' object
		var token = (++lastUid).toString();
		messages[message].push( { token : token, func : func } );
        
		// return token for unsubscribing
		return token;
	},

	/**
	 * Unsubscribes a specific subscriber from a specific message using the unique token
	 * 
	 * @param	token (String): The token of the function to unsubscribe
	 * @return	token (String) | false (Boolean)
	 **/
	this._UNSUB = function(token) {
		for ( var m in messages ) {
			if ( messages.hasOwnProperty( m ) ) {
				for ( var i = 0, j = messages[m].length; i < j; i++ ) {
					if ( messages[m][i].token === token ) {
						messages[m].splice( i, 1 );
						return token;
					}
				}
			}
		}
		return false;
	};
};


