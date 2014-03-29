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
        var output = "";
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var responses = JSON.parse(httpRequest.responseText);
                for(i=0;responses.cheeses.length;i++){
                    output =+ "<li><ul class='cheese-profile plain-list'>"+
                              "<li><div class='cheese-image'>"+responses.cheeses[i]["image"]+"</div></li>"+
                              "<li><div class='cheese-info'><p class='cheese-name'>"+responses.cheeses[i]["title"]+"</p>"+
                              "<p>"+responses.cheeses[i]["location"]+"</p><a href='javascript:void(0);''>Add Cheese</a></div></li>"+
                              "<li><div class='cheese-actions'><a class='removecheese' href='javascript:void(0);'>x</a></div></li></ul></li>";
                }
                document.getElementById("suggestedCheese").innerHTML = output;
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }
    
})(LI)
   LI.MYAJAX.makeRequest('cheese.json', LI.MYAJAX.alertContents);