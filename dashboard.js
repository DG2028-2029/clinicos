/* =========================
   DASHBOARD CLINICOS (FIX)
========================= */

const clinicaID = localStorage.getItem("clinicaID");
const clinicaNombre = localStorage.getItem("clinicaNombre");
const rol = localStorage.getItem("rol");

/* SEGURIDAD */
if (!clinicaID || !clinicaNombre || !rol) {
  window.location.replace("index.html");
}

/* INFO */
document.getElementById("clinica").innerText =
  `Bienvenido a ${clinicaNombre}`;

document.getElementById("usuarioInfo").innerText =
  `Rol: ${rol.toUpperCase()}`;

/* =========================
   PACIENTES
========================= */
const pacientes = JSON.parse(
  localStorage.getItem(`pacientes_${clinicaID}`)
) || [];

document.getElementById("totalPacientes").innerText =
  pacientes.length;

/* =========================
   CITAS HOY
========================= */
const statsContainer = document.getElementById("statsContainer");
if (statsContainer) {
  const citas = JSON.parse(
    localStorage.getItem(`citas_${clinicaID}`)
  ) || [];

  const hoy = new Date().toISOString().split("T")[0];
  const citasHoy = citas.filter(c => c.fecha === hoy).length;

  const stat = document.createElement("div");
  stat.className = "stat-card";
  stat.innerHTML = `
    <h2>${citasHoy}</h2>
    <p>Citas hoy</p>
  `;

  statsContainer.appendChild(stat);
}

/* =========================
   NAVEGACIÓN
========================= */
function irPacientes() {
  window.location.href = "./pacientes.html";
}

function irCitas() {
  window.location.href = "./citas.html";
}

function logout() {
  localStorage.clear();
  window.location.replace("index.html");
}

