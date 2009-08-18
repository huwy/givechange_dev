var ACE3PopHost='http://p.ace.advertising.com'
var ACE3Host1='http://beta.ace.advertising.com'
var ACE3Host2='http://r1.ace.advertising.com'
var ACE3Host1Var='as=0'
var ACE3Host2Var='as=1'
var ACE3NewHost=new Array()
//ACE3NewHost['759556']=50
//var ACE3GlobalHostPercent=100
//var ACE3GlobalHost='http://r1.ace.advertising.com'
var ACE3GlobalHost1Var='as=3'
var ACE3AV=parseInt(navigator.appVersion),ACE3IE=(navigator.appName=="Microsoft Internet Explorer")
var ACE3NS=(navigator.appName=="Netscape"),ACE3FV="",ACE3dt=new Date(),ACE3FVer='0'
if (!window.ACE3Ck){ACE3dt.setTime(ACE3dt.getTime()+(3600000))
document.cookie="ace3=1; expires="+ACE3dt.toGMTString()+"; path=/;"
var ACE3Ck=0
if (document.cookie.indexOf('ace3')>=0){ACE3Ck=2
document.cookie = "ace3=1; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/;"
}else{document.cookie="ace3=1; path=/;"
if (document.cookie.indexOf('ace3')>=0){ACE3Ck=1
document.cookie = "ace3=1; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/;"}}
if (ACE3Ck>0&&ACE3NS)ACE3Ck=3}
function ACE3CkPlg(){
var e='</',ie=0,dc=document,dl=dc.layers,da=dc.all,dg=dc.getElementById,n=navigator,db=dc.body
var cid='componentid',beh='url(#default#clientCaps)',ie5=da&&dg,go=(da||dl||(dg&&!da)),ua=n.userAgent
if (ua.indexOf('MSIE')!=-1&&ua.indexOf('Win')!=-1){ie=1
var d=document.writeln
d('<script language="VBscript">')
d('Dim adsVB,po')
d('adsVB=0')
d('If ScriptEngineMajorVersion >=2 then adsVB=1')
d('Function adsAX(aX)')
d('on error resume next')
d('If adsVB=1 then')
d('adsAX=False')
d('set po=CreateObject(aX)')
d('adsAX=IsObject(po)')
d('If (err) then adsAX=False')
d('Else')
d('adsAX=False')
d('End If')
d('End Function')
d(e+'script>')}
var i,u=0,dF='',fS,p=n.plugins
if (ie&&window.adsVB){u=0}else{u=1}
if (p){var l=p.length
if (l>1){var m=n.mimeTypes,fl=m['application/x-shockwave-flash']
if (m&&((fl&&fl.enabledPlugin&&(fl.suffixes.indexOf('swf')!=-1)))){
var ds,f="Flash ",nm
if (ACE3NS){
for (var i=0;i<l;i++){
ds=p[i].description
fS=ds.indexOf(f)
if (fS!=-1){
if (ds.substring(fS+6,fS+7)>=6){dF='F'
ACE3FVer=ds.substring(fS+6,fS+7)}}}}
if (fl==null)dF=''
}}else if(ie==1&&!u){if (!ie5||ua.indexOf('NT')!=-1){fS="ShockwaveFlash.ShockwaveFlash."
dF=(adsAX(fS+"9")?'F':'')
if (dF)ACE3FVer='9'
if (!dF){dF=(adsAX(fS+"8")?'F':'')
if (dF)ACE3FVer='8'}
if (!dF){dF=(adsAX(fS+"7")?'F':'')
if (dF)ACE3FVer='7'}
if (!dF){dF=(adsAX(fS+"6")?'F':'')
if (dF)ACE3FVer='6'}}}else{dF=''}
}else{dF=''}
if (go){if (n.platform=='Win32'){
if (ie5&&(db!=null)){db.style.behavior=beh
var fC='{D27CDB6E-AE6D-11CF-96B8-444553540000}',fV=db.getComponentVersion(fC,cid)
if (fV.charAt(0)>=6){dF='F'
ACE3FVer=fV.charAt(0)}}}}
if (dF=='F')ACE3FV=1}
var adsComPopVar='',adComPopFo='1',adComDelayValue=''
function ACE3_AdRequest(ob){
  var obj=new Object()
  for (var p in ob){
    var lcn=p.toLowerCase()
    if (lcn!='class')obj[lcn]=ob[p]
    else obj['Class']=ob[p]
  }
  var nmVal={
  media: 'mnum',
  leadback: 'betr',
  context: 'ctxt',
  ip: 'dmip',
  mid: 'xsmemid',
  z: 'zpcd',
  mn: 'mn',
  zid: 'zid'
  }
  var ur='',ifV=0,dr,dr1,ht='',ct,dw
  try {
    ur+=escape(top.location.href)
    if (top.location.href!=location.href)ifV=1
  }
  catch (e){ur+=escape(document.referrer);ifV=2}

  if (window.ACE_DREF)dr1=window.ACE_DREF
  else dr1=ur

  dr='/dref='+escape(dr1.replace(/\//g,'%2F'))
  if (obj.site)site=obj.site
  else site='100'

  if (window.ACE_KeyParms){window.ACE_KeyParm=ACE_KeyParms[site]}
  if (window.ACE_KeyParm){
    for (var i=0;i<ACE_KeyParm.length;i=i+2){
      if (ur.toUpperCase().match(ACE_KeyParm[i].toUpperCase())!=null){
        site=ACE_KeyParm[i+1]
        break
      }
    }
  }

  if (window.ACE_FreqSiteMaps){window.ACE_FreqSiteMap=ACE_FreqSiteMaps[site]}

  if (window.ACE_FreqSiteMap&&ACE3Ck!=0){
    var cn='AdCom'+obj.site,n=ACE3getCk(cn),fd=0
    if (!n||n==''){
      var nu=0
      var ED=new Date()
      ED.setTime(ED.getTime()+(24*3600000))
      var EDs=ED.toGMTString()
    }
    else
      var n1=n.split('|'),EDs=n1[1],nu=parseInt(n1[0])

    for (var i=0;i<ACE_FreqSiteMap.length;i=i+2){
      if (nu < parseInt(ACE_FreqSiteMap[i])){
        if (ACE_FreqSiteMap[i+1])site=ACE_FreqSiteMap[i+1]
        ACE3setCk(cn,(parseFloat(nu)+1)+"|"+EDs,EDs)
        fd=1
        break
      }
    }

    if (!fd)site=obj.site
  }

  var ot="",op=(navigator.userAgent.indexOf("Opera")!=-1),old=1,adv='.advertising.com'
  var alt='Click to learn more...',gl='',bnum,szs='',parm='',se=-1
  try {se=location.href.indexOf('https://')}
  catch (e){}

  if (((ACE3NS||ACE3IE)&&ACE3AV>=4)&&!op&&!(ACE3NS&&ACE3AV==4)){old=0}

  for (var n in nmVal){
    if (obj[n]&&(typeof(obj[n])!='function')){
      if (nmVal[n]=="mn")ot+="/xsxdata=1:"+obj[n]
      else ot+="/"+nmVal[n]+"="+obj[n]
    }
  }

  if (obj.ud){
        var zip=obj.ud.split('&'),zipV
        for (var i=0;i<zip.length;i++){
          if (zip[i].toString().indexOf('zp=')!=-1){
            zipV=zip[i].split('=')
            zipV=zipV[1]
            ot+="/zpcd="+zipV
            break
          }
        }
  }

  if (window.ACE_LOGGING==0)ot+="/logs=0"
  if (obj.alttext)alt=obj.alttext

  if (window.ACE_HOST&&se<0){ht=window.ACE_HOST;gl=1}
  if (window.ACE_SHOST&&se>-1){ht=window.ACE_SHOST;gl=1}
  if (site=='712441'){ht='http://ags.beta'+adv;gl=1;obj.calltype="IFRAME"}

  var pt=obj.poptype,pu=obj.poponunload

  if (gl!=1){
    if (pt||pu){ht=ACE3PopHost;gl=1}
    if (se>-1){
      if (obj.Class==0)ht="https://secure.ace0"+adv
      else ht="https://servedby"+adv
      gl=1
    }
    if (obj.host){var v=obj.host;ht=(v.indexOf('http')==-1?"http://"+v:v);gl=1}
  }

  if (gl!=1){
    if (obj.Class==0){
             ht="http://cs.ace"+adv
             ot+="/agv=1"
             gl=1
    }
    else if (obj.Class==2){
              ht="http://cte.ace.beta"+adv
              ot+="/cte=1"
              gl=1
    }
    else if (obj.Class==3){
              ht="http://cte.ace"+adv
              ot+="/cte=1"
              gl=1
    }
  }

  if (gl!=1){
      var rand=Math.floor(Math.random()*100)+1

      if (window.ACE3NewHost&&ACE3NewHost[site]!=null){
        if (rand <= ACE3NewHost[site]){
          if (window.ACE3Host1Var)parm='/'+ACE3Host1Var
          ht=ACE3Host1
        }
        else{
           if (window.ACE3Host2Var)parm='/'+ACE3Host2Var
           ht=ACE3Host2
        }
      }
      else if (window.ACE3GlobalHost){
        if (rand <= ACE3GlobalHostPercent){
           if (window.ACE3GlobalHost1Var)parm='/'+ACE3GlobalHost1Var
           ht=ACE3GlobalHost
        }
        else {
           ht="http://servedby"+adv
        }
      }
      else {
         if (obj.region==2)ht="http://servedby2"+adv
         else if (obj.region==3)ht="http://servedby3"+adv
         else ht="http://servedby"+adv
      }
 }
if (obj.bnum)bnum=obj.bnum
else bnum=new Number(Math.floor(99999999*Math.random())+1)
if (!obj.calltype)ct='J'
else ct=obj.calltype.toString().toUpperCase()
if (obj.region=='3'&&ifV==0&&!obj.calltype&&ACE3IE)ct='IF'
if (ct=='IFRAME'||ct=='IF')ifV=2
if (obj.size)var sz=obj.size,str=sz.toString(),w=str.substr(0,3),h=str.substr(3,6)
else if (obj.width&&obj.height){var w=obj.width.toString(),h=obj.height.toString(),sz
if (w.length==2)w="0"+w
if (h.length==2)h="0"+h
if (w.length==1)w="00"+w
if (h.length==1)h="00"+h
sz=w+h}
else {var sz="468060",w=468,h=60
obj.media='316574'}
if (!obj.media)szs='/size='+sz
if (obj.adtype){var at=obj.adtype.toString().toUpperCase()
if ((at=="I")||(obj.at=="IMAGE")){ot+="/rich=0"}}
var hl=history.length
if (hl>50)hl=50
var sr='',sr1=''
if (screen.width){sr='/scres='
var sw=screen.width,sh=screen.height
if ((sw==640)&&(sh==480))sr+='2'
else if ((sw==800)&&(sh==600))sr+='3'
else if ((sw=='1024')&&(sh=='768'))sr+='4'
else if ((sw>1024)&&(sh>768))sr+='5'
else sr+='1'
sr1='/swh='+screen.width+"x"+screen.height}
else sr='/scres=1'
var pNo='1',pf=obj.popfreq
if (pf){var i=pf.indexOf(','),n=pf.substring(0,i),hr=pf.substring(i+1,pf.length)
n=parseInt(n)
var cn="AdComPop"+obj.site,ck=ACE3getCk(cn)
if (hr==0){if (!ck||ck=='')ck=0
if (ck<n)ACE3setCk(cn,parseFloat(ck)+1)
else pNo=''}
else{if (!ck||ck==''){
var ED=new Date()
ED.setTime(ED.getTime()+(hr*3600000))
ACE3setCk(cn,"1|"+ED.toGMTString(),ED.toGMTString())}
else{var ck1=ck.split('|')
if (ck1[0]<n)ACE3setCk(cn,(parseFloat(ck1[0])+1)+"|"+ck1[1],ck1[1])
else pNo=''}}}
if (window.ACE3Tile)ACE3Tile++
else ACE3Tile=1
var hd=new Date()
var hr=hd.getHours(),ex=obj.extra,opV=1,bu=''
ot+="/hr="+hr+"/hl="+hl+"/c="+ACE3Ck+sr+sr1+'/tile='+ACE3Tile+'/f='+ifV+parm
if (obj.region==2)ot+="/r=2"
else if (obj.region==3)ot+="/r=3"
else ot+="/r=1"
if (ex)(ex.charAt(0)=='/')?ot+=ex:ot+="/"+ex
if (obj.dontopenwindow=='true')opV=0
if (navigator.userAgent.indexOf('AOL')!=-1)ot+='/a=1'
if (obj.isaol=='true'){ot+='/optn='+(opV+16)}
else ot+='/optn='+opV
if (pt)pt=pt.toUpperCase()
if (pt=="POPOVER")adComPopFo='0'
if (obj.burl=='true')bu="/burl"
if (pt||pu){
 var s=ht
 if (pt!="POPHTML")s+="/pop"
 s+="/site="+site
 if (obj.size||(obj.width&&obj.height))s+=szs
 s+="/u=1/bnum="+bnum+"/tags=42"+ot
}
else var s=ht+bu+"/site="+site+szs+"/u=1/bnum="+bnum+ot
if (!old&&ct!='IMAGE'&&ct!='I'){
 if (!ACE3FV)ACE3CkPlg()
 s+="/fv="+ACE3FVer
 if (((ht.indexOf('https://')>-1))&&(s.indexOf('rich=0')==-1))s+="/rich=0"
 if (ct!='IFRAME'&&ct!='IF')dw="<SCRIPT TYPE='text/javascript' SRC='"+s+dr+"'></SCRIPT>"
else dw="<IFRAME SRC='"+s+"/tags=1"+dr+"' WIDTH="+w+" HEIGHT="+h+" SCROLLING=NO FRAMEBORDER=0 MARGINHEIGHT=0 MARGINWIDTH=0></IFRAME>"}
else {var s1=s+"/bins=1"
if (s.indexOf('rich=0')==-1)s1+="/rich=0"
dw="<A HREF='"+ht+"/click/site="+site+"/bnum="+bnum +"' TARGET='_blank'><IMG SRC='"+s1+dr+"' WIDTH="+w+" HEIGHT="+h+" BORDER=0 ALT='"+alt+"'></A>"}
if ((pt||pu)&&(old||se>-1))pNo=0
if (pt&&!(pt=='POPOVER'||pt=='POPUNDER'||pt=='POPHTML'))pNo=0
if (pNo){
if (pu){
adsComPopVar=1
}
if (obj.popdelay)adComDelayValue=obj.popdelay
document.write(dw)}
window.ACE_KeyParm=''
window.ACE_KeyParms=''
window.ACE_FreqSiteMap=''
ACE_AR=''}
function ACE3setCk(nm,v,dt){document.cookie=nm+"="+escape(v)+((dt==null)?"":"; expires="+dt)+"; path=/;"}
function ACE3getCk(nm){
var b=document.cookie.indexOf(nm+"=")
if (b!=-1){var l=b+nm.length+1,e=document.cookie.indexOf(";",l)
if (e==-1)e=document.cookie.length
return unescape(document.cookie.substring(l,e))}
else return ""}
function AcePop(m,w,h,f){
var win,p=1
if (!f)f=adComPopFo
if (adComDelayValue){
adsComPopVar=m+'|'+w+'|'+h+'|'+f
var t=setTimeout("AcePop()",adComDelayValue*1000)
adComDelayValue=""
p=0
}else{
if (!m&&window.adsComPopVar){
var n=adsComPopVar.split('|')
win=window.open(n[0],'win',"width="+n[1]+",height="+n[2]+",status=0,location=0")
f=n[3]
}
else if (m&&window.adsComPopVar){
adsComPopVar=m+'|'+w+'|'+h+'|'+f
p=0
}
else if (m){
win=window.open(m,'win',"width="+w+",height="+h+",status=0,location=0")
}
if (p){
if (f!='0'){
window.focus()
win.blur()
}
else {
win.focus()
window.blur()
}}}}
if (window.ACE_AR)ACE3_AdRequest(ACE_AR)
