export const config = {
  api: { bodyParser: { sizeLimit: "5mb" } }, // antisipasi tanda tangan base64
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyWbfm6ZEaUPlqWE3aoBAcQhkjCC_Wc6MWmm3O6jXiD-HQsfuioyXfATv5Db53riNNk/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { ok: false, message: "Invalid JSON from GAS", raw: text };
    }

    return res.status(response.status).json(json);
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.toString() });
  }
}
