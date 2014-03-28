var LI = (function(LI) {
    return LI;
})({});
(function(LI) {
    var ajax = {};
    LI.MYAJAX = ajax;
    var httpRequest;

    LI.MYAJAX.makeRequest = function (url, action) {
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } 
            catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } 
                catch (e) {}
          }
        }

        if (!httpRequest) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = action;
        httpRequest.open('GET', url);
        httpRequest.send();
    }

    LI.MYAJAX.alertContents = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var response = JSON.parse(httpRequest.responseText);
                console.log(response);
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }
    
})(LI)
   LI.MYAJAX.makeRequest('cheese.json', LI.MYAJAX.alertContents);