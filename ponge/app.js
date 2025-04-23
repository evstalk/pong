//stuff

window.addEventListener('DOMContentLoaded', function () {

var paddlePlayer = 
{
    xPos: 50,
    yPos: 50,
    score: 0,
    body: document.querySelector(".playerpaddle")
}
var paddleEnemy = 
{
    xPos: 50,
    yPos: 50,
    speed: 5,
    score: 0,
    body: document.querySelector(".opponent")
}

var speed = 10;
var fastness = 0.6;
var offset = 10
var ball = 
{
    velocity: 
    {
        x: 5,
        y: 5
    },
    xPos: 100,
    yPos: 100,
    score: 0,
    body: document.querySelector(".ball")
}
var redtext = document.querySelector(".redScore");
var bluetext = document.querySelector(".blueScore");
redtext.classList.add("scoreRed");
bluetext.classList.add("scoreBlue");



paddlePlayer.body.classList.add("rectangle");
paddleEnemy.body.classList.add("evil");
ball.body.classList.add("ball");

//over lapp

function isOverlapping(element1, element2) { 
    const rect1 = element1.getBoundingClientRect(); 
    const rect2 = element2.getBoundingClientRect(); 
 
    return !( 
        rect1.right < rect2.left ||    // Element 1 is left of Element 2 
        rect1.left > rect2.right ||     // Element 1 is right of Element 2 
        rect1.bottom < rect2.top ||     // Element 1 is above Element 2 
        rect1.top > rect2.bottom         // Element 1 is below Element 2 
    ); 
} 



function resetBall()
{
    ball.xPos = Math.random() * 1500;
    ball.yPos = Math.random() * 700;
    if(ball.xPos >= 750)
    {
        ball.xPos -= 475;
        ball.velocity.x = -5;
        ball.velocity.y = -5;
    }
    else
    {   
        ball.xPos += 475;
        ball.velocity.x = 5;
        ball.velocity.y = 5;
    }
}




function delay(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function update()
{
    while(true)
    {
        //random pos/neg number
        var random = Math.random();
        if(random - 0.5 <= 0)
        {
            random = -1;
        }
        else
        {
            random = 1;
        }
        //wall code
        if(ball.yPos >= 700 && ball.velocity.y > 0)
        {
            ball.velocity.y *= -1;
            ball.velocity.y -= fastness * Math.random();
            ball.yPos -= 10;
        }
        else if (ball.yPos <= 0 && ball.velocity.y < 0)
        {
            ball.velocity.y *= -1;
            ball.velocity.y += fastness * Math.random();
            ball.yPos += 1;
            
        }
        if(ball.xPos >= 1480 && ball.velocity.x > 0)
        {
            ball.velocity.x *= -1;
            ball.velocity.x -= fastness * Math.random();
            ball.yPos -= 1;
            paddlePlayer.score++;
            resetBall();
        }
        else if (ball.xPos <= 0 && ball.velocity.x < 0)
        {
            ball.velocity.x *= -1;
            ball.velocity.x += fastness * Math.random();
            ball.xPos += 1;
            paddleEnemy.score++;
            resetBall();
        }

        if(ball.velocity.x <= 0.1 && ball.velocity.x >= 0)
        {
            ball.velocity.x += fastness;
        }

        if(ball.velocity.x >= -0.1 && ball.velocity.x <= 0)
        {
            ball.velocity.x += fastness;
        }

        if(ball.velocity.y <= 0.1 && ball.velocity.y >= 0)
        {
            ball.velocity.y += fastness;
        }

        if(ball.velocity.y >= -0.1 && ball.velocity.y <= 0)
        {
            ball.velocity.y += fastness;
        }

        //update positions
        ball.xPos += ball.velocity.x;
        ball.yPos += ball.velocity.y;
        //RaNdOm CoNteNt
        //standardbaHHHHHHHHHHH
        ball.body.style.top = ball.yPos + "px";
        ball.body.style.left = ball.xPos + "px";

        //other guy (wip)
        
        if(ball.yPos > paddleEnemy.yPos + offset)
        {
            if(!(ball.yPos - paddleEnemy.yPos < 10))
            {
                paddleEnemy.yPos += paddleEnemy.speed;
                paddleEnemy.body.style.top = paddleEnemy.yPos + "px";
            }
            
        }
        else if (ball.yPos < paddleEnemy.yPos + offset)
        {
            if(!(ball.yPos - paddleEnemy.yPos > -10))
            {
                paddleEnemy.yPos -= paddleEnemy.speed;
                paddleEnemy.body.style.top = paddleEnemy.yPos + "px";
            }
            
        }

        //bonk!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if(isOverlapping(ball.body, paddlePlayer.body))
        {
            var random = Math.random();
            var random2 = 1;
            if(random - 0.5 <= 0)
            {
                random2 *= -1 - (fastness / 5);
            }
            else
            {
                random2 *= 1 + (fastness / 5);
            }
            
            random2 *= Math.random;
            ball.velocity.x *= -1;
            ball.velocity.y *= random * (2 + fastness);
            //random * 2;
        }
        if(isOverlapping(ball.body, paddleEnemy.body))
        {
            var random = Math.random();
            var random2 = 1;
            if(random - 0.5 <= 0)
            {
                random2 *= -1;
            }
            else
            {
                random2 *= 1;
            }
            random2 *= Math.random;
            ball.velocity.x *= -1;
            console.log(ball.velocity.y);
            ball.velocity.y *= random * (2 + fastness);
            console.log(ball.velocity.y);
        }

        //spooky loop thing
        await delay(10);
        

        //score code
        redtext.textContent = paddleEnemy.score;
        bluetext.textContent = paddlePlayer.score;
        localStorage.setItem("scorePlayer", paddlePlayer.score);
        localStorage.setItem("scoreEnemy", paddleEnemy.score);
    }
    
}

document.addEventListener('keydown', function(event)
{
    console.log(event.key);
    if(event.key == "s")
    {
        paddlePlayer.xPos += speed;
        paddlePlayer.body.style.top = paddlePlayer.xPos + "px";
        //once relevant code
        /* var temp1 = paddlePlayer.xPos;
        var temp2 = paddlePlayer.body.style.top;
        
        if(isOverlapping(paddlePlayer.body, ball.body))
        {
            paddlePlayer.xPos = temp1
            paddlePlayer.body.style.top = temp2
        }
        */
    } 
    else if (event.key == "w")
    {
        
        paddlePlayer.xPos -= speed;
        paddlePlayer.body.style.top = paddlePlayer.xPos + "px";
        
    }
    else if (event.key == "a")
    {
        
        paddlePlayer.yPos -= speed;
        paddlePlayer.body.style.left = paddlePlayer.yPos + "px";
        
    }
    else if (event.key == "d")
    {
        
        paddlePlayer.yPos += speed;
        paddlePlayer.body.style.left = paddlePlayer.yPos + "px";
        
    }
});

    if(localStorage.getItem("scorePlayer") == null)
    {
        localStorage.setItem("scorePlayer", 0)
        localStorage.setItem("scorePlayer", 0)
    }
    else
    {
        paddlePlayer.score = localStorage.getItem("scorePlayer");
        paddleEnemy.score = localStorage.getItem("scoreEnemy");
    }
    
    update();

});