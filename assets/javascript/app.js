
    var has_input = true;
    var input_quantity = 4;
    var name = "";
    var dest = "";
    var first_train_time = "";
    var freq = "";
    var date = "";
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


    // Capture Button Click
    $("#submitButton").on("click", function(event) {

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
      }
      clear();
    });

    function display(){
      $("#tr").empty();
  
    // Firebase watcher + initial loader + order/limit HINT: .on("child_added")
    //.on("child_added") push Function is looking for an event child_added
    database.ref().on("child_added", function(childSnapshot) {
      // storing the snapshot.val() in a variable for convenience
      // var svSize = snapshot.length;
      // console.log(svSize);

      var sv = childSnapshot.val();

        // calculating how many minutes awys is the next train
        var a = parseInt(sv.freq);
        var b = parseInt(moment().format('mm'));
        if(a<b){a+=a;}
        var c = a - b;
        min = c;
//---------------------------------------------

        var x = moment().format("hh:mm");
        var z = moment.duration(x).asMinutes();
        var y = moment.duration(sv.first_train_time).asMinutes();
        z = z + c;

        time = moment().format("mm");

        var h = z / 60 | 0;
        h += 12;
        var m = (z % 60);
        if(h +":"+ m < moment().format("HH:mm")){
          m = m + parseInt(sv.freq);
          m = (m % 60);
          h+=1
        }
        if(min < 0){
          min = m * -1;
        }


        
        if(m === 0){
            m = m.toString();
            m = "00";
        }



      if(has_input === true){
      $("#tr").prepend("<tr><td>"+sv.name+"</td>"
      +"<td>"+sv.dest+"</td>"
      +"<td>"+sv.freq+"</td>"
      +"<td>"+ h +":"+ m +"</td>"
      +"<td>"+min+"</td></tr>");
      }
      else{};

                
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
  }


function clear(){
    for(var i = 0; i < input_quantity; i++){
          $(".a"+i).val("");
        }
  }
var clock = setInterval(my_clock, 1000);
  function my_clock() {
      sec++;
      if(sec === 60){
          sec = 0;
          min -= 1;
          display();
      }

  }

  display();