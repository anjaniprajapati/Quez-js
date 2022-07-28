const startButton=document.getElementById("start-btn");
const nextButton=document.getElementById("next-btn");
const questionContainerElement=document.getElementById("question-container");
const questionElement=document.getElementById("question")
const answerButtonElement=document.getElementById("answer-buttons")

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click",startGame)
nextButton.addEventListener('click',()=>{
    currentQuestionIndex++;
    setNextQuestion()
})

function startGame(){
    console.log("Started")
    startButton.classList.add('hide');
    shuffledQuestions =questions.sort(()=> Math.random() - .5)
    currentQuestionIndex=0
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    ShowQuestion(shuffledQuestions[currentQuestionIndex])
}

function ShowQuestion(question){
    questionElement.innerText=question.question;
    question.answers.forEach(answer => {
        const button=document.createElement('button');
        button.innerText=answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonElement.appendChild(button)
    });
}

function resetState(){
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton=e.target
    const correct=selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button =>{
        setStatusClass(button,button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText='Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element,correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

const questions=[
    {question:"12, 11, 13, 12, 14, 13, … ?",answers:[
        {text:"15",correct:true},
        {text:"13",correct:false},
        {text:"10",correct:false},
        {text:"16",correct:false}
    ]},
    {question:"This series: 36, 34, 30, 28, 24, … ?",answers:[
        {text:"26",correct:false},
        {text:"22",correct:true},
        {text:"23",correct:false},
        {text:"20",correct:false}
    ]},
    {question:"This series: 7, 10, 8, 11, 9, 12, …?",answers:[
        {text:"18",correct:false},
        {text:"10",correct:true},
        {text:"13",correct:false},
        {text:"17",correct:false}
    ]},
    {question:"Which word does NOT belong with the others?",answers:[
        {text:"wing",correct:false},
        {text:"Fin",correct:false},
        {text:"Beak",correct:true},
        {text:"Rudder",correct:false}
    ]},
    {question:"Pick the odd man out?",answers:[
        {text:"Just",correct:false},
        {text:"Fair",correct:false},
        {text:"Equitable",correct:false},
        {text:"biased",correct:true}
    ]},
    {question:"Paw : Cat :: Hoof : ?",answers:[
        {text:"Lamb",correct:false},
        {text:" Horse",correct:true},
        {text:"Elephant",correct:false},
        {text:"Tiger",correct:false}
    ]}
];