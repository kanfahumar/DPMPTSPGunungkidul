// File: /api/kepeminatan.js
export const config = {
  api: { bodyParser: { sizeLimit: "5mb" } }, // antisipasi tanda tangan base64
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }
  try {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbwWwIYgIhaafZk_GXX3i4YsfQutcCz5cgOswYRXSMZZAdk5mmG2PZKz6FGJsKkSA2JGVQ/exec";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { ok: false, message: "Invalid JSON dari Google Apps Script", raw: text };
    }

    return res.status(response.status).json(json);
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.toString() });
  }
}
