// Ogranicz wprowadzane wartości do liczb dodatnich
function handleInput(input) {
  if (input.value < 0) {
    input.value = 0;
  }

  // Ogranicz wprowadzane wartości do liczb całkowitych
  input.value = Math.floor(input.value);
}

// Wyświetl wynik w polu input
function displayResult(result) {
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

// Oblicz wynik i opcjonalnie otwórz modal
function calculate(openModalAfterCalculation = false) {
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
  resultInput.style.color = Math.abs(result) > 1 ? "red" : "green";

  // Otwórz okno modalne tylko jeśli openModalAfterCalculation jest true
  if (openModalAfterCalculation) {
    openModal();
  }
}

// Czyszczenie pól inputów
function clearInputs() {
  const resultInput = document.getElementById("result");
  document.getElementById("number_1").value = "";
  document.getElementById("number_2").value = "";
  resultInput.value = "";
  resultInput.style.color = "";
}

// Obsługa otwierania/zamykania menu bocznego
function openMenu() {
  document.getElementById("side-menu").style.display = "block";
}

function closeMenu() {
  document.getElementById("side-menu").style.display = "none";
}

// Obsługa otwierania/zamykania modala z efektami wysuwania
function openModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("show");
  }, 10); // Opóźnienie, aby umożliwić transition
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 500); // Opóźnienie zgodne z czasem transition w CSS
}

// Zamknięcie modalnego okna przy kliknięciu poza nim
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Przeciąganie modala
let startX, startY;

// document.getElementById("myModal").addEventListener("mousedown", function (e) {
//   startX = e.clientX;
//   startY = e.clientY;

//   document.addEventListener("mousemove", onMouseMove);
//   document.addEventListener("mouseup", onMouseUp);
// });

function onMouseMove(e) {
  const diffX = Math.abs(e.clientX - startX);
  const diffY = Math.abs(e.clientY - startY);

  if (diffX > 10 || diffY > 10) {
    closeModal();
    onMouseUp(); // Usunięcie nasłuchiwań
  }
}

function onMouseUp() {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}

// Otwarcie linków social-media
function openGitHubLink() {
  window.open("https://github.com/Blazej90", "_blank");
}

function openFacebookLink() {
  window.open("https://www.facebook.com/blazejbart", "_blank");
}

// Funkcja do wielkich liter
function capitalizeInputValue(inputId) {
  const input = document.getElementById(inputId);
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

  const testResults = JSON.parse(localStorage.getItem("testResults")) || [];
  const currentTimestamp = new Date();

  const newEntry = {
    numberTaximeter,
    makeOfCar,
    registrationNumber,
    wheelsSize,
    const_k,
    factor_w,
    result,
    timestamp: currentTimestamp.toISOString(),
  };

  testResults.push(newEntry);
  localStorage.setItem("testResults", JSON.stringify(testResults));

  // Przekierowanie do test_result.html
  window.location.href = "test_result.html";
}

document.addEventListener("DOMContentLoaded", function () {
  updateTestResultFromLocalStorage();
});

function updateTestResultFromLocalStorage() {
  if (window.location.pathname.includes("test_result.html")) {
    const testResults = JSON.parse(localStorage.getItem("testResults")) || [];
    const resultsContainer = document.querySelector("#testResultsContainer");

    if (!resultsContainer) {
      console.error("Element testResultsContainer nie został znaleziony!");
      return;
    }

    resultsContainer.innerHTML = ""; // Czyści istniejące wpisy

    testResults.forEach((entry, index) => {
      const resultValue = parseFloat(entry.result) || 0;
      const currentTimestamp = new Date(entry.timestamp);
      const formattedTimestamp = currentTimestamp.toLocaleString();

      const resultColorClass = resultValue > 1 ? "red-result" : "green-result";

      const entryDiv = document.createElement("div");
      entryDiv.classList.add("test-result-entry");

      entryDiv.innerHTML = `
        <p><strong>Numer taksometru:</strong> ${
          entry.numberTaximeter || "-"
        }</p>
        <p><strong>Marka samochodu:</strong> ${entry.makeOfCar || "-"}</p>
        <p><strong>Numer rejestracyjny:</strong> ${
          entry.registrationNumber || "-"
        }</p>
        <p><strong>Rozmiar opon:</strong> ${entry.wheelsSize || "-"}</p>
        <p><strong>Stała "k":</strong> ${entry.const_k || "-"}</p>
        <p><strong>Współczynnik "w":</strong> ${entry.factor_w || "-"}</p>
        <p><strong>Wynik:</strong> <span class="${resultColorClass}">${
        entry.result || "-"
      }</span></p>
        <p><strong>Data:</strong> ${formattedTimestamp}</p>
        <button onclick="removeEntry(${index})">Usuń zapis</button>
      `;

      resultsContainer.appendChild(entryDiv);
    });
  }
}

// Funkcja do usuwania wpisów
function removeEntry(index) {
  const testResults = JSON.parse(localStorage.getItem("testResults")) || [];
  testResults.splice(index, 1);
  localStorage.setItem("testResults", JSON.stringify(testResults));
  updateTestResultFromLocalStorage(); // Odśwież widok po usunięciu
}

// Funkcja do aktualizacji wyników testu
function updateTestResultFromLocalStorage(searchInput = "") {
  if (window.location.pathname.includes("test_result.html")) {
    const testResults = JSON.parse(localStorage.getItem("testResults")) || [];
    const resultsContainer = document.querySelector("#testResultsContainer");
    resultsContainer.innerHTML = ""; // Czyści istniejące wpisy

    // Przetwarzamy testResults w odwrotnej kolejności, aby najnowsze były na górze
    for (let i = testResults.length - 1; i >= 0; i--) {
      const entry = testResults[i];
      const resultValue = parseFloat(entry.result) || 0;
      const currentTimestamp = new Date(entry.timestamp);
      const formattedTimestamp = currentTimestamp.toLocaleString();

      const resultColorClass = resultValue > 1 ? "red-result" : "green-result";

      const entryValues = [
        entry.numberTaximeter,
        entry.makeOfCar,
        entry.registrationNumber,
      ].map((value) => (value || "").toLowerCase());

      if (
        entryValues.some((value) => value.includes(searchInput.toLowerCase()))
      ) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("test-result-entry");

        entryDiv.innerHTML = `
          <p><strong>Numer taksometru:</strong> ${
            entry.numberTaximeter || "-"
          }</p>
          <p><strong>Marka samochodu:</strong> ${entry.makeOfCar || "-"}</p>
          <p><strong>Numer rejestracyjny:</strong> ${
            entry.registrationNumber || "-"
          }</p>
          <p><strong>Rozmiar opon:</strong> ${entry.wheelsSize || "-"}</p>
          <p><strong>Stała</strong> ${entry.const_k || "-"}</p>
          <p><strong>Współczynnik</strong> ${entry.factor_w || "-"}</p>
          <p><strong>Wynik:</strong> <span class="${resultColorClass}">${
          entry.result || "-"
        }</span></p>
          <p><strong>Data:</strong> ${formattedTimestamp}</p>
          <button onclick="removeEntry(${i})">Usuń zapis</button>
        `;

        resultsContainer.append(entryDiv);
      }
    }
  }
}

// Funkcja do obsługi wyszukiwania
function searchEntries() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  updateTestResultFromLocalStorage(searchInput);
}

// Dodanie event listenera dla inputa wyszukiwania po załadowaniu dokumentu
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("test_result.html")) {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", searchEntries);
    }
    updateTestResultFromLocalStorage(); // Załaduj wszystkie wyniki na początku
  }
});

// Wywołaj funkcję aktualizacji wyników, jeśli na stronie test_result.html
document.addEventListener("DOMContentLoaded", function () {
  updateTestResultFromLocalStorage();
});

function redirectMeasurementPage() {
  window.location.href = "test_result.html";
}
