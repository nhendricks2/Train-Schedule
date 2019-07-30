var firebaseConfig = {
    apiKey: "AIzaSyD8t5YxMbBmb1lLglaUehO7Qo4LCoiATQ4",
    authDomain: "midnight-train-to-georgia.firebaseapp.com",
    databaseURL: "https://midnight-train-to-georgia.firebaseio.com",
    projectId: "midnight-train-to-georgia",
    storageBucket: "midnight-train-to-georgia.appspot.com",
    messagingSenderId: "537089381080",
    appId: "1:537089381080:web:452f7dfaf2a47179"
  };
  
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

var myTimer = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    $("#current-time").text(d.toLocaleTimeString());
}

var frequency = 0; 
var firstTrain = 0;

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();


  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("HH:mm");
  frequency = parseInt($("#frequency").val().trim());
 
  console.log(firstTrain);
  console.log(typeof firstTrain);
  var firstTrainConverted = moment(firstTrain, "hh:mm");
  console.log(firstTrainConverted);
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log(diffTime);
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
   var minutesTillTrain = frequency - tRemainder;
  console.log(minutesTillTrain);
  
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextTrain2 = moment().add(2, "minutes")
  console.log("num1" + nextTrain);
  console.log("num2" + nextTrain2);
  nextTrain = moment(nextTrain).format("HH:mm");
  console.log("num1" + nextTrain);
  

  
  
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    nextTrain: nextTrain,
    minutesTillTrain: minutesTillTrain
  };

  
  database.ref().push(newTrain);


  alert("Train successfully added");
    
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;
  var nextTrain = childSnapshot.val().nextTrain;
  var minutesTillTrain = childSnapshot.val().minutesTillTrain;

  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");
});


    