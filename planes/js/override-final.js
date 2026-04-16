// Override final para forzar uso de nuevo sistema
window.addDay = function() {
  const container = document.getElementById('days');
  createDayBlock(container);
};

window.generateJSON = function() {
  const plan = {
    id: document.getElementById('id').value,
    title: document.getElementById('title').value,
    subtitle: document.getElementById('subtitle').value,
    estimatedMinutes: parseInt(document.getElementById('minutes').value),
    learningPoints: [],
    days: getDays(document.getElementById('days'))
  };

  document.querySelectorAll('#learningList input').forEach(i => {
    if (i.value.trim()) plan.learningPoints.push(i.value);
  });

  document.getElementById('output').value = JSON.stringify(plan, null, 2);
};
