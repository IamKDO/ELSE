var URL = '';
var Ping = null;
var PCount = 0;
self.onmessage = function(e) {  
	var _MSG = e.data;
	
	switch (_MSG.WKACTION) {
		case 'START' :
			URL = _MSG.WKDATA;
			Ping = setInterval(ping, 2000);
			break;
		case 'STOP' :
			clearInterval(Ping);
			self.close();
			break;
	}

	function ping() {
		var AJAX = new XMLHttpRequest();
		
		var TO = setTimeout( function() { 
			AJAX.abort();
			self.postMessage({"connect":"FAIL"});
			clearTimeout(TO);
		}, 5000);

		AJAX.open("GET", URL, false);                             
		AJAX.send(null);
		var response = AJAX.responseText;
		if (response != '') {
			self.postMessage(response);
		}
		else {	
			self.postMessage('{"connect":"FAIL"}');	
		}
		clearTimeout(TO);	
	}
};
