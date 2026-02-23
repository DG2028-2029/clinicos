/* =========================
   DASHBOARD CLINICOS
========================= */

const clinicaID = localStorage.getItem("clinicaID");
const clinicaNombre = localStorage.getItem("clinicaNombre");
const rol = localStorage.getItem("rol");

/* SEGURIDAD */
if (!clinicaID || !clinicaNombre || !rol) {
  window.location.href = "index.html";
}

/* INFO */
document.getElementById("clinica").innerText =
  `Bienvenido a ${clinicaNombre}`;

document.getElementById("usuarioInfo") &&
  (document.getElementById("usuarioInfo").innerText =
    `Rol: ${rol.toUpperCase()}`);

/* PACIENTES */
const pacientesKey = `pacientes_${clinicaID}`;
const pacientes = JSON.parse(localStorage.getItem(pacientesKey)) || [];

document.getElementById("totalPacientes").innerText =
  pacientes.length;

/* CITAS HOY */
const citasKey = `citas_${clinicaID}`;
const citas = JSON.parse(localStorage.getItem(citasKey)) || [];

const hoy = new Date().toISOString().split("T")[0];
const citasHoy = citas.filter(c => c.fecha === hoy).length;

/* STAT */
const stat = document.createElement("div");
stat.className = "stat-card";
stat.innerHTML = `
  <h2>${citasHoy}</h2>
  <p>Citas hoy</p>
`;
document.getElementById("statsContainer").appendChild(stat);

/* NAVEGACIÓN */
function irPacientes() {
  window.location.href = "pacientes.html";
}

function irCitas() {
  window.location.href = "citas.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
