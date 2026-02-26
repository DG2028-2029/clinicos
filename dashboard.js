// NO redirigir antes de cargar
setTimeout(() => verificarSesion(), 50);

const clinicaNombre = localStorage.getItem("clinicaNombre") || "ClinicOS";
const rol = localStorage.getItem("rol") || "";

document.getElementById("clinica").innerText =
  "Bienvenido a " + clinicaNombre;

document.getElementById("usuarioInfo").innerText =
  rol ? `Rol: ${rol}` : "";

// Pacientes
const pacientes = getPacientes();
document.getElementById("totalPacientes").innerText = pacientes.length;

// Citas hoy
const citas = getCitas();
const hoy = new Date().toISOString().split("T")[0];
const citasHoy = citas.filter(c => c.fecha === hoy).length;

const stat = document.createElement("div");
stat.className = "stat-card";
stat.innerHTML = `<h2>${citasHoy}</h2><p>Citas hoy</p>`;
document.getElementById("stats").appendChild(stat);

// BOTONES (EVENT LISTENERS = 100% fiable)
document.getElementById("btnPacientes").onclick =
  () => window.location.href = "./pacientes.html";

document.getElementById("btnCitas").onclick =
  () => window.location.href = "./citas.html";

document.getElementById("btnLogout").onclick =
  () => cerrarSesion();

