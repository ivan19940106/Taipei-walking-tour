let steps = document.getElementsByClassName('stepBox');
let card = document.getElementById('showCard');
let timerId;
let box = 0;

function showPostStep(){
    if(box < 5){
        for(i = 0; i < 5; i++ ){
            steps[i].style.backgroundImage = "url(./img/index/stepBoxWhite.png)";
        }
        steps[box].style.backgroundImage = "url(./img/index/stepBoxYellow.png)";
        card.src = `./img/index/postCart${box}.png`
        box++;
    }else{
        box = 0;
    }
    
}

window.addEventListener('load',function(){
    timerId = setInterval(showPostStep,1200);
});