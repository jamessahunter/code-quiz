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
//save to local storage activity 26
//records high score


// put question and answers in obejct
//put all questions in array
//show and remove text based of button presses

var startQuiz=document.querySelector(".start-quiz");

var startButton=document.querySelector(".start-button");

var questionSection=document.querySelector(".questions")

var answersClass=document.querySelector(".answers");

var questionCounter=0;

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

var questionsArr=[[questions.q1.question1,questions.q1.answers],[questions.q2.question2,questions.q2.asnwers]];
console.log(questionsArr[0]);
console.log(questionsArr[0][1][1]);



// console.log(questionSection);
startButton.addEventListener("click",function(event){
    event.stopPropagation();
    // mainTag.setAttribute("style","color:blue");
    startQuiz.textContent="";
    displayQuestions();
    // console.log(questionSection);
    // console.log(questionSection.children[1].children[0]);

    //maybe use event.target for ol activity 19

    
        // questionSection.children[0].textContent=questions.q1.question1;
        // questionSection.children[1].children[i].textContent=[i+1] + ". " + questions.q1.answers[i];
        // answersClass.children[i].addEventListener("click",function(){
        //     console.log([i]+" click answers works");
        // })
    // questionSection.children[1].children[0].textContent="works";
    console.log("button works");
})

answersClass.addEventListener("click",function(event){
    var element=event.target;
    if(element.matches("li")){
        console.log(element.getAttribute("data-number"))
        displayQuestions();
    }
})

function displayQuestions() {


    questionSection.children[0].textContent=questionsArr[questionCounter][0];
    for (let i = 0; i < 4; i++) {

        questionSection.children[1].children[i].textContent=[i+1] + ". " + questionsArr[questionCounter][1][i];
    
    }

    questionCounter++;
    
}