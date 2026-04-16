// 🔥 DAYS COMPLETO: crea toda la estructura real del JSON

function createDayBlock(container) {
  const dayDiv = document.createElement('div');
  dayDiv.className = 'day-block';

  const referencesContainerId = 'refs-' + Date.now();

  dayDiv.innerHTML = `
    <h3>Día</h3>

    <input placeholder="Número de día" type="number" class="day-number" />
    <input placeholder="Título" class="day-title" />

    <textarea placeholder="FocusLine" class="day-focus"></textarea>
    <textarea placeholder="BeforeReading" class="day-before"></textarea>

    <h4>References</h4>
    <div class="references-container" id="${referencesContainerId}"></div>
    <button class="btn-add-ref">+ Reference</button>

    <textarea placeholder="Passage Highlight" class="day-highlight"></textarea>
    <textarea placeholder="Reflection" class="day-reflection"></textarea>
    <textarea placeholder="Question" class="day-question"></textarea>
    <textarea placeholder="Prayer" class="day-prayer"></textarea>
    <textarea placeholder="Action" class="day-action"></textarea>

    <input placeholder="Memory Verse" class="day-memory" />
  `;

  container.appendChild(dayDiv);

  const refContainer = dayDiv.querySelector('.references-container');

  dayDiv.querySelector('.btn-add-ref').onclick = () => {
    createReferenceBlock(refContainer);
  };
}

function getDays(container) {
  const days = [];

  container.querySelectorAll('.day-block').forEach(dayEl => {
    const d = {
      day: parseInt(dayEl.querySelector('.day-number').value),
      title: dayEl.querySelector('.day-title').value,
      focusLine: dayEl.querySelector('.day-focus').value,
      beforeReading: dayEl.querySelector('.day-before').value,
      references: getReferences(dayEl.querySelector('.references-container')),
      passageHighlight: dayEl.querySelector('.day-highlight').value,
      reflection: dayEl.querySelector('.day-reflection').value,
      question: dayEl.querySelector('.day-question').value,
      prayer: dayEl.querySelector('.day-prayer').value,
      action: dayEl.querySelector('.day-action').value,
      memoryVerse: dayEl.querySelector('.day-memory').value
    };

    days.push(d);
  });

  return days;
}
