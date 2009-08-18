
if(!YAHOO.ULT){YAHOO.ULT={};}
if(!YAHOO.ULT.CONF){YAHOO.ULT.CONF={};}
if(!YAHOO.ULT.BEACON){YAHOO.ULT.BEACON="http://geo.yahoo.com/t";}
if(!YAHOO.ULT.DOMAIN){YAHOO.ULT.DOMAIN=".yahoo.com";}
if(!YAHOO.ULT.IMG){YAHOO.ULT.IMG=new Image();}
if(typeof(YAHOO.ULT.DEBUG)==="undefined"){YAHOO.ULT.DEBUG=0;}
YAHOO.ULT.DELIMITERS={'/':'P',';':'1','?':'P','&':'1','#':'P'};(function(){var YLT=YAHOO.ULT;YLT.set_href=function(el,data,keyname){if(data.html){el.href=data[keyname];el.innerHTML=data.html;}else{el.href=data[keyname];}};YLT.strip_rd=function(u,data){var idx=u.indexOf('/**');if(idx!=-1){data.clean=u.substr(idx+3);data.clean=decodeURIComponent(data.clean);}
return data;};YLT.strip=function(u){var delims=YLT.DELIMITERS;var data={url:u,clean:'',cookie:'',keys:[]};var idx=0;while(u.indexOf('_yl',idx)!=-1){var start=u.indexOf('_yl',idx);if(idx<start){data.clean+=u.slice(idx,start-1);}
idx=start+3;if(delims[u.charAt(start-1)]&&u.charAt(start+4)==='='){data.ult=1;var key="_yl"+u.charAt(start+3);var value="";for(start=start+5;start<u.length&&!delims[u.charAt(start)];start++){value+=u.charAt(start);}
data.keys.push(key);data[key]=value;if(key!='_ylv'){data.cookie+="&"+key+"="+value;}
if(delims[u.charAt(start)]&&delims[u.charAt(start)]=='P'){data.clean+=u.charAt(start);}
idx=start+1;}else{data.clean+=u.slice(start-1,idx);}}
if(data.ult){data.cookie=data.cookie.substr(1);data.clean+=u.substr(idx);YLT.strip_rd(u,data);}
return data;};YLT.clnclk=function(e,data){var el=e.target||e.srcElement;if(data._ylv==3){var cook="D="+data.cookie+"; Max-Age=10; Path=/; Domain="+YLT.DOMAIN;document.cookie=cook;}else{var src=YLT.BEACON+"?"+data.cookie+'&t='+Math.random();if(e.altKey||e.ctrlKey||e.shiftKey||e.metaKey||data.target=="_blank"){}else{YLT.IMG.onerror=YLT.IMG.onload=function(){location=data.clean;};YAHOO.util.Event.preventDefault(e);}
YLT.IMG.src=src;}};YLT.clicked=function(e,data){var el=e.target||e.srcElement;if(el.nodeName!=="A"){if(el.parentNode.nodeName==="A"){el=el.parentNode;}}
if(data._ylv==3){YLT.set_href(el,data,"clean");var cook="D="+data.cookie+"; Max-Age=10; Path=/; Domain="+YLT.DOMAIN;document.cookie=cook;}else if(e.altKey||e.ctrlKey||e.shiftKey||e.metaKey){}else if(data._ylv==8||data._ylv==9){}else{var src=YLT.BEACON+"?"+data.cookie+'&t='+Math.random();if(data.target=="_blank"){YLT.set_href(el,data,"clean");}else{YLT.IMG.onerror=YLT.IMG.onload=function(){location=data.clean;};YAHOO.util.Event.preventDefault(e);}
YLT.IMG.src=src;}};YLT.revert=function(e,data){var el=e.target||e.srcElement;if(el.nodeName==="A"){YLT.set_href(el,data,"url");}else{if(el.parentNode.nodeName==="A"){el.parentNode.href=data.url;}}};YLT.clean=function(){YLT.isIE=(typeof(ActiveXObject)=='function');if(navigator.userAgent.toLowerCase().indexOf("safari")!=-1){YLT.isSafari=true;}
var el,data,name;for(var i=0;i<document.links.length;i++){el=document.links[i];if(el.className.indexOf('yltasis')!=-1){continue;}
data=YLT.strip(el.getAttribute('href',2));if(!data.ult){continue;}else if(YLT.isSafari&&data._ylv!=3){continue;}
for(name=0;name<data.keys.length;name++){if(data.keys[name]!='_ylv'){delete data[data.keys[name]];}}
delete data.keys;delete data.ult;data.target=el.target;if(YLT.isIE&&(el.innerHTML.indexOf('http')===0||el.className.indexOf('yltiefix')!=-1)){data.html=el.innerHTML;}
YLT.set_href(el,data,"clean");if(YLT.CONF.cleanest){YAHOO.util.Event.addListener(el,'click',YLT.clnclk,data);}else{YAHOO.util.Event.addListener(el,'click',YLT.clicked,data);YAHOO.util.Event.addListener(el,'mousedown',YLT.revert,data);}}};})();window.setTimeout(function(){YAHOO.ULT.clean();},1);