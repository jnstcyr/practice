var JNS = (function(JNS) {
    return JNS;
})({});
(function(JNS) {
    var ajax = {};
    JNS.MYCHEESE = ajax;
    var httpRequest;

    JNS.MYCHEESE.makeRequest = function (url, action) {
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

    JNS.MYCHEESE.buildCheeses = function () {
        var suggestedCheeseOutput = [];
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var responses = JSON.parse(httpRequest.responseText);
                for(i=0;i<responses.cheeses.length;i++){
                    var image = responses.cheeses[i]["image"],
                        link = responses.cheeses[i]['link'],
                        title = responses.cheeses[i]["title"],
                        id = responses.cheeses[i]["id"],
                        location = responses.cheeses[i]["location"],
                        description = responses.cheeses[i]["description"];

                    suggestedCheeseOutput.push("<li id='"+
                        id+"' class='clearfix'>"+
                        "<ul class='cheese-profile plain-list'>"+

                        "<li><a href='javascript:void(0);' class='cheese-image hover'><img src='"+
                        image+"'></a></li>"+
                        "<li><div class='cheese-info'><p>"+
                        "<a class='cheese-name hover' href='"+
                        link+"'>"+
                        title+"</a>, "+
                        location+
                        "</p><a href='javascript:void(0);''>Add Cheese</a></div></li>"+
                        "<li><div class='cheese-actions'>"+
                        
                        "<a data-id='"+id+"' href='javascript:void(0);' class='removecheese'>x</a></div></li></ul>"+
                        "<a href='"+
                        link+"' class='cheeseHover'><ul class='plain-list'>"+
                        "<li><div class='cheese-image'><img src='"+
                        image+"'></div></li>"+
                        "<li><div class='cheese-info'><div class='cheese-name'>"+
                        title+"</div><div class='cheese-location'>"+
                        location+"</div><div class='cheese-description'>"+
                        description+"</div></div></li></ul></a></li>");
                }
                JNS.MYCHEESE.diplayCheese(suggestedCheeseOutput);
                JNS.MYCHEESE.initCheeseEvents();
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }
    JNS.MYCHEESE.diplayCheese = function(cheeses){
        var suggestedCheese = document.getElementById('suggestedCheeses'),
            initCheese = [];
        for(var cheese in cheeses){
            if(cheese < 3){
                initCheese += cheeses[cheese];
            }
        }
        suggestedCheese.innerHTML = initCheese;
    }
    JNS.MYCHEESE.removeCheese = function(element){
        console.log("remove");
        var d = document.getElementById('suggestedCheeses');
        var olddiv = document.getElementById(element);
        d.removeChild(olddiv);
    }
    JNS.MYCHEESE.showHover = function(){
        console.log("show");
         //document.getElementById(id).parentNode.nextSibling.style.display='block'; 
    }
    //Register of DOM elements and events
    JNS.MYCHEESE.registery = {};
    JNS.MYCHEESE.addCheese = function(element, options){
        var id = JNS.MYCHEESE.getId();
        element.setAttribute('data-id', id);
        JNS.MYCHEESE.registery[id] = options;
    }
    //Create unique id for DOM elements
    JNS.MYCHEESE.getId =(function(){
        var id = 0;
        return function(){
            id = id + 1;
            return "cheesey-" +id;
        }
    })();
    JNS.MYCHEESE.initCheeseEvents = function(){
        //debugger;
        var hoverElements = document.getElementsByClassName('hover');
        for(i=0;i<hoverElements.length;i++){
            JNS.MYCHEESE.addCheese(hoverElements[i], {'mouseover':JNS.MYCHEESE.showHover})
        };

        var removeElements = document.getElementsByClassName('removecheese');
        for (i=0;i<removeElements.length;i++) {
            //var theId = removeElements[i].getAttribute('data-id')
            JNS.MYCHEESE.addCheese(removeElements[i], {'click':JNS.MYCHEESE.removeCheese});
        };
    }

    JNS.MYCHEESE.getCheeseId = function(event){
        event = event || window.event;
        var target = event.target || event.srcElement,
            eID = target.getAttribute('data-id');
            console.log(eID);
        if(eID){
            var options = JNS.MYCHEESE.registery[eID];
            if(options[event.type]){
                options[event.type](event);
            }
        }
    }


})(JNS)
    JNS.MYCHEESE.makeRequest('cheese.json', JNS.MYCHEESE.buildCheeses);   
    document.body.addEventListener('mouseover', function(){JNS.MYCHEESE.getCheeseId()}, true);
    document.body.addEventListener('click', function(){JNS.MYCHEESE.getCheeseId()}, true);
   
        




   
   






