// 🔥 NUEVA VERSIÓN: References con selector tipo (sin sobrescribir anterior)

function createReferenceBlock(container) {
  const refDiv = document.createElement('div');
  refDiv.className = 'reference-block';

  refDiv.innerHTML = `
    <select class="ref-title">
      <option value="Lectura principal">Lectura principal</option>
      <option value="Lectura de apoyo">Lectura de apoyo</option>
    </select>

    <input placeholder="Referencia (ej: Salmos 34:18-19)" class="ref-reference" />
    <input placeholder="BookId" type="number" class="ref-book" />
    <input placeholder="Chapter" type="number" class="ref-chapter" />
    <input placeholder="StartVerse" type="number" class="ref-start" />
    <input placeholder="EndVerse" type="number" class="ref-end" />
    <input placeholder="Verse (opcional)" type="number" class="ref-verse" />
  `;

  container.appendChild(refDiv);
}

function getReferences(container) {
  const refs = [];

  container.querySelectorAll('.reference-block').forEach(block => {
    const r = {
      title: block.querySelector('.ref-title').value,
      reference: block.querySelector('.ref-reference').value,
      bookId: parseInt(block.querySelector('.ref-book').value),
      chapter: parseInt(block.querySelector('.ref-chapter').value)
    };

    const start = block.querySelector('.ref-start').value;
    const end = block.querySelector('.ref-end').value;
    const verse = block.querySelector('.ref-verse').value;

    if (start && end) {
      r.startVerse = parseInt(start);
      r.endVerse = parseInt(end);
    } else if (verse) {
      r.verse = parseInt(verse);
    }

    refs.push(r);
  });

  return refs;
}
