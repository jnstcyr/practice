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
                        "<li><a href='#' class='cheese-image'><img data-cheese-id='"+
                        id+"' class='hover' src='"+
                        image+"'></a></li>"+
                        "<li><div class='cheese-info'>"+
                        "<a class='cheese-name hover' data-cheese-id='"+id+"' href='"+
                        link+"'>"+title+"</a>, "+
                        location+"<a href='"+link+"'>Add Cheese</a></div></li>"+
                        "<li><div class='cheese-actions'>"+
                        "<a data-cheese-id='"+id+"' href='#' class='removecheese'>x</a></div></li></ul>"+
                        
                        "<div class='cheeseHover "+id+"'>"+
                        "<div class='arrow-right "+id+"'></div><ul class='plain-list'>"+
                        "<li><div class='cheese-image'><a href='"+link+"'><img src='"+
                        image+"'></a></div></li>"+"<li><div class='cheese-info'><div class='cheese-name'>"+
                        title+"</div><div class='cheese-location'>"+
                        location+"</div><div class='cheese-description'>"+
                        description+"</div></div></li></ul></div></li>");
                }
                JNS.MYCHEESE.displayCheese(suggestedCheeseOutput);
                JNS.MYCHEESE.initCheeseEvents();
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }
    JNS.MYCHEESE.displayCheese = function(cheeses){
        var suggestedCheese = document.getElementById('suggestedCheeses'),
            initCheese = [];
        for(i=0;i<cheeses.length;i++){
            initCheese += cheeses[i];
        }
        suggestedCheese.innerHTML = initCheese;
        JNS.MYCHEESE.calcHeight();
    }
    JNS.MYCHEESE.calcHeight = function(){
        var cheeses = [],
            height = 0;
        cheeses = document.querySelectorAll('.suggestedCheese > li');
        for(i=0;i<cheeses.length;i++){
            index = Array.prototype.indexOf.call(cheeses, cheeses[i]);
            if(index < 4){
                height += cheeses[i].offsetHeight;
            }
        }
        document.getElementById('suggestedCheeses').style.height = height+'px';
    }
    JNS.MYCHEESE.removeCheese = function(e){
        var element = event.target.getAttribute('data-cheese-id'),
            d = document.getElementById('suggestedCheeses'),
            cheeseElement = document.getElementById(element),
            newLi = document.createElement("LI").innerHTML = cheeseElement;
        e.preventDefault;
        d.removeChild(cheeseElement);
        d.appendChild(newLi);
        JNS.MYCHEESE.calcHeight();
    }
    JNS.MYCHEESE.showHover = function(){
        var element = event.target.getAttribute('data-cheese-id'),
            hoverElement = document.querySelector('.'+element),
            rect = event.target.getBoundingClientRect(),
            e = e || window.event;

        if(hoverElement){
            var visibleElement = document.querySelector('.cheeseHover'),
                style = window.getComputedStyle(visibleElement);
            if (style.display === 'none') {
                hoverElement.style.display='block'; 
                hoverElement.style.left = e.pageX-hoverElement.offsetWidth-20+'px';
                hoverElement.style.top = e.pageY-25+'px';
            }
            JNS.MYCHEESE.addCheese(hoverElement, {'mouseleave': JNS.MYCHEESE.hideHover(hoverElement)});
        }
    }
    JNS.MYCHEESE.hideHover = function(element){
        element.style.display = 'none';
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
        var hoverTrigger = document.getElementsByClassName('hover');
        for(i=0;i<hoverTrigger.length;i++){
            JNS.MYCHEESE.addCheese(hoverTrigger[i], {'mouseover':JNS.MYCHEESE.showHover})
        };

        var removeTrigger = document.getElementsByClassName('removecheese');
        for (i=0;i<removeTrigger.length;i++) {
            JNS.MYCHEESE.addCheese(removeTrigger[i], {'click':JNS.MYCHEESE.removeCheese});
        };
    }

    JNS.MYCHEESE.getCheeseId = function(event){
        event = event || window.event;
        var target = event.target || event.srcElement,
            eID = target.getAttribute('data-id');
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
    document.body.addEventListener('mouseout', function(){JNS.MYCHEESE.getCheeseId()}, true);
    document.body.addEventListener('click', function(){JNS.MYCHEESE.getCheeseId()}, true);
   
        




   
   






