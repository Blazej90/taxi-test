// Ogranicz wprowadzane wartości do liczb dodatnich
function handleInput(input) {
  if (input.value < 0) {
    input.value = 0;
  }

  // Ogranicz wprowadzane wartości do liczb całkowitych
  input.value = Math.floor(input.value);
}

document.querySelectorAll(".input-main-spacing").forEach((input) => {
  input.addEventListener("input", function () {
    // Zamienia wartość na liczbę całkowitą dodatnią
    this.value = this.value.replace(/[^0-9]/g, ""); // Usuwa wszystko, co nie jest cyfrą
    if (this.value < 0) {
      this.value = "";
    }
  });
});

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

// Funkcja otwierająca menu
function openMenu() {
  const menu = document.getElementById("side-menu");
  menu.style.transform = "translateX(0)";
  setTimeout(() => {
    menu.style.display = "block";
  }, 300);
}

// Funkcja zamykająca menu
function closeMenu() {
  const menu = document.getElementById("side-menu");
  menu.style.transform = "translateX(100%)";
  setTimeout(() => {
    menu.style.display = "none";
  }, 300);
}

// Dodaj nasłuchiwacze zdarzeń do ikon
document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("hamburger-icon").addEventListener("click", openMenu);
  document
    .getElementById("close-menu-icon")
    .addEventListener("click", closeMenu);
});

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

function openLinkedIn() {
  window.open(
    "https://www.linkedin.com/in/b%C5%82a%C5%BCej-bartoszewski-36b7162b7/",
    "_blank"
  );
}

// Funkcja do wielkich liter
function capitalizeInputValue(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.value = input.value.toUpperCase();
  }
}

function capitalizeUserInput(input) {
  const words = input.value.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  input.value = words.join(" ");
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
  const numberVin = document.getElementById("modal-numberVin").value;
  const user = document.getElementById("modal-user").value;
  const timestamp = new Date().toISOString();

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
    numberVin,
    user,
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

// Validacja dla numeru taksometru
function validateNumberTaximeter() {
  const input = document.getElementById("modal-numberTaximeter");
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

// Validacja dla numeru VIN
function validateNumberVin() {
  const input = document.getElementById("modal-numberVin");
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

// Validacja dla numeru rejestracyjnego
function validateRegistrationNumber() {
  const input = document.getElementById("modal-registrationNumber");
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

// Validacja dla rozmiaru opon
function validateWheelsSize() {
  const input = document.getElementById("modal-wheelsSize");
  input.value = input.value.toUpperCase();
}

function capitalizeFirstLetter(input) {
  const words = input.value.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  input.value = words.join(" ");
}

// Na wczytaniu strony, ustawiamy styl dla inputów
document.addEventListener("DOMContentLoaded", () => {
  const makeOfCarInput = document.getElementById("modal-makeOfCar");
  makeOfCarInput.addEventListener("input", () => {
    if (makeOfCarInput.value.length === 1) {
      makeOfCarInput.value = makeOfCarInput.value.toUpperCase();
    }
  });

  const wheelsSizeInput = document.getElementById("modal-wheelsSize");
  wheelsSizeInput.addEventListener("input", () => {
    wheelsSizeInput.value = wheelsSizeInput.value.toUpperCase();
  });
});

function updateTestResultFromLocalStorage(searchTerm = "") {
  if (window.location.pathname.includes("test_result.html")) {
    const testResults = JSON.parse(localStorage.getItem("testResults")) || [];
    const resultsContainer = document.querySelector("#testResultsContainer");

    if (!resultsContainer) {
      console.error("Element testResultsContainer nie został znaleziony!");
      return;
    }

    resultsContainer.innerHTML = "";

    const filteredResults = testResults.filter((entry) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        (entry.numberTaximeter &&
          entry.numberTaximeter.toLowerCase().includes(lowerSearchTerm)) ||
        (entry.makeOfCar &&
          entry.makeOfCar.toLowerCase().includes(lowerSearchTerm)) ||
        (entry.registrationNumber &&
          entry.registrationNumber.toLowerCase().includes(lowerSearchTerm)) ||
        (entry.wheelsSize &&
          entry.wheelsSize.toLowerCase().includes(lowerSearchTerm)) ||
        (entry.const_k &&
          entry.const_k.toLowerCase().includes(lowerSearchTerm)) ||
        (entry.factor_w &&
          entry.factor_w.toLowerCase().includes(lowerSearchTerm)) ||
        (entry.result &&
          entry.result.toLowerCase().includes(lowerSearchTerm)) ||
        (entry.user && entry.user.toLowerCase().includes(lowerSearchTerm))
      );
    });

    filteredResults
      .slice()
      .reverse()
      .forEach((entry, index) => {
        const resultValue = parseFloat(entry.result);
        const resultColorClass =
          isNaN(resultValue) || Math.abs(resultValue) > 1
            ? "red-result"
            : "green-result";
        const currentTimestamp = new Date(entry.timestamp);
        const formattedTimestamp = currentTimestamp.toLocaleString();

        const entryDiv = document.createElement("div");
        entryDiv.classList.add("test-result-entry");
        entryDiv.setAttribute("data-index", testResults.length - 1 - index);

        entryDiv.innerHTML = `
        <p><strong>Numer taksometru:</strong> ${
          entry.numberTaximeter || "-"
        }</p>
        <p><strong>Marka samochodu:</strong> ${entry.makeOfCar || "-"}</p>
        <p><strong>Numer VIN:</strong> ${entry.numberVin || "-"}</p>
        <p><strong>Numer rejestracyjny:</strong> ${
          entry.registrationNumber || "-"
        }</p>
        <p><strong>Rozmiar opon:</strong> ${entry.wheelsSize || "-"}</p>
        <p><strong>Stała</strong> ${entry.const_k || "-"}</p>
        <p><strong>Współczynnik</strong> ${entry.factor_w || "-"}</p>
        <p><strong>Wynik:</strong> <span class="${resultColorClass}">${
          entry.result || "-"
        }</span></p>
        <p><strong>Użytkownik:</strong> ${entry.user || "-"}</p>
        <p><strong>Data:</strong> ${formattedTimestamp}</p>
        <div class="button-container">
          <button data-index="${
            testResults.length - 1 - index
          }" onclick="removeEntry(this.getAttribute('data-index'))">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
              <path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"/>
            </svg>
            Usuń zapis
          </button>
        </div>
      `;

        resultsContainer.appendChild(entryDiv);
      });
  }
}

function removeEntry(index) {
  const testResults = JSON.parse(localStorage.getItem("testResults")) || [];
  index = parseInt(index); // Konwertuj indeks na liczbę
  if (index >= 0 && index < testResults.length) {
    const resultsContainer = document.querySelector("#testResultsContainer");
    const entryDiv = resultsContainer.querySelector(`[data-index="${index}"]`);

    if (entryDiv) {
      entryDiv.classList.add("fade-out");

      setTimeout(() => {
        testResults.splice(index, 1);
        localStorage.setItem("testResults", JSON.stringify(testResults));
        updateTestResultFromLocalStorage(); // Odśwież widok po usunięciu
      }, 500); // Czas trwania animacji musi być zgodny z czasem przejścia w CSS
    }
  } else {
    console.error("Nieprawidłowy indeks:", index);
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
