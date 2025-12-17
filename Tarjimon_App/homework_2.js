const inputLeft = document.getElementById("input");
const outputText = document.getElementById("outputText");
const swapBtn = document.querySelector(".carusel");
const enExampleEl = document.getElementById("enExample");
const ruExampleEl = document.getElementById("ruExample");
const uzExampleEl = document.getElementById("uzExample");

let dictionary = {};
let searchIndex = {};

document.addEventListener("DOMContentLoaded", () => {
  // ------BUILD SEARCH INDEX------------
  function buildSearchIndex(data) {
    const index = {};

    Object.keys(data).forEach((key) => {
      const item = data[key];
      if (!item || typeof item !== "object") return;

      item.__en_word = key;

      index[key.toLowerCase()] = item;

      if (item.UZ_word) {
        item.UZ_word.split(",").forEach((w) => {
          index[w.trim().toLowerCase()] = item;
        });
      }

      if (item.RU_word) {
        item.RU_word.split(",").forEach((w) => {
          index[w.trim().toLowerCase()] = item;
        });
      }
    });

    return index;
  }

  // --------- LOAD DATA --------
  let isReady = false;

  async function loadDictionary() {
    const res = await fetch("http://127.0.0.1:3000/users");
    const rawData = await res.json();

    dictionary = rawData;
    searchIndex = buildSearchIndex(rawData);
    isReady = true;

    console.log("Dictionary ready ✅");
  }

  loadDictionary();
  function translate() {
    if (!isReady) return;

    const word = inputLeft.value.trim().toLowerCase();
    if (!word) return;

    const leftLangInput = document.querySelector(
      '.langInput[data-lang="left"]'
    );
    const rightLangEl = document.querySelector('.langInput[data-lang="right"]');
    if (!rightLangEl) return;

    const rightLang = rightLangEl.value.trim();

    // AUTO DETECT + UI SYNC
    let detectedLang;

    //  Russian
    if (/^[а-яё\s]+$/i.test(word)) {
      detectedLang = "Russian";
      leftLangInput.value = "Russian";
    }
    //  Uzbek — dictionary orqali
    else if (
      searchIndex[word] &&
      searchIndex[word].UZ_word?.toLowerCase().includes(word)
    ) {
      detectedLang = "Uzbek";
      leftLangInput.value = "Uzbek";
    }
    //  Default → English
    else {
      detectedLang = "English";
      leftLangInput.value = "English";
    }

    const item = searchIndex[word];
    if (!item) {
      outputText.textContent = "Translation not found";
      return;
    }

    let result = "";

    if (detectedLang === "Russian") {
      if (rightLang === "Uzbek") result = item.UZ_word;
      if (rightLang === "English") result = item.__en_word;
    }

    if (detectedLang === "English") {
      if (rightLang === "Russian") result = item.RU_word;
      if (rightLang === "Uzbek") result = item.UZ_word;
    }

    if (detectedLang === "Uzbek") {
      if (rightLang === "English") result = item.__en_word;
      if (rightLang === "Russian") result = item.RU_word;
    }

    outputText.textContent = result || "Translation not found";

    enExampleEl.textContent = "EN: " + item.EN;
    uzExampleEl.textContent = "UZ: " + item.UZ;
    ruExampleEl.textContent = "RU: " + item.RU;
  }

  inputLeft.addEventListener("input", translate);

  // ------- SWAP --------
  swapBtn.addEventListener("click", () => {
    const leftLang = document.querySelector('.langInput[data-lang="left"]');
    const rightLang = document.querySelector('.langInput[data-lang="right"]');

    [leftLang.value, rightLang.value] = [rightLang.value, leftLang.value];
    inputLeft.value = "";
    outputText.textContent = "";
  });

  // ---------- DROPDOWN ---------
  document.querySelectorAll(".dropdown-wrapper").forEach((wrapper) => {
    const input = wrapper.querySelector(".langInput");
    const menu = wrapper.querySelector(".dropdown-menu");
    const icon = wrapper.querySelector(".dropdown-icon");

    const open = (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");
    };

    icon.addEventListener("click", open);
    input.addEventListener("click", open);

    menu.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (!li) return;
      input.value = li.textContent;
      menu.classList.add("hidden");
      translate();
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((m) => m.classList.add("hidden"));
  });

  // --------- SPEAK -----------

  let voices = [];

  window.speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
    console.log("Loaded voices:", voices);
  };

  function speakWord(text, langCode) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;

    const voice = voices.find((v) => v.lang === langCode);
    if (voice) {
      utterance.voice = voice;
    }

    speechSynthesis.cancel(); 
    speechSynthesis.speak(utterance);
  }

  function mapLangToVoice(lang) {
    lang = lang.toLowerCase();

    if (lang.includes("ru")) return "ru-RU";
    if (lang.includes("uz")) return "uz-UZ";
    return "en-US";
  }

  document.querySelector(".speak-left").addEventListener("click", () => {
    const lang = document.querySelector('.langInput[data-lang="left"]').value;
    speakWord(inputLeft.value, mapLangToVoice(lang));
  });

  document.querySelector(".speak-right").addEventListener("click", () => {
    const lang = document.querySelector('.langInput[data-lang="right"]').value;
    speakWord(outputText.textContent, mapLangToVoice(lang));
  });
});
