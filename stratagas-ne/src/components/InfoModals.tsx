import React, { useEffect } from 'react';
import { X, BookOpen, FileCode2, ShieldCheck, Cpu, Truck, BarChart3, MapPin } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<ModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="tutorial-title" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} color="#0d7377" />
            <h2 id="tutorial-title" style={{ margin: 0, fontSize: '1.1rem', color: '#0f2942' }}>
              How to Use StrataGas NE — Quick Start Tutorial
            </h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close tutorial">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-intro">
            <strong>StrataGas NE</strong> helps upstream asset teams, gas marketers, and plant engineers screen stranded/marginal gas fields in the Assam-Arakan basin and optimize modular monetisation. Follow these 5 steps:
          </p>

          <div className="tutorial-step">
            <div className="step-badge"><MapPin size={15} /> Step 1</div>
            <div>
              <strong>Select Wellhead &amp; Off-Taker (Left Sidebar or GIS Map)</strong>
              <p>
                In <strong>1. Basin &amp; Demand GIS</strong>, click any red wellhead triangle (e.g., <em>Tinsukia-M04</em>) or teal off-taker square (e.g., <em>Upper Assam Tea Cluster A</em>), or use the dropdowns in the left sidebar. Road distance is automatically calculated with a 1.38x Assam terrain/river-crossing factor.
              </p>
            </div>
          </div>

          <div className="tutorial-step">
            <div className="step-badge"><BarChart3 size={15} /> Step 2</div>
            <div>
              <strong>Tune Field &amp; Monsoon Sliders</strong>
              <p>
                Adjust <strong>Gas Flow Rate</strong> (0.2–2.5 MMSCFD), <strong>Wellhead Pressure</strong>, <strong>CO₂ %</strong>, <strong>Road Distance</strong>, and <strong>Ambient Temperature</strong>. Toggle <strong>Monsoon Logistics Mode</strong> to simulate +14% transit delay and buffer requirements. All KPIs update in real time.
              </p>
            </div>
          </div>

          <div className="tutorial-step">
            <div className="step-badge"><BarChart3 size={15} /> Step 3</div>
            <div>
              <strong>Compare Pathways in Techno-Economic Sizing</strong>
              <p>
                Open <strong>2. Techno-Economic Sizing</strong> to compare <em>Modular SSLNG</em>, <em>250-bar CNG Cascade</em>, <em>Micro-GTL</em>, and <em>Wellhead Power</em> across CAPEX, delivered cost (₹/MMBtu), IRR, payback, and the break-even distance curve against diesel parity (₹1,340/MMBtu).
              </p>
            </div>
          </div>

          <div className="tutorial-step">
            <div className="step-badge"><Cpu size={15} /> Step 4</div>
            <div>
              <strong>Inspect the Process Digital Twin</strong>
              <p>
                Switch to <strong>3. Process Digital Twin</strong> to view the 5-stage skid PFD (Separator → Amine Sweetening → Mol-Sieve Dehydration → MR Cold Box at -162°C → Cryo Tank &amp; BOG), net LNG output (TPD), and specific power duty (kWh/kg).
              </p>
            </div>
          </div>

          <div className="tutorial-step">
            <div className="step-badge"><Truck size={15} /> Step 5</div>
            <div>
              <strong>Validate Dispatch, Safety Interlocks &amp; Export Dossier</strong>
              <p>
                In <strong>4. Virtual Pipeline &amp; SCADA/MRV</strong>, review cryogenic ISO-tanker schedules, click <strong>Simulate &gt;20% LEL Spike</strong> to test hardwired ESD safety isolation, check annual CO₂e abatement, and click <strong>Print / Export Dossier</strong> in the header to save a PDF report.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TechnicalDocsModal: React.FC<ModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="techdocs-title" onClick={onClose}>
      <div className="modal-panel modal-panel-wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileCode2 size={20} color="#0d7377" />
            <h2 id="techdocs-title" style={{ margin: 0, fontSize: '1.1rem', color: '#0f2942' }}>
              Technical Documentation — Technology &amp; Process Architecture
            </h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close technical documentation">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <section className="doc-section">
            <h3>1. System &amp; OT/IT Edge-to-Cloud Architecture</h3>
            <p>
              StrataGas NE is engineered on a 4-tier architecture built for intermittent 4G/cellular connectivity at remote Assam-Arakan wellheads:
            </p>
            <ul>
              <li><strong>Tier 1 — Field Skid &amp; OT Layer:</strong> Skid-mounted PLC/SCADA controllers (Modbus TCP/RTU, OPC-UA) interfacing with flow meters, pressure transmitters, cryogenic RTDs (-162°C), and LEL/H₂S gas detectors. Emergency Shutdown (ESD) interlocks remain hardwired at the skid PLC.</li>
              <li><strong>Tier 2 — Ruggedized Edge Gateway:</strong> DMZ-isolated unidirectional gateway translating Modbus/OPC-UA registers to MQTT over TLS 1.3 with mutual authentication (mTLS) and 72-hour local store-and-forward buffering for zero telemetry loss.</li>
              <li><strong>Tier 3 — Core Simulation &amp; Optimization Engine:</strong> Thermodynamic Equation-of-State (Peng-Robinson / SRK) sizing curves, Discounted Cash Flow (DCF) &amp; diesel-parity engine, VRPTW cryogenic fleet dispatch heuristic, and Isolation Forest anomaly detection.</li>
              <li><strong>Tier 4 — Presentation &amp; MRV Layer:</strong> React 18 + TypeScript + Vite SPA with custom SVG GIS/engineering charts, Role-Based Access Control (RBAC), and immutable flare-elimination Carbon MRV audit logs.</li>
            </ul>
          </section>

          <section className="doc-section">
            <h3>2. Modular Gas Processing &amp; Liquefaction Process (SSLNG)</h3>
            <p>
              To handle variable associated and isolated marginal gas (0.2–2.5 MMSCFD, 1–10% CO₂, trace H₂S), the skid follows a 5-stage process train:
            </p>
            <ol>
              <li><strong>Inlet Separation &amp; Compression:</strong> Knock-out drum removes free liquids/condensate; feed gas is boosted to optimal treating pressure (typically 20–35 bar).</li>
              <li><strong>Amine / Membrane Acid-Gas Sweetening:</strong> Reduces CO₂ from up to 10% down to &lt;50 ppmv and H₂S to &lt;4 ppmv to prevent dry-ice freeze-out in the cryogenic cold box.</li>
              <li><strong>Molecular-Sieve Dehydration:</strong> Dual-bed 4A/3A molecular sieves (260°C regeneration cycle) dry feed gas to a water dew point below -70°C (-72°C nominal).</li>
              <li><strong>N₂ / Mixed-Refrigerant (MR) Cold Box:</strong> Brazed aluminum plate-fin heat exchanger cools and liquefies sweetened dry gas to -162°C at near-atmospheric pressure, with Assam ambient derating modeled (+0.8% specific power per °C above 28°C; ~0.42–0.46 kWh/kg LNG).</li>
              <li><strong>Cryogenic Storage &amp; Boil-Off Gas (BOG) Recovery:</strong> Vacuum-insulated 20–50 m³ buffer tank (&lt;0.15%/day BOG) with BOG re-compression into skid fuel gas or re-liquefaction—achieving zero continuous flaring.</li>
            </ol>
          </section>

          <section className="doc-section">
            <h3>3. Multi-Pathway Techno-Economic &amp; Dispatch Models</h3>
            <ul>
              <li><strong>Delivered Cost Stack:</strong> Sums wellhead feed gas (₹260/MMBtu base), sweetening/dehydration, compression/liquefaction O&amp;M, virtual-pipeline transport (₹1.35/MMBtu·km for 18–20 t Cryo ISO-tankers vs. ₹6.20/MMBtu·km for 250-bar CNG tube trailers), and CAPEX recovery.</li>
              <li><strong>Break-Even Dynamics:</strong> CNG cascades are optimal below ~25–48 km; Modular SSLNG achieves ~3x higher energy density per truckload, beating CNG beyond ~48 km and staying 20–30% below industrial diesel parity (₹1,340/MMBtu) up to 250+ km.</li>
              <li><strong>Monsoon-Resilient VRPTW Dispatch:</strong> Models 1.38x road-winding factor across Upper Assam river crossings, +14% monsoon transit delay, and 3–5 day cryogenic buyer buffer tanks at tea estates and brick kilns.</li>
            </ul>
          </section>

          <section className="doc-section">
            <h3>4. Safety, Regulatory &amp; Carbon MRV Compliance</h3>
            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <ShieldCheck size={18} color="#0d7377" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>
                Aligned with <strong>PESO SMPV Rules</strong>, <strong>OISD-194</strong> (LNG facilities), and <strong>PNGRB</strong> technical standards. Cloud users cannot actuate safety-critical ESD valves across the OT/IT boundary. Avoided flaring (m³/day) and displaced diesel/coal emissions are logged in tCO₂e/year for audit-ready ESG and carbon-credit verification.
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
