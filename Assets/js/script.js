// selects all classes and ids from html
var startQuiz=document.querySelector("#start-quiz");
var startButton=document.querySelector(".start-button");
var questionSection=document.querySelector("#questions");
var scoreSection=document.querySelector("#score-section");
var seeScores=document.querySelector("#see-scores")
var answersId=document.querySelector("#answers");
var timeEl=document.querySelector(".timer");
var scoreList=document.querySelector("#scores");
// creates and initilizes some variables
var saveButton;
var replayButtonId;
var initialsInput;
var initials=[];
var scores=[];
var scoreCorrect=0;
var questionCounter=0;
var secondsLeft=75;
var correctAnswers=[3,2,0,0,1,2];
var timeInterval;
// creates an object for the questions
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

// uses the questions object to create an array of the questions and answers
var questionsArr=[[questions.q1.question1,questions.q1.answers],[questions.q2.question2,questions.q2.asnwers],
[questions.q3.question3,questions.q3.answers],[questions.q4.question4,questions.q4.asnwers],
[questions.q5.question5,questions.q5.answers],[questions.q6.question6,questions.q6.asnwers]];

// initial funtion to start code
function init(){
    //hides questions section
    questionSection.style.display="none";
    //creates and initilizes the storage varaibles and retrives them from storage
    //parses the strings into arrays
    var storedinitials=JSON.parse(localStorage.getItem("initials"));
    var storedScores=JSON.parse(localStorage.getItem("scores"));
    //if there are storeded scores it sets them equal to there counter parts
    if (storedScores !==null){
        scores=storedScores;
        initials=storedinitials
    }   
}

// adds and event listener to the see score text 
seeScores.addEventListener("click",function(){
    //means the user will only be able to see the scores not enter a score
    var noScore=1;
    //calls scoreScreen function
    scoreScreen(noScore);
})

// events listener for the start button
startButton.addEventListener("click",function(event){
    // stops displaying the start quiz info and see scores text
    seeScores.style.display="none";
    startQuiz.style.display="none";
    
    //calls set time and display questions funtion
    setTime();
    displayQuestions();
})

//displays the questions and answers
function displayQuestions() {
    //allows the question section to be seen
    questionSection.style.display="block";
    //checks if all questions have been answered
    if (questionCounter>5){
        //calls score screen function
        scoreScreen();
        return;
    }
    //displays the questions and there corresponding answers
    questionSection.children[0].textContent=questionsArr[questionCounter][0];
    for (let i = 0; i < 4; i++) {
        questionSection.children[1].children[i].textContent=[i+1]+". "+ questionsArr[questionCounter][1][i]; 
    }
}

//sets the time 
function setTime(){
    //sets up text next to remaining time
    timeEl.textContent="Time Remaining: " +secondsLeft;
    //function to count down every second
    timeInterval =setInterval(function(){
        //reduces time by one second
        secondsLeft--;
        //displays time
        timeEl.textContent="Time Remaining: " +secondsLeft;
        //checks if time has reached or exceeded zero
        if(secondsLeft<=0){
            scoreScreen();
        }
    },1000);
}

//event listener for a click on any answer
answersId.addEventListener("click",function(event){
    //retrieves what the element that was clicked
    var element=event.target;
    //checks the elememnt clicked is a li
    if(element.matches("li")){
        // increases the counter by one
        questionCounter++;
        //calls the display question
        displayQuestions();
    }
    //calls check answer function
    checkAnswer(element.getAttribute("data-number"));
})

//function to check the answers
function checkAnswer(answer){
    //checks to see if the clicked answer if correct comparing it to the array
    if(answer==correctAnswers[questionCounter-1]){
        //adds 10 to the score
        scoreCorrect+=10;
    }
    else{
        //decreases the time by 10 seconds for a wrong answer
        secondsLeft -= 10;
    }
}

//displays the scores
function scoreScreen(check){
    //inserts header
    var h1=document.createElement('h1');
    h1.textContent="Scores";
    scoreSection.appendChild(h1);
    // clears any other text
    timeEl.style.display="none";
    questionSection.style.display="none";
    seeScores.style.display="none";
    startQuiz.style.display="none";
    // checks for score screen button pressed
    if(check){
        //retrives and renders scores
        storeScores();
        renderScores();
    }
    else{
          //stops the timer from running
        clearInterval(timeInterval);
        //adds the remaining time to the correct score
        scoresText=secondsLeft+scoreCorrect;
        //creates elements and appends them to the page
        var p=document.createElement('p');
        var h2=document.createElement('h2');
        h2.textContent="Your score is "+ scoresText
        p.textContent="Enter your Initials and hit save to have your score added to the scoreboard."
        scoreSection.appendChild(h2);
        scoreSection.appendChild(p);
        //creates a form
        var form = document.createElement('form');
        // Add input fields to the form
        form.innerHTML = `
            <label for="initials">Initials:</label>
            <input type="text" id="initials" name="initials" placeholder="JH"/>
            <button id="save">Save</button>
        `;
        // Append the form to the page
        scoreSection.appendChild(form);
        // selects classes for newly created elements
        saveButton=document.querySelector("#save");
        initialsInput=document.querySelector("#initials");
        //retrives and renders scores
        storeScores();
        renderScores();
        //adds an event listener to the save button
        saveButton.addEventListener("click",saveButtonClicked)
    }
    //calls the replay function
    replay();
}

//converts the arrays into strings
function storeScores(){
    localStorage.setItem("scores",JSON.stringify(scores));
    localStorage.setItem("initials",JSON.stringify(initials));
}

//renders the scores
function renderScores(){
    //iterates through the string and creates a list item and appends it to the page
    for (var i = 0; i < initials.length; i++) { 
        var score=scores[i];
        var initial=initials[i];
        var li=document.createElement("li")
        li.textContent=initial +" "+score;
        scoreList.appendChild(li);
    }

}

//if the save button has been clicked
function saveButtonClicked(event){
    //prevents default form from being used
    event.preventDefault();
    //grabs the initials input
    initialsText = initialsInput.value;
    //checks to see if something has been entered into the box
    if(initialsText===""){
        return;
    }
    //pushes the initials and scores the their respective arrays
    scores.push(scoresText);
    initials.push(initialsText);
    //resets the intials input values
    initialsInput.value="";
    //calls retrieve scores and append scores
    storeScores();
    appendScore();
}

//apends the new score to the page
function appendScore(){
    //takes the newlyy entered score and adds it to the end of the list
    var score=scores[initials.length-1];
    var initial=initials[initials.length-1];
    var li=document.createElement("li")
    li.textContent=initial +" "+score;
    scoreList.appendChild(li);
}

//replay functioms
function replay(){
    //creates a new section insided of the score sections and appends the replay button
    var replayButton=document.createElement("section");
    replayButton.innerHTML='<button id="replay">Replay</button>';
    scoreSection.appendChild(replayButton);
    replayButtonId=document.querySelector("#replay");
    //creates an event listener on the replay button
    replayButtonId.addEventListener("click",replayClicked)
}

//function for replay button clicked on
function replayClicked(event){
    //resets the score and text content so it doesn't get duplicated when the score screen apears again
    scoreSection.textContent="";
    scoreList.textContent="";
    //resets score time and seconds remaining
    scoreCorrect=0;
    secondsLeft=75;
    questionCounter=0;
    //displays the timer and question sections
    timeEl.style.display="block"
    questionSection.style.display="block"
    //calls the set time funtion
    setTime();
    //calls the display question function
    displayQuestions();
}

//runs initial function
init();


