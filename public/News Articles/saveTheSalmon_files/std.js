// types/common/pages/searchbar/sfgate_un_p787.js
function sfgate_un() {
    var start = document.cookie.indexOf('hd=')
    if (start == -1) {
        return '';
    }
    start +=3 ;
    var username = document.cookie.substr(start);
    var end = username.indexOf(';');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }
    if ( username.length == 0 ) {
        return '';
    }
    end = username.indexOf('|');
    if ( end == -1 ) {
        return '';
    }

    return username.substr(0,end);
}

function print_sfgate_un() {
    var encodedURL = escape(window.location);
    var sfgate_user = sfgate_un();
    if (sfgate_user) {
        document.write('Hello, <span class="pipe"><a href="/cgi-bin/contribute/sn/persona?plckPersonaPage=PersonaHome&amp;plckUserId='+sfgate_user+'&amp;User='+sfgate_user+'">' + sfgate_user + '</a>');
        document.write(' | <a href="/cgi-bin/webreg/user/account?user=' +
                       sfgate_user + '">My Account</a>');
        document.write(' | <a href="/cgi-bin/webreg/user/loaccount">Sign Out</a></span>');
    } else {
        document.write('<span class="pipe"><a href="/cgi-bin/webreg/user/xaccount">Sign In</a>');
        document.write(' | <a href="/cgi-bin/webreg/user/reg_cnt">Register</a></span>');
    }
}

function print_sfgate_un_stacked() {
    var encodedURL = escape(window.location);
    var sfgate_user = sfgate_un();
    if (sfgate_user) {
        document.write('Hello, <a href="/cgi-bin/contribute/sn/persona?plckPersonaPage=PersonaHome&amp;plckUserId='+sfgate_user+'&amp;User='+sfgate_user+'">' + sfgate_user + '</a>');
        document.write('<span style="display:block;line-height:15px;"><a href="/cgi-bin/webreg/user/account?user=' + sfgate_user + '">My Account</a></span>');
        document.write('<span style="display:block;line-height:15px;"><a href="/cgi-bin/webreg/user/loaccount">Sign Out</a></span>');
    } else {
        document.write('<span style="display:block;line-height:15px;"><a href="/cgi-bin/webreg/user/xaccount">Sign In</a></span>');
        document.write('<span style="display:block;line-height:15px;"><a href="/cgi-bin/webreg/user/reg_cnt">Register</a></span>');
    }
}
function sfgate_get_hd_cookie_username() {
//try { console.log('detect hd un #1: ' + document.cookie); } catch(err) {}
    var start = document.cookie.indexOf('hd=')
//try { console.log('found "hd=" @: ' + start); } catch(err) {}
    if (start == -1) {
        return '';
    }
    start +=3 ;
    var username = document.cookie.substr(start);

//try { console.log('detect hd un #2: ' + username); } catch(err) {}
    var end = username.indexOf(';');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }

//try { console.log('detect hd un #3: ' + username); } catch(err) {}
    if ( username.length == 0 ) {
        return '';
    }
    end = username.indexOf('|');
    if ( end == -1 ) {
        return '';
    }
//try { console.log('detect hd un #4: ' + username); } catch(err) {}

    return username.substr(0,end);
}

function sfgate_get_at_cookie_username() {
    var start = document.cookie.indexOf('at=');
    if (start == -1) {
        return '';
    }
    start +=3 ;
    var username = document.cookie.substr(start);

    var end = username.indexOf(';');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }

    username_found = 0;

    // the next line could potentially match a URL parameter with a key ending in 'u=' (i.e. 'foou='
    // the best solution to handle this case is a '.split("&")'
    //   then loop through that array,
    //   then test line.substr(0, 2) against 'u=' 
    allATCookieParams	= username.split('&');

    for (i=0; i<allATCookieParams.length; i++) {
        if(allATCookieParams[i].substr(0,2) == 'u=') {
            username = allATCookieParams[i].substr(2);
            username_found = 1;
            i = allATCookieParams.length; // equivelent to a break
        }
    }

    if(username_found != 1)
        return '';

    var end2 = username.indexOf('&');
    if ( end2 != -1 ) {
        username = username.substr(0,end2);
    }

    var end = username.indexOf(';');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }

    if ( username.length == 0 ) {
        return '';
    }
    end = username.indexOf('&');
    if ( end != -1 ) {
        username = username.substr(0,end);
    }

    return username;
}

function sfgate_at_is_bad () {
    var start = document.cookie.indexOf('at=');
    if (start == -1) {
        return 0;
    }
    start +=3 ;
    var at = document.cookie.substr(start);

    var end = at.indexOf(';');
    if ( end != -1 ) {
        at = at.substr(0,end);
    }

    if (at.indexOf('pwd_md5_tmpl') != -1) { return 1; }

    return 0;
}

// end types/common/pages/searchbar/sfgate_un_p787.js

/*
 types/article/sharing02.js
share functions
ssaux, pfagan 03/2007
*/

// Build an URL for the share service passed in the function argument

function sfgate_share(service) {
    // Get href and title
    // PDS URL correction, remove when going live
    var url = location.href;
    url = url.replace(/^http:\/\/[a-z]+\.u\./i,'http://www.');
    encodedurl = encodeURIComponent(url);
    var encodedtitle = encodeURIComponent(document.title);

    var serviceUrl = null;
    if (service == 'delicious') {
        serviceURL = 'http://del.icio.us/post?v=4&noui&jump=close'
            + '&url='      + encodedurl
            + '&title='    + encodedtitle;
    } else if (service == 'digg') {
        serviceURL = 'http://digg.com/submit?phase=2'
            + '&url='      + encodedurl
            + '&title='    + encodedtitle;
    } else if (service == 'facebook') {
        serviceURL = 'http://www.facebook.com/sharer.php'
            + '?u=' + encodedurl
            + '&t=' + encodedtitle;
    } else if (service == 'fark') {
        serviceURL = 'http://www.fark.com/cgi/fark/submit.pl'
            + '?new_url='     + encodedurl
            + '&new_comment=' + encodedtitle;
    } else if (service == 'google') {
        serviceURL = 'http://www.google.com/bookmarks/mark?op=add'
            + '&bkmk='       + encodedurl
            + '&title='      + encodedtitle
            + '&labels='     + ''
            + '&annotation=' + '';
    } else if (service == 'newsvine') {
        serviceURL = 'http://www.newsvine.com/_tools/seed&save'
            + '?u='      + encodedurl;
    } else if (service == 'reddit') {
        serviceURL = 'http://reddit.com/submit'
            + '?url='      + encodedurl
            + '&title='    + encodedtitle;
    } else if (service == 'slashdot') {
        serviceURL = 'http://slashdot.org/bookmark.pl'
            + '?url='   + encodedurl
            + '&title=' + encodedtitle;
    } else if (service == 'technorati') {
        serviceURL = 'http://technorati.com/faves?sub=favthis'
            + '&add=' + encodedurl;
    }
    if ( serviceURL != null ) {
        var theNewWin = window.open(serviceURL,'sfgateshare','width=900,height=640,resizable=yes,toolbar=no,location=no,scrollbars=yes');
        if ( typeof theNewWin != "undefined" &&
             theNewWin != null ) {
            theNewWin.focus();
        }
    }
    // remove the layer.
    document.getElementById('sharepop1').style.display='none';
    document.getElementById('sharepop1mask').style.display='none';
}
// end  types/article/sharing02.js

// templates/types/article/fontprefs.js
var sfgate_sizeclasses = {xs: {minus: null, plus: 'sm'},
                          sm: {minus: 'xs', plus: 'md'},
                          md: {minus: 'sm', plus: 'lg'},
                          lg: {minus: 'md', plus: 'xl'},
                          xl: {minus: 'lg', plus: null}}

var sfgate_bt_fonts = {georgia: 1,
                       verdana: 1,
                       times: 1,
                       arial: 1};

function sfgate_validate_fprefs(textclass) {

    var textclasses = textclass.split(' ');
    var fontclass   = textclasses[0];
    var sizeclass   = textclasses[1];

    if ( typeof fontclass == "undefined" ||
         typeof sizeclass == "undefined" ||
         typeof sfgate_sizeclasses[sizeclass] == "undefined" ||
         typeof sfgate_bt_fonts[fontclass] == "undefined" ) {
        return null;
    }
    return {fc: fontclass,
            sc: sizeclass};
}

function sfgate_chfont_mo(e) {
    if (!e) var e = window.event;
    var tg = (window.event) ? e.srcElement : e.target;
    if (tg.id != 'fontpopup' ) return;
    var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
    while (reltg != tg && reltg.nodeName != 'BODY')
    reltg= reltg.parentNode
    if (reltg== tg) return;
    // Otherwise, mouseout took place when mouse actually left layer
    // Handle event
    document.getElementById('fontpopup').style.display='none';
}

// returns an object that contains the
// bodytext element and the current fontclass and size class
// of that element. All error checking is done
// here.
function sfgate_getbodytext_obj (loc) {
    var textel   = document.getElementById('fontprefs_' + loc);

    if ( typeof textel == "undefined" ||
         typeof textel.className == "undefined" ) {
        return null;
    }

    var c_obj = sfgate_validate_fprefs(textel.className);
    if ( c_obj == null ) {
        return null;
    }
    return {el: textel,
                    fc: c_obj.fc,
                    sc: c_obj.sc};
}

// change font family
function sfgate_chfont(newfont) {
    var c_obj_top = sfgate_getbodytext_obj('top');
    var c_obj_bottom = sfgate_getbodytext_obj('bottom');

    if ( c_obj_top == null ) {
        return;
    }
    if ( c_obj_bottom == null ) {
        return;
    }

    var tc = newfont + ' ' + c_obj_top.sc;
    c_obj_top.el.className = tc;
    c_obj_bottom.el.className = tc;
    sfgate_set_fprefs(tc);
}

// change font size

function sfgate_chsize(direction) {
//alert("in chsize, " + direction);
    var c_obj_top = sfgate_getbodytext_obj('top');
    var c_obj_bottom = sfgate_getbodytext_obj('bottom');

    if ( c_obj_top == null ||
         sfgate_sizeclasses[c_obj_top.sc][direction] == null ) {
        return;
    }
    if ( c_obj_bottom == null ||
         sfgate_sizeclasses[c_obj_bottom.sc][direction] == null ) {
        return;
    }

    var tc = c_obj_top.fc + ' ' +  sfgate_sizeclasses[c_obj_top.sc][direction];
    c_obj_top.el.className = tc;
    c_obj_bottom.el.className = tc;
    sfgate_set_fprefs(tc);

}

function sfgate_setsize(sizeclass) {
    var c_obj_top = sfgate_getbodytext_obj('top');
    var c_obj_bottom = sfgate_getbodytext_obj('bottom');

    if ( c_obj_top == null ||
         typeof sfgate_sizeclasses[sizeclass] == "undefined" ) {
        return;
    }
    if ( c_obj_bottom == null ||
         typeof sfgate_sizeclasses[sizeclass] == "undefined" ) {
        return;
    }

    c_obj_top.el.className = c_obj_top.fc + ' ' +  sizeclass;
    c_obj_bottom.el.className = c_obj_top.fc + ' ' +  sizeclass;
}

// set cookie function, not yet in use

function sfgate_set_fprefs(fprefs) {
    var nextyear = new Date();
    nextyear.setDate(nextyear.getDate() + 365);
    document.cookie = 'fprefs=' + escape(fprefs) +
                '; expires=' + nextyear.toUTCString() +
                '; path=/' +
                '; domain=.sfgate.com';
}

function sfgate_get_fprefs() {
    var start = document.cookie.indexOf('fprefs')
    if (start == -1) {
        return;
    }
    start +=7 ;
    var cookieVal = document.cookie.substr(start);
    var end = cookieVal.indexOf(';');
    if ( end != -1 ) {
        cookieVal = cookieVal.substr(0,end);
    }
    if ( cookieVal.length == 0 ) {
        return;
    }
    cookieVal = unescape(cookieVal);

    var c_obj = sfgate_validate_fprefs(cookieVal);
    if ( c_obj == null ) {
        return;
    }

    var textel_top = document.getElementById('fontprefs_top');
    var textel_bottom   = document.getElementById('fontprefs_bottom');

    if (textel_top == null) {
        return;
    }
    if (textel_bottom == null) {
        return;
    }

    textel_top.className = cookieVal;
    textel_bottom.className = cookieVal;

    var radiob = document.getElementById('font_radio_' + c_obj.fc);
    if (radiob == null) {
        return;
    }

    radiob.checked = true;
}
// end templates/types/article/fontprefs.js

// js/utils/fstore.js
// utility functions to store values in hidden inputs
// get integer value stored in form input el. Returns 0 if el is null
function sfggifel(el) {
    if ( el ) {
        return parseInt(el.value);
    }
    return 0;
}
// set integer in input id;
function sfgsitel(el, num) {
    sfgsstel(el,num); 
}
// get boolean value.
function sfggbfel(el) {
    if ( el ) {
        if ( el.value == "True" ) {
            return true;
        }
    }
    return false;
}
// set boolean value
function sfgsbtel(el, b) {
    sfgsstel(el, (b ? "True" : "False" ));
}
// get string value
function sfggsfel(el) {
    if ( el ) {
        return el.value;
    }
    return '';
}
// set string value
function sfgsstel(el, s) {
    if ( el ) {
        el.value = s;
    }
}
// end js/utils/fstore.js

// begin: js/utils/rot.js
function sfgate_dump(s) {
    if ( window.dump ) {
        dump(s);
    }
}

function sfgrot(n,s,domid,freq,jump) {
    this.numels = n;
    this.show = s;
    this.show_orig = s;
    if ( this.show > this.numels ) {
        this.show = this.numels;
    }
    this.stateids = new Array();
    this.tabids = new Array();
    this.timeout;
    this.domid = domid;
    this.freq = freq;
    this.numrot = 1 * n; // hardcoded for now
    this.currotnum = 0;
    this.jump = jump;
    if ( this.jump > this.show ) {
        this.jump = this.show;
    }
    window[this.domid] = this;
}

sfgrot.prototype.getDomXEl = function(subel) {
    return document.getElementById(this.domid+subel);
}

sfgrot.prototype.setup = function() {
    var lastTest = 0;
    for ( var i = 1; i <= this.numels && lastTest == 0 ; i++ ) {
        var el = this.getDomXEl(i);
        if ( el == null ) {
            // we don't have a complete set <=> none
            this.stateids[0] = null;
            lastTest = 1;
        } else {
            this.stateids[i-1] = el;
        }
    }
    lastTest = 0;
    for ( i = 1; i <= this.numels && lastTest == 0 ; i++ ) {
        el = this.getDomXEl('_tab'+i);
        if ( el == null ) {
            // we don't have a complete set <=> none
            this.tabids[0] = null;
            lastTest = 1;
        } else {
            this.tabids[i-1] = el;
        }
    }
    // buttons
    this.playb = this.getDomXEl('_play');
    this.pauseb = this.getDomXEl('_pause');
    this.nextben = this.getDomXEl('_next_en');
    this.prevben = this.getDomXEl('_prev_en');
    this.nextbdis = this.getDomXEl('_next_dis');
    this.prevbdis = this.getDomXEl('_prev_dis');
    this.showing = this.getDomXEl('_showing');
    // input form element to keep data
    this.idi = this.getDomXEl('_idi');
    this.pi  = this.getDomXEl('_pi');
    this.showid(sfggifel(this.idi));
    if ( this.show_orig >= this.numels ) {
        if ( this.nextben ) {
            this.nextben.style.display = 'none';
        }
        if ( this.nextbdis ) {
            this.nextbdis.style.display = 'none';
        }
        if ( this.prevben ) {
            this.prevben.style.display = 'none';
        }
        if ( this.prevbdis ) {
            this.prevbdis.style.display = 'none';
        }
        if ( this.showing ) {
            this.showing.style.display = 'none';
        }
    } else {
       this.setnextprev(sfggifel(this.idi));
    }
    if (!this.setshowing) {
       this.setshowing = this.setshowingtext;
    }
    this.setshowing(sfggifel(this.idi));
    this.rotate();
}

sfgrot.prototype.showid = function (id) {
    if ( id < 1 || id > this.numels ) {
        return;
    }
    id--;
    var i;
    var ns = this.show;
    if ( this.stateids[0] != null ) { // do we use main ids?
        for ( i = id; i < this.numels ;i++ ){
            if ( ns > 0 ) {
                this.stateids[i].style.display = 'block';
                ns--;
            } else {
                this.stateids[i].style.display = 'none';
            }
        }                 
        for ( i = 0; i < id ;i++ ){
            if ( this.freq != 0 && ns > 0 ) {
                this.stateids[i].style.display = 'block';
                ns--;
            } else {
                this.stateids[i].style.display = 'none';
            }
        }                 
    }

    if ( this.tabids[0] != null ) { // do we use tabs?
        // note: makes not sense to have more than one tab
        // selected.
        for ( i = 0; i < this.numels ; i++ ){
            this.tabids[i].className = '';
        }                 
        this.tabids[id].className = 'selected';
    }

    // restore for storing.
    id = id + 1;
    sfgsitel(this.idi,id);
}

sfgrot.prototype.mshowid = function (id) {
    this.stop();
    this.showid(id);
}

sfgrot.prototype.stop = function () {
    clearTimeout(this.timeout);
    sfgsbtel(this.pi, false);
    if ( this.playb ) {
        this.playb.style.display = 'block';
    }
    if ( this.pauseb ) {
        this.pauseb.style.display = 'none';
    }
}

sfgrot.prototype.play = function () {
    sfgsbtel(this.pi, true);
    var cur = this.nextel(true);
    this.showid(cur);
    this.currotnum = 1; // not zero since we've already moved one.
    this.rotate();
}

sfgrot.prototype.start = function () {
    if ( this.playb ) {
        this.playb.style.display = 'none';
    }
    if ( this.pauseb ) {
        this.pauseb.style.display = 'block';
    }
}

sfgrot.prototype.rotate = function () {
    if ( this.freq != 0 && sfggbfel(this.pi) && this.currotnum < this.numrot ) {
        clearTimeout(this.timeout)
        this.start();
        this.currotnum = this.currotnum + 1;
        var cur = this.nextel(true);
        this.timeout = setTimeout(this.domid+'.showid('+cur+');'+this.domid+'.rotate();', this.freq);
    } else {
        this.stop();
    }        
}

sfgrot.prototype.nextel = function (up) {
    var cur = sfggifel(this.idi);
    if ( typeof cur == "undefined" ) {
        cur = 1;
    } else {
        if ( up ) {
            cur = cur + this.jump;
            if ( cur > this.numels ) {
                cur = cur - this.numels;
            }
        } else {
            cur = cur - this.jump;
            if ( cur < 1 ) {
                cur = cur + this.numels;
            }
        }
    }
    return cur;
}

sfgrot.prototype.setnextprev = function (cur) {
    if ( cur > ( this.numels - this.show ) ) {
        this.nonext = true;
        if ( this.nextben ) {
            this.nextben.style.display = 'none';
        }
        if ( this.nextbdis ) {
            this.nextbdis.style.display = 'inline';
        }
    } else {
        this.nonext = false;
        if ( this.nextben ) {
            this.nextben.style.display = 'inline';
        }
        if ( this.nextbdis ) {
            this.nextbdis.style.display = 'none';
        }
    }        
    if ( cur > this.show ) {
        this.noprev = false;
        if ( this.prevben ) {
            this.prevben.style.display = 'inline';
        }
        if ( this.prevbdis ) {
            this.prevbdis.style.display = 'none';
        }
    } else {
        this.noprev = true;
        if ( this.prevben ) {
            this.prevben.style.display = 'none';
        }
        if ( this.prevbdis ) {
            this.prevbdis.style.display = 'inline';
        }
    }
}

sfgrot.prototype.next = function () {
    if ( this.nextben ) {
        this.nextben.blur();
    }
    if ( this.nexbdis ) {
        this.nextbdis.blur();
    }

    if ( this.nonext ) {
        return;
    }
    var cur = this.nextel(true);
    this.showid(cur);
    this.setnextprev(cur)
    this.setshowing(cur);
}

sfgrot.prototype.prev = function () {
    if ( this.prevben ) {
        this.prevben.blur();
    }
    if ( this.prevbdis ) {
        this.prevbdis.blur();
    }
    if ( this.noprev ) {
        return;
    }
    var cur = this.nextel(false);
    this.showid(cur);
    this.setnextprev(cur);
    this.setshowing(cur);
}

sfgrot.prototype.setshowingtext = function (cur) {
    if ( this.showing == null ) {
        return;
    }
    var showing = 'Showing: '+cur+'-';
    if ( cur <= ( this.numels - this.show ) ) {
        var showend = cur + this.show - 1;
        showing += showend;
    } else {
        showing += this.numels;
    }
    showing += ' of '+this.numels;
    this.showing.innerHTML = showing;
}
// end: js/utils/rot.js

// types/topmost/js/topmost.js
// Preload Tab Images
var most_read =    new Image(); most_read.src =    "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/most_read_on.gif";
var most_emailed = new Image(); most_emailed.src = "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/most_emailed_on.gif";
var most_commented =  new Image(); most_commented.src =  "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/most_commented_on.gif";

var divids=new Array('mostread','mostemailed','topstories');
var tabids=new Array('most_read','most_emailed','most_commented');


function switchid(id,tab){  
        hideallids();
        showdiv(id,tab);
}

function hideallids(){
        //loop through the array and hide each element by id
        for (var i=0;i<divids.length;i++){
                hidediv(divids[i],tabids[i]);
        }                 
}

function hidediv(id,taboff) {
        //safe function to hide an element with a specified id
        if (document.getElementById) { // DOM3 = IE5, NS6
                document.getElementById(id).style.display = 'none';
        }
        else {
                if (document.layers) { // Netscape 4
                        document.id.display = 'none';
                }
                else { // IE 4
                        document.all.id.style.display = 'none';
                }
        }
        // switch tab image to off state
        document.getElementById(taboff).src = "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/"+taboff+"_off.gif";
}

function showdiv(id,tab) {
        //safe function to show an element with a specified id
                  
        if (document.getElementById) { // DOM3 = IE5, NS6
                document.getElementById(id).style.display = 'block';
        }
        else {
                if (document.layers) { // Netscape 4
                        document.id.display = 'block';
                }
                else { // IE 4
                        document.all.id.style.display = 'block';
                }
        }
        // switch tab image to current selection
        document.getElementById(tab).src = "http://imgs.sfgate.com/graphics/contentmodules/topmost/cre/"+tab+"_on.gif";
}
// end types/topmost/js/topmost.js

// /js/utils/hideoneorlast.js
// remove one of the articles
function sfg_hideoneorlast(id_prefix) {
   if ( window.sfgate_f !== undefined ) {
      var curid = id_prefix + '_' + window.sfgate_f;
      var curidel = document.getElementById(curid);
      if ( ! curidel ) {
         curidel = document.getElementById(id_prefix + '_last_row');
      }
      if ( curidel ) {
         curidel.style.display = 'none';
      }
   }
}
// end /js/utils/hideoneorlast.js

/* js/jsan/Ajax.js
Ajax - Simple Ajax Support Library

DESCRIPTION:

This library defines simple cross-browser functions for rudimentary Ajax
support.

AUTHORS:

    Ingy döt Net <ingy@cpan.org>
    Kang-min Liu <gugod@gugod.org>

COPYRIGHT:

Copyright Ingy döt Net 2006. All rights reserved.

Ajax.js is free software. 

This library is free software; you can redistribute it and/or modify it
under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation; either version 2.1 of the License, or (at
your option) any later version.

This library is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser
General Public License for more details.

    http://www.gnu.org/copyleft/lesser.txt

 =============================================================================*/

if (! this.Ajax) Ajax = function () {};
proto = Ajax.prototype;

Ajax.VERSION = '0.10';

// Allows one to override with something more drastic.
// Can even be done "on the fly" using a bookmarklet.
// As an example, the test suite overrides this to test error conditions.
proto.die = function(e) { throw(e) };

// The simple user interface function to GET. If no callback is used the
// function is synchronous.

Ajax.get = function(url, callback) {
    return (new Ajax()).get(
        { 'url': url, 'onComplete': callback }
    );
}

// The simple user interface function to POST. If no callback is used the
// function is synchronous.
Ajax.post = function(url, data, callback) {
    return (new Ajax()).post(
        { 'url': url, 'data': data, 'onComplete': callback }
    );
}

// Object interface
proto.get = function(params) {
    this._init_object(params);
    this.request.open('GET', this.url, Boolean(this.onComplete));
    return this._send();
}

proto.post = function(params) {
    this._init_object(params);
    this.request.open('POST', this.url, Boolean(this.onComplete));
    this.request.setRequestHeader(
        'Content-Type', 
        'application/x-www-form-urlencoded'
    );
    return this._send();
}

// Set up the Ajax object with a working XHR object.
proto._init_object = function(params) {
    for (key in params) {
        if (! key.match(/^url|data|onComplete$/))
            throw("Invalid Ajax parameter: " + key);
        this[key] = params[key];
    }

    if (! this.url)
        throw("'url' required for Ajax get/post method");

    if (this.request)
        throw("Don't yet support multiple requests on the same Ajax object");

    this.request = new XMLHttpRequest();

    if (! this.request)
        return this.die("Your browser doesn't do Ajax");
    if (this.request.readyState != 0)
        return this.die("Ajax readyState should be 0");

    return this;
}

proto._send = function() {
    var self = this;
    if (this.onComplete) {
        this.request.onreadystatechange = function() {
            self._check_asynchronous();
        };
    }
    this.request.send(this.data);
    return Boolean(this.onComplete)
        ? this
        : this._check_synchronous();
}

// TODO Allow handlers for various readyStates and statusCodes.
// Make these be the default handlers.
proto._check_status = function() {
    if (this.request.status != 200) {
        return this.die(
            'Ajax request for "' + this.url +
            '" failed with status: ' + this.request.status
        );
    }
}

proto._check_synchronous = function() {
    this._check_status();
    return this.request.responseText;
}

proto._check_asynchronous = function() {
    if (this.request.readyState != 4) return;
    this._check_status();
    this.onComplete(this.request.responseText);
}

// IE support
if (window.ActiveXObject && !window.XMLHttpRequest) {
    window.XMLHttpRequest = function() {
        var name = (navigator.userAgent.toLowerCase().indexOf('msie 5') != -1)
            ? 'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP';
        return new ActiveXObject(name);
    }
}

// end js/jsan/Ajax.js

// js/polls/polls.js
function $(id) {
 if (document.all) {    // IE
  var i, o, objs = document.all[id];
  for (i=0;i<objs.length;i++) {
   o = objs[i];
   if (o.attributes['id'] && (o.attributes['id'].value == id)) return o;
  }
 } else {
  return document.getElementById(id);
 }
}
function voteRequest(frm) {
 var i, p = $(frm.name+'/vote');
 if (p) p.style.cursor = 'wait';
 p = frm.name;
 $(p).style.cursor = 'wait';
 // // // $(p).parentNode.style.cursor = 'wait';
 Ajax.get(p+'/v');
 var answer=0;
 for (i=0;i<frm.answer.length;i++) {
  if (frm.answer[i].checked==true) answer=frm.answer[i].value;
 }
 $(p).innerHTML = Ajax.get(frm.action + '?p=' + p + '&answer=' + answer);
 $(p).style.cursor = 'auto';
 return false;
}
function ajaxLink(href) {
 href.style.cursor = 'wait';
 $(href.name).innerHTML = Ajax.get(href);
 return false;
}
function displayDiv(href) { href.blur(); $(href.name).style.display = 'block'; return false; }
function hideDiv(href)    { href.blur(); $(href.name).style.display = 'none' ; return false; }
// end js/polls/polls.js




