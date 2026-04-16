let days = [];
let learningPoints = [];

/* ---------- LEARNING ---------- */
function addLearning() {
  const val = prompt("Nuevo punto:");
  if (!val) return;
  learningPoints.push(val);
  renderLearning();
}

function renderLearning() {
  const div = document.getElementById("learningList");
  div.innerHTML = learningPoints.map((l, i) =>
    `<div>${i+1}. ${l} <button onclick="removeLearning(${i})">x</button></div>`
  ).join("");
}

function removeLearning(i){
  learningPoints.splice(i,1);
  renderLearning();
}

/* ---------- DAYS ---------- */
function addDay() {
  days.push({
    day: days.length + 1,
    title: "",
    focusLine: "",
    beforeReading: "",
    references: [],
    passageHighlight: "",
    reflection: "",
    question: "",
    prayer: "",
    action: "",
    memoryVerse: ""
  });
  renderDays();
}

function removeDay(i){
  days.splice(i,1);
  days.forEach((d, idx)=> d.day = idx+1);
  renderDays();
}

function updateDay(i, key, value){
  days[i][key] = value;
}

/* ---------- REFERENCES ---------- */
function addReference(i){
  days[i].references.push({
    title: "",
    reference: "",
    bookId: "",
    chapter: "",
    startVerse: "",
    endVerse: "",
    verse: ""
  });
  renderDays();
}

function removeReference(i, r){
  days[i].references.splice(r,1);
  renderDays();
}

function updateReference(i, r, key, value){
  days[i].references[r][key] = value;
}

/* ---------- RENDER ---------- */
function renderDays(){
  const container = document.getElementById("days");
  container.innerHTML = "";

  days.forEach((d, i)=>{
    container.innerHTML += `
      <div class="day">
        <h3>Día ${d.day}</h3>
        <button onclick="removeDay(${i})">Eliminar día</button>

        <input placeholder="Título" onchange="updateDay(${i},'title',this.value)">
        <textarea placeholder="Focus Line" onchange="updateDay(${i},'focusLine',this.value)"></textarea>
        <textarea placeholder="Before Reading" onchange="updateDay(${i},'beforeReading',this.value)"></textarea>

        <h4>Referencias</h4>
        ${d.references.map((r,ri)=>`
          <div class="ref">
            <button onclick="removeReference(${i},${ri})">x</button>

            <input placeholder="Tipo" onchange="updateReference(${i},${ri},'title',this.value)">
            <input placeholder="Referencia" onchange="updateReference(${i},${ri},'reference',this.value)">
            <input placeholder="bookId" onchange="updateReference(${i},${ri},'bookId',this.value)">
            <input placeholder="chapter" onchange="updateReference(${i},${ri},'chapter',this.value)">
            <input placeholder="startVerse" onchange="updateReference(${i},${ri},'startVerse',this.value)">
            <input placeholder="endVerse" onchange="updateReference(${i},${ri},'endVerse',this.value)">
            <input placeholder="verse" onchange="updateReference(${i},${ri},'verse',this.value)">
          </div>
        `).join("")}

        <button onclick="addReference(${i})">+ Referencia</button>

        <textarea placeholder="Pasaje destacado" onchange="updateDay(${i},'passageHighlight',this.value)"></textarea>
        <textarea placeholder="Reflexión" onchange="updateDay(${i},'reflection',this.value)"></textarea>
        <textarea placeholder="Pregunta" onchange="updateDay(${i},'question',this.value)"></textarea>
        <textarea placeholder="Oración" onchange="updateDay(${i},'prayer',this.value)"></textarea>
        <input placeholder="Acción" onchange="updateDay(${i},'action',this.value)">
        <input placeholder="Verso memoria" onchange="updateDay(${i},'memoryVerse',this.value)">
      </div>
    `;
  });
}

/* ---------- JSON ---------- */
function generateJSON(){
  const data = {
    id: document.getElementById("id").value,
    title: document.getElementById("title").value,
    subtitle: document.getElementById("subtitle").value,
    estimatedMinutes: Number(document.getElementById("minutes").value),
    learningPoints,
    days
  };

  document.getElementById("output").value =
    JSON.stringify(data, null, 2);
}

function downloadJSON(){
  generateJSON();
  const blob = new Blob([document.getElementById("output").value], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "plan.json";
  a.click();
}
