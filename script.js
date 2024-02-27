// const questions = [
//     {
//         question:'Which is the largest animal in the world?',
//         answers : [
//             {text:'Shark',iscorrect : false},
//             {text:'Cat',iscorrect : false},
//             {text:'Blue Whale',iscorrect : true},
//             {text:'Elephant',iscorrect : false},
//         ]
//     },
//     {
//         question:'Which is the smallest country in the world?',
//         answers : [
//             {text:'Vatican City',iscorrect : true},
//             {text:'Bhutan',iscorrect : false},
//             {text:'Nepal',iscorrect : false},
//             {text:'Brunei',iscorrect : false},
//         ]
//     },
//     {
//         question:'Which is the largest desert in the world?',
//         answers : [
//             {text:'Rajasthan Desert',iscorrect : false},
//             {text:'Gobi Desert',iscorrect : false},
//             {text:'Arabian Desert',iscorrect : false},
//             {text:'Sahara Desert',iscorrect : true},
//         ]
//     },
//     {
//         question:'Which is the smallest continent in the world?',
//         answers : [
//             {text:'Europe',iscorrect : false},
//             {text:'Australia',iscorrect : true},
//             {text:'Africa',iscorrect : false},
//             {text:'Antartica',iscorrect : false},
//         ]
//     },

// ];

// const questionElement = document.querySelector("#question");
// const answerButton = document.querySelector(".answer-buttons");
// const nextButton = document.querySelector("#next-btn");

// let currentQuestionIndex = 0;
// let score = 0;

// function startQuiz(){
//     currentQuestionIndex = 0;
//     score = 0;
//     nextButton.innerHTML = "Next";
//     showQuestion();
// }
// function showQuestion(){
//     resetState();
//     let currentQuestion = questions[currentQuestionIndex];
//     let questionNo = currentQuestionIndex+1;
//     questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

//     currentQuestion.answers.forEach(answer =>{
//         const button = document.createElement("button");
//         button.innerHTML = answer.text;
//         button.classList.add("btn");
//         answerButton.appendChild(button);
//         if(answer.iscorrect){
//             button.dataset.iscorrect = answer.iscorrect;
//         }
//         button.addEventListener('click',selectAnswer);
//     })
// }

// function resetState(){
//     nextButton.style.display ="none";
//     while(answerButton.firstChild){
//         answerButton.removeChild(answerButton.firstChild);
//     }
// };
// function selectAnswer(e){
//     const selectedBtn = e.target;
//     const isCorrect = selectedBtn.dataset.iscorrect =='true' ;
//     console.log(isCorrect)
//     if(isCorrect){
//         selectedBtn.classList.add("correct");
//         score++;
//     }
//     else{
//         selectedBtn.classList.add("incorrect");
//     }
//     Array.from(answerButton.children).forEach(button=>{
//         if(button.dataset.iscorrect =='true'){
//             button.classList.add("correct");
//         }
//         button.disabled = true;
//     });
//     nextButton.style.display ="block";

// };

// function handleNextButton(){
//     currentQuestionIndex++;
//     if(currentQuestionIndex< questions.length){
//         showQuestion();
//     }
//     else{
//         showScore();
//     }
// };

// function showScore(){
//     resetState();
//     questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display = 'block';
// }
// nextButton.addEventListener('click',()=>{
//     if(currentQuestionIndex < questions.length){
//         handleNextButton();
//     }
//     else{
//         startQuiz();
//     }
// });

// startQuiz();
 
const apiKey = "H8jDaJmTsGgsEyEF36e6ZKTwe3xRrCs7CTHkXuID";
const apiUrl = "https://quizapi.io/api/v1/questions?category=sql&limit=10&apiKey=";
// https://quizapi.io/api-config
const questionElement = document.querySelector("#question");
const answerButton = document.querySelector(".answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}
function resetState() {
	nextButton.style.display = "none";
	while (answerButton.firstChild) {
		answerButton.removeChild(answerButton.firstChild);
	}
}
async function showQuestion() {
	resetState();
	const response = await fetch(apiUrl + apiKey);
	if (response.status == 404) {
		console.log("error in getting data");
	} else {
        questionElement.style.transition = "ease-in-out 0.3s";
		var data = await response.json();
		let currentQuestion = data[currentQuestionIndex];
		let questionNo = currentQuestionIndex + 1;
        
		questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

		let answers = currentQuestion.answers;
        let correctAnswers = currentQuestion.correct_answers;
        Object.keys(answers).forEach(key => {
            // console.log(`${key}: ${answers[key]}`);
            const button = document.createElement("button");
            if(answers[key]!=null){
				button.innerHTML = answers[key];
				button.classList.add("btn");
				answerButton.appendChild(button);
                button.dataset.iscorrect = correctAnswers[key+'_correct']
                console.log(button.dataset)
            }
            button.addEventListener('click',selectAnswer);
        });
	}
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.iscorrect =='true' ;
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
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< 10){
        showQuestion();
    }
    else{
        showScore();
    }
};
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${10}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = 'block';
}
nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < 10){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
