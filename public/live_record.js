// screen record
var video = document.querySelector('.recording');
var output = document.querySelector('.output');
var start = document.querySelector('.start-btn');
var stop = document.querySelector('.stop-btn');
var anc = document.querySelector(".download-anc");
var display_sheet = document.querySelector(".display_sheet");
var data = [];


var btn = document.querySelector(".record-btn");

if(btn){
    btn.addEventListener("click", async function () {
        // In order record the screen with system audio
        var recording = navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: 'screen',
            },
            audio: true,
        })
            .then(async (e) => {
    
                // For recording the mic audio
                let audio = await navigator.mediaDevices.getUserMedia({
                    audio: true, video: false })
    
                // Assign the recorded mediastream to the src object
                video.srcObject = e;
    
                // Combine both video/audio stream with MediaStream object
                let combine = new MediaStream(
                    [...e.getTracks(), ...audio.getTracks()])
    
                /* Record the captured mediastream
                with MediaRecorder constructor */
                let recorder = new MediaRecorder(combine);
    
                // Starts the recording when clicked
                recorder.start();
                display_sheet.style.display = "none"
                document.querySelector(".recording").style.display = "block";
                document.querySelector(".record-btn").style.display = "none";
                document.querySelector(".stop-btn").style.display = "block";
                document.querySelector(".download-anc").style.display = "none";
    
                // For a fresh start
                data = []
    
                stop.addEventListener('click', (e) => {
    
                    // Stops the recording
                    recorder.stop();
                });
    
                /* Push the recorded data to data array
                when data available */
                recorder.ondataavailable = (e) => {
                    data.push(e.data);
                };
    
                recorder.onstop = () => {
    
                    document.querySelector(".recording").style.display = "none";
                    document.querySelector(".output").style.display = "block";
                    document.querySelector(".record-btn").style.display = "block";
                    document.querySelector(".stop-btn").style.display = "none";
                    document.querySelector(".download-anc").style.display = "block";
    
                    /* Convert the recorded audio to
                    blob type mp4 media */
                    let blobData = new Blob(data, { type: 'video/mp4' });
    
                    // Convert the blob data to a url
                    let url = URL.createObjectURL(blobData)
    
                    // Assign the url to the output video tag and anchor
                    output.src = url
                    anc.href = url
                };
            });
    })
}


var camera_button = document.querySelector(".start-camera");
var camera_video = document.querySelector("#video");
var start_button = document.querySelector(".start-cam-record");
var stop_button = document.querySelector(".stop-cam-record");
var download_link = document.querySelector("#download-video");

var camera_stream = null;
var media_recorder = null;
var blobs_recorded = [];

if(camera_button){
    camera_button.addEventListener('click', async function() {
    display_sheet.style.display = "none";
    camera_video.style.display = "block";
    camera_button.style.display = "none"; // hide start camera button
    start_button.style.display = "block"; // show start recording button
        camera_stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
     camera_video.srcObject = camera_stream;
 });
}

if(start_button){
    start_button.addEventListener('click', function() {
        start_button.style.display = "none"; // hide start recording button
        stop_button.style.display = "block"; // show stop recording button
        // set MIME type of recording as video/webm
        media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });
    
        // event : new recorded video blob available 
        media_recorder.addEventListener('dataavailable', function(e) {
            blobs_recorded.push(e.data);
        });
    
        // event : recording stopped & all blobs sent
        media_recorder.addEventListener('stop', function() {
            // create local object URL from the recorded video blobs
            let video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
            download_link.href = video_local;
        });
    
        // start recording with each recorded blob having 1 second video
        media_recorder.start(1000);
    });
}

if(stop_button){
    stop_button.addEventListener('click', function() {
        media_recorder.stop(); 
        stop_button.style.display = "none"; // show stop recording button
        download_link.style.display = "block";
    });
}
