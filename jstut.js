ASIDECHEESE = {}

ASIDECHEESE.getresults = function(){
    console.log("hello");
    var mygetrequest = new MYAJAX.ajaxRequest();
    mygetrequest.onreadystatechange = function(){
        if (mygetrequest.readyState === 4){
            if (mygetrequest.status === 200 || window.location.href.indexOf("http") === -1){
            var jsondata = eval("("+mygetrequest.responseText+")"), //retrieve result as an JavaScript object
                sidecheese = jsondata.items
                output = '<ul>'
            for (var i = 0; i < sidecheese.length; i++){
                output += '<li>'
                output += '<a href="'+sidecheese[i].link+'">'
                output += sidecheese[i].title+'</a>'
                output += '</li>'
            }
            output += '</ul>';
            document.getElementById("result").innerHTML = output;
            } else{
                alert("An error has occured making the request");
            }
        }
    }

    mygetrequest.open("GET", "cheese.json", true);
    mygetrequest.send(null);
}
