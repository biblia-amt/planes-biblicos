// 🔥 VERSION FINAL FORZADA - SIN CONFLICTOS

window.createReferenceBlock = function(container) {
  const refDiv = document.createElement('div');
  refDiv.className = 'reference-block';

  refDiv.innerHTML = `
    <select class="ref-title">
      <option value="Lectura principal">Lectura principal</option>
      <option value="Lectura de apoyo">Lectura de apoyo</option>
    </select>

    <input placeholder="Referencia" class="ref-reference" />
    <input type="number" placeholder="BookId" class="ref-book" />
    <input type="number" placeholder="Chapter" class="ref-chapter" />
    <input type="number" placeholder="StartVerse" class="ref-start" />
    <input type="number" placeholder="EndVerse" class="ref-end" />
    <input type="number" placeholder="Verse" class="ref-verse" />
  `;

  container.appendChild(refDiv);
};

window.getReferences = function(container) {
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
};
