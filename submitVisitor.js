// Ganti URL_API berikut dengan URL Web App dari Google Apps Script kamu
const URL_API = "https://script.google.com/macros/s/AKfycbxYourDeploymentID/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("visitorForm");
  const notif = document.getElementById("notif");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Ambil data form
    const formData = new FormData(form);
    const data = {
      type: "visitor", // penting untuk membedakan dengan investor
      namaLengkap: formData.get("namaLengkap").trim(),
      asal: formData.get("asal").trim(),
      alamat: formData.get("alamat").trim(),
      nomorHP: formData.get("nomorHP").trim(),
      tanggalKunjungan: formData.get("tanggalKunjungan")
    };

    // Validasi sederhana
    if (!data.namaLengkap || !data.nomorHP || !data.tanggalKunjungan) {
      notif.innerHTML = `<div class="alert alert-warning">⚠️ Mohon lengkapi Nama, Nomor HP, dan Tanggal Kunjungan.</div>`;
      return;
    }

    try {
      const res = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (json.ok) {
        notif.innerHTML = `<div class="alert alert-success">✅ ${json.message}</div>`;
        form.reset();
      } else {
        notif.innerHTML = `<div class="alert alert-danger">❌ ${json.message}</div>`;
      }
    } catch (err) {
      notif.innerHTML = `<div class="alert alert-danger">❌ Gagal mengirim: ${err}</div>`;
    }
  });
});
