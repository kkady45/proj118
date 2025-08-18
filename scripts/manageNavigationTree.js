function openModule(module) {
  localStorage.setItem("currentModule", module);
  window.location.href = "modules/modules.html";
}

function loadModule(module) {
  const target = document.getElementById(module);
  if (!target) return;

  fetch("modules/" + module.split("_")[1] + ".html")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load module HTML");
      return res.text();
    })
    .then((html) => {
      target.innerHTML = html;
    })
    .catch((err) => console.error(err));
}

function initSubtrees() {
  console.log("Loading navigation tree...");
  for (let i = 1; i <= 4; i++) {
    loadModule("pc_module" + i);
    // loadModule("mobile_module" + i); // future update
  }
  console.log("Loaded navigation tree");
}

document.addEventListener("DOMContentLoaded", () => {
  if ("currentModule" in localStorage) {
    console.log(localStorage.getItem("currentModule"));
  }
  // updateTranslations(localStorage.getItem("lang")); ← only call if needed
});

function unfoldNavigationTree(subtree) {
  const moduleName = subtree.split("_")[0];
  const allElements = document.querySelectorAll("*");
  const this_subtree_list = [];
  const another_subtree_list = [];

  allElements.forEach((el) => {
    const className = el.getAttribute("class") || "";
    if (/module_subtree/.test(className)) {
      if (className.includes(moduleName)) {
        this_subtree_list.push(el);
      } else {
        another_subtree_list.push(el);
      }
    }
    if (/unit_subtree/.test(className)) {
      if (subtree.includes("unit_subtree") && className === subtree) {
        this_subtree_list.push(el);
      } else {
        another_subtree_list.push(el);
      }
    }
  });

  if (subtree.includes("module_subtree")) {
    const allVisible = this_subtree_list.every(
      (tree) => tree.style.display === "inline"
    );

    if (allVisible) {
      allElements.forEach((el) => {
        const cls = el.getAttribute("class") || "";
        if (
          new RegExp(moduleName + ".*module_subtree").test(cls) ||
          new RegExp(moduleName + ".*unit_subtree").test(cls)
        ) {
          el.style.display = "none";
        }
      });
      return;
    }
  }

  this_subtree_list.forEach((tree) => {
    if (tree.style.display === "inline" && tree.className === subtree) {
      tree.style.display = "none";
    } else {
      tree.style.display = "inline";
    }
  });

  another_subtree_list.forEach((tree) => {
    tree.style.display = "none";
  });
}
