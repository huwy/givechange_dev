 document.domain="sfgate.com";

 function sfgate_comments_bodyonload() {
    try {
      if (sfgate_isActive) {
        sfgate_setFormState();
      }
      sfgate_presetCommentsPerPageLinks();
      sfgate_presetSortOrderLinks();
    } catch(err) {}
  }

  var sfgate_articleKey  = new ArticleKey(sfgate_file);
  var sfgate_user        = sfgate_un();
  var sfgate_userKey     = new UserKey(sfgate_user);

  var sfgate_rowsPerPage = 10;
  var cpp_value          = 10;

  function refreshCommentVariables() {
    sfgate_presetSortOrderLinks();
    sfgate_presetCommentsPerPageLinks();
    sfgate_pluck_pages_per = Math.ceil( (sfgate_cppg_count) / (10) ); // Number of pluck requests (max of 10 comments per request) to make per CGI page
  }

  function clearDisplayedComments() {
    // There should probably be one seperate DIV with a unique ID for each Pluck page of comments (one for 1-10 and another for 11-20)
    // That would ensure correct sequence of display even if AJAX responses return in the wrong order
    // This will not be necessary for a max of 20 responses per page (since they can all be handled on the same BatchRequest/Response).
    sfgate_response_elm[0].innerHTML = '';
    sfgate_response_elm[1].innerHTML = '';
  }

  function sfgate_sortOrderSet(newValueString) {
    if(newValueString == 'TimeStampAscending' || newValueString == 'TimeStampDescending' || newValueString == 'RecommendationsDescending') {
      document.getElementById('sfgate_comment_sorder').value = newValueString;
    } else {
      document.getElementById('sfgate_comment_sorder').value = 'TimeStampDescending';
    }

    sfgate_setSortOrderCookie(document.getElementById('sfgate_comment_sorder').value);
    refreshCommentVariables();

    window.location = sfgate_success_page+'&o=1';
    return false;
  }

  function sfgate_setSortOrderCookie(withValue) {
    if(withValue == 'TimeStampDescending' || withValue == 'TimeStampAscending' || withValue == 'RecommendationsDescending') {
      var nextyear = new Date();
        nextyear.setDate(nextyear.getDate() + 365);
        document.cookie = 'comments_sort_order=' + escape( withValue ) +
                  '; expires=' + nextyear.toUTCString() +
                  '; path=/' +
                  '; domain=.sfgate.com';
//      sfgate_comment_sort_o.value = withValue;
    }
  }

  function sfgate_presetCSOandCPPValues() {
    sfgate_presetSortOrderLinks();
    sfgate_presetCommentsPerPageLinks();
  }

  function sfgate_getSortOrderVal() {
    var cso_cookie_text = document.cookie.indexOf('comments_sort_order');
    var defaultCSOValue = 'TimeStampDescending';
    if (cso_cookie_text == -1) {
      return defaultCSOValue;
    }
    sort_value = document.cookie.substr(cso_cookie_text + 20);
    cso_terminatingCharIndex = sort_value.indexOf(';');
    if(cso_terminatingCharIndex >= 0) {
      sort_value = sort_value.split(';')[0];
    }
    return sort_value;
  }

  function sfgate_presetSortOrderLinks() {
    var cso_cookie_text = document.cookie.indexOf('comments_sort_order');
    var defaultCSOValue = 'TimeStampDescending';
    if (cso_cookie_text == -1) {
      sfgate_setSortOrderCookie(defaultCSOValue);
    }
    sort_value = document.cookie.substr(cso_cookie_text + 20);
    cso_terminatingCharIndex = sort_value.indexOf(';');
    if(cso_terminatingCharIndex >= 0) {
      sort_value = sort_value.split(';')[0];
    }
///////////////////////////////////////////////////////////////////////
///////  Remove this and undo the if (0) from the function below //////
///////  to begin using sort by most recomended                  //////
///////////////////////////////////////////////////////////////////////
if (0) {
    try {
      if(sort_value == 'TimeStampDescending') {
        document.getElementById('oldest_first_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_sortOrderSet(\'TimeStampAscending\')">Oldest First</a>';
        document.getElementById('newest_first_span').innerHTML = '<span style="font-weight: bold;">Newest First</span>';
      } else {
        sort_value = 'TimeStampAscending';
        document.getElementById('newest_first_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_sortOrderSet(\'TimeStampDescending\')">Newest First</a>';
        document.getElementById('oldest_first_span').innerHTML = '<span style="font-weight: bold;">Oldest First</span>';
      }
      sfgate_comment_sort = sort_value;
    } catch (e) {}
}
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

    try {
      if(sort_value == 'TimeStampDescending') {
        document.getElementById('oldest_first_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_sortOrderSet(\'TimeStampAscending\')">Oldest First</a>';
        document.getElementById('newest_first_span').innerHTML = '<span style="font-weight: bold;">Newest First</span>';
        document.getElementById('most_recomended_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_sortOrderSet(\'RecommendationsDescending\')">Recomended</a>';
      } else if(sort_value == 'RecommendationsDescending') {
        document.getElementById('oldest_first_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_sortOrderSet(\'TimeStampAscending\')">Oldest First</a>';
        document.getElementById('newest_first_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_sortOrderSet(\'TimeStampDescending\')">Newest First</a>';
        document.getElementById('most_recomended_span').innerHTML = '<span style="font-weight: bold;">Recomended</span>';
      } else {
        sort_value = 'TimeStampAscending';
        document.getElementById('oldest_first_span').innerHTML = '<span style="font-weight: bold;">Oldest First</span>';
        document.getElementById('newest_first_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_sortOrderSet(\'TimeStampDescending\')">Newest First</a>';
        document.getElementById('most_recomended_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_sortOrderSet(\'RecommendationsDescending\')">Recomended</a>';
      }
      sfgate_comment_sort = sort_value;
    } catch (e) {}
  }

  function sfgate_commentsPerPageSet(newValueString) {
    if(newValueString == '10' || newValueString == '20') {
      document.getElementById('sfgate_comments_per_page').value = newValueString;
    }
    sfgate_setCommentsPerPageCookie(document.getElementById('sfgate_comments_per_page').value);
    sfgate_presetCommentsPerPageLinks();

    refreshCommentVariables();
    window.location = sfgate_success_page+'&o=1';

    return false;
  }

  function sfgate_setCommentsPerPageCookie(withValue) {
    if(withValue == '10' || withValue == '20') {
      var nextyear = new Date();
        nextyear.setDate(nextyear.getDate() + 365);
        document.cookie = 'comments_per_pg=' + escape( withValue ) +
                  '; expires=' + nextyear.toUTCString() +
                  '; path=/' +
                  '; domain=.sfgate.com';
      document.getElementById('sfgate_comments_per_page').value = withValue;
    }
  }

  function sfgate_presetCommentsPerPageLinks() {
    var ccpp_cookie_text = document.cookie.indexOf('comments_per_pg');
    var defaultCPPValue  = '10';
    if (ccpp_cookie_text == -1) {
      sfgate_setCommentsPerPageCookie(defaultCPPValue);
    }
    cpp_value = document.cookie.substr(ccpp_cookie_text + 16);
    ccpp_terminatingCharIndex = cpp_value.indexOf(';');
    if(ccpp_terminatingCharIndex >= 0) {
      cpp_value = cpp_value.split(';')[0];
    }
    try {
      if(cpp_value == '20') {
        document.getElementById('cpp_10_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_commentsPerPageSet(\'10\')">10</a>';
        document.getElementById('cpp_20_span').innerHTML = '<span style="font-weight: bold;">20</span>';
      } else {
        cpp_value = '10';
        document.getElementById('cpp_20_span').innerHTML = '<a href="javascript:void(0);" onclick="return sfgate_commentsPerPageSet(\'20\')">20</a>';
        document.getElementById('cpp_10_span').innerHTML = '<span style="font-weight: bold;">10</span>';
      }
      sfgate_cppg_count = cpp_value;
    } catch (e) {}
  }



  function sfgate_LoadArticle() {
  // if Pluck didn't return requesttypes.js (i.e. in maintenance mode), we can't display comments
    if(!sfgate_articleKey)
      return;
    sfgate_comments_bodyonload();
    sfgate_page='1';
    sfgate_comment_sort='RecommendationsDescending';
    var requestBatch = new RequestBatch();
    requestBatch.AddToRequest(new UpdateArticleAction(sfgate_articleKey, sfgate_full_filepath, sfgate_title, new Section(sfgate_section), sfgate_categories));
    requestBatch.AddToRequest(sfgate_articleKey);
    requestBatch.AddToRequest(new CommentPage(new ArticleKey(sfgate_file), 10, 1, 'RecommendationsDescending'));
    requestBatch.BeginRequest(sfgate_serverUrl, function (responseBatch) {
      for (var i = 0; responseBatch.Responses.length > i; ++i) {
        if (responseBatch.Responses[i].CommentPage != null) {
          sfgate_HandleRecommendedComments(responseBatch.Responses[i].CommentPage);
        } else if(responseBatch.Responses[i].Article != null) {
          sfgate_ShowArticleComments(responseBatch.Responses[i].Article);
        }
      }
    });
  }

  function sfgate_GetCommentsPage(pagenum) {

    sfgate_comments_bodyonload();
    refreshCommentVariables();
    //  Retrofit for multiple Pluck page reqests per CGI page
    if (pagenum) { sfgate_page = pagenum; } else { sfgate_CgiPageNum(); } // sfgate_page now contains the current CGI page num to display
    var pluck_page_offset      = ( (sfgate_page - 1) * sfgate_pluck_pages_per ) + 1;
    var pluckPageNumsArray	= Array(); // contains the Pluck page numbers of all Pluck pages to be requested for this CGI page
    for (i=0; i<sfgate_pluck_pages_per; i++) {
      pluckPageNumsArray[i] = parseInt(pluck_page_offset) + i;
    }

    //  Instead of one RequestBatch, we will use an array (one element for each Pluck comment batch of 10)
    clearDisplayedComments(); // clear all previous comments

    var requestBatchArray = Array();
    for (i=0; i < pluckPageNumsArray.length; i++) {
      requestBatchArray[i] = new RequestBatch();
      requestBatchArray[i].AddToRequest(sfgate_userKey);
      requestBatchArray[i].AddToRequest(new CommentPage(sfgate_articleKey, 10, pluckPageNumsArray[i], sfgate_comment_sort));
      requestBatchArray[i].BeginRequest(sfgate_serverUrl, function (responseBatch) {
        for (var j = 0; responseBatch.Responses.length > j; ++j) {
          if (responseBatch.Responses[j].CommentPage != null) {
            sfgate_HandleCommentsPage(responseBatch.Responses[j].CommentPage);
          }
        }
      });
    }
  }

  
  function sfgate_ShowArticleComments(sfgate_article) {
    var sfgate_comment_question = '';
    var sfgate_commentCnt = 0;
    if (sfgate_article != null) {
      var sfgate_commentCnt = sfgate_article.Comments.NumberOfComments
    }
    if (sfgate_commentCnt > 0) {
      sfgate_topCnt.innerHTML    = '('+sfgate_commentCnt+')';
      sfgate_bottomCnt.innerHTML = '('+sfgate_commentCnt+')';
      if (sfgate_custom_label) {
        sfgate_comment_question = sfgate_custom_label;
      } else {
        sfgate_comment_question = sfgate_comment_label2;
      }
      if (!sfgate_isActive) {
        sfgate_comment_question += sfgate_comment_append2;
      }
      sfgate_mostRecCnt.innerHTML = sfgate_commentCnt;
    } else {
      sfgate_topCnt.innerHTML    = '(0)';
      sfgate_bottomCnt.innerHTML = '(0)';
      if (sfgate_custom_label) { 
        sfgate_comment_question = sfgate_custom_label;
        if (sfgate_isActive) {
          sfgate_comment_question += sfgate_comment_append1;
        } else {
          sfgate_comment_question += sfgate_comment_append2;
        }
      } else {
        if (sfgate_isActive) {
          sfgate_comment_question = sfgate_comment_label1;
        } else {
          sfgate_comment_question = 'Comments are closed.';
        }
      }
    }
    sfgate_question.innerHTML = sfgate_comment_question;
    if (sfgate_isActive) { sfgate_addlink_elm.innerHTML  = sfgate_addlink; }
    sfgate_viewlink_elm.innerHTML = sfgate_viewlink;
  }

  function historyFunc(f) {
    document.getElementByID('hFrame').innerHTML = "f";
  }


  function sfgate_clean_html(s) {
    var re = /<[^>]*>/g;
    if ( re.test(s) ) {
        s = s.replace(re,'');
        s = '[html markup was removed from this comment] '+s;
    }
    return s;
  }

  function sfgate_SubmitComments(form) {
    // comment out the next two lines to test comment submission without user key checking
    if (!sfgate_un()) {sfgate_reports_elm1.innerHTML = 'Your session has expired! Please login.'; sfgate_reports_elm2.innerHTML = ''; sfgate_disableForm(); return false; }
    if (sfgate_user != sfgate_un()) { if (sfgate_RenewUserKey()) {} else {return false;} }

    var requestBatch = new RequestBatch();
    requestBatch.AddToRequest(sfgate_userKey);
    
    requestBatch.AddToRequest(new CommentAction(sfgate_articleKey, '/cgi-bin/article.cgi?f='+sfgate_file, sfgate_page_title, rmdupnls(form.comment.value)));
var soval = sfgate_getSortOrderVal();
if (soval == 'RecommendationsDescending') {sfgate_comment_sort = 'TimeStampDescending'}
    requestBatch.AddToRequest(new CommentPage(sfgate_articleKey, 1, sfgate_rowsPerPage, sfgate_comment_sort));
    requestBatch.BeginRequest(sfgate_serverUrl, sfgate_HandleSubmitComments);
//try { console.log(requestBatch); } catch(err) {}
    return false;
  }

  function updateRecommendationAndAbuseDisplay(withComment) {
    if(withComment && withComment.CommentBody) {
      var thisCommentKeyObj = withComment.CommentKey;
      var thisCommentKeyStr = thisCommentKeyObj.Key;
      var theRecommendationThumbImgDiv  = document.getElementById('RecommendationThumbImg:'+thisCommentKeyStr);
      var theRecommendationLabelDiv  = document.getElementById('RecommendationLabel:'+thisCommentKeyStr);
      var theRecommendationCountSpan    = document.getElementById('RecommendationCount:'+thisCommentKeyStr);
      var theAbuseLink                  = document.getElementById('AbuseLink:'+thisCommentKeyStr);
      if(theRecommendationThumbImgDiv) {
//alert('about to insert tags: '+thisCommentKeyStr);
//alert('withComment.CurrentUserHasRecommended: '+withComment.CurrentUserHasRecommended);
        if(withComment.CurrentUserHasRecommended == "True") {
//          var disdiv = document.createElement('div');
//          disdiv.id = 'RecommendationThumbImg:'+thisCommentKeyStr;
//          disdiv.className = 'recommend';
          var disldiv = document.createElement('div');
          disldiv.id = 'RecommendationLabel:'+thisCommentKeyStr;
          disldiv.className = 'recommendlabel recommended checked';
//alert('1');
          disldiv.innerHTML = '(<span id="RecommendationCount:'+thisCommentKeyStr+'">'+withComment.NumberOfRecommendations+'</span>)';
//alert('2');
//          theRecommendationThumbImgDiv.parentNode.insertBefore(disdiv, theRecommendationThumbImgDiv);
          theRecommendationThumbImgDiv.parentNode.removeChild(theRecommendationThumbImgDiv);
          theRecommendationLabelDiv.parentNode.insertBefore(disldiv, theRecommendationLabelDiv);
          theRecommendationLabelDiv.parentNode.removeChild(theRecommendationLabelDiv);
        } else {
          theRecommendationThumbImgDiv.className = 'recommend';
        }
      } else {
//        alert("Could not find id: " + 'RecommendationThumbImg:'+thisCommentKeyStr);
      }

      if(theRecommendationCountSpan) {
        theRecommendationCountSpan.innerHTML = withComment.NumberOfRecommendations;
      } else {}

      if(theAbuseLink) {
        if(withComment.CurrentUserHasReportedAbuse == "True") { // has the logged in user reported abuse on this comment?
          theAbuseLink.innerHTML = '[Reported]';
        } else {
          theAbuseLink.innerHTML = '[Report Abuse]';
        }
      } else {}
    }
  }

  function sfgate_HandleSubmitRecommendation(responseBatch) {
    for (var i = 0; i < responseBatch.Responses.length; i++) {
      if(responseBatch.Responses[i].CommentPage) {
        for(var j = 0; j < responseBatch.Responses[i].CommentPage.Comments.length; j++) {
          var thisComment = responseBatch.Responses[i].CommentPage.Comments[j];
          if(thisComment) {
            updateRecommendationAndAbuseDisplay(thisComment);
          }
        }
      }
    }
  }

  function sfgate_SubmitRecommendation(key, sl_commentPage) {
    var Apache = new sfgate_ck('Apache');
    if ( ! Apache.defined ) {
        alert('Use of the Recommend feature requires you to accept cookies. Thanks.');
        return false;
    }
    if (sfgate_un() && sfgate_user != sfgate_un()) { if (sfgate_RenewUserKey()) {} else {return false;} }
    var requestBatch = new RequestBatch();
    requestBatch.AddToRequest(sfgate_userKey);
    requestBatch.AddToRequest(new RecommendAction(new CommentKey(key)));
// need to fix the following line: 'sfgate_page' is always in blocks of 10, not in 10/20 variable
    requestBatch.AddToRequest(new CommentPage(sfgate_articleKey, sfgate_rowsPerPage, sl_commentPage, sfgate_comment_sort));
    requestBatch.BeginRequest(sfgate_serverUrl, sfgate_HandleSubmitRecommendation);
  }

  function updateDisapprovalDisplay(withArticle) {
    if(withArticle && withArticle.ArticleKey && withArticle.ArticleKey.Key) {
      var thisArticleKeyObj = withArticle.ArticleKey;
      var thisArticleKeyStr = withArticle.ArticleKey.Key;
      var theDisapprovalThumbImgDiv  = document.getElementById('DisapprovalThumbImg:'+thisArticleKeyStr);
      var theDisapprovalLabelDiv     = document.getElementById('DisapprovalLabel:'+thisArticleKeyStr);
      var theDisapprovalCountSpan    = document.getElementById('DisapprovalCount:'+thisArticleKeyStr);
//      if(theDisapprovalThumbImgDiv && sfgate_userKey.UserKey.Key && (withArticle.Ratings.CurrentUserRating != '0')) {
      if(theDisapprovalThumbImgDiv && (withArticle.Ratings.CurrentUserRating != '0')) {
//        var disdiv = document.createElement('div');
//        disdiv.id = 'DisapprovalThumbImg:'+thisArticleKeyStr;
//        disdiv.className = 'disapprove';
        var disldiv = document.createElement('div');
        disldiv.id = 'DisapprovalLabel:'+thisArticleKeyStr;
        disldiv.className = 'disapprovelabel disapproved checked';
        disldiv.innerHTML = '(<span id="DisapprovalCount:'+thisArticleKeyStr+'">'+withArticle.Ratings.NumberOfRatings+'</span>)';
//        theDisapprovalThumbImgDiv.parentNode.insertBefore(disdiv, theDisapprovalThumbImgDiv);
        theDisapprovalThumbImgDiv.parentNode.removeChild(theDisapprovalThumbImgDiv);
        theDisapprovalLabelDiv.parentNode.insertBefore(disldiv, theDisapprovalLabelDiv);
        theDisapprovalLabelDiv.parentNode.removeChild(theDisapprovalLabelDiv);
      }
      if(theDisapprovalCountSpan) {
        theDisapprovalCountSpan.innerHTML = withArticle.Ratings.NumberOfRatings;
      }
    }
  }

  function sfgate_handleSubmitDisapproval(responseBatch) {
    for (var i = 0; i < responseBatch.Responses.length; i++) {
      if(responseBatch.Responses[i].Article) {
        if(responseBatch.Responses[i].Article.ArticleKey && responseBatch.Responses[i].Article.ArticleKey.Key) {
          if(responseBatch.Responses[i].Article.ArticleKey.Key.substr(0, 26) == 'CommentArticle:CommentKey:')
            updateDisapprovalDisplay(responseBatch.Responses[i].Article);
        }
      }
    }
  }

  function sfgate_SubmitDisapproval(forCommentWithKey) {
    var Apache = new sfgate_ck('Apache');
    if ( ! Apache.defined ) {
        alert('Use of the Recommend feature requires you to accept cookies. Thanks.');
        return false;
    }
    if (sfgate_un() && sfgate_user != sfgate_un()) { if (sfgate_RenewUserKey()) {} else {return false;} }
    var requestBatch = new RequestBatch();
    requestBatch.AddToRequest(sfgate_userKey);
    var fakeArticle_ArticleKey = new ArticleKey("CommentArticle:" + forCommentWithKey);
    requestBatch.AddToRequest(new UpdateArticleAction(fakeArticle_ArticleKey, '', '', null, null));
    requestBatch.AddToRequest(new RateAction(fakeArticle_ArticleKey, 1));
    requestBatch.AddToRequest(fakeArticle_ArticleKey);

//    requestBatch.AddToRequest(new CommentPage(sfgate_articleKey, sfgate_rowsPerPage, sfgate_page, sfgate_comment_sort));
//    requestBatch.BeginRequest(sfgate_serverUrl, sfgate_HandleComments);

    requestBatch.BeginRequest(sfgate_serverUrl, sfgate_handleSubmitDisapproval);
  }

  function sfgate_handleRequestDisapprovals(responseBatch) {
    for (var i = 0; i < responseBatch.Responses.length; i++) {
      if(responseBatch.Responses[i].Article) {
        if(responseBatch.Responses[i].Article.ArticleKey && responseBatch.Responses[i].Article.ArticleKey.Key) {
          updateDisapprovalDisplay(responseBatch.Responses[i].Article);
        }
      }
    }
  }

  // function called from a responseHandler to request one disapproval article (fake article tied to a comment) for each comment 
  function sfgate_requestDisapprovals(commentpage) {
//    if(responseBatch.Responses.length > 0) {
      var numberOfArticlesAdded = 0;
      var requestBatch = new RequestBatch();
      requestBatch.AddToRequest(sfgate_userKey);
//      for(var i = 0; i < responseBatch.Responses.length; i++) {
//        if(responseBatch.Responses[i].Comment) {
//          requestBatch.AddToRequest(new Article(new ArticleKey('CommentArticle:'+responseBatch.Responses[i].Comment.CommentKey.Key)));
//          numberOfArticlesAdded++;
//        }  else if(responseBatch.Responses[i].CommentPage) {
            for(var j = 0; j < commentpage.Comments.length; j++) {
              requestBatch.AddToRequest(new ArticleKey('CommentArticle:'+commentpage.Comments[j].CommentKey.Key));
              numberOfArticlesAdded++;
            }
//        }
//      }
      if(numberOfArticlesAdded > 0)
        requestBatch.BeginRequest(sfgate_serverUrl, sfgate_handleRequestDisapprovals);
//    }
  }

  function sfgate_handleSubmitAbuse(responseBatch) {
    for (var i = 0; i < responseBatch.Responses.length; i++) {
      if(responseBatch.Responses[i].CommentPage) {
        for(var j = 0; j < responseBatch.Responses[i].CommentPage.Comments.length; j++) {
          var thisComment = responseBatch.Responses[i].CommentPage.Comments[j];
          if(thisComment) {
            updateRecommendationAndAbuseDisplay(thisComment);
          }
        }
      }
    }
  }

  function sfgate_SubmitReportAbuse(form) {
    if (sfgate_un() && sfgate_user != sfgate_un()) { if (sfgate_RenewUserKey()) {} else {return false;} }
    sfgate_HideDiv("ReportAbuse_Menu");
    var requestBatch = new RequestBatch();
    requestBatch.AddToRequest(sfgate_userKey);
    requestBatch.AddToRequest(new ReportAbuseAction(new CommentKey(form.key.value), form.reason[form.reason.selectedIndex].value, form.comment.value));

// need to fix the following line: 'sfgate_page' is hard-coded in blocks of 10, not in 10/20 variable
    requestBatch.AddToRequest(new CommentPage(sfgate_articleKey, sfgate_rowsPerPage, sfgate_page, sfgate_comment_sort));
    requestBatch.BeginRequest(sfgate_serverUrl, sfgate_handleSubmitAbuse);

    form.key.value = '';
    form.reason.selectedIndex = 0;
    form.comment.value = '';
  }

  function sfgate_HandleCommentsPage (commentpage) { 
    var sfgate_start_page = ( (sfgate_page - 1) * sfgate_pluck_pages_per ) + 1;
    batchNum = (commentpage.OnPage - sfgate_start_page) + 1;
    if(batchNum == 1) {
      sfgate_DrawPagination(commentpage);
      sfgate_DrawCommentsHeader(commentpage);
    }
    sfgate_DrawComments(commentpage, batchNum);
    sfgate_requestDisapprovals(commentpage);
  }

  function sfgate_HandleSubmitComments(responseBatch) {
    var re = /^.*\(for example: (.+)\).*$/;
    for(var i = 0; i < responseBatch.Messages.length; i++) {
      if (responseBatch.Messages[i].Message.match(re)) {
        var bwords = RegExp.$1;
        if((bwords) && bwords != '') {
          var form_header_bad_words = 'Your submission included words not permitted by our language filter (for example: '+bwords+'). Please avoid use of inappropriate language on our site in the future. Thanks.';
         sfgate_form_verbiage.innerHTML = '<h4>Add Your Comment</h4><h4 class="error">Comment Not Posted</h4><p class="error">'+form_header_bad_words+'</p>';
          return false;
        }
      }
    }

    // if we reach this point, there is no "bad word" error in the response message array.

    var re = /^.*(rapid posting).*$/;
    for(var i = 0; i < responseBatch.Messages.length; i++) {
      if (responseBatch.Messages[i].Message.match(re)) {
        var rpost = RegExp.$1;
        if((rpost) && rpost != '') {
          var form_header_bad_words = 'We restrict rapid posting of comments to prevent spam. You already have posted a comment within the last several seconds. Please try again later.';
          sfgate_form_verbiage.innerHTML = '<h4>Add Your Comment</h4><h4 class="error">Comment Not Posted</h4><p class="error">'+form_header_bad_words+'</p>';
          return false;
        }
      }
    }

    // if we reach this point, there is no "rapid posting" error in the response message array.

    // the following line is assumed to work, depending on message/response permutations received from Pluck
    // We will get a false-negative if the 'ok' message is not in the 0th element of the Message Array
    // Assuming Pluck returns messages in the order in which the RequestBatch calls were made
    // i.e. First Message element corresponds to the first RequestBatch call with a message to return
    if(responseBatch.Messages[0].Message != 'okay' && responseBatch.Messages[0].Message != 'ok') {
      var appendedMessages      = '<span style="font-style: italic; background-color: #D0D0D0;">';

      for(var i = 0; i < responseBatch.Messages.length; i++) {
        appendedMessages += '<font style="font-weight: bold;">[' + i + ']</font> ' + responseBatch.Messages[i].Message + '<br />';
      }
      appendedMessages += '</span>';

      var form_header_error_verbiage = 'Apologies for the inconvenience but we are unable to submit this comment due to a technical system glitch. We are actively working to correct this issue. Thanks for your patience.' + 'Your submission was not processed due to an error. <br />' + appendedMessages;
      sfgate_form_verbiage.innerHTML = '<h4>Add Your Comment</h4><h4 class="error">Comment Not Posted</h4><p class="error">'+form_header_error_verbiage+'</p>';
      return false;
    }
    
    var soval = sfgate_getSortOrderVal();
    if (soval == 'RecommendationsDescending') {sfgate_setSortOrderCookie('TimeStampDescending'); sfgate_presetSortOrderLinks();}
    var gotopage = 1;
    if(sfgate_comment_sort == 'TimeStampAscending' /*&& responseBatch.Responses[1].CommentPage.NumberOfComments > sfgate_rowsPerPage*/) {
      FBgotopage = gotopage = Math.ceil(responseBatch.Responses[1].CommentPage.NumberOfComments / sfgate_cppg_count);
    }

    var fb_check = document.getElementById("facebook_connect_checkbox").checked;
    if(fb_check && slFB.connectEnabled()){
      //Send it to facebook now
      var sfgate_comment_value = document.getElementById('sfgate_comment_input').value;
      slFB.submitArticleComment(sfgate_page_title, sfgate_full_filepath, sfgate_article_paratext, rmdupnls(sfgate_comment_value), sfgate_article_thumbs, handleFacebookCallback);
    } else {
      window.location = sfgate_success_page+'&o='+gotopage;
    }
    return false;
  }

  var FBgotopage = 1;
  function handleFacebookCallback() {
    window.location = sfgate_success_page+'&o='+FBgotopage;
  }

  function sfgate_RenewUserKey() {
    if (confirm('You are logged in as '+sfgate_un()+' not '+sfgate_user+'. Is this OK?')) {
      sfgate_user    = sfgate_un();
      sfgate_userKey = new UserKey(sfgate_user);
      return true;
    }
    return false;
  }

  function sfgate_HandleRecommendedComments(commentpage) {
    var newcommentpage = new Array();
    var cnt = 1;
    var maxcnt = 3;
    for(var i = 0; i < commentpage.Comments.length; i++) {
      if (cnt > maxcnt) { break; }
      if (commentpage.Comments[i].NumberOfRecommendations < 1 || commentpage.Comments[i].Author.IsBlocked == 'True' || commentpage.Comments[i].ContentBlockingState == 'BlockedByAdmin') { continue; }
      newcommentpage.push(commentpage.Comments[i]);
      cnt++;
    }
    if (cnt > 1) {
      sfgate_mostRecComments.style.display = "block";
      sfgate_CommentsViewall.style.display = "block";
      commentpage.Comments = newcommentpage;
      sfgate_DrawComments(commentpage,1);
      sfgate_requestDisapprovals(commentpage);
    }
  }

function rmdupnls (text) {
    // first remove all tags.
    text = sfgate_clean_html(text);
    // Now we add brs where it makes sense.
    text = text.replace(/\r\n\r\n(\r\n)+/g,'<br /><br />');
    text = text.replace(/\r\n/g,'<br />');
    text = text.replace(/\n\n\n+/g,'<br /><br />');
    text = text.replace(/\n/g,'<br />');
    text = text.replace(/\r\r\r+/g,'<br /><br />');
    text = text.replace(/\r/g,'<br />');
    return text;
}

function sfgate_clean_html2(s) {
    // We want to keep brs (be we limit them to two in a row.
    var cmtlines = s.split('<br />');
    var cmt = '';
    var consecutivebrs = 0;
    for (var k = 0; cmtlines.length > k; k++) {
        if ( cmtlines[k].match(/^\s*$/) ) {
            consecutivebrs++;
        } else {
            consecutivebrs = 0;
        }
        if ( consecutivebrs >= 3) {
            continue;
        }
        // ok, not a blank line, we clean other tags, then add a br
        cmt += sfgate_clean_html(cmtlines[k])+( (k == (cmtlines.length - 1)) ? '' : '<br />');
    }
    return cmt;
}    

  function sfgate_HandleResponseMessages(responseBatch) {
    for (var i=0; i < responseBatch.Messages.length; i++) {
      sfgate_appendError('MessageTime:' + responseBatch.Messages[i].MessageTime);
      sfgate_appendError('Message ' + i + ':' + responseBatch.Messages[i].Message);
    }
    sfgate_printErrors();
  }
  
  function sfgate_DrawComments(commentpage, pageNum) {
    if (commentpage != null) {
      var comments_page_output         = '';
      if(pageNum == "1" && commentpage.Comments.length < 1) {
        sfgate_response_elm[0].innerHTML   = '<div style="padding: 10px; font-family: Verdana,sans-serif; font-size: 0.86em; line-height: 16px;">No comments\
 yet.</div>';
      } else {
        for(var i = 0; i < commentpage.Comments.length; i++) {
          comments_page_output += sfgate_AddCommentRow(commentpage.Comments[i], i, commentpage.OnPage);
        }
 
        if(parseInt(pageNum) >= 1 && parseInt(pageNum) <= 8) {
          sfgate_response_elm[(parseInt(pageNum) - 1)].innerHTML   += comments_page_output;
        } else {
          sfgate_response_elm[0].innerHTML   += comments_page_output;
        }
      }
    } else {
//      alert("No CommentPage in response");
      if(pageNum == 1)
        sfgate_response_elm[0].innerHTML   = '<div style="padding: 10px; font-family: Verdana,sans-serif; font-size: 0.86em; line-height: 16px;">No comment\
s.</div>';
    }
  }

  function sfgate_AddCommentRow(comment, index, fromCommentPage) {
    var comment_output = '';
    var item_odd = '';
    if (index % 2 == 0) { item_odd = ' odd'; }
    comment_output = '<div id="commentDisplayRow:'+comment.CommentKey.Key+'" class="item '+item_odd+'">';
    if(comment.Author.IsBlocked == 'True' && sfgate_user != comment.Author.DisplayName) {
      comment_output += '<h4>This comment was left by a user who has been blocked by an SFGate editor.</h4>';
//    } else if(comment.ContentBlockingState == 'BlockedByAdmin') {
//      comment_output += '<h4>This comment has been blocked by an SFGate editor.</h4>';
    } else {
      thisPhotoAvatarUrl = (comment.ContentBlockingState == 'BlockedByAdmin' ? 'http://contribute.sfgate.com/ver1.0/Content/images/no-user-image.gif' : comment.Author.AvatarPhotoUrl);

      comment_output += '<table cellpadding="0" cellspacing="0" style="width: 100%;"><tr><td style="width: 70px;">';
      comment_output += '<img alt="" title="" src="' + thisPhotoAvatarUrl + '" style="float: left; margin: 0px 10px 0px 0px; border: 1px solid #000000;" />';
      comment_output += '</td><td>';

      if(comment.ContentBlockingState == 'BlockedByAdmin')
        comment_output += '<h4 style="float: left;">username withheld</h4>';
      else
        comment_output += '<h4 style="float: left;"><a href="/cgi-bin/contribute/sn/persona?User=' + comment.Author.DisplayName + '">' + comment.Author.DisplayName + '</a></h4>';

      comment_output += '<span class="details" style="display: inline; width: auto; float: left; margin-left: 8px;">' + comment.PostedAtTime + '</span>';
      comment_output += '<br style="clear: both;" />';

      if(comment.ContentBlockingState == 'BlockedByAdmin') {
       comment_output += '<p>This comment violated SFGate\'s Terms and Conditions, and has been removed.</p>';
      } else {
        comment_output += '<p>' + sfgate_clean_html2(comment.CommentBody) + '</p>';
        comment_output += '<br style="clear: both; height: 6px; line-height: 6px;" />';
        var recommended = '';
        comment_output += '<span class="recommendlinelabel">Recommend: &nbsp; &nbsp;</span>';
        if (comment.CurrentUserHasRecommended == 'True') { 
          comment_output += '<div class="recommendlabel recommended checked" id="RecommendationLabel:'+comment.CommentKey.Key+'">\n';
          comment_output += '(<span id="RecommendationCount:'+comment.CommentKey.Key+'">'+comment.NumberOfRecommendations+'</span>)\n';
          comment_output += '</div>\n';
        } else {
          comment_output += '<a class="recommend" id="RecommendationThumbImg:'+comment.CommentKey.Key+'" href="#" onclick="javascript:sfgate_SubmitRecommendation(\''+comment.CommentKey.Key+'\', '+fromCommentPage+'); return false;"></a>';
          comment_output += '<a class="recommendlabel" href="#" id="RecommendationLabel:'+comment.CommentKey.Key+'" onclick="javascript:sfgate_SubmitRecommendation(\''+comment.CommentKey.Key+'\', '+fromCommentPage+'); return false;" alt="'+comment.CommentKey.Key+'">';
          comment_output += '(<span id="RecommendationCount:'+comment.CommentKey.Key+'">'+comment.NumberOfRecommendations+'</span>)';
          comment_output += '</a>';
        }
        // display the disapproval thumb and label
        var disapproved = '';
//        if (comment.CurrentUserHasDisapproved == 'True') { disapproved = ' checked'; }
        comment_output += '<a class="disapprove'+disapproved+'" id="DisapprovalThumbImg:CommentArticle:'+comment.CommentKey.Key+'" href="#" onclick="javascript:sfgate_SubmitDisapproval(\''+comment.CommentKey.Key+'\'); return false;"></a>';
        comment_output += '<a class="disapprovelabel" href="#" id="DisapprovalLabel:CommentArticle:'+comment.CommentKey.Key+'" onclick="javascript:sfgate_SubmitDisapproval(\''+comment.CommentKey.Key+'\'); return false;">';
        comment_output += '(<span id="DisapprovalCount:CommentArticle:'+comment.CommentKey.Key+'">0</span>)';
        comment_output += '</a>';

        // display the abuse-reporting mechanism
        var reported = '';
        comment_output += '<span style="float: right;">';
        if (comment.CurrentUserHasReportedAbuse == 'True') { reported = ' checked'; }
        comment_output += '<a class="'+reported+'" href="#" onclick="javascript:sfgate_ShowReportAbuse(event,\''+comment.CommentKey.Key+'\'); return false;" /></a><a class="reportabuselabel" id="AbuseLink:'+comment.CommentKey.Key+'" href="#" onclick="javascript:sfgate_ShowReportAbuse(event,\''+comment.CommentKey.Key+'\'); return false;">';
        if (comment.CurrentUserHasReportedAbuse == 'True') { comment_output += '[Reported]'; } else { comment_output += '[Report Abuse]'; }
        comment_output += '</a>';
        comment_output += '</span>';
      }
      comment_output += '</td></tr></table>';
    }
    comment_output += '<div class="clear"></div></div><!--/.item -->';
    return comment_output;
  }

  function sfgate_DrawCommentsHeader(commentpage) {
    var sfgate_commentCnt = 0;
    if (commentpage != null) {
      var sfgate_commentCnt = commentpage.NumberOfComments;
    }
    if (sfgate_commentCnt > 0) {
      sfgate_topCnt.innerHTML = '('+sfgate_commentCnt+')';
    } else {
      sfgate_topCnt.innerHTML = '(0)';
    }
  }

  function sfgate_DrawPagination(commentpage) {
    if (commentpage != null) {
      var pagination                   = 'View Page: ';
      var comment_total                = commentpage.NumberOfComments;
      var pagenum                      = 1;
      var current_comments_per_page    = sfgate_cppg_count;

      //  BEGIN PAGINATION CALCULATION CODE -- by David Wortham; 07 Dec 2007
      var preferredPaginationPageSize  = 10;                                    // maximum number of pagination links to be displayed per CGI page
      var currentPaginationPage        = Math.floor(commentpage.OnPage / sfgate_pluck_pages_per);                    // uses the number of Pluck comments per page
      var totalPaginationPages         = Math.ceil(commentpage.NumberOfComments / current_comments_per_page);
      var lowestPaginationPage         = 1;                                     // Leftmost page number in the pagination links
      var highestPaginationPage        = totalPaginationPages;                  // Rightmost page number in the pagination links

      if(currentPaginationPage <= 4) { // display the first (up to 10) page numbers
        lowestPaginationPage           = 1;
        highestPaginationPage          = Math.min(preferredPaginationPageSize, totalPaginationPages);
      } else if(totalPaginationPages - currentPaginationPage <= 6) { // display the last (up to 10) page numbers
        highestPaginationPage          = totalPaginationPages;
        lowestPaginationPage           = Math.max(highestPaginationPage - preferredPaginationPageSize, 1);
      } else { // display up to 3 page numbers before and up to 6 after
        lowestPaginationPage           =  Math.max(1, currentPaginationPage - 3);
        highestPaginationPage          = Math.min(totalPaginationPages, currentPaginationPage + 6);
      }
      pagenum = lowestPaginationPage
      //  END PAGINATION CALCULATION CODE

      // Handle the "prev" link
      if(commentpage.OnPage > 1) {
        pagination += '<a href="?f='+sfgate_file+'&o='+(parseInt(pagenum)-1)+'">&laquo;&nbsp;Prev</a> ';
      } else {
//        pagination += '&laquo;&nbsp;Prev ';
      }

      // create HTML for numbered pagination links
      do {
        if(pagenum == sfgate_page) {
          pagination += '<strong>'+pagenum+'</strong>';
        } else {
          pagination += '<a href="?f='+sfgate_file+'&o='+pagenum+'">'+pagenum+'</a>';
        }
        pagenum = pagenum+1;
        comment_total = comment_total - commentpage.NumberPerPage;
      } while (pagenum <= highestPaginationPage);

      // Handle the "next" link
      if(commentpage.OnPage < Math.ceil( commentpage.NumberOfComments / commentpage.NumberPerPage / sfgate_pluck_pages_per ) ) {
        pagination += ' <a href="?f='+sfgate_file+'&o='+(parseInt(sfgate_page)+1)+'">Next&nbsp;&raquo;</a>';
      } else {
//        pagination += ' Next&nbsp;&raquo;';
      }

      sfgate_pagination_elm.innerHTML = pagination;
    } else {
      try { console.log("No CommentPage in response."); } catch(err) { }
    }
  }

  var sfgate_ResponseErrors = new Array(); // array used to collect respons errors/messages

  function sfgate_appendError(errorMessage) {
    if(!sfgate_useErrors) {return;}
    sfgate_ResponseErrors.push(errorMessage);
  }

  function sfgate_printErrors() {
    if(!sfgate_useErrors) {return;}
    var sfgate_collectedErrors = 'RESPONSE ERRORS/MESSAGES:';
    for (var i=0; i < sfgate_ResponseErrors.length; i++) {
      sfgate_collectedErrors += '<br />'+sfgate_ResponseErrors[i];
    }
    sfgate_errors_elm.innerHTML = sfgate_collectedErrors;
    sfgate_ResponseErrors = new Array();
  }

  function sfgate_enableForm() {
    sfgate_comment_input.disabled = false;
    sfgate_submit_button.disabled = false;
    sfgate_form_verbiage.innerHTML = form_header;
    sfgate_counter_input.style.visibility = 'visible';
  }

  function sfgate_disableForm() {
    sfgate_comment_input.disabled = true;
    sfgate_submit_button.disabled = true;
    sfgate_form_verbiage.innerHTML = loginorreg;
    sfgate_counter_input.style.visibility = 'hidden';
  }

  function sfgate_FBcbck (cb) {
    var sfgate_cbck = new sfgate_ck('sfgate_FBcbck');
    if (cb.checked) {
      sfgate_cbck.set_days(3650,'1');
    } else {
      sfgate_cbck.set_days(3650,'');
    }
  }

  
  function sfgate_setFormState() {
    var sfgate_cbck = new sfgate_ck('sfgate_FBcbck');
    if(sfgate_un()) {
      sfgate_enableForm()
      // Check if current user is facebook user, show "submit to facebook" checkbox if he is
      slFB.init(
        function() {
            if (sfgate_cbck.val == '1') {
              document.getElementById("facebook_connect_checkbox").checked = true;
            }
            document.getElementById("facebook_connect_option").style.display = "block";
        }
      );
    } else {
      sfgate_disableForm()
    }
  }

  function sfgate_CgiPageNum() {
//    var qs = window.location.search;
//    qs = qs.substring(1, qs.length);
    var qs = window.location.search.substring(1, window.location.search.length);
    if (qs.length > 1) {
      var qarray = qs.split("&");
      var re = /^o=(\d+)$/;
      for(var i=0; i < qarray.length; i++) {
        if (qarray[i].match(re)) {
          sfgate_page = RegExp.$1;
          return;
        }
      }
      sfgate_page = 1;
    }
  }

  function sfgate_mouseX(evt) {
    if (evt.pageX) {
      return evt.pageX;
    } else if (evt.clientX) {
      return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    } else {
      return null;
    }
  }

  function sfgate_mouseY(evt) {
    if (evt.pageY) {
      return evt.pageY;
    } else if (evt.clientY) {
      return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    } else {
      return null;
    }
  }

  function sfgate_HideDiv(id){
    document.getElementById(id).style.display = "none";
  }

  function sfgate_ShowDivAtMouse(evt, id) {
    posx = sfgate_mouseX(evt);// - 170;
    posy = sfgate_mouseY(evt);
    //normalize to make sure we at least appear on the screen
    if(posx < 0) posx = 10;
    if(posy < 0) posy = 10;
    document.getElementById(id).style.left = posx + "px";
    document.getElementById(id).style.top = posy + "px";
    document.getElementById(id).style.display = "block";
  }

  function sfgate_ShowReportAbuse(evt, key) {
    document.getElementById("ReportAbuse_CommentKey").value = key;
    sfgate_ShowDivAtMouse(evt, "ReportAbuse_Menu");
  }
