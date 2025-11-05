const surahInput = document.getElementById("surahInput");
const loadSurahBtn = document.getElementById("loadSurah");
const showAllSurahBtn = document.getElementById("showAllSurahs");
const surahInfo = document.querySelector(".surah-info");
const ayahList = document.querySelector(".ayah-list");

const API_BASE = "https://api.alquran.cloud/v1";
const AUDIO_EDITION = "ar.alafasy";
const TEXT_EDITION = "quran-uthmani";

const contentArea = document.querySelector(".content-area");

async function fetchSurah(surahNumber) {
  try {
    contentArea.innerHTML = '<div class="loading">Yuklanmoqda...</div>';

    const [textResponse, audioResponse] = await Promise.all([
      fetch(`${API_BASE}/surah/${surahNumber}/${TEXT_EDITION}`),
      fetch(`${API_BASE}/surah/${surahNumber}/${AUDIO_EDITION}`),
    ]);

    if (!textResponse.ok || !audioResponse.ok) {
      throw new Error("Ma'lumotlarni yuklashda xatolik");
    }

    const textData = await textResponse.json();
    const audioData = await audioResponse.json();

    displaySurah(textData.data, audioData.data);
  } catch (error) {
    contentArea.innerHTML = `<div class="error">Xatolik: ${error.message}. Iltimos, qaytadan urinib ko'ring.</div>`;
  }
}

function displaySurah(textData, audioData) {
  surahInfo.innerHTML = `
    <h2> <span class="arabic">${textData.name}</span> - ${textData.englishName}</h2>
    <p><strong>Oyatlar soni:</strong> ${textData.numberOfAyahs}</p>
    <p><strong>Nozil bo'lgan joyi:</strong> ${textData.revelationType}</p>
  `;

  ayahList.innerHTML = "";

  textData.ayahs.forEach((ayah, index) => {
    const li = document.createElement("li");
    li.classList.add("ayah-item");

    const audioUrl = audioData.ayahs[index]?.audio || "";

    li.innerHTML = `
      <div class="ayah-number">${ayah.numberInSurah}</div>
      <div class="ayah-text">${ayah.text}</div>
      <button class="play-btn" onclick="new Audio('${audioUrl}').play()"> Tinglash</button>
    `;

    ayahList.appendChild(li);
  });

  contentArea.innerHTML = "";
  contentArea.appendChild(surahInfo);
  contentArea.appendChild(ayahList);
}

async function loadAllSurahs() {
  contentArea.innerHTML =
    '<div class="loading">Barcha suralar yuklanmoqda...</div>';

  const res = await fetch(`${API_BASE}/surah`);
  const data = await res.json();
  const surahs = data.data;

  const grid = document.createElement("div");
  grid.classList.add("surah-list");

  surahs.forEach((s) => {
    const card = document.createElement("div");
    card.classList.add("surah-card");
    card.innerHTML = `
  <h3>${s.number}. ${s.name} (${s.englishName})</h3>
  <p>${s.englishNameTranslation}</p>
  <small>${s.revelationType}</small>
`;
    card.addEventListener("click", () => fetchSurah(s.number));
    grid.appendChild(card);
  });

  contentArea.innerHTML = "";
  contentArea.appendChild(grid);
}

loadSurahBtn.addEventListener("click", () => {
  const num = parseInt(surahInput.value);
  if (!num || num < 1 || num > 114) {
    alert("1 dan 114 gacha sura raqamini kiriting!");
    return;
  }
  fetchSurah(num);
});

surahInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const num = parseInt(surahInput.value);
    if (!num || num < 1 || num > 114) {
      alert("1 dan 114 gacha sura raqamini kiriting!");
      return;
    }
    fetchSurah(num);
  }
});

showAllSurahBtn.addEventListener("click", loadAllSurahs);
document.addEventListener("DOMContentLoaded", () => fetchSurah(1));
