/* =========================
   UI MANAGER PRO
   Toasts + Loader
========================= */

const UI = (() => {
  let container;

  function init() {
    if (container) return;

    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  function toast(message, type = "info", time = 3000) {
    init();

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("hide");
      setTimeout(() => toast.remove(), 400);
    }, time);
  }

  return {
    success: msg => toast(msg, "success"),
    error: msg => toast(msg, "error"),
    info: msg => toast(msg, "info")
  };
})();
