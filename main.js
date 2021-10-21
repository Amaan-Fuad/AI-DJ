song="";
function preload(){
    song=loadSound("music.mp3");
    }
lwx=0;
lwy=0;
rwx=0;
rwy=0;
scorelw=0;
scorerw=0;
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelloaded);
poseNet.on('pose',gotposes);
}
function gotposes(results){
    if(results.length>0){
console.log(results);
lwx=results[0].pose.leftWrist.x;
rwx=results[0].pose.rightWrist.x;
lwy=results[0].pose.leftWrist.y;
rwy=results[0].pose.rightWrist.y;
scorelw=results[0].pose.keypoints[9].score;
scorerw=results[0].pose.keypoints[10].score;
}}
function modelloaded(){
console.log("Model is loaded");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function draw(){
    image(video,0,0,600,500);
    fill("#d757fa");
    stroke("#00ffd5");
    if(scorelw>0.001){
       circle(lwx,lwy,30);
       innumberlefty=Number(lwy);
       newlefftwristy=floor(innumberlefty);
       volume=newlefftwristy/500;
       document.getElementById("volume").innerHTML="volume="+volume;
       song.setVolume(volume);
    if(scorerw>0.001){
        circle(rwx,rwy,30);
        if(rwy>0&&lwy<=100){
document.getElementById("speed").innerHTML="Speed=0.5x";
song.rate(0.5);
        }
        else if(rwy>100&&lwy<=200){
            document.getElementById("speed").innerHTML="Speed=1x";
            song.rate(1); 
        }
        else if(rwy>200&&lwy<300){
            document.getElementById("speed").innerHTML="Speed=1.5x";
            song.rate(1.5); 
        }
        else if(rwy>300&&lwy<=400){
            document.getElementById("speed").innerHTML="Speed=2x";
            song.rate(2); 
        }
        else if(rwy>400&&lwy<=500){
            document.getElementById("speed").innerHTML="Speed=2.5x";
            song.rate(2.5); 
        }
     }
}}
