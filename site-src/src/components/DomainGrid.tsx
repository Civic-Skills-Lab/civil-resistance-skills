interface Domain {
  key: string;
  code: string;
  plugin: string;
  count: number;
  highRisk: number;
  operational: number;
}

interface Labels {
  active: string;
  comingSoon: string;
  indexedMethods: string;
  highRiskRecords: string;
  openDomain: string;
  noOperational: string;
  domainWord: string;
  domains: Record<string, { label: string; description: string }>;
}

interface Props {
  domains: Domain[];
  labels: Labels;
  communicationHref: string;
}

export default function DomainGrid({ domains, labels, communicationHref }: Props) {
  return (
    <div className="grid" id="domainGrid">
      {domains.map((domain) => {
        const localized = labels.domains[domain.key];
        const active = domain.operational > 0;
        return (
          <article className="card domain-card" key={domain.key}>
            <div>
              <div className="domain-top">
                <div>
                  <div className="domain-code">
                    {labels.domainWord} {domain.code} / {domain.plugin}
                  </div>
                  <h3>{localized.label}</h3>
                </div>
                <span className={`badge ${active ? "operational" : "soon"}`}>
                  {active ? labels.active : labels.comingSoon}
                </span>
              </div>
              <p>{localized.description}</p>
            </div>
            <div>
              <div className="meta">
                {domain.count} {labels.indexedMethods} / {domain.highRisk} {labels.highRiskRecords}
              </div>
              {active ? <a href={communicationHref}>{labels.openDomain}</a> : <span className="meta">{labels.noOperational}</span>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
