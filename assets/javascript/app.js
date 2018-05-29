$(document).ready(function () {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCDW1VB5WLA-dB1qYZl7naFbG91n1LYZ7A",
      authDomain: "train-schedule-ede91.firebaseapp.com",
      databaseURL: "https://train-schedule-ede91.firebaseio.com",
      projectId: "train-schedule-ede91",
      storageBucket: "train-schedule-ede91.appspot.com",
      messagingSenderId: "432994380474"
    };
    firebase.initializeApp(config);
  
    var database = firebase.database();
  
    // Capture Button Click
    $("#addTrain").on("click", function (event) {
      event.preventDefault();
  
      // Grabbed values from text boxes
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var freq = $("#interval").val().trim();
  
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: freq
      });
    });
  
  
    database.ref().on("child_added", function (childSnapshot) {
  
      var newTrain = childSnapshot.val().trainName;
      var newLocation = childSnapshot.val().destination;
      var newFirstTrain = childSnapshot.val().firstTrain;
      var newFreq = childSnapshot.val().frequency;
  
      var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
  
      var currentTime = moment();
  
      var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  
      var tRemainder = diffTime % newFreq;
  
      var tMinutesTillTrain = newFreq - tRemainder;
  
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var catchTrain = moment(nextTrain).format("HH:mm");
  
      $("#all-display").append(
        ' <tr><td>' + newTrain +
        ' </td><td>' + newLocation +
        ' </td><td>' + newFreq +
        ' </td><td>' + catchTrain +
        ' </td><td>' + tMinutesTillTrain + ' </td></tr>');
  
      $("#trainName, #destination, #firstTrain, #interval").val("");
      return false;
    },
      function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  
  });
  
  