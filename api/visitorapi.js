// visitorapi.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    // Kirim data ke Google Apps Script Web App
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxUNvVb5DtbkJdzyZNs87AzFY5irq-6nblgj5-ngbfnd4kcAeQS4b8q4IBDLnaJiWDw/exec";

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
