/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.0
Yahoo, Dom, Event
*/

if(typeof YAHOO=="undefined"){var YAHOO={};}
YAHOO.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=YAHOO;for(j=(d[0]=="YAHOO")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};YAHOO.log=function(msg,cat,src){var l=YAHOO.widget.Logger;if(l&&l.log){return l.log(msg,cat,src);}else{return false;}};YAHOO.register=function(name,mainClass,data){var mods=YAHOO.env.modules;if(!mods[name]){mods[name]={versions:[],builds:[]};}
var m=mods[name],v=data.version,b=data.build,ls=YAHOO.env.listeners;m.name=name;m.version=v;m.build=b;m.versions.push(v);m.builds.push(b);m.mainClass=mainClass;for(var i=0;i<ls.length;i=i+1){ls[i](m);}
if(mainClass){mainClass.VERSION=v;mainClass.BUILD=b;}else{YAHOO.log("mainClass is undefined for module "+name,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(name){return YAHOO.env.modules[name]||null;};YAHOO.env.ua=function(){var o={ie:0,opera:0,gecko:0,webkit:0};var ua=navigator.userAgent,m;if((/KHTML/).test(ua)){o.webkit=1;}
m=ua.match(/AppleWebKit\/([^\s]*)/);if(m&&m[1]){o.webkit=parseFloat(m[1]);}
if(!o.webkit){m=ua.match(/Opera[\s\/]([^\s]*)/);if(m&&m[1]){o.opera=parseFloat(m[1]);}else{m=ua.match(/MSIE\s([^;]*)/);if(m&&m[1]){o.ie=parseFloat(m[1]);}else{m=ua.match(/Gecko\/([^\s]*)/);if(m){o.gecko=1;m=ua.match(/rv:([^\s\)]*)/);if(m&&m[1]){o.gecko=parseFloat(m[1]);}}}}}
return o;}();(function(){YAHOO.namespace("util","widget","example");if(typeof YAHOO_config!="undefined"){var l=YAHOO_config.listener,ls=YAHOO.env.listeners,unique=true,i;if(l){for(i=0;i<ls.length;i=i+1){if(ls[i]==l){unique=false;break;}}
if(unique){ls.push(l);}}}})();YAHOO.lang={isArray:function(o){if(o){var l=YAHOO.lang;return l.isNumber(o.length)&&l.isFunction(o.splice)&&!l.hasOwnProperty(o.length);}
return false;},isBoolean:function(o){return typeof o==='boolean';},isFunction:function(o){return typeof o==='function';},isNull:function(o){return o===null;},isNumber:function(o){return typeof o==='number'&&isFinite(o);},isObject:function(o){return(o&&(typeof o==='object'||YAHOO.lang.isFunction(o)))||false;},isString:function(o){return typeof o==='string';},isUndefined:function(o){return typeof o==='undefined';},hasOwnProperty:function(o,prop){if(Object.prototype.hasOwnProperty){return o.hasOwnProperty(prop);}
return!YAHOO.lang.isUndefined(o[prop])&&o.constructor.prototype[prop]!==o[prop];},_IEEnumFix:function(r,s){if(YAHOO.env.ua.ie){var add=["toString","valueOf"];for(i=0;i<add.length;i=i+1){var fname=add[i],f=s[fname];if(YAHOO.lang.isFunction(f)&&f!=Object.prototype[fname]){r[fname]=f;}}}},extend:function(subc,superc,overrides){if(!superc||!subc){throw new Error("YAHOO.lang.extend failed, please check that "+"all dependencies are included.");}
var F=function(){};F.prototype=superc.prototype;subc.prototype=new F();subc.prototype.constructor=subc;subc.superclass=superc.prototype;if(superc.prototype.constructor==Object.prototype.constructor){superc.prototype.constructor=superc;}
if(overrides){for(var i in overrides){subc.prototype[i]=overrides[i];}
YAHOO.lang._IEEnumFix(subc.prototype,overrides);}},augmentObject:function(r,s){if(!s||!r){throw new Error("Absorb failed, verify dependencies.");}
var a=arguments,i,p,override=a[2];if(override&&override!==true){for(i=2;i<a.length;i=i+1){r[a[i]]=s[a[i]];}}else{for(p in s){if(override||!r[p]){r[p]=s[p];}}
YAHOO.lang._IEEnumFix(r,s);}},augmentProto:function(r,s){if(!s||!r){throw new Error("Augment failed, verify dependencies.");}
var a=[r.prototype,s.prototype];for(var i=2;i<arguments.length;i=i+1){a.push(arguments[i]);}
YAHOO.lang.augmentObject.apply(this,a);},dump:function(o,d){var l=YAHOO.lang,i,len,s=[],OBJ="{...}",FUN="f(){...}",COMMA=', ',ARROW=' => ';if(!l.isObject(o)||o instanceof Date||("nodeType"in o&&"tagName"in o)){return o;}else if(l.isFunction(o)){return FUN;}
d=(l.isNumber(d))?d:3;if(l.isArray(o)){s.push("[");for(i=0,len=o.length;i<len;i=i+1){if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}
if(s.length>1){s.pop();}
s.push("]");}else{s.push("{");for(i in o){if(l.hasOwnProperty(o,i)){s.push(i+ARROW);if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}}
if(s.length>1){s.pop();}
s.push("}");}
return s.join("");},substitute:function(s,o,f){var i,j,k,key,v,meta,l=YAHOO.lang,saved=[],token,DUMP='dump',SPACE=' ',LBRACE='{',RBRACE='}';for(;;){i=s.lastIndexOf(LBRACE);if(i<0){break;}
j=s.indexOf(RBRACE,i);if(i+1>=j){break;}
token=s.substring(i+1,j);key=token;meta=null;k=key.indexOf(SPACE);if(k>-1){meta=key.substring(k+1);key=key.substring(0,k);}
v=o[key];if(f){v=f(key,v,meta);}
if(l.isObject(v)){if(l.isArray(v)){v=l.dump(v,parseInt(meta,10));}else{meta=meta||"";var dump=meta.indexOf(DUMP);if(dump>-1){meta=meta.substring(4);}
if(v.toString===Object.prototype.toString||dump>-1){v=l.dump(v,parseInt(meta,10));}else{v=v.toString();}}}else if(!l.isString(v)&&!l.isNumber(v)){v="~-"+saved.length+"-~";saved[saved.length]=token;}
s=s.substring(0,i)+v+s.substring(j+1);}
for(i=saved.length-1;i>=0;i=i-1){s=s.replace(new RegExp("~-"+i+"-~"),"{"+saved[i]+"}","g");}
return s;},trim:function(s){try{return s.replace(/^\s+|\s+$/g,"");}catch(e){return s;}},merge:function(){var o={},a=arguments,i;for(i=0;i<a.length;i=i+1){YAHOO.lang.augmentObject(o,a[i],true);}
return o;},isValue:function(o){var l=YAHOO.lang;return(l.isObject(o)||l.isString(o)||l.isNumber(o)||l.isBoolean(o));}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.3.0",build:"442"});
(function(){var Y=YAHOO.util,getStyle,setStyle,id_counter=0,propertyCache={},reClassNameCache={};var isOpera=YAHOO.env.ua.opera,isSafari=YAHOO.env.ua.webkit,isGecko=YAHOO.env.ua.gecko,isIE=YAHOO.env.ua.ie;var patterns={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var toCamel=function(property){if(!patterns.HYPHEN.test(property)){return property;}
if(propertyCache[property]){return propertyCache[property];}
var converted=property;while(patterns.HYPHEN.exec(converted)){converted=converted.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}
propertyCache[property]=converted;return converted;};var getClassRegEx=function(className){var re=reClassNameCache[className];if(!re){re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)');reClassNameCache[className]=re;}
return re;};if(document.defaultView&&document.defaultView.getComputedStyle){getStyle=function(el,property){var value=null;if(property=='float'){property='cssFloat';}
var computed=document.defaultView.getComputedStyle(el,'');if(computed){value=computed[toCamel(property)];}
return el.style[property]||value;};}else if(document.documentElement.currentStyle&&isIE){getStyle=function(el,property){switch(toCamel(property)){case'opacity':var val=100;try{val=el.filters['DXImageTransform.Microsoft.Alpha'].opacity;}catch(e){try{val=el.filters('alpha').opacity;}catch(e){}}
return val/100;case'float':property='styleFloat';default:var value=el.currentStyle?el.currentStyle[property]:null;return(el.style[property]||value);}};}else{getStyle=function(el,property){return el.style[property];};}
if(isIE){setStyle=function(el,property,val){switch(property){case'opacity':if(YAHOO.lang.isString(el.style.filter)){el.style.filter='alpha(opacity='+val*100+')';if(!el.currentStyle||!el.currentStyle.hasLayout){el.style.zoom=1;}}
break;case'float':property='styleFloat';default:el.style[property]=val;}};}else{setStyle=function(el,property,val){if(property=='float'){property='cssFloat';}
el.style[property]=val;};}
var testElement=function(node,method){return node&&node.nodeType==1&&(!method||method(node));};YAHOO.util.Dom={get:function(el){if(!el||el.tagName||el.item){return el;}
if(YAHOO.lang.isString(el)){return document.getElementById(el);}
if(el.splice){var c=[];for(var i=0,len=el.length;i<len;++i){c[c.length]=Y.Dom.get(el[i]);}
return c;}
return el;},getStyle:function(el,property){property=toCamel(property);var f=function(element){return getStyle(element,property);};return Y.Dom.batch(el,f,Y.Dom,true);},setStyle:function(el,property,val){property=toCamel(property);var f=function(element){setStyle(element,property,val);};Y.Dom.batch(el,f,Y.Dom,true);},getXY:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var parentNode=null;var pos=[];var box;var doc=el.ownerDocument;if(el.getBoundingClientRect){box=el.getBoundingClientRect();return[box.left+Y.Dom.getDocumentScrollLeft(el.ownerDocument),box.top+Y.Dom.getDocumentScrollTop(el.ownerDocument)];}
else{pos=[el.offsetLeft,el.offsetTop];parentNode=el.offsetParent;var hasAbs=this.getStyle(el,'position')=='absolute';if(parentNode!=el){while(parentNode){pos[0]+=parentNode.offsetLeft;pos[1]+=parentNode.offsetTop;if(isSafari&&!hasAbs&&this.getStyle(parentNode,'position')=='absolute'){hasAbs=true;}
parentNode=parentNode.offsetParent;}}
if(isSafari&&hasAbs){pos[0]-=el.ownerDocument.body.offsetLeft;pos[1]-=el.ownerDocument.body.offsetTop;}}
parentNode=el.parentNode;while(parentNode.tagName&&!patterns.ROOT_TAG.test(parentNode.tagName))
{if(Y.Dom.getStyle(parentNode,'display').search(/^inline|table-row.*$/i)){pos[0]-=parentNode.scrollLeft;pos[1]-=parentNode.scrollTop;}
parentNode=parentNode.parentNode;}
return pos;};return Y.Dom.batch(el,f,Y.Dom,true);},getX:function(el){var f=function(el){return Y.Dom.getXY(el)[0];};return Y.Dom.batch(el,f,Y.Dom,true);},getY:function(el){var f=function(el){return Y.Dom.getXY(el)[1];};return Y.Dom.batch(el,f,Y.Dom,true);},setXY:function(el,pos,noRetry){var f=function(el){var style_pos=this.getStyle(el,'position');if(style_pos=='static'){this.setStyle(el,'position','relative');style_pos='relative';}
var pageXY=this.getXY(el);if(pageXY===false){return false;}
var delta=[parseInt(this.getStyle(el,'left'),10),parseInt(this.getStyle(el,'top'),10)];if(isNaN(delta[0])){delta[0]=(style_pos=='relative')?0:el.offsetLeft;}
if(isNaN(delta[1])){delta[1]=(style_pos=='relative')?0:el.offsetTop;}
if(pos[0]!==null){el.style.left=pos[0]-pageXY[0]+delta[0]+'px';}
if(pos[1]!==null){el.style.top=pos[1]-pageXY[1]+delta[1]+'px';}
if(!noRetry){var newXY=this.getXY(el);if((pos[0]!==null&&newXY[0]!=pos[0])||(pos[1]!==null&&newXY[1]!=pos[1])){this.setXY(el,pos,true);}}};Y.Dom.batch(el,f,Y.Dom,true);},setX:function(el,x){Y.Dom.setXY(el,[x,null]);},setY:function(el,y){Y.Dom.setXY(el,[null,y]);},getRegion:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var region=Y.Region.getRegion(el);return region;};return Y.Dom.batch(el,f,Y.Dom,true);},getClientWidth:function(){return Y.Dom.getViewportWidth();},getClientHeight:function(){return Y.Dom.getViewportHeight();},getElementsByClassName:function(className,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag),re=getClassRegEx(className);for(var i=0,len=elements.length;i<len;++i){if(re.test(elements[i].className)){nodes[nodes.length]=elements[i];if(apply){apply.call(elements[i],elements[i]);}}}
return nodes;},hasClass:function(el,className){var re=getClassRegEx(className);var f=function(el){return re.test(el.className);};return Y.Dom.batch(el,f,Y.Dom,true);},addClass:function(el,className){var f=function(el){if(this.hasClass(el,className)){return false;}
el.className=YAHOO.lang.trim([el.className,className].join(' '));return true;};return Y.Dom.batch(el,f,Y.Dom,true);},removeClass:function(el,className){var re=getClassRegEx(className);var f=function(el){if(!this.hasClass(el,className)){return false;}
var c=el.className;el.className=c.replace(re,' ');if(this.hasClass(el,className)){this.removeClass(el,className);}
el.className=YAHOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},replaceClass:function(el,oldClassName,newClassName){if(!newClassName||oldClassName===newClassName){return false;}
var re=getClassRegEx(oldClassName);var f=function(el){if(!this.hasClass(el,oldClassName)){this.addClass(el,newClassName);return true;}
el.className=el.className.replace(re,' '+newClassName+' ');if(this.hasClass(el,oldClassName)){this.replaceClass(el,oldClassName,newClassName);}
el.className=YAHOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},generateId:function(el,prefix){prefix=prefix||'yui-gen';var f=function(el){if(el&&el.id){return el.id;}
var id=prefix+id_counter++;if(el){el.id=id;}
return id;};return Y.Dom.batch(el,f,Y.Dom,true)||f.apply(Y.Dom,arguments);},isAncestor:function(haystack,needle){haystack=Y.Dom.get(haystack);if(!haystack||!needle){return false;}
var f=function(node){if(haystack.contains&&node.nodeType&&!isSafari){return haystack.contains(node);}
else if(haystack.compareDocumentPosition&&node.nodeType){return!!(haystack.compareDocumentPosition(node)&16);}else if(node.nodeType){return!!this.getAncestorBy(node,function(el){return el==haystack;});}
return false;};return Y.Dom.batch(needle,f,Y.Dom,true);},inDocument:function(el){var f=function(el){if(isSafari){while(el=el.parentNode){if(el==document.documentElement){return true;}}
return false;}
return this.isAncestor(document.documentElement,el);};return Y.Dom.batch(el,f,Y.Dom,true);},getElementsBy:function(method,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag);for(var i=0,len=elements.length;i<len;++i){if(method(elements[i])){nodes[nodes.length]=elements[i];if(apply){apply(elements[i]);}}}
return nodes;},batch:function(el,method,o,override){el=(el&&el.tagName)?el:Y.Dom.get(el);if(!el||!method){return false;}
var scope=(override)?o:window;if(el.tagName||(!el.item&&!el.slice)){return method.call(scope,el,o);}
var collection=[];for(var i=0,len=el.length;i<len;++i){collection[collection.length]=method.call(scope,el[i],o);}
return collection;},getDocumentHeight:function(){var scrollHeight=(document.compatMode!='CSS1Compat')?document.body.scrollHeight:document.documentElement.scrollHeight;var h=Math.max(scrollHeight,Y.Dom.getViewportHeight());return h;},getDocumentWidth:function(){var scrollWidth=(document.compatMode!='CSS1Compat')?document.body.scrollWidth:document.documentElement.scrollWidth;var w=Math.max(scrollWidth,Y.Dom.getViewportWidth());return w;},getViewportHeight:function(){var height=self.innerHeight;var mode=document.compatMode;if((mode||isIE)&&!isOpera){height=(mode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight;}
return height;},getViewportWidth:function(){var width=self.innerWidth;var mode=document.compatMode;if(mode||isIE){width=(mode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth;}
return width;},getAncestorBy:function(node,method){while(node=node.parentNode){if(testElement(node,method)){return node;}}
return null;},getAncestorByClassName:function(node,className){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return Y.Dom.hasClass(el,className);};return Y.Dom.getAncestorBy(node,method);},getAncestorByTagName:function(node,tagName){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return el.tagName&&el.tagName.toUpperCase()==tagName.toUpperCase();};return Y.Dom.getAncestorBy(node,method);},getPreviousSiblingBy:function(node,method){while(node){node=node.previousSibling;if(testElement(node,method)){return node;}}
return null;},getPreviousSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getPreviousSiblingBy(node);},getNextSiblingBy:function(node,method){while(node){node=node.nextSibling;if(testElement(node,method)){return node;}}
return null;},getNextSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getNextSiblingBy(node);},getFirstChildBy:function(node,method){var child=(testElement(node.firstChild,method))?node.firstChild:null;return child||Y.Dom.getNextSiblingBy(node.firstChild,method);},getFirstChild:function(node,method){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getFirstChildBy(node);},getLastChildBy:function(node,method){if(!node){return null;}
var child=(testElement(node.lastChild,method))?node.lastChild:null;return child||Y.Dom.getPreviousSiblingBy(node.lastChild,method);},getLastChild:function(node){node=Y.Dom.get(node);return Y.Dom.getLastChildBy(node);},getChildrenBy:function(node,method){var child=Y.Dom.getFirstChildBy(node,method);var children=child?[child]:[];Y.Dom.getNextSiblingBy(child,function(node){if(!method||method(node)){children[children.length]=node;}
return false;});return children;},getChildren:function(node){node=Y.Dom.get(node);if(!node){}
return Y.Dom.getChildrenBy(node);},getDocumentScrollLeft:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);},getDocumentScrollTop:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);},insertBefore:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
return referenceNode.parentNode.insertBefore(newNode,referenceNode);},insertAfter:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
if(referenceNode.nextSibling){return referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);}else{return referenceNode.parentNode.appendChild(newNode);}}};})();YAHOO.util.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};YAHOO.util.Region.prototype.contains=function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new YAHOO.util.Region(t,r,b,l);}else{return null;}};YAHOO.util.Region.prototype.union=function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(el){var p=YAHOO.util.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Point=function(x,y){if(YAHOO.lang.isArray(x)){y=x[1];x=x[0];}
this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.3.0",build:"442"});
YAHOO.util.CustomEvent=function(type,oScope,silent,signature){this.type=type;this.scope=oScope||window;this.silent=silent;this.signature=signature||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}
var onsubscribeType="_YUICEOnSubscribe";if(type!==onsubscribeType){this.subscribeEvent=new YAHOO.util.CustomEvent(onsubscribeType,this,true);}};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(fn,obj,override){if(!fn){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}
if(this.subscribeEvent){this.subscribeEvent.fire(fn,obj,override);}
this.subscribers.push(new YAHOO.util.Subscriber(fn,obj,override));},unsubscribe:function(fn,obj){if(!fn){return this.unsubscribeAll();}
var found=false;for(var i=0,len=this.subscribers.length;i<len;++i){var s=this.subscribers[i];if(s&&s.contains(fn,obj)){this._delete(i);found=true;}}
return found;},fire:function(){var len=this.subscribers.length;if(!len&&this.silent){return true;}
var args=[],ret=true,i,rebuild=false;for(i=0;i<arguments.length;++i){args.push(arguments[i]);}
var argslength=args.length;if(!this.silent){}
for(i=0;i<len;++i){var s=this.subscribers[i];if(!s){rebuild=true;}else{if(!this.silent){}
var scope=s.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var param=null;if(args.length>0){param=args[0];}
ret=s.fn.call(scope,param,s.obj);}else{ret=s.fn.call(scope,this.type,args,s.obj);}
if(false===ret){if(!this.silent){}
return false;}}}
if(rebuild){var newlist=[],subs=this.subscribers;for(i=0,len=subs.length;i<len;++i){s=subs[i];newlist.push(subs[i]);}
this.subscribers=newlist;}
return true;},unsubscribeAll:function(){for(var i=0,len=this.subscribers.length;i<len;++i){this._delete(len-1-i);}
this.subscribers=[];return i;},_delete:function(index){var s=this.subscribers[index];if(s){delete s.fn;delete s.obj;}
this.subscribers[index]=null;},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(fn,obj,override){this.fn=fn;this.obj=YAHOO.lang.isUndefined(obj)?null:obj;this.override=override;};YAHOO.util.Subscriber.prototype.getScope=function(defaultScope){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}
return defaultScope;};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){if(obj){return(this.fn==fn&&this.obj==obj);}else{return(this.fn==fn);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var loadComplete=false;var DOMReady=false;var listeners=[];var unloadListeners=[];var legacyEvents=[];var legacyHandlers=[];var retryCount=0;var onAvailStack=[];var legacyMap=[];var counter=0;var webkitKeymap={63232:38,63233:40,63234:37,63235:39};return{POLL_RETRYS:4000,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,OBJ:3,ADJ_SCOPE:4,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,startInterval:function(){if(!this._interval){var self=this;var callback=function(){self._tryPreloadAttach();};this._interval=setInterval(callback,this.POLL_INTERVAL);}},onAvailable:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:false});retryCount=this.POLL_RETRYS;this.startInterval();},onDOMReady:function(p_fn,p_obj,p_override){if(DOMReady){setTimeout(function(){var s=window;if(p_override){if(p_override===true){s=p_obj;}else{s=p_override;}}
p_fn.call(s,"DOMReady",[],p_obj);},0);}else{this.DOMReadyEvent.subscribe(p_fn,p_obj,p_override);}},onContentReady:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:true});retryCount=this.POLL_RETRYS;this.startInterval();},addListener:function(el,sType,fn,obj,override){if(!fn||!fn.call){return false;}
if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=this.on(el[i],sType,fn,obj,override)&&ok;}
return ok;}else if(YAHOO.lang.isString(el)){var oEl=this.getEl(el);if(oEl){el=oEl;}else{this.onAvailable(el,function(){YAHOO.util.Event.on(el,sType,fn,obj,override);});return true;}}
if(!el){return false;}
if("unload"==sType&&obj!==this){unloadListeners[unloadListeners.length]=[el,sType,fn,obj,override];return true;}
var scope=el;if(override){if(override===true){scope=obj;}else{scope=override;}}
var wrappedFn=function(e){return fn.call(scope,YAHOO.util.Event.getEvent(e),obj);};var li=[el,sType,fn,wrappedFn,scope];var index=listeners.length;listeners[index]=li;if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);if(legacyIndex==-1||el!=legacyEvents[legacyIndex][0]){legacyIndex=legacyEvents.length;legacyMap[el.id+sType]=legacyIndex;legacyEvents[legacyIndex]=[el,sType,el["on"+sType]];legacyHandlers[legacyIndex]=[];el["on"+sType]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),legacyIndex);};}
legacyHandlers[legacyIndex].push(li);}else{try{this._simpleAdd(el,sType,wrappedFn,false);}catch(ex){this.lastError=ex;this.removeListener(el,sType,fn);return false;}}
return true;},fireLegacyEvent:function(e,legacyIndex){var ok=true,le,lh,li,scope,ret;lh=legacyHandlers[legacyIndex];for(var i=0,len=lh.length;i<len;++i){li=lh[i];if(li&&li[this.WFN]){scope=li[this.ADJ_SCOPE];ret=li[this.WFN].call(scope,e);ok=(ok&&ret);}}
le=legacyEvents[legacyIndex];if(le&&le[2]){le[2](e);}
return ok;},getLegacyIndex:function(el,sType){var key=this.generateId(el)+sType;if(typeof legacyMap[key]=="undefined"){return-1;}else{return legacyMap[key];}},useLegacyEvent:function(el,sType){if(this.webkit&&("click"==sType||"dblclick"==sType)){var v=parseInt(this.webkit,10);if(!isNaN(v)&&v<418){return true;}}
return false;},removeListener:function(el,sType,fn){var i,len;if(typeof el=="string"){el=this.getEl(el);}else if(this._isValidCollection(el)){var ok=true;for(i=0,len=el.length;i<len;++i){ok=(this.removeListener(el[i],sType,fn)&&ok);}
return ok;}
if(!fn||!fn.call){return this.purgeElement(el,false,sType);}
if("unload"==sType){for(i=0,len=unloadListeners.length;i<len;i++){var li=unloadListeners[i];if(li&&li[0]==el&&li[1]==sType&&li[2]==fn){unloadListeners[i]=null;return true;}}
return false;}
var cacheItem=null;var index=arguments[3];if("undefined"==typeof index){index=this._getCacheIndex(el,sType,fn);}
if(index>=0){cacheItem=listeners[index];}
if(!el||!cacheItem){return false;}
if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);var llist=legacyHandlers[legacyIndex];if(llist){for(i=0,len=llist.length;i<len;++i){li=llist[i];if(li&&li[this.EL]==el&&li[this.TYPE]==sType&&li[this.FN]==fn){llist[i]=null;break;}}}}else{try{this._simpleRemove(el,sType,cacheItem[this.WFN],false);}catch(ex){this.lastError=ex;return false;}}
delete listeners[index][this.WFN];delete listeners[index][this.FN];listeners[index]=null;return true;},getTarget:function(ev,resolveTextNode){var t=ev.target||ev.srcElement;return this.resolveTextNode(t);},resolveTextNode:function(node){if(node&&3==node.nodeType){return node.parentNode;}else{return node;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}
return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}
return y;},getXY:function(ev){return[this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else if(ev.type=="mouseover"){t=ev.fromElement;}}
return this.resolveTextNode(t);},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(ex){this.lastError=ex;return t;}}
return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}
c=c.caller;}}
return ev;},getCharCode:function(ev){var code=ev.keyCode||ev.charCode||0;if(YAHOO.env.ua.webkit&&(code in webkitKeymap)){code=webkitKeymap[code];}
return code;},_getCacheIndex:function(el,sType,fn){for(var i=0,len=listeners.length;i<len;++i){var li=listeners[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==sType){return i;}}
return-1;},generateId:function(el){var id=el.id;if(!id){id="yuievtautoid-"+counter;++counter;el.id=id;}
return id;},_isValidCollection:function(o){try{return(o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");}catch(e){return false;}},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(e){if(!loadComplete){loadComplete=true;var EU=YAHOO.util.Event;EU._ready();EU._tryPreloadAttach();}},_ready:function(e){if(!DOMReady){DOMReady=true;var EU=YAHOO.util.Event;EU.DOMReadyEvent.fire();EU._simpleRemove(document,"DOMContentLoaded",EU._ready);}},_tryPreloadAttach:function(){if(this.locked){return false;}
if(this.isIE){if(!DOMReady){this.startInterval();return false;}}
this.locked=true;var tryAgain=!loadComplete;if(!tryAgain){tryAgain=(retryCount>0);}
var notAvail=[];var executeItem=function(el,item){var scope=el;if(item.override){if(item.override===true){scope=item.obj;}else{scope=item.override;}}
item.fn.call(scope,item.obj);};var i,len,item,el;for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&!item.checkReady){el=this.getEl(item.id);if(el){executeItem(el,item);onAvailStack[i]=null;}else{notAvail.push(item);}}}
for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&item.checkReady){el=this.getEl(item.id);if(el){if(loadComplete||el.nextSibling){executeItem(el,item);onAvailStack[i]=null;}}else{notAvail.push(item);}}}
retryCount=(notAvail.length===0)?0:retryCount-1;if(tryAgain){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}
this.locked=false;return true;},purgeElement:function(el,recurse,sType){var elListeners=this.getListeners(el,sType);if(elListeners){for(var i=0,len=elListeners.length;i<len;++i){var l=elListeners[i];this.removeListener(el,l.type,l.fn,l.index);}}
if(recurse&&el&&el.childNodes){for(i=0,len=el.childNodes.length;i<len;++i){this.purgeElement(el.childNodes[i],recurse,sType);}}},getListeners:function(el,sType){var results=[],searchLists;if(!sType){searchLists=[listeners,unloadListeners];}else if(sType=="unload"){searchLists=[unloadListeners];}else{searchLists=[listeners];}
for(var j=0;j<searchLists.length;++j){var searchList=searchLists[j];if(searchList&&searchList.length>0){for(var i=0,len=searchList.length;i<len;++i){var l=searchList[i];if(l&&l[this.EL]===el&&(!sType||sType===l[this.TYPE])){results.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.OBJ],adjust:l[this.ADJ_SCOPE],index:i});}}}}
return(results.length)?results:null;},_unload:function(e){var EU=YAHOO.util.Event,i,j,l,len,index;for(i=0,len=unloadListeners.length;i<len;++i){l=unloadListeners[i];if(l){var scope=window;if(l[EU.ADJ_SCOPE]){if(l[EU.ADJ_SCOPE]===true){scope=l[EU.OBJ];}else{scope=l[EU.ADJ_SCOPE];}}
l[EU.FN].call(scope,EU.getEvent(e),l[EU.OBJ]);unloadListeners[i]=null;l=null;scope=null;}}
unloadListeners=null;if(listeners&&listeners.length>0){j=listeners.length;while(j){index=j-1;l=listeners[index];if(l){EU.removeListener(l[EU.EL],l[EU.TYPE],l[EU.FN],index);}
j=j-1;}
l=null;EU.clearCache();}
for(i=0,len=legacyEvents.length;i<len;++i){legacyEvents[i][0]=null;legacyEvents[i]=null;}
legacyEvents=null;EU._simpleRemove(window,"unload",EU._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement,db=document.body;if(dd&&(dd.scrollTop||dd.scrollLeft)){return[dd.scrollTop,dd.scrollLeft];}else if(db){return[db.scrollTop,db.scrollLeft];}else{return[0,0];}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(el,sType,fn,capture){el.addEventListener(sType,fn,(capture));};}else if(window.attachEvent){return function(el,sType,fn,capture){el.attachEvent("on"+sType,fn);};}else{return function(){};}}(),_simpleRemove:function(){if(window.removeEventListener){return function(el,sType,fn,capture){el.removeEventListener(sType,fn,(capture));};}else if(window.detachEvent){return function(el,sType,fn){el.detachEvent("on"+sType,fn);};}else{return function(){};}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var el,d=document,b=d.body;if(("undefined"!==typeof YAHOO_config)&&YAHOO_config.injecting){el=document.createElement("script");var p=d.getElementsByTagName("head")[0]||b;p.insertBefore(el,p.firstChild);}else{d.write('<scr'+'ipt id="_yui_eu_dr" defer="true" src="//:"><'+'/script>');el=document.getElementById("_yui_eu_dr");}
if(el){el.onreadystatechange=function(){if("complete"===this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready();}};}else{}
el=null;}else if(EU.webkit){EU._drwatch=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._drwatch);EU._drwatch=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}
EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}
YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(p_type,p_fn,p_obj,p_override){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){ce.subscribe(p_fn,p_obj,p_override);}else{this.__yui_subscribers=this.__yui_subscribers||{};var subs=this.__yui_subscribers;if(!subs[p_type]){subs[p_type]=[];}
subs[p_type].push({fn:p_fn,obj:p_obj,override:p_override});}},unsubscribe:function(p_type,p_fn,p_obj){this.__yui_events=this.__yui_events||{};var evts=this.__yui_events;if(p_type){var ce=evts[p_type];if(ce){return ce.unsubscribe(p_fn,p_obj);}}else{for(var i in evts){var ret=true;if(YAHOO.lang.hasOwnProperty(evts,i)){ret=ret&&evts[i].unsubscribe(p_fn,p_obj);}}
return ret;}
return false;},unsubscribeAll:function(p_type){return this.unsubscribe(p_type);},createEvent:function(p_type,p_config){this.__yui_events=this.__yui_events||{};var opts=p_config||{};var events=this.__yui_events;if(events[p_type]){}else{var scope=opts.scope||this;var silent=(opts.silent);var ce=new YAHOO.util.CustomEvent(p_type,scope,silent,YAHOO.util.CustomEvent.FLAT);events[p_type]=ce;if(opts.onSubscribeCallback){ce.subscribeEvent.subscribe(opts.onSubscribeCallback);}
this.__yui_subscribers=this.__yui_subscribers||{};var qs=this.__yui_subscribers[p_type];if(qs){for(var i=0;i<qs.length;++i){ce.subscribe(qs[i].fn,qs[i].obj,qs[i].override);}}}
return events[p_type];},fireEvent:function(p_type,arg1,arg2,etc){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(!ce){return null;}
var args=[];for(var i=1;i<arguments.length;++i){args.push(arguments[i]);}
return ce.fire.apply(ce,args);},hasEvent:function(type){if(this.__yui_events){if(this.__yui_events[type]){return true;}}
return false;}};YAHOO.util.KeyListener=function(attachTo,keyData,handler,event){if(!attachTo){}else if(!keyData){}else if(!handler){}
if(!event){event=YAHOO.util.KeyListener.KEYDOWN;}
var keyEvent=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof attachTo=='string'){attachTo=document.getElementById(attachTo);}
if(typeof handler=='function'){keyEvent.subscribe(handler);}else{keyEvent.subscribe(handler.fn,handler.scope,handler.correctScope);}
function handleKeyPress(e,obj){if(!keyData.shift){keyData.shift=false;}
if(!keyData.alt){keyData.alt=false;}
if(!keyData.ctrl){keyData.ctrl=false;}
if(e.shiftKey==keyData.shift&&e.altKey==keyData.alt&&e.ctrlKey==keyData.ctrl){var dataItem;var keyPressed;if(keyData.keys instanceof Array){for(var i=0;i<keyData.keys.length;i++){dataItem=keyData.keys[i];if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);break;}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);break;}}}else{dataItem=keyData.keys;if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);}}}}
this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(attachTo,event,handleKeyPress);this.enabledEvent.fire(keyData);}
this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(attachTo,event,handleKeyPress);this.disabledEvent.fire(keyData);}
this.enabled=false;};this.toString=function(){return"KeyListener ["+keyData.keys+"] "+attachTo.tagName+
(attachTo.id?"["+attachTo.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.3.0",build:"442"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.3.0", build: "442"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
YAHOO.widget.AutoComplete=function(G,B,J,C){if(G&&B&&J){if(J instanceof YAHOO.widget.DataSource){this.dataSource=J;}else{return ;}if(YAHOO.util.Dom.inDocument(G)){if(YAHOO.lang.isString(G)){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+G;this._elTextbox=document.getElementById(G);}else{this._sName=(G.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+G.id:"instance"+YAHOO.widget.AutoComplete._nIndex;this._elTextbox=G;}YAHOO.util.Dom.addClass(this._elTextbox,"yui-ac-input");}else{return ;}if(YAHOO.util.Dom.inDocument(B)){if(YAHOO.lang.isString(B)){this._elContainer=document.getElementById(B);}else{this._elContainer=B;}if(this._elContainer.style.display=="none"){}var D=this._elContainer.parentNode;var A=D.tagName.toLowerCase();if(A=="div"){YAHOO.util.Dom.addClass(D,"yui-ac");}else{}}else{return ;}if(C&&(C.constructor==Object)){for(var I in C){if(I){this[I]=C[I];}}}this._initContainer();this._initProps();this._initList();this._initContainerHelpers();var H=this;var F=this._elTextbox;var E=this._elContent;YAHOO.util.Event.addListener(F,"keyup",H._onTextboxKeyUp,H);YAHOO.util.Event.addListener(F,"keydown",H._onTextboxKeyDown,H);YAHOO.util.Event.addListener(F,"focus",H._onTextboxFocus,H);YAHOO.util.Event.addListener(F,"blur",H._onTextboxBlur,H);YAHOO.util.Event.addListener(E,"mouseover",H._onContainerMouseover,H);YAHOO.util.Event.addListener(E,"mouseout",H._onContainerMouseout,H);YAHOO.util.Event.addListener(E,"scroll",H._onContainerScroll,H);YAHOO.util.Event.addListener(E,"resize",H._onContainerResize,H);YAHOO.util.Event.addListener(F,"keypress",H._onTextboxKeyPress,H);YAHOO.util.Event.addListener(window,"unload",H._onWindowUnload,H);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);F.setAttribute("autocomplete","off");YAHOO.widget.AutoComplete._nIndex++;}else{}};YAHOO.widget.AutoComplete.prototype.dataSource=null;YAHOO.widget.AutoComplete.prototype.minQueryLength=1;YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.AutoComplete.prototype.delimChar=null;YAHOO.widget.AutoComplete.prototype.autoHighlight=true;YAHOO.widget.AutoComplete.prototype.typeAhead=false;YAHOO.widget.AutoComplete.prototype.animHoriz=false;YAHOO.widget.AutoComplete.prototype.animVert=true;YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;YAHOO.widget.AutoComplete.prototype.forceSelection=false;YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.AutoComplete.prototype.useIFrame=false;YAHOO.widget.AutoComplete.prototype.useShadow=false;YAHOO.widget.AutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName;};YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.AutoComplete.prototype.getListItems=function(){return this._aListItems;};YAHOO.widget.AutoComplete.prototype.getListItemData=function(A){if(A._oResultData){return A._oResultData;}else{return false;}};YAHOO.widget.AutoComplete.prototype.setHeader=function(B){if(this._elHeader){var A=this._elHeader;if(B){A.innerHTML=B;A.style.display="block";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setFooter=function(B){if(this._elFooter){var A=this._elFooter;if(B){A.innerHTML=B;A.style.display="block";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setBody=function(A){if(this._elBody){var B=this._elBody;if(A){B.innerHTML=A;B.style.display="block";B.style.display="block";}else{B.innerHTML="";B.style.display="none";}this._maxResultsDisplayed=0;}};YAHOO.widget.AutoComplete.prototype.formatResult=function(B,C){var A=B[0];if(A){return A;}else{return"";}};YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(D,A,C,B){return true;};YAHOO.widget.AutoComplete.prototype.sendQuery=function(A){this._sendQuery(A);};YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(A){return A;};YAHOO.widget.AutoComplete.prototype.destroy=function(){var B=this.toString();var A=this._elTextbox;var D=this._elContainer;this.textboxFocusEvent.unsubscribeAll();this.textboxKeyEvent.unsubscribeAll();this.dataRequestEvent.unsubscribeAll();this.dataReturnEvent.unsubscribeAll();this.dataErrorEvent.unsubscribeAll();this.containerExpandEvent.unsubscribeAll();this.typeAheadEvent.unsubscribeAll();this.itemMouseOverEvent.unsubscribeAll();this.itemMouseOutEvent.unsubscribeAll();this.itemArrowToEvent.unsubscribeAll();this.itemArrowFromEvent.unsubscribeAll();this.itemSelectEvent.unsubscribeAll();this.unmatchedItemSelectEvent.unsubscribeAll();this.selectionEnforceEvent.unsubscribeAll();this.containerCollapseEvent.unsubscribeAll();this.textboxBlurEvent.unsubscribeAll();YAHOO.util.Event.purgeElement(A,true);
YAHOO.util.Event.purgeElement(D,true);D.innerHTML="";for(var C in this){if(YAHOO.lang.hasOwnProperty(this,C)){this[C]=null;}}};YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;YAHOO.widget.AutoComplete._nIndex=0;YAHOO.widget.AutoComplete.prototype._sName=null;YAHOO.widget.AutoComplete.prototype._elTextbox=null;YAHOO.widget.AutoComplete.prototype._elContainer=null;YAHOO.widget.AutoComplete.prototype._elContent=null;YAHOO.widget.AutoComplete.prototype._elHeader=null;YAHOO.widget.AutoComplete.prototype._elBody=null;YAHOO.widget.AutoComplete.prototype._elFooter=null;YAHOO.widget.AutoComplete.prototype._elShadow=null;YAHOO.widget.AutoComplete.prototype._elIFrame=null;YAHOO.widget.AutoComplete.prototype._bFocused=true;YAHOO.widget.AutoComplete.prototype._oAnim=null;YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;YAHOO.widget.AutoComplete.prototype._bOverContainer=false;YAHOO.widget.AutoComplete.prototype._aListItems=null;YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.AutoComplete.prototype._maxResultsDisplayed=0;YAHOO.widget.AutoComplete.prototype._sCurQuery=null;YAHOO.widget.AutoComplete.prototype._sSavedQuery=null;YAHOO.widget.AutoComplete.prototype._oCurItem=null;YAHOO.widget.AutoComplete.prototype._bItemSelected=false;YAHOO.widget.AutoComplete.prototype._nKeyCode=null;YAHOO.widget.AutoComplete.prototype._nDelayID=-1;YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.AutoComplete.prototype._queryInterval=null;YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.AutoComplete.prototype._initProps=function(){var B=this.minQueryLength;if(!YAHOO.lang.isNumber(B)){this.minQueryLength=1;}var D=this.maxResultsDisplayed;if(!YAHOO.lang.isNumber(D)||(D<1)){this.maxResultsDisplayed=10;}var E=this.queryDelay;if(!YAHOO.lang.isNumber(E)||(E<0)){this.queryDelay=0.2;}var A=this.delimChar;if(YAHOO.lang.isString(A)&&(A.length>0)){this.delimChar=[A];}else{if(!YAHOO.lang.isArray(A)){this.delimChar=null;}}var C=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(!YAHOO.lang.isNumber(C)||(C<0)){this.animSpeed=0.3;}if(!this._oAnim){this._oAnim=new YAHOO.util.Anim(this._elContent,{},this.animSpeed);}else{this._oAnim.duration=this.animSpeed;}}if(this.forceSelection&&A){}};YAHOO.widget.AutoComplete.prototype._initContainerHelpers=function(){if(this.useShadow&&!this._elShadow){var A=document.createElement("div");A.className="yui-ac-shadow";this._elShadow=this._elContainer.appendChild(A);}if(this.useIFrame&&!this._elIFrame){var B=document.createElement("iframe");B.src=this._iFrameSrc;B.frameBorder=0;B.scrolling="no";B.style.position="absolute";B.style.width="100%";B.style.height="100%";B.tabIndex=-1;this._elIFrame=this._elContainer.appendChild(B);}};YAHOO.widget.AutoComplete.prototype._initContainer=function(){YAHOO.util.Dom.addClass(this._elContainer,"yui-ac-container");if(!this._elContent){var C=document.createElement("div");C.className="yui-ac-content";C.style.display="none";this._elContent=this._elContainer.appendChild(C);var B=document.createElement("div");B.className="yui-ac-hd";B.style.display="none";this._elHeader=this._elContent.appendChild(B);var D=document.createElement("div");D.className="yui-ac-bd";this._elBody=this._elContent.appendChild(D);var A=document.createElement("div");A.className="yui-ac-ft";A.style.display="none";this._elFooter=this._elContent.appendChild(A);}else{}};YAHOO.widget.AutoComplete.prototype._initList=function(){this._aListItems=[];while(this._elBody.hasChildNodes()){var B=this.getListItems();if(B){for(var A=B.length-1;A>=0;A--){B[A]=null;}}this._elBody.innerHTML="";}var E=document.createElement("ul");E=this._elBody.appendChild(E);for(var C=0;C<this.maxResultsDisplayed;C++){var D=document.createElement("li");D=E.appendChild(D);this._aListItems[C]=D;this._initListItem(D,C);}this._maxResultsDisplayed=this.maxResultsDisplayed;};YAHOO.widget.AutoComplete.prototype._initListItem=function(C,B){var A=this;C.style.display="none";C._nItemIndex=B;C.mouseover=C.mouseout=C.onclick=null;YAHOO.util.Event.addListener(C,"mouseover",A._onItemMouseover,A);YAHOO.util.Event.addListener(C,"mouseout",A._onItemMouseout,A);YAHOO.util.Event.addListener(C,"click",A._onItemMouseclick,A);};YAHOO.widget.AutoComplete.prototype._onIMEDetected=function(A){A._enableIntervalDetection();};YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){var A=this._elTextbox.value;var B=this._sLastTextboxValue;if(A!=B){this._sLastTextboxValue=A;this._sendQuery(A);}};YAHOO.widget.AutoComplete.prototype._cancelIntervalDetection=function(A){if(A._queryInterval){clearInterval(A._queryInterval);}};YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(A){if((A==9)||(A==13)||(A==16)||(A==17)||(A>=18&&A<=20)||(A==27)||(A>=33&&A<=35)||(A>=36&&A<=40)||(A>=44&&A<=45)){return true;}return false;};YAHOO.widget.AutoComplete.prototype._sendQuery=function(G){if(this.minQueryLength==-1){this._toggleContainer(false);return ;}var C=(this.delimChar)?this.delimChar:null;if(C){var E=-1;for(var B=C.length-1;B>=0;B--){var F=G.lastIndexOf(C[B]);if(F>E){E=F;
}}if(C[B]==" "){for(var A=C.length-1;A>=0;A--){if(G[E-1]==C[A]){E--;break;}}}if(E>-1){var D=E+1;while(G.charAt(D)==" "){D+=1;}this._sSavedQuery=G.substring(0,D);G=G.substr(D);}else{if(G.indexOf(this._sSavedQuery)<0){this._sSavedQuery=null;}}}if((G&&(G.length<this.minQueryLength))||(!G&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}this._toggleContainer(false);return ;}G=encodeURIComponent(G);this._nDelayID=-1;G=this.doBeforeSendQuery(G);this.dataRequestEvent.fire(this,G);this.dataSource.getResults(this._populateList,G,this);};YAHOO.widget.AutoComplete.prototype._populateList=function(K,L,I){if(L===null){I.dataErrorEvent.fire(I,K);}if(!I._bFocused||!L){return ;}var A=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);var O=I._elContent.style;O.width=(!A)?null:"";O.height=(!A)?null:"";var H=decodeURIComponent(K);I._sCurQuery=H;I._bItemSelected=false;if(I._maxResultsDisplayed!=I.maxResultsDisplayed){I._initList();}var C=Math.min(L.length,I.maxResultsDisplayed);I._nDisplayedItems=C;if(C>0){I._initContainerHelpers();var D=I._aListItems;for(var G=C-1;G>=0;G--){var N=D[G];var B=L[G];N.innerHTML=I.formatResult(B,H);N.style.display="list-item";N._sResultKey=B[0];N._oResultData=B;}for(var F=D.length-1;F>=C;F--){var M=D[F];M.innerHTML=null;M.style.display="none";M._sResultKey=null;M._oResultData=null;}var J=I.doBeforeExpandContainer(I._elTextbox,I._elContainer,K,L);I._toggleContainer(J);if(I.autoHighlight){var E=D[0];I._toggleHighlight(E,"to");I.itemArrowToEvent.fire(I,E);I._typeAhead(E,K);}else{I._oCurItem=null;}}else{I._toggleContainer(false);}I.dataReturnEvent.fire(I,K,L);};YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var C=this._elTextbox.value;var B=(this.delimChar)?this.delimChar[0]:null;var A=(B)?C.lastIndexOf(B,C.length-2):-1;if(A>-1){this._elTextbox.value=C.substring(0,A);}else{this._elTextbox.value="";}this._sSavedQuery=this._elTextbox.value;this.selectionEnforceEvent.fire(this);};YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var D=null;for(var A=this._nDisplayedItems-1;A>=0;A--){var C=this._aListItems[A];var B=C._sResultKey.toLowerCase();if(B==this._sCurQuery.toLowerCase()){D=C;break;}}return(D);};YAHOO.widget.AutoComplete.prototype._typeAhead=function(D,G){if(!this.typeAhead||(this._nKeyCode==8)){return ;}var F=this._elTextbox;var E=this._elTextbox.value;if(!F.setSelectionRange&&!F.createTextRange){return ;}var B=E.length;this._updateValue(D);var C=F.value.length;this._selectText(F,B,C);var A=F.value.substr(B,C);this.typeAheadEvent.fire(this,G,A);};YAHOO.widget.AutoComplete.prototype._selectText=function(D,A,B){if(D.setSelectionRange){D.setSelectionRange(A,B);}else{if(D.createTextRange){var C=D.createTextRange();C.moveStart("character",A);C.moveEnd("character",B-D.value.length);C.select();}else{D.select();}}};YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(B){var D=false;var C=this._elContent.offsetWidth+"px";var A=this._elContent.offsetHeight+"px";if(this.useIFrame&&this._elIFrame){D=true;if(B){this._elIFrame.style.width=C;this._elIFrame.style.height=A;}else{this._elIFrame.style.width=0;this._elIFrame.style.height=0;}}if(this.useShadow&&this._elShadow){D=true;if(B){this._elShadow.style.width=C;this._elShadow.style.height=A;}else{this._elShadow.style.width=0;this._elShadow.style.height=0;}}};YAHOO.widget.AutoComplete.prototype._toggleContainer=function(K){var E=this._elContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return ;}if(!K){this._elContent.scrollTop=0;var C=this._aListItems;if(C&&(C.length>0)){for(var H=C.length-1;H>=0;H--){C[H].style.display="none";}}if(this._oCurItem){this._toggleHighlight(this._oCurItem,"from");}this._oCurItem=null;this._nDisplayedItems=0;this._sCurQuery=null;}if(!K&&!this._bContainerOpen){this._elContent.style.display="none";return ;}var B=this._oAnim;if(B&&B.getEl()&&(this.animHoriz||this.animVert)){if(!K){this._toggleContainerHelpers(K);}if(B.isAnimated()){B.stop();}var I=this._elContent.cloneNode(true);E.appendChild(I);I.style.top="-9000px";I.style.display="block";var G=I.offsetWidth;var D=I.offsetHeight;var A=(this.animHoriz)?0:G;var F=(this.animVert)?0:D;B.attributes=(K)?{width:{to:G},height:{to:D}}:{width:{to:A},height:{to:F}};if(K&&!this._bContainerOpen){this._elContent.style.width=A+"px";this._elContent.style.height=F+"px";}else{this._elContent.style.width=G+"px";this._elContent.style.height=D+"px";}E.removeChild(I);I=null;var J=this;var L=function(){B.onComplete.unsubscribeAll();if(K){J.containerExpandEvent.fire(J);}else{J._elContent.style.display="none";J.containerCollapseEvent.fire(J);}J._toggleContainerHelpers(K);};this._elContent.style.display="block";B.onComplete.subscribe(L);B.animate();this._bContainerOpen=K;}else{if(K){this._elContent.style.display="block";this.containerExpandEvent.fire(this);}else{this._elContent.style.display="none";this.containerCollapseEvent.fire(this);}this._toggleContainerHelpers(K);this._bContainerOpen=K;}};YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(A,C){var B=this.highlightClassName;if(this._oCurItem){YAHOO.util.Dom.removeClass(this._oCurItem,B);}if((C=="to")&&B){YAHOO.util.Dom.addClass(A,B);this._oCurItem=A;}};YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(A,C){if(A==this._oCurItem){return ;}var B=this.prehighlightClassName;if((C=="mouseover")&&B){YAHOO.util.Dom.addClass(A,B);}else{YAHOO.util.Dom.removeClass(A,B);}};YAHOO.widget.AutoComplete.prototype._updateValue=function(E){var F=this._elTextbox;var D=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var B=this._sSavedQuery;var C=E._sResultKey;F.focus();F.value="";if(D){if(B){F.value=B;}F.value+=C+D;if(D!=" "){F.value+=" ";}}else{F.value=C;}if(F.type=="textarea"){F.scrollTop=F.scrollHeight;}var A=F.value.length;this._selectText(F,A,A);this._oCurItem=E;};YAHOO.widget.AutoComplete.prototype._selectItem=function(A){this._bItemSelected=true;this._updateValue(A);this._cancelIntervalDetection(this);this.itemSelectEvent.fire(this,A,A._oResultData);
this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(this._oCurItem){this._selectItem(this._oCurItem);}else{this._toggleContainer(false);}};YAHOO.widget.AutoComplete.prototype._moveSelection=function(G){if(this._bContainerOpen){var E=this._oCurItem;var F=-1;if(E){F=E._nItemIndex;}var D=(G==40)?(F+1):(F-1);if(D<-2||D>=this._nDisplayedItems){return ;}if(E){this._toggleHighlight(E,"from");this.itemArrowFromEvent.fire(this,E);}if(D==-1){if(this.delimChar&&this._sSavedQuery){if(!this._textMatchesOption()){this._elTextbox.value=this._sSavedQuery;}else{this._elTextbox.value=this._sSavedQuery+this._sCurQuery;}}else{this._elTextbox.value=this._sCurQuery;}this._oCurItem=null;return ;}if(D==-2){this._toggleContainer(false);return ;}var C=this._aListItems[D];var A=this._elContent;var B=((YAHOO.util.Dom.getStyle(A,"overflow")=="auto")||(YAHOO.util.Dom.getStyle(A,"overflowY")=="auto"));if(B&&(D>-1)&&(D<this._nDisplayedItems)){if(G==40){if((C.offsetTop+C.offsetHeight)>(A.scrollTop+A.offsetHeight)){A.scrollTop=(C.offsetTop+C.offsetHeight)-A.offsetHeight;}else{if((C.offsetTop+C.offsetHeight)<A.scrollTop){A.scrollTop=C.offsetTop;}}}else{if(C.offsetTop<A.scrollTop){this._elContent.scrollTop=C.offsetTop;}else{if(C.offsetTop>(A.scrollTop+A.offsetHeight)){this._elContent.scrollTop=(C.offsetTop+C.offsetHeight)-A.offsetHeight;}}}}this._toggleHighlight(C,"to");this.itemArrowToEvent.fire(this,C);if(this.typeAhead){this._updateValue(C);}}};YAHOO.widget.AutoComplete.prototype._onItemMouseover=function(A,B){if(B.prehighlightClassName){B._togglePrehighlight(this,"mouseover");}else{B._toggleHighlight(this,"to");}B.itemMouseOverEvent.fire(B,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseout=function(A,B){if(B.prehighlightClassName){B._togglePrehighlight(this,"mouseout");}else{B._toggleHighlight(this,"from");}B.itemMouseOutEvent.fire(B,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseclick=function(A,B){B._toggleHighlight(this,"to");B._selectItem(this);};YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(A,B){B._bOverContainer=true;};YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(A,B){B._bOverContainer=false;if(B._oCurItem){B._toggleHighlight(B._oCurItem,"to");}};YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(A,B){B._elTextbox.focus();};YAHOO.widget.AutoComplete.prototype._onContainerResize=function(A,B){B._toggleContainerHelpers(B._bContainerOpen);};YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(A,B){var C=A.keyCode;switch(C){case 9:if((navigator.userAgent.toLowerCase().indexOf("mac")==-1)){if(B._oCurItem){if(B.delimChar&&(B._nKeyCode!=C)){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}}break;case 13:if((navigator.userAgent.toLowerCase().indexOf("mac")==-1)){if(B._oCurItem){if(B._nKeyCode!=C){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}}break;case 27:B._toggleContainer(false);return ;case 39:B._jumpSelection();break;case 38:YAHOO.util.Event.stopEvent(A);B._moveSelection(C);break;case 40:YAHOO.util.Event.stopEvent(A);B._moveSelection(C);break;default:break;}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(A,B){var C=A.keyCode;if((navigator.userAgent.toLowerCase().indexOf("mac")!=-1)){switch(C){case 9:if(B._oCurItem){if(B.delimChar&&(B._nKeyCode!=C)){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}break;case 13:if(B._oCurItem){if(B._nKeyCode!=C){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}break;default:break;}}else{if(C==229){B._queryInterval=setInterval(function(){B._onIMEDetected(B);},500);}}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(B,D){D._initProps();var E=B.keyCode;D._nKeyCode=E;var C=this.value;if(D._isIgnoreKey(E)||(C.toLowerCase()==D._sCurQuery)){return ;}else{D._bItemSelected=false;YAHOO.util.Dom.removeClass(D._oCurItem,D.highlightClassName);D._oCurItem=null;D.textboxKeyEvent.fire(D,E);}if(D.queryDelay>0){var A=setTimeout(function(){D._sendQuery(C);},(D.queryDelay*1000));if(D._nDelayID!=-1){clearTimeout(D._nDelayID);}D._nDelayID=A;}else{D._sendQuery(C);}};YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(A,B){B._elTextbox.setAttribute("autocomplete","off");B._bFocused=true;if(!B._bItemSelected){B.textboxFocusEvent.fire(B);}};YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(A,B){if(!B._bOverContainer||(B._nKeyCode==9)){if(!B._bItemSelected){var C=B._textMatchesOption();if(!B._bContainerOpen||(B._bContainerOpen&&(C===null))){if(B.forceSelection){B._clearSelection();}else{B.unmatchedItemSelectEvent.fire(B);}}else{if(B.forceSelection){B._selectItem(C);}}}if(B._bContainerOpen){B._toggleContainer(false);}B._cancelIntervalDetection(B);B._bFocused=false;B.textboxBlurEvent.fire(B);}};YAHOO.widget.AutoComplete.prototype._onWindowUnload=function(A,B){if(B&&B._elTextbox&&B.allowBrowserAutocomplete){B._elTextbox.setAttribute("autocomplete","on");}};YAHOO.widget.DataSource=function(){};YAHOO.widget.DataSource.ERROR_DATANULL="Response data was null";YAHOO.widget.DataSource.ERROR_DATAPARSE="Response data could not be parsed";YAHOO.widget.DataSource.prototype.maxCacheEntries=15;YAHOO.widget.DataSource.prototype.queryMatchContains=false;YAHOO.widget.DataSource.prototype.queryMatchSubset=false;YAHOO.widget.DataSource.prototype.queryMatchCase=false;YAHOO.widget.DataSource.prototype.toString=function(){return"DataSource "+this._sName;};YAHOO.widget.DataSource.prototype.getResults=function(A,D,B){var C=this._doQueryCache(A,D,B);if(C.length===0){this.queryEvent.fire(this,B,D);this.doQuery(A,D,B);}};YAHOO.widget.DataSource.prototype.doQuery=function(A,C,B){};YAHOO.widget.DataSource.prototype.flushCache=function(){if(this._aCache){this._aCache=[];}if(this._aCacheHelper){this._aCacheHelper=[];
}this.cacheFlushEvent.fire(this);};YAHOO.widget.DataSource.prototype.queryEvent=null;YAHOO.widget.DataSource.prototype.cacheQueryEvent=null;YAHOO.widget.DataSource.prototype.getResultsEvent=null;YAHOO.widget.DataSource.prototype.getCachedResultsEvent=null;YAHOO.widget.DataSource.prototype.dataErrorEvent=null;YAHOO.widget.DataSource.prototype.cacheFlushEvent=null;YAHOO.widget.DataSource._nIndex=0;YAHOO.widget.DataSource.prototype._sName=null;YAHOO.widget.DataSource.prototype._aCache=null;YAHOO.widget.DataSource.prototype._init=function(){var A=this.maxCacheEntries;if(!YAHOO.lang.isNumber(A)||(A<0)){A=0;}if(A>0&&!this._aCache){this._aCache=[];}this._sName="instance"+YAHOO.widget.DataSource._nIndex;YAHOO.widget.DataSource._nIndex++;this.queryEvent=new YAHOO.util.CustomEvent("query",this);this.cacheQueryEvent=new YAHOO.util.CustomEvent("cacheQuery",this);this.getResultsEvent=new YAHOO.util.CustomEvent("getResults",this);this.getCachedResultsEvent=new YAHOO.util.CustomEvent("getCachedResults",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.cacheFlushEvent=new YAHOO.util.CustomEvent("cacheFlush",this);};YAHOO.widget.DataSource.prototype._addCacheElem=function(B){var A=this._aCache;if(!A||!B||!B.query||!B.results){return ;}if(A.length>=this.maxCacheEntries){A.shift();}A.push(B);};YAHOO.widget.DataSource.prototype._doQueryCache=function(A,I,N){var H=[];var G=false;var J=this._aCache;var F=(J)?J.length:0;var K=this.queryMatchContains;var D;if((this.maxCacheEntries>0)&&J&&(F>0)){this.cacheQueryEvent.fire(this,N,I);if(!this.queryMatchCase){D=I;I=I.toLowerCase();}for(var P=F-1;P>=0;P--){var E=J[P];var B=E.results;var C=(!this.queryMatchCase)?encodeURIComponent(E.query).toLowerCase():encodeURIComponent(E.query);if(C==I){G=true;H=B;if(P!=F-1){J.splice(P,1);this._addCacheElem(E);}break;}else{if(this.queryMatchSubset){for(var O=I.length-1;O>=0;O--){var R=I.substr(0,O);if(C==R){G=true;for(var M=B.length-1;M>=0;M--){var Q=B[M];var L=(this.queryMatchCase)?encodeURIComponent(Q[0]).indexOf(I):encodeURIComponent(Q[0]).toLowerCase().indexOf(I);if((!K&&(L===0))||(K&&(L>-1))){H.unshift(Q);}}E={};E.query=I;E.results=H;this._addCacheElem(E);break;}}if(G){break;}}}}if(G){this.getCachedResultsEvent.fire(this,N,D,H);A(D,H,N);}}return H;};YAHOO.widget.DS_XHR=function(C,A,D){if(D&&(D.constructor==Object)){for(var B in D){this[B]=D[B];}}if(!YAHOO.lang.isArray(A)||!YAHOO.lang.isString(C)){return ;}this.schema=A;this.scriptURI=C;this._init();};YAHOO.widget.DS_XHR.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_XHR.TYPE_JSON=0;YAHOO.widget.DS_XHR.TYPE_XML=1;YAHOO.widget.DS_XHR.TYPE_FLAT=2;YAHOO.widget.DS_XHR.ERROR_DATAXHR="XHR response failed";YAHOO.widget.DS_XHR.prototype.connMgr=YAHOO.util.Connect;YAHOO.widget.DS_XHR.prototype.connTimeout=0;YAHOO.widget.DS_XHR.prototype.scriptURI=null;YAHOO.widget.DS_XHR.prototype.scriptQueryParam="query";YAHOO.widget.DS_XHR.prototype.scriptQueryAppend="";YAHOO.widget.DS_XHR.prototype.responseType=YAHOO.widget.DS_XHR.TYPE_JSON;YAHOO.widget.DS_XHR.prototype.responseStripAfter="\n<!-";YAHOO.widget.DS_XHR.prototype.doQuery=function(E,G,B){var J=(this.responseType==YAHOO.widget.DS_XHR.TYPE_XML);var D=this.scriptURI+"?"+this.scriptQueryParam+"="+G;if(this.scriptQueryAppend.length>0){D+="&"+this.scriptQueryAppend;}var C=null;var F=this;var I=function(K){if(!F._oConn||(K.tId!=F._oConn.tId)){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}for(var N in K){}if(!J){K=K.responseText;}else{K=K.responseXML;}if(K===null){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}var M=F.parseResponse(G,K,B);var L={};L.query=decodeURIComponent(G);L.results=M;if(M===null){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DataSource.ERROR_DATAPARSE);M=[];}else{F.getResultsEvent.fire(F,B,G,M);F._addCacheElem(L);}E(G,M,B);};var A=function(K){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DS_XHR.ERROR_DATAXHR);return ;};var H={success:I,failure:A};if(YAHOO.lang.isNumber(this.connTimeout)&&(this.connTimeout>0)){H.timeout=this.connTimeout;}if(this._oConn){this.connMgr.abort(this._oConn);}F._oConn=this.connMgr.asyncRequest("GET",D,H,null);};YAHOO.widget.DS_XHR.prototype.parseResponse=function(sQuery,oResponse,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var nEnd=((this.responseStripAfter!=="")&&(oResponse.indexOf))?oResponse.indexOf(this.responseStripAfter):-1;if(nEnd!=-1){oResponse=oResponse.substring(0,nEnd);}switch(this.responseType){case YAHOO.widget.DS_XHR.TYPE_JSON:var jsonList,jsonObjParsed;if(YAHOO.lang.JSON){jsonObjParsed=YAHOO.lang.JSON.parse(oResponse);if(!jsonObjParsed){bError=true;break;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{if(oResponse.parseJSON){jsonObjParsed=oResponse.parseJSON();if(!jsonObjParsed){bError=true;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{if(window.JSON){jsonObjParsed=JSON.parse(oResponse);if(!jsonObjParsed){bError=true;break;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{try{while(oResponse.substring(0,1)==" "){oResponse=oResponse.substring(1,oResponse.length);}if(oResponse.indexOf("{")<0){bError=true;break;}if(oResponse.indexOf("{}")===0){break;}var jsonObjRaw=eval("("+oResponse+")");if(!jsonObjRaw){bError=true;break;}jsonList=eval("(jsonObjRaw."+aSchema[0]+")");}catch(e){bError=true;break;}}}}if(!jsonList){bError=true;break;}if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}aResultItem.unshift(dataFieldValue);}if(aResultItem.length==1){aResultItem.push(jsonResult);}aResults.unshift(aResultItem);}break;case YAHOO.widget.DS_XHR.TYPE_XML:var xmlList=oResponse.getElementsByTagName(aSchema[0]);if(!xmlList){bError=true;break;}for(var k=xmlList.length-1;k>=0;k--){var result=xmlList.item(k);
var aFieldSet=[];for(var m=aSchema.length-1;m>=1;m--){var sValue=null;var xmlAttr=result.attributes.getNamedItem(aSchema[m]);if(xmlAttr){sValue=xmlAttr.value;}else{var xmlNode=result.getElementsByTagName(aSchema[m]);if(xmlNode&&xmlNode.item(0)&&xmlNode.item(0).firstChild){sValue=xmlNode.item(0).firstChild.nodeValue;}else{sValue="";}}aFieldSet.unshift(sValue);}aResults.unshift(aFieldSet);}break;case YAHOO.widget.DS_XHR.TYPE_FLAT:if(oResponse.length>0){var newLength=oResponse.length-aSchema[0].length;if(oResponse.substr(newLength)==aSchema[0]){oResponse=oResponse.substr(0,newLength);}if(oResponse.length>0){var aRecords=oResponse.split(aSchema[0]);for(var n=aRecords.length-1;n>=0;n--){if(aRecords[n].length>0){aResults[n]=aRecords[n].split(aSchema[1]);}}}}break;default:break;}sQuery=null;oResponse=null;oParent=null;if(bError){return null;}else{return aResults;}};YAHOO.widget.DS_XHR.prototype._oConn=null;YAHOO.widget.DS_ScriptNode=function(D,A,C){if(C&&(C.constructor==Object)){for(var B in C){this[B]=C[B];}}if(!YAHOO.lang.isArray(A)||!YAHOO.lang.isString(D)){return ;}this.schema=A;this.scriptURI=D;this._init();};YAHOO.widget.DS_ScriptNode.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_ScriptNode.prototype.getUtility=YAHOO.util.Get;YAHOO.widget.DS_ScriptNode.prototype.scriptURI=null;YAHOO.widget.DS_ScriptNode.prototype.scriptQueryParam="query";YAHOO.widget.DS_ScriptNode.prototype.asyncMode="allowAll";YAHOO.widget.DS_ScriptNode.prototype.scriptCallbackParam="callback";YAHOO.widget.DS_ScriptNode.callbacks=[];YAHOO.widget.DS_ScriptNode._nId=0;YAHOO.widget.DS_ScriptNode._nPending=0;YAHOO.widget.DS_ScriptNode.prototype.doQuery=function(A,F,C){var B=this;if(YAHOO.widget.DS_ScriptNode._nPending===0){YAHOO.widget.DS_ScriptNode.callbacks=[];YAHOO.widget.DS_ScriptNode._nId=0;}var E=YAHOO.widget.DS_ScriptNode._nId;YAHOO.widget.DS_ScriptNode._nId++;YAHOO.widget.DS_ScriptNode.callbacks[E]=function(G){if((B.asyncMode!=="ignoreStaleResponses")||(E===YAHOO.widget.DS_ScriptNode.callbacks.length-1)){B.handleResponse(G,A,F,C);}else{}delete YAHOO.widget.DS_ScriptNode.callbacks[E];};YAHOO.widget.DS_ScriptNode._nPending++;var D=this.scriptURI+"&"+this.scriptQueryParam+"="+F+"&"+this.scriptCallbackParam+"=YAHOO.widget.DS_ScriptNode.callbacks["+E+"]";this.getUtility.script(D,{autopurge:true,onsuccess:YAHOO.widget.DS_ScriptNode._bumpPendingDown,onfail:YAHOO.widget.DS_ScriptNode._bumpPendingDown});};YAHOO.widget.DS_ScriptNode.prototype.handleResponse=function(oResponse,oCallbackFn,sQuery,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var jsonList,jsonObjParsed;try{jsonList=eval("(oResponse."+aSchema[0]+")");}catch(e){bError=true;}if(!jsonList){bError=true;jsonList=[];}else{if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}}for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}aResultItem.unshift(dataFieldValue);}if(aResultItem.length==1){aResultItem.push(jsonResult);}aResults.unshift(aResultItem);}if(bError){aResults=null;}if(aResults===null){this.dataErrorEvent.fire(this,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATAPARSE);aResults=[];}else{var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;this._addCacheElem(resultObj);this.getResultsEvent.fire(this,oParent,sQuery,aResults);}oCallbackFn(sQuery,aResults,oParent);};YAHOO.widget.DS_ScriptNode._bumpPendingDown=function(){YAHOO.widget.DS_ScriptNode._nPending--;};YAHOO.widget.DS_JSFunction=function(A,C){if(C&&(C.constructor==Object)){for(var B in C){this[B]=C[B];}}if(!YAHOO.lang.isFunction(A)){return ;}else{this.dataFunction=A;this._init();}};YAHOO.widget.DS_JSFunction.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSFunction.prototype.dataFunction=null;YAHOO.widget.DS_JSFunction.prototype.doQuery=function(C,F,D){var B=this.dataFunction;var E=[];E=B(F);if(E===null){this.dataErrorEvent.fire(this,D,F,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}var A={};A.query=decodeURIComponent(F);A.results=E;this._addCacheElem(A);this.getResultsEvent.fire(this,D,F,E);C(F,E,D);return ;};YAHOO.widget.DS_JSArray=function(A,C){if(C&&(C.constructor==Object)){for(var B in C){this[B]=C[B];}}if(!YAHOO.lang.isArray(A)){return ;}else{this.data=A;this._init();}};YAHOO.widget.DS_JSArray.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSArray.prototype.data=null;YAHOO.widget.DS_JSArray.prototype.doQuery=function(E,I,A){var F;var C=this.data;var J=[];var D=false;var B=this.queryMatchContains;if(I){if(!this.queryMatchCase){I=I.toLowerCase();}for(F=C.length-1;F>=0;F--){var H=[];if(YAHOO.lang.isString(C[F])){H[0]=C[F];}else{if(YAHOO.lang.isArray(C[F])){H=C[F];}}if(YAHOO.lang.isString(H[0])){var G=(this.queryMatchCase)?encodeURIComponent(H[0]).indexOf(I):encodeURIComponent(H[0]).toLowerCase().indexOf(I);if((!B&&(G===0))||(B&&(G>-1))){J.unshift(H);}}}}else{for(F=C.length-1;F>=0;F--){if(YAHOO.lang.isString(C[F])){J.unshift([C[F]]);}else{if(YAHOO.lang.isArray(C[F])){J.unshift(C[F]);}}}}this.getResultsEvent.fire(this,A,I,J);E(I,J,A);};YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.2.2
*/

YAHOO.util.Config=function(owner){if(owner){this.init(owner);}};YAHOO.util.Config.CONFIG_CHANGED_EVENT="configChanged";YAHOO.util.Config.BOOLEAN_TYPE="boolean";YAHOO.util.Config.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,checkBoolean:function(val){return(typeof val==YAHOO.util.Config.BOOLEAN_TYPE);},checkNumber:function(val){return(!isNaN(val));},fireEvent:function(key,value){var property=this.config[key];if(property&&property.event){property.event.fire(value);}},addProperty:function(key,propertyObject){key=key.toLowerCase();this.config[key]=propertyObject;propertyObject.event=new YAHOO.util.CustomEvent(key,this.owner);propertyObject.key=key;if(propertyObject.handler){propertyObject.event.subscribe(propertyObject.handler,this.owner);}
this.setProperty(key,propertyObject.value,true);if(!propertyObject.suppressEvent){this.queueProperty(key,propertyObject.value);}},getConfig:function(){var cfg={};for(var prop in this.config){var property=this.config[prop];if(property&&property.event){cfg[prop]=property.value;}}
return cfg;},getProperty:function(key){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.value;}else{return undefined;}},resetProperty:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event){if(this.initialConfig[key]&&!YAHOO.lang.isUndefined(this.initialConfig[key])){this.setProperty(key,this.initialConfig[key]);}
return true;}else{return false;}},setProperty:function(key,value,silent){key=key.toLowerCase();if(this.queueInProgress&&!silent){this.queueProperty(key,value);return true;}else{var property=this.config[key];if(property&&property.event){if(property.validator&&!property.validator(value)){return false;}else{property.value=value;if(!silent){this.fireEvent(key,value);this.configChangedEvent.fire([key,value]);}
return true;}}else{return false;}}},queueProperty:function(key,value){key=key.toLowerCase();var property=this.config[key];if(property&&property.event){if(!YAHOO.lang.isUndefined(value)&&property.validator&&!property.validator(value)){return false;}else{if(!YAHOO.lang.isUndefined(value)){property.value=value;}else{value=property.value;}
var foundDuplicate=false;var iLen=this.eventQueue.length;for(var i=0;i<iLen;i++){var queueItem=this.eventQueue[i];if(queueItem){var queueItemKey=queueItem[0];var queueItemValue=queueItem[1];if(queueItemKey==key){this.eventQueue[i]=null;this.eventQueue.push([key,(!YAHOO.lang.isUndefined(value)?value:queueItemValue)]);foundDuplicate=true;break;}}}
if(!foundDuplicate&&!YAHOO.lang.isUndefined(value)){this.eventQueue.push([key,value]);}}
if(property.supercedes){var sLen=property.supercedes.length;for(var s=0;s<sLen;s++){var supercedesCheck=property.supercedes[s];var qLen=this.eventQueue.length;for(var q=0;q<qLen;q++){var queueItemCheck=this.eventQueue[q];if(queueItemCheck){var queueItemCheckKey=queueItemCheck[0];var queueItemCheckValue=queueItemCheck[1];if(queueItemCheckKey==supercedesCheck.toLowerCase()){this.eventQueue.push([queueItemCheckKey,queueItemCheckValue]);this.eventQueue[q]=null;break;}}}}}
return true;}else{return false;}},refireEvent:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event&&!YAHOO.lang.isUndefined(property.value)){if(this.queueInProgress){this.queueProperty(key);}else{this.fireEvent(key,property.value);}}},applyConfig:function(userConfig,init){if(init){this.initialConfig=userConfig;}
for(var prop in userConfig){this.queueProperty(prop,userConfig[prop]);}},refresh:function(){for(var prop in this.config){this.refireEvent(prop);}},fireQueue:function(){this.queueInProgress=true;for(var i=0;i<this.eventQueue.length;i++){var queueItem=this.eventQueue[i];if(queueItem){var key=queueItem[0];var value=queueItem[1];var property=this.config[key];property.value=value;this.fireEvent(key,value);}}
this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(key,handler,obj,override){var property=this.config[key.toLowerCase()];if(property&&property.event){if(!YAHOO.util.Config.alreadySubscribed(property.event,handler,obj)){property.event.subscribe(handler,obj,override);}
return true;}else{return false;}},unsubscribeFromConfigEvent:function(key,handler,obj){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.event.unsubscribe(handler,obj);}else{return false;}},toString:function(){var output="Config";if(this.owner){output+=" ["+this.owner.toString()+"]";}
return output;},outputEventQueue:function(){var output="";for(var q=0;q<this.eventQueue.length;q++){var queueItem=this.eventQueue[q];if(queueItem){output+=queueItem[0]+"="+queueItem[1]+", ";}}
return output;}};YAHOO.util.Config.prototype.init=function(owner){this.owner=owner;this.configChangedEvent=new YAHOO.util.CustomEvent(YAHOO.util.CONFIG_CHANGED_EVENT,this);this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];};YAHOO.util.Config.alreadySubscribed=function(evt,fn,obj){for(var e=0;e<evt.subscribers.length;e++){var subsc=evt.subscribers[e];if(subsc&&subsc.obj==obj&&subsc.fn==fn){return true;}}
return false;};YAHOO.widget.Module=function(el,userConfig){if(el){this.init(el,userConfig);}else{}};YAHOO.widget.Module.IMG_ROOT=null;YAHOO.widget.Module.IMG_ROOT_SSL=null;YAHOO.widget.Module.CSS_MODULE="yui-module";YAHOO.widget.Module.CSS_HEADER="hd";YAHOO.widget.Module.CSS_BODY="bd";YAHOO.widget.Module.CSS_FOOTER="ft";YAHOO.widget.Module.RESIZE_MONITOR_SECURE_URL="javascript:false;";YAHOO.widget.Module.textResizeEvent=new YAHOO.util.CustomEvent("textResize");YAHOO.widget.Module._EVENT_TYPES={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"};YAHOO.widget.Module._DEFAULT_CONFIG={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true}};YAHOO.widget.Module.prototype={constructor:YAHOO.widget.Module,element:null,header:null,body:null,footer:null,id:null,imageRoot:YAHOO.widget.Module.IMG_ROOT,initEvents:function(){var EVENT_TYPES=YAHOO.widget.Module._EVENT_TYPES;this.beforeInitEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_INIT,this);this.initEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.INIT,this);this.appendEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.APPEND,this);this.beforeRenderEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_RENDER,this);this.renderEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.RENDER,this);this.changeHeaderEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.CHANGE_HEADER,this);this.changeBodyEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.CHANGE_BODY,this);this.changeFooterEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.CHANGE_FOOTER,this);this.changeContentEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.CHANGE_CONTENT,this);this.destroyEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.DESTORY,this);this.beforeShowEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_SHOW,this);this.showEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.SHOW,this);this.beforeHideEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_HIDE,this);this.hideEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.HIDE,this);},platform:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1){return"windows";}else if(ua.indexOf("macintosh")!=-1){return"mac";}else{return false;}}(),browser:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf('opera')!=-1){return'opera';}else if(ua.indexOf('msie 7')!=-1){return'ie7';}else if(ua.indexOf('msie')!=-1){return'ie';}else if(ua.indexOf('safari')!=-1){return'safari';}else if(ua.indexOf('gecko')!=-1){return'gecko';}else{return false;}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){var DEFAULT_CONFIG=YAHOO.widget.Module._DEFAULT_CONFIG;this.cfg.addProperty(DEFAULT_CONFIG.VISIBLE.key,{handler:this.configVisible,value:DEFAULT_CONFIG.VISIBLE.value,validator:DEFAULT_CONFIG.VISIBLE.validator});this.cfg.addProperty(DEFAULT_CONFIG.EFFECT.key,{suppressEvent:DEFAULT_CONFIG.EFFECT.suppressEvent,supercedes:DEFAULT_CONFIG.EFFECT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:DEFAULT_CONFIG.MONITOR_RESIZE.value});},init:function(el,userConfig){this.initEvents();this.beforeInitEvent.fire(YAHOO.widget.Module);this.cfg=new YAHOO.util.Config(this);if(this.isSecure){this.imageRoot=YAHOO.widget.Module.IMG_ROOT_SSL;}
if(typeof el=="string"){var elId=el;el=document.getElementById(el);if(!el){el=document.createElement("div");el.id=elId;}}
this.element=el;if(el.id){this.id=el.id;}
var childNodes=this.element.childNodes;if(childNodes){for(var i=0;i<childNodes.length;i++){var child=childNodes[i];switch(child.className){case YAHOO.widget.Module.CSS_HEADER:this.header=child;break;case YAHOO.widget.Module.CSS_BODY:this.body=child;break;case YAHOO.widget.Module.CSS_FOOTER:this.footer=child;break;}}}
this.initDefaultConfig();YAHOO.util.Dom.addClass(this.element,YAHOO.widget.Module.CSS_MODULE);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}
this.initEvent.fire(YAHOO.widget.Module);},initResizeMonitor:function(){if(this.browser!="opera"){var resizeMonitor=document.getElementById("_yuiResizeMonitor");if(!resizeMonitor){resizeMonitor=document.createElement("iframe");var bIE=(this.browser.indexOf("ie")===0);if(this.isSecure&&YAHOO.widget.Module.RESIZE_MONITOR_SECURE_URL&&bIE){resizeMonitor.src=YAHOO.widget.Module.RESIZE_MONITOR_SECURE_URL;}
resizeMonitor.id="_yuiResizeMonitor";resizeMonitor.style.visibility="hidden";document.body.appendChild(resizeMonitor);resizeMonitor.style.width="10em";resizeMonitor.style.height="10em";resizeMonitor.style.position="absolute";var nLeft=-1*resizeMonitor.offsetWidth;var nTop=-1*resizeMonitor.offsetHeight;resizeMonitor.style.top=nTop+"px";resizeMonitor.style.left=nLeft+"px";resizeMonitor.style.borderStyle="none";resizeMonitor.style.borderWidth="0";YAHOO.util.Dom.setStyle(resizeMonitor,"opacity","0");resizeMonitor.style.visibility="visible";if(!bIE){var doc=resizeMonitor.contentWindow.document;doc.open();doc.close();}}
var fireTextResize=function(){YAHOO.widget.Module.textResizeEvent.fire();};if(resizeMonitor&&resizeMonitor.contentWindow){this.resizeMonitor=resizeMonitor;YAHOO.widget.Module.textResizeEvent.subscribe(this.onDomResize,this,true);if(!YAHOO.widget.Module.textResizeInitialized){if(!YAHOO.util.Event.addListener(this.resizeMonitor.contentWindow,"resize",fireTextResize)){YAHOO.util.Event.addListener(this.resizeMonitor,"resize",fireTextResize);}
YAHOO.widget.Module.textResizeInitialized=true;}}}},onDomResize:function(e,obj){var nLeft=-1*this.resizeMonitor.offsetWidth,nTop=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=nTop+"px";this.resizeMonitor.style.left=nLeft+"px";},setHeader:function(headerContent){if(!this.header){this.header=document.createElement("div");this.header.className=YAHOO.widget.Module.CSS_HEADER;}
if(typeof headerContent=="string"){this.header.innerHTML=headerContent;}else{this.header.innerHTML="";this.header.appendChild(headerContent);}
this.changeHeaderEvent.fire(headerContent);this.changeContentEvent.fire();},appendToHeader:function(element){if(!this.header){this.header=document.createElement("div");this.header.className=YAHOO.widget.Module.CSS_HEADER;}
this.header.appendChild(element);this.changeHeaderEvent.fire(element);this.changeContentEvent.fire();},setBody:function(bodyContent){if(!this.body){this.body=document.createElement("div");this.body.className=YAHOO.widget.Module.CSS_BODY;}
if(typeof bodyContent=="string")
{this.body.innerHTML=bodyContent;}else{this.body.innerHTML="";this.body.appendChild(bodyContent);}
this.changeBodyEvent.fire(bodyContent);this.changeContentEvent.fire();},appendToBody:function(element){if(!this.body){this.body=document.createElement("div");this.body.className=YAHOO.widget.Module.CSS_BODY;}
this.body.appendChild(element);this.changeBodyEvent.fire(element);this.changeContentEvent.fire();},setFooter:function(footerContent){if(!this.footer){this.footer=document.createElement("div");this.footer.className=YAHOO.widget.Module.CSS_FOOTER;}
if(typeof footerContent=="string"){this.footer.innerHTML=footerContent;}else{this.footer.innerHTML="";this.footer.appendChild(footerContent);}
this.changeFooterEvent.fire(footerContent);this.changeContentEvent.fire();},appendToFooter:function(element){if(!this.footer){this.footer=document.createElement("div");this.footer.className=YAHOO.widget.Module.CSS_FOOTER;}
this.footer.appendChild(element);this.changeFooterEvent.fire(element);this.changeContentEvent.fire();},render:function(appendToNode,moduleElement){this.beforeRenderEvent.fire();if(!moduleElement){moduleElement=this.element;}
var me=this;var appendTo=function(element){if(typeof element=="string"){element=document.getElementById(element);}
if(element){element.appendChild(me.element);me.appendEvent.fire();}};if(appendToNode){appendTo(appendToNode);}else{if(!YAHOO.util.Dom.inDocument(this.element)){return false;}}
if(this.header&&!YAHOO.util.Dom.inDocument(this.header)){var firstChild=moduleElement.firstChild;if(firstChild){moduleElement.insertBefore(this.header,firstChild);}else{moduleElement.appendChild(this.header);}}
if(this.body&&!YAHOO.util.Dom.inDocument(this.body)){if(this.footer&&YAHOO.util.Dom.isAncestor(this.moduleElement,this.footer)){moduleElement.insertBefore(this.body,this.footer);}else{moduleElement.appendChild(this.body);}}
if(this.footer&&!YAHOO.util.Dom.inDocument(this.footer)){moduleElement.appendChild(this.footer);}
this.renderEvent.fire();return true;},destroy:function(){var parent;if(this.element){YAHOO.util.Event.purgeElement(this.element,true);parent=this.element.parentNode;}
if(parent){parent.removeChild(this.element);}
this.element=null;this.header=null;this.body=null;this.footer=null;for(var e in this){if(e instanceof YAHOO.util.CustomEvent){e.unsubscribeAll();}}
YAHOO.widget.Module.textResizeEvent.unsubscribe(this.onDomResize,this);this.destroyEvent.fire();},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(type,args,obj){var visible=args[0];if(visible){this.beforeShowEvent.fire();YAHOO.util.Dom.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();YAHOO.util.Dom.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(type,args,obj){var monitor=args[0];if(monitor){this.initResizeMonitor();}else{YAHOO.widget.Module.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}}};YAHOO.widget.Module.prototype.toString=function(){return"Module "+this.id;};YAHOO.widget.Overlay=function(el,userConfig){YAHOO.widget.Overlay.superclass.constructor.call(this,el,userConfig);};YAHOO.extend(YAHOO.widget.Overlay,YAHOO.widget.Module);YAHOO.widget.Overlay._EVENT_TYPES={"BEFORE_MOVE":"beforeMove","MOVE":"move"};YAHOO.widget.Overlay._DEFAULT_CONFIG={"X":{key:"x",validator:YAHOO.lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:YAHOO.lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:YAHOO.lang.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:YAHOO.lang.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.widget.Module.prototype.browser=="ie"?true:false),validator:YAHOO.lang.isBoolean,supercedes:["zIndex"]}};YAHOO.widget.Overlay.IFRAME_SRC="javascript:false;";YAHOO.widget.Overlay.TOP_LEFT="tl";YAHOO.widget.Overlay.TOP_RIGHT="tr";YAHOO.widget.Overlay.BOTTOM_LEFT="bl";YAHOO.widget.Overlay.BOTTOM_RIGHT="br";YAHOO.widget.Overlay.CSS_OVERLAY="yui-overlay";YAHOO.widget.Overlay.prototype.init=function(el,userConfig){YAHOO.widget.Overlay.superclass.init.call(this,el);this.beforeInitEvent.fire(YAHOO.widget.Overlay);YAHOO.util.Dom.addClass(this.element,YAHOO.widget.Overlay.CSS_OVERLAY);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(this.platform=="mac"&&this.browser=="gecko"){if(!YAHOO.util.Config.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}
this.initEvent.fire(YAHOO.widget.Overlay);};YAHOO.widget.Overlay.prototype.initEvents=function(){YAHOO.widget.Overlay.superclass.initEvents.call(this);var EVENT_TYPES=YAHOO.widget.Overlay._EVENT_TYPES;this.beforeMoveEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_MOVE,this);this.moveEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.MOVE,this);};YAHOO.widget.Overlay.prototype.initDefaultConfig=function(){YAHOO.widget.Overlay.superclass.initDefaultConfig.call(this);var DEFAULT_CONFIG=YAHOO.widget.Overlay._DEFAULT_CONFIG;this.cfg.addProperty(DEFAULT_CONFIG.X.key,{handler:this.configX,validator:DEFAULT_CONFIG.X.validator,suppressEvent:DEFAULT_CONFIG.X.suppressEvent,supercedes:DEFAULT_CONFIG.X.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.Y.key,{handler:this.configY,validator:DEFAULT_CONFIG.Y.validator,suppressEvent:DEFAULT_CONFIG.Y.suppressEvent,supercedes:DEFAULT_CONFIG.Y.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.XY.key,{handler:this.configXY,suppressEvent:DEFAULT_CONFIG.XY.suppressEvent,supercedes:DEFAULT_CONFIG.XY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.CONTEXT.key,{handler:this.configContext,suppressEvent:DEFAULT_CONFIG.CONTEXT.suppressEvent,supercedes:DEFAULT_CONFIG.CONTEXT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.FIXED_CENTER.key,{handler:this.configFixedCenter,value:DEFAULT_CONFIG.FIXED_CENTER.value,validator:DEFAULT_CONFIG.FIXED_CENTER.validator,supercedes:DEFAULT_CONFIG.FIXED_CENTER.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.WIDTH.key,{handler:this.configWidth,suppressEvent:DEFAULT_CONFIG.WIDTH.suppressEvent,supercedes:DEFAULT_CONFIG.WIDTH.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.HEIGHT.key,{handler:this.configHeight,suppressEvent:DEFAULT_CONFIG.HEIGHT.suppressEvent,supercedes:DEFAULT_CONFIG.HEIGHT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.ZINDEX.key,{handler:this.configzIndex,value:DEFAULT_CONFIG.ZINDEX.value});this.cfg.addProperty(DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.value,validator:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.validator,supercedes:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.IFRAME.key,{handler:this.configIframe,value:DEFAULT_CONFIG.IFRAME.value,validator:DEFAULT_CONFIG.IFRAME.validator,supercedes:DEFAULT_CONFIG.IFRAME.supercedes});};YAHOO.widget.Overlay.prototype.moveTo=function(x,y){this.cfg.setProperty("xy",[x,y]);};YAHOO.widget.Overlay.prototype.hideMacGeckoScrollbars=function(){YAHOO.util.Dom.removeClass(this.element,"show-scrollbars");YAHOO.util.Dom.addClass(this.element,"hide-scrollbars");};YAHOO.widget.Overlay.prototype.showMacGeckoScrollbars=function(){YAHOO.util.Dom.removeClass(this.element,"hide-scrollbars");YAHOO.util.Dom.addClass(this.element,"show-scrollbars");};YAHOO.widget.Overlay.prototype.configVisible=function(type,args,obj){var visible=args[0];var currentVis=YAHOO.util.Dom.getStyle(this.element,"visibility");if(currentVis=="inherit"){var e=this.element.parentNode;while(e.nodeType!=9&&e.nodeType!=11){currentVis=YAHOO.util.Dom.getStyle(e,"visibility");if(currentVis!="inherit"){break;}
e=e.parentNode;}
if(currentVis=="inherit"){currentVis="visible";}}
var effect=this.cfg.getProperty("effect");var effectInstances=[];if(effect){if(effect instanceof Array){for(var i=0;i<effect.length;i++){var eff=effect[i];effectInstances[effectInstances.length]=eff.effect(this,eff.duration);}}else{effectInstances[effectInstances.length]=effect.effect(this,effect.duration);}}
var isMacGecko=(this.platform=="mac"&&this.browser=="gecko");if(visible){if(isMacGecko){this.showMacGeckoScrollbars();}
if(effect){if(visible){if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();for(var j=0;j<effectInstances.length;j++){var ei=effectInstances[j];if(j===0&&!YAHOO.util.Config.alreadySubscribed(ei.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){ei.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}
ei.animateIn();}}}}else{if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();YAHOO.util.Dom.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(isMacGecko){this.hideMacGeckoScrollbars();}
if(effect){if(currentVis=="visible"){this.beforeHideEvent.fire();for(var k=0;k<effectInstances.length;k++){var h=effectInstances[k];if(k===0&&!YAHOO.util.Config.alreadySubscribed(h.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){h.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}
h.animateOut();}}else if(currentVis===""){YAHOO.util.Dom.setStyle(this.element,"visibility","hidden");}}else{if(currentVis=="visible"||currentVis===""){this.beforeHideEvent.fire();YAHOO.util.Dom.setStyle(this.element,"visibility","hidden");this.cfg.refireEvent("iframe");this.hideEvent.fire();}}}};YAHOO.widget.Overlay.prototype.doCenterOnDOMEvent=function(){if(this.cfg.getProperty("visible")){this.center();}};YAHOO.widget.Overlay.prototype.configFixedCenter=function(type,args,obj){var val=args[0];if(val){this.center();if(!YAHOO.util.Config.alreadySubscribed(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(YAHOO.widget.Overlay.windowResizeEvent,this.doCenterOnDOMEvent,this)){YAHOO.widget.Overlay.windowResizeEvent.subscribe(this.doCenterOnDOMEvent,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(YAHOO.widget.Overlay.windowScrollEvent,this.doCenterOnDOMEvent,this)){YAHOO.widget.Overlay.windowScrollEvent.subscribe(this.doCenterOnDOMEvent,this,true);}}else{YAHOO.widget.Overlay.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);YAHOO.widget.Overlay.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);}};YAHOO.widget.Overlay.prototype.configHeight=function(type,args,obj){var height=args[0];var el=this.element;YAHOO.util.Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.configWidth=function(type,args,obj){var width=args[0];var el=this.element;YAHOO.util.Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.configzIndex=function(type,args,obj){var zIndex=args[0];var el=this.element;if(!zIndex){zIndex=YAHOO.util.Dom.getStyle(el,"zIndex");if(!zIndex||isNaN(zIndex)){zIndex=0;}}
if(this.iframe){if(zIndex<=0){zIndex=1;}
YAHOO.util.Dom.setStyle(this.iframe,"zIndex",(zIndex-1));}
YAHOO.util.Dom.setStyle(el,"zIndex",zIndex);this.cfg.setProperty("zIndex",zIndex,true);};YAHOO.widget.Overlay.prototype.configXY=function(type,args,obj){var pos=args[0];var x=pos[0];var y=pos[1];this.cfg.setProperty("x",x);this.cfg.setProperty("y",y);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);};YAHOO.widget.Overlay.prototype.configX=function(type,args,obj){var x=args[0];var y=this.cfg.getProperty("y");this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");YAHOO.util.Dom.setX(this.element,x,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);};YAHOO.widget.Overlay.prototype.configY=function(type,args,obj){var x=this.cfg.getProperty("x");var y=args[0];this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");YAHOO.util.Dom.setY(this.element,y,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);};YAHOO.widget.Overlay.prototype.showIframe=function(){if(this.iframe){this.iframe.style.display="block";}};YAHOO.widget.Overlay.prototype.hideIframe=function(){if(this.iframe){this.iframe.style.display="none";}};YAHOO.widget.Overlay.prototype.configIframe=function(type,args,obj){var val=args[0];if(val){if(!YAHOO.util.Config.alreadySubscribed(this.showEvent,this.showIframe,this)){this.showEvent.subscribe(this.showIframe,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.hideEvent,this.hideIframe,this)){this.hideEvent.subscribe(this.hideIframe,this,true);}
var x=this.cfg.getProperty("x");var y=this.cfg.getProperty("y");if(!x||!y){this.syncPosition();x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");}
if(!isNaN(x)&&!isNaN(y)){if(!this.iframe){this.iframe=document.createElement("iframe");if(this.isSecure){this.iframe.src=YAHOO.widget.Overlay.IFRAME_SRC;}
var parent=this.element.parentNode;if(parent){parent.appendChild(this.iframe);}else{document.body.appendChild(this.iframe);}
YAHOO.util.Dom.setStyle(this.iframe,"position","absolute");YAHOO.util.Dom.setStyle(this.iframe,"border","none");YAHOO.util.Dom.setStyle(this.iframe,"margin","0");YAHOO.util.Dom.setStyle(this.iframe,"padding","0");YAHOO.util.Dom.setStyle(this.iframe,"opacity","0");if(this.cfg.getProperty("visible")){this.showIframe();}else{this.hideIframe();}}
var iframeDisplay=YAHOO.util.Dom.getStyle(this.iframe,"display");if(iframeDisplay=="none"){this.iframe.style.display="block";}
YAHOO.util.Dom.setXY(this.iframe,[x,y]);var width=this.element.clientWidth;var height=this.element.clientHeight;YAHOO.util.Dom.setStyle(this.iframe,"width",(width+2)+"px");YAHOO.util.Dom.setStyle(this.iframe,"height",(height+2)+"px");if(iframeDisplay=="none"){this.iframe.style.display="none";}}}else{if(this.iframe){this.iframe.style.display="none";}
this.showEvent.unsubscribe(this.showIframe,this);this.hideEvent.unsubscribe(this.hideIframe,this);}};YAHOO.widget.Overlay.prototype.configConstrainToViewport=function(type,args,obj){var val=args[0];if(val){if(!YAHOO.util.Config.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}}else{this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}};YAHOO.widget.Overlay.prototype.configContext=function(type,args,obj){var contextArgs=args[0];if(contextArgs){var contextEl=contextArgs[0];var elementMagnetCorner=contextArgs[1];var contextMagnetCorner=contextArgs[2];if(contextEl){if(typeof contextEl=="string"){this.cfg.setProperty("context",[document.getElementById(contextEl),elementMagnetCorner,contextMagnetCorner],true);}
if(elementMagnetCorner&&contextMagnetCorner){this.align(elementMagnetCorner,contextMagnetCorner);}}}};YAHOO.widget.Overlay.prototype.align=function(elementAlign,contextAlign){var contextArgs=this.cfg.getProperty("context");if(contextArgs){var context=contextArgs[0];var element=this.element;var me=this;if(!elementAlign){elementAlign=contextArgs[1];}
if(!contextAlign){contextAlign=contextArgs[2];}
if(element&&context){var contextRegion=YAHOO.util.Dom.getRegion(context);var doAlign=function(v,h){switch(elementAlign){case YAHOO.widget.Overlay.TOP_LEFT:me.moveTo(h,v);break;case YAHOO.widget.Overlay.TOP_RIGHT:me.moveTo(h-element.offsetWidth,v);break;case YAHOO.widget.Overlay.BOTTOM_LEFT:me.moveTo(h,v-element.offsetHeight);break;case YAHOO.widget.Overlay.BOTTOM_RIGHT:me.moveTo(h-element.offsetWidth,v-element.offsetHeight);break;}};switch(contextAlign){case YAHOO.widget.Overlay.TOP_LEFT:doAlign(contextRegion.top,contextRegion.left);break;case YAHOO.widget.Overlay.TOP_RIGHT:doAlign(contextRegion.top,contextRegion.right);break;case YAHOO.widget.Overlay.BOTTOM_LEFT:doAlign(contextRegion.bottom,contextRegion.left);break;case YAHOO.widget.Overlay.BOTTOM_RIGHT:doAlign(contextRegion.bottom,contextRegion.right);break;}}}};YAHOO.widget.Overlay.prototype.enforceConstraints=function(type,args,obj){var pos=args[0];var x=pos[0];var y=pos[1];var offsetHeight=this.element.offsetHeight;var offsetWidth=this.element.offsetWidth;var viewPortWidth=YAHOO.util.Dom.getViewportWidth();var viewPortHeight=YAHOO.util.Dom.getViewportHeight();var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;var topConstraint=scrollY+10;var leftConstraint=scrollX+10;var bottomConstraint=scrollY+viewPortHeight-offsetHeight-10;var rightConstraint=scrollX+viewPortWidth-offsetWidth-10;if(x<leftConstraint){x=leftConstraint;}else if(x>rightConstraint){x=rightConstraint;}
if(y<topConstraint){y=topConstraint;}else if(y>bottomConstraint){y=bottomConstraint;}
this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.cfg.setProperty("xy",[x,y],true);};YAHOO.widget.Overlay.prototype.center=function(){var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;var viewPortWidth=YAHOO.util.Dom.getClientWidth();var viewPortHeight=YAHOO.util.Dom.getClientHeight();var elementWidth=this.element.offsetWidth;var elementHeight=this.element.offsetHeight;var x=(viewPortWidth/2)-(elementWidth/2)+scrollX;var y=(viewPortHeight/2)-(elementHeight/2)+scrollY;this.cfg.setProperty("xy",[parseInt(x,10),parseInt(y,10)]);this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.syncPosition=function(){var pos=YAHOO.util.Dom.getXY(this.element);this.cfg.setProperty("x",pos[0],true);this.cfg.setProperty("y",pos[1],true);this.cfg.setProperty("xy",pos,true);};YAHOO.widget.Overlay.prototype.onDomResize=function(e,obj){YAHOO.widget.Overlay.superclass.onDomResize.call(this,e,obj);var me=this;setTimeout(function(){me.syncPosition();me.cfg.refireEvent("iframe");me.cfg.refireEvent("context");},0);};YAHOO.widget.Overlay.prototype.destroy=function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}
this.iframe=null;YAHOO.widget.Overlay.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);YAHOO.widget.Overlay.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);YAHOO.widget.Overlay.superclass.destroy.call(this);};YAHOO.widget.Overlay.prototype.toString=function(){return"Overlay "+this.id;};YAHOO.widget.Overlay.windowScrollEvent=new YAHOO.util.CustomEvent("windowScroll");YAHOO.widget.Overlay.windowResizeEvent=new YAHOO.util.CustomEvent("windowResize");YAHOO.widget.Overlay.windowScrollHandler=function(e){if(YAHOO.widget.Module.prototype.browser=="ie"||YAHOO.widget.Module.prototype.browser=="ie7"){if(!window.scrollEnd){window.scrollEnd=-1;}
clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){YAHOO.widget.Overlay.windowScrollEvent.fire();},1);}else{YAHOO.widget.Overlay.windowScrollEvent.fire();}};YAHOO.widget.Overlay.windowResizeHandler=function(e){if(YAHOO.widget.Module.prototype.browser=="ie"||YAHOO.widget.Module.prototype.browser=="ie7"){if(!window.resizeEnd){window.resizeEnd=-1;}
clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){YAHOO.widget.Overlay.windowResizeEvent.fire();},100);}else{YAHOO.widget.Overlay.windowResizeEvent.fire();}};YAHOO.widget.Overlay._initialized=null;if(YAHOO.widget.Overlay._initialized===null){YAHOO.util.Event.addListener(window,"scroll",YAHOO.widget.Overlay.windowScrollHandler);YAHOO.util.Event.addListener(window,"resize",YAHOO.widget.Overlay.windowResizeHandler);YAHOO.widget.Overlay._initialized=true;}
YAHOO.widget.OverlayManager=function(userConfig){this.init(userConfig);};YAHOO.widget.OverlayManager.CSS_FOCUSED="focused";YAHOO.widget.OverlayManager.prototype={constructor:YAHOO.widget.OverlayManager,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(userConfig){this.cfg=new YAHOO.util.Config(this);this.initDefaultConfig();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.fireQueue();var activeOverlay=null;this.getActive=function(){return activeOverlay;};this.focus=function(overlay){var o=this.find(overlay);if(o){if(activeOverlay!=o){if(activeOverlay){activeOverlay.blur();}
activeOverlay=o;YAHOO.util.Dom.addClass(activeOverlay.element,YAHOO.widget.OverlayManager.CSS_FOCUSED);this.overlays.sort(this.compareZIndexDesc);var topZIndex=YAHOO.util.Dom.getStyle(this.overlays[0].element,"zIndex");if(!isNaN(topZIndex)&&this.overlays[0]!=overlay){activeOverlay.cfg.setProperty("zIndex",(parseInt(topZIndex,10)+2));}
this.overlays.sort(this.compareZIndexDesc);o.focusEvent.fire();}}};this.remove=function(overlay){var o=this.find(overlay);if(o){var originalZ=YAHOO.util.Dom.getStyle(o.element,"zIndex");o.cfg.setProperty("zIndex",-1000,true);this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,this.overlays.length-1);o.hideEvent.unsubscribe(o.blur);o.destroyEvent.unsubscribe(this._onOverlayDestroy,o);if(o.element){YAHOO.util.Event.removeListener(o.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);}
o.cfg.setProperty("zIndex",originalZ,true);o.cfg.setProperty("manager",null);o.focusEvent.unsubscribeAll();o.blurEvent.unsubscribeAll();o.focusEvent=null;o.blurEvent=null;o.focus=null;o.blur=null;}};this.blurAll=function(){for(var o=0;o<this.overlays.length;o++){this.overlays[o].blur();}};this._onOverlayBlur=function(p_sType,p_aArgs){activeOverlay=null;};var overlays=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}
if(overlays){this.register(overlays);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(p_oEvent){var oTarget=YAHOO.util.Event.getTarget(p_oEvent),oClose=this.close;if(oClose&&(oTarget==oClose||YAHOO.util.Dom.isAncestor(oClose,oTarget))){this.blur();}
else{this.focus();}},_onOverlayDestroy:function(p_sType,p_aArgs,p_oOverlay){this.remove(p_oOverlay);},register:function(overlay){if(overlay instanceof YAHOO.widget.Overlay){overlay.cfg.addProperty("manager",{value:this});overlay.focusEvent=new YAHOO.util.CustomEvent("focus",overlay);overlay.blurEvent=new YAHOO.util.CustomEvent("blur",overlay);var mgr=this;overlay.focus=function(){mgr.focus(this);};overlay.blur=function(){if(mgr.getActive()==this){YAHOO.util.Dom.removeClass(this.element,YAHOO.widget.OverlayManager.CSS_FOCUSED);this.blurEvent.fire();}};overlay.blurEvent.subscribe(mgr._onOverlayBlur);overlay.hideEvent.subscribe(overlay.blur);overlay.destroyEvent.subscribe(this._onOverlayDestroy,overlay,this);YAHOO.util.Event.addListener(overlay.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,overlay);var zIndex=YAHOO.util.Dom.getStyle(overlay.element,"zIndex");if(!isNaN(zIndex)){overlay.cfg.setProperty("zIndex",parseInt(zIndex,10));}else{overlay.cfg.setProperty("zIndex",0);}
this.overlays.push(overlay);return true;}else if(overlay instanceof Array){var regcount=0;for(var i=0;i<overlay.length;i++){if(this.register(overlay[i])){regcount++;}}
if(regcount>0){return true;}}else{return false;}},find:function(overlay){if(overlay instanceof YAHOO.widget.Overlay){for(var o=0;o<this.overlays.length;o++){if(this.overlays[o]==overlay){return this.overlays[o];}}}else if(typeof overlay=="string"){for(var p=0;p<this.overlays.length;p++){if(this.overlays[p].id==overlay){return this.overlays[p];}}}
return null;},compareZIndexDesc:function(o1,o2){var zIndex1=o1.cfg.getProperty("zIndex");var zIndex2=o2.cfg.getProperty("zIndex");if(zIndex1>zIndex2){return-1;}else if(zIndex1<zIndex2){return 1;}else{return 0;}},showAll:function(){for(var o=0;o<this.overlays.length;o++){this.overlays[o].show();}},hideAll:function(){for(var o=0;o<this.overlays.length;o++){this.overlays[o].hide();}},toString:function(){return"OverlayManager";}};YAHOO.widget.Tooltip=function(el,userConfig){YAHOO.widget.Tooltip.superclass.constructor.call(this,el,userConfig);};YAHOO.extend(YAHOO.widget.Tooltip,YAHOO.widget.Overlay);YAHOO.widget.Tooltip.CSS_TOOLTIP="yui-tt";YAHOO.widget.Tooltip._DEFAULT_CONFIG={"PREVENT_OVERLAP":{key:"preventoverlap",value:true,validator:YAHOO.lang.isBoolean,supercedes:["x","y","xy"]},"SHOW_DELAY":{key:"showdelay",value:200,validator:YAHOO.lang.isNumber},"AUTO_DISMISS_DELAY":{key:"autodismissdelay",value:5000,validator:YAHOO.lang.isNumber},"HIDE_DELAY":{key:"hidedelay",value:250,validator:YAHOO.lang.isNumber},"TEXT":{key:"text",suppressEvent:true},"CONTAINER":{key:"container"}};YAHOO.widget.Tooltip.prototype.init=function(el,userConfig){if(document.readyState&&document.readyState!="complete"){var deferredInit=function(){this.init(el,userConfig);};YAHOO.util.Event.addListener(window,"load",deferredInit,this,true);}else{YAHOO.widget.Tooltip.superclass.init.call(this,el);this.beforeInitEvent.fire(YAHOO.widget.Tooltip);YAHOO.util.Dom.addClass(this.element,YAHOO.widget.Tooltip.CSS_TOOLTIP);if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.queueProperty("visible",false);this.cfg.queueProperty("constraintoviewport",true);this.setBody("");this.render(this.cfg.getProperty("container"));this.initEvent.fire(YAHOO.widget.Tooltip);}};YAHOO.widget.Tooltip.prototype.initDefaultConfig=function(){YAHOO.widget.Tooltip.superclass.initDefaultConfig.call(this);var DEFAULT_CONFIG=YAHOO.widget.Tooltip._DEFAULT_CONFIG;this.cfg.addProperty(DEFAULT_CONFIG.PREVENT_OVERLAP.key,{value:DEFAULT_CONFIG.PREVENT_OVERLAP.value,validator:DEFAULT_CONFIG.PREVENT_OVERLAP.validator,supercedes:DEFAULT_CONFIG.PREVENT_OVERLAP.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.SHOW_DELAY.key,{handler:this.configShowDelay,value:200,validator:DEFAULT_CONFIG.SHOW_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.AUTO_DISMISS_DELAY.key,{handler:this.configAutoDismissDelay,value:DEFAULT_CONFIG.AUTO_DISMISS_DELAY.value,validator:DEFAULT_CONFIG.AUTO_DISMISS_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.HIDE_DELAY.key,{handler:this.configHideDelay,value:DEFAULT_CONFIG.HIDE_DELAY.value,validator:DEFAULT_CONFIG.HIDE_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.TEXT.key,{handler:this.configText,suppressEvent:DEFAULT_CONFIG.TEXT.suppressEvent});this.cfg.addProperty(DEFAULT_CONFIG.CONTAINER.key,{handler:this.configContainer,value:document.body});};YAHOO.widget.Tooltip.prototype.configText=function(type,args,obj){var text=args[0];if(text){this.setBody(text);}};YAHOO.widget.Tooltip.prototype.configContainer=function(type,args,obj){var container=args[0];if(typeof container=='string'){this.cfg.setProperty("container",document.getElementById(container),true);}};YAHOO.widget.Tooltip.prototype._removeEventListeners=function(){var aElements=this._context;if(aElements){var nElements=aElements.length;if(nElements>0){var i=nElements-1,oElement;do{oElement=aElements[i];YAHOO.util.Event.removeListener(oElement,"mouseover",this.onContextMouseOver);YAHOO.util.Event.removeListener(oElement,"mousemove",this.onContextMouseMove);YAHOO.util.Event.removeListener(oElement,"mouseout",this.onContextMouseOut);}
while(i--);}}};YAHOO.widget.Tooltip.prototype.configContext=function(type,args,obj){var context=args[0];if(context){if(!(context instanceof Array)){if(typeof context=="string"){this.cfg.setProperty("context",[document.getElementById(context)],true);}else{this.cfg.setProperty("context",[context],true);}
context=this.cfg.getProperty("context");}
this._removeEventListeners();this._context=context;var aElements=this._context;if(aElements){var nElements=aElements.length;if(nElements>0){var i=nElements-1,oElement;do{oElement=aElements[i];YAHOO.util.Event.addListener(oElement,"mouseover",this.onContextMouseOver,this);YAHOO.util.Event.addListener(oElement,"mousemove",this.onContextMouseMove,this);YAHOO.util.Event.addListener(oElement,"mouseout",this.onContextMouseOut,this);}
while(i--);}}}};YAHOO.widget.Tooltip.prototype.onContextMouseMove=function(e,obj){obj.pageX=YAHOO.util.Event.getPageX(e);obj.pageY=YAHOO.util.Event.getPageY(e);};YAHOO.widget.Tooltip.prototype.onContextMouseOver=function(e,obj){if(obj.hideProcId){clearTimeout(obj.hideProcId);obj.hideProcId=null;}
var context=this;YAHOO.util.Event.addListener(context,"mousemove",obj.onContextMouseMove,obj);if(context.title){obj._tempTitle=context.title;context.title="";}
obj.showProcId=obj.doShow(e,context);};YAHOO.widget.Tooltip.prototype.onContextMouseOut=function(e,obj){var el=this;if(obj._tempTitle){el.title=obj._tempTitle;obj._tempTitle=null;}
if(obj.showProcId){clearTimeout(obj.showProcId);obj.showProcId=null;}
if(obj.hideProcId){clearTimeout(obj.hideProcId);obj.hideProcId=null;}
obj.hideProcId=setTimeout(function(){obj.hide();},obj.cfg.getProperty("hidedelay"));};YAHOO.widget.Tooltip.prototype.doShow=function(e,context){var yOffset=25;if(this.browser=="opera"&&context.tagName&&context.tagName.toUpperCase()=="A"){yOffset+=12;}
var me=this;return setTimeout(function(){if(me._tempTitle){me.setBody(me._tempTitle);}else{me.cfg.refireEvent("text");}
me.moveTo(me.pageX,me.pageY+yOffset);if(me.cfg.getProperty("preventoverlap")){me.preventOverlap(me.pageX,me.pageY);}
YAHOO.util.Event.removeListener(context,"mousemove",me.onContextMouseMove);me.show();me.hideProcId=me.doHide();},this.cfg.getProperty("showdelay"));};YAHOO.widget.Tooltip.prototype.doHide=function(){var me=this;return setTimeout(function(){me.hide();},this.cfg.getProperty("autodismissdelay"));};YAHOO.widget.Tooltip.prototype.preventOverlap=function(pageX,pageY){var height=this.element.offsetHeight;var elementRegion=YAHOO.util.Dom.getRegion(this.element);elementRegion.top-=5;elementRegion.left-=5;elementRegion.right+=5;elementRegion.bottom+=5;var mousePoint=new YAHOO.util.Point(pageX,pageY);if(elementRegion.contains(mousePoint)){this.cfg.setProperty("y",(pageY-height-5));}};YAHOO.widget.Tooltip.prototype.destroy=function(){this._removeEventListeners();YAHOO.widget.Tooltip.superclass.destroy.call(this);};YAHOO.widget.Tooltip.prototype.toString=function(){return"Tooltip "+this.id;};YAHOO.widget.Panel=function(el,userConfig){YAHOO.widget.Panel.superclass.constructor.call(this,el,userConfig);};YAHOO.extend(YAHOO.widget.Panel,YAHOO.widget.Overlay);YAHOO.widget.Panel.CSS_PANEL="yui-panel";YAHOO.widget.Panel.CSS_PANEL_CONTAINER="yui-panel-container";YAHOO.widget.Panel._EVENT_TYPES={"SHOW_MASK":"showMask","HIDE_MASK":"hideMask","DRAG":"drag"};YAHOO.widget.Panel._DEFAULT_CONFIG={"CLOSE":{key:"close",value:true,validator:YAHOO.lang.isBoolean,supercedes:["visible"]},"DRAGGABLE":{key:"draggable",value:(YAHOO.util.DD?true:false),validator:YAHOO.lang.isBoolean,supercedes:["visible"]},"UNDERLAY":{key:"underlay",value:"shadow",supercedes:["visible"]},"MODAL":{key:"modal",value:false,validator:YAHOO.lang.isBoolean,supercedes:["visible"]},"KEY_LISTENERS":{key:"keylisteners",suppressEvent:true,supercedes:["visible"]}};YAHOO.widget.Panel.prototype.init=function(el,userConfig){YAHOO.widget.Panel.superclass.init.call(this,el);this.beforeInitEvent.fire(YAHOO.widget.Panel);YAHOO.util.Dom.addClass(this.element,YAHOO.widget.Panel.CSS_PANEL);this.buildWrapper();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.beforeRenderEvent.subscribe(function(){var draggable=this.cfg.getProperty("draggable");if(draggable){if(!this.header){this.setHeader("&#160;");}}},this,true);this.renderEvent.subscribe(function(){var sWidth=this.cfg.getProperty("width");if(!sWidth){this.cfg.setProperty("width",(this.element.offsetWidth+"px"));}});var me=this;var doBlur=function(){this.blur();};this.showMaskEvent.subscribe(function(){var checkFocusable=function(el){var sTagName=el.tagName.toUpperCase(),bFocusable=false;switch(sTagName){case"A":case"BUTTON":case"SELECT":case"TEXTAREA":if(!YAHOO.util.Dom.isAncestor(me.element,el)){YAHOO.util.Event.addListener(el,"focus",doBlur,el,true);bFocusable=true;}
break;case"INPUT":if(el.type!="hidden"&&!YAHOO.util.Dom.isAncestor(me.element,el)){YAHOO.util.Event.addListener(el,"focus",doBlur,el,true);bFocusable=true;}
break;}
return bFocusable;};this.focusableElements=YAHOO.util.Dom.getElementsBy(checkFocusable);},this,true);this.hideMaskEvent.subscribe(function(){for(var i=0;i<this.focusableElements.length;i++){var el2=this.focusableElements[i];YAHOO.util.Event.removeListener(el2,"focus",doBlur);}},this,true);this.beforeShowEvent.subscribe(function(){this.cfg.refireEvent("underlay");},this,true);this.initEvent.fire(YAHOO.widget.Panel);};YAHOO.widget.Panel.prototype.initEvents=function(){YAHOO.widget.Panel.superclass.initEvents.call(this);var EVENT_TYPES=YAHOO.widget.Panel._EVENT_TYPES;this.showMaskEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.SHOW_MASK,this);this.hideMaskEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.HIDE_MASK,this);this.dragEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.DRAG,this);};YAHOO.widget.Panel.prototype.initDefaultConfig=function(){YAHOO.widget.Panel.superclass.initDefaultConfig.call(this);var DEFAULT_CONFIG=YAHOO.widget.Panel._DEFAULT_CONFIG;this.cfg.addProperty(DEFAULT_CONFIG.CLOSE.key,{handler:this.configClose,value:DEFAULT_CONFIG.CLOSE.value,validator:DEFAULT_CONFIG.CLOSE.validator,supercedes:DEFAULT_CONFIG.CLOSE.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.DRAGGABLE.key,{handler:this.configDraggable,value:DEFAULT_CONFIG.DRAGGABLE.value,validator:DEFAULT_CONFIG.DRAGGABLE.validator,supercedes:DEFAULT_CONFIG.DRAGGABLE.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.UNDERLAY.key,{handler:this.configUnderlay,value:DEFAULT_CONFIG.UNDERLAY.value,supercedes:DEFAULT_CONFIG.UNDERLAY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.MODAL.key,{handler:this.configModal,value:DEFAULT_CONFIG.MODAL.value,validator:DEFAULT_CONFIG.MODAL.validator,supercedes:DEFAULT_CONFIG.MODAL.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.KEY_LISTENERS.key,{handler:this.configKeyListeners,suppressEvent:DEFAULT_CONFIG.KEY_LISTENERS.suppressEvent,supercedes:DEFAULT_CONFIG.KEY_LISTENERS.supercedes});};YAHOO.widget.Panel.prototype.configClose=function(type,args,obj){var val=args[0];var doHide=function(e,obj){obj.hide();};if(val){if(!this.close){this.close=document.createElement("span");YAHOO.util.Dom.addClass(this.close,"container-close");this.close.innerHTML="&#160;";this.innerElement.appendChild(this.close);YAHOO.util.Event.addListener(this.close,"click",doHide,this);}else{this.close.style.display="block";}}else{if(this.close){this.close.style.display="none";}}};YAHOO.widget.Panel.prototype.configDraggable=function(type,args,obj){var val=args[0];if(val){if(!YAHOO.util.DD){this.cfg.setProperty("draggable",false);return;}
if(this.header){YAHOO.util.Dom.setStyle(this.header,"cursor","move");this.registerDragDrop();}}else{if(this.dd){this.dd.unreg();}
if(this.header){YAHOO.util.Dom.setStyle(this.header,"cursor","auto");}}};YAHOO.widget.Panel.prototype.configUnderlay=function(type,args,obj){var val=args[0];switch(val.toLowerCase()){case"shadow":YAHOO.util.Dom.removeClass(this.element,"matte");YAHOO.util.Dom.addClass(this.element,"shadow");if(!this.underlay){this.underlay=document.createElement("div");this.underlay.className="underlay";this.underlay.innerHTML="&#160;";this.element.appendChild(this.underlay);}
this.sizeUnderlay();break;case"matte":YAHOO.util.Dom.removeClass(this.element,"shadow");YAHOO.util.Dom.addClass(this.element,"matte");break;default:YAHOO.util.Dom.removeClass(this.element,"shadow");YAHOO.util.Dom.removeClass(this.element,"matte");break;}};YAHOO.widget.Panel.prototype.configModal=function(type,args,obj){var modal=args[0];if(modal){this.buildMask();if(!YAHOO.util.Config.alreadySubscribed(this.beforeShowEvent,this.showMask,this)){this.beforeShowEvent.subscribe(this.showMask,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.hideEvent,this.hideMask,this)){this.hideEvent.subscribe(this.hideMask,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(YAHOO.widget.Overlay.windowResizeEvent,this.sizeMask,this)){YAHOO.widget.Overlay.windowResizeEvent.subscribe(this.sizeMask,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.destroyEvent,this.removeMask,this)){this.destroyEvent.subscribe(this.removeMask,this,true);}
this.cfg.refireEvent("zIndex");}else{this.beforeShowEvent.unsubscribe(this.showMask,this);this.hideEvent.unsubscribe(this.hideMask,this);YAHOO.widget.Overlay.windowResizeEvent.unsubscribe(this.sizeMask,this);this.destroyEvent.unsubscribe(this.removeMask,this);}};YAHOO.widget.Panel.prototype.removeMask=function(){var oMask=this.mask;if(oMask){this.hideMask();var oParentNode=oMask.parentNode;if(oParentNode){oParentNode.removeChild(oMask);}
this.mask=null;}};YAHOO.widget.Panel.prototype.configKeyListeners=function(type,args,obj){var listeners=args[0];if(listeners){if(listeners instanceof Array){for(var i=0;i<listeners.length;i++){var listener=listeners[i];if(!YAHOO.util.Config.alreadySubscribed(this.showEvent,listener.enable,listener)){this.showEvent.subscribe(listener.enable,listener,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.hideEvent,listener.disable,listener)){this.hideEvent.subscribe(listener.disable,listener,true);this.destroyEvent.subscribe(listener.disable,listener,true);}}}else{if(!YAHOO.util.Config.alreadySubscribed(this.showEvent,listeners.enable,listeners)){this.showEvent.subscribe(listeners.enable,listeners,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.hideEvent,listeners.disable,listeners)){this.hideEvent.subscribe(listeners.disable,listeners,true);this.destroyEvent.subscribe(listeners.disable,listeners,true);}}}};YAHOO.widget.Panel.prototype.configHeight=function(type,args,obj){var height=args[0];var el=this.innerElement;YAHOO.util.Dom.setStyle(el,"height",height);this.cfg.refireEvent("underlay");this.cfg.refireEvent("iframe");};YAHOO.widget.Panel.prototype.configWidth=function(type,args,obj){var width=args[0];var el=this.innerElement;YAHOO.util.Dom.setStyle(el,"width",width);this.cfg.refireEvent("underlay");this.cfg.refireEvent("iframe");};YAHOO.widget.Panel.prototype.configzIndex=function(type,args,obj){YAHOO.widget.Panel.superclass.configzIndex.call(this,type,args,obj);var maskZ=0;var currentZ=YAHOO.util.Dom.getStyle(this.element,"zIndex");if(this.mask){if(!currentZ||isNaN(currentZ)){currentZ=0;}
if(currentZ===0){this.cfg.setProperty("zIndex",1);}else{maskZ=currentZ-1;YAHOO.util.Dom.setStyle(this.mask,"zIndex",maskZ);}}};YAHOO.widget.Panel.prototype.buildWrapper=function(){var elementParent=this.element.parentNode;var originalElement=this.element;var wrapper=document.createElement("div");wrapper.className=YAHOO.widget.Panel.CSS_PANEL_CONTAINER;wrapper.id=originalElement.id+"_c";if(elementParent){elementParent.insertBefore(wrapper,originalElement);}
wrapper.appendChild(originalElement);this.element=wrapper;this.innerElement=originalElement;YAHOO.util.Dom.setStyle(this.innerElement,"visibility","inherit");};YAHOO.widget.Panel.prototype.sizeUnderlay=function(){if(this.underlay&&this.browser!="gecko"&&this.browser!="safari"){this.underlay.style.width=this.innerElement.offsetWidth+"px";this.underlay.style.height=this.innerElement.offsetHeight+"px";}};YAHOO.widget.Panel.prototype.onDomResize=function(e,obj){YAHOO.widget.Panel.superclass.onDomResize.call(this,e,obj);var me=this;setTimeout(function(){me.sizeUnderlay();},0);};YAHOO.widget.Panel.prototype.registerDragDrop=function(){if(this.header){if(!YAHOO.util.DD){return;}
this.dd=new YAHOO.util.DD(this.element.id,this.id);if(!this.header.id){this.header.id=this.id+"_h";}
var me=this;this.dd.startDrag=function(){if(me.browser=="ie"){YAHOO.util.Dom.addClass(me.element,"drag");}
if(me.cfg.getProperty("constraintoviewport")){var offsetHeight=me.element.offsetHeight;var offsetWidth=me.element.offsetWidth;var viewPortWidth=YAHOO.util.Dom.getViewportWidth();var viewPortHeight=YAHOO.util.Dom.getViewportHeight();var scrollX=window.scrollX||document.documentElement.scrollLeft;var scrollY=window.scrollY||document.documentElement.scrollTop;var topConstraint=scrollY+10;var leftConstraint=scrollX+10;var bottomConstraint=scrollY+viewPortHeight-offsetHeight-10;var rightConstraint=scrollX+viewPortWidth-offsetWidth-10;this.minX=leftConstraint;this.maxX=rightConstraint;this.constrainX=true;this.minY=topConstraint;this.maxY=bottomConstraint;this.constrainY=true;}else{this.constrainX=false;this.constrainY=false;}
me.dragEvent.fire("startDrag",arguments);};this.dd.onDrag=function(){me.syncPosition();me.cfg.refireEvent("iframe");if(this.platform=="mac"&&this.browser=="gecko"){this.showMacGeckoScrollbars();}
me.dragEvent.fire("onDrag",arguments);};this.dd.endDrag=function(){if(me.browser=="ie"){YAHOO.util.Dom.removeClass(me.element,"drag");}
me.dragEvent.fire("endDrag",arguments);};this.dd.setHandleElId(this.header.id);this.dd.addInvalidHandleType("INPUT");this.dd.addInvalidHandleType("SELECT");this.dd.addInvalidHandleType("TEXTAREA");}};YAHOO.widget.Panel.prototype.buildMask=function(){if(!this.mask){this.mask=document.createElement("div");this.mask.id=this.id+"_mask";this.mask.className="mask";this.mask.innerHTML="&#160;";var maskClick=function(e,obj){YAHOO.util.Event.stopEvent(e);};var firstChild=document.body.firstChild;if(firstChild){document.body.insertBefore(this.mask,document.body.firstChild);}else{document.body.appendChild(this.mask);}}};YAHOO.widget.Panel.prototype.hideMask=function(){if(this.cfg.getProperty("modal")&&this.mask){this.mask.style.display="none";this.hideMaskEvent.fire();YAHOO.util.Dom.removeClass(document.body,"masked");}};YAHOO.widget.Panel.prototype.showMask=function(){if(this.cfg.getProperty("modal")&&this.mask){YAHOO.util.Dom.addClass(document.body,"masked");this.sizeMask();this.mask.style.display="block";this.showMaskEvent.fire();}};YAHOO.widget.Panel.prototype.sizeMask=function(){if(this.mask){this.mask.style.height=YAHOO.util.Dom.getDocumentHeight()+"px";this.mask.style.width=YAHOO.util.Dom.getDocumentWidth()+"px";}};YAHOO.widget.Panel.prototype.render=function(appendToNode){return YAHOO.widget.Panel.superclass.render.call(this,appendToNode,this.innerElement);};YAHOO.widget.Panel.prototype.destroy=function(){YAHOO.widget.Overlay.windowResizeEvent.unsubscribe(this.sizeMask,this);if(this.close){YAHOO.util.Event.purgeElement(this.close);}
YAHOO.widget.Panel.superclass.destroy.call(this);};YAHOO.widget.Panel.prototype.toString=function(){return"Panel "+this.id;};YAHOO.widget.Dialog=function(el,userConfig){YAHOO.widget.Dialog.superclass.constructor.call(this,el,userConfig);};YAHOO.extend(YAHOO.widget.Dialog,YAHOO.widget.Panel);YAHOO.widget.Dialog.CSS_DIALOG="yui-dialog";YAHOO.widget.Dialog._EVENT_TYPES={"BEFORE_SUBMIT":"beforeSubmit","SUBMIT":"submit","MANUAL_SUBMIT":"manualSubmit","ASYNC_SUBMIT":"asyncSubmit","FORM_SUBMIT":"formSubmit","CANCEL":"cancel"};YAHOO.widget.Dialog._DEFAULT_CONFIG={"POST_METHOD":{key:"postmethod",value:"async"},"BUTTONS":{key:"buttons",value:"none"}};YAHOO.widget.Dialog.prototype.initDefaultConfig=function(){YAHOO.widget.Dialog.superclass.initDefaultConfig.call(this);this.callback={success:null,failure:null,argument:null};var DEFAULT_CONFIG=YAHOO.widget.Dialog._DEFAULT_CONFIG;this.cfg.addProperty(DEFAULT_CONFIG.POST_METHOD.key,{handler:this.configPostMethod,value:DEFAULT_CONFIG.POST_METHOD.value,validator:function(val){if(val!="form"&&val!="async"&&val!="none"&&val!="manual"){return false;}else{return true;}}});this.cfg.addProperty(DEFAULT_CONFIG.BUTTONS.key,{handler:this.configButtons,value:DEFAULT_CONFIG.BUTTONS.value});};YAHOO.widget.Dialog.prototype.initEvents=function(){YAHOO.widget.Dialog.superclass.initEvents.call(this);var EVENT_TYPES=YAHOO.widget.Dialog._EVENT_TYPES;this.beforeSubmitEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_SUBMIT,this);this.submitEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.SUBMIT,this);this.manualSubmitEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.MANUAL_SUBMIT,this);this.asyncSubmitEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.ASYNC_SUBMIT,this);this.formSubmitEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.FORM_SUBMIT,this);this.cancelEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.CANCEL,this);};YAHOO.widget.Dialog.prototype.init=function(el,userConfig){YAHOO.widget.Dialog.superclass.init.call(this,el);this.beforeInitEvent.fire(YAHOO.widget.Dialog);YAHOO.util.Dom.addClass(this.element,YAHOO.widget.Dialog.CSS_DIALOG);this.cfg.setProperty("visible",false);if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.showEvent.subscribe(this.focusFirst,this,true);this.beforeHideEvent.subscribe(this.blurButtons,this,true);this.beforeRenderEvent.subscribe(function(){var buttonCfg=this.cfg.getProperty("buttons");if(buttonCfg&&buttonCfg!="none"){if(!this.footer){this.setFooter("");}}},this,true);this.initEvent.fire(YAHOO.widget.Dialog);};YAHOO.widget.Dialog.prototype.doSubmit=function(){var pm=this.cfg.getProperty("postmethod");switch(pm){case"async":var method=this.form.getAttribute("method")||'POST';method=method.toUpperCase();YAHOO.util.Connect.setForm(this.form);var cObj=YAHOO.util.Connect.asyncRequest(method,this.form.getAttribute("action"),this.callback);this.asyncSubmitEvent.fire();break;case"form":this.form.submit();this.formSubmitEvent.fire();break;case"none":case"manual":this.manualSubmitEvent.fire();break;}};YAHOO.widget.Dialog.prototype._onFormKeyDown=function(p_oEvent){var oTarget=YAHOO.util.Event.getTarget(p_oEvent),nCharCode=YAHOO.util.Event.getCharCode(p_oEvent);if(nCharCode==13&&oTarget.tagName&&oTarget.tagName.toUpperCase()=="INPUT"){var sType=oTarget.type;if(sType=="text"||sType=="password"||sType=="checkbox"||sType=="radio"||sType=="file"){this.defaultHtmlButton.click();}}};YAHOO.widget.Dialog.prototype.registerForm=function(){var form=this.element.getElementsByTagName("form")[0];if(!form){var formHTML="<form name=\"frm_"+this.id+"\" action=\"\"></form>";this.body.innerHTML+=formHTML;form=this.element.getElementsByTagName("form")[0];}
this.firstFormElement=function(){for(var f=0;f<form.elements.length;f++){var el=form.elements[f];if(el.focus&&!el.disabled){if(el.type&&el.type!="hidden"){return el;}}}
return null;}();this.lastFormElement=function(){for(var f=form.elements.length-1;f>=0;f--){var el=form.elements[f];if(el.focus&&!el.disabled){if(el.type&&el.type!="hidden"){return el;}}}
return null;}();this.form=form;if(this.form&&(this.browser=="ie"||this.browser=="ie7"||this.browser=="gecko")){YAHOO.util.Event.addListener(this.form,"keydown",this._onFormKeyDown,null,this);}
if(this.cfg.getProperty("modal")&&this.form){var me=this;var firstElement=this.firstFormElement||this.firstButton;if(firstElement){this.preventBackTab=new YAHOO.util.KeyListener(firstElement,{shift:true,keys:9},{fn:me.focusLast,scope:me,correctScope:true});this.showEvent.subscribe(this.preventBackTab.enable,this.preventBackTab,true);this.hideEvent.subscribe(this.preventBackTab.disable,this.preventBackTab,true);}
var lastElement=this.lastButton||this.lastFormElement;if(lastElement){this.preventTabOut=new YAHOO.util.KeyListener(lastElement,{shift:false,keys:9},{fn:me.focusFirst,scope:me,correctScope:true});this.showEvent.subscribe(this.preventTabOut.enable,this.preventTabOut,true);this.hideEvent.subscribe(this.preventTabOut.disable,this.preventTabOut,true);}}};YAHOO.widget.Dialog.prototype.configClose=function(type,args,obj){var val=args[0];var doCancel=function(e,obj){obj.cancel();};if(val){if(!this.close){this.close=document.createElement("div");YAHOO.util.Dom.addClass(this.close,"container-close");this.close.innerHTML="&#160;";this.innerElement.appendChild(this.close);YAHOO.util.Event.addListener(this.close,"click",doCancel,this);}else{this.close.style.display="block";}}else{if(this.close){this.close.style.display="none";}}};YAHOO.widget.Dialog.prototype.configButtons=function(type,args,obj){var buttons=args[0];if(buttons!="none"){this.buttonSpan=null;this.buttonSpan=document.createElement("span");this.buttonSpan.className="button-group";for(var b=0;b<buttons.length;b++){var button=buttons[b];var htmlButton=document.createElement("button");htmlButton.setAttribute("type","button");if(button.isDefault){htmlButton.className="default";this.defaultHtmlButton=htmlButton;}
htmlButton.appendChild(document.createTextNode(button.text));YAHOO.util.Event.addListener(htmlButton,"click",button.handler,this,true);this.buttonSpan.appendChild(htmlButton);button.htmlButton=htmlButton;if(b===0){this.firstButton=button.htmlButton;}
if(b==(buttons.length-1)){this.lastButton=button.htmlButton;}}
this.setFooter(this.buttonSpan);this.cfg.refireEvent("iframe");this.cfg.refireEvent("underlay");}else{if(this.buttonSpan){if(this.buttonSpan.parentNode){this.buttonSpan.parentNode.removeChild(this.buttonSpan);}
this.buttonSpan=null;this.firstButton=null;this.lastButton=null;this.defaultHtmlButton=null;}}};YAHOO.widget.Dialog.prototype.focusFirst=function(type,args,obj){if(args){var e=args[1];if(e){YAHOO.util.Event.stopEvent(e);}}
if(this.firstFormElement){this.firstFormElement.focus();}else{this.focusDefaultButton();}};YAHOO.widget.Dialog.prototype.focusLast=function(type,args,obj){if(args){var e=args[1];if(e){YAHOO.util.Event.stopEvent(e);}}
var buttons=this.cfg.getProperty("buttons");if(buttons&&buttons instanceof Array){this.focusLastButton();}else{if(this.lastFormElement){this.lastFormElement.focus();}}};YAHOO.widget.Dialog.prototype.focusDefaultButton=function(){if(this.defaultHtmlButton){this.defaultHtmlButton.focus();}};YAHOO.widget.Dialog.prototype.blurButtons=function(){var buttons=this.cfg.getProperty("buttons");if(buttons&&buttons instanceof Array){var html=buttons[0].htmlButton;if(html){html.blur();}}};YAHOO.widget.Dialog.prototype.focusFirstButton=function(){var buttons=this.cfg.getProperty("buttons");if(buttons&&buttons instanceof Array){var html=buttons[0].htmlButton;if(html){html.focus();}}};YAHOO.widget.Dialog.prototype.focusLastButton=function(){var buttons=this.cfg.getProperty("buttons");if(buttons&&buttons instanceof Array){var html=buttons[buttons.length-1].htmlButton;if(html){html.focus();}}};YAHOO.widget.Dialog.prototype.configPostMethod=function(type,args,obj){var postmethod=args[0];this.registerForm();YAHOO.util.Event.addListener(this.form,"submit",function(e){YAHOO.util.Event.stopEvent(e);this.submit();this.form.blur();},this,true);};YAHOO.widget.Dialog.prototype.validate=function(){return true;};YAHOO.widget.Dialog.prototype.submit=function(){if(this.validate()){this.beforeSubmitEvent.fire();this.doSubmit();this.submitEvent.fire();this.hide();return true;}else{return false;}};YAHOO.widget.Dialog.prototype.cancel=function(){this.cancelEvent.fire();this.hide();};YAHOO.widget.Dialog.prototype.getData=function(){var oForm=this.form;if(oForm){var aElements=oForm.elements,nTotalElements=aElements.length,oData={},sName,oElement,nElements;for(var i=0;i<nTotalElements;i++){sName=aElements[i].name;function isFormElement(p_oElement){var sTagName=p_oElement.tagName.toUpperCase();return((sTagName=="INPUT"||sTagName=="TEXTAREA"||sTagName=="SELECT")&&p_oElement.name==sName);}
oElement=YAHOO.util.Dom.getElementsBy(isFormElement,"*",oForm);nElements=oElement.length;if(nElements>0){if(nElements==1){oElement=oElement[0];var sType=oElement.type,sTagName=oElement.tagName.toUpperCase();switch(sTagName){case"INPUT":if(sType=="checkbox"){oData[sName]=oElement.checked;}
else if(sType!="radio"){oData[sName]=oElement.value;}
break;case"TEXTAREA":oData[sName]=oElement.value;break;case"SELECT":var aOptions=oElement.options,nOptions=aOptions.length,aValues=[],oOption,sValue;for(var n=0;n<nOptions;n++){oOption=aOptions[n];if(oOption.selected){sValue=oOption.value;if(!sValue||sValue===""){sValue=oOption.text;}
aValues[aValues.length]=sValue;}}
oData[sName]=aValues;break;}}
else{var sType=oElement[0].type;switch(sType){case"radio":var oRadio;for(var n=0;n<nElements;n++){oRadio=oElement[n];if(oRadio.checked){oData[sName]=oRadio.value;break;}}
break;case"checkbox":var aValues=[],oCheckbox;for(var n=0;n<nElements;n++){oCheckbox=oElement[n];if(oCheckbox.checked){aValues[aValues.length]=oCheckbox.value;}}
oData[sName]=aValues;break;}}}}}
return oData;};YAHOO.widget.Dialog.prototype.destroy=function(){var Event=YAHOO.util.Event,oForm=this.form,oFooter=this.footer;if(oFooter){var aButtons=oFooter.getElementsByTagName("button");if(aButtons&&aButtons.length>0){var i=aButtons.length-1;do{Event.purgeElement(aButtons[i],false,"click");}
while(i--);}}
if(oForm){Event.purgeElement(oForm);this.body.removeChild(oForm);this.form=null;}
YAHOO.widget.Dialog.superclass.destroy.call(this);};YAHOO.widget.Dialog.prototype.toString=function(){return"Dialog "+this.id;};YAHOO.widget.SimpleDialog=function(el,userConfig){YAHOO.widget.SimpleDialog.superclass.constructor.call(this,el,userConfig);};YAHOO.extend(YAHOO.widget.SimpleDialog,YAHOO.widget.Dialog);YAHOO.widget.SimpleDialog.ICON_BLOCK="blckicon";YAHOO.widget.SimpleDialog.ICON_ALARM="alrticon";YAHOO.widget.SimpleDialog.ICON_HELP="hlpicon";YAHOO.widget.SimpleDialog.ICON_INFO="infoicon";YAHOO.widget.SimpleDialog.ICON_WARN="warnicon";YAHOO.widget.SimpleDialog.ICON_TIP="tipicon";YAHOO.widget.SimpleDialog.CSS_SIMPLEDIALOG="yui-simple-dialog";YAHOO.widget.SimpleDialog._DEFAULT_CONFIG={"ICON":{key:"icon",value:"none",suppressEvent:true},"TEXT":{key:"text",value:"",suppressEvent:true,supercedes:["icon"]}};YAHOO.widget.SimpleDialog.prototype.initDefaultConfig=function(){YAHOO.widget.SimpleDialog.superclass.initDefaultConfig.call(this);var DEFAULT_CONFIG=YAHOO.widget.SimpleDialog._DEFAULT_CONFIG;this.cfg.addProperty(DEFAULT_CONFIG.ICON.key,{handler:this.configIcon,value:DEFAULT_CONFIG.ICON.value,suppressEvent:DEFAULT_CONFIG.ICON.suppressEvent});this.cfg.addProperty(DEFAULT_CONFIG.TEXT.key,{handler:this.configText,value:DEFAULT_CONFIG.TEXT.value,suppressEvent:DEFAULT_CONFIG.TEXT.suppressEvent,supercedes:DEFAULT_CONFIG.TEXT.supercedes});};YAHOO.widget.SimpleDialog.prototype.init=function(el,userConfig){YAHOO.widget.SimpleDialog.superclass.init.call(this,el);this.beforeInitEvent.fire(YAHOO.widget.SimpleDialog);YAHOO.util.Dom.addClass(this.element,YAHOO.widget.SimpleDialog.CSS_SIMPLEDIALOG);this.cfg.queueProperty("postmethod","manual");if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.beforeRenderEvent.subscribe(function(){if(!this.body){this.setBody("");}},this,true);this.initEvent.fire(YAHOO.widget.SimpleDialog);};YAHOO.widget.SimpleDialog.prototype.registerForm=function(){YAHOO.widget.SimpleDialog.superclass.registerForm.call(this);this.form.innerHTML+="<input type=\"hidden\" name=\""+this.id+"\" value=\"\"/>";};YAHOO.widget.SimpleDialog.prototype.configIcon=function(type,args,obj){var icon=args[0];if(icon&&icon!="none"){var iconHTML="";if(icon.indexOf(".")==-1){iconHTML="<span class=\"yui-icon "+icon+"\" >&#160;</span>";}else{iconHTML="<img src=\""+this.imageRoot+icon+"\" class=\"yui-icon\" />";}
this.body.innerHTML=iconHTML+this.body.innerHTML;}};YAHOO.widget.SimpleDialog.prototype.configText=function(type,args,obj){var text=args[0];if(text){this.setBody(text);this.cfg.refireEvent("icon");}};YAHOO.widget.SimpleDialog.prototype.toString=function(){return"SimpleDialog "+this.id;};YAHOO.widget.ContainerEffect=function(overlay,attrIn,attrOut,targetElement,animClass){if(!animClass){animClass=YAHOO.util.Anim;}
this.overlay=overlay;this.attrIn=attrIn;this.attrOut=attrOut;this.targetElement=targetElement||overlay.element;this.animClass=animClass;};YAHOO.widget.ContainerEffect.prototype.init=function(){this.beforeAnimateInEvent=new YAHOO.util.CustomEvent("beforeAnimateIn",this);this.beforeAnimateOutEvent=new YAHOO.util.CustomEvent("beforeAnimateOut",this);this.animateInCompleteEvent=new YAHOO.util.CustomEvent("animateInComplete",this);this.animateOutCompleteEvent=new YAHOO.util.CustomEvent("animateOutComplete",this);this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);};YAHOO.widget.ContainerEffect.prototype.animateIn=function(){this.beforeAnimateInEvent.fire();this.animIn.animate();};YAHOO.widget.ContainerEffect.prototype.animateOut=function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();};YAHOO.widget.ContainerEffect.prototype.handleStartAnimateIn=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleTweenAnimateIn=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleCompleteAnimateIn=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleStartAnimateOut=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleTweenAnimateOut=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleCompleteAnimateOut=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.toString=function(){var output="ContainerEffect";if(this.overlay){output+=" ["+this.overlay.toString()+"]";}
return output;};YAHOO.widget.ContainerEffect.FADE=function(overlay,dur){var fade=new YAHOO.widget.ContainerEffect(overlay,{attributes:{opacity:{from:0,to:1}},duration:dur,method:YAHOO.util.Easing.easeIn},{attributes:{opacity:{to:0}},duration:dur,method:YAHOO.util.Easing.easeOut},overlay.element);fade.handleStartAnimateIn=function(type,args,obj){YAHOO.util.Dom.addClass(obj.overlay.element,"hide-select");if(!obj.overlay.underlay){obj.overlay.cfg.refireEvent("underlay");}
if(obj.overlay.underlay){obj.initialUnderlayOpacity=YAHOO.util.Dom.getStyle(obj.overlay.underlay,"opacity");obj.overlay.underlay.style.filter=null;}
YAHOO.util.Dom.setStyle(obj.overlay.element,"visibility","visible");YAHOO.util.Dom.setStyle(obj.overlay.element,"opacity",0);};fade.handleCompleteAnimateIn=function(type,args,obj){YAHOO.util.Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
if(obj.overlay.underlay){YAHOO.util.Dom.setStyle(obj.overlay.underlay,"opacity",obj.initialUnderlayOpacity);}
obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};fade.handleStartAnimateOut=function(type,args,obj){YAHOO.util.Dom.addClass(obj.overlay.element,"hide-select");if(obj.overlay.underlay){obj.overlay.underlay.style.filter=null;}};fade.handleCompleteAnimateOut=function(type,args,obj){YAHOO.util.Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
YAHOO.util.Dom.setStyle(obj.overlay.element,"visibility","hidden");YAHOO.util.Dom.setStyle(obj.overlay.element,"opacity",1);obj.overlay.cfg.refireEvent("iframe");obj.animateOutCompleteEvent.fire();};fade.init();return fade;};YAHOO.widget.ContainerEffect.SLIDE=function(overlay,dur){var x=overlay.cfg.getProperty("x")||YAHOO.util.Dom.getX(overlay.element);var y=overlay.cfg.getProperty("y")||YAHOO.util.Dom.getY(overlay.element);var clientWidth=YAHOO.util.Dom.getClientWidth();var offsetWidth=overlay.element.offsetWidth;var slide=new YAHOO.widget.ContainerEffect(overlay,{attributes:{points:{to:[x,y]}},duration:dur,method:YAHOO.util.Easing.easeIn},{attributes:{points:{to:[(clientWidth+25),y]}},duration:dur,method:YAHOO.util.Easing.easeOut},overlay.element,YAHOO.util.Motion);slide.handleStartAnimateIn=function(type,args,obj){obj.overlay.element.style.left=(-25-offsetWidth)+"px";obj.overlay.element.style.top=y+"px";};slide.handleTweenAnimateIn=function(type,args,obj){var pos=YAHOO.util.Dom.getXY(obj.overlay.element);var currentX=pos[0];var currentY=pos[1];if(YAHOO.util.Dom.getStyle(obj.overlay.element,"visibility")=="hidden"&&currentX<x){YAHOO.util.Dom.setStyle(obj.overlay.element,"visibility","visible");}
obj.overlay.cfg.setProperty("xy",[currentX,currentY],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateIn=function(type,args,obj){obj.overlay.cfg.setProperty("xy",[x,y],true);obj.startX=x;obj.startY=y;obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};slide.handleStartAnimateOut=function(type,args,obj){var vw=YAHOO.util.Dom.getViewportWidth();var pos=YAHOO.util.Dom.getXY(obj.overlay.element);var yso=pos[1];var currentTo=obj.animOut.attributes.points.to;obj.animOut.attributes.points.to=[(vw+25),yso];};slide.handleTweenAnimateOut=function(type,args,obj){var pos=YAHOO.util.Dom.getXY(obj.overlay.element);var xto=pos[0];var yto=pos[1];obj.overlay.cfg.setProperty("xy",[xto,yto],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateOut=function(type,args,obj){YAHOO.util.Dom.setStyle(obj.overlay.element,"visibility","hidden");obj.overlay.cfg.setProperty("xy",[x,y]);obj.animateOutCompleteEvent.fire();};slide.init();return slide;};YAHOO.register("container",YAHOO.widget.Module,{version:"2.2.2",build:"204"});
// ULT Beaconing

if(typeof YAHOO=="undefined"){YAHOO={};}
if(!YAHOO.ULT){YAHOO.ULT={};}
if(!YAHOO.ULT.BEACON){YAHOO.ULT.BEACON="http://geo.yahoo.com/t";}
if(!YAHOO.ULT.IMG){YAHOO.ULT.IMG=new Image();}
YAHOO.ULT.SRC_SPACEID_KEY='_S';YAHOO.ULT.DEST_SPACEID_KEY='_s';YAHOO.ULT.YLC_LIBSRC=2;YAHOO.ULT.CTRL_C='\x03';YAHOO.ULT.CTRL_D='\x04';YAHOO.ULT.BASE64_STR="ABCDEFGHIJKLMNOP"+"QRSTUVWXYZabcdef"+"ghijklmnopqrstuv"+"wxyz0123456789._-";(function(){YAHOO.ULT.track_click=function(u,p){if(!u||!p){return u;}
p._r=YAHOO.ULT.YLC_LIBSRC;var ks=[];var i=0;for(var k in p){var v=p[k];if(typeof(v)=='undefined'){v=p[k]='';}
if(k.length<1){return u;}
if(k.length>8){return u;}
if(k.indexOf(' ')!=-1){return u;}
if(YAHOO.ULT.has_ctrl_char(k)||YAHOO.ULT.has_ctrl_char(v)){return u;}
ks[i++]=k;}
ks=ks.sort();var f=[];for(i=0;i<ks.length;i++){f[i]=ks[i]+YAHOO.ULT.CTRL_C+p[ks[i]];}
f=f.join(YAHOO.ULT.CTRL_D);if(f.length<1||f.length>1024){return u;}
f=';_ylc='+YAHOO.ULT.encode64(f);i=u.indexOf('/*');if(i==-1){i=u.indexOf('/?');}
if(i==-1){i=u.indexOf('?');}
if(i==-1){return u+f;}else{return u.substr(0,i)+f+u.substr(i);}};YAHOO.ULT.beacon_click=function(p,i){if(!i){i=YAHOO.ULT.IMG;}
if(p){var url=YAHOO.ULT.track_click(YAHOO.ULT.BEACON,p);url+='?t='+Math.random();i.src=url;}
return true;};YAHOO.ULT.has_ctrl_char=function(s){for(var i=0;i<s.length;i++){if(s.charCodeAt(i)<0x20){return true;}}
return false;};YAHOO.ULT.encode64=function(input){var output="";var chr1,chr2,chr3="";var enc1,enc2,enc3,enc4="";var i=0;do{chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+
YAHOO.ULT.BASE64_STR.charAt(enc1)+
YAHOO.ULT.BASE64_STR.charAt(enc2)+
YAHOO.ULT.BASE64_STR.charAt(enc3)+
YAHOO.ULT.BASE64_STR.charAt(enc4);chr1=chr2=chr3="";enc1=enc2=enc3=enc4="";}while(i<input.length);return output;};})();
// Create Yahoo! Finance namespaces



YAHOO.namespace('YAHOO.Finance');

YAHOO.namespace('YAHOO.Finance.util.Dom');

YAHOO.namespace('YAHOO.Finance.widget');





// DOM function to get child nodes by tag name



YAHOO.Finance.util.Dom.getChildrenByTagName = function (rootEl, tag) {

    var selectedChildren = [];

    var rootChildren = rootEl.childNodes;

    var rootChildrenLength = rootChildren.length;

    for (var i = 0; i < rootChildrenLength; i++ ) {

        if (rootChildren[i].nodeName.toLowerCase() == tag) {

            selectedChildren.push(rootChildren[i]);

        }

    }

    return selectedChildren;

};





// AccordionView object constructor



YAHOO.Finance.widget.AccordionView = function (target, triggerEvent, initialIndex, lockHeight, hideImages, enableSelectiveStreaming) {

    if (!YAHOO.util.Dom.get(target)) { 

        return false; 

    }

    this.target = YAHOO.util.Dom.get(target);

    this.triggerEvent = triggerEvent;

    this.activeIndex = (initialIndex == null || 

                        initialIndex !== parseInt( initialIndex, 10 ) ) ? 0 : initialIndex;

    this.lockHeight = (lockHeight == null) ? false : lockHeight;

    this.hideImages = (hideImages == null) ? false : hideImages;

    this.enableSelectiveStreaming = (enableSelectiveStreaming == null) ? false : enableSelectiveStreaming;

    this.beaconId = this.target.getAttribute('title');

    this.init();

};

YAHOO.Finance.widget.AccordionView.prototype.init = function () {

    var accordion = this.target;

    if (this.lockHeight) { this.parentDiv = accordion.parentNode; }

    if (accordion.nodeName.toLowerCase() == 'ul') {

        if (this.enableSelectiveStreaming) { this.streamingController = new YAHOO.Finance.StreamingController();  }  

        var accordionUnits_li = YAHOO.Finance.util.Dom.getChildrenByTagName(accordion, 'li');

        var accordionUnitsLength = accordionUnits_li.length;

        for (var i = 0; i < accordionUnitsLength; ++i) {

            if (this.activeIndex >= accordionUnitsLength) { this.activeIndex = 0; }

            var accordionTab = YAHOO.Finance.util.Dom.getChildrenByTagName(accordionUnits_li[i], 'a')[0];

            var accordionContent_div = YAHOO.Finance.util.Dom.getChildrenByTagName(accordionUnits_li[i], 'div')[0];

            YAHOO.util.Event.addListener(accordionTab, this.triggerEvent, this.animate, this);

            accordionTab.tabIndex = i;

            accordionTab.contentDiv = accordionContent_div;

            if (accordionTab.tabIndex == this.activeIndex) {

                if (this.hideImages) {

                    var images = accordionTab.contentDiv.getElementsByTagName('img');

                    for (var n = 0; n < images.length; n++) {

                        images[n].setAttribute('src', images[n].getAttribute('name'));

                        images[n].setAttribute('name', '');

                    }

                }

                YAHOO.util.Dom.addClass(accordionTab, 'selected');

                YAHOO.util.Dom.addClass(accordionTab.contentDiv, 'selected');

                YAHOO.util.Dom.setStyle(accordionTab.contentDiv, 'height', 'auto');

                this.newTab = accordionTab;

            }

            else {

                if (this.streamingController) { this.streamingController.disableStreaming(accordionTab.contentDiv); }

            }

        }

    }

    else if (accordion.nodeName.toLowerCase() == 'table') {

        this.newTab = YAHOO.util.Dom.getElementsByClassName('selected', 'tr', accordion)[0];

        var selectedTab = YAHOO.util.Dom.getElementsByClassName('selected', 'tr', accordion)[0];



        var accordion_tbody = YAHOO.Finance.util.Dom.getChildrenByTagName(accordion, 'tbody')[0];

        var accordionUnits_tr = YAHOO.Finance.util.Dom.getChildrenByTagName(accordion_tbody, 'tr');

        var accordionUnitsLength = accordionUnits_tr.length;

        var tabindex = 0;



        /* Following code turns off any pre-rendered selected tab 

           (e.g. if using the Back button to return to a page in Firefox) 

           TODO - apply this code to the non-table version as well  */

        if (selectedTab) {

         var selectedIndex = selectedTab.getAttribute('tabIndex') || 0;

         if (!isNaN( selectedIndex ) && selectedIndex != this.activeIndex) {

           var accordionTab = accordionUnits_tr[2 * selectedIndex];

           var accordionContent_tr = accordionUnits_tr[2 * selectedIndex + 1];

           var accordionContent_td = YAHOO.Finance.util.Dom.getChildrenByTagName(accordionContent_tr, 'td')[0];

           var accordionContent_div = YAHOO.Finance.util.Dom.getChildrenByTagName(accordionContent_td, 'div')[0];



	   YAHOO.util.Dom.removeClass( accordionTab, 'selected' );

	   YAHOO.util.Dom.removeClass( accordionContent_div, 'selected' );

	   YAHOO.util.Dom.setStyle( accordionContent_div, 'height', '0px' );

         }

        }



        for (var i = 0; i < accordionUnitsLength; i = i + 2) {

            if (this.activeIndex >= (accordionUnitsLength / 2)) this.activeIndex = 0;

            var accordionTab = accordionUnits_tr[i];

            var accordionContent_tr = accordionUnits_tr[i + 1];

            YAHOO.util.Event.addListener(accordionTab, this.triggerEvent, this.animate, this);

            var accordionContent_td = YAHOO.Finance.util.Dom.getChildrenByTagName(accordionContent_tr, 'td')[0];

            var accordionContent_div = YAHOO.Finance.util.Dom.getChildrenByTagName(accordionContent_td, 'div')[0];

            accordionTab.contentDiv = accordionContent_div;

            accordionTab.tabIndex = tabindex;

            tabindex = tabindex + 1;

            if (accordionTab.tabIndex == this.activeIndex) {

                if (this.hideImages) {

                    var images = accordionTab.contentDiv.getElementsByTagName('img');

                    for (var n = 0; n < images.length; n++) {

                        images[n].setAttribute('src', images[n].getAttribute('name'));

                        images[n].setAttribute('name', '');

                    }

                }

                YAHOO.util.Dom.addClass(accordionTab, 'selected');

                YAHOO.util.Dom.addClass(accordionTab.contentDiv, 'selected');

                YAHOO.util.Dom.setStyle(accordionTab.contentDiv, 'height', 'auto');

                this.newTab = accordionTab;

            }

        }

    }

};

YAHOO.Finance.widget.AccordionView.prototype.animate = function(e, obj) {

    var triggerTab = this;

    var completeAnimation = function() {

        YAHOO.util.Dom.setStyle(obj.newTab.contentDiv, 'height', 'auto');

        if (obj.lockHeight && !obj.newTab.anim.isAnimated() && !obj.oldTab.anim.isAnimated()) YAHOO.util.Dom.setStyle(obj.parentDiv, 'height', 'auto');

        obj.activeIndex = obj.newTab.tabIndex;

        // deactivated the beacon call by ginader as it triggered an error (YAHOO.Finance.Frontpage is undefined)
        //YAHOO.ULT.beacon_click({'tid':YAHOO.Finance.Frontpage.constant.Bucket, 'sec':obj.beaconId, 'slk':obj.activeIndex + obj.newTab.getAttribute('title')});

    };

    var executeAnimation = function() {

        if (obj.newTab.anim && obj.newTab.anim.isAnimated()) {

            obj.newTab.anim.stop(true);

            obj.oldTab.anim.stop(true);

        };

        obj.oldTab = obj.newTab;

        obj.newTab = triggerTab;

        YAHOO.util.Dom.removeClass(obj.oldTab.contentDiv, 'selected');

        YAHOO.util.Dom.addClass(obj.newTab.contentDiv, 'selected');

        var images = obj.newTab.contentDiv.getElementsByTagName('img');

        if (obj.hideImages && images && images[0].getAttribute('name') != '') {

            for (var i = 0; i < images.length; i++) {

                images[i].setAttribute('src', images[i].getAttribute('name'));

                images[i].setAttribute('name', '');

            };

        };

        YAHOO.util.Dom.removeClass(obj.oldTab, 'selected');

        YAHOO.util.Dom.addClass(obj.newTab, 'selected');

        obj.newTab.setHeight = obj.newTab.contentDiv.scrollHeight;

        obj.oldTab.setHeight = obj.oldTab.contentDiv.scrollHeight;

        obj.newTab.anim = new YAHOO.util.Anim(obj.newTab.contentDiv);

        obj.newTab.anim.onComplete.subscribe(completeAnimation);

        obj.newTab.anim.attributes.height = { to: obj.newTab.setHeight, unit: 'px' };

        obj.newTab.anim.duration = 0.2;

        obj.oldTab.anim = new YAHOO.util.Anim(obj.oldTab.contentDiv);

        obj.oldTab.anim.attributes.height = { to: 0, unit: 'px' };

        obj.oldTab.anim.duration = 0.2;

        if (obj.lockHeight && !obj.newTab.anim.isAnimated() && !obj.oldTab.anim.isAnimated()) {

            YAHOO.util.Dom.setStyle(obj.parentDiv, 'height', obj.parentDiv.offsetHeight + 'px');

        };

        obj.oldTab.anim.animate();

        obj.newTab.anim.animate();

        if (obj.streamingController) {

            obj.streamingController.enableStreaming(obj.newTab.contentDiv);    

            obj.streamingController.disableStreaming(obj.oldTab.contentDiv);        

        };

    };

    var clearAnimation = function() {

        clearTimeout(triggerTab.pause);

        YAHOO.util.Event.removeListener(triggerTab, 'mouseout', clearAnimation);

    };

    YAHOO.util.Event.preventDefault(e);

    if (obj.newTab == triggerTab) return false;

    if (obj.triggerEvent == 'mouseover') {

        YAHOO.util.Event.addListener(triggerTab, 'mouseout', clearAnimation);

        triggerTab.pause = setTimeout(executeAnimation, 250);

    }

    else {

        executeAnimation();

    };

};





// TableDetailtip object constructor



YAHOO.Finance.widget.TableDetailtip = function(target) {

    this.target = YAHOO.util.Dom.get(target);

    if (!this.target) return false;

    this.beaconId = this.target.getAttribute('title');

    this.init();

};

YAHOO.Finance.widget.TableDetailtip.prototype.init = function() {

    YAHOO.util.Event.addListener(this.target, 'mouseover', this.hoverOn, this);

};

YAHOO.Finance.widget.TableDetailtip.prototype.hoverOn = function(e, obj) {

    var target = YAHOO.util.Event.getTarget(e);

    if (target.nodeName.toLowerCase() == 'a' && target.parentNode.className == 'ticker_name') {

        var showDetails = function() {

            YAHOO.util.Dom.addClass(row, 'ticker_hover_row');

            var chartImage = row.getElementsByTagName('img')[0];

            if (chartImage.getAttribute('name') != '') {

                chartImage.setAttribute('src', chartImage.getAttribute('name'));

                chartImage.setAttribute('name', '');

            };

            var rowX = parseInt(YAHOO.util.Dom.getX(row.parentNode.parentNode));

            var rowY = parseInt(YAHOO.util.Dom.getY(row.firstCell));

            var rowHeight = parseInt(row.firstCell.offsetHeight);

            var rowWidth = parseInt(row.parentNode.parentNode.offsetWidth);

            var detailWidth = parseInt(row.lastCell.offsetWidth);

            var newX = (rowX + rowWidth) - detailWidth;

            var newY = rowY + rowHeight - 1;

            var difference = newX - rowX;

            YAHOO.util.Dom.setX(row.lastCell, newX);

            YAHOO.util.Dom.setY(row.lastCell, newY);

            row.displayStatus = 'on';

            //YAHOO.ULT.beacon_click({'tid':YAHOO.Finance.Frontpage.constant.Bucket, 'sec':this.beaconId, 'slk':'m_' + link.innerHTML})

            YAHOO.util.Event.addListener(row, 'mouseover', function(e) { clearTimeout(this.pause); });

        };

        var link = target;

        var row = target.parentNode.parentNode;

        var cells = row.getElementsByTagName('td');

        row.firstCell = cells[0];

        row.lastCell = cells[cells.length - 1];

        YAHOO.util.Event.addListener(row, 'mouseout', obj.hoverOff);

        if (row.displayStatus != 'on') {

            row.pause = setTimeout(showDetails, 300);

        };

    };

};

YAHOO.Finance.widget.TableDetailtip.prototype.hoverOff = function(e) {

    var hideDetails = function() {

        YAHOO.util.Dom.setX(row.lastCell, -9999);

        YAHOO.util.Dom.removeClass(row, 'ticker_hover_row');

        row.displayStatus = 'off';

        YAHOO.util.Event.removeListener(row, 'mouseover');

        YAHOO.util.Event.removeListener(row, 'mouseout');

    };

    var row = this;

    clearTimeout(row.pause);

    if (row.displayStatus != 'off') {

        row.pause = setTimeout(hideDetails, 300);

    };

};





// Cookie handler object



YAHOO.Finance.Cookie = {

    jar: {},

    get: function(name) {

        if (this.jar[name]) return this.jar[name].value;

        var value = '', c = ' ' + document.cookie + ';', s = c.indexOf((' ' + name + '='));

        if (s >= 0) {

            s += name.length + 2;

            value = unescape(c.substring(s, c.indexOf(';', s)));

            this.jar[name] = { 'value': value };

            return value;

        }

        else {

            return false;

        };

    },

    getObj: function(name) {

        if (this.jar[name] && this.jar[name].obj) return this.jar[name].obj;

        var s = this.get(name);

        if (s === false) return null;

        var a = s.split('&'), aa = {}, t, j;

        for (var i = a.length - 1; i > -1; i--) {

            j = a[i].indexOf('=');

            if (j === -1) {

                aa[a[i]] = '';

            }

            else {

                aa[a[i].substr(0, j)] = a[i].substr(j + 1);

            };

        };

        this.jar[name].obj = aa;

        return aa;

    },

    set: function(name, value, days, domain, path, secure) {

        if (!name) return false;

        if (!domain) {

            domain = '.finance.yahoo.com';

        };

        if (!path) path = '/';

        if (!days) days = 0;

        this.jar[name] = {};

        if (typeof(value) === 'object') {

            var v = value;

            value = [];

            for (var i in v) {

                value[value.length] = (i + '=' + escape(v[i]));

            };

            value = value.join('&');

            this.jar[name].obj = v;

        };

        var d = new Date();

        if (days) d.setTime(d.getTime() + days * 1000 * 60 * 60 * 24);

        var cstr = name + '=' + value + ';expires=' + d.toGMTString() + ';path=' + path + ';domain=' + domain + (secure ? ';secure' : '');

        document.cookie = cstr;

        this.jar[name]['value'] = value;

        return true;

    },

    remove: function(name) {

        this.set(name, '', -1);

        this.jar[name] = null;

    }

};





// Enables generic selective streaming



YAHOO.Finance.StreamingController = function() {

    var el = 'span';

    var enableClass = 'streaming-datum';

    var disableClass = 'streaming-inactive';

    var $D = YAHOO.util.Dom;

    return {

        // replace 'streaming-active' with 'streaming-inactive' class

        disableStreaming : function(scope) {

            var els = $D.getElementsByClassName(enableClass,el,scope);

            $D.replaceClass(els,enableClass,disableClass);        

        },

        // replace 'streaming-inactive' with 'streaming-active' class

        enableStreaming : function(scope) {

            var els = $D.getElementsByClassName(disableClass,el,scope);

            $D.replaceClass(els,disableClass,enableClass);

        }

    };

};





// Enables selective streaming for YUI TabView



YAHOO.Finance.TabViewStreamingController = function(tabView, tabPanels) {

    var controller = new YAHOO.Finance.StreamingController();

    tabView.initHandler = function(e) {

        var numTabs = tabPanels.length;

        for (var i = 0; i < numTabs; i++) {

            if (i != tabView.get('activeIndex')) controller.disableStreaming(tabPanels[i]);    

        };

    };

    tabView.changeHandler = function(e) {

        controller.disableStreaming(tabPanels[tabView.getTabIndex(e.prevValue)]);

        controller.enableStreaming(tabPanels[tabView.getTabIndex(e.newValue)]);

    };

    tabView.addListener('contentReady', tabView.initHandler);

    tabView.addListener('activeTabChange', tabView.changeHandler);    

};
YAHOO.namespace("EU.Finance");
YAHOO.EU.Finance.Navigation = function(config) {
    this.config = config;
    this.navObj = null;
    this.navItems = [];
    this.activeSubnav = null;
    this.timeout = null;
};
YAHOO.EU.Finance.Navigation.prototype = {
    init : function () {
        this.navObj = YAHOO.util.Dom.get(this.config.navId);
        this.log('navobj');
        this.log(this.navObj);
        if(!this.navObj){
            return false;
        }
        this.log(this.navObj);
        this.navItems = YAHOO.util.Dom.getChildrenBy(this.navObj,function(el){
            return el.tagName.toUpperCase() === 'LI';
        });
        if(!this.navItems.length){
            return false;
        }
        this.log(this.navItems);
        var that = this;
        for(var i=0,l=this.navItems.length;i<l;i++){
            var el = this.navItems[i];
            // all browsers
            el.onmouseover = function(){
                that.handleMouseOver(this);
            };
            el.onmouseout = function(){
                that.handleMouseOut(this);
            };
            // IE
            el.onfocusin = function(){
                that.handleMouseOver(this);
            };
            el.onfocusout = function(){
                that.handleMouseOut(this);
            };
            // FF, Saf, Op
            if (el.addEventListener) {
                el.addEventListener('focus',function() { that.handleMouseOver(this); },true);
                el.addEventListener('blur',function() { that.handleMouseOut(this); },true);
            }
        }
        this.markSubNavs();
    },
    markSubNavs : function(){ 
        var lis = this.navObj.getElementsByTagName('li');
        for(var i=0,l=lis.length;i<l;i++){
            var li = lis[i];
            var ul = li.getElementsByTagName('li');
            if(this.isTopLevelLi(li)){
                YAHOO.util.Dom.addClass(li,'top');
            }
            if(ul.length){
                YAHOO.util.Dom.addClass(li,'subnav');
                this.log(li.parentNode.tagName);
            }
        }
    },
    isTopLevelLi : function(el){
        while(el.id !== this.config.navId){
            el = el.parentNode;
            if(el.tagName.toUpperCase() === 'LI'){
                return false;
            }
        }
        return true;
    },
    handleMouseOver : function(el){
        this.activate(el);
    },
    handleMouseOut : function(el){
        if(this.config.useDelay === false){
            this.deactivate();
        }else{
            this.deactivateDelayed();
        }
    },
    activate : function(el){
        if(this.timeout){
            window.clearTimeout(this.timeout);
            this.timeout = null;
        }
        if(this.activeSubnav){
            this.deactivate(this.activeSubnav);
        }
        this.activeSubnav = el;
        YAHOO.util.Dom.addClass(el,'active');
    },
    deactivate : function(){
        YAHOO.util.Dom.removeClass(this.activeSubnav,'active');
        this.activeSubnav = null;
        if(this.timeout){
            window.clearTimeout(this.timeout);
            this.timeout = null;
        }
    },
    deactivateDelayed : function(){
        var that = this;
        this.timeout = window.setTimeout(function(){
            that.deactivate();
        },1000);
    },
    log : function(msg){
        if(this.config.debug && window.console && window.console.log){
            window.console.log(msg);
        }
    }
};
function initNav(){
    mainNav = new YAHOO.EU.Finance.Navigation({
        debug: false,
        navId: 'y-main-nav'
    }).init();
    portfolioNav = new YAHOO.EU.Finance.Navigation({
        debug: false,
        navId: 'y-portfolios-list',
        useDelay: false
    }).init();
    var ul = YAHOO.util.Dom.get('y-portfolios-list');
    if(!ul){return;};
    var lis = YAHOO.util.Dom.getChildren(ul);
    if(lis && lis.length && lis.length > 10){
        YAHOO.util.Dom.addClass(ul.parentNode,'scroll');
    }
}
YAHOO.util.Event.onDOMReady(initNav);
/*  DTK Article tool javascript
This javascript includes the scripting needed for the send to friend, send via im, print the page, etc scripts that are part of the 
DTK article tools.

It also includes some javascript to initiate the rating widget that was written by Luke 
-Ted 10/6*/

YAHOO.namespace('Media.Dtk.ArticleTools');

YAHOO.Media.Dtk.ArticleTools.Email = new function() {
	/**
	 * private variables
	 */
	
	/**
	 * / .. /  - defines the start and end of the regex.
	 * ^       - start at the beginning of the email value
	 * \w+     - and check for one or more (+) alphanumeric chars (\w)
	 * As a group (....)
	 * [\.-]?  - check for a period (\.) or a '-', 0 or 1 time (?) 
	 * \w+     - followed by one or more (+) alphanumeric chars (\w)
	 * (...)*  - Now check that this group occurs 0 or more times (*)
	 * @       - '@' must occur next.
	 * The rest you can figure out for yourself with the exception of...
	 * \w{2,3} - 2 or 3 alphanumeric chars.
	 * $       - end of the email value 
	 */
	//var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/;
	
	function trim(txt) {
		return txt.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); 
	}

	function isValidEmail(s) {
		s = trim(s);
		if (s && !emailRegEx.test(s)) { return false; }
		return true;
	}
	
	/**
	 * returned properties/methods
	 */

	return {
	
		isValidEmail : isValidEmail,			// expose to public
		
		checkEmails : function(idTo, idFrom) {
			var isOk = true;

			// check TO emails
			var emails = trim(YAHOO.util.Dom.get(idTo).value.replace(/;/g, ","));		// replace all ; chars as , (normalize to , separator)
			if( emails === "" ) {
				isOk = false;
			} else {
				emails = emails.split(",");												// split all at , char

				for(var i=0; i<emails.length; i++) {
					if (!isValidEmail(emails[i])) {
						isOk = false;
						break;			// we have at least one error; no need to continue in loop
					}
				}
			}
				
			if( !isOk ){
				YAHOO.util.Dom.get('dtk-err-to').innerHTML = "There is a problem with one or more email addresses entered";
			} else {
				YAHOO.util.Dom.get('dtk-err-to').innerHTML = "";
			}
			

			// check FROM email
			
			var from = trim(YAHOO.util.Dom.get(idFrom).value)
			if( (from === "") || !isValidEmail(from) ){
				YAHOO.util.Dom.get('dtk-err-from').innerHTML = "There is a problem with the email address entered";
				isOk = false;
			} else {
				YAHOO.util.Dom.get('dtk-err-from').innerHTML = "";
			}
			
			return isOk;
		}
		
		// address book popup
		//==============================================================
		//  Please note: The address function included a security flaw
		// 	I've deleted it from this file. If this causes errors, please restore
		//  this file and fix the document domain setting
		//  -Ted 10/08
		// ==============================================================
		
	}
	
}();



YAHOO.Media.Dtk.ArticleTools.IM = new function() {
	/**
	 * private variables
	 */
	var imMsg = "Check out this story on Yahoo!:";		// default lead-in message
	var msgr_installed;
	var msgr_version = "";
	var msgr_platform = "";
	

	/**
	 * private functions
	 */
	 
	function init(imMsgAlt) {
		if(imMsgAlt) imMsg = imMsgAlt;
		
		var w, v;
		if(document.all) {
			v = document.all.not_Ymsgr;
		} else {
			v = document.getElementById("not_Ymsgr");
		}
	
		if (v) {
			// gecko detection.
			w = document.getElementById("Ymsgr");
			if (w && w.offsetHeight) {
				msgr_installed=1;
				msgr_version="5";
				msgr_platform="w32";
			} else {
				//msgr_installed=0;
			
				//FOR NOW JUST LET IT ASSUME ITS INSTALLED
				msgr_installed=1;
			}
		} else {
			msgr_installed=1;
			msgr_version="5";
			msgr_platform="w32";
		}

		// see if the plugin is there
		if (navigator.mimeTypes && navigator.mimeTypes.length) {
			for (var i=0; i<navigator.mimeTypes.length; i++) {
				if (navigator.mimeTypes[i].suffixes.indexOf("yps") > -1) {
					msgr_installed=1;
					msgr_version="";
					msgr_platform="";
					break;
				}
			}
		}
	}

	
	/**
	 * initialization: run detection upon singleton creation
	 */
	init();

	
	/**
	 * returned properties/methods
	 */

	return {
	
		// plug an onload handler
		init : init,

		
		hasMsgr : function() {
			var a = document.cookie;
			var b = a.split("; ");
			for (var c = 0; c<b.length; c++) {
				var d = b[c].indexOf("=");
				var e = b[c].substring(0, d);
				var f = b[c].substring(d + 1);
				if (e == "C") {
					alert(f);
					var g = f.split("& ");
					for (h = 0; h < g.length; h++) {
						var i = g[h].indexOf("=");
						var j = g[h].substring(0, i);
						var k = g[h].substring(i + 1);
						if (j == "mg" && k == "1")
						return true;
					}
				}
			}
			return false;
		},

		
		setIntroMsg : function(s) {
			if(s) imMsg = s;
		},
		
		
		imStory : function(hdline, lnk) {
			if( msgr_installed ) {
				// user has messenger installed -
				// open an im window to a user
				location.href = "ymsgr:im?msg=" + imMsg + "+" + hdline + "+" + lnk;
			} else {
				// user does not have messenger installed - 
				// so go to messenger to download it
				if( confirm("You do not appear to have Yahoo! Messenger installed. Would you like to install it now?") ) {
					location.href = "http://messenger.yahoo.com";
				}
			}
			return false;
		}
		
	}
}();



YAHOO.Media.Dtk.ArticleTools.Print = new function() {
	/**
	 * private variables
	 */
	
	// all this "configurable" code tend to bloat the javascript
	// we may wish to lessen some non-essential flexibility to reduce some lines of code
	
	var sRootNodeId = "";							// dom id for article content root node (usually the container id)
	var sTextClass = "dtk-art-text";				// class to mark text content
	var sTextClassTag = "div";						// tag to mark text content
	var sImageClass = "dtk-art-image";				// class to mark image content
	var sImageClassTag = "div";						// tag to mark image content
	var sAdClass = "dtk-art-ad";					// class to mark ad content
	var sAdClassTag = "div";						// tag to mark ad content
	var sCommentClass = "dtk-art-comment";			// class to mark comment content
	var sCommentClassTag = "div";					// tag to mark comment content
	var sHideClass = "dtk-art-print-hide";			// class to add to hide content elements
	
	var sTextCtrlId = "dtk-print-text";				// id of Hide Text checkbox
	var sImageCtrlId = "dtk-print-images";			// id of Hide Images checkbox
	var sAdCtrlId = "dtk-print-ads";				// id of Hide Ads checkbox
	var sCommentCtrlId = "dtk-print-comments";		// id of Hide Comments checkbox
	var sSendPrinterCtrlId = "dtk-print-send";		// id of Send to Printer button
	
	var aTextNodes;			// array of text nodes to hide
	var aImageNodes;		// array of image nodes to hide
	var aAdNodes;			// array of ad nodes to hide
	var aCommentNodes;		// array of comment nodes to hide

	
	/**
	 * private functions
	 */
	
	function togglePrint(arNodes, bVisible) {
		if(bVisible) { 
			YAHOO.util.Dom.removeClass(arNodes, sHideClass);
		} else {
			YAHOO.util.Dom.addClass(arNodes, sHideClass);
		}
	}

	/* event handlers */
	
	function onToggleText(e, o) 	{ if(aTextNodes) { togglePrint(aTextNodes, o.checked); } }
	function onToggleImages(e, o) 	{ if(aImageNodes) { togglePrint(aImageNodes, o.checked); } }
	function onToggleAds(e, o) 		{ if(aAdNodes) { togglePrint(aAdNodes, o.checked); } }
	function onToggleComments(e, o) { if(aCommentNodes) { togglePrint(aCommentNodes, o.checked); } }

	function onSendPrinter(e, o) {
		window.focus();
		window.print();
	}
	
	function addListeners() {
		// add toggle handlers
		
		var ctrl = YAHOO.util.Dom.get(sTextCtrlId);
		if(ctrl) { YAHOO.util.Event.addListener(ctrl, 'click', onToggleText, ctrl, true); }
		
		ctrl = YAHOO.util.Dom.get(sImageCtrlId);
		if(ctrl) { YAHOO.util.Event.addListener(ctrl, 'click', onToggleImages, ctrl, true); }
		
		ctrl = YAHOO.util.Dom.get(sAdCtrlId);
		if(ctrl) { YAHOO.util.Event.addListener(ctrl, 'click', onToggleAds, ctrl, true); }
		
		ctrl = YAHOO.util.Dom.get(sCommentCtrlId);
		if(ctrl) { YAHOO.util.Event.addListener(ctrl, 'click', onToggleComments, ctrl, true); }

		// add send to printer handler
		
		ctrl = YAHOO.util.Dom.get(sSendPrinterCtrlId);
		if(ctrl) { YAHOO.util.Event.addListener(ctrl, 'click', onSendPrinter, ctrl, true); }
	}
	

	/**
	 * returned properties/methods
	 */
	
	return {
	
		init : function(oArgs) {
			// all this "configurable" code tend to bloat the javascript
			// we may wish to lessen some non-essential flexibility to reduce some lines of code

			// init our node arrays of elements to hide
			aTextNodes = YAHOO.util.Dom.getElementsByClassName(sTextClass, sTextClassTag);
			aImageNodes = YAHOO.util.Dom.getElementsByClassName(sImageClass, sImageClassTag);
			aAdNodes = YAHOO.util.Dom.getElementsByClassName(sAdClass, sAdClassTag);
			aCommentNodes = YAHOO.util.Dom.getElementsByClassName(sCommentClass, sCommentClassTag);

			if( oArgs ) {
				// allow overriding of default options
				sRootNodeId = oArgs.rootNode || sRootNodeId;
				sTextClass = oArgs.textClass || sTextClass;
				sTextClassTag = oArgs.textClassTag || sTextClassTag;
				sImageClass = oArgs.imageClass || sImageClass;
				sImageClassTag = oArgs.imageClassTag || sImageClassTag;
				sAdClass = oArgs.adClass || sAdClass;
				sAdClassTag = oArgs.adClassTag || sAdClassTag;
				sCommentClass = oArgs.commentClass || sCommentClass;
				sCommentClassTag = oArgs.commentClassTag || sCommentClassTag;
				sHideClass = oArgs.hideClass || sHideClass;
				
				// allow overriding ids of the print controls
				sTextCtrlId = oArgs.hideTextCtrl || sTextCtrlId;
				sImageCtrlId = oArgs.hideImageCtrl || sImageCtrlId;
				sAdCtrlId = oArgs.hideAdCtrl || sAdCtrlId;
				sCommentCtrlId = oArgs.hideCommentCtrl || sCommentCtrlId;
				sSendPrinterCtrlId = oArgs.sendPrinterCtrl || sSendPrinterCtrlId;

				// allow overriding of asset nodes
				aTextNodes = oArgs.aTextNodes || aTextNodes;
				aImageNodes = oArgs.aImageNodes || aImageNodes;
				aAdNodes = oArgs.aAdNodes || aAdNodes;
				aCommentNodes = oArgs.aCommentNodes || aCommentNodes;
			}
			
			// add event handlers at init complete
			addListeners();
		}
		
	}

}();


///////////////////////////////////////////////////////////////////////////
//
// yf_symbolsuggest.js: yahoo finance company symbol/name auto suggest
// 
// $Id: yfi_symbolsuggest.js,v 1.2 2009/04/10 22:55:13 patidar Exp $
//
///////////////////////////////////////////////////////////////////////////

if(typeof(YAHOO.Finance) == "undefined" || typeof(YAHOO.Finance.SymbolSuggest) == "undefined") {
  YAHOO.namespace("YAHOO.Finance.SymbolSuggest");
}

YAHOO.Finance.SymbolSuggest = function() { 

  var _defaultContainerId = "quoteContainer";
  var _ds = null;
  var _oAC = null;
  var _sl = null;
  var _currQuery = "";
  var _acServer = ""; // set it from outside
  var _form = null;
  var _elInputBox = null;
  var _itemSelected = false;
  var _lastItemSelectedIndex = -1;
  var _lastItemSelected = "";

  function _onFormSubmit(e) {
    if(_elInputBox.value == _elInputBox.defaultValue) {
      _elInputBox.value = "";
    }
    _doULT({sec:"getquotesbtn"});
  }
  
  function _onInputBoxFocus(e) {
    if(_elInputBox.value == _elInputBox.defaultValue) {
      _elInputBox.value = "";
    }
  }
  
  function _onInputBoxBlur(e) {
    if(_elInputBox.value == "") {
      _elInputBox.value = _elInputBox.defaultValue;
    }
  }

  function _doULT(p) {
    var pos = _lastItemSelectedIndex;
    var sec = p.sec;
    var slk = "";
    if(pos != -1) { slk = _lastItemSelected; }
    // var keyw = encodeURIComponent(_elInputBox.value).substring(0, 1024);
    var keyw = _currQuery;
    var ssk = YAHOO.util.Dom.get("spaceid");
    var ultObj = {"pos": pos, "keyw": keyw, "sec": sec, "slk": slk};
    if(ssk) {
      ultObj[YAHOO.ULT.SRC_SPACEID_KEY] = ssk.innerHTML;
    }
    // console.log("BEACON: " + YAHOO.ULT.BEACON + ",  ultObj: " + toJsonString(ultObj));
    setTimeout(function() { YAHOO.ULT.beacon_click(ultObj); }, 100);
  }

  return {
    init: function(inputForm, inputBox, suggestContainer) {
      _form = YAHOO.util.Dom.get(inputForm);
      _elInputBox = YAHOO.util.Dom.get(inputBox);
      YAHOO.util.Event.addListener(_form, "submit", _onFormSubmit);
      YAHOO.util.Event.addListener(_elInputBox, "focus", _onInputBoxFocus);
      YAHOO.util.Event.addListener(_elInputBox, "blur", _onInputBoxBlur);
      _sl = new YAHOO.Finance.SymbolSuggest.ScriptLoader();
      _ds = new YAHOO.widget.DS_JSFunction(function(arg){});
      _ds.doQuery = function(oCbfn, sQuery, oParent) {
	var fCookie = YAHOO.Finance.Cookie.getObj("PRF");
	if(fCookie && fCookie.ss == "0") { return; }
	sQuery = sQuery.replace(/^(%20)*/g, "");
	_currQuery = decodeURIComponent(sQuery).toLowerCase();
	if(_currQuery === "") { return; }
	if(_acServer != "") {
	  _sl.loadSingleUseJSONScript(_acServer + "?query=" + sQuery + "&callback=YAHOO.Finance.SymbolSuggest.ssCallback", false);
	}
      };
      
      _ds.responseType = YAHOO.widget.DS_XHR.TYPE_JSON; // default
      _ds.maxCacheEntries = 40;

      // check in container exists, create if not
      var sc_el = YAHOO.util.Dom.get(suggestContainer);
      if(!sc_el) {
        sc_el = document.createElement("div");
	sc_el.setAttribute("id", _defaultContainerId);
	document.body.appendChild(sc_el);
	suggestContainer = sc_el;
      }
      _oAC = new YAHOO.widget.AutoComplete(inputBox, suggestContainer, _ds);

      _oAC.animVert = false; // explicitly turn off, else including the anim lib will enable anim
      _oAC.allowBrowserAutocomplete = false;
      _oAC.queryDelay = 0.1;
      _oAC.delimChar = [",", "+"];
      _oAC.highlightClassName = "yui-ac-highlight";
      _oAC.typeAhead = true;
      // _oAC.useShadow = true;
      _oAC.autoHighlight = false;
      _oAC.formatResult = function(oResItem, sQuery) {
	// console.log("q: " + sQuery + ", " + toJsonString(oResItem));
	var symbol = oResItem[0];
	var name = " " + oResItem[1];
	var exch = oResItem[2];
	var exchDisp = oResItem[3];
	var typeDisp = oResItem[4];
	var i = symbol.toLowerCase().indexOf(sQuery.toLowerCase());
	if(i == 0) {
	  symbol = "<em>" + symbol.substr(0, sQuery.length) + "</em>" + symbol.substr(sQuery.length);
	} else {
	  i = name.toLowerCase().indexOf(" " + sQuery.toLowerCase());
	  if(i != -1) {
	    // console.log("i: " + i + ", q: " + sQuery + ", name: " + name);
	    name = name.substr(0, i) + " <em>" + name.substr(i + 1, sQuery.length) + "</em>" + name.substr(i+sQuery.length + 1);
	  }
	}
	var start_wrp = "<table><tr>";
	var symbol_wrp = "<td class='symbol'>" + symbol + "</td>";
	var name_wrp = "<td>" + name.substr(1) + "</td>";
	var exch_type_wrp = "<td class='exch_type_wrapper'>";
	if(typeDisp != "") {
	  exch_type_wrp += typeDisp + " - ";
	}
	exch_type_wrp += exchDisp + "</td>";
	var end_wrp = "</tr></table>";
        return start_wrp + symbol_wrp + name_wrp + exch_type_wrp + end_wrp;
      };

      _oAC.doBeforeExpandContainer = function(oTextbox, oContainer, sQuery, sResults) {
        var pos = YAHOO.util.Dom.getXY(oTextbox);
	pos[1] += YAHOO.util.Dom.get(oTextbox).offsetHeight;
	YAHOO.util.Dom.setXY(oContainer, pos);
	var q = decodeURIComponent(sQuery).toLowerCase();
	_oAC.setFooter("<div class='moreresults'><a href='http://finance.yahoo.com/lookup?s="+q+"' onclick=\"YAHOO.Finance.SymbolSuggest.onShowAllResultsULT({q:\'"+q+"\'});\">Show all results for \""+q+"\"</a></div><div class='tip'><em>Tip:</em> Use comma (,) to separate multiple quotes. <a href=\"http://help.yahoo.com/l/us/yahoo/finance/quotes/quotelookup.html\">Learn more...</a></div>");
	return true;
      };
      
      if(_oAC.itemArrowToEvent){
          // hack to clear out any selected row when a new query is started
          _oAC.itemArrowToEvent.subscribe(function(oSelf, elItem) {
            // console.log("elItem: " + elItem);
        _itemSelected = true;
          }, _oAC, true);
      }
      
      if(_oAC.itemMouseOverEvent){
          _oAC.itemMouseOverEvent.subscribe(function(oSelf, elItem) {
            // console.log("elItem: " + elItem);
    	_itemSelected = true;
          }, _oAC, true);
      }
      
      if(_oAC.dataRequestEvent){
          _oAC.dataRequestEvent.subscribe(function(oSelf, sQuery) {
            // console.log("q: " + sQuery + "item selected: " + _itemSelected);
    	if(_itemSelected) { 
    	  _oAC._toggleHighlight(_oAC._aListItems[0], "mouseover");
    	  _lastItemSelectedIndex = -1;
    	  _itemSelected = false; 
    	}
          }, _oAC, true);
      }

      if(_oAC.itemSelectEvent){
          // hack to submit form when enter is pressed
          _oAC.itemSelectEvent.subscribe(function(s, item, data) {
            // console.log("selected... " + s + ":" + item + ":" + data);
            _lastItemSelectedIndex = item[1]._nItemIndex;
    	_lastItemSelected = item[2][0];
    	_elInputBox.value = _elInputBox.value.replace(/, $/, '');
    	if(_form) { _form.submit(); }
    	_doULT({sec:"symbolsuggest"});
          }, _oAC, true);
      }

      YAHOO.util.Event.addListener(inputBox, "keyup", function(ev) {
        // console.log("keyevent..." + ev.keyCode);
	var kc = ev.keyCode;
	if(kc == 13 && _form) { 
	  _form.submit(); 
	  if(_lastItemSelectedIndex == -1) { _doULT({sec:"symbolsuggest"}); } // to prevent doing this twice when something is selected from dropdown
	}
      });
      YFSS.ssCallbackSubscribers.push(this);
    },

    setServer: function(s) {
      _acServer = s;
    },

    onShowAllResultsULT: function(p) {
      if(_currQuery != p.q) { return; }
      _lastItemSelectedIndex = 500;
      _lastItemSelected = "http://finance.yahoo.com/lookup";
      _doULT({sec:"symbolsuggest"});
    },

    ssCallback: function(data) {
    if(_currQuery !== data.ResultSet.Query) { return; }
      var ret = [];
      for(var i in data.ResultSet.Result) {
        var item = data.ResultSet.Result[i];
	var exchDisp = item.exchDisp;
	if(!exchDisp) { exchDisp = item.exch; }
	var typeDisp = item.typeDisp;
	if(!typeDisp) { typeDisp = ""; }
	var tuple = [item.symbol, item.name, item.exch, exchDisp, typeDisp];
	ret.push(tuple);
      }
      var resultObj = {};
      resultObj.query = _currQuery; // make sure it is passed thru decodeURIComponent once
      resultObj.results = ret;
      _ds._addCacheElem(resultObj);
      // console.log("got data for: " + _currQuery);
      _oAC._populateList(_currQuery, ret, _oAC);
    }
  };
};

var YFSS = YAHOO.Finance.SymbolSuggest;
YFSS.ssCallbackSubscribers = [];
YFSS.ssCallback = function(data) {
  for(var i in YFSS.ssCallbackSubscribers) {
    YFSS.ssCallbackSubscribers[i].ssCallback(data);
  }
}

YFSS.onShowAllResultsULT = function(p) {
  for(var i in YFSS.ssCallbackSubscribers) {
    YFSS.ssCallbackSubscribers[i].onShowAllResultsULT(p);
  }
}

YFSS.ScriptLoader = function() {
  var _eltScript = null;

  // dynamically add a script which fetches JSON data wrapped in a function which gets invoked
  this.loadSingleUseJSONScript = function(url, nocache) {
    if(_eltScript) { // remove old script as it is just a fn call and no more necessary
      _eltScript.parentNode.removeChild(_eltScript);
      _eltScript = null; // for GC
    }
    _eltScript = this.loadScript(url, nocache);
  };

  this.loadScript = function(url, nocache) {
    if(!url) { return null; }
    var el = document.createElement("script");
    if(nocache) {
      if( url.indexOf('?') > -1) { url += '&'; }
      else { url += '?'; }
      url += 'rand=' + Math.random(); // to make it unique to get rid of any caching issues
    }
    el.setAttribute("src", url);
    document.getElementsByTagName('head')[0].appendChild(el);
    return el;
  };
}

