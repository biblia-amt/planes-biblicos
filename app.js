let days = [];
let learningPoints = [];

function addLearning() {
  const val = prompt("Nuevo punto:");
  if (val) {
    learningPoints.push(val);
    renderLearning();
  }
}

function renderLearning() {
  const div = document.getElementById("learningList");
  div.innerHTML = "";
  learningPoints.forEach((l, i) => {
    div.innerHTML += `<p>${i + 1}. ${l}</p>`;
  });
}

function addDay() {
  const day = {
    day: days.length + 1,
    title: "",
    focusLine: "",
    reflection: "",
    prayer: "",
    action: "",
    memoryVerse: ""
  };

  days.push(day);
  renderDays();
}

function renderDays() {
  const container = document.getElementById("days");
  container.innerHTML = "";

  days.forEach((d, index) => {
    container.innerHTML += `
      <div class="day">
        <h4>Día ${d.day}</h4>
        <input placeholder="Título" onchange="updateDay(${index}, 'title', this.value)">
        <textarea placeholder="Focus" onchange="updateDay(${index}, 'focusLine', this.value)"></textarea>
        <textarea placeholder="Reflexión" onchange="updateDay(${index}, 'reflection', this.value)"></textarea>
        <textarea placeholder="Oración" onchange="updateDay(${index}, 'prayer', this.value)"></textarea>
        <input placeholder="Acción" onchange="updateDay(${index}, 'action', this.value)">
        <input placeholder="Verso memoria" onchange="updateDay(${index}, 'memoryVerse', this.value)">
      </div>
    `;
  });
}

function updateDay(index, key, value) {
  days[index][key] = value;
}

function generateJSON() {
  const data = {
    id: document.getElementById("id").value,
    title: document.getElementById("title").value,
    subtitle: document.getElementById("subtitle").value,
    estimatedMinutes: Number(document.getElementById("minutes").value),
    learningPoints,
    days
  };

  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);
}
