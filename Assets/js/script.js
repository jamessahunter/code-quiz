//start screen with button
//eventlisten on button
//when button clicked start quiz
//timer counts down one second itervals
//eventlisten on each answer
//if right new question
//if wrong subtract from time and next question
//game over when time =0 go to high score screen
//game over if end of questions
//high score screen box for user to enter intitals
//records high score


// put question and answers in obejct
//put all questions in array
//show and remove text based of button presses

var startQuiz=document.querySelector(".start-quiz");

var startButton=document.querySelector(".start-button");

var questionSection=document.querySelector(".questions")

var questions={
    q1:{question1:"hom many blah blah blalh q1",
    answers:["blank text a1","blank text a2","blank text a3","blank text a4"],
    correct:1
    },
    q2:{question2:"hom many blah blah blalh q2",
    asnwers:["blank text a1","blank text a2","blank text a3","blank text a4"],
    correct:0
    },
}

// console.log(questionSection);
startButton.addEventListener("click",function(event){
    event.stopPropagation();
    // mainTag.setAttribute("style","color:blue");
    startQuiz.textContent="";
    // console.log(questionSection);
    // console.log(questionSection.children[1].children[0]);
    for (let i = 0; i < 4; i++) {
        questionSection.children[1].children[i].textContent=questions.q1.answers[i];

    }
    // questionSection.children[1].children[0].textContent="works";
    console.log("button works");
})

