var clock = setInterval(my_clock, 1000);

function my_clock() {
    var time = moment().format("HH:mm:ss");
    var ap = "";
    if(moment().format("HH") >= 12 && moment().format("HH") <= 24){
    	ap = "pm";
    }
    else if(moment().format("HH") >= 0 && moment().format("HH") < 12){
    	ap = "am";
    }
    $("#localTime").text(time +" "+ ap);

}