const CRS_REPO = "https://github.com/levnikolaevich/civil-resistance-skills";

function lang() {
  return document.documentElement.lang || "en";
}

function rootPath() {
  return document.body.dataset.root || "";
}

function withHash(url) {
  return url + (window.location.hash || "");
}

async function loadContent() {
  const response = await fetch(`${rootPath()}data/site-content.json`);
  if (!response.ok) throw new Error(`Unable to load site content: ${response.status}`);
  const content = await response.json();
  return content[lang()] || content.en;
}

function initLanguageSwitch() {
  document.querySelectorAll(".lang-switch a").forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http")) return;
      event.preventDefault();
      window.location.href = withHash(href);
    });
  });
}

function initCopyButtons(labels) {
  document.querySelectorAll(".codebox").forEach(button => {
    const label = button.querySelector("span");
    if (label) label.textContent = labels.copy;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy || button.innerText);
        if (label) label.textContent = labels.copied;
        setTimeout(() => { if (label) label.textContent = labels.copy; }, 1300);
      } catch {
        if (label) label.textContent = labels.copy;
      }
    });
  });
}

function badgeStatus(status, labels) {
  const cls = status === "operational" ? "operational" : "soon";
  return `<span class="badge status ${cls}">${labels.status[status]}</span>`;
}

function badgeRisk(risk, labels) {
  return `<span class="badge risk ${risk === "high" ? "high" : "review"}">${labels.risk[risk]}</span>`;
}

function methodLink(method) {
  if (method.status !== "operational") return `<span class="method-id">${method.id}</span>`;
  return `<a class="method-id" href="${CRS_REPO}/blob/main/skills-catalog/${method.id}/SKILL.md">${method.id}</a>`;
}

function readStoredFilters(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function writeStoredFilters(key, fields) {
  const filters = {};
  for (const [name, element] of Object.entries(fields)) filters[name] = element.value;
  localStorage.setItem(key, JSON.stringify(filters));
}

function restoreStoredFilters(key, fields) {
  const filters = readStoredFilters(key);
  for (const [name, element] of Object.entries(fields)) {
    if (typeof filters[name] === "string") element.value = filters[name];
  }
}

function initHomePage(content) {
  const data = window.CRS_REGISTRY;
  const labels = content.common;
  const domainGrid = document.getElementById("domainGrid");
  const catalogBody = document.getElementById("catalogBody");
  const domainFilter = document.getElementById("domainFilter");
  const search = document.getElementById("search");
  const statusFilter = document.getElementById("statusFilter");
  const riskFilter = document.getElementById("riskFilter");
  const filterKey = "civil-resistance-skills:atlas-filters";

  for (const [key, value] of Object.entries(data.stats)) {
    const node = document.querySelector(`[data-stat="${key}"]`);
    if (node) node.textContent = value;
  }

  data.domains.forEach(domain => {
    const domainLabel = labels.domains[domain.key];
    const option = document.createElement("option");
    option.value = domain.key;
    option.textContent = domainLabel.label;
    domainFilter.appendChild(option);

    const active = domain.operational > 0;
    const card = document.createElement("article");
    card.className = "card domain-card";
    card.innerHTML = `
      <div>
        <div class="domain-top">
          <div>
            <div class="domain-code">Domain ${domain.code} / ${domain.plugin}</div>
            <h3>${domainLabel.label}</h3>
          </div>
          <span class="badge ${active ? "operational" : "soon"}">${active ? labels.active : labels.comingSoon}</span>
        </div>
        <p>${domainLabel.description}</p>
      </div>
      <div>
        <div class="meta">${domain.count} ${labels.indexedMethods} / ${domain.highRisk} ${labels.highRiskRecords}</div>
        ${active ? `<a href="${document.body.dataset.commHref}">${labels.openDomain}</a>` : `<span class="meta">${labels.noOperational}</span>`}
      </div>`;
    domainGrid.appendChild(card);
  });

  function renderCatalog() {
    const q = search.value.trim().toLowerCase();
    const domain = domainFilter.value;
    const status = statusFilter.value;
    const risk = riskFilter.value;
    const rows = data.methods.filter(method => {
      const domainLabel = labels.domains[method.domain].label;
      const haystack = `${method.id} ${method.method} ${domainLabel} ${method.subgroup} ${method.subgroupLabel}`.toLowerCase();
      return (!q || haystack.includes(q)) &&
        (!domain || method.domain === domain) &&
        (!status || method.status === status) &&
        (!risk || method.risk === risk);
    });
    catalogBody.innerHTML = rows.map(method => `
      <tr>
        <td data-label="${labels.table.method}">
          ${methodLink(method)}
          <div class="method-name">${method.method}</div>
          <div class="meta">${method.subgroup} - ${method.subgroupLabel}</div>
        </td>
        <td data-label="${labels.table.domain}">${labels.domains[method.domain].label}</td>
        <td data-label="${labels.table.nviSharp}">${method.nvi} / ${method.sharp}</td>
        <td data-label="${labels.table.risk}">${badgeRisk(method.risk, labels)}</td>
        <td data-label="${labels.table.status}">${badgeStatus(method.status, labels)}</td>
      </tr>`).join("");
  }

  const fields = { search, domain: domainFilter, status: statusFilter, risk: riskFilter };
  restoreStoredFilters(filterKey, fields);
  Object.values(fields).forEach(el => el.addEventListener("input", () => {
    writeStoredFilters(filterKey, fields);
    renderCatalog();
  }));
  renderCatalog();
}

function initCommunicationPage(content) {
  const labels = content.common;
  const data = window.CRS_REGISTRY.methods.filter(method => method.domain === "comm");
  const catalogBody = document.getElementById("catalogBody");
  const search = document.getElementById("search");
  const statusFilter = document.getElementById("statusFilter");
  const riskFilter = document.getElementById("riskFilter");
  const filterKey = "civil-resistance-skills:communication-filters";

  function renderCatalog() {
    const q = search.value.trim().toLowerCase();
    const status = statusFilter.value;
    const risk = riskFilter.value;
    const rows = data.filter(method => {
      const haystack = `${method.id} ${method.method} ${method.subgroup} ${method.subgroupLabel}`.toLowerCase();
      return (!q || haystack.includes(q)) &&
        (!status || method.status === status) &&
        (!risk || method.risk === risk);
    });
    catalogBody.innerHTML = rows.map(method => `
      <tr>
        <td data-label="${labels.table.method}">${methodLink(method)}<div class="method-name">${method.method}</div></td>
        <td data-label="${labels.table.subgroup}">${method.subgroup}<div class="meta">${method.subgroupLabel}</div></td>
        <td data-label="${labels.table.nviSharp}">${method.nvi} / ${method.sharp}</td>
        <td data-label="${labels.table.risk}">${badgeRisk(method.risk, labels)}</td>
        <td data-label="${labels.table.status}">${badgeStatus(method.status, labels)}</td>
      </tr>`).join("");
  }

  const fields = { search, status: statusFilter, risk: riskFilter };
  restoreStoredFilters(filterKey, fields);
  Object.values(fields).forEach(el => el.addEventListener("input", () => {
    writeStoredFilters(filterKey, fields);
    renderCatalog();
  }));
  renderCatalog();
}

async function initSite() {
  initLanguageSwitch();
  const content = await loadContent();
  initCopyButtons(content.common);
  if (document.body.dataset.page === "home") initHomePage(content);
  if (document.body.dataset.page === "communication") initCommunicationPage(content);
}

initSite().catch(error => {
  console.error(error);
});
