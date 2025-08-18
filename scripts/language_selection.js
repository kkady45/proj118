  document.addEventListener("DOMContentLoaded", () => {
    const langSelects = document.querySelectorAll(".translate");

    langSelects.forEach((el) => {
      el.value = localStorage.getItem("lang") || "de";

      el.addEventListener("change", (e) => {
        const newLang = e.target.value;
        localStorage.setItem("lang", newLang);
        updateTranslations(newLang);
      });
    });

    // Apply current language
    updateTranslations(localStorage.getItem("lang") || "de");
  });



function updateTranslations(lang) {
  const elements = document.querySelectorAll(".lang");
  lang = lang || localStorage.getItem("lang") || "en";
  elements.forEach((el) => {
    const key = el.getAttribute("key");
    if (languages[lang] && languages[lang][key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.value = languages[lang][key];
      } else {
        el.textContent = languages[lang][key];
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // تأكد من وجود لغة محفوظة
  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "de");
  }

  const lang = localStorage.getItem("lang");
  console.log("Detected language code: " + lang);

  // اضبط القيمة الأولية للقائمة
  document.querySelectorAll(".translate").forEach((el) => {
    el.value = lang;
    el.dispatchEvent(new Event("change"));
  });

  updateTranslations(lang);

  // تحديث اللغة عند تغييرها من القائمة
  document.querySelectorAll(".translate").forEach((el) => {
    el.addEventListener("change", function () {
      const selectedLang = this.value;
      localStorage.setItem("lang", selectedLang);
      console.log("Language changed to: " + selectedLang);
      updateTranslations(selectedLang);
    });
  });
});

