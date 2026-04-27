// File: /api/kepeminatan.js
export const config = {
  api: { bodyParser: { sizeLimit: "5mb" } },
};

export default async function handler(req, res) {
  // Tambah CORS header
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbz9I5EUrtdVFLPml6yikMEjweF_x3JsbJKowS-LTj3RUlBjDPfStiUQM9aiPA32hZdKtw/exec";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      redirect: "follow", // ← GAS sering redirect, ini penting!
    });

    const text = await response.text();
    console.log("GAS response:", text); // cek di Vercel logs

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { ok: false, message: "Invalid JSON dari GAS", raw: text };
    }

    return res.status(200).json(json);
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ ok: false, message: err.toString() });
  }
}
