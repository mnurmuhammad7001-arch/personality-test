const questions = [
  { q: "1. Предпочитаешь проводить время в шумной компании или наедине?", a: ["Наедине","Иногда с друзьями","В шумной компании"], scores:[1,2,3] },
  { q: "2. Ты чувствуешь себя энергично после общения?", a:["Нет","Иногда","Да"], scores:[1,2,3] },
  { q: "3. Легко ли заводишь новые знакомства?", a:["Нет","Иногда","Да"], scores:[1,2,3] },
  { q: "4. Любишь ли быть в центре внимания?", a:["Нет","Иногда","Да"], scores:[1,2,3] },
  { q: "5. Ты чаще размышляешь или действуешь?", a:["Размышляю","Зависит от ситуации","Действую"], scores:[1,2,3] },
  { q: "6. Легко ли тебе выступать публично?", a:["Нет","Иногда","Да"], scores:[1,2,3] },
  { q: "7. После долгого общения ты чувствуешь усталость?", a:["Да","Иногда","Нет"], scores:[1,2,3] },
  { q: "8. Любишь ли работать в команде?", a:["Нет","Иногда","Да"], scores:[1,2,3] },
  { q: "9. Ты предпочитаешь писать или говорить?", a:["Писать","Без разницы","Говорить"], scores:[1,2,3] },
  { q: "10. Тебе проще слушать или рассказывать?", a:["Слушать","И то, и другое","Рассказывать"], scores:[1,2,3] },
  { q: "11. Часто ли ты начинаешь разговор первым?", a:["Нет","Иногда","Да"], scores:[1,2,3] },
  { q: "12. Ты предпочитаешь спокойный отдых или активный?", a:["Спокойный","Иногда активный","Активный"], scores:[1,2,3] },
  { q: "13. Тебе важно мнение других?", a:["Нет","Иногда","Да"], scores:[1,2,3] }
];

let currentQuestion = 0;
let totalScore = 0;

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quiz = document.getElementById("quiz");
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultScreen = document.getElementById("result-screen");
const resultText = document.getElementById("result-text");

startBtn.addEventListener("click", () => {
  const age = document.getElementById("age").value;
  const dir = document.getElementById("direction").value;
  if(!age || !dir){ alert("Пожалуйста, заполните все поля!"); return; }
  startScreen.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

function showQuestion(){
  const q = questions[currentQuestion];
  questionText.textContent = q.q;
  answersDiv.innerHTML = "";
  q.a.forEach((answer,i)=>{
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${q.scores[i]}"> ${answer}`;
    answersDiv.appendChild(label);
  });
}

nextBtn.addEventListener("click",()=>{
  const selected = document.querySelector('input[name="answer"]:checked');
  if(!selected){ alert("Выберите вариант!"); return; }
  totalScore += Number(selected.value);
  currentQuestion++;
  if(currentQuestion < questions.length){ showQuestion(); }
  else{ showResult(); }
});

function showResult(){
  quiz.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  let type="";
  if(totalScore<=20) type="Интроверт";
  else if(totalScore<=30) type="Амбиверт";
  else type="Экстраверт";
  const age = document.getElementById("age").value;
  const direction = document.getElementById("direction").value;
  resultText.textContent = `Возраст: ${age}, Направление: ${direction}, Ваш тип личности: ${type}`;
}