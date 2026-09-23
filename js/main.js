(function () {
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderRecord(record) {
    const linkEntries = Object.entries(record.links || {});
    const linksHtml = linkEntries
      .map(([label, filename]) => {
        const href = (record.folder || "") + filename;
        return `<a class="link-btn" href="${escapeHtml(href)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
      })
      .join("");

    return `
      <article class="record-card">
        <div class="record-card-head">
          <span class="badge">${escapeHtml(record.session || "")}</span>
          <span class="record-date">${escapeHtml(record.date || "")}${record.time ? "・" + escapeHtml(record.time) : ""}</span>
        </div>
        <h3 class="record-topic">${escapeHtml(record.topic || "")}</h3>
        ${record.summary ? `<p class="record-summary">${escapeHtml(record.summary)}</p>` : ""}
        ${record.presenter ? `<p class="record-presenter">分享者：${escapeHtml(record.presenter)}</p>` : ""}
        <div class="record-links">${linksHtml}</div>
      </article>
    `;
  }

  function init() {
    const container = document.getElementById("records-list");
    const countEl = document.getElementById("record-count");
    if (!container || typeof communityRecords === "undefined") return;

    if (communityRecords.length === 0) {
      container.innerHTML = `<p class="empty-state">目前還沒有活動紀錄，聚會結束後會在這裡更新。</p>`;
      countEl.textContent = "0";
      return;
    }

    container.innerHTML = communityRecords.map(renderRecord).join("");
    countEl.textContent = String(communityRecords.length);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
