// ---------------------- Firebase ----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// ---------------------- Конфигурация Firebase ----------------------
const firebaseConfig = {
  apiKey: "AIzaSyAScg0_xqcwpqkehstGjyvcV33bl5nSlvw",
  authDomain: "test-app-dfea8.firebaseapp.com",
  projectId: "test-app-dfea8",
  storageBucket: "test-app-dfea8.firebasestorage.app",
  messagingSenderId: "1093185318469",
  appId: "1:1093185318469:web:f8befe69e0fbc701073d2c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------- Вопросы и ответы ----------------------
const questions = [
  { q: "1. Представьте, что вам предстоит выступление перед аудиторией.", 
    a:[
      "Шок! Мне срочно нужно отчислиться и уехать в другую страну. А лучше на другую планету…",
      "Ничего страшного. Я немного волнуюсь, но справлюсь!",
      "Супер, когда начинаем? Уже не терпится помодничать в новом свитере и рассказать классу свежие шуточки!"
    ], scores:[1,2,3] 
  },
  { q: "2. Как вы готовитесь к важному экзамену?",
    a:[
      "Самостоятельно, в тишине, создав вокруг уютную рабочую атмосферу с пледом, чаем и lo-fi hip-hop из колонки",
      "Иногда в одиночестве, иногда с друзьями — чередую, чтобы не переутомляться",
      "Вместе с друзьями: обсуждаем темы, разбираем ошибки, помогаем друг другу и много-много смеёмся!"
    ], scores:[1,2,3] 
  },
  { q: "3. Идеальный вечер пятницы — какой он для вас?",
    a:[
      "Тихий вечер дома с книгой или фильмом, в одиночестве или с близкими",
      "Можно и потусоваться, и дома спокойно посидеть — всё зависит от настроения",
      "Тихий вечер дома с книгой или фильмом, в одиночестве или с близкими."
    ], scores:[1,2,3] 
  },
  { q: "4. Что вы выберете в компании?",
    a:[
      "Посидеть в сторонке и  понаблюдать",
      "Включаясь в разговор, если тема интересна",
      "Быть в центре внимания"
    ], scores:[1,2,3] 
  },
  { q: "5. Что вам нужно после напряжённого дня?",
    a:[
      "Полежать в тишине, побыть наедине с собой, «перезарядиться»",
      "По-разному: могу отдохнуть дома под новый эпизод сериала, а могу и с друзьями в кино сходить!",
      "Пойти куда-нибудь, пообщаться с людьми, развеяться"
    ], scores:[1,2,3] 
  },
  { q: "6. Что вы чувствуете после долгого общения с людьми?",
    a:[
      "Усталость, хочется побыть одному",
      "В зависимости от ситуации — могу устать, а могу и вдохновиться",
      "Заряд энергии и отличное настроение"
    ], scores:[1,2,3] 
  },
  { q: "7. Легко ли вам завязать разговор с незнакомцем?",
    a:[
      "Нет, в такие моменты чувствуете себя крайне неуверенно.",
      "Зависит от ситуации и настроения.",
      "Да, всегда проявляете инициативу."
    ], scores:[1,2,3] 
  },
  { q: "8. Легко ли вы заводите новых друзей?",
    a:[
      "Сложно, нужно время, чтобы раскрыться",
      "Иногда быстро, иногда нужно время",
      "Очень легко, я открыт(а) к людям"
    ], scores:[1,2,3] 
  },
  { q: "9. Как часто вы чувствуете потребность в одиночестве?",
    a:[
      "Каждый день, чтобы восстановиться",
      "Периодически, особенно после насыщенных дней",
      "Редко, комфортнее в компании"
    ], scores:[1,2,3] 
  },
  { q: "10. Случалось ли с вами такое, что окружающие неправильно считывали ваши эмоции?",
    a:[
      "Это случается постоянно.",
      "Бывало несколько раз.",
      "Нет, ваши эмоции распознать просто."
    ], scores:[1,2,3] 
  },
  { q: "11. Как вы принимаете решения?",
    a:[
      "После долгих размышлений наедине с собой",
      "Сначала советуетесь, потом все обдумываете в тишине",
      "Проговариваете все вслух, важна обратная связь"
    ], scores:[1,2,3] 
  },
  { q: "12. Вы предпочитаете планировать заранее или действовать по ситуации?",
    a:[
      "Стараетесь обдумывать свои действия заранее и составлять четкий план",
      "Зависит от самой ситуации",
      "Чаще импровизируете на ходу — это дает больше пространства для маневра"
    ], scores:[1,2,3] 
  },
  { q: "13. Вы скорее предпочтете работу с высокой зарплатой и перспективами роста? Или позицию с менее выгодными условиями, но идеальным коллективом? и начальством?",
    a:[
      "Первый вариант. У вас достаточно друзей вне карьерной сферы, а работа, в первую очередь, должна приносить деньги.",
      "Сложно сказать. Если должность действительно стоящая и подходит вам, вероятно, сделаете выбор в ее пользу.",
      "Определенно выберете второй вариант. Для вас принципиально важна комфортная атмосфера в коллективе"
    ], scores:[1,2,3] 
  }
];

// ---------------------- Переменные ----------------------
let currentQuestion = 0;
let totalScore = 0;
let age = "";
let direction = "";
let type = "";

// ---------------------- Элементы DOM ----------------------
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quiz = document.getElementById("quiz");
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultScreen = document.getElementById("result-screen");
const resultText = document.getElementById("result-text");

// ---------------------- Старт теста ----------------------
startBtn.addEventListener("click", () => {
  age = document.getElementById("age").value;
  direction = document.getElementById("direction").value;
  if(!age || !direction){ alert("Пожалуйста, заполните все поля!"); return; }

  startScreen.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

// ---------------------- Показ вопроса ----------------------
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

// ---------------------- Далее / Следующий вопрос ----------------------
nextBtn.addEventListener("click",()=>{
  const selected = document.querySelector('input[name="answer"]:checked');
  if(!selected){ alert("Выберите вариант!"); return; }

  totalScore += Number(selected.value);
  currentQuestion++;

  if(currentQuestion < questions.length){ 
    showQuestion(); 
  } else { 
    showResult(); 
    saveResult();
  }
});

// ---------------------- Показ результата ----------------------
function showResult() {
  quiz.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let type;
  let description;

  if (totalScore <= 20) {
    type = "Интроверт";
    description = "Интроверт – тот, кто больше времени проводит наедине с собой и заводит близкие отношения с не таким большим количеством людей.";
  } else if (totalScore <= 29) {
    type = "Амбиверт";
    description = "Амбиверт – золотая середина. Умеет быстро переключаться между режимами";
  } else {
    type = "Экстраверт";
    description = "Экстроверт – человек, который направляет свою энергию во вне, более комфортно чувствующий себя в окружении людей, чем одному, и набирающий силы от взаимодействия с людьми.";
  }

  resultText.textContent = `Возраст: ${age}, Направление: ${direction}, Ваш тип личности: ${type}\nОписание: ${description}`;
}


// ---------------------- Сохранение в Firebase ----------------------
async function saveResult(){
  try {
    await addDoc(collection(db, "quizResults") 
, {
      age: parseInt(age),
      direction: direction,
      score: totalScore,
      type: type,
      date: new Date().toISOString()
    });
    console.log("Результат успешно сохранён!");
  } catch (error) {
    console.error("Ошибка при сохранении данных:", error);
    alert("Ошибка при сохранении результатов. Попробуйте позже.");
  }
}

