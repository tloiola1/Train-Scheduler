
    var has_input = true;
    var input_quantity = 4;
    var name = "";
    var dest = "";
    var first_train_time = "";
    var freq = "";
    var min = 0;
    var sec = moment().format("ss");
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCanlYIc7n-Wel8wDeaMxMzYtViVVCOwpI",
      authDomain: "myfirstproject-67bda.firebaseapp.com",
      databaseURL: "myfirstproject-67bda.firebaseio.com",
      storageBucket: "myfirstproject-67bda.appspot.com",
      messagingSenderId: "208476116054"
    };

    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // document.
    // Capture Button Click
    $("#submitButton").on("click", function(event) {
    	$("#tr").empty();
	has_input = true;
      for(var i = 0; i < input_quantity; i++){
        if($(".a"+i).val() === ""){
          has_input = false;
        }
      }
      if(has_input === false){
        clear();
      }
      else if(has_input === true){
        store();
        
      }

      function store(){
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#trainName").val().trim();
      dest = $("#destination").val().trim();
      first_train_time = $("#firstTrainTime").val().trim();
      freq = $("#frequency").val().trim();

      // Code for handling the push
      database.ref().push({
        name: name,
        dest: dest,
        first_train_time: first_train_time,
        freq: freq,
        //
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      }
      clear();
    });

    function display(){  
    	$("#tr").empty();
      clear();
    //
    database.ref().on("child_added", function(childSnapshot) {
      
      // storing the snapshot.val() in a variable for convenience
      var sv = childSnapshot.val();

// this block calculates time for next train
        var a = moment().format("HH:mm");
        var b = moment.duration(a).asMinutes();
        var c =  moment.duration(sv.first_train_time).asMinutes();
        var d = parseInt(sv.freq);
        var next_train;
        if(c > b){
			do{
			c -= d;
			}while(c > b + d);
			c += d;
			var h = c / 60 | 0,
			  	m = c % 60 | 0;
			if(m === 0){
			m = m.toString();
			m = "00";
			}
			else if(m < 10 && m > 0){
				m = m.toString();
				m = "0" + m;
			}
		next_train = h+":"+m;
        }

        else if(c < b){
			do{
			c += d;
			}while(c < b);
			var h = c / 60 | 0,
			  	m = c % 60 | 0;
        if(m === 0){
			m = m.toString();
			m = "00";
        }
        else if(m < 10 && m > 0){
				m = m.toString();
				m = "0" + m;
			}
        next_train = h+":"+m;
        }
//------------------------------------

// this block calculates for next train minutes away 
        var subThis = moment.duration(next_train).asMinutes();
        min = subThis - b;
        h = min / 60 | 0,
		m = min % 60 | 0;
		if(m === 0){
			m = m.toString();
			m = "00";
			}
			else if(m < 10 && m > 0){
				m = m.toString();
				m = "0" + m;
			}
		min = h+":"+m;

//--------------------------------------------------
		
      $("#tr").prepend("<tr><td>"+sv.name+"</td>"
      +"<td>"+sv.dest+"</td>"
      +"<td>"+sv.freq+"</td>"
      +"<td>"+next_train+"</td>"
      +"<td>"+min+"</td></tr>");

                
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
  }

// Clear the browser to prevent redundancy
function clear(){
    for(var i = 0; i < input_quantity; i++){
          $(".a"+i).val("");
        }
  }
//This block updateds the browser every minute
var clock = setInterval(my_clock, 1000);
  function my_clock() {
      sec++;
      // console.log(sec);
      if(sec === 60){
          sec = 0;
          min -= 1;
          display();
      }

  }
  //Display database inputs on browser
  display();
