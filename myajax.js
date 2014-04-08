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

                    suggestedCheeseOutput.push("<li class='clearfix' id='"+id+"'>"+
                        "<ul class='cheese-profile plain-list'>"+
                        "<li><div class='cheese-image'>"+
                        "<img class='hover' src='"+image+"'>"+
                        "</li>"+
                        "<li><div class='cheese-info'>"+
                        "<a class='cheese-name hover' href='"+
                        link+"'>"+title+"</a>, "+
                        location+"<br><a href='"+link+"'>Add Cheese</a></div></li>"+
                        "<li><div class='cheese-actions'>"+
                        "<a href='#' class='removecheese'>x</a></div></li>"+
                        "<li class='cheeseHover'><div>"+
                        "<div class='arrow-right'></div><ul class='plain-list'>"+
                        "<li><div class='cheese-image'><a href='"+link+"'><img src='"+
                        image+"'></a></div></li>"+"<li><div class='cheese-info'><div class='cheese-name'>"+
                        title+"</div><div class='cheese-location'>"+
                        location+"</div><div class='cheese-description'>"+
                        description+"</div></div></li></ul></div></li></div></li></ul>");
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
            height = 0,
            suggestedCheese = document.getElementById('suggestedCheeses');
        cheeses = document.querySelectorAll('.suggestedCheese > li');
        selectCheeses = Array.prototype.slice.call( cheeses, 0, 3 );
        for(i=0;i<selectCheeses.length;i++){
            height += selectCheeses[i].offsetHeight;
        }
        suggestedCheese.style.height = height+'px';
    }
    JNS.MYCHEESE.removeCheese = function(option, element){
        var trigger = element.getAttribute('data-cheese-id'),
            cheeseElement = document.getElementById(trigger),
            parentList = document.getElementById('suggestedCheeses'),
            newLi = document.createElement("LI").innerHTML = cheeseElement;
        e.preventDefault;
        JNS.MYCHEESE.removeNode(trigger);
        parentList.appendChild(newLi);
        JNS.MYCHEESE.calcHeight();
    }
    JNS.MYCHEESE.removeNode = function(id){
        return (elem=document.getElementById(id)).parentNode.removeChild(elem);
    }
    JNS.MYCHEESE.getHoverElement = function(nodeElements){
        for(i=0;i<nodeElements.length;i++){
            if(nodeElements[i].className === 'cheeseHover'){
                return nodeElements[i];
            }
        }
    }
    JNS.MYCHEESE.showHover = function(e, trigger){
        var element = trigger.getAttribute('data-cheese-id'),
            hoverElement = JNS.MYCHEESE.getHoverElement(trigger.parentNode.parentNode.parentNode.childNodes),
            rect = e.srcElement.getBoundingClientRect();
        if(hoverElement){
            var visibleElement = document.querySelector('.cheeseHover'),
                style = window.getComputedStyle(visibleElement);
            if (style.display === 'none') {
                hoverElement.style.display='block'; 
                hoverElement.style.left = e.pageX-hoverElement.offsetWidth-20+'px';
                hoverElement.style.top = e.pageY-25+'px';
            }
            
        }
    }
    JNS.MYCHEESE.hideHover = function(e, trigger){
        var hoverElement = JNS.MYCHEESE.getHoverElement(trigger.parentNode.parentNode.parentNode.childNodes);
        hoverElement.style.display = 'none';
    }
    //Register of DOM elements and events
    JNS.MYCHEESE.registery = {};
    JNS.MYCHEESE.addCheese = function(element, options){
        for (var i=0;i<element.length;i++) {
            var id = JNS.MYCHEESE.getId();
            element[i].setAttribute('data-cheese-id', id);
        JNS.MYCHEESE.registery[id] = options;
        }
    }
    //Create unique id for DOM elements
    JNS.MYCHEESE.getId =(function(){
        var id = 0;
        return function(){
            id = id + 1;
            return "cheese-0" +id;
        }
    })();
    JNS.MYCHEESE.initCheeseEvents = function(){
        var hoverTrigger = [], removeTrigger = [];
            hoverTrigger.push(document.getElementsByClassName('hover'));
            removeTrigger.push(document.getElementsByClassName('removecheese'));
        for (i=0;i<removeTrigger.length;i++) {
            JNS.MYCHEESE.addCheese(removeTrigger[i], {'click':JNS.MYCHEESE.removeCheese});
        };
        for(i=0;i<hoverTrigger.length;i++){
            JNS.MYCHEESE.addCheese(hoverTrigger[i], {   'mouseover':JNS.MYCHEESE.showHover,
                                                        'mouseout':JNS.MYCHEESE.hideHover
                                                    })
        };
    }

    JNS.MYCHEESE.getCheeseId = function(trigger){
        e = trigger || window.event;
        var target = e.target || e.srcElement,
            eID = target.getAttribute('data-cheese-id') || target.getAttribute('data-cheese-id');
        if(eID){
            var options = JNS.MYCHEESE.registery[eID];
            if(options[e.type]){
                options[e.type](event, target);
            }
        }
    }


})(JNS)
    JNS.MYCHEESE.makeRequest('cheese.json', JNS.MYCHEESE.buildCheeses);   
    if(addEventListener !== undefined){
        document.body.addEventListener('mouseover', JNS.MYCHEESE.getCheeseId, true);
        document.body.addEventListener('mouseout', JNS.MYCHEESE.getCheeseId, true);
        document.body.addEventListener('click', JNS.MYCHEESE.getCheeseId, true);
        document.body.addEventListener('touchenter', JNS.MYCHEESE.getCheeseId, true);
        document.body.addEventListener('touchleave', JNS.MYCHEESE.getCheeseId, true);
        document.body.addEventListener('touchstart', JNS.MYCHEESE.getCheeseId, true);
    }else{
        document.body.attachEvent('mouseover', JNS.MYCHEESE.getCheeseId, true);
        document.body.attachEvent('mouseout', JNS.MYCHEESE.getCheeseId, true);
        document.body.attachEvent('click', JNS.MYCHEESE.getCheeseId, true);
        document.body.attachEvent('touchenter', JNS.MYCHEESE.getCheeseId, true);
        document.body.attachEvent('touchleave', JNS.MYCHEESE.getCheeseId, true);
        document.body.attachEvent('touchstart', JNS.MYCHEESE.getCheeseId, true);
    }
    
   
        




   
   






