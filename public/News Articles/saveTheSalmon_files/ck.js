// js/utils/ck.js get/set cookies

function sfgate_ck(name) {
    this.ck = name;
    this.val = this.get_ck(name);
    this.defined = (typeof this.val != "undefined");
}

sfgate_ck.prototype.get_ck = function (name) {
    var start_str = name+'=';
    var start = document.cookie.indexOf(start_str);
    if (start == -1) {
        return;
    }
    start = start+start_str.length;
    var cookieVal = document.cookie.substr(start);
    var end = cookieVal.indexOf(';');
    if ( end != -1 ) {
        cookieVal = cookieVal.substr(0,end);
    }
    if ( cookieVal.length == 0 ) {
        return;
    }
    cookieVal = unescape(cookieVal);
    return cookieVal;
}

sfgate_ck.prototype.set = function (val, domain, path, expire) {
    var ck_str = this.ck+'='+val+'; domain='+domain+'; path='+path+'; expires='+expire;
    document.cookie=this.ck+'='+val+'; domain='+domain+'; path='+path+'; expires='+expire;
}

sfgate_ck.prototype.del = function () {
    var d = new Date();
    d.setFullYear(1970, 1, 1);
    this.set('1', '.sfgate.com', '/', d.toUTCString());
}
sfgate_ck.prototype.set_days = function (days, val) {
    var d = new Date();
    d.setDate(d.getDate()+days);
    this.set(val, '.sfgate.com', '/', d.toUTCString());
}
sfgate_ck.prototype.set_week_end = function (val) {
    var d= new Date(); var dd = d.getDay(); dd = (7-dd)%7;
    d.setDate(d.getDate()+dd); d.setHours(23);
    d.setMinutes(59);d.setSeconds(59);
    this.set(val, '.sfgate.com', '/', d.toUTCString());
}
sfgate_ck.prototype.set_day_end = function (val) {
    var d= new Date();
    d.setHours(23);d.setMinutes(59);d.setSeconds(59);
    this.set(val, '.sfgate.com', '/', d.toUTCString());
}

// end js/utils/ck.js get/set cookies
