prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
    });
    
    camera = document.getElementById("camera");
    
    Webcam.attach('#camera');
    
    function take_snapshot()
    {
        Webcam.snap(function(data_uri) {
            document.getElementById("result").innerHTML = '<img id="captured_image" src="' +data_uri+'"/>';
        });
    }
    console.log('ml5 version:', ml5.version);
    
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XYdiNW2R6/model.json',modelLoaded);
    
    function modelLoaded() {
        console.log('Model Loaded!');
    }
    
    function speak(){
        var synth = window.speechSynthesis;
        speak_data_1 = "The first prediciton is" + prediction_1;
        speak_data_2 = "The second prediciton is" + prediction_2;
        var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
        synth.speak(utterThis);
    }

    function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    document.getElementById("result_gesture_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Super")
    {
        document.getElementById("update_gesture").innerHTML = "&#x1F44C;";
    }
    if(results[0].label == "What")
    {
        document.getElementById("update_gesture").innerHTML = "&#x1F596;";
    }
    if(results[0].label == "Thumbs Up")
    {
        document.getElementById("update_gesture").innerHTML = "&#x1F44D;";
    }
    if(results[0].label == "Thumbs Down")
    {
        document.getElementById("update_gesture").innerHTML = "&#x1F44E;";
    }

    if(results[1].label == "Super")
    {
        document.getElementById("update_gesture2").innerHTML = "&#1F44C;";
    }
    if(results[1].label == "What")
    {
        document.getElementById("update_gesture2").innerHTML = "&#x1F596;";
    }
    if(results[1].label == "Thumbs Up")
    {
        document.getElementById("update_gesture2").innerHTML = "&#x1F44D;";
    }
    if(results[1].label == "Thumbs Down")
    {
        document.getElementById("update_gesture2").innerHTML = "&#x1F44E;";
    }
}
}