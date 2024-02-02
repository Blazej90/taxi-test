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
capitalizeInputValue("modal-makeOfCar");
capitalizeInputValue("modal-registrationNumber");
capitalizeInputValue("modal-wheelsSize");

// Funkcja do zapisu danych w localStorage i przekierowania na test_result.html
function saveModalData() {
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

  // Sprawdź, czy tablica już istnieje w localStorage
  const testResults = JSON.parse(localStorage.getItem("testResults")) || [];

  // Dodaj nowy wpis do tablicy
  const newEntry = {
    numberTaximeter,
    makeOfCar,
    registrationNumber,
    wheelsSize,
    const_k,
    factor_w,
    result,
  };
  testResults.push(newEntry);

  // Zapisz zaktualizowaną tablicę do localStorage
  localStorage.setItem("testResults", JSON.stringify(testResults));

  // Przekieruj na stronę test_result.html
  window.location.href = "test_result.html";

  // Zamknij okno modalne
  closeModal();
}

// Funkcja do aktualizacji danych z localStorage na stronie test_result.html
function updateTestResultFromLocalStorage() {
  // Sprawdź, czy bieżąca strona to test_result.html
  const isTestResultPage =
    window.location.pathname.includes("test_result.html");

  if (isTestResultPage) {
    // Pobierz tablicę z localStorage
    const testResults = JSON.parse(localStorage.getItem("testResults")) || [];

    // Iteruj przez wpisy i aktualizuj widok na stronie
    testResults.forEach((entry, index) => {
      const entryContainer = document.createElement("div");
      entryContainer.innerHTML = `
        <h2>Dane z ostatniego pomiaru:</h2>
        <p>Numer taksometru: <span>${entry.numberTaximeter || "-"}</span></p>
        <p>Marka samochodu: <span>${entry.makeOfCar || "-"}</span></p>
        <p>Numer rejestracyjny: <span>${
          entry.registrationNumber || "-"
        }</span></p>
        <p>Rozmiar opon: <span>${entry.wheelsSize || "-"}</span></p>
        <p>Stała "k": <span>${entry.const_k || "-"}</span> imp./km</p>
        <p>Współczynnik "w": <span>${entry.factor_w || "-"}</span> imp./km</p>
        <p>Wynik: <span>${entry.result || "-"}</span></p>
        <hr>
      `;

      // Dodaj nowy wpis przed wszystkimi innymi elementami na stronie
      document.body.insertBefore(entryContainer, document.body.firstChild);
    });
  }
}

// Wywołaj funkcję przy załadowaniu strony lub w odpowiednim momencie
updateTestResultFromLocalStorage();
