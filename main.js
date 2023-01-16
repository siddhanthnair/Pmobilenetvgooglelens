function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet", modelLoaded);
}


function modelLoaded(){
  console.log("Model is loaded");
}

function draw(){
  image(video,0, 0, 300, 300);
  classifier.classify(video, getResult);
}
previous_result="";
function getResult(error, results){
if (error){
  console.log(error)
}

else if((results[0].confidence>0.5) && (previous_result!= results[0].label)){
console.log(results)
previous_result=results[0].label;
synth=window.speechSynthesis;
speakData="Object detected is " + results[0].label;
var utterance=new SpeechSynthesisUtterance(speakData);
synth.speak(utterance)
document.getElementById("result_label").innerHTML=results[0].label;
document.getElementById("result_accuracy").innerHTML=results[0].confidence.toFixed(3);
}
}

