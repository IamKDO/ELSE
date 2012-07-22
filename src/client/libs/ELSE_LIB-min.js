
var _ELSE_={};
Function.prototype.createDelegate=function(scope){var fn=this;return function(){return fn.apply(scope,arguments);};};Function.prototype.repeat=function(delay,args,scope){var fn=this.createDelegate(scope||window,args);return setInterval(fn,delay);};Function.prototype.defer=function(delay,scope,args){var fn=this.createDelegate(scope,args);return setTimeout(fn,delay);fn();};Array.prototype.swap=function(src,dst){tmp=this[dst];this[dst]=this[src];this[src]=tmp;};Array.prototype.replace=function(dst,content){this.splice(dst,1,content);};Array.prototype.moveTo=function(src,dest){if(dest>=this.length){var k=dest-this.length;while((k--)+1){this.push(undefined);}}
this.splice(dest,0,this.splice(src,1)[0]);};Array.prototype.kill=function(indice){this.splice(indice,1);};Node.prototype.hasClass=function(sClass){return this.className.match(new RegExp('(\\s|^)'+sClass+'(\\s|$)'));};Node.prototype.addClass=function(sClass){if(!this.hasClass(sClass)){this.className+=" "+sClass;}};Node.prototype.removeClass=function(sClass){if(this.hasClass(sClass)){var reg=new RegExp('(\\s|^)'+sClass+'(\\s|$)');this.className=this.className.replace(reg,' ');}};
_ELSE_._HASH=(function(){var hexcase=0;function rstr_sha1(s){return binb2rstr(binb_sha1(rstr2binb(s),s.length*8));}
function rstr2hex(input){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++){x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&0x0F)+hex_tab.charAt(x&0x0F);}
return output;}
function str2rstr_utf8(input){var output="";var i=-1;var x,y;while(++i<input.length){x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF){x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);i++;}
if(x<=0x7F)
output+=String.fromCharCode(x);else if(x<=0x7FF)
output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));else if(x<=0xFFFF)
output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));else if(x<=0x1FFFFF)
output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));}
return output;}
function str2rstr_utf16le(input){var output="";for(var i=0;i<input.length;i++)
output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);return output;}
function str2rstr_utf16be(input){var output="";for(var i=0;i<input.length;i++)
output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);return output;}
function rstr2binb(input){var output=Array(input.length>>2);for(var i=0;i<output.length;i++){output[i]=0;}
for(var i=0;i<input.length*8;i+=8){output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(24-i%32);}
return output;}
function binb2rstr(input){var output="";for(var i=0;i<input.length*32;i+=8)
output+=String.fromCharCode((input[i>>5]>>>(24-i%32))&0xFF);return output;}
function binb_sha1(x,len){x[len>>5]|=0x80<<(24-len%32);x[((len+64>>9)<<4)+15]=len;var w=Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++){if(j<16)w[j]=x[i+j];else w[j]=bit_rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);var t=safe_add(safe_add(bit_rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=bit_rol(b,30);b=a;a=t;}
a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde);}
return Array(a,b,c,d,e);}
function sha1_ft(t,b,c,d){if(t<20)return(b&c)|((~b)&d);if(t<40)return b^c^d;if(t<60)return(b&c)|(b&d)|(c&d);return b^c^d;}
function sha1_kt(t){return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}
function rstr_md5(s){return binl2rstr(binl_md5(rstr2binl(s),s.length*8));}
function rstr2binl(input){var output=Array(input.length>>2);for(var i=0;i<output.length;i++){output[i]=0;}
for(var i=0;i<input.length*8;i+=8){output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32);}
return output;}
function binl2rstr(input){var output="";for(var i=0;i<input.length*32;i+=8){output+=String.fromCharCode((input[i>>5]>>>(i%32))&0xFF);}
return output;}
function binl_md5(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}
return Array(a,b,c,d);}
function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}
function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}
function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}
function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}
function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}
function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}
return{sha1:function(s){return rstr2hex(rstr_sha1(str2rstr_utf8(s)));},raw_sha1:function(s){return rstr2hex(rstr_sha1(s));},md5:function(s){return rstr2hex(rstr_md5(str2rstr_utf8(s)));},raw_md5:function(s){return rstr2hex(rstr_md5(s));}};}());
_ELSE_._XXTEA=(function(){var BASE64_CODE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function strToLongs(s){var l=new Array(Math.ceil(s.length/4));for(var i=0;i<l.length;i++){l[i]=s.charCodeAt(i*4)+(s.charCodeAt(i*4+1)<<8)+
(s.charCodeAt(i*4+2)<<16)+(s.charCodeAt(i*4+3)<<24);}
return l;};function longsToStr(l){var a=new Array(l.length);for(var i=0;i<l.length;i++){a[i]=String.fromCharCode(l[i]&0xFF,l[i]>>>8&0xFF,l[i]>>>16&0xFF,l[i]>>>24&0xFF);}
return a.join('');};function BASE64_encode(str,utf8encode){utf8encode=(typeof utf8encode=='undefined')?false:utf8encode;var o1,o2,o3,bits,h1,h2,h3,h4,e=[],pad='',c,plain,coded;var b64=BASE64_CODE;plain=utf8encode?UTF8_encode(str):str;c=plain.length%3;if(c>0){while(c++<3){pad+='=';plain+='\0';}}
for(c=0;c<plain.length;c+=3){o1=plain.charCodeAt(c);o2=plain.charCodeAt(c+1);o3=plain.charCodeAt(c+2);bits=o1<<16|o2<<8|o3;h1=bits>>18&0x3f;h2=bits>>12&0x3f;h3=bits>>6&0x3f;h4=bits&0x3f;e[c/3]=b64.charAt(h1)+b64.charAt(h2)+b64.charAt(h3)+b64.charAt(h4);}
coded=e.join('');coded=coded.slice(0,coded.length-pad.length)+pad;return coded;};function BASE64_decode(str,utf8decode){utf8decode=(typeof utf8decode=='undefined')?false:utf8decode;var o1,o2,o3,h1,h2,h3,h4,bits,d=[],plain,coded;var b64=BASE64_CODE;coded=utf8decode?UTF8_decode(str):str;for(var c=0;c<coded.length;c+=4){h1=b64.indexOf(coded.charAt(c));h2=b64.indexOf(coded.charAt(c+1));h3=b64.indexOf(coded.charAt(c+2));h4=b64.indexOf(coded.charAt(c+3));bits=h1<<18|h2<<12|h3<<6|h4;o1=bits>>>16&0xff;o2=bits>>>8&0xff;o3=bits&0xff;d[c/4]=String.fromCharCode(o1,o2,o3);if(h4==0x40)d[c/4]=String.fromCharCode(o1,o2);if(h3==0x40)d[c/4]=String.fromCharCode(o1);}
plain=d.join('');return utf8decode?UTF8_decode(plain):plain;};function UTF8_encode(strUni){var strUtf=strUni.replace(/[\u0080-\u07ff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(0xc0|cc>>6,0x80|cc&0x3f);});strUtf=strUtf.replace(/[\u0800-\uffff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(0xe0|cc>>12,0x80|cc>>6&0x3F,0x80|cc&0x3f);});return strUtf;};function UTF8_decode(strUtf){var strUni=strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c){var cc=((c.charCodeAt(0)&0x0f)<<12)|((c.charCodeAt(1)&0x3f)<<6)|(c.charCodeAt(2)&0x3f);return String.fromCharCode(cc);});strUni=strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){var cc=(c.charCodeAt(0)&0x1f)<<6|c.charCodeAt(1)&0x3f;return String.fromCharCode(cc);});return strUni;};return{encrypt:function(plaintext,password){if(plaintext.length==0)return('');var v=strToLongs(UTF8_encode(plaintext));if(v.length<=1)v[1]=0;var k=strToLongs(UTF8_encode(password).slice(0,16));var n=v.length;var z=v[n-1],y=v[0],delta=0x9E3779B9;var mx,e,q=Math.floor(6+52/n),sum=0;while(q-->0){sum+=delta;e=sum>>>2&3;for(var p=0;p<n;p++){y=v[(p+1)%n];mx=(z>>>5^y<<2)+(y>>>3^z<<4)^(sum^y)+(k[p&3^e]^z);z=v[p]+=mx;}}
var ciphertext=longsToStr(v);return BASE64_encode(ciphertext);},decrypt:function(ciphertext,password){if(ciphertext.length==0)return('');var v=strToLongs(BASE64_decode(ciphertext));var k=strToLongs(UTF8_encode(password).slice(0,16));var n=v.length;var z=v[n-1],y=v[0],delta=0x9E3779B9;var mx,e,q=Math.floor(6+52/n),sum=q*delta;while(sum!=0){e=sum>>>2&3;for(var p=n-1;p>=0;p--){z=v[p>0?p-1:n-1];mx=(z>>>5^y<<2)+(y>>>3^z<<4)^(sum^y)+(k[p&3^e]^z);y=v[p]-=mx;}
sum-=delta;}
var plaintext=longsToStr(v);plaintext=plaintext.replace(/\0+$/,'');return UTF8_decode(plaintext);}};}());
_ELSE_._PUBSUB=function(){var messages={};var lastUid=-1;function publish(message,data){if(!messages.hasOwnProperty(message)){return false;}
function deliverMessage(){var subscribers=messages[message];var throwException=function(e){return function(){throw e;};};for(var i=0,j=subscribers.length;i<j;i++){try{subscribers[i].func(message,data);}catch(e){setTimeout(throwException(e),0);}}};deliverMessage();return true;};this._PUB=function(message,data){return publish(message,data);},this._SUB=function(message,func){if(!messages.hasOwnProperty(message)){messages[message]=[];}
var token=(++lastUid).toString();messages[message].push({token:token,func:func});return token;},this._UNSUB=function(token){for(var m in messages){if(messages.hasOwnProperty(m)){for(var i=0,j=messages[m].length;i<j;i++){if(messages[m][i].token===token){messages[m].splice(i,1);return token;}}}}
return false;};};
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
catch(e){console.error(e);return false;}},S_WRITE:function(K,V){window.sessionStorage.setItem(K,V);},S_READ:function(K){return window.sessionStorage.getItem(K);},S_DELETE:function(K){window.sessionStorage.removeItem(K);},S_CLEAR:function(){window.sessionStorage.clear();},};}());
_ELSE_._CORE_ENGINE=(function(){var PS_CE=new _ELSE_._PUBSUB();function _saveData(data){}
return{init:function(){_ELSE_.SM=_ELSE_._STORAGE_MANAGER;PS_CE._PUB("CORE::INIT",null);PS_CE._SUB("FORM::SAVE",_saveData);}};}());