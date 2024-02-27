const questions = [
    {
        question:'Which is the largest animal in the world?',
        answers : [
            {text:'Shark',iscorrect : false},
            {text:'Cat',iscorrect : false},
            {text:'Blue Whale',iscorrect : true},
            {text:'Elephant',iscorrect : false},
        ]
    },
    {
        question:'Which is the smallest country in the world?',
        answers : [
            {text:'Vatican City',iscorrect : true},
            {text:'Bhutan',iscorrect : false},
            {text:'Nepal',iscorrect : false},
            {text:'Brunei',iscorrect : false},
        ]
    },
    {
        question:'Which is the largest desert in the world?',
        answers : [
            {text:'Rajasthan Desert',iscorrect : false},
            {text:'Gobi Desert',iscorrect : false},
            {text:'Arabian Desert',iscorrect : false},
            {text:'Sahara Desert',iscorrect : true},
        ]
    },
    {
        question:'Which is the smallest continent in the world?',
        answers : [
            {text:'Europe',iscorrect : false},
            {text:'Australia',iscorrect : true},
            {text:'Africa',iscorrect : false},
            {text:'Antartica',iscorrect : false},
        ]
    },

];

const questionElement = document.querySelector("#question");
const answerButton = document.querySelector(".answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.iscorrect){
            button.dataset.iscorrect = answer.iscorrect;
        }
        button.addEventListener('click',selectAnswer);
    })
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
};
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.iscorrect =='true' ;
    console.log(isCorrect)
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.iscorrect =='true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";

};

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
};

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = 'block';
}
nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();