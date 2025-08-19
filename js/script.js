async function loadLinks(jsonPath = "data/links.json") {
  try {
    const response = await fetch(jsonPath);
    const links = await response.json();

    const container = document.getElementById("links-container");
    container.innerHTML = ""; // clear dulu

    links.forEach(link => {
  const a = document.createElement("a");
  a.href = link.url;
  a.className = "card";

  // kalau bukan link eksternal, biar buka di halaman yang sama
  if (link.url.startsWith("http")) {
    a.target = "_blank";
  }

  const icon = document.createElement("i");
  icon.className = `fas ${link.icon}`;

  const span = document.createElement("span");
  span.innerHTML = link.title; // ✅ pakai innerHTML agar <br> dari JSON terbaca

  a.appendChild(icon);
  a.appendChild(span);
  container.appendChild(a);
});


  } catch (error) {
    console.error("Gagal load links:", error);
  }
}
