// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. 
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// NOTA: non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.
// BONUS: se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.

// Elementi del DOM
const numbersContainer = document.getElementById("numbers-container");
const inputContainer = document.getElementById("input-container");
const result = document.getElementById("result");
const guessForm = document.getElementById("guess-form");
const inputs = document.getElementsByClassName("number-input");
const randomNumbersElement = document.getElementById("random-numbers");

// Funzione che genera i numeri casuali
function generateRandomNumbers(count, min, max) {
  const numbers = [];
  while (numbers.length < count) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
}

// Genera i numeri casuali che l'utente deve memorizzare
const randomNumbers = generateRandomNumbers(5, 1, 100);
console.log("Numeri da indovinare:", randomNumbers);

// Mostra i numeri casuali in pagina
let numbersText = "";
for (let i = 0; i < randomNumbers.length; i++) {
  if (i > 0) {
    numbersText += ", "; // Aggiungi una virgola e uno spazio tra i numeri
  }
  numbersText += randomNumbers[i];
}
randomNumbersElement.textContent = numbersText;

// Timer di 5 secondi
setTimeout(() => {
    numbersContainer.classList.add("d-none");
    inputContainer.classList.remove("d-none");
}, 5000);

// Timer da 5 secondi in giù
let countdown = 5;
const timerElement = document.getElementById("timer");
const inputContainerElm = document.getElementById("input-container");
// Funzione per aggiornare il timer ogni secondo
const timerInterval = setInterval(() => {
  timerElement.innerText = `${countdown}`;
  countdown--;
// Quando il countdown arriva a 0, ferma il timer e mostra il modulo
  if (countdown < 0) {
    clearInterval(timerInterval);
    // Mostra il modulo e nasconde il timer
    inputContainer.classList.remove("d-none");
  }
}, 1000);

// Verifica e validazione dei numeri inseriti dall'utente
guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
// Recupera i numeri inseriti dall'utente
  const userNumbers = [];
  let validInput = true;
  for (let i = 0; i < inputs.length; i++) {
    const inputValue = inputs[i].value;
    const number = Number(inputValue);

    if (isNaN(number) || inputValue === "") {
      validInput = false;
    } else {
      userNumbers.push(number);
    }
  }
  // Confronto dei numeri inseriti con quelli generati
  const correctNumbers = [];
  for (let i = 0; i < userNumbers.length; i++) {
    if (randomNumbers.includes(userNumbers[i]) && !correctNumbers.includes(userNumbers[i])) {
      correctNumbers.push(userNumbers[i]);
    }
  }
// Creazione del testo per i numeri indovinati
  let correctNumbersText = "";
  for (let i = 0; i < correctNumbers.length; i++) {
    if (i > 0) {
      correctNumbersText += ", ";
    }
    correctNumbersText += correctNumbers[i];
  }
// Risultato con numeri indovinati o non indovinati
  if (correctNumbers.length > 0) {
    result.innerText = `Hai indovinato ${correctNumbers.length} numeri in comune (${correctNumbersText}).`;
  } else {
    result.innerText = "Non hai indovinato nessun numero.";
  }
});