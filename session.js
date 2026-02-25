/* =========================
   SESSION MANAGER PRO (FIX)
========================= */

const SESSION = {
  clinicaID: "clinicaID",
  clinicaNombre: "clinicaNombre",
  rol: "rol",
  lastActivity: "ultimaActividad"
};

const TIMEOUT = 20 * 60 * 1000; // 20 minutos

function verificarSesion() {
  const clinicaID = localStorage.getItem(SESSION.clinicaID);
  const rol = localStorage.getItem(SESSION.rol);

  if (!clinicaID || !rol) {
    window.location.replace("index.html");
  }
}

function actualizarActividad() {
  localStorage.setItem(SESSION.lastActivity, Date.now());
}

function verificarInactividad() {
  const last = Number(localStorage.getItem(SESSION.lastActivity));
  if (!last) return;

  if (Date.now() - last > TIMEOUT) {
    alert("Sesión cerrada por inactividad");
    cerrarSesion();
  }
}

function cerrarSesion() {
  Object.values(SESSION).forEach(k =>
    localStorage.removeItem(k)
  );
  window.location.replace("index.html");
}

["click", "keydown", "mousemove"].forEach(evt =>
  document.addEventListener(evt, actualizarActividad)
);

verificarSesion();
actualizarActividad();
setInterval(verificarInactividad, 60 * 1000);
