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
  // Pobierz wartości z pól formularza modalnego
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

  // Dodaj timestamp do wpisu
  const currentTimestamp = new Date();

  // Dodaj nowy wpis do tablicy
  const newEntry = {
    numberTaximeter,
    makeOfCar,
    registrationNumber,
    wheelsSize,
    const_k,
    factor_w,
    result,
    timestamp: currentTimestamp.toISOString(), // Dodaj timestamp w formie ISO
  };

  // Dodaj nowy wpis na początek tablicy
  testResults.unshift(newEntry);

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

    // Wyczyść aktualny widok przed dodaniem nowych wpisów
    const testResultsContainer = document.getElementById(
      "testResultsContainer"
    );
    testResultsContainer.innerHTML = "";

    // Iteruj przez wpisy i aktualizuj widok na stronie
    testResults.forEach((entry, index) => {
      const resultValue = parseFloat(entry.result) || 0;
      const currentTimestamp = new Date(entry.timestamp);
      const formattedTimestamp = currentTimestamp.toLocaleString();

      // Określ klasę dla koloru wyniku
      const resultColorClass = resultValue > 1 ? "red-result" : "green-result";

      const entryContainer = document.createElement("div");

      // Ustaw klasę dla wpisu
      entryContainer.classList.add("entry");

      // Ustaw atrybuty data- dla wpisu
      entryContainer.dataset.numberTaximeter = entry.numberTaximeter;
      entryContainer.dataset.makeOfCar = entry.makeOfCar;
      entryContainer.dataset.registrationNumber = entry.registrationNumber;

      // Ustaw zawartość wpisu
      entryContainer.innerHTML = `
    <p>Data: ${formattedTimestamp}</p>
    <p>Numer taksometru: <span>${(
      entry.numberTaximeter || "-"
    ).toUpperCase()}</span></p>
    <p>Marka samochodu: <span>${(
      entry.makeOfCar || "-"
    ).toUpperCase()}</span></p>
    <p>Numer rejestracyjny: <span>${(
      entry.registrationNumber || "-"
    ).toUpperCase()}</span></p>
    <p>Rozmiar opon: <span>${(entry.wheelsSize || "-").toUpperCase()}</span></p>
    <span><b>${entry.const_k || "-"}</b></span> 
    <p> </p>
    <span><b>${entry.factor_w || "-"}</b></span> 
    <p>Wynik: <span class="${resultColorClass}">${
        entry.result || "-"
      }</span></p>
    <button id="btn-remove-entry" onclick="removeEntry(${index})">Usuń zapis</button>
    <hr>
`;

      // Dodaj utworzony wpis do kontenera wpisów
      testResultsContainer.appendChild(entryContainer);

      // Dodaj nowy wpis do sekcji wyników
      testResultsContainer.appendChild(entryContainer);
    });
  }
}

// Funkcja do usuwania wpisu po indeksie
function removeEntry(index) {
  // Pobierz tablicę z localStorage
  const testResults = JSON.parse(localStorage.getItem("testResults")) || [];

  // Usuń wpis o danym indeksie
  testResults.splice(index, 1);

  // Zapisz zaktualizowaną tablicę z powrotem do localStorage
  localStorage.setItem("testResults", JSON.stringify(testResults));

  // Odśwież widok na stronie
  updateTestResultFromLocalStorage();
}

// Wywołaj funkcję przy załadowaniu strony lub w odpowiednim momencie
updateTestResultFromLocalStorage();

// Otwarcie strony test_result.html
function redirectMeasurementPage() {
  window.location.href = "test_result.html";
}

// Wyszukiwanie wyników pomiaru
function searchEntries() {
  let searchText = document.getElementById("searchInput").value.toLowerCase();
  let entries = document.querySelectorAll(".entry");

  let displayNoResultsMessage = true; // Ustawiamy flagę na true, zakładając, że nie znaleziono żadnych wyników

  entries.forEach(function (entry) {
    let numberTaximeter = entry.dataset.numberTaximeter.toLowerCase();
    let makeOfCar = entry.dataset.makeOfCar.toLowerCase();
    let registrationNumber = entry.dataset.registrationNumber.toLowerCase();

    if (
      numberTaximeter.includes(searchText) ||
      makeOfCar.includes(searchText) ||
      registrationNumber.includes(searchText)
    ) {
      entry.style.display = "block";
      displayNoResultsMessage = false; // Znaleziono wyniki, więc ustawiamy flagę na false
    } else {
      entry.style.display = "none";
    }
  });

  // Wyświetl alert, jeśli nie znaleziono żadnych wyników
  if (displayNoResultsMessage) {
    alert("Brak wyników wyszukiwania...");
  }
}
