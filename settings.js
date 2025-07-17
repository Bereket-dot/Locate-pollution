const form = document.getElementById('settings-form');
const saved = JSON.parse(localStorage.getItem('settings') || '{}');

Object.keys(saved).forEach(key => {
  form.elements[key].checked = saved[key];
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    'weekly-summary': form.elements['weekly-summary'].checked,
    'nearby-events': form.elements['nearby-events'].checked,
    tips: form.elements.tips.checked
  };
  localStorage.setItem('settings', JSON.stringify(data));
  alert('Settings saved!');
});
