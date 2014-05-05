remove = {
    function(option, element){
        var trigger = element.getAttribute('data-cheese-id'),
            cheeseElement = document.getElementById(trigger),
            suggestedCheeses = document.querySelectorAll('.selectedCheese');
            hideNode(trigger);
    },
    hideNode : function(id){
        var item = document.getElementById(id);
        //addNode();
        item.remove();
        
    },
    addNode : function(){
        var item = document.querySelectorAll('.suggestedCheese .selectedCheese'),
            i = Math.floor(Math.random() * item.length) + 1;
        console.log(item);
        /*if(item[i].className === 'hide'){
            item[i].className = 'selectedCheese';
        }*/
    }
}