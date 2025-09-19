// File: /api/visitor.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    // Ganti dengan URL Google Apps Script yang sudah Anda deploy
    const scriptUrl = "https://script.google.com/macros/s/AKfycbz9I5EUrtdVFLPml6yikMEjweF_x3JsbJKowS-LTj3RUlBjDPfStiUQM9aiPA32hZdKtw/exec";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}