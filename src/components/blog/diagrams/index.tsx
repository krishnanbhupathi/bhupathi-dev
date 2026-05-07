/* eslint-disable react/no-unknown-property */
/**
 * SVG architecture diagrams for blog posts. Reuse the diag-* classes
 * from globals.css (matching the project-card diagrams) and add an
 * arrowhead marker for clearer flow direction.
 */

import type { ReactNode } from 'react';

const ARROW_MARKER_ID_LIGHT = 'blog-arrow-light';
const ARROW_MARKER_ID_DARK = 'blog-arrow-dark';

const ArrowMarkers = () => (
  <defs>
    <marker
      id={ARROW_MARKER_ID_LIGHT}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M0 0 L10 5 L0 10 z" fill="#DBC9A4" />
    </marker>
    <marker
      id={ARROW_MARKER_ID_DARK}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M0 0 L10 5 L0 10 z" fill="#102C26" />
    </marker>
  </defs>
);

interface SvgFrameProps {
  viewBox: string;
  ariaLabel: string;
  children: ReactNode;
}

const SvgFrame = ({ viewBox, ariaLabel, children }: SvgFrameProps) => (
  <svg
    viewBox={viewBox}
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label={ariaLabel}
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <ArrowMarkers />
    {children}
  </svg>
);

const edgeArrow = `url(#${ARROW_MARKER_ID_LIGHT})`;
const dashed = '6 4';

/* ─────────────────────────────────────────────────────────────────── */
/*  KAFKA — partition model                                            */
/* ─────────────────────────────────────────────────────────────────── */
export const KafkaPartitionDiagram = () => (
  <SvgFrame viewBox="0 0 720 320" ariaLabel="Kafka partition model with producer, three partitions and consumer group">
    {/* Producer */}
    <text x="24" y="24" className="diag-caption">Producer</text>
    <rect x="24" y="138" width="92" height="44" className="diag-node-accent" />
    <text x="44" y="165" className="diag-label">Producer</text>

    {/* Partition lanes */}
    <text x="160" y="24" className="diag-caption">Topic · 3 partitions</text>

    {[
      { y: 36, label: 'P0', accent: false },
      { y: 138, label: 'P1', accent: true },
      { y: 240, label: 'P2', accent: false },
    ].map((lane) => (
      <g key={lane.label}>
        <rect
          x="160"
          y={lane.y}
          width="380"
          height="44"
          className={lane.accent ? 'diag-node-accent' : 'diag-node'}
        />
        <text x="172" y={lane.y + 27} className="diag-label">
          {lane.label}
        </text>
        {/* message blocks inside lane */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={200 + i * 64}
            y={lane.y + 12}
            width="50"
            height="20"
            fill="#FFF8EE"
            stroke="#102C26"
            strokeOpacity={lane.accent ? 0.5 : 0.35}
            strokeWidth="1"
          />
        ))}
      </g>
    ))}

    {/* Consumer group */}
    <text x="580" y="24" className="diag-caption">Consumer group</text>
    {[
      { y: 36, label: 'C0', accent: false },
      { y: 138, label: 'C1', accent: true },
      { y: 240, label: 'C2', accent: false },
    ].map((c) => (
      <g key={c.label}>
        <rect
          x="580"
          y={c.y}
          width="116"
          height="44"
          className={c.accent ? 'diag-node-accent' : 'diag-node'}
        />
        <text x="600" y={c.y + 27} className="diag-label">
          Consumer {c.label}
        </text>
      </g>
    ))}

    {/* Producer → partitions */}
    <path
      d="M116 160 L160 58"
      className="diag-edge"
      markerEnd={edgeArrow}
    />
    <path
      d="M116 160 L160 160"
      className="diag-edge"
      markerEnd={edgeArrow}
    />
    <path
      d="M116 160 L160 262"
      className="diag-edge"
      markerEnd={edgeArrow}
    />
    <text x="124" y="116" className="diag-caption" style={{ fontSize: 9 }}>
      key: account_id
    </text>

    {/* Partitions → consumers */}
    <path d="M540 58 L580 58" className="diag-edge" markerEnd={edgeArrow} />
    <path d="M540 160 L580 160" className="diag-edge" markerEnd={edgeArrow} />
    <path d="M540 262 L580 262" className="diag-edge" markerEnd={edgeArrow} />

    <text x="160" y="304" className="diag-caption">
      Partition-level ordering preserved · 1 consumer ↔ 1 partition
    </text>
  </SvgFrame>
);

/* ─────────────────────────────────────────────────────────────────── */
/*  RABBITMQ — task queue model                                        */
/* ─────────────────────────────────────────────────────────────────── */
export const RabbitMQQueueDiagram = () => (
  <SvgFrame viewBox="0 0 720 280" ariaLabel="RabbitMQ task queue with exchange, queue and three consumers">
    <text x="40" y="36" className="diag-caption">Producer</text>
    <rect x="40" y="106" width="110" height="56" className="diag-node-accent" />
    <text x="64" y="139" className="diag-label">Producer</text>

    <text x="200" y="36" className="diag-caption">Exchange</text>
    <rect x="200" y="106" width="120" height="56" className="diag-node" />
    <text x="220" y="132" className="diag-label">Exchange</text>
    <text x="220" y="148" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      direct
    </text>

    <text x="370" y="36" className="diag-caption">Queue</text>
    <rect x="370" y="106" width="110" height="56" className="diag-node-dark" />
    <text x="390" y="138" className="diag-label-light">Task queue</text>

    <text x="540" y="36" className="diag-caption">Workers</text>
    {[
      { y: 30, label: 'Worker 1', accent: false },
      { y: 110, label: 'Worker 2', accent: true },
      { y: 190, label: 'Worker 3', accent: false },
    ].map((w) => (
      <g key={w.label}>
        <rect
          x="540"
          y={w.y}
          width="140"
          height="48"
          className={w.accent ? 'diag-node-accent' : 'diag-node'}
        />
        <text x="566" y={w.y + 28} className="diag-label">
          {w.label}
        </text>
      </g>
    ))}

    {/* edges */}
    <path d="M150 134 L200 134" className="diag-edge" markerEnd={edgeArrow} />
    <path d="M320 134 L370 134" className="diag-edge" markerEnd={edgeArrow} />
    <text x="328" y="124" className="diag-caption" style={{ fontSize: 9 }}>
      route
    </text>

    <path d="M480 134 L540 54" className="diag-edge" markerEnd={edgeArrow} />
    <path d="M480 134 L540 134" className="diag-edge" markerEnd={edgeArrow} />
    <path d="M480 134 L540 214" className="diag-edge" markerEnd={edgeArrow} />
    <text x="486" y="100" className="diag-caption" style={{ fontSize: 9 }}>
      round-robin
    </text>

    {/* nack → requeue */}
    <path
      d="M610 78 C 590 50 470 60 425 100"
      className="diag-edge"
      strokeDasharray={dashed}
      markerEnd={edgeArrow}
      fill="none"
    />
    <text x="492" y="60" className="diag-caption" style={{ fontSize: 9 }}>
      nack → requeue
    </text>

    <text x="40" y="262" className="diag-caption">
      Pick · process · ack — no partitions, no rebalancing
    </text>
  </SvgFrame>
);

/* ─────────────────────────────────────────────────────────────────── */
/*  DECISION TREE — Kafka or RabbitMQ                                  */
/* ─────────────────────────────────────────────────────────────────── */
export const DecisionTreeDiagram = () => (
  <SvgFrame viewBox="0 0 720 360" ariaLabel="Decision flow comparing Kafka and RabbitMQ on three questions">
    {/* Start */}
    <rect x="280" y="14" width="160" height="42" className="diag-node" />
    <text x="298" y="40" className="diag-label">New messaging need</text>

    {/* Q1 */}
    <rect x="280" y="92" width="160" height="42" className="diag-node" />
    <text x="306" y="118" className="diag-label">Need replay?</text>
    <rect x="540" y="92" width="140" height="42" className="diag-node-accent" />
    <text x="588" y="118" className="diag-label">Kafka</text>

    {/* Q2 */}
    <rect x="280" y="172" width="160" height="42" className="diag-node" />
    <text x="288" y="198" className="diag-label">Ordering at scale?</text>
    <rect x="540" y="172" width="140" height="42" className="diag-node-accent" />
    <text x="588" y="198" className="diag-label">Kafka</text>

    {/* Q3 */}
    <rect x="260" y="252" width="200" height="42" className="diag-node" />
    <text x="270" y="278" className="diag-label">Task queue or stream?</text>
    <rect x="40" y="252" width="140" height="42" className="diag-node-dark" />
    <text x="76" y="278" className="diag-label-light">RabbitMQ</text>
    <rect x="540" y="252" width="140" height="42" className="diag-node-accent" />
    <text x="588" y="278" className="diag-label">Kafka</text>

    {/* Edges */}
    <path d="M360 56 L360 92" className="diag-edge" markerEnd={edgeArrow} />

    <path d="M440 113 L540 113" className="diag-edge" markerEnd={edgeArrow} />
    <text x="466" y="106" className="diag-caption" style={{ fontSize: 9 }}>
      yes
    </text>
    <path d="M360 134 L360 172" className="diag-edge" markerEnd={edgeArrow} />
    <text x="368" y="156" className="diag-caption" style={{ fontSize: 9 }}>
      no
    </text>

    <path d="M440 193 L540 193" className="diag-edge" markerEnd={edgeArrow} />
    <text x="466" y="186" className="diag-caption" style={{ fontSize: 9 }}>
      yes
    </text>
    <path d="M360 214 L360 252" className="diag-edge" markerEnd={edgeArrow} />
    <text x="368" y="236" className="diag-caption" style={{ fontSize: 9 }}>
      no
    </text>

    <path d="M260 273 L180 273" className="diag-edge" markerEnd={edgeArrow} />
    <text x="190" y="266" className="diag-caption" style={{ fontSize: 9 }}>
      task
    </text>
    <path d="M460 273 L540 273" className="diag-edge" markerEnd={edgeArrow} />
    <text x="478" y="266" className="diag-caption" style={{ fontSize: 9 }}>
      stream
    </text>

    <text x="40" y="338" className="diag-caption">
      Three questions, three exits — most decisions terminate fast
    </text>
  </SvgFrame>
);

/* ─────────────────────────────────────────────────────────────────── */
/*  DEPLOYMENT PIPELINE                                                */
/* ─────────────────────────────────────────────────────────────────── */
export const DeploymentPipelineDiagram = () => (
  <SvgFrame viewBox="0 0 720 320" ariaLabel="CI/CD pipeline from push to ECS rolling update with health-check rollback">
    {/* Row 1 — pipeline */}
    {(() => {
      const stages = [
        { x: 24, w: 96, label: 'Push to main', kind: 'plain' },
        { x: 132, w: 110, label: 'GitHub Actions', kind: 'dark' },
        { x: 254, w: 96, label: 'Build + test', kind: 'plain' },
        { x: 362, w: 96, label: 'Push to ECR', kind: 'plain' },
        { x: 470, w: 110, label: 'ECS rolling', kind: 'plain' },
        { x: 592, w: 104, label: 'Health check', kind: 'accent' },
      ] as const;
      return stages.map((s) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y="100"
            width={s.w}
            height="50"
            className={
              s.kind === 'dark'
                ? 'diag-node-dark'
                : s.kind === 'accent'
                  ? 'diag-node-accent'
                  : 'diag-node'
            }
          />
          <text
            x={s.x + 12}
            y="130"
            className={s.kind === 'dark' ? 'diag-label-light' : 'diag-label'}
          >
            {s.label}
          </text>
        </g>
      ));
    })()}

    {/* arrows between row 1 stages */}
    {[120, 242, 350, 458, 580].map((x) => (
      <path
        key={x}
        d={`M${x} 125 L${x + 12} 125`}
        className="diag-edge"
        markerEnd={edgeArrow}
      />
    ))}

    {/* Row 2 — old/new task split under ECS */}
    <text x="470" y="184" className="diag-caption">During rollout</text>
    <rect x="470" y="200" width="76" height="42" className="diag-node" />
    <text x="486" y="220" className="diag-label" style={{ opacity: 0.65 }}>
      Old tasks
    </text>
    <text x="486" y="232" className="diag-label" style={{ fontSize: 9, opacity: 0.55 }}>
      draining
    </text>
    <rect x="556" y="200" width="76" height="42" className="diag-node-accent" />
    <text x="572" y="220" className="diag-label">New tasks</text>
    <text x="572" y="232" className="diag-label" style={{ fontSize: 9, opacity: 0.7 }}>
      warming
    </text>
    <path d="M524 150 L508 200" className="diag-edge" markerEnd={edgeArrow} />
    <path d="M540 150 L580 200" className="diag-edge" markerEnd={edgeArrow} />

    {/* rollback dashed back from health → ECS */}
    <path
      d="M644 100 C 640 50 540 50 524 96"
      className="diag-edge"
      strokeDasharray={dashed}
      markerEnd={edgeArrow}
      fill="none"
    />
    <text x="544" y="62" className="diag-caption" style={{ fontSize: 9 }}>
      fail → rollback
    </text>

    <text x="24" y="298" className="diag-caption">
      Build → push → roll → verify · automatic rollback on failed health check
    </text>
  </SvgFrame>
);

/* ─────────────────────────────────────────────────────────────────── */
/*  ROLLING UPDATE SEQUENCE                                            */
/* ─────────────────────────────────────────────────────────────────── */
export const RollingUpdateDiagram = () => {
  const cols = [
    { x: 16, label: 'T0', state: 'old' },
    { x: 192, label: 'T1', state: 'mixed' },
    { x: 368, label: 'T2', state: 'draining' },
    { x: 544, label: 'T3', state: 'new' },
  ] as const;
  const colWidth = 160;

  return (
    <SvgFrame viewBox="0 0 720 360" ariaLabel="Four-step ECS rolling update sequence with ALB and task transitions">
      {cols.map((c) => (
        <g key={c.label}>
          {/* column header */}
          <text x={c.x + 4} y="22" className="diag-caption">
            {c.label}
          </text>
          {/* ALB */}
          <rect x={c.x + 36} y="36" width="88" height="32" className="diag-node-dark" />
          <text x={c.x + 60} y="56" className="diag-label-light">
            ALB
          </text>

          {/* old tasks (top row) */}
          {(c.state === 'old' || c.state === 'mixed' || c.state === 'draining') && (
            <>
              <rect
                x={c.x + 16}
                y="98"
                width="60"
                height="42"
                className={c.state === 'draining' ? 'diag-node' : 'diag-node-dark'}
                strokeDasharray={c.state === 'draining' ? dashed : undefined}
              />
              <text
                x={c.x + 24}
                y="123"
                className={c.state === 'draining' ? 'diag-label' : 'diag-label-light'}
                style={c.state === 'draining' ? { opacity: 0.65 } : undefined}
              >
                old
              </text>
              <rect
                x={c.x + 84}
                y="98"
                width="60"
                height="42"
                className={c.state === 'draining' ? 'diag-node' : 'diag-node-dark'}
                strokeDasharray={c.state === 'draining' ? dashed : undefined}
              />
              <text
                x={c.x + 92}
                y="123"
                className={c.state === 'draining' ? 'diag-label' : 'diag-label-light'}
                style={c.state === 'draining' ? { opacity: 0.65 } : undefined}
              >
                old
              </text>
            </>
          )}

          {/* new tasks (bottom row) */}
          {(c.state === 'mixed' || c.state === 'draining' || c.state === 'new') && (
            <>
              <rect
                x={c.x + 16}
                y="160"
                width="60"
                height="42"
                className="diag-node-accent"
              />
              <text x={c.x + 24} y="185" className="diag-label">
                new
              </text>
              <rect
                x={c.x + 84}
                y="160"
                width="60"
                height="42"
                className="diag-node-accent"
              />
              <text x={c.x + 92} y="185" className="diag-label">
                new
              </text>
            </>
          )}

          {/* ALB → tasks (lines) */}
          {(c.state === 'old' || c.state === 'mixed' || c.state === 'draining') && (
            <>
              <path d={`M${c.x + 80} 68 L${c.x + 46} 98`} className="diag-edge" />
              <path d={`M${c.x + 80} 68 L${c.x + 114} 98`} className="diag-edge" />
            </>
          )}
          {(c.state === 'mixed' || c.state === 'draining' || c.state === 'new') && (
            <>
              <path d={`M${c.x + 80} 68 L${c.x + 46} 160`} className="diag-edge" />
              <path d={`M${c.x + 80} 68 L${c.x + 114} 160`} className="diag-edge" />
            </>
          )}

          {/* divider between columns */}
          {c.x + colWidth < 700 && (
            <line
              x1={c.x + colWidth}
              y1="20"
              x2={c.x + colWidth}
              y2="220"
              stroke="#DBC9A4"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          )}
        </g>
      ))}

      {/* annotations */}
      <text x="16" y="252" className="diag-caption" style={{ fontSize: 10 }}>
        minimumHealthyPercent: 100
      </text>
      <text x="16" y="270" className="diag-caption" style={{ fontSize: 10 }}>
        maximumPercent: 200
      </text>
      <text x="16" y="338" className="diag-caption">
        Old tasks drain only after new tasks pass health checks · zero dropped requests
      </text>
    </SvgFrame>
  );
};

/* ─────────────────────────────────────────────────────────────────── */
/*  SCOPING FLOW                                                       */
/* ─────────────────────────────────────────────────────────────────── */
export const ScopingFlowDiagram = () => (
  <SvgFrame viewBox="0 0 720 280" ariaLabel="Project scoping flow from discovery to quote with PERT estimate">
    {(() => {
      const steps = [
        { x: 16, w: 116, label: 'Discovery call', kind: 'plain' },
        { x: 144, w: 132, label: 'Break into deliverables', kind: 'plain' },
        { x: 288, w: 142, label: 'PERT per deliverable', kind: 'accent' },
        { x: 442, w: 124, label: 'Sum + 10% buffer', kind: 'plain' },
        { x: 578, w: 106, label: 'Quote', kind: 'dark' },
      ] as const;
      return steps.map((s) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y="96"
            width={s.w}
            height="60"
            className={
              s.kind === 'dark'
                ? 'diag-node-dark'
                : s.kind === 'accent'
                  ? 'diag-node-accent'
                  : 'diag-node'
            }
          />
          <text
            x={s.x + 12}
            y={s.kind === 'accent' ? 122 : 130}
            className={s.kind === 'dark' ? 'diag-label-light' : 'diag-label'}
          >
            {s.label}
          </text>
          {s.kind === 'accent' && (
            <text
              x={s.x + 12}
              y="142"
              className="diag-label"
              style={{ fontSize: 10, opacity: 0.75 }}
            >
              (B + 4·E + W) / 6
            </text>
          )}
        </g>
      ));
    })()}

    {/* arrows */}
    {[132, 276, 430, 566].map((x) => (
      <path
        key={x}
        d={`M${x} 126 L${x + 12} 126`}
        className="diag-edge"
        markerEnd={edgeArrow}
      />
    ))}

    {/* side note connected dashed to buffer */}
    <rect x="406" y="208" width="200" height="40" className="diag-node" />
    <text x="418" y="227" className="diag-label" style={{ fontSize: 10 }}>
      +20% regulated industries
    </text>
    <text x="418" y="240" className="diag-label" style={{ fontSize: 10 }}>
      +30% flaky third-party APIs
    </text>
    <path
      d="M504 156 L504 208"
      className="diag-edge"
      strokeDasharray={dashed}
      markerEnd={edgeArrow}
    />

    <text x="16" y="44" className="diag-caption">
      Discovery → estimate → quote · ~3-4 hours per scope
    </text>
  </SvgFrame>
);

/* ─────────────────────────────────────────────────────────────────── */
/*  SCOPE CHANGE                                                       */
/* ─────────────────────────────────────────────────────────────────── */
export const ScopeChangeDiagram = () => (
  <SvgFrame viewBox="0 0 720 320" ariaLabel="Decision flow for handling client scope-change requests">
    {/* Start */}
    <rect x="270" y="20" width="180" height="44" className="diag-node" />
    <text x="284" y="46" className="diag-label">Client requests change</text>

    {/* Decision */}
    <rect x="280" y="100" width="160" height="44" className="diag-node" />
    <text x="304" y="126" className="diag-label">In scope doc?</text>

    {/* Yes branch — Build it */}
    <rect x="500" y="100" width="180" height="44" className="diag-node-accent" />
    <text x="540" y="126" className="diag-label">Build it</text>

    {/* No branch — Price */}
    <rect x="280" y="180" width="160" height="44" className="diag-node" />
    <text x="298" y="206" className="diag-label">Price the addition</text>

    {/* Client decides */}
    <rect x="280" y="252" width="160" height="44" className="diag-node" />
    <text x="304" y="278" className="diag-label">Client decides</text>

    {/* Fork outcomes */}
    <rect x="40" y="252" width="200" height="44" className="diag-node-accent" />
    <text x="56" y="272" className="diag-label">Add to scope</text>
    <text x="56" y="288" className="diag-label" style={{ fontSize: 10, opacity: 0.75 }}>
      adjust timeline + price
    </text>

    <rect x="480" y="252" width="200" height="44" className="diag-node-dark" />
    <text x="510" y="278" className="diag-label-light">Defer to v2</text>

    {/* Edges */}
    <path d="M360 64 L360 100" className="diag-edge" markerEnd={edgeArrow} />

    <path d="M440 122 L500 122" className="diag-edge" markerEnd={edgeArrow} />
    <text x="450" y="115" className="diag-caption" style={{ fontSize: 9 }}>
      yes
    </text>

    <path d="M360 144 L360 180" className="diag-edge" markerEnd={edgeArrow} />
    <text x="368" y="166" className="diag-caption" style={{ fontSize: 9 }}>
      no
    </text>

    <path d="M360 224 L360 252" className="diag-edge" markerEnd={edgeArrow} />
    <path d="M280 274 L240 274" className="diag-edge" markerEnd={edgeArrow} />
    <path d="M440 274 L480 274" className="diag-edge" markerEnd={edgeArrow} />

    <text x="16" y="312" className="diag-caption">
      Never say no — say &ldquo;yes, and here&rsquo;s what it costs.&rdquo;
    </text>
  </SvgFrame>
);
