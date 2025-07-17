const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let reports = JSON.parse(localStorage.getItem('reports') || '[]');
reports.forEach(addReportMarker);

const reportBtn = document.getElementById('report-btn');
const modal = document.getElementById('report-modal');
reportBtn.addEventListener('click', () => modal.classList.remove('hidden'));
document.getElementById('cancel-report').addEventListener('click', () => modal.classList.add('hidden'));

document.getElementById('report-form').addEventListener('submit', e => {
  e.preventDefault();
  const photo = e.target.photo.value;
  const notes = e.target.notes.value;
  const { lat, lng } = map.getCenter();
  const report = { lat, lng, photo, notes };
  reports.push(report);
  localStorage.setItem('reports', JSON.stringify(reports));
  addReportMarker(report);
  modal.classList.add('hidden');
  e.target.reset();
});

function addReportMarker({ lat, lng, photo, notes }) {
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<img src="${photo}" alt="Plastic" style="width:100px"><p>${notes}</p>`);
}
