"use strict";
var ajaxResponse = function(httpRequest, action) {
  return function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        action(JSON.parse(httpRequest.responseText));
      }
      else {
        console.log("Failed request status code of (" + httpRequest.status + ")");
      }
    }
  }
}
var ajax = function (url, action) {
    var httpRequest;
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
    httpRequest.onreadystatechange = ajaxResponse(httpRequest, action);
    httpRequest.open('GET', url);
    httpRequest.send();
};
var MYCHEESE = (function(){
    //Register of DOM elements and events
    var registery = {};
    var addCheese = function(element, options){
        for (var i=0;i<element.length;i++) {
            var id = getId();
            element[i].setAttribute('data-cheese-id', id);
        registery[id] = options;
        }
    };
    //Create unique id for DOM elements
    var getId =(function(){
        var id = 0;
        return function(){
            id = id + 1;
            return "cheese-0" +id;
        }
    })();
    return {
        cheeseEvents : function(){
            var hoverTrigger = [],
                removeTrigger = [],
                hover = [];
            hoverTrigger.push(document.getElementsByClassName('hover'));
            removeTrigger.push(document.getElementsByClassName('removecheese'));
            hover.push(document.getElementsByClassName('cheeseHover'));
            /*for (var i=0;i<removeTrigger.length;i++) {
                addCheese(removeTrigger[i], {'click':removeCheese});
            };*/
            for(var i=0;i<hoverTrigger.length;i++){
                addCheese(hoverTrigger[i], {'mouseover':hoverCheese.showHover,'mouseout':hoverCheese.hideHover})
            };
            for(var i=0;i<hover.length;i++){
                addCheese(hover[i], {'foucusin':hoverCheese.showHover,'focusout':hoverCheese.hideHover})
            };
        },
        buildCheeses : function (data) {
            Handlebars.registerHelper('list', function(context, options) {
                var start = "<ul id='suggestedCheeses' class='suggestedCheese plain-list'>", data;
                for (var i=0; i<3; i++) {
                    if (options.data) {
                      data = Handlebars.createFrame(options.data || {});
                      data.index = i;
                    }

                    start += options.fn(context[i], { data: data });
                }
                start += "</ul>";
                
              return start;
            });
            var source   = document.getElementById('cheese').innerHTML,
                template = Handlebars.compile(source);
            var html = template(data);

            document.getElementById('content').innerHTML = html;
            MYCHEESE.cheeseEvents();
            
        },
        getCheeseId : function(trigger){
            var e = trigger || window.event;
            var target = e.target || e.srcElement,
                eID = target.getAttribute('data-cheese-id');
            if(eID){
                var options = registery[eID];
                if(options[e.type]){
                    options[e.type](e, target);
                }
            }
        }
    }
})();
    
var hoverCheese = (function(){
    var getHoverElement = function(el){
        var cheeseId = el.getAttribute('data-id'),
            nodeElements = document.getElementsByClassName(cheeseId);
        for(var i=0;i<nodeElements.length;i++){
            if(nodeElements[i].classList.contains('cheeseHover')){
                return nodeElements[i];
            }
        }
    }
    return {
        showHover : function(event){
           var hoverElement = getHoverElement(event.target);
            if(hoverElement){
                var visibleElement = document.querySelector('.cheeseHover'),
                    style = window.getComputedStyle(visibleElement);
                if (style.display === 'none') {
                    hoverElement.style.display='block'; 
                    hoverElement.focus();
                    hoverCheese.getPosition(event, hoverElement);
                }
            }
        },
        getPosition : function(e, el){
            var ie = document.all ? true : false,
                x = ie ? e.clientX + document.documentElement.scrollLeft : e.pageX,
                y = ie ? e.clientY + document.documentElement.scrollTop : e.pageY;
            el.style.left = (x - 205)+'px';
            el.style.top = (y+20)+'px';
        },
        hideHover : function(event){
            var hoverElement = getHoverElement(event.target);
            setTimeout(function(){hoverElement.style.display = 'none';}, 2000);
        }
    }
})();



    ajax('cheese.json', MYCHEESE.buildCheeses);
    if(addEventListener !== undefined){
        document.body.addEventListener('mouseover', MYCHEESE.getCheeseId, true);
        document.body.addEventListener('mouseout', MYCHEESE.getCheeseId, true);
        document.body.addEventListener('mousemove', MYCHEESE.getCheeseId, true);
        document.body.addEventListener('click', MYCHEESE.getCheeseId, true);
        document.body.addEventListener('touchenter', MYCHEESE.getCheeseId, true);
        document.body.addEventListener('touchleave', MYCHEESE.getCheeseId, true);
        document.body.addEventListener('touchstart', MYCHEESE.getCheeseId, true);
        document.body.addEventListener('foucusin', MYCHEESE.getCheeseId, true);
        document.body.addEventListener('focusout', MYCHEESE.getCheeseId, true);
    }else{
        document.body.attachEvent('mouseover', MYCHEESE.getCheeseId, true);
        document.body.attachEvent('mouseout', MYCHEESE.getCheeseId, true);
        document.body.attachEvent('mousemove', MYCHEESE.getCheeseId, true);
        document.body.attachEvent('click', MYCHEESE.getCheeseId, true);
        document.body.attachEvent('touchenter', MYCHEESE.getCheeseId, true);
        document.body.attachEvent('touchleave', MYCHEESE.getCheeseId, true);
        document.body.attachEvent('touchstart', MYCHEESE.getCheeseId, true);
    }
    
   
        




   
   






