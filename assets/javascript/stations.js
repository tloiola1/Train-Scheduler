var array =[];
var test = true;
    $(function() {

    	
        var params = {
            "api_key": "172ca493f80d4f469e23039bf3ca1e4a",
            // Request parameters
        };
      
        $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
            type: "GET",
        })
        .done(function(data) {
            for (var i = 0; i < data.Stations.length; i++) {
            	array.push(data.Stations[i].Name);
            }

            array.sort();
            for (var i = 0; i < array.length; i++) {
            	
            	$("#nameStations").append("<span"+" id=stat"+" class= class"+1+" value='"+array[i]+"'>"+array[i]+"</span>"+", ");
            }

        })
        .fail(function() {
            alert("error");
        });
    });

$("#fromStation").on("click", function(){
	$("#tbody").toggle();
	$("#nameStations").toggle();
})

$(document).on("click", "#stat", function(evevnt){
	var a = $(this).attr("value");
	console.log(a);
	if(test === true){	
		$("#trainName").val(a); 
		$("#fromStation").html("Destination");
		test=false;
	}
	else if(test === false){
		$("#destination").val(a); 
		$("#fromStation").html("Train Name");
		test=true;
	}
	$("#tbody").toggle();
	$("#nameStations").toggle();
})