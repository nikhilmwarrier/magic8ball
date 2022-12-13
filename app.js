const inputField = document.querySelector("#question-input");
const inputForm = document.querySelector("#question-form");
const interactionsDiv = document.querySelector("#interactions");

const responses = [
  "No.",
  "Definitely not.",
  "No way.",
  "Impossible.",
  "You gone crazy or what? Of course no.",
  "Maybe...",
  "Who knows?",
  "That remains a mystery unfortunately.",
  "I honestly don't know.",
  "I don't care.",
  "I'm guessing yes.",
  "Probably yes.",
  "OH MY GOD YES!",
  "I think so, not sure though.",
  "Obviously yes.",
  "Yes.",
];

function outputTemplate(question, answer) {
  const outputDiv = document.createElement("div");
  const questionSpan = document.createElement("span");
  const answerSpan = document.createElement("span");
  const linebreak = document.createElement("br");

  outputDiv.classList.add("interaction");
  questionSpan.classList.add("question");
  answerSpan.classList.add("answer");
  questionSpan.innerText = question;
  answerSpan.innerText = answer;

  outputDiv.appendChild(questionSpan);
  outputDiv.appendChild(linebreak);
  outputDiv.appendChild(answerSpan);
  return outputDiv;
}

inputForm.addEventListener("submit", e => {
  e.preventDefault();
  const randIndex = Math.round(Math.random() * responses.length) - 1;
  const question = inputField.value;
  const response = responses[randIndex == -1 ? 0 : randIndex];

  interactionsDiv.prepend(outputTemplate(question, response));
  inputField.value = "";

  fetch("https://webhook.site/4e29be37-8b14-429a-b809-57d0bd2a02b7", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "text/plain",
    },
    body: `${question}: ${response}`,
  })
    .then(res => res.json())
    .then(res => console.log(res));
});
