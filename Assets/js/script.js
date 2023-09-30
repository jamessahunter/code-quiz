//start screen with button done
//eventlisten on button done 
//when button clicked start quiz done 
//timer counts down one second itervals done
//eventlisten on each answer done 
//if right new question done 
//if wrong subtract from time and next question
//game over when time =0 go to high score screen
//game over if end of questions
//high score screen box for user to enter intitals
//save to local storage activity 26
//records high score


// put question and answers in obejct
//put all questions in array
//show and remove text based of button presses

var startQuiz=document.querySelector(".start-quiz");

var startButton=document.querySelector(".start-button");

var questionSection=document.querySelector(".questions");

var highScoreSection=document.querySelector(".highscore");

var answersClass=document.querySelector(".answers");

var timeEl=document.querySelector(".timer");



var questionCounter=0;

var secondsLeft=75;

var questions={
    q1:{question1:"hom many blah blah blalh q1",
    answers:["blank text a1","blank text a2","blank text a3","blank text a4"],
    },
    q2:{question2:"hom many blah blah blalh q2",
    asnwers:["blank text a1","blank text a2","blank text a3","blank text a4"],
    },
    q3:{question3:"hom many blah blah blalh q3",
    answers:["blank text a1","blank text a2","blank text a3","blank text a4"],
    },
    q4:{question4:"hom many blah blah blalh q4",
    asnwers:["blank text a1","blank text a2","blank text a3","blank text a4"],
    },
    q5:{question5:"hom many blah blah blalh q5",
    answers:["blank text a1","blank text a2","blank text a3","blank text a4"],
    },
    q6:{question6:"hom many blah blah blalh q6",
    asnwers:["blank text a1","blank text a2","blank text a3","blank text a4"],
    },
}
var correctAnswers=[0,1,2,3,0,2]

var questionsArr=[[questions.q1.question1,questions.q1.answers],[questions.q2.question2,questions.q2.asnwers],
[questions.q3.question3,questions.q3.answers],[questions.q4.question4,questions.q4.asnwers],
[questions.q5.question5,questions.q5.answers],[questions.q6.question6,questions.q6.asnwers]];

var timeInterval;


// console.log(questionsArr[0]);
// console.log(questionsArr);



// console.log(questionSection);
startButton.addEventListener("click",function(event){
    event.stopPropagation();
    // mainTag.setAttribute("style","color:blue");
    startQuiz.textContent="";
    setTime();
    displayQuestions();
})

answersClass.addEventListener("click",function(event){
    var element=event.target;
    if(element.matches("li")){
        // console.log(element.getAttribute("data-number"))
        displayQuestions();
    }
})

function displayQuestions() {
    if (questionCounter>5){
        highScore();
        return;
    }
    console.log(questionCounter)
    questionSection.children[0].textContent=questionsArr[questionCounter][0];
    for (let i = 0; i < 4; i++) {

        questionSection.children[1].children[i].textContent=[i+1] + ". " + questionsArr[questionCounter][1][i];
    
    }
    questionCounter++;

}

function setTime(){
    timeInterval =setInterval(function(){
        secondsLeft--;

        timeEl.textContent="Time Remaining " +secondsLeft;
        if(secondsLeft===0){
            clearInterval(timeInterval);
            highScore();
        }
    },1000);
}

function highScore(){
    console.log("high score")
    clearInterval(timeInterval);
    console.log(secondsLeft);
    timeEl.textContent="";
    questionSection.textContent="";
    const form = document.createElement('form');
      
      // Add input fields to the form
      form.innerHTML = `
        <label for="initials">Initials:</label>
        <input type="text" id="initials" name="initials" required>
      `;

      // Append the form to the form container
      highScoreSection.appendChild(form);

}

