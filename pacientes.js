/* =========================
   PACIENTES | ClinicOS
========================= */

// 🔐 Verificar sesión
const clinicaID = localStorage.getItem("clinicaID");
if (!clinicaID) {
  alert("Sesión inválida. Vuelve a iniciar sesión.");
  window.location.href = "index.html";
}

/* =========================
   DATOS DE SESIÓN
========================= */
const rol = localStorage.getItem("rol") || "admin";

/* =========================
   ELEMENTOS DOM
========================= */
const nombreInput = document.getElementById("nombre");
const edadInput = document.getElementById("edad");
const telefonoInput = document.getElementById("telefono");
const busquedaInput = document.getElementById("busqueda");
const lista = document.getElementById("listaPacientes");

/* =========================
   DATA
========================= */
let pacientes = [];

try {
  const data = getPacientes();
  pacientes = Array.isArray(data) ? data : [];
} catch {
  pacientes = [];
}

/* =========================
   GUARDAR
========================= */
function guardar() {
  savePacientes(pacientes);
  render();
}

/* =========================
   VALIDACIONES
========================= */
function validarPaciente(nombre, edad, telefono) {
  if (!nombre) return "El nombre es obligatorio";

  if (edad && (edad < 0 || edad > 120)) {
    return "Edad no válida";
  }

  if (telefono && telefono.length < 6) {
    return "Teléfono no válido";
  }

  return null;
}

/* =========================
   RENDER
========================= */
function render(data = pacientes) {
  lista.innerHTML = "";

  if (!data.length) {
    lista.innerHTML = "<li>No hay pacientes registrados</li>";
    return;
  }

  data.forEach(p => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${p.nombre}</strong><br>
      Edad: ${p.edad || "-"}<br>
      Tel: ${p.telefono || "-"}<br><br>

      <button type="button" onclick="verHistorial(${p.id})">
        📋 Historial
      </button>

      <button type="button" onclick="editarPaciente(${p.id})">
        ✏️ Editar
      </button>

      ${
        rol !== "recepcion"
          ? `<button type="button" onclick="eliminarPaciente(${p.id})">
               🗑️ Eliminar
             </button>`
          : ""
      }
    `;

    lista.appendChild(li);
  });
}

/* =========================
   AGREGAR
========================= */
function agregarPaciente() {
  const nombre = nombreInput.value.trim();
  const edad = edadInput.value.trim();
  const telefono = telefonoInput.value.trim();

  const error = validarPaciente(nombre, edad, telefono);
  if (error) {
    alert(error);
    return;
  }

  // Evitar duplicados
  const existe = pacientes.some(
    p =>
      p.nombre.toLowerCase() === nombre.toLowerCase() &&
      p.telefono === telefono
  );

  if (existe) {
    alert("Este paciente ya está registrado");
    return;
  }

  pacientes.push({
    id: Date.now(),
    nombre,
    edad,
    telefono,
    creado: new Date().toISOString()
  });

  nombreInput.value = "";
  edadInput.value = "";
  telefonoInput.value = "";

  guardar();
}

/* =========================
   EDITAR (PRO)
========================= */
function editarPaciente(id) {
  const p = pacientes.find(p => p.id === id);
  if (!p) return;

  const nuevoNombre = prompt("Nombre:", p.nombre);
  if (!nuevoNombre) return;

  const nuevaEdad = prompt("Edad:", p.edad || "");
  const nuevoTelefono = prompt("Teléfono:", p.telefono || "");

  const error = validarPaciente(
    nuevoNombre.trim(),
    nuevaEdad,
    nuevoTelefono
  );

  if (error) {
    alert(error);
    return;
  }

  p.nombre = nuevoNombre.trim();
  p.edad = nuevaEdad;
  p.telefono = nuevoTelefono;

  guardar();
}

/* =========================
   ELIMINAR
========================= */
function eliminarPaciente(id) {
  if (rol === "recepcion") {
    alert("No tienes permisos para eliminar");
    return;
  }

  const confirmar = confirm("¿Seguro que deseas eliminar este paciente?");
  if (!confirmar) return;

  pacientes = pacientes.filter(p => p.id !== id);
  guardar();
}

/* =========================
   HISTORIAL
========================= */
function verHistorial(id) {
  localStorage.setItem("pacienteActual", String(id));
  window.location.href = "historial.html";
}

/* =========================
   BUSCAR / FILTRAR
========================= */
function filtrarPacientes() {
  const texto = busquedaInput.value.toLowerCase();

  const filtrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    (p.telefono && p.telefono.includes(texto))
  );

  render(filtrados);
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
render();
