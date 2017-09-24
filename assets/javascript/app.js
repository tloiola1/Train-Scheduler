
    // Initial Values
    var name = "";
    var dest = "";
    var first_train_time = "";
    var freq = "";
    var date = "";
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


    // Capture Button Click
    $("#submitButton").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#trainName").val().trim();
      dest = $("#destination").val().trim();
      first_train_time = $("#firstTrainTime").val().trim();
      freq = $("#frequency").val().trim();
      date = moment().format('LL');
      // Code for handling the push
      database.ref().push({
        name: name,
        dest: dest,
        first_train_time: first_train_time,
        freq: freq,
        date: date
        //
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added")
    //.on("child_added") push Function is looking for an event child_added
    database.ref().on("child_added", function(childSnapshot) {
      // storing the snapshot.val() in a variable for convenience
      // var svSize = snapshot.length;
      // console.log(svSize);

      var sv = childSnapshot.val();

        // calculating how many minutes awys is the next train
        var minutes_away = 0;
        var a = parseInt(sv.freq);
        var b = parseInt(moment().format('mm'));
        if(a<b){a+=a;}
        var c = a - b;
        if(c === 0){
            minutes_away = c.toSrting();
            minutes_away = "Boarding";
        }
        else if(c === 1){
            minutes_away = c.toString();
            minutes_away = "Arriving";
        }
        else{
            minutes_away = c;
        }
//---------------------------------------------

        var x = moment().format("hh:mm");
        
        var y = moment.duration(sv.first_train_time).asMinutes();
        var z = moment.duration(x).asMinutes();
        z = z + minutes_away;

        var h = z / 60 | 0;
        var m = z % 60;
        if(m === 0){
            m = m.toString();
            m = "00";
        }




      $("#tr").prepend("<tr><td>"+sv.name+"</td>"
      +"<td>"+sv.dest+"</td>"
      +"<td>"+sv.freq+"</td>"
      +"<td>"+ h +":"+ m +"</td>"
      +"<td>"+minutes_away+"</td></tr>");


                
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = {

  time: 0,
  lap: 1,

  reset: function() {

    stopwatch.time = 0;
    stopwatch.lap = 1;

    // DONE: Change the "display" div to "00:00."
    $("#display").html("00:00");

    // DONE: Empty the "laps" div.
    $("#laps").html("");
  },
  start: function() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
    }
  },
  stop: function() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
  recordLap: function() {

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);

    // DONE: Add the current lap and time to the "laps" div.
    $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");

    // DONE: Increment lap by 1. Remember, we can't use "this" here.
    stopwatch.lap++;
  },
  count: function() {

    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time++;

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#time").html(converted);
  },
  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};
   stopwatch.start(); 
// $("#fromButtom").on("click", function(){
    
//     $("#fromStation").toggle();

//   })

// $("#toButton").on("click", function(){
    
//     $("#toStation").toggle();

//   })
