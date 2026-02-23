/* =========================
   CITAS
========================= */

// 🔐 Verificar sesión
if (!localStorage.getItem("clinicaID")) {
  alert("Sesión inválida");
  window.location.href = "index.html";
}

/* =========================
   ELEMENTOS
========================= */
const lista = document.getElementById("listaCitas");
const select = document.getElementById("pacienteSelect");
const fecha = document.getElementById("fecha");
const hora = document.getElementById("hora");

/* =========================
   DATA
========================= */
let citas = getCitas();

/* =========================
   CARGAR PACIENTES (CLAVE)
========================= */
function cargarPacientes() {
  const pacientes = getPacientes(); // 🔥 SIEMPRE RECARGA

  select.innerHTML = `<option value="">Seleccione un paciente</option>`;

  if (pacientes.length === 0) {
    select.innerHTML += `<option disabled>No hay pacientes</option>`;
    return;
  }

  pacientes.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.nombre;
    select.appendChild(option);
  });
}

/* =========================
   GUARDAR
========================= */
function guardar() {
  saveCitas(citas);
  render();
}

/* =========================
   RENDER
========================= */
function render() {
  lista.innerHTML = "";

  if (citas.length === 0) {
    lista.innerHTML = "<p>No hay citas</p>";
    return;
  }

  const pacientes = getPacientes(); // 🔥 siempre actualizado

  citas
    .sort(
      (a, b) =>
        new Date(`${a.fecha} ${a.hora}`) -
        new Date(`${b.fecha} ${b.hora}`)
    )
    .forEach((c, i) => {
      const paciente = pacientes.find(p => p.id === c.pacienteID);

      lista.innerHTML += `
        <li>
          <strong>${paciente ? paciente.nombre : "Paciente eliminado"}</strong><br>
          ${c.fecha} – ${c.hora}
          <button onclick="eliminar(${i})">Eliminar</button>
        </li>
      `;
    });
}

/* =========================
   AGREGAR CITA
========================= */
function agregarCita() {
  if (!select.value || !fecha.value || !hora.value) {
    alert("Completa todos los campos");
    return;
  }

  if (
    citas.some(
      c => c.fecha === fecha.value && c.hora === hora.value
    )
  ) {
    alert("Horario ocupado");
    return;
  }

  citas.push({
    pacienteID: Number(select.value),
    fecha: fecha.value,
    hora: hora.value,
    creado: new Date().toLocaleString()
  });

  fecha.value = "";
  hora.value = "";
  select.value = "";

  guardar();
}

/* =========================
   ELIMINAR
========================= */
function eliminar(i) {
  if (!confirm("Eliminar cita")) return;
  citas.splice(i, 1);
  guardar();
}

/* =========================
   VOLVER
========================= */
function volver() {
  window.location.href = "dashboard.html";
}

/* =========================
   INIT
========================= */
cargarPacientes();
render();
