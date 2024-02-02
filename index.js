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

// function saveModalData() {
//   const modalInputValue = document.getElementById("modalInput").value;
//   console.log("Zapisano dane: " + modalInputValue);
//   closeModal();
// }

// Funkcja do wielkich liter//
function capitalizeInputValue(inputId) {
  const input = document.getElementById(inputId);

  // Dodaj sprawdzenie, czy input nie jest nullem
  if (input) {
    input.value = input.value.toUpperCase();
  }
}
capitalizeInputValue("modal-numberTaximeter");
capitalizeInputValue("modal-registrationNumber");
capitalizeInputValue("modal-wheelsSize");

// Funkcja do zapisu danych w localStorage i przekierowania na test_result.html
function saveModalData() {
  // Pobierz wartości z pól modalnych
  const numberTaximeter = document.getElementById(
    "modal-numberTaximeter"
  ).value;
  const makeOfCar = document.getElementById("modal-makeOfCar").value;
  const registrationNumber = document.getElementById(
    "modal-registrationNumber"
  ).value;
  const wheelsSize = document.getElementById("modal-wheelsSize").value;
  const const_k = document.getElementById("modal-const_k").value;
  const factor_w = document.getElementById("modal-factor_w").value;
  const result = document.getElementById("modal-result").value;

  // Zapisz dane do localStorage
  localStorage.setItem("modal-numberTaximeter", numberTaximeter);
  localStorage.setItem("modal-makeOfCar", makeOfCar);
  localStorage.setItem("modal-registrationNumber", registrationNumber);
  localStorage.setItem("modal-wheelsSize", wheelsSize);
  localStorage.setItem("modal-const_k", const_k);
  localStorage.setItem("modal-factor_w", factor_w);
  localStorage.setItem("modal-result", result);

  // Zamknij okno modalne
  closeModal();

  // Przekieruj na stronę test_result.html po zakończeniu funkcji
  window.location.href = "test_result.html";
}

// Funkcja do aktualizacji danych z localStorage na stronie test_result.html
function updateTestResultFromLocalStorage() {
  document.getElementById("numberTaximeter").innerText =
    localStorage.getItem("modal-numberTaximeter") || "-";
  document.getElementById("makeOfCar").innerText =
    localStorage.getItem("modal-makeOfCar") || "-";
  document.getElementById("registrationNumber").innerText =
    localStorage.getItem("modal-registrationNumber") || "-";
  document.getElementById("wheelsSize").innerText =
    localStorage.getItem("modal-wheelsSize") || "-";
  document.getElementById("const_k").innerText =
    localStorage.getItem("modal-const_k") || "-";
  document.getElementById("factor_w").innerText =
    localStorage.getItem("modal-factor_w") || "-";
  document.getElementById("result").innerText =
    localStorage.getItem("modal-result") || "-";
}

// Wywołaj funkcję przy załadowaniu strony lub w odpowiednim momencie
updateTestResultFromLocalStorage();
