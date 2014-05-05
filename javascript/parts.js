;

        
        displayCheese : function(cheeses){
            /*var suggestedCheese = document.getElementById('suggestedCheeses'),
                initCheese = [];
            for(var i=0;i<3;i++){
                initCheese += cheeses[i];
            }
            suggestedCheese.innerHTML = initCheese;
            MYCHEESE.calcHeight();*/
        },
        calcHeight : function(){
            var cheeses = [],
                height = 0,
                suggestedCheese = document.getElementById('suggestedCheeses');
            cheeses = document.querySelectorAll('.selectedCheese');
            var selectCheeses = Array.prototype.slice.call( cheeses, 0, 3 );
            for(var i=0;i<selectCheeses.length;i++){
                height += selectCheeses[i].offsetHeight;
            }
            suggestedCheese.style.height = (height-5)+'px';
        },
        

        
    }





















