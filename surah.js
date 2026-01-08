const params = new URLSearchParams(window.location.search);
const surahId = parseInt(params.get('id'));
const selectedReciterId = params.get('reciter') || localStorage.getItem('selectedReciter') || 'bader-hafs';

const reciterNameEl = document.getElementById('reciter-name');
const reciterFooterEl = document.getElementById('reciter-footer');
const riwayaSelect = document.getElementById('riwayaSelect');
const themeSelect = document.getElementById('themeSelect');
const audio = document.getElementById('surah-audio');

let allReciters = [];
let currentReciter = null;
let currentSurah = null;

// Theme setup
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(`theme-${savedTheme}`);
themeSelect.value = savedTheme;
themeSelect.addEventListener('change', () => {
  document.body.classList.remove(`theme-${localStorage.getItem('theme')}`);
  const newTheme = themeSelect.value;
  document.body.classList.add(`theme-${newTheme}`);
  localStorage.setItem('theme', newTheme);
});

fetch('reciters.json')
  .then(res => res.json())
  .then(data => {
    allReciters = data.reciters;
    const baseReciterName = selectedReciterId.split('-')[0];
    const availableRiwayat = allReciters.filter(r => r.id.startsWith(baseReciterName));

    availableRiwayat.forEach(r => {
      const option = document.createElement('option');
      option.value = r.id;
