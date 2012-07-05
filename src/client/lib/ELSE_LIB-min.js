
var _ELSE_={};
_ELSE_._PUBSUB=function(){var messages={};var lastUid=-1;function publish(message,data){if(!messages.hasOwnProperty(message)){return false;}
function deliverMessage(){var subscribers=messages[message];var throwException=function(e){return function(){throw e;};};for(var i=0,j=subscribers.length;i<j;i++){try{subscribers[i].func(message,data);}catch(e){setTimeout(throwException(e),0);}}};deliverMessage();return true;};this._PUB=function(message,data){return publish(message,data);},this._SUB=function(message,func){if(!messages.hasOwnProperty(message)){messages[message]=[];}
var token=(++lastUid).toString();messages[message].push({token:token,func:func});return token;},this._UNSUB=function(token){for(var m in messages){if(messages.hasOwnProperty(m)){for(var i=0,j=messages[m].length;i<j;i++){if(messages[m][i].token===token){messages[m].splice(i,1);return token;}}}}
return false;}};
_ELSE_._CORE_ENGINE=(function(){var PS_CE=new _ELSE_._PUBSUB();function _saveData(data){}
return{init:function(){_ELSE_.SM=_ELSE_._STORAGE_MANAGER;PS_CE._PUB("CORE::INIT",null);PS_CE._SUB("FORM::SAVE",_saveData);}};}());