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

var PubSub = {};
(function(p) {
    
	p.version = "1.0.1";
    
	var messages = {};
	var lastUid = -1;
    
	var publish = function( message, data, sync ) {
		// if there are no subscribers to this message, just return here
		if ( !messages.hasOwnProperty( message ) ) {
			return false;
		}

		var deliverMessage = function() {
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
	* PubSub.publish( message[, data] ) -> Boolean
	* - message (String): The message to publish
	* - data: The data to pass to subscribers
	* - sync (Boolean): Forces publication to be syncronous, which is more confusing, but faster
	* Publishes the the message, passing the data to it's subscribers
	**/
	p.publish = function( message, data ){
		return publish( message, data, false );
	};
    
	/**
	 * PubSub.subscribe( message, func ) -> String
	 * Subscribes the passed function to the passed message. Every returned token is unique and should be
	 * stored if you need to unsubscribe
	 * 
	 * @param	message (String): The message to subscribe to
	 * @param	func (Function): The function to call when a new message is published
	 * @return	token (String)
	 **/
	p.subscribe = function( message, func ) {
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
	};

	/**
	 * PubSub.unsubscribe( token ) -> String | Boolean
	 * Unsubscribes a specific subscriber from a specific message using the unique token
	 * 
	 * @param	token (String): The token of the function to unsubscribe
	 * @return	token (String) | false (Boolean)
	 **/
	p.unsubscribe = function( token ){
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
}(PubSub));

function clone(src) {
	// Appel du constructeur de l'instance source pour crée une nouvelle instance de la même classe
	if(typeof(src) != 'object' || src == null) {
		return srcInstance;
	}
	var newInstance = src.constructor();
	/*On parcourt les propriétés de l'objet et on les recopies dans la nouvelle instance*/
	for(var i in src) {
		newInstance[i] = src[i].clone();
	}
	return newInstance;
}

var _EE_PS = clone(PubSub);
