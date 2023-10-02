//start screen with button done
//eventlisten on button done 
//when button clicked start quiz done 
//timer counts down one second itervals done
//eventlisten on each answer done 
//if right new question done 
//if wrong subtract from time and next question done
//game over when time =0 go to high score screen done
//game over if end of questions done 
//high score screen box for user to enter intitals done
//save to local storage activity 26 done
//records high score done


// put question and answers in obejct
//put all questions in array
//show and remove text based of button presses

var startQuiz=document.querySelector("#start-quiz");

var startButton=document.querySelector(".start-button");

var questionSection=document.querySelector("#questions");

var highScoreSection=document.querySelector("#highscore");

var scoreScreen=document.querySelector("#score-screen")

var answersId=document.querySelector("#answers");

var timeEl=document.querySelector(".timer");

var scoreList=document.querySelector("#scores");

var saveButton;

var replayButtonId;

var initialsInput;

var initials=[];

var scores=[];

var scoreCorrect=0;

var questionCounter=0;

var secondsLeft=75;

var questions={
    q1:{question1:"Which of theses is not a git command?",
    answers:["git pull","git add","git commit","git back"],
    },
    q2:{question2:"Which of these is not a semantic html element?",
    asnwers:["<article>","<section>","<div>","<nav>"],
    },
    q3:{question3:"Which selects an id in a CSS file?",
    answers:["a #","a .","a space","a -"],
    },
    q4:{question4:"Which of these does not go around content?",
    asnwers:["fill","padding","margin","border"],
    },
    q5:{question5:"Which of these is flex not a shorthand for?",
    answers:["flex-basis","flex-display","flex-grow","flex-shrink"],
    },
    q6:{question6:"Which of these is not a JavaScript datatype?",
    asnwers:["string","bigint","char","symbol"],
    },
}
var correctAnswers=[3,2,0,0,1,2];

var questionsArr=[[questions.q1.question1,questions.q1.answers],[questions.q2.question2,questions.q2.asnwers],
[questions.q3.question3,questions.q3.answers],[questions.q4.question4,questions.q4.asnwers],
[questions.q5.question5,questions.q5.answers],[questions.q6.question6,questions.q6.asnwers]];

var timeInterval;


// console.log(questionsArr[0]);
// console.log(questionsArr);

scoreScreen.addEventListener("click",function(){
    var noScore=1;
    highScore(noScore);
})

// console.log(questionSection);
startButton.addEventListener("click",function(event){
    // event.stopPropagation();
    // mainTag.setAttribute("style","color:blue");
    scoreScreen.style.display="none";
    startQuiz.style.display="none";
    
    // startQuiz.textContent="";
    setTime();
    displayQuestions();
})

answersId.addEventListener("click",function(event){
    var element=event.target;
    if(element.matches("li")){
        // console.log(element.getAttribute("data-number"))
        questionCounter++;
        displayQuestions();
    }

    checkAnswer(element.getAttribute("data-number"));


})

function displayQuestions() {
    questionSection.style.display="block";

    // console.log("test")
    // console.log(test);
    if (questionCounter>5){
        highScore();
        return;
    }
    // console.log(questionCounter)
    questionSection.children[0].textContent=questionsArr[questionCounter][0];
    for (let i = 0; i < 4; i++) {

        questionSection.children[1].children[i].textContent=[i+1]+". "+ questionsArr[questionCounter][1][i];
    
    }
    // console.log(answer);
}

function setTime(){
    timeEl.textContent="Time Remaining: " +secondsLeft;
    timeInterval =setInterval(function(){
        secondsLeft--;
        timeEl.textContent="Time Remaining: " +secondsLeft;

        if(secondsLeft<=0){
            clearInterval(timeInterval);
            console.log("out of time")
            highScore();
        }
    },1000);
}

function highScore(check){
    // console.log("high score")
    var h1=document.createElement('h1');
    h1.textContent="Scores";
    highScoreSection.appendChild(h1);

    timeEl.textContent="";
    questionSection.style.display="none";
    scoreScreen.style.display="none";
    startQuiz.style.display="none";
    if(check){
        console.log("works")
        storeScores();
        renderScores();
    }
    else{
    clearInterval(timeInterval);
    // console.log(secondsLeft);

    // questionSection.children[0].textContent="";
    // for (let i = 0; i < 4; i++) {
    //     questionSection.children[1].children[i].textContent="";
    // }
    scoresText=secondsLeft+scoreCorrect;

    var p=document.createElement('p');
    var h2=document.createElement('h2');

    h2.textContent="Your score is "+ scoresText
    p.textContent="Enter your Initials and hit save to have your score added to the scoreboard."

    highScoreSection.appendChild(h2);
    highScoreSection.appendChild(p);
    // questionSection.textContent="";
    const form = document.createElement('form');
      
      // Add input fields to the form
      form.innerHTML = `
        <label for="initials">Initials:</label>
        <input type="text" id="initials" name="initials" placeholder="JH"/>
        <button id="save">Save</button>
      `;

      // Append the form to the form container
      highScoreSection.appendChild(form);

      saveButton=document.querySelector("#save");

      initialsInput=document.querySelector("#initials");
      storeScores();
      renderScores();
    //   console.log(saveButton);
      saveButton.addEventListener("click",function(event){
        event.preventDefault();
        initialsText = initialsInput.value;
        if(initialsText===""){
            return;
        }
        // localStorage.setItem("initials",initials);
        scores.push(scoresText);
        initials.push(initialsText);
        initialsInput.value="";
        // console.log(scores);
        storeScores();
        // renderScores();
        appendScore();
    })
    }
    replay();


}

function replay(){
    var replayButton=document.createElement("section")
    replayButton.innerHTML='<button id="replay">Replay</button>';
    highScoreSection.appendChild(replayButton);
    replayButtonId=document.querySelector("#replay");
    replayButtonId.addEventListener("click",function(event){
        event.preventDefault();
        highScoreSection.textContent="";
        scoreList.textContent="";
        console.log("works")
        scoreCorrect=0;
        secondsLeft=75;
        questionCounter=0;
        questionSection.style.display="block"
        setTime();
        displayQuestions();
        

    })

}


function appendScore(){
    // console.log("replace ")
    if(scores.length===1){
        // console.log("null")
        var score=scores[0];
        var initial=initials[0];
        var li=document.createElement("li")
        li.textContent=initial +" "+score;
        // console.log("initial" + initial);
        scoreList.appendChild(li);
    }
    else{
        console.log("length " +initials.length);

    // console.log(scores);
    // console.log(initials);
    var score=scores[initials.length-1];
    var initial=initials[initials.length-1];
    var li=document.createElement("li")
    // console.log(initial +" "+score);
    li.textContent=initial +" "+score;
    scoreList.appendChild(li);
}

// console.log("replace ")
// console.log(scoreList);
}


function renderScores(){

    for (var i = 0; i < initials.length; i++) { 
        // li.textContent="";
        var score=scores[i];
        var initial=initials[i];
        var li=document.createElement("li")
        li.textContent=initial +" "+score;
        // console.log("initial" + initial);
        scoreList.appendChild(li);
    }
    // console.log("render ")
    // console.log(scoreList);

}

function checkAnswer(answer){
    // var number=element.getAttribute("data-number");
    // console.log("works");
    // console.log("counter "+ questionCounter);
    // console.log( answer);
    // console.log("correct "+correctAnswers[questionCounter-1]);
    if(answer==correctAnswers[questionCounter-1]){
        scoreCorrect+=10;
        console.log(scoreCorrect);
    }
    else{
        console.log("wrong");
        secondsLeft -= 10;
    }


}


init();

function init(){
    questionSection.style.display="none";

    var storedinitials=JSON.parse(localStorage.getItem("initials"));
    var storedScores=JSON.parse(localStorage.getItem("scores"));

    if (storedScores !==null){
        scores=storedScores;
        initials=storedinitials
    }   
}

function storeScores(){
    localStorage.setItem("scores",JSON.stringify(scores));
    localStorage.setItem("initials",JSON.stringify(initials));
}
