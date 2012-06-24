
_ELSE_._STORAGE_MANAGER=(function(){var _HAS_SESSION_STORAGE=false;var _HAS_LOCAL_STORAGE=false;var _USE_CRYPT=false;var _CRYPTKEY=null;function _getKeyPass(){return _CRYPTKEY.substr(6,16);}
return{initialize:function(bUseCrypt,sCryptKey){_USE_CRYPT=bUseCrypt||false;_CRYPTKEY=sCryptKey||null;if(window.sessionStorage){_HAS_SESSION_STORAGE=true;}
if(window.localStorage){_HAS_LOCAL_STORAGE=true;}},L_WRITE:function(K,V,bIsObject){bIsObject=bIsObject||false;var str=V;if(true===bIsObject){str=JSON.stringify(V);}
if(_USE_CRYPT){str=_ELSE_._XXTEA.encrypt(str,_getKeyPass());}
try{window.localStorage.setItem(K,str);return true;}
catch(e){console.error(e);return false;}
return false;},L_READ:function(K,bAsObject){bAsObject=bAsObject||false;try{var str=window.localStorage.getItem(K);if(null==str){return false;}
if(_USE_CRYPT){str=_ELSE_._XXTEA.decrypt(str,_getKeyPass());}
return(bAsObject==true)?JSON.parse(str):str;}
catch(e){return false;}
return false;},L_DELETE:function(K){try{window.localStorage.removeItem(K);return true;}
catch(e){console.error(e);return false;}
return false;},L_CLEAR:function(){try{window.localStorage.clear();return true;}
catch(e){console.error(e);return false;}},S_WRITE:function(K,V){window.sessionStorage.setItem(K,V);},S_READ:function(K){return window.sessionStorage.getItem(K);},S_DELETE:function(K){window.sessionStorage.removeItem(K);},S_CLEAR:function(){window.sessionStorage.clear();},}}());_ELSE_.SM=_ELSE_._STORAGE_MANAGER;