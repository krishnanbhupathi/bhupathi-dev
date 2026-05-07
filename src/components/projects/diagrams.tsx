/* eslint-disable react/no-unknown-property */
/**
 * Architecture diagrams for project cards. Pure SVG, replicated 1:1 from
 * the original HTML. Uses the diag-* utility classes in globals.css.
 */

const SVG_PROPS = {
  viewBox: '0 0 480 270',
  preserveAspectRatio: 'xMidYMid meet' as const,
};

export const AnalyticsDiagram = () => (
  <svg {...SVG_PROPS} aria-label="Event pipeline architecture">
    {/* Sources */}
    <text x="24" y="32" className="diag-caption">Sources</text>
    <rect x="24" y="42" width="82" height="28" className="diag-node" />
    <text x="36" y="60" className="diag-label">Web SDK</text>
    <rect x="24" y="78" width="82" height="28" className="diag-node" />
    <text x="36" y="96" className="diag-label">Mobile SDK</text>
    <rect x="24" y="114" width="82" height="28" className="diag-node" />
    <text x="36" y="132" className="diag-label">Server API</text>

    {/* Ingest */}
    <text x="150" y="32" className="diag-caption">Ingest</text>
    <rect x="150" y="60" width="86" height="64" className="diag-node-accent" />
    <text x="164" y="88" className="diag-label">Kafka</text>
    <text x="164" y="104" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      Streaming
    </text>

    {/* Processing */}
    <text x="278" y="32" className="diag-caption">Processing</text>
    <rect x="278" y="50" width="92" height="28" className="diag-node" />
    <text x="292" y="68" className="diag-label">Enrich · Node</text>
    <rect x="278" y="86" width="92" height="28" className="diag-node" />
    <text x="292" y="104" className="diag-label">Dedup · Redis</text>
    <rect x="278" y="122" width="92" height="28" className="diag-node" />
    <text x="292" y="140" className="diag-label">Aggregate</text>

    {/* Storage */}
    <text x="412" y="32" className="diag-caption">Storage</text>
    <rect x="412" y="50" width="44" height="40" className="diag-node-dark" />
    <text x="420" y="73" className="diag-label-light">OLAP</text>
    <text x="420" y="84" className="diag-label-light" style={{ fontSize: 8 }}>
      ClickHouse
    </text>
    <rect x="412" y="102" width="44" height="40" className="diag-node" />
    <text x="420" y="124" className="diag-label">OLTP</text>
    <text x="420" y="134" className="diag-label" style={{ fontSize: 8 }}>
      Postgres
    </text>

    {/* Query / UI */}
    <rect x="150" y="180" width="86" height="46" className="diag-node" />
    <text x="164" y="202" className="diag-label">Query engine</text>
    <text x="164" y="216" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      Low-latency
    </text>

    <rect x="278" y="180" width="178" height="46" className="diag-node-accent" />
    <text x="292" y="202" className="diag-label">Self-serve dashboard</text>
    <text x="292" y="216" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      Next.js · SSR + streaming
    </text>

    {/* Edges */}
    <path d="M106 56 L150 78" className="diag-edge" />
    <path d="M106 92 L150 92" className="diag-edge" />
    <path d="M106 128 L150 106" className="diag-edge" />
    <path d="M236 92 L278 64" className="diag-edge" />
    <path d="M236 92 L278 100" className="diag-edge" />
    <path d="M236 92 L278 136" className="diag-edge" />
    <path d="M370 100 L412 72" className="diag-edge" />
    <path d="M370 136 L412 122" className="diag-edge" />
    <path d="M412 122 L236 200" className="diag-edge-dashed" />
    <path d="M236 200 L278 200" className="diag-edge" />

    <text x="24" y="248" className="diag-caption">
      Real-time event pipeline · Kafka → ClickHouse + self-serve UI
    </text>
  </svg>
);

export const TreasuryDiagram = () => (
  <svg {...SVG_PROPS} aria-label="Treasury integration architecture">
    {/* Bank APIs */}
    <text x="24" y="32" className="diag-caption">Bank APIs</text>
    {[
      { y: 42, label: 'Bank A' },
      { y: 68, label: 'Bank B' },
      { y: 94, label: 'Bank C' },
      { y: 120, label: 'Bank D' },
      { y: 146, label: '+ more' },
    ].map((b) => (
      <g key={b.label}>
        <rect x="24" y={b.y} width="78" height="22" className="diag-node" />
        <text x="34" y={b.y + 15} className="diag-label">{b.label}</text>
      </g>
    ))}

    {/* Normalizer */}
    <rect x="134" y="78" width="94" height="58" className="diag-node-accent" />
    <text x="144" y="104" className="diag-label">Normalizer</text>
    <text x="144" y="118" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      Unified schema
    </text>

    {/* Ledger core */}
    <rect x="258" y="60" width="104" height="92" className="diag-node-dark" />
    <text x="272" y="86" className="diag-label-light">Double-entry</text>
    <text x="272" y="102" className="diag-label-light">ledger core</text>
    <text x="272" y="124" className="diag-label-light" style={{ fontSize: 9, opacity: 0.7 }}>
      Postgres
    </text>
    <text x="272" y="138" className="diag-label-light" style={{ fontSize: 9, opacity: 0.7 }}>
      AWS KMS · signed
    </text>

    {/* Auth + audit */}
    <rect x="134" y="164" width="94" height="28" className="diag-node" />
    <text x="148" y="182" className="diag-label">RBAC · SSO</text>
    <rect x="258" y="164" width="104" height="28" className="diag-node" />
    <text x="274" y="182" className="diag-label">Signed audit trail</text>

    {/* Outputs */}
    <text x="390" y="32" className="diag-caption">Outputs</text>
    <rect x="390" y="50" width="66" height="26" className="diag-node" />
    <text x="400" y="67" className="diag-label">Recon</text>
    <rect x="390" y="82" width="66" height="26" className="diag-node" />
    <text x="400" y="99" className="diag-label">SOC 2 export</text>
    <rect x="390" y="114" width="66" height="26" className="diag-node-accent" />
    <text x="400" y="131" className="diag-label">Portal UI</text>
    <rect x="390" y="146" width="66" height="26" className="diag-node" />
    <text x="400" y="163" className="diag-label">Stripe payouts</text>

    {/* Edges */}
    <path d="M102 53 L134 100" className="diag-edge" />
    <path d="M102 79 L134 106" className="diag-edge" />
    <path d="M102 105 L134 112" className="diag-edge" />
    <path d="M102 131 L134 118" className="diag-edge" />
    <path d="M102 157 L134 124" className="diag-edge" />
    <path d="M228 107 L258 107" className="diag-edge" />
    <path d="M362 90 L390 63" className="diag-edge" />
    <path d="M362 100 L390 95" className="diag-edge" />
    <path d="M362 120 L390 127" className="diag-edge" />
    <path d="M362 140 L390 159" className="diag-edge" />
    <path d="M181 164 L181 136" className="diag-edge-dashed" />
    <path d="M310 164 L310 152" className="diag-edge-dashed" />

    <text x="24" y="248" className="diag-caption">
      Multi-entity treasury · SOC 2 ready · multi-bank reconciliation
    </text>
  </svg>
);

export const AIWorkflowDiagram = () => (
  <svg {...SVG_PROPS} aria-label="AI agent workflow architecture">
    {/* Inbound */}
    <text x="24" y="32" className="diag-caption">Inbound</text>
    <rect x="24" y="42" width="88" height="26" className="diag-node" />
    <text x="36" y="59" className="diag-label">Email · S3 drop</text>
    <rect x="24" y="74" width="88" height="26" className="diag-node" />
    <text x="36" y="91" className="diag-label">Vendor EDI</text>
    <rect x="24" y="106" width="88" height="26" className="diag-node" />
    <text x="36" y="123" className="diag-label">Slack upload</text>

    {/* Parser */}
    <rect x="142" y="58" width="92" height="60" className="diag-node-accent" />
    <text x="154" y="82" className="diag-label">Doc parser</text>
    <text x="154" y="98" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      OCR + Claude
    </text>
    <text x="154" y="112" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      High volume
    </text>

    {/* Orchestrator */}
    <rect x="264" y="48" width="108" height="80" className="diag-node-dark" />
    <text x="276" y="74" className="diag-label-light">Temporal</text>
    <text x="276" y="90" className="diag-label-light">orchestrator</text>
    <text x="276" y="110" className="diag-label-light" style={{ fontSize: 9, opacity: 0.7 }}>
      Retries · state
    </text>
    <text x="276" y="122" className="diag-label-light" style={{ fontSize: 9, opacity: 0.7 }}>
      Human-in-loop
    </text>

    {/* Agent tools */}
    <text x="24" y="162" className="diag-caption">Agent tools</text>
    <rect x="24" y="172" width="70" height="26" className="diag-node" />
    <text x="34" y="189" className="diag-label">Vendor DB</text>
    <rect x="100" y="172" width="70" height="26" className="diag-node" />
    <text x="110" y="189" className="diag-label">Price check</text>
    <rect x="176" y="172" width="70" height="26" className="diag-node" />
    <text x="186" y="189" className="diag-label">Policy rules</text>

    {/* Outputs */}
    <rect x="400" y="60" width="60" height="26" className="diag-node-accent" />
    <text x="410" y="77" className="diag-label">Slack</text>
    <rect x="400" y="92" width="60" height="26" className="diag-node" />
    <text x="410" y="109" className="diag-label">NetSuite</text>
    <rect x="400" y="124" width="60" height="26" className="diag-node" />
    <text x="410" y="141" className="diag-label">Email reply</text>

    {/* Approvals */}
    <rect x="264" y="172" width="108" height="26" className="diag-node" />
    <text x="276" y="189" className="diag-label">Slack approvals</text>

    {/* Edges */}
    <path d="M112 55 L142 78" className="diag-edge" />
    <path d="M112 87 L142 88" className="diag-edge" />
    <path d="M112 119 L142 98" className="diag-edge" />
    <path d="M234 88 L264 88" className="diag-edge" />
    <path d="M372 78 L400 73" className="diag-edge" />
    <path d="M372 88 L400 105" className="diag-edge" />
    <path d="M372 98 L400 137" className="diag-edge" />
    <path d="M318 128 L318 172" className="diag-edge-dashed" />
    <path d="M59 172 L59 128" className="diag-edge-dashed" />
    <path d="M135 172 L135 128" className="diag-edge-dashed" />
    <path d="M211 172 L211 128" className="diag-edge-dashed" />

    <text x="24" y="248" className="diag-caption">
      LLM + Temporal workflow · doc parsing · vendor triage · Slack approvals
    </text>
  </svg>
);

export const ClinicalDiagram = () => (
  <svg {...SVG_PROPS} aria-label="Clinical operations platform flow">
    {/* Patient */}
    <text x="24" y="32" className="diag-caption">Patient</text>
    <rect x="24" y="42" width="90" height="30" className="diag-node-accent" />
    <text x="36" y="61" className="diag-label">Intake form</text>
    <rect x="24" y="82" width="90" height="24" className="diag-node" />
    <text x="36" y="98" className="diag-label">ID verify</text>
    <rect x="24" y="114" width="90" height="24" className="diag-node" />
    <text x="36" y="130" className="diag-label">Insurance</text>

    {/* Triage */}
    <rect x="144" y="60" width="94" height="58" className="diag-node" />
    <text x="156" y="84" className="diag-label">Triage rules</text>
    <text x="156" y="100" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      Symptom → dept
    </text>

    {/* Scheduler */}
    <rect x="268" y="48" width="104" height="82" className="diag-node-dark" />
    <text x="280" y="72" className="diag-label-light">Clinician</text>
    <text x="280" y="88" className="diag-label-light">scheduler</text>
    <text x="280" y="108" className="diag-label-light" style={{ fontSize: 9, opacity: 0.7 }}>
      Availability
    </text>
    <text x="280" y="120" className="diag-label-light" style={{ fontSize: 9, opacity: 0.7 }}>
      Room + telemed
    </text>

    {/* Visit */}
    <rect x="402" y="60" width="54" height="58" className="diag-node" />
    <text x="412" y="86" className="diag-label">Visit</text>
    <text x="412" y="102" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      Video
    </text>
    <text x="412" y="114" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      or in-clinic
    </text>

    {/* Downstream */}
    <text x="24" y="162" className="diag-caption">Downstream · automated</text>
    <rect x="24" y="172" width="90" height="26" className="diag-node" />
    <text x="34" y="189" className="diag-label">e-Prescription</text>
    <rect x="124" y="172" width="90" height="26" className="diag-node" />
    <text x="134" y="189" className="diag-label">Lab order</text>
    <rect x="224" y="172" width="90" height="26" className="diag-node-accent" />
    <text x="234" y="189" className="diag-label">Billing · auto</text>
    <rect x="324" y="172" width="132" height="26" className="diag-node" />
    <text x="338" y="189" className="diag-label">HIPAA audit log</text>

    {/* Edges */}
    <path d="M114 57 L144 80" className="diag-edge" />
    <path d="M114 94 L144 92" className="diag-edge" />
    <path d="M114 126 L144 104" className="diag-edge" />
    <path d="M238 88 L268 88" className="diag-edge" />
    <path d="M372 88 L402 88" className="diag-edge" />
    <path d="M456 118 L456 152 L69 152 L69 172" className="diag-edge-dashed" />
    <path d="M169 152 L169 172" className="diag-edge-dashed" />
    <path d="M269 152 L269 172" className="diag-edge-dashed" />
    <path d="M390 152 L390 172" className="diag-edge-dashed" />

    <text x="24" y="248" className="diag-caption">
      Telehealth intake → clinician → billing · HIPAA-aligned audit on every step
    </text>
  </svg>
);
