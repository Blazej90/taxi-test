// Ogranicz wprowadzane wartości do liczb dodatnich
function handleInput(input) {
  if (input.value < 0) {
    input.value = 0;
  }

  // Ogranicz wprowadzane wartości do liczb całkowitych
  input.value = Math.floor(input.value);
}

function displayResult(result) {
  // Wyświetl wynik w polu input
  const resultInput = document.getElementById("result");
  resultInput.value = result;

  // Sprawdź warunki i ustaw kolor pola wynikowego
  if (Math.abs(result) > 1) {
    resultInput.style.color = "red";
    alert("Wynik testu negatywny");
  } else {
    resultInput.style.color = "green";
    alert("Wynik testu pozytywny");
  }
}

function calculate(openModalAfterCalculation = false) {
  // Pobierz wartości z pól input
  const number1 = parseFloat(document.getElementById("number_1").value);
  const number2 = parseFloat(document.getElementById("number_2").value);

  // Sprawdź, czy wartości są liczbami
  if (isNaN(number1) || isNaN(number2)) {
    alert("Wprowadź poprawne liczby!");
    return;
  }

  // Oblicz wynik
  const result = (((number1 - number2) / number2) * 100).toFixed(3);

  // Wywołaj funkcję do wyświetlania wyniku i alertu
  displayResult(result);

  // Ustaw wartości pól w oknie modalnym
  document.getElementById("modal-const_k").value = `"k": ${number1.toFixed(
    0
  )} imp./km`;
  document.getElementById("modal-factor_w").value = `"w": ${number2.toFixed(
    0
  )} imp./km`;
  document.getElementById("modal-result").value = `${result}%`;

  // Zablokuj możliwość edycji pól w oknie modalnym
  document.getElementById("modal-const_k").setAttribute("readonly", true);
  document.getElementById("modal-factor_w").setAttribute("readonly", true);
  document.getElementById("modal-result").setAttribute("readonly", true);

  // Ustaw kolor pola wynikowego w oknie modalnym
  const resultInput = document.getElementById("modal-result");
  if (Math.abs(result) > 1) {
    resultInput.style.color = "red";
  } else {
    resultInput.style.color = "green";
  }

  // Otwórz okno modalne tylko jeśli openModalAfterCalculation jest true
  if (openModalAfterCalculation) {
    openModal();
  }
}

// Dodana funkcja do czyszczenia inputów
function clearInputs() {
  const resultInput = document.getElementById("result");
  document.getElementById("number_1").value = "";
  document.getElementById("number_2").value = "";
  resultInput.value = "";
  resultInput.style.color = ""; // Przywróć domyślny kolor
}

// Otwieranie linków social-media //
function openGitHubLink() {
  window.open("https://github.com/Blazej90", "_blank");
}

function openFacebookLink() {
  window.open("https://www.facebook.com/blazejbart", "_blank");
}

// Modal window //
function openModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function saveModalData() {
  const modalInputValue = document.getElementById("modalInput").value;
  // Tutaj możesz dodać logikę obsługi danych wprowadzonych w modalu
  console.log("Zapisano dane: " + modalInputValue);
  closeModal();
}

// Funkcja do wielkich liter//
function capitalizeInputValue(inputId) {
  const input = document.getElementById(inputId);
  input.value = input.value.toUpperCase();
}
capitalizeInputValue("modal-numberTaximeter");
capitalizeInputValue("modal-registrationNumber");
capitalizeInputValue("modal-wheelsSize");
