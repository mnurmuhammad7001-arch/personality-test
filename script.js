// ---------------------- Firebase ----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ТВОЙ_API_KEY",
  authDomain: "ТВОЙ_PROJECT_ID.firebaseapp.com",
  projectId: "ТВОЙ_PROJECT_ID",
  storageBucket: "ТВОЙ_PROJECT_ID.appspot.com",
  messagingSenderId: "ТВОЙ_MESSAGING_SENDER_ID",
  appId: "ТВОЙ_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------- Вопросы ----------------------
const questions = [
  { q: "1. Мне легче сосредоточиться, когда я один.", a: ["Да", "Иногда", "Нет"] },
  { q: "2. Я часто оказываюсь в центре внимания.", a: ["Нет", "Иногда", "Да"] },
  { q: "3. Я чувствую себя уставшим после долгого общения.", a: ["Да", "Иногда", "Нет"] },
  { q: "4. Мне нравится проводить время в шумных компаниях.", a: ["Нет", "Иногда", "Да"] },
  { q: "5. Я предпочитаю слушать, а не говорить.", a: ["Да", "Иногда", "Нет"] },
  { q: "6. Я легко знакомлюсь с новыми людьми.", a: ["Нет", "Иногда", "Да"] },
  { q: "7. Я люблю бывать на вечеринках.", a: ["Нет", "Иногда", "Да"] },
  { q: "8. Мне нужно время, чтобы восстановиться после общения.", a: ["Да", "Иногда", "Нет"] },
  { q: "9. Я чувствую себя уверенно среди незнакомцев.", a: ["Нет", "Иногда", "Да"] },
  { q: "10. Я предпочитаю работать в одиночестве.", a: ["Да", "Иногда", "Нет"] },
  { q: "11. Я часто первым начинаю разговор.", a: ["Нет", "Иногда", "Да"] },
  { q: "12. Я чувствую себя неловко, когда много людей вокруг.", a: ["Да", "Иногда", "Нет"] },
  { q: "13. Я получаю энергию от общения.", a: ["Нет", "Иногда", "Да"] },
];

// ---------------------- Генерация теста ----------------------
const quizContainer = document.getElementById("questions");

questions.forEach((item, index) => {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `<p>${item.q}</p>` +
    item.a.map((opt, i) => `
      <label><input type="radio" name="q${index}" value="${i + 1}" required> ${opt}</label>
    `).join("<br>");
  quizContainer.appendChild(div);
});

// ---------------------- Обработка ----------------------
document.getElementById("quizForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let score = 0;
  questions.forEach((_, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) score += parseInt(selected.value);
  });

  let type = "";
  if (score <= 20) type = "Интроверт";
  else if (score <= 29) type = "Амбиверт";
  else type = "Экстраверт";

  const age = document.getElementById("age").value;
  const direction = document.getElementById("direction").value;

  // сохраняем в Firebase
  await addDoc(collection(db, "quizResults"), {
    age: parseInt(age),
    direction,
    score,
    type,
    date: new Date().toISOString()
  });

  document.getElementById("result").innerHTML =
    `<strong>Ваш результат:</strong> ${type}<br>Общее количество баллов: ${score}`;
});
