// For testing and development
const clientSecret_test = "NxZGTdH80aBC001DhD8csna-vt";
const clientId_test = "8f78d856-af80-4198-bcba-ef52dd77e7d4";
const URL_auth_test = "https://prelive-oauth2.quran.foundation";
const URL_test = "https://apis-prelive.quran.foundation";

// For live applications
const clientId_prod = "5b796a73-2ff7-4ebf-874a-68259264d253";
const clientSecret_prod = "PBuhZUezD8DaieYUnUVQyx-Vzx";
const URL_auth_prod = "https://oauth2.quran.foundation";
const URL_prod = "https://apis.quran.foundation";
const contentDiv = document.querySelector(".content-area");

/**
 * API orqali ma`lumotlarni olish uchun ACCESS_TOKEN generatsiya qilish funksiyasi
 * @returns access token
 */

async function getAccessToken() {
  const auth = btoa(
    unescape(encodeURIComponent(`${clientId_prod}:${clientSecret_prod}`))
  );

  try {
    const response = await fetch(`${URL_auth_prod}/oauth2/token`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&scope=content",
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
  }
}

/**
 * Quran suralarini yuklab olish funksiyasi
 * @param {*} accessToken access token
 * @param {*} clientId  mijoz identifikatsiya kodi
 * @returns
 */
async function getChapters(accessToken, clientId) {
  try {
    const response = await fetch(
      `${URL_test}/content/api/v4/verses/by_chapter/1?words=true&word_fields=text_uthmani_simple,audio_url`,
      {
        headers: {
          "x-auth-token": accessToken,
          "x-client-id": clientId,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }
}
console.log("Starting the app...");

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    try {
      const accessToken = await getAccessToken();
      console.log("Access token received ✅");

      const result = await getChapters(accessToken, clientId_prod);
      console.log("Fetched verses count:", result.verses.length);

      result.verses.forEach((verse, index) => {
        const fullText = verse.words
          .filter((w) => w.char_type_name === "word")
          .map((w) => w.text_uthmani_simple)
          .join(" ");
        const firstAudio = verse.words.find((w) => w.audio_url)?.audio_url;

        console.log(`\n${index + 1}. ${verse.verse_key}`);
        console.log("Text:", fullText);
        const p = document.createElement("p");
        p.textContent = `${verse.verse_key}. ${fullText}
        ${audio_url}`;
        contentDiv.appendChild(p);
        console.log("Audio URL:", firstAudio || "❌ not available");
      });
    } catch (err) {
      console.error("❌ Error:", err);
    }
  })();
});
