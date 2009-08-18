// js/ads/ysm/cm.js
function sfg_ShowListings() {
  var i=6;
  var last_item = 0;
  if ( typeof zSr != "undefined" && zSr != null && zSr.length > i ) {
    var lastel = zSr.length - 6;
    document.write('\n<div class="contextualad">\n<div class="sfg_ysm001">\n');
    document.write('<h3><a href="http://searchmarketing.yahoo.com/srch/contentmatch.php" target="_new">Ads by Yahoo!</a></h3>\n');
    while (i < zSr.length) {
      if (i == lastel) {
        last_item = 1;
      }
      var descr = zSr[i++];
      var unused1 = zSr[i++];
      var clickURL = zSr[i++];
      var title = zSr[i++];
      var sitehost = zSr[i++];
      var unused2 = zSr[i++];
      if (last_item) {
        document.write('<div class="item_last">\n');
      } else {
        document.write('<div class="item">\n');
      }
      document.write('<h4><a target="_new" href="' + clickURL + '">' + title + '</a></h4>\n');
      document.write('<p><a target="_new" href="' + clickURL + '">' + descr + '</a></p>\n');
      document.write('<p class="sitehost"><a target="_new" href="' + clickURL + '">(' + sitehost + ')</a></p>\n');
      document.write('</div>\n\n');
    }
    document.write('</div>\n</div><!-- end contextual ad -->\n');
  } else {
      document.write('<!-- YSM error - no ads returned -->');
  }
}
// end js/ads/ysm/cm.js
