/* SiteCatalyst code version: H.10.
Copyright 1997-2007 Omniture, Inc. More info available at
http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
/* Specify the Report Suite ID(s) to track here */
var s_account="hearstsfgatecom"
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,sfgate"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"
/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
	
/* External Campaign Tracking */
if(!s.campaign){
	s.campaign=s.getQueryParam('cmpid')
	s.campaign=s.getValOnce(s.campaign,'s_campaign',0)
}
/* Lowercase variables */
if(s.prop1) s.prop1=s.prop1.toLowerCase()

/* Copy search term to eVar */
if(s.prop1){
	s.eVar1=s.prop1

	/* Set de-duped onsite search event */
	var t_search=s.getValOnce(s.eVar1,'ev1',0)
	if(t_search) s.events=s.apl(s.events,'event1',',',1)
}

/* Set Page View Event */
s.events=s.events?s.events+',event2':'event2';

/* Copy Page Name, Channel, & Article Title to eVars */
if(s.pageName) s.eVar3=s.pageName
if(s.channel) s.eVar4=s.channel
if(s.prop12) s.eVar5=s.prop12

/* Time Parting Plug-in PST */
s.prop14=s.getTimeParting('h','-8','2007'); // Set hour 
s.prop15=s.getTimeParting('d','-8','2007'); // Set day
s.prop16=s.getTimeParting('w','-8','2007'); // Set Weekend / Weekday

}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/*
 * Plugin: getTimeParting 1.3 - Set timeparting values based on time zone
 */

s.getTimeParting=new Function("t","z","y",""
+"dc=new Date('1/1/2000');f=15;ne=8;if(dc.getDay()!=6||"
+"dc.getMonth()!=0){return'Data Not Available'}else{;z=parseInt(z);"
+"if(y=='2009'){f=8;ne=1};gmar=new Date('3/1/'+y);dsts=f-gmar.getDay("
+");gnov=new Date('11/1/'+y);dste=ne-gnov.getDay();spr=new Date('3/'"
+"+dsts+'/'+y);fl=new Date('11/'+dste+'/'+y);cd=new Date();"
+"if(cd>spr&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneO"
+"ffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear("
+");var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Fr"
+"iday','Saturday'];if(thisy!=y){return'Data Not Available'}else{;thi"
+"sh=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow="
+"days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>3"
+"0){mint='30'}if(thish>=12){ap='PM';thish=thish-12};if (thish==0){th"
+"ish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+'"
+":'+mint+ap;var daystring=dow;var endstring=dt;if(t=='h'){return tim"
+"estring}if(t=='d'){return daystring};if(t=='w'){return en"
+"dstring}}};"
);
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
/*
 * Plugin: getQueryParam 2.1 - return query string parameter(s)
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
+"tring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");
/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="hearst"
s.trackingServer="om.sfgate.com"
s.trackingServerSecure="som.sfgate.com"
s.dc=112

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_objectID;function s_c2fe(f){var x='',s=0,e,a,b,c;while(1){e=
f.indexOf('"',s);b=f.indexOf('\\',s);c=f.indexOf("\n",s);if(e<0||(b>=
0&&b<e))e=b;if(e<0||(c>=0&&c<e))e=c;if(e>=0){x+=(e>s?f.substring(s,e):
'')+(e==c?'\\n':'\\'+f.substring(e,e+1));s=e+1}else return x
+f.substring(s)}return f}function s_c2fa(f){var s=f.indexOf('(')+1,e=
f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')
a+='","';else if(("\n\r\t ").indexOf(c)<0)a+=c;s++}return a?'"'+a+'"':
a}function s_c2f(cc){cc=''+cc;var fc='var f=new Function(',s=
cc.indexOf(';',cc.indexOf('{')),e=cc.lastIndexOf('}'),o,a,d,q,c,f,h,x
fc+=s_c2fa(cc)+',"var s=new Object;';c=cc.substring(s+1,e);s=
c.indexOf('function');while(s>=0){d=1;q='';x=0;f=c.substring(s);a=
s_c2fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(
q){if(h==q&&!x)q='';if(h=='\\')x=x?0:1;else x=0}else{if(h=='"'||h=="'"
)q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)
+'new Function('+(a?a+',':'')+'"'+s_c2fe(c.substring(o+1,e))+'")'
+c.substring(e+1);s=c.indexOf('function')}fc+=s_c2fe(c)+';return s");'
eval(fc);return f}function s_gi(un,pg,ss){var c="function s_c(un,pg,s"
+"s){var s=this;s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s."
+"wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.w"
+"d.s_c_in++;s.m=function(m){return (''+m).indexOf('{')<0};s.fl=funct"
+"ion(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)r"
+"eturn o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.i"
+"ndexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for"
+"(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1"
+"))<0)return 0;return 1};s.rep=function(x,o,n){var i=x.indexOf(o);wh"
+"ile(x&&i>=0){x=x.substring(0,i)+n+x.substring(i+o.length);i=x.index"
+"Of(o,i+n.length)}return x};s.ape=function(x){var s=this,h='01234567"
+"89ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x='"
+"'+x;if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.subs"
+"tring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=parseInt(n/16);l++}y+='%u'+e}else if(c="
+"='+')y+='%2B';else y+=escape(c)}x=y}else{x=x?s.rep(escape(''+x),'+'"
+",'%2B'):x;if(x&&c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i"
+"=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substri"
+"ng(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substri"
+"ng(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;"
+"return x?unescape(s.rep(''+x,'+',' ')):x};s.pt=function(x,d,f,a){va"
+"r s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.s"
+"ubstring(0,y);r=s.m(f)?s[f](t,a):f(t,a);if(r)return r;z+=y+d.length"
+";t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=funct"
+"ion(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.subst"
+"ring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=functi"
+"on(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')"
+"+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf"
+"',f);return s.fsg};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s."
+"num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.locat"
+"ion.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeri"
+"ods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');"
+"if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s"
+".pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function"
+"(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'="
+"'),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length"
+",e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var"
+" s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCa"
+"se():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60"
+");if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'"
+"){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSI"
+"ON'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');ret"
+"urn s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+"
+"e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<"
+"l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new"
+" Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f"
+"}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){va"
+"r s=this,r;if(s.apv>=5&&(!s.isopera||s.apv>=7))eval('try{r=s.m(f)?s"
+"[f](a):f(a)}catch(e){r=s.m(t)?s[t](e):t(e)}');else{if(s.ismac&&s.u."
+"indexOf('MSIE 4')>=0)r=s.m(b)?s[b](a):b(a);else{s.eh(s.wd,'onerror'"
+",0,o);r=s.m(f)?s[f](a):f(a);s.eh(s.wd,'onerror',1)}}return r};s.gtf"
+"set=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e',"
+"'var s=s_c_il['+s._in+'];s.eh(window,\"onerror\",1);s.etfs=1;var c="
+"s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a)"
+"{return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.locat"
+"ion;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;r"
+"eturn s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if("
+"!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s."
+"gtfsoe,'gtfsfb')}return s.tfs};s.mr=function(sess,q,ta){var s=this,"
+"dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,ns=s.visitorN"
+"amespace,unc=s.rep(s.fun,'_','-'),imn='s_i_'+s.fun,im,b,e,rs='http'"
+"+(s.ssl?'s':'')+'://'+(t1?(s.ssl&&t2?t2:t1):((ns?ns:(s.ssl?'102':un"
+"c))+'.'+(s.dc?s.dc:112)+'.2o7.net'))+'/b/ss/'+s.un+'/1/H.10-Pdvu-2/"
+"'+sess+'?[AQB]&ndh=1'+(q?q:'')+(s.q?s.q:'')+'&[AQE]';if(s.isie&&!s."
+"ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(s.d.i"
+"mages&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){im="
+"s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.src=rs;if(rs.indexOf('&p"
+"e=')>=0&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))"
+"){b=e=new Date;while(e.getTime()-b.getTime()<500)e=new Date}return "
+"''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt="
+"\"\">'};s.gg=function(v){var s=this;return s.wd['s_'+v]};s.glf=func"
+"tion(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s"
+".gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',',"
+"'glf',0)};s.gv=function(v){var s=this;return s['vpm_'+v]?s['vpv_'+v"
+"]:(s[v]?s[v]:'')};s.havf=function(t,a){var s=this,b=t.substring(0,4"
+"),x=t.substring(4),n=parseInt(x),k='g_'+t,m='vpm_'+t,q=t,v=s.linkTr"
+"ackVars,e=s.linkTrackEvents;s[k]=s.gv(t);if(s.lnk||s.eo){v=v?v+','+"
+"s.vl_l:'';if(v&&!s.pt(v,',','isf',t))s[k]='';if(t=='events'&&e)s[k]"
+"=s.fs(s[k],e)}s[m]=0;if(t=='visitorID')q='vid';else if(t=='pageURL'"
+"){q='g';s[k]=s.fl(s[k],255)}else if(t=='referrer'){q='r';s[k]=s.fl("
+"s[k],255)}else if(t=='vmk')q='vmt';else if(t=='charSet'){q='ce';if("
+"s[k]&&s[k].toUpperCase()=='AUTO')s[k]='ISO8859-1';else if(s[k]&&s.e"
+"m==2)s[k]='UTF-8'}else if(t=='visitorNamespace')q='ns';else if(t=='"
+"cookieDomainPeriods')q='cdp';else if(t=='cookieLifetime')q='cl';els"
+"e if(t=='variableProvider')q='vvp';else if(t=='currencyCode')q='cc'"
+";else if(t=='channel')q='ch';else if(t=='transactionID')q='xact';el"
+"se if(t=='campaign')q='v0';else if(s.num(x)){if(b=='prop')q='c'+n;e"
+"lse if(b=='eVar')q='v'+n;else if(b=='hier'){q='h'+n;s[k]=s.fl(s[k],"
+"255)}}if(s[k]&&t!='linkName'&&t!='linkType')s.qav+='&'+q+'='+s.ape("
+"s[k]);return ''};s.hav=function(){var s=this;s.qav='';s.pt(s.vl_t,'"
+",','havf',0);return s.qav};s.lnf=function(t,h){t=t?t.toLowerCase():"
+"'';h=h?h.toLowerCase():'';var te=t.indexOf('=');if(t&&te>0&&h.index"
+"Of(t.substring(te+1))>=0)return t.substring(0,te);return ''};s.ln=f"
+"unction(h){var s=this,n=s.linkNames;if(n)return s.pt(n,',','lnf',h)"
+";return ''};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLow"
+"erCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&"
+"&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.lte"
+"f=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&"
+"&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft"
+"=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkIntern"
+"alFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s"
+".trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.tr"
+"ackExternalLinks&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif"
+"||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function("
+"'e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(th"
+"is);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Fun"
+"ction('e','var s=s_c_il['+s._in+'],f;if(s.d&&s.d.all&&s.d.all.cppXY"
+"ctnr)return;s.eo=e.srcElement?e.srcElement:e.target;eval(\"try{if(s"
+".eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catc"
+"h(f){}\");s.eo=0');s.ot=function(o){var a=o.type,b=o.tagName;return"
+" (a&&a.toUpperCase?a:b&&b.toUpperCase?b:o.href?'A':'').toUpperCase("
+")};s.oid=function(o){var s=this,t=s.ot(o),p=o.protocol,c=o.onclick,"
+"n='',x=0;if(!o.s_oid){if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.to"
+"LowerCase().indexOf('javascript')<0))n=o.href;else if(c){n=s.rep(s."
+"rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x="
+"2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=o.value;x=3}else if"
+"(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}re"
+"turn o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>"
+"=0?','+t.substring(0,e)+',':'';return u&&u.indexOf(','+un+',')>=0?s"
+".epa(t.substring(e+1)):''};s.rq=function(un){var s=this,c=un.indexO"
+"f(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);retu"
+"rn s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf("
+"'='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.su"
+"bstring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this"
+";s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r"
+"(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&',"
+"'sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)s.sqq[s.squ[x]]"
+"+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&s.sqq[x]&&(x==q||"
+"c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};"
+"s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,"
+"\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++"
+"){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\""
+"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh"
+"(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s"
+".apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b."
+"attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.a"
+"ddEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl"
+")}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamp"
+"lingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.ge"
+"tYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c"
+"_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=fun"
+"ction(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=func"
+"tion(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t."
+"substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return "
+"n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection"
+",l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un.toLowerCas"
+"e();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l="
+"l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un"
+"=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=fun"
+"ction(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+"
+"',').indexOf(un)<0)s.oun+=','+un;s.uns()};s.t=function(){var s=this"
+",trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*1"
+"0000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/108000"
+"00)%10+sed,yr=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y"
+"r<1900?yr+1900:yr)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.get"
+"Seconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tfs=s.gtfs(),t"
+"a='',q='',qs='';s.gl(s.vl_g);s.uns();if(!s.q){var tl=tfs.location,a"
+",o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',"
+"0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j=\"1.1"
+"\";if(j.match){j=\"1.2\";if(tm.setUTCDate){j=\"1.3\";if(s.isie&&s.i"
+"smac&&s.apv>=5)j=\"1.4\";if(pn.toPrecision){j=\"1.5\";a=new Array;i"
+"f(a.forEach){j=\"1.6\";i=0;o=new Object;eval(\"try{i=new Iterator(o"
+")}catch(e){}\");if(i&&i.next)j=\"1.7\"}}}}}if(s.apv>=4)x=screen.wid"
+"th+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaE"
+"nabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidt"
+"h;bh=s.wd.innerHeight;}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>="
+"4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw="
+"s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight"
+";if(!s.ismac&&s.b){eval(\"try{s.b.addBehavior('#default#homePage');"
+"hp=s.b.isHomePage(tl)?'Y':'N'}catch(e){}\");eval(\"try{s.b.addBehav"
+"ior('#default#clientCaps');ct=s.b.connectionType}catch(e){}\")}}}el"
+"se r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,"
+"100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.q=(x?'&s='+s.ape(x):'')+(c"
+"?'&c='+s.ape(c):'')+(j?'&j='+j:'')+(v?'&v='+v:'')+(k?'&k='+k:'')+(b"
+"w?'&bw='+bw:'')+(bh?'&bh='+bh:'')+(ct?'&ct='+s.ape(ct):'')+(hp?'&hp"
+"='+hp:'')+(p?'&p='+s.ape(p):'')}if(s.usePlugins)s.doPlugins(s);var "
+"l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l;i"
+"f(!s.referrer)s.referrer=r;if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if"
+"(!o)return '';var p=s.gv('pageName'),w=1,t=s.ot(o),n=s.oid(o),x=o.s"
+"_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parent"
+"Element?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s."
+"oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_g"
+"s(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return"
+" ''}ta=n?o.target:1;h=o.href?o.href:'';i=h.indexOf('?');h=s.linkLea"
+"veQueryString||i<0?h:h.substring(0,i);l=s.linkName?s.linkName:s.ln("
+"h);t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&"
+"pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?"
+"'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s."
+"gv('pageURL');w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n="
+"s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+("
+"w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';if(s.p_r)s.p_r()"
+";var code='';if(trk&&s.vs(sed))code=s.mr(sess,(vt?'&t='+s.ape(vt):'"
+"')+s.hav()+q+(qs?qs:s.rq(s.un)),ta);s.sq(trk?'':qs);s.lnk=s.eo=s.li"
+"nkName=s.linkType=s.wd.s_objectID=s.ppu='';if(s.pg)s.wd.s_lnk=s.wd."
+"s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.tl=function("
+"o,t,n){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t()};s."
+"ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d="
+"document;s.b=s.d.body;s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.ind"
+"exOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexO"
+"f('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)"
+"apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn"
+"=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>"
+"=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv"
+"=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else "
+"if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=par"
+"seFloat(v);s.em=0;if(String.fromCharCode){i=escape(String.fromCharC"
+"ode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa"
+"(un);s.vl_l='visitorID,vmk,ppu,charSet,visitorNamespace,cookieDomai"
+"nPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode,purc"
+"haseID';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,tr"
+"ansactionID,campaign,state,zip,events,products,linkName,linkType';f"
+"or(var n=1;n<51;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n;s.vl_g=s."
+"vl_t+',trackDownloadLinks,trackExternalLinks,trackInlineStats,linkL"
+"eaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInter"
+"nalFilters,linkNames';s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()}",
l=window.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf(
'MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(l)for(i=0;i<l.length;i++){
s=l[i];if(s.oun==un)return s;else if(s.fs(s.oun,un)){s.sa(un);return s
}}if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}
else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a
>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){eval(c);return new
s_c(un,pg,ss)}else s=s_c2f(c);return s(un,pg,ss)}function s_co(o){
var s=s_gi("^",1,1);return s.co(o)}function s_gs(un){var s=s_gi(un,1,1
);return s.t()}function s_dc(un){var s=s_gi(un,1);return s.t()}
