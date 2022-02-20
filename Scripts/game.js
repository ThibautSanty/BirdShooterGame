// global variables
const audioEarning = new Audio("./Sounds/earn.wav");
const audioBird = new Audio("./Sounds/bird.mp3");
const audioWeapon = new Audio("./Sounds/explosion.mp3");
const audioHunter = new Audio("./Sounds/hunter.mp3");
const audioNet = new Audio("./Sounds/net.mp3");
const elementTimer = document.getElementById("time");
var time = 10; // 1 minute in seconds
var seconds = 0;
var score = 0;
var running = false;
var birds = new Array();
var colors = ['#DD2E44' , '#DD2EB4' , '#A32EDD' , '#442EDD' ,'#2E7ADD' , '#469F6D' , '#8F9B8B' , '#E2F655' , '#E96F04'];
var directions = ['toRight' , 'toLeft'];

// functions
function Timer(){

    elementTimer.style.width = Math.round( ( (time - seconds) / time ) * 100).toString() + "%";

    if (seconds < time){
        seconds += 1;
    }
    else{
        console.log("[game] (timer) timer ended, game stopped");
        console.log(birds);
        clearInterval(generator);
        clearInterval(timer);
    }
}
function RemoveBird(obj){

    console.log("[RemoveBird] (" + obj.getAttribute("data") + ") bird has been removed");
    obj.remove();
    clearInterval(birds[obj.getAttribute("data")]);
}
function UpdateBird(args){
    let obj = args[0];
    let objID = obj.getAttribute("data");
    let direction = args[1];
    let step = args[2]
    let posX = obj.getBoundingClientRect().left;
    
    // console.log("[UpdateBird] (" + objID.toString() + ") updating ...");
    if (direction == "toRight"){
        if (posX >= window.visualViewport.width){
            console.log("[UpdateBird] (" + objID.toString() + ") reached the end");
            // delete and update list and birds
            RemoveBird(obj);
        }
        if (posX < window.visualViewport.width){
            obj.style.left = (posX + step).toString() + "px";
        }   
    }
    if (direction == "toLeft"){
        if (posX <= -(obj.getBoundingClientRect().width) ){
            console.log("[UpdateBird] (" + objID.toString() + ") reached the end");
            // delete and update list and birds
            RemoveBird(obj);
        }
        if (posX > -(obj.getBoundingClientRect().width)){
            obj.style.left = (posX - step).toString() + "px";
        }  
        
    }

}
function GenerateBird(color , colorAccent , size , direction , step){

    let birdContainer = document.createElement('button');
    birdContainer.style.width = size + "px";
    birdContainer.style.height = size + "px";
    let bird = document.createElementNS("http://www.w3.org/2000/svg","svg");
    let birdNet = document.createElementNS("http://www.w3.org/2000/svg","svg");

    let globalContainer = document.createElementNS("http://www.w3.org/2000/svg","g");
    let wingContainer = document.createElementNS("http://www.w3.org/2000/svg","g");
    let noise = document.createElementNS("http://www.w3.org/2000/svg","path");
    let feet = document.createElementNS("http://www.w3.org/2000/svg","path");
    let body = document.createElementNS("http://www.w3.org/2000/svg","path");
    let eye = document.createElementNS("http://www.w3.org/2000/svg","path");
    let wing = document.createElementNS("http://www.w3.org/2000/svg","path");
    let wingaccent = document.createElementNS("http://www.w3.org/2000/svg","path");
    
    let globalContainerNet = document.createElementNS("http://www.w3.org/2000/svg","g");
    let noiseNet = document.createElementNS("http://www.w3.org/2000/svg","path");
    let bodyNet = document.createElementNS("http://www.w3.org/2000/svg","path");
    let wingNet = document.createElementNS("http://www.w3.org/2000/svg","path");
    let eyeNet = document.createElementNS("http://www.w3.org/2000/svg","path");
    let net = document.createElementNS("http://www.w3.org/2000/svg","path");

    birdContainer.style.top = (Math.round(Math.random() * (window.visualViewport.height * 0.5))).toString() + "px";
    birdContainer.setAttribute("data" , birds.length);
    birdContainer.setAttribute("class", "container-bird");
    bird.setAttribute("viewBox" , "0 0 200 181.314");
    bird.setAttribute("class" , "bird");
    

    if (direction == "toRight"){
        birdContainer.style.left = "-" + size + "px" ;
        bird.style.transform = "scale( -1 , 1)";
        birdNet.style.transform = "scale( -1 , 1)";
        birdContainer.setAttribute("class", "container-bird");
    }
    if (direction == "toLeft") {
        birdContainer.style.left = (window.visualViewport.width + size) + "px" ;
        
    }


    globalContainer.setAttribute("transform" , "translate(0 21.659)");
    wingContainer.setAttribute("transform" , "translate(100.55 1.774)");
    wingContainer.setAttribute("class" , "fly");

    noise.setAttributeNS(null , "d" , "M48.285,98.422c-.632,9.4,10.065,17.8-4.053,16.845S-.378,100.847,0,95.166s21.115-15.69,35.228-14.739,13.686,8.585,13.054,18");
    noise.setAttributeNS(null , "transform" , "translate(0 -61.185)");
    noise.setAttributeNS(null , "fill" , "#ffac33");

    feet.setAttributeNS(null , "d" , "M-533.121-105.421a5.693,5.693,0,0,1-3.814-7.093l.416-1.372-4.469,4.446a5.686,5.686,0,0,1-8.05-.012,5.692,5.692,0,0,1,.012-8.05l8.067-8.038s-12.052-12.1-12.041-20.147l.017-8.056c4.03-4.014,5.812,5.84,8.038,8.067,0,0,3.461,12.632,16.754,13.094a5.6,5.6,0,0,1,3.256-.1,5.694,5.694,0,0,1,3.815,7.094l-4.907,16.356a5.694,5.694,0,0,1-5.451,4.056A5.714,5.714,0,0,1-533.121-105.421Zm39.481-2.693a5.684,5.684,0,0,1-4.731-6.513l.222-1.418-3.831,5a5.683,5.683,0,0,1-7.976,1.065,5.684,5.684,0,0,1-1.065-7.981L-504.1-127s-13.566-10.378-14.631-18.354l-1.065-7.981c3.456-4.526,6.541,5,9.046,6.917,0,0,5.124,12.052,18.359,10.731a5.5,5.5,0,0,1,3.211-.541,5.693,5.693,0,0,1,4.731,6.518l-2.676,16.862a5.684,5.684,0,0,1-5.609,4.8A5.742,5.742,0,0,1-493.64-108.114Z");
    feet.setAttributeNS(null , "transform" , "translate(652.032 264.833)");
    feet.setAttributeNS(null , "fill" , "#ffac33");

    body.setAttributeNS(null , "d" , "M-459.909-6.613q-3.112,0-6.355-.2l-.473-.03c-26.678-1.8-49.751-20.792-54.757-45.725a54.1,54.1,0,0,1-31.383-52.8c2.009-29.8,27.506-48.069,57.307-46.062v-.005s35.558,1.446,44.393-2.715c7.072-3.324,3.329,9.354-8.357,17.058a37.256,37.256,0,0,0,10.389-2.45c6.8-3.2,3.595,8.4-7.054,16.146a46.268,46.268,0,0,1,5.773,24.934,65.485,65.485,0,0,1-4.045,18.886c7.407,4.437,12.148,10.732,11.611,18.71-.148,2.205-.239,4.38-.29,6.513a89.813,89.813,0,0,0,25.236,5.293c7.588.507,18.422-.9,25.789-2.579a5.329,5.329,0,0,1,5.573,2.681,5.706,5.706,0,0,1-.16,6.188c-1.061,1.539-25.373,36.151-73.194,36.154Z");
    body.setAttributeNS(null , "transform" , "translate(580.353 133.033)");
    body.setAttributeNS(null , "fill" , color);

    eye.setAttributeNS(null , "d" , "M139.882,53.838a11.386,11.386,0,1,1-10.594-12.126,11.387,11.387,0,0,1,10.594,12.126");
    eye.setAttributeNS(null , "transform" , "translate(-70.248 -37.989)");
    eye.setAttributeNS(null , "fill" , "#292f33");

    wing.setAttributeNS(null , "d" , "M358.639,37.334a5.111,5.111,0,0,0-5.978,1.389c-.307.319-24.052,35.905-82.729,28.146C268,66.613,287.8,135,288.144,134.968c.706-.086,17.477-2.1,34.949-14.534,16.043-11.414,35.78-34.112,38.695-77.412a5.661,5.661,0,0,0-3.148-5.688");
    wing.setAttributeNS(null , "transform" , "translate(-262.353 -36.882)");
    wing.setAttributeNS(null , "fill" , color);

    wingaccent.setAttributeNS(null , "d" , "M251.672,139.128s43.437,32.154,70.518-25.385c2.255-4.793,9.587,4.515.563,23.694s-46.539,36.662-68.542,8.744c-4.64-5.892-2.539-7.053-2.539-7.053");
    wingaccent.setAttributeNS(null , "transform" , "translate(-251.197 -82.231)");
    wingaccent.setAttributeNS(null , "fill" , colorAccent);

    birdNet.setAttribute("viewBox" , "0 0 128.985 111");
    birdNet.setAttribute("class" , "bird-net display-none");
    globalContainerNet.setAttribute("transform" , "translate(3.986 0)");
    
    noiseNet.setAttributeNS(null , "d" , "M36.214,93.907c-.474,7.053,7.549,13.347-3.04,12.634S-.283,95.726,0,91.465,15.839,79.7,26.423,80.411s10.264,6.439,9.79,13.5");
    noiseNet.setAttributeNS(null , "transform" , "translate(14.527 -52.674) rotate(10)");
    noiseNet.setAttributeNS(null , "fill" , "#ffac33");

    bodyNet.setAttributeNS(null , "d" , "M55.5,108.5A53.015,53.015,0,0,1,34.871,6.664a53.014,53.014,0,0,1,41.258,97.672A52.666,52.666,0,0,1,55.5,108.5Z");
    bodyNet.setAttributeNS(null , "transform" , "translate(14)");
    bodyNet.setAttributeNS(null , "fill" , color);

    wingNet.setAttributeNS(null , "d" , "M251.553,132.471s32.578,24.115,52.889-19.039c1.691-3.6,7.19,3.386.423,17.77s-34.9,27.5-51.407,6.558c-3.48-4.419-1.9-5.29-1.9-5.29");
    wingNet.setAttributeNS(null , "transform" , "translate(-200.785 -64.223)");
    wingNet.setAttributeNS(null , "fill" , colorAccent);

    eyeNet.setAttributeNS(null , "d" , "M134.116,50.758a8.5,8.5,0,1,1-7.909-9.052,8.5,8.5,0,0,1,7.909,9.052");
    eyeNet.setAttributeNS(null , "transform" , "translate(-59.97 -7.669)");
    eyeNet.setAttributeNS(null , "fill" , "#292f33");

    net.setAttributeNS(null , "d" , "M-1141.633-229.124a55.5,55.5,0,0,1,55.5-55.5,55.5,55.5,0,0,1,55.5,55.5,55.5,55.5,0,0,1-55.5,55.5A55.5,55.5,0,0,1-1141.633-229.124Zm19.791,35.709a50.35,50.35,0,0,0,16.054,10.825,50.2,50.2,0,0,0,19.655,3.965,50.2,50.2,0,0,0,19.655-3.965,50.356,50.356,0,0,0,16.053-10.825,50.341,50.341,0,0,0,10.825-16.053,50.187,50.187,0,0,0,3.966-19.656c0-.057,0-.114,0-.172h-8.5c0,.032,0,.064,0,.1a194.352,194.352,0,0,1-1.264,19.929l2.523-.022s-.877.234-2.59.6q-.508,4.3-1.208,8.574v-8.326a184.941,184.941,0,0,1-19.72,2.692q-.683,8.338-1.807,16.635h11.066q-5.611.848-11.258,1.4-.294,2.1-.615,4.194v-4.135q-8.679.815-17.407.918-8.486-.086-16.935-.892v5.109q-.4-2.589-.753-5.182-5.533-.549-11.031-1.407h10.842q-1.054-7.969-1.7-15.981c-8.968-.426-15.669-1.171-20.3-1.853v6.835q-.423-3.468-.75-6.947c-2.124-.325-3.768-.631-4.953-.874A50.343,50.343,0,0,0-1121.842-193.415Zm52.835,4.291v-16.42c-6.137.471-13.3.791-21.407.791-4.716,0-9.023-.089-12.935-.239v15.868Zm-67.626-40a50.171,50.171,0,0,0,3.966,19.656q.206.487.422.969l5.071-.045q-.885-10.06-.96-20.169.008-.815.02-1.63c-4.056-.24-6.875-.466-8.487-.61Q-1136.632-230.041-1136.633-229.124Zm10.343,20.572,20.026-.178q-.653-9.428-.743-18.886.011-.949.027-1.9c-7.99-.183-14.414-.456-19.31-.725Zm22.941-.2,34.342-.305V-229.3h-18q-8.974,0-16.339-.144Zm38-19.86q-.093,9.777-.788,19.53l19.465-.173V-229.3h-18.685Q-1065.353-228.956-1065.349-228.616Zm29.716-.709a50.175,50.175,0,0,0-3.966-19.454,50.341,50.341,0,0,0-10.825-16.053,50.341,50.341,0,0,0-16.053-10.825,50.185,50.185,0,0,0-19.655-3.966,50.182,50.182,0,0,0-19.655,3.966,50.251,50.251,0,0,0-10.1,5.722q6.061-.879,12.162-1.408.184-1.324.378-2.648v2.615q7.73-.656,15.5-.747,9.445.095,18.845,1.083v-3.951q.294,2,.565,4.012,4.667.5,9.309,1.228h-9.146q1,7.622,1.662,15.28a198.714,198.714,0,0,1,19.944,2.495v-6.147q.521,3.154.935,6.321c3.207.609,4.864,1.051,4.864,1.051l-4.734-.042a191.1,191.1,0,0,1,1.471,21.321Zm-11.039-.192V-250.8l-19.66-.175q.8,10.549.967,21.136Zm-22.334-.388V-251l-34.342-.305v20.8Zm-37.953-.66q.21-10.4,1.042-20.765l-20.372-.181v20.61Zm-21.144-.368q.177-10.31,1.125-20.584l-4.413-.039q-.677,1.366-1.274,2.777a50.062,50.062,0,0,0-3.929,17.7Zm6.262-33.9a50.372,50.372,0,0,0-9.414,13c.891-.2,2.343-.507,4.387-.853q.263-2.724.58-5.443v5.347a193.191,193.191,0,0,1,20.673-2.082q.675-7.462,1.672-14.893h-12.2A50.913,50.913,0,0,0-1121.842-264.832Zm52.835,10.185v-15.1h-34.342v14.782c4.43-.2,9.4-.323,14.935-.323C-1081.167-255.293-1074.683-255.037-1069.006-254.647Z");
    net.setAttributeNS(null , "transform" , "translate(1155.633 284.624)");
    net.setAttributeNS(null , "fill" , "#404040");

    wingContainer.appendChild(wing);
    wingContainer.appendChild(wingaccent);
    wingContainer.classList.add("anim-flying");
    globalContainer.appendChild(noise);
    globalContainer.appendChild(feet);
    globalContainer.appendChild(body);
    globalContainer.appendChild(eye);
    globalContainer.appendChild(wingContainer);
    globalContainerNet.appendChild(noiseNet);
    globalContainerNet.appendChild(bodyNet);
    globalContainerNet.appendChild(wingNet);
    globalContainerNet.appendChild(eyeNet);
    globalContainerNet.appendChild(net);
    bird.appendChild(globalContainer);
    birdNet.appendChild(globalContainerNet);
    birdContainer.appendChild(bird);
    birdContainer.appendChild(birdNet);
    document.body.appendChild(birdContainer);

    // create the animation for the bird
    birds.push(setInterval(UpdateBird , 100 , [ birdContainer , direction , step]))
    birdContainer.addEventListener('click' , function() { CaptureBird(birdContainer) } );
}
function Generator(){
    let randomColor = colors[Math.round(Math.random() * (colors.length - 1) )];
    let randomWidth = Math.round(Math.random() * 150 ) + 100;
    let randomDirection = directions[Math.round(Math.random())];
    let randomStep = Math.round(Math.random() * 100 ) + 50;
    console.log(randomColor , randomWidth , randomDirection , randomStep);
    GenerateBird( randomColor , '#000000' , randomWidth , randomDirection , randomStep);
}
function ThrowNet(){
    let mouseX = window.event.clientX;
	let mouseY = window.event.clientY;

    audioNet.play();
    let net = document.createElement("img");
	net.setAttribute('id' , 'net');
	net.setAttribute('src' , 'Assets/net.png');
    net.style.position = "absolute";
	net.style.left = (mouseX - 100).toString()+"px";
	net.style.top = (mouseY - 100).toString()+"px";
	document.body.appendChild(net);
    setTimeout( function() { document.body.removeChild(document.getElementById("net")); } , 500);
}
function CaptureBird(obj){
    
    console.log("[CaptureBird] ("+ obj.getAttribute("data") +") bird was captured");
    clearInterval(birds[obj.getAttribute("data")]);
    obj.children[0].classList.add("display-none");
    obj.children[1].classList.remove("display-none");
    obj.style.top = window.visualViewport.height + "px";
    score += 100;
    document.getElementById("score").innerHTML = score;
    setTimeout( RemoveBird , 500 , obj );
}
function Hunter(){
    
}

// main
window.addEventListener("click" , ThrowNet);
let timer = setInterval(Timer, 1000);
let generator = setInterval( Generator , 1000);


// TO DO
// create the hunter function with the generator