let days = [];
let learningPoints = [];

/* ---------- INIT ---------- */
window.onload = function () {
  renderDays();
  renderLearning();
};

/* ---------- BOOKS ---------- */
const books = [
  { id: 1, name: "Génesis" },
  { id: 2, name: "Éxodo" },
  { id: 3, name: "Levítico" },
  { id: 4, name: "Números" },
  { id: 5, name: "Deuteronomio" }
];

/* ---------- HELPERS ---------- */
function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderFieldRow(label, controlHtml, extraClass = "") {
  const className = extraClass ? `field-row ${extraClass}` : "field-row";
  return `
    <div class="${className}">
      <div class="field-label">${label}</div>
      <div class="field-control">
        ${controlHtml}
      </div>
    </div>
  `;
}

/* ---------- LEARNING ---------- */
function addLearning() {
  const val = prompt("Nuevo punto:");
  if (!val) return;
  learningPoints.push(val);
  renderLearning();
}

function renderLearning() {
  const div = document.getElementById("learningList");
  if (!div) return;

  div.innerHTML = learningPoints
    .map(
      (l, i) => `
        <div class="learning-item">
          <span>${i + 1}. ${escapeHtml(l)}</span>
          <button onclick="removeLearning(${i})">x</button>
        </div>
      `
    )
    .join("");
}

function removeLearning(i) {
  learningPoints.splice(i, 1);
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

function removeDay(i) {
  days.splice(i, 1);
  days.forEach((d, idx) => (d.day = idx + 1));
  renderDays();
}

function updateDay(i, key, value) {
  days[i][key] = value;
}

function addReference(i) {
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

function removeReference(i, r) {
  days[i].references.splice(r, 1);
  renderDays();
}

function updateReference(i, r, key, value) {
  days[i].references[r][key] = value;
  renderDays();
}

/* ---------- RENDER ---------- */
function renderReference(dayIndex, referenceIndex, r) {
  return `
    <div class="ref">
      <div class="ref-header">
        <h4>Referencia ${referenceIndex + 1}</h4>
        <button onclick="removeReference(${dayIndex},${referenceIndex})">Eliminar</button>
      </div>

      ${renderFieldRow(
        "Tipo",
        `
          <select onchange="updateReference(${dayIndex},${referenceIndex},'title',this.value)">
            <option value="">Seleccionar</option>
            <option value="Lectura principal" ${r.title === "Lectura principal" ? "selected" : ""}>Lectura principal</option>
            <option value="Lectura de apoyo" ${r.title === "Lectura de apoyo" ? "selected" : ""}>Lectura de apoyo</option>
          </select>
        `
      )}

      ${renderFieldRow(
        "Referencia",
        `<input placeholder="Referencia" value="${escapeHtml(r.reference || "")}" onchange="updateReference(${dayIndex},${referenceIndex},'reference',this.value)">`
      )}

      ${renderFieldRow(
        "Libro",
        `
          <div class="inline-fields">
            <select onchange="updateReference(${dayIndex},${referenceIndex},'bookId', this.value)">
              <option value="">Libro</option>
              ${books
                .map(
                  (b) => `
                    <option value="${b.id}" ${String(r.bookId) === String(b.id) ? "selected" : ""}>
                      ${b.name}
                    </option>
                  `
                )
                .join("")}
            </select>

            <input
              placeholder="bookId"
              value="${escapeHtml(r.bookId || "")}"
              readonly
            >
          </div>
        `
      )}

      ${renderFieldRow(
        "Capítulo",
        `<input placeholder="chapter" value="${escapeHtml(r.chapter || "")}" onchange="updateReference(${dayIndex},${referenceIndex},'chapter',this.value)">`
      )}

      ${renderFieldRow(
        "Verso inicio",
        `<input placeholder="startVerse" value="${escapeHtml(r.startVerse || "")}" onchange="updateReference(${dayIndex},${referenceIndex},'startVerse',this.value)">`
      )}

      ${renderFieldRow(
        "Verso fin",
        `<input placeholder="endVerse" value="${escapeHtml(r.endVerse || "")}" onchange="updateReference(${dayIndex},${referenceIndex},'endVerse',this.value)">`
      )}

      ${renderFieldRow(
        "Verso único",
        `<input placeholder="verse" value="${escapeHtml(r.verse || "")}" onchange="updateReference(${dayIndex},${referenceIndex},'verse',this.value)">`
      )}
    </div>
  `;
}

function renderDays() {
  const container = document.getElementById("days");
  if (!container) return;

  container.innerHTML = "";

  days.forEach((d, i) => {
    const referencesHtml = d.references.map((r, ri) => renderReference(i, ri, r)).join("");

    container.innerHTML += `
      <div class="day">
        <div class="day-header">
          <h3>Día ${d.day}</h3>
          <button onclick="removeDay(${i})">Eliminar día</button>
        </div>

        ${renderFieldRow(
          "Título",
          `<input placeholder="Título" value="${escapeHtml(d.title || "")}" onchange="updateDay(${i},'title',this.value)">`
        )}

        ${renderFieldRow(
          "Focus Line",
          `<textarea placeholder="Focus Line" onchange="updateDay(${i},'focusLine',this.value)">${escapeHtml(d.focusLine || "")}</textarea>`
        )}

        ${renderFieldRow(
          "Before Reading",
          `<textarea placeholder="Before Reading" onchange="updateDay(${i},'beforeReading',this.value)">${escapeHtml(d.beforeReading || "")}</textarea>`
        )}

        ${renderFieldRow(
          "Referencias",
          `
            ${referencesHtml}
            <button onclick="addReference(${i})">+ Referencia</button>
          `,
          "section-row"
        )}

        ${renderFieldRow(
          "Pasaje destacado",
          `<textarea placeholder="Pasaje destacado" onchange="updateDay(${i},'passageHighlight',this.value)">${escapeHtml(d.passageHighlight || "")}</textarea>`
        )}

        ${renderFieldRow(
          "Reflexión",
          `<textarea placeholder="Reflexión" onchange="updateDay(${i},'reflection',this.value)">${escapeHtml(d.reflection || "")}</textarea>`
        )}

        ${renderFieldRow(
          "Pregunta",
          `<textarea placeholder="Pregunta" onchange="updateDay(${i},'question',this.value)">${escapeHtml(d.question || "")}</textarea>`
        )}

        ${renderFieldRow(
          "Oración",
          `<textarea placeholder="Oración" onchange="updateDay(${i},'prayer',this.value)">${escapeHtml(d.prayer || "")}</textarea>`
        )}

        ${renderFieldRow(
          "Acción",
          `<input placeholder="Acción" value="${escapeHtml(d.action || "")}" onchange="updateDay(${i},'action',this.value)">`
        )}

        ${renderFieldRow(
          "Verso memoria",
          `<input placeholder="Verso memoria" value="${escapeHtml(d.memoryVerse || "")}" onchange="updateDay(${i},'memoryVerse',this.value)">`
        )}
      </div>
    `;
  });
}

/* ---------- JSON ---------- */
function generateJSON() {
  const data = {
    id: document.getElementById("id").value,
    title: document.getElementById("title").value,
    subtitle: document.getElementById("subtitle").value,
    estimatedMinutes: Number(document.getElementById("minutes").value),
    learningPoints,
    days
  };

  document.getElementById("output").value = JSON.stringify(data, null, 2);
}

function downloadJSON() {
  generateJSON();
  const blob = new Blob([document.getElementById("output").value], {
    type: "application/json"
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "plan.json";
  a.click();
}
