if (typeof(RequestBatch) === 'undefined') {
    RequestBatch = function() {
      this.initialize.apply(this, arguments);
    };
    // for unique id
    var counter = 0;

    // how many requests are still pending?
    var pendingRequests = 0;

    function DirectAccessErrorHandler(msg,ex){
    //alert(msg);
    }
    (function() {

        function buildJsonpUrl(serverUrl, jsonString, callbackName) {
            var separator = serverUrl.indexOf('?') == -1 ? "?" : "&";
            // use Jsonp endpoint instead of Process
            serverUrl = serverUrl.replace('/Process', '/Jsonp');
            return serverUrl + separator + "r=" + encodeURIComponent(jsonString) + '&cb=' + callbackName;
        }

        function useJsonp(serverUrl, jsonString, callbackName) {
            // use Jsonp endpoint instead of Process
            serverUrl = buildJsonpUrl(serverUrl, jsonString, callbackName);
            var isIE = /*@cc_on!@*/false;
            if ((isIE && serverUrl.length < 2083) || (!isIE && serverUrl.length < 4000)) {
                return serverUrl;
            }
            return false;
        }

        // the core object to request batches
        RequestBatch.prototype = {
            initialize: function() {
                this.UniqueId = counter++;
                this.Requests = new Array()
            },

            HasTemplate: function() {
                return typeof (this["Template"]) != "undefined";
            },

            AddToRequest: function(requestThis) {
                this.Requests[this.Requests.length] = requestThis;
            },

            BeginRequest: function(serverUrl, callback) {
                pendingRequests++;

                if (!RequestBatch.callbacks) {
                    RequestBatch.callbacks = {};
                }

                // the cc_on comment below is important.. if you remove it, it will change the processing of the script
                // see http://msdn.microsoft.com/en-us/library/8ka90k2e(VS.85).aspx for details of conditional compilation
                var jsonString = YAHOO.lang.JSON.stringify(this), ie = /*@cc_on!@*/false;
                if (ie && !RequestBatch.container) { // forcibly take this route only for ie
                    var body = document.body, div;
                    RequestBatch.container = div = body.insertBefore(document.createElement('div'), body.firstChild);
                    div.style.height = div.style.width = div.style.margin = div.style.padding = 0;
                    div.style.visibility = div.style.overflow = 'hidden';
                    div.style.display = 'none';
                }
                // generate our callback function that will call their callback function via closure semantics
                var daapiCallbackName = 'daapiCallback' + this.UniqueId;
                var thisRequest = this;
                if (jsonpServerUrl = useJsonp(serverUrl, jsonString, 'RequestBatch.callbacks.' + daapiCallbackName)) {
                    // insert script node with callback function = daapiCallbackName
                    var jsonpScriptNode = document.createElement('script');
                    jsonpScriptNode.type = "text/javascript";
                    jsonpScriptNode.src = jsonpServerUrl;
                    var headElem = document.getElementsByTagName('head')[0];
                    RequestBatch.callbacks[daapiCallbackName] = (function(userCallback, headElem, scriptNode) {
                        return function(responses) {
                            if (thisRequest.HasTemplate()) {
                                userCallback(responses);
                            } else {
                                // clean up after ourselves
                                userCallback(responses.ResponseBatch);
                                userCallback = headElem = scriptNode = null;
                            }
                        }
                    })(callback, headElem, jsonpScriptNode);
                    headElem.appendChild(jsonpScriptNode);
                }
                else {
                    var form = generateForm(this.UniqueId, serverUrl, jsonString);
                    new iframe(form, { onComplete: function(request) { processResponse(callback, request, thisRequest.HasTemplate()); } }, this.UniqueId);
                }
                // in case they reuse the requestbatch
                this.UniqueId = counter++;
            }
        };
    })();
}

function generateForm(formId, serverUrl, inputVal) {
    // create the form
	var form = document.createElement("form");
	form.acceptCharset = "UTF-8";
	form.name = "f" + formId;
	form.id = "f" + formId;
	form.action = serverUrl;

	// create the input element on the form
	var inputElem = document.createElement("input");
	inputElem.name = "jsonRequest";
	inputElem.type = "hidden";
	inputElem.value = inputVal;
	form.appendChild(inputElem);

	// Firefox has a behavior on refresh that displays a popup confirming that is it reloading a form.
	// We work around this by attempting to perform a get action if the size is below a threshold, else
	// we will run as a post
	form.method = "post";
    if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        var separator = serverUrl.indexOf('?') == -1 ? "?" : "&";
        var fullRequestURL = serverUrl + separator + "jsonRequest="+ escape(inputVal);
        if (fullRequestURL.length < 4000) {
            // we plan to perform a get, so we need to parse the sid out of the url and place it
            // inside the form
            var sidPos = serverUrl.indexOf('sid=');
            if (sidPos != -1) {
                var endPos = serverUrl.indexOf('&', sidPos);
                var sid = serverUrl.substring(sidPos + 'sid='.length, endPos == -1 ? serverUrl.length : endPos);
	            var sidInputElem = document.createElement("input");
	            sidInputElem.name = "sid";
	            sidInputElem.type = "hidden";
	            sidInputElem.value = sid;
	            form.appendChild(sidInputElem);
	            // remove the sid from the url
	            form.action = serverUrl.substring(0, sidPos-1);
            }
            form.method = "get";
        }
    }

	(RequestBatch.container || document.body).appendChild(form);
	return form;
}

function processResponse(callback, request, isTemplated)
{
    pendingRequests--;
    try {
        if (isTemplated) {
            callback(request.ResponseText);
        } else {
            var jsonResponse = unescape(request.responseText);
            jsonResponse = jsonResponse.replace(/\\\>/g, ">");
            var responseObject = YAHOO.lang.JSON.parse(jsonResponse);
            try {
                callback(responseObject.ResponseBatch);
            } catch (e) {
                DirectAccessErrorHandler("exception during client callback", e);
            }
        }
    } catch (e) {
        DirectAccessErrorHandler("exception during processResponse", e);
    }
}

function getPendingRequestCount()
{
    return pendingRequests;
}
