


var mouseIsDown;
var timeIsSet;
var timeDown = 0;
var timesClicked = 0;
var timeElapsed = 0;
var button3Set;
var new_high_score;
//Button1

var onMouseDown1 = function(e) {
  if(e.button != 0){
    return;
  }

  button1.addEventListener('mouseup', onMouseUp);
  mouseIsDown = setInterval(
    function(){
      timeDown += 1;
      document.getElementById('current_score_1').innerHTML = timeDown;
    }, 1000);

  
}

var onMouseUp = function(e) {
  clearInterval(mouseIsDown);
  var current_record = document.getElementById('button_1_high_score');
  current_record = parseInt(current_record.innerHTML);

  if(timeDown > current_record){
    var name = prompt("Congratulations, you've reached a new high score! Type in your name.");
    $.put('/stats/1', {high_score: timeDown, high_scorer_name: name})
  } else {
    $.put('/stats/1')
  }

  timeDown = 0;
}

// Button2

var onMouseClick2 = function(e) {
  if(e.button != 0){
    return;
  } else if(timeIsSet){
    clearTimeout(timeIsSet);
  }

  timesClicked += 1;
  document.getElementById('current_score_2').innerHTML = timesClicked;
  timeIsSet = setTimeout(endGame, 1000);

}

var endGame = function() {
  
  var current_record = document.getElementById('button_2_high_score');
  current_record = parseInt(current_record.innerHTML);

  if(timesClicked > current_record){
    var name = prompt("Congratulations, you've reached a new high score! Type in your name.");
    $.put('/stats/2', {high_score: timesClicked, high_scorer_name: name})
  } else {
    $.put('/stats/2')
  }

  timesClicked = 0;

}

// Button3

var onMouseDown3 = function(e) {
  if(e.button != 0){
    return;
  }
  clearInterval(button3Set);

  var current_record = document.getElementById('button_3_high_score');
  current_record = parseInt(current_record.innerHTML);

  if(timeElapsed > current_record){
    var name = prompt("Congratulations, you've reached a new high score! Type in your name.");
    $.put('/stats/3', {high_score: timeElapsed, high_scorer_name: name}, recalculateVariables)
  } else {
    $.put('/stats/3')
    new_high_score = timeElapsed;
  }

  timeElapsed = 0;  

}

var recalculateVariables = function() {
  $("#button_1_stats .high-score").text(new_high_score);
}

var onLoadFunction = function() {
  button3Set = setInterval(incrementTime, 1000);
}

var incrementTime = function() {
  timeElapsed += 1;
  document.getElementById('current_score_3').innerHTML = timeElapsed;
}
















$.put = function(url, data, callback, type){
 
  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: type
  });
}