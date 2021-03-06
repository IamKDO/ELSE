var URL = '';
var Ping = null;
var PCount = 0;
self.onmessage = function(e) {  
	var _MSG = e.data;
	
	switch (_MSG.WKACTION) {
		case 'START' :
			URL = _MSG.WKDATA;
			Ping = setInterval(ping, 5000);
			break;
		case 'STOP' :
			clearInterval(Ping);
			self.close();
			break;
	}

	function ping() {
		var AJAX = new XMLHttpRequest();
		var TS = new Date().getTime().toString(16);
		
		var TO = setTimeout( function() { 
			AJAX.abort();
			self.postMessage({"connect":"FAIL"});
			clearTimeout(TO);
		}, 4500);
		AJAX.open("GET", URL+"?token="+TS, false);                             
		AJAX.send(null);
		var response = AJAX.responseText;
		if (response != '') {
			//self.postMessage(response);	
			var J = JSON.parse(response);
			if (J.token == TS) {
				self.postMessage({"connect":"OK"});	
			}
			else {
				self.postMessage({"connect":"FAIL"});	
			}
		}
		else {	
			self.postMessage({"connect":"FAIL"});	
		}
		clearTimeout(TO);	
	}
};
