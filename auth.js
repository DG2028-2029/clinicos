/* =========================
   CLÍNICAS CONFIGURADAS
========================= */
const clinicas = {
  clinica1: {
    nombre: "Clínica San José",
    usuarios: {
      admin: { password: "1234", rol: "admin" },
      doctor: { password: "doc123", rol: "doctor" },
      recepcion: { password: "rec123", rol: "recepcion" }
    }
  },
  clinica2: {
    nombre: "Clínica Dental Sonrisa",
    usuarios: {
      admin: { password: "abcd", rol: "admin" }
    }
  }
};

/* =========================
   ELEMENTOS
========================= */
const mensaje = document.getElementById("mensaje");
const error = document.getElementById("error");
const loginBtn = document.getElementById("loginBtn");

/* =========================
   CLÍNICA (CON FALLBACK)
========================= */
const params = new URLSearchParams(window.location.search);
let clinicaID = params.get("clinica");

// 🔒 fallback automático (IMPORTANTE para celular)
if (!clinicaID) {
  clinicaID = localStorage.getItem("clinicaID") || "clinica1";
}

/* =========================
   MENSAJE
========================= */
if (!clinicas[clinicaID]) {
  mensaje.innerText = "Clínica no válida";
  loginBtn.disabled = true;
} else {
  mensaje.innerText = "Acceso a " + clinicas[clinicaID].nombre;
}

/* =========================
   LOGIN
========================= */
loginBtn.onclick = () => {
  error.innerText = "";

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!usuario || !password) {
    error.innerText = "Completa todos los campos";
    return;
  }

  const clinica = clinicas[clinicaID];
  if (!clinica || !clinica.usuarios[usuario]) {
    error.innerText = "Usuario no válido";
    return;
  }

  const data = clinica.usuarios[usuario];

  if (data.password !== password) {
    error.innerText = "Contraseña incorrecta";
    return;
  }

  // ✅ sesión limpia y completa
  localStorage.setItem("clinicaID", clinicaID);
  localStorage.setItem("clinicaNombre", clinica.nombre);
  localStorage.setItem("rol", data.rol);
  localStorage.setItem("usuario", usuario);
  localStorage.setItem("loginTime", new Date().toISOString());

  window.location.href = "dashboard.html";
};
