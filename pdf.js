/* =========================
   PDF HISTORIAL CLÍNICO PRO
========================= */

function generarPDF(nombrePaciente, historial) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("HISTORIAL CLÍNICO", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Paciente: ${nombrePaciente}`, 10, 30);
  doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 38);

  let y = 50;

  historial.forEach((h, i) => {
    doc.setFontSize(12);
    doc.text(`${i + 1}. ${h.tipo} — ${h.fecha}`, 10, y);
    y += 6;

    doc.setFontSize(11);
    const texto = doc.splitTextToSize(h.texto, 180);
    doc.text(texto, 10, y);
    y += texto.length * 6 + 8;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.setFontSize(10);
  doc.text("Documento generado por ClinicOS", 105, 290, { align: "center" });

  doc.save(`Historial_${nombrePaciente}.pdf`);
}

