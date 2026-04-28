import { useEffect, useMemo, useState } from "react";
import { githubBlob } from "../data/siteMeta";

interface Method {
  id: string;
  method: string;
  domain: string;
  domainLabel: string;
  subgroup: string;
  subgroupLabel: string;
  nvi: string;
  sharp: string;
  risk: string;
  status: string;
}

interface Domain {
  key: string;
}

interface Labels {
  status: Record<string, string>;
  risk: Record<string, string>;
  domains: Record<string, { label: string }>;
  subgroups: Record<string, string>;
  table: {
    method: string;
    domain: string;
    subgroup: string;
    nviSharp: string;
    risk: string;
    status: string;
  };
}

interface FilterLabels {
  search: string;
  allDomains?: string;
  allStatuses: string;
  allRisks: string;
  operational: string;
  comingSoon: string;
  review: string;
  high: string;
}

interface Props {
  methods: Method[];
  domains?: Domain[];
  labels: Labels;
  filterLabels: FilterLabels;
  filtersAria: string;
  storageKey: string;
  mode: "home" | "communication";
}

function readStored(storageKey: string) {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "{}");
  } catch {
    return {};
  }
}

function StatusBadge({ status, labels }: { status: Method["status"]; labels: Labels }) {
  return <span className={`badge status ${status === "operational" ? "operational" : "soon"}`}>{labels.status[status]}</span>;
}

function RiskBadge({ risk, labels }: { risk: Method["risk"]; labels: Labels }) {
  return <span className={`badge risk ${risk === "high" ? "high" : "review"}`}>{labels.risk[risk]}</span>;
}

export default function CatalogTable({ methods, domains = [], labels, filterLabels, filtersAria, storageKey, mode }: Props) {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState("");
  const [hasLoadedStoredFilters, setHasLoadedStoredFilters] = useState(false);

  useEffect(() => {
    const stored = readStored(storageKey);
    if (typeof stored.search === "string") setSearch(stored.search);
    if (typeof stored.domain === "string") setDomain(stored.domain);
    if (typeof stored.status === "string") setStatus(stored.status);
    if (typeof stored.risk === "string") setRisk(stored.risk);
    setHasLoadedStoredFilters(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hasLoadedStoredFilters) return;
    const payload: Record<string, string> = { search, status, risk };
    if (mode === "home") payload.domain = domain;
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [domain, hasLoadedStoredFilters, mode, risk, search, status, storageKey]);

  const subgroupLabel = (method: Method) => labels.subgroups[method.subgroup] ?? method.subgroupLabel;

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return methods.filter((method) => {
      const domainText = labels.domains[method.domain]?.label || method.domainLabel;
      const haystack = `${method.id} ${method.method} ${domainText} ${method.subgroup} ${subgroupLabel(method)}`.toLowerCase();
      return (!q || haystack.includes(q)) &&
        (mode !== "home" || !domain || method.domain === domain) &&
        (!status || method.status === status) &&
        (!risk || method.risk === risk);
    });
  }, [domain, labels.domains, labels.subgroups, methods, mode, risk, search, status]);

  return (
    <>
      <div className={`filters ${mode === "communication" ? "domain-filters" : ""}`} aria-label={filtersAria}>
        <input id="search" value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder={filterLabels.search} />
        {mode === "home" && (
          <select id="domainFilter" value={domain} onChange={(event) => setDomain(event.target.value)} aria-label={filterLabels.allDomains}>
            <option value="">{filterLabels.allDomains}</option>
            {domains.map((item) => (
              <option value={item.key} key={item.key}>
                {labels.domains[item.key].label}
              </option>
            ))}
          </select>
        )}
        <select id="statusFilter" value={status} onChange={(event) => setStatus(event.target.value)} aria-label={filterLabels.allStatuses}>
          <option value="">{filterLabels.allStatuses}</option>
          <option value="operational">{filterLabels.operational}</option>
          <option value="coming_soon">{filterLabels.comingSoon}</option>
        </select>
        <select id="riskFilter" value={risk} onChange={(event) => setRisk(event.target.value)} aria-label={filterLabels.allRisks}>
          <option value="">{filterLabels.allRisks}</option>
          <option value="review">{filterLabels.review}</option>
          <option value="high">{filterLabels.high}</option>
        </select>
      </div>
      <div className="table-wrap">
        <table className={mode === "home" ? "catalog-table" : "domain-table"}>
          <colgroup>
            {mode === "home" ? (
              <>
                <col style={{ width: "44%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "12%" }} />
              </>
            ) : (
              <>
                <col style={{ width: "42%" }} />
                <col style={{ width: "27%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "9%" }} />
                <col style={{ width: "11%" }} />
              </>
            )}
          </colgroup>
          <thead>
            <tr>
              <th>{labels.table.method}</th>
              <th>{mode === "home" ? labels.table.domain : labels.table.subgroup}</th>
              <th>{labels.table.nviSharp}</th>
              <th>{labels.table.risk}</th>
              <th>{labels.table.status}</th>
            </tr>
          </thead>
          <tbody id="catalogBody">
            {rows.map((method) => (
              <tr key={method.id}>
                <td data-label={labels.table.method}>
                  {method.status === "operational" ? (
                    <a className="method-id" href={githubBlob(`skills-catalog/${method.id}/SKILL.md`)}>
                      {method.id}
                    </a>
                  ) : (
                    <span className="method-id">{method.id}</span>
                  )}
                  <div className="method-name">{method.method}</div>
                  {mode === "home" && <div className="meta">{method.subgroup} - {subgroupLabel(method)}</div>}
                </td>
                <td data-label={mode === "home" ? labels.table.domain : labels.table.subgroup}>
                  {mode === "home" ? labels.domains[method.domain].label : (
                    <>
                      {method.subgroup}
                      <div className="meta">{subgroupLabel(method)}</div>
                    </>
                  )}
                </td>
                <td data-label={labels.table.nviSharp}>{method.nvi} / {method.sharp}</td>
                <td data-label={labels.table.risk}><RiskBadge risk={method.risk} labels={labels} /></td>
                <td data-label={labels.table.status}><StatusBadge status={method.status} labels={labels} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
