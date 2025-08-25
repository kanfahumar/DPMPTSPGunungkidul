export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    // URL WebApp Google Apps Script kamu
    const GAS_URL = "https://script.google.com/macros/s/AKfycbyOyvLsWwD92MFEAe695QLe2Gq9KOOdNAJiTHhWFYdCv1-Ytk3CtJ2a3pHOFhvArRbW/exec";

    // Forward body ke GAS
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // Ambil respon sebagai text, lalu parse JSON manual
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      json = { ok: false, message: "Invalid JSON from GAS", raw: text };
    }

    return res.status(200).json(json);

  } catch (err) {
    return res.status(500).json({ ok: false, message: err.toString() });
  }
}

