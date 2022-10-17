let questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

// window.onload = function () {

let score = 0;
let questionNumber = 0;
let totalQuestions = questions.length;

console.log("total number of the initial array of questions: ", totalQuestions);

const randomiseNumbersUnique = function (num) {
  const allNumbers = [];
  for (let i = 0; i < num; i++) {
    allNumbers.push(i);
  }

  const result = [];

  for (let i = num; i >= 1; i--) {
    const randomPosition = Math.ceil(Math.random() * i);
    result.push(allNumbers[randomPosition - 1]);
    allNumbers.splice(randomPosition - 1, 1);
  }

  return result;
};

const createSelectForm = function (num) {
  for (let i = 0; i < num; i++) {
    const parentNode = document.querySelector("select");
    const optionTagNode = document.createElement("option");
    optionTagNode.innerText = i + 1;
    optionTagNode.setAttribute("value", i + 1);

    optionTagNode.classList.add("customSelectTag");
    parentNode.appendChild(optionTagNode);
  }
};

createSelectForm(totalQuestions);

let optionTagList = document.querySelectorAll("#questions option");
totalQuestions = optionTagList.length;

let selectTagNode = document.querySelector("#questions");
let value = selectTagNode.options[selectTagNode.selectedIndex].value;

const generateSingleAnswersArray = function (obj) {
  let arrCorrect = [];
  let arrIncorrect = [];
  arrCorrect.push(obj.correct_answer);
  arrIncorrect.push(obj.incorrect_answers);
  let arrCorrectLength = 0;
  let arrIncorrectLength = 0;
  let arrOfAnswers = [];

  if (typeof arrCorrect[0] === "string") {
    arrCorrectLength = arrCorrect.length;
    arrOfAnswers.push(arrCorrect[0]);
    arrOfAnswers.push(true);
  } else if (typeof arrCorrect[0] === "object") {
    arrCorrectLength = arrCorrect[0].length;
    for (let i = 0; i < arrCorrectLength; i++) {
      arrOfAnswers.push(arrCorrect[0][i]);
      arrOfAnswers.push(true);
    }
  }

  if (typeof arrIncorrect[0] === "string") {
    arrIncorrectLength = arrIncorrect.length;
    arrOfAnswers.push(arrIncorrect[0]);
    arrOfAnswers.push(false);
  } else if (typeof arrIncorrect[0] === "object") {
    arrIncorrectLength = arrIncorrect[0].length;
    for (let i = 0; i < arrIncorrectLength; i++) {
      arrOfAnswers.push(arrIncorrect[0][i]);
      arrOfAnswers.push(false);
    }
  }

  const arrayRandomIndexes = randomiseNumbersUnique(arrOfAnswers.length);

  const arrEvenIndexes = [];
  for (let i = 0; i < arrOfAnswers.length; i++) {
    if (arrayRandomIndexes[i] % 2 === 0)
      arrEvenIndexes.push(arrayRandomIndexes[i]);
  }

  const randomisedArrOfAnswers = [];

  for (let i = 0; i < arrEvenIndexes.length; i++) {
    const currentRandomIndex = arrEvenIndexes[i];
    randomisedArrOfAnswers.push(arrOfAnswers[currentRandomIndex]);
    randomisedArrOfAnswers.push(arrOfAnswers[currentRandomIndex + 1]);
  }

  return randomisedArrOfAnswers;
};

// console.log("a single array generated", generateSingleAnswersArray(obj));

const generateQuestionTemplate = function (obj) {
  value = selectTagNode.options[selectTagNode.selectedIndex].value;
  let biggestDivNode = document.querySelector("#container");

  const answersArray = generateSingleAnswersArray(obj);
  const totalAnswers = answersArray.length;

  const text = obj.question;

  const divContainer = document.createElement("div");
  divContainer.setAttribute("id", "question");
  biggestDivNode.appendChild(divContainer);

  const textParagraph = document.createElement("p");
  textParagraph.innerText = text;
  textParagraph.classList.add("customP");
  divContainer.appendChild(textParagraph);

  let j = 1;

  for (let i = 0; i < totalAnswers; i += 2) {
    const newDivNode = document.createElement("div");
    newDivNode.classList.add("customDivAnswer");
    const checkboxNode = document.createElement("input");
    checkboxNode.setAttribute("type", "checkbox");
    checkboxNode.setAttribute("id", i + 1);
    if (answersArray[j] === true) checkboxNode.classList.add("true");
    const labelNode = document.createElement("label");
    labelNode.innerText = answersArray[i];
    divContainer.appendChild(newDivNode);
    newDivNode.appendChild(checkboxNode);
    newDivNode.appendChild(labelNode);
    j += 2;
  }

  const nextButton = document.createElement("button");
  nextButton.innerText = "NEXT";
  nextButton.classList.add("customNextButton");
  divContainer.appendChild(nextButton);

  const showScoreDiv = document.createElement("div");
  showScoreDiv.setAttribute("id", "show-score");
  showScoreDiv.innerText = `Current score: ${score}/${value}`;
  divContainer.appendChild(showScoreDiv);
};

let checkboxList = document.getElementsByTagName("input");

const tickCheckbox = function () {
  checkboxList = document.getElementsByTagName("input");

  for (let i = 0; i < checkboxList.length; i++) {
    checkboxList[i].addEventListener("click", () => {
      checkboxList[i].classList.toggle("check");
    });
  }
};

const checkAnswer = function (obj) {
  let arr = generateSingleAnswersArray(obj);
  checkboxList = document.getElementsByTagName("input");

  for (let i = 0; i < checkboxList.length; i++) {
    if (
      (checkboxList[i].classList.contains("true") &&
        checkboxList[i].classList.contains("check") != true) ||
      (checkboxList[i].classList.contains("true") != true &&
        checkboxList[i].classList.contains("check") === true)
    ) {
      return false;
    }
  }

  score++;
};

let currentQuizQuestion;
let totalQuizQuestions;

const getUserQuestionCount = function () {
  optionTagList = document.querySelectorAll("#questions option");

  selectTagNode = document.querySelector("#questions");
  value = selectTagNode.options[selectTagNode.selectedIndex].value;

  totalQuestions = parseInt(value);
  return totalQuestions;
};

const startQuiz = function () {
  const divToDisplayNone = document.querySelector("#display");
  divToDisplayNone.classList.add("hide");

  const randomIndexesArr = randomiseNumbersUnique(questions.length);
  const randomQuestionsArr = [];
  for (let i = 0; i < randomIndexesArr.length; i++) {
    randomQuestionsArr.push(questions[randomIndexesArr[i]]);
  }

  score = 0;
  currentQuizQuestion = 0;
  totalQuizQuestions = getUserQuestionCount();

  questions = randomQuestionsArr.slice();

  generateQuestionTemplate(questions[currentQuizQuestion]);
  console.log(generateSingleAnswersArray(questions[currentQuizQuestion]));

  let nextButton = document.getElementsByClassName("customNextButton")[0];
  tickCheckbox();

  nextButton.addEventListener("click", nextQuestion);
};

const nextQuestion = function () {
  tickCheckbox();
  checkAnswer(questions[currentQuizQuestion]);
  console.log("score", score);

  let wantToHide = document.querySelector("#question");
  wantToHide.remove();

  currentQuizQuestion++;
  if (
    currentQuizQuestion >= totalQuizQuestions &&
    score > Math.floor(totalQuestions + 1) / 2
  ) {
    alert(
      `Your score: ${score}/${totalQuizQuestions}. Congrats, you passed the quiz!`
    );
    return;
  } else if (
    currentQuizQuestion >= totalQuizQuestions &&
    score <= Math.floor(totalQuestions + 1) / 2
  ) {
    alert(
      `Your score: ${score}/${totalQuizQuestions}. Unfortunately, you did not pass the quiz!`
    );
    return;
  }
  generateQuestionTemplate(questions[currentQuizQuestion]);
  console.log(generateSingleAnswersArray(questions[currentQuizQuestion]));

  let nextButton = document.getElementsByClassName("customNextButton")[0];
  tickCheckbox();

  nextButton.addEventListener("click", nextQuestion);
};

const startQuizButton = document.querySelector("button");
startQuizButton.addEventListener("click", startQuiz);

// How to calculate the result? You can do it in 2 ways:
// If you are presenting all the questions together, just take all the radio buttons and check if the selected answer === correct_answer
// If you are presenting one question at a time, just add one point or not to the user score if the selected answer === correct_answer

// HINTS
// IF YOU ARE DISPLAYING ALL THE QUESTIONS AT ONCE:
// For each question, create a container for wrapping it; then create a radio button
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
// with, as options, both the correct answer and the incorrect ones
// (you'll probably need to google how to get the value from a radio button in JS to evaluate the final score)
//
// IF YOU ARE DISPLAYING ONE QUESTION AT A TIME
// Display the first question with the text and the radio buttons
// when the user selects an answer, pick the next question from the array and replace the old one with it
// saving the user's choice in a variable
