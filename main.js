var prediction1 = "";
var prediction2 = "";

Webcam.set({
    width:330,
    height:250,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    
    });
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cn1EsEWER/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded!')
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction1;
    speak_data2 = "And the second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[0].label;
        speak();
        if(results[0].label == "Peace")
        {
            document.getElementById("update_emoji").innerHTML = "		&#x270C;";
        }
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "	&#x1F44C;";
        }
        if(results[0].label == "Thumbs up")
        {
            document.getElementById("update_emoji").innerHTML = "	&#x1F44D;";
        }

        if(results[1].label == "Peace")
        {
            document.getElementById("update_emoji2").innerHTML = "		&#x270C;";
        }
        if(results[1].label == "Amazing")
        {
            document.getElementById("update_emoji2").innerHTML = "	&#x1F44C;";
        }
        if(results[1].label == "Thumbs up")
        {
            document.getElementById("update_emoji2").innerHTML = "	&#x1F44D;";
        }
    }
}

