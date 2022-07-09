var song="";
leftwristX=0;
rightwristX=0;
leftwristY=0;
rightwristY=0;
scoreLeftwrist=0;



function setup()
{
    canvas=createCanvas(600,500)
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modalloaded);
    posenet.on("pose", gotposes);
    
}

function modalloaded()
{
    console.log("Posenet is initialized");
}

function gotposes(results)
{
    if (results.length>0)
    console.log(results);

    scoreLeftwrist= results[0].pose.keypoints[9].score;
    console.log("scoreLeftwrist =" + scoreLeftwrist);


    leftwristX= results[0].pose.leftWrist.x;
    leftwristY= results[0].pose.leftWrist.y;
    console.log("leftwristX="+leftwristX+",leftwristY="+leftwristY);

    rightwristX= results[0].pose.rightWrist.x;
    rightwristY= results[0].pose.rightWrist.y;
    console.log("rightwristX="+rightwristX+",rightwristY="+rightwristY);


}

function preload()
{
    song=loadSound("music.mp3");
}

function draw()
{
    image(video,0,0,600,500);


    
    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftwrist>0.2)
    {
    circle(leftwristX,leftwristY,20);
    InNumber = Number(leftwristY);
    remove_decimals= floor(InNumber);
    volume =remove_decimals/500;
    document.getElementById("volume").innerHTML= "Volume = " + volume ;
    song.setVolume(volume);

    }
}

function play()
{
    song.play();
    song.volume(1);
    song.rate(1);
}



