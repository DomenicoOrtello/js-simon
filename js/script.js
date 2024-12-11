// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. 
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// NOTA: non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.
// BONUS: se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.

// Elementi del DOM
const numbersContainer = document.getElementById("numbers-container");
const inputContainer = document.getElementById("input-container");
const resultParagraph = document.getElementById("result");
const guessForm = document.getElementById("guess-form");
const inputs = document.querySelectorAll(".number-input");
const randomNumbersElement = document.getElementById("random-numbers");

// Timer di 30 secondi
setTimeout(() => {
    numbersContainer.style.display = "none";
    inputContainer.style.display = "block";
  }, 5000);  

// Genera i numeri casuali
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
// Genera due array casuali
const randomNumbers = generateRandomNumbers(5, 1, 100);
const targetNumbers = generateRandomNumbers(5, 1, 100);
console.log("Numeri da indovinare (target):", targetNumbers);
randomNumbersElement.textContent = randomNumbers.join(", ");