/* ============================================================================
	ELSE_UUID.js is part of ELSE, the Extended Library for Surveys Engine
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

// UUID namspace
var UUID = {}
var UUIDNS = {
	"nil"		: "00000000-0000-0000-0000-000000000000",
	"DNS"		: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
	"URL"		: "6ba7b811-9dad-11d1-80b4-00c04fd430c8"
}

_ELSE_.UUID_NS = UUIDNS;
	
	/**
	 * Create and return a loose interpretation of V1 RFC-4122
	 * compliant UUID string. Since MAC Adress is not readable
	 * from a browser, we replace it by 48 first bits of
	 * an md5(node).
	 * Format : xxxxxxxx-xxxx-3xxx-xxxx-xxxxxxxxxxxx
	 * Author : jp.decorps@epiconcept.fr
	 */
	UUID.uuid1 = function(sNode) {
		if (sNode == undefined) sNode = "ELSE-0.1";
		var _UUID = '';
		var B = 0;
		var dorg = new Date(1582, 10, 15, 0, 0, 0, 0);
		var dnow = new Date().getTime();
		var DTime = dnow * 10000 + 0x01B21DD213814000;
		var SDTime = DTime.toString(16);
		if (SDTime.length < 15) SDTime = '0'+SDTime;
		_UUID = SDTime.substr(7,8) + '-';

		var high = parseInt(DTime / 0xffffffff).toString();
		B = high & 0xffff;
		_UUID += B.toString(16)+'-';

		B = ((high >> 16) & 0xfff) | ( 1 << 12);
		_UUID += B.toString(16)+'-';
		
		B = 0x80 | Math.floor(Math.random()*0x10);
		_UUID += B.toString(16);

		B = Math.floor(Math.random()*0xff);
		_UUID += B.toString(16)+'-';

		// since detection of anything about the machine/browser is far to buggy,
		// include 12 chars of the md5(node)
		// ----------------------------------------------------------------------
		_UUID += md5(sNode).substr(0,12);

		return _UUID;
	}
	
	/**
	 * Create and return a V3 RFC-4122 compliant UUID string.
	 * Format : xxxxxxxx-xxxx-3xxx-xxxx-xxxxxxxxxxxx
	 * Author : jp.decorps@epiconcept.fr
	 */
	UUID.uuid3 = function(pNamespace, pName) {
		var s = [], itoh = '0123456789ABCDEF';
		for (var i = 0; i <36; i++) s[i] = 0;
		NS = pNamespace;
		var BN = namespaceBin(NS);
		var md5String = rstr2hex(rstr_md5(BN+pName));
	

		// Conform to RFC-4122, section 4.3
		// =================================================
		//Set octets zero through 3 of the time_low[0-3] field to octets zero through 3 of the hash.
		for (var i=0; i<8; i++) s[i] = md5String[i];

		//Set octets zero and one of the time_mid[4-5] field to octets 4 and 5 of the hash.
		for (var i=0; i<4; i++) s[i+9] = md5String[i+8]		;

		//Set octets zero and one of the time_hi_and_version[6-7] field to octets 6 and 7 of the hash.
		for (var i=0; i<4; i++) s[i+14] = md5String[i+12];

		//Set the four most significant bits (bits 12 through 15) of the
		//time_hi_and_version field to the appropriate 4-bit version number
		s[14] = 3;// version 3

		//Set the clock_seq_hi_and_reserved[8] field to octet 8 of the hash.
		s[19] = md5String[16];s[20] = md5String[17];
	
		//Set the clock_seq_low[9] field to octet 9 of the hash.
		s[21] = md5String[18];s[22] = md5String[19];
	
		//Set the two most significant bits (bits 6 and 7) of the
	   //clock_seq_hi_and_reserved to zero and one, respectively.
		s[19] = parseInt(s[19],16); s[19] = (s[19] & 0x3) | 0x8;
		s[19] = s[19].toString(16);

		//Set octets zero through five of the node field to octets 10 through 15 of the hash.
		for (var i=0; i<12; i++) s[i+24] = md5String[i+20]

		// Insert '-'s
		s[8] = s[13] = s[18] = s[23] = '-';

		return s.join('');
		
		function namespaceBin(sUUID) {
			var uuid = [];
			var field = { 
				'time_low'     : 0, /* 32-bit */
				'time_mid'     : 0, /* 16-bit */
				'time_hi'      : 0, /* 16-bit */
				'clock_seq_hi' : 0, /* 8-bit */
				'clock_seq_low': 0, /* 8-bit */
				'node'         : [] /* 48-bit */
			}
			
			convStringToField(sUUID);
			convFieldToByte();
			var R = '';
			for (var i=0; i<16; i++) {
				R += String.fromCharCode(uuid[i]);
			}
			return R;
			
			function convStringToField(src) {
				var S = src;
				field.time_low			= parseInt(S.substr(0,8), 16);
				field.time_mid			= parseInt(S.substr(9,4), 16);
				field.time_hi			= parseInt(S.substr(14,4), 16);
				field.clock_seq_hi	= parseInt(S.substr(19,2), 16);
				field.clock_seq_low	= parseInt(S.substr(21,2), 16);
				for (var i = 0; i < 12; i+=2) {
					field.node[i/2] = parseInt(S.substr(24+i,2), 16);;	
				}	
			}
	
			function convFieldToByte() {
				uuid[0] = (field.time_low & 0xff000000) >> 24;
				uuid[1] = (field.time_low & 0x00ff0000) >> 16;
				uuid[2] = (field.time_low & 0x0000ff00) >> 8;
				uuid[3] = (field.time_low & 0x000000ff);
				uuid[4] = (field.time_mid & 0xff00) >> 8;
				uuid[5] = (field.time_mid & 0x00ff);
				uuid[6] = (field.time_hi  & 0xff00) >> 8;
				uuid[7] = (field.time_hi  & 0x00ff);
				uuid[8] = field.clock_seq_hi;
				uuid[9] = field.clock_seq_low;
				for (var i = 0; i < 6; i++) {
					uuid[10+i] = field.node[i];
				}
			}
		}
	}

	/**
	 * Create and return a V4 RFC-4122 compliant UUID string.
	 * Format : xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx
	 */

	UUID.uuid4 = function() {
		var s = [], itoh = '0123456789abcdef';
		for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);
		// Conform to RFC-4122, section 4.4
		s[14] = 4;// version 4
		s[19] = (s[19] & 0x3) | 0x8;
		// Convert to hex chars
		for (var i = 0; i <36; i++) s[i] = itoh[s[i]];
		// Insert '-'s
		s[8] = s[13] = s[18] = s[23] = '-';
		return s.join('');
	}

//}

_ELSE_.uuid1 = UUID.uuid1;
_ELSE_.uuid3 = UUID.uuid3;
_ELSE_.uuid4 = UUID.uuid4;

