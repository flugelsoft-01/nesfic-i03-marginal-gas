import { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  BarChart3,
  Cpu,
  Truck,
  ShieldCheck,
  Printer,
  Flame,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  FileCode2,
} from 'lucide-react';
import {
  WELLHEAD_NODES,
  OFFTAKER_NODES,
  WellheadNode,
  OffTakerNode,
  haversineRoadKm,
} from './data/assamBasin';
import {
  SimulationInput,
  runDigitalTwin,
  runPathwayComparison,
  buildDispatchSchedule,
} from './engine/simulation';
import { BasinMap } from './components/BasinMap';
import { BreakEvenChart } from './components/Charts';
import { ProcessTwin } from './components/ProcessTwin';
import { TutorialModal, TechnicalDocsModal } from './components/InfoModals';

type TabKey = 'gis' | 'sizing' | 'twin' | 'dispatch';

const TAB_SLUGS: Record<TabKey, string> = {
  gis: 'basin-demand-gis-assam-arakan',
  sizing: 'techno-economic-sizing-sslng',
  twin: 'process-digital-twin-liquefaction',
  dispatch: 'virtual-pipeline-scada-mrv',
};

const TAB_TITLES: Record<TabKey, string> = {
  gis: 'Basin & Demand GIS (Assam-Arakan) — StrataGas NE',
  sizing: 'Techno-Economic Sizing (SSLNG vs CNG & Micro-GTL) — StrataGas NE',
  twin: 'Process Digital Twin (Modular Liquefaction) — StrataGas NE',
  dispatch: 'Virtual Pipeline & SCADA/MRV — StrataGas NE',
};

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('gis');
  const [selectedWellId, setSelectedWellId] = useState<string>(WELLHEAD_NODES[0].id);
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>(OFFTAKER_NODES[0].id);

  const [input, setInput] = useState<SimulationInput>({
    flowMmscfd: WELLHEAD_NODES[0].flowMmscfd,
    pressureBar: WELLHEAD_NODES[0].pressureBar,
    co2Percent: WELLHEAD_NODES[0].composition.co2,
    n2Percent: WELLHEAD_NODES[0].composition.n2,
    h2sPpm: WELLHEAD_NODES[0].composition.h2sPpm,
    distanceKm: haversineRoadKm(
      WELLHEAD_NODES[0].lat,
      WELLHEAD_NODES[0].lon,
      OFFTAKER_NODES[0].lat,
      OFFTAKER_NODES[0].lon
    ),
    wellheadGasPriceInrMmbtu: 260,
    ambientTempC: 34,
    monsoonMode: false,
  });

  const [lelSpikeTest, setLelSpikeTest] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [techDocsOpen, setTechDocsOpen] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      const h = window.location.hash.replace('#', '');
      if (h === 'how-to-use-tutorial') {
        setTutorialOpen(true);
        return;
      }
      if (h === 'technical-documents-architecture') {
        setTechDocsOpen(true);
        return;
      }
      const matched = (Object.keys(TAB_SLUGS) as TabKey[]).find((k) => TAB_SLUGS[k] === h);
      if (matched) setActiveTab(matched);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    document.title = TAB_TITLES[activeTab];
  }, [activeTab]);

  const navigateTab = (tab: TabKey) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${TAB_SLUGS[tab]}`);
  };

  const handleSelectWell = (w: WellheadNode) => {
    setSelectedWellId(w.id);
    const buyer = OFFTAKER_NODES.find((b) => b.id === selectedBuyerId) || OFFTAKER_NODES[0];
    setInput((prev) => ({
      ...prev,
      flowMmscfd: w.flowMmscfd,
      pressureBar: w.pressureBar,
      co2Percent: w.composition.co2,
      n2Percent: w.composition.n2,
      h2sPpm: w.composition.h2sPpm,
      distanceKm: haversineRoadKm(w.lat, w.lon, buyer.lat, buyer.lon),
    }));
  };

  const handleSelectBuyer = (b: OffTakerNode) => {
    setSelectedBuyerId(b.id);
    const well = WELLHEAD_NODES.find((w) => w.id === selectedWellId) || WELLHEAD_NODES[0];
    setInput((prev) => ({
      ...prev,
      distanceKm: haversineRoadKm(well.lat, well.lon, b.lat, b.lon),
    }));
  };

  const twin = useMemo(() => runDigitalTwin(input), [input]);
  const pathways = useMemo(() => runPathwayComparison(input), [input]);
  const recommended = useMemo(
    () => pathways.find((p) => p.recommended) || pathways[0],
    [pathways]
  );
  const dispatchTrips = useMemo(
    () => buildDispatchSchedule(input.distanceKm, twin.netLngTpd, input.monsoonMode),
    [input.distanceKm, twin.netLngTpd, input.monsoonMode]
  );

  const selectedBuyer = OFFTAKER_NODES.find((b) => b.id === selectedBuyerId) || OFFTAKER_NODES[0];
  const dieselSavingsPct = Math.round(
    ((1340 - recommended.deliveredCostInrMmbtu) / 1340) * 100
  );

  return (
    <div className="app-shell">
      {/* Top Bar */}
      <header className="topbar">
        <div className="brand">
          <span className="brand-badge">NESFIC-I-03</span>
          <div>
            <h1>StrataGas NE — Marginal Gas Monetisation &amp; Virtual Pipeline OS</h1>
            <p>
              Assam-Arakan Basin · Small-Scale Liquefaction &amp; Micro-Conversion ·{' '}
              <strong style={{ color: '#5eead4' }}>Lead Applicant: Kalyanjit Hatibaruah</strong>
            </p>
          </div>
        </div>
        <div className="topbar-actions">
          <a
            href="#how-to-use-tutorial"
            className="btn btn-outline"
            onClick={(e) => {
              e.preventDefault();
              setTutorialOpen(true);
              window.history.replaceState(null, '', '#how-to-use-tutorial');
            }}
          >
            <BookOpen size={15} /> Tutorial
          </a>
          <button className="btn btn-outline" onClick={() => window.print()}>
            <Printer size={15} /> Print / Export Dossier
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs" aria-label="Application Modules">
        <a
          href={`#${TAB_SLUGS.gis}`}
          className={`tab-btn ${activeTab === 'gis' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigateTab('gis');
          }}
        >
          <MapPin size={16} /> 1. Basin &amp; Demand GIS
        </a>
        <a
          href={`#${TAB_SLUGS.sizing}`}
          className={`tab-btn ${activeTab === 'sizing' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigateTab('sizing');
          }}
        >
          <BarChart3 size={16} /> 2. Techno-Economic Sizing
        </a>
        <a
          href={`#${TAB_SLUGS.twin}`}
          className={`tab-btn ${activeTab === 'twin' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigateTab('twin');
          }}
        >
          <Cpu size={16} /> 3. Process Digital Twin
        </a>
        <a
          href={`#${TAB_SLUGS.dispatch}`}
          className={`tab-btn ${activeTab === 'dispatch' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigateTab('dispatch');
          }}
        >
          <Truck size={16} /> 4. Virtual Pipeline &amp; SCADA/MRV
        </a>
      </nav>

      {/* Main Content Layout */}
      <div className="main-layout">
        {/* Left Parameter Sidebar */}
        <aside className="sidebar-card">
          <h2 className="card-title">
            <Flame size={17} color="#0d7377" /> Wellhead & Route Parameters
          </h2>

          <div className="control-group">
            <label className="control-label" htmlFor="well-select">
              <span>Assam-Arakan Wellhead</span>
            </label>
            <select
              id="well-select"
              value={selectedWellId}
              onChange={(e) => {
                const found = WELLHEAD_NODES.find((w) => w.id === e.target.value);
                if (found) handleSelectWell(found);
              }}
            >
              {WELLHEAD_NODES.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.flowMmscfd} MMSCFD)
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="control-label" htmlFor="buyer-select">
              <span>Target Regional Off-Taker</span>
            </label>
            <select
              id="buyer-select"
              value={selectedBuyerId}
              onChange={(e) => {
                const found = OFFTAKER_NODES.find((b) => b.id === e.target.value);
                if (found) handleSelectBuyer(found);
              }}
            >
              {OFFTAKER_NODES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.sector})
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Gas Flow Rate</span>
              <span className="control-value">{input.flowMmscfd.toFixed(2)} MMSCFD</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={2.5}
              step={0.05}
              value={input.flowMmscfd}
              onChange={(e) => setInput({ ...input, flowMmscfd: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Wellhead Pressure (FTHP)</span>
              <span className="control-value">{input.pressureBar} bar</span>
            </div>
            <input
              type="range"
              min={8}
              max={50}
              step={1}
              value={input.pressureBar}
              onChange={(e) => setInput({ ...input, pressureBar: parseInt(e.target.value, 10) })}
            />
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Feed CO₂ Content</span>
              <span className="control-value">{input.co2Percent.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={10.0}
              step={0.2}
              value={input.co2Percent}
              onChange={(e) => setInput({ ...input, co2Percent: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Road Transport Distance</span>
              <span className="control-value">{input.distanceKm} km</span>
            </div>
            <input
              type="range"
              min={10}
              max={250}
              step={5}
              value={input.distanceKm}
              onChange={(e) => setInput({ ...input, distanceKm: parseInt(e.target.value, 10) })}
            />
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>Assam Ambient Temp</span>
              <span className="control-value">{input.ambientTempC}°C</span>
            </div>
            <input
              type="range"
              min={18}
              max={40}
              step={1}
              value={input.ambientTempC}
              onChange={(e) => setInput({ ...input, ambientTempC: parseInt(e.target.value, 10) })}
            />
          </div>

          <label className="toggle-row">
            <span>Monsoon Logistics Mode (+14% delay)</span>
            <input
              type="checkbox"
              checked={input.monsoonMode}
              onChange={(e) => setInput({ ...input, monsoonMode: e.target.checked })}
            />
          </label>
        </aside>

        {/* Main Workspace */}
        <main>
          {/* Persistent KPI Strip */}
          <div className="kpi-grid">
            <div className="kpi-box">
              <div className="kpi-label">Recommended Pathway</div>
              <div className="kpi-val">{recommended.shortName}</div>
              <div className="kpi-sub">{recommended.payloadUnit}</div>
            </div>
            <div className="kpi-box navy">
              <div className="kpi-label">Delivered Fuel Cost</div>
              <div className="kpi-val">₹{recommended.deliveredCostInrMmbtu}/MMBtu</div>
              <div className="kpi-sub">
                {dieselSavingsPct > 0 ? `${dieselSavingsPct}% cheaper than Diesel` : 'Above Diesel Parity'}
              </div>
            </div>
            <div className="kpi-box amber">
              <div className="kpi-label">Skid CAPEX & Pre-Tax IRR</div>
              <div className="kpi-val">₹{recommended.capexCroreInr} Cr</div>
              <div className="kpi-sub">
                {recommended.preTaxIrrPercent}% IRR · {recommended.paybackYears} yr payback
              </div>
            </div>
            <div className="kpi-box">
              <div className="kpi-label">Flaring & CO₂e Avoided</div>
              <div className="kpi-val">{recommended.avoidedCo2TonnesYear.toLocaleString()} t/yr</div>
              <div className="kpi-sub">{twin.netLngTpd} TPD Net LNG Output</div>
            </div>
          </div>

          {/* Tab 1: GIS Profiler */}
          {activeTab === 'gis' && (
            <>
              <div className="card" style={{ marginBottom: '1rem' }}>
                <h2 className="card-title">
                  Assam-Arakan Basin — Stranded Gas Nodes & Regional Off-Taker Map
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#475569', marginTop: 0 }}>
                  Click any wellhead triangle or industrial off-taker square to compute terrain-adjusted road distance and update sizing.
                </p>
                <BasinMap
                  selectedWellId={selectedWellId}
                  selectedBuyerId={selectedBuyerId}
                  onSelectWell={handleSelectWell}
                  onSelectBuyer={handleSelectBuyer}
                />
              </div>

              <div className="grid-2">
                <div className="card">
                  <h3 className="card-title">Selected Off-Taker Profile</h3>
                  <table>
                    <tbody>
                      <tr>
                        <th>Facility</th>
                        <td>{selectedBuyer.name}</td>
                      </tr>
                      <tr>
                        <th>Sector & District</th>
                        <td>{selectedBuyer.sector} · {selectedBuyer.district}</td>
                      </tr>
                      <tr>
                        <th>Thermal Demand</th>
                        <td>{selectedBuyer.demandMmbtuDay} MMBtu/day</td>
                      </tr>
                      <tr>
                        <th>Incumbent Fuel</th>
                        <td>{selectedBuyer.currentFuel} (₹{selectedBuyer.currentFuelPriceInrMmbtu}/MMBtu)</td>
                      </tr>
                      <tr>
                        <th>Monsoon Access Risk</th>
                        <td>
                          <span className={`pill ${selectedBuyer.monsoonAccessRisk === 'High' ? 'pill-red' : 'pill-amber'}`}>
                            {selectedBuyer.monsoonAccessRisk}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="card">
                  <h3 className="card-title">Upper Assam Marginal Gas Nodes</h3>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Wellhead</th>
                          <th>Flow</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {WELLHEAD_NODES.map((w) => (
                          <tr
                            key={w.id}
                            onClick={() => handleSelectWell(w)}
                            style={{
                              cursor: 'pointer',
                              background: w.id === selectedWellId ? '#f0fdfa' : undefined,
                            }}
                          >
                            <td><strong>{w.district}</strong> · {w.gasType}</td>
                            <td>{w.flowMmscfd} MMSCFD</td>
                            <td>
                              <span className={`pill ${w.flareStatus === 'Flaring' ? 'pill-red' : 'pill-amber'}`}>
                                {w.flareStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Tab 2: Techno-Economic Sizing */}
          {activeTab === 'sizing' && (
            <>
              <div className="card" style={{ marginBottom: '1rem' }}>
                <h2 className="card-title">Multi-Pathway Techno-Economic Comparison</h2>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Monetisation Pathway</th>
                        <th>Skid CAPEX</th>
                        <th>Delivered Cost</th>
                        <th>Pre-Tax IRR</th>
                        <th>Payback</th>
                        <th>Viable Reach</th>
                        <th>Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pathways.map((p) => (
                        <tr key={p.id} style={{ background: p.recommended ? '#f0fdfa' : undefined }}>
                          <td><strong>{p.name}</strong></td>
                          <td>₹{p.capexCroreInr} Cr</td>
                          <td><strong>₹{p.deliveredCostInrMmbtu}/MMBtu</strong></td>
                          <td>{p.preTaxIrrPercent}%</td>
                          <td>{p.paybackYears} yrs</td>
                          <td>{p.viableReachKm} km</td>
                          <td>
                            {p.recommended ? (
                              <span className="pill pill-green">Optimal</span>
                            ) : (
                              <span className="pill pill-blue">Alternative</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid-2">
                <div className="card">
                  <h3 className="card-title">Delivered Cost vs. Distance Break-Even Curve</h3>
                  <BreakEvenChart input={input} results={pathways} />
                </div>

                <div className="card">
                  <h3 className="card-title">Optimal Pathway Cost Stack (₹/MMBtu)</h3>
                  <table>
                    <tbody>
                      <tr>
                        <th>Wellhead Feed Gas</th>
                        <td>₹{recommended.costBreakdown.feedGas}/MMBtu</td>
                      </tr>
                      <tr>
                        <th>Gas Sweetening & Dehydration</th>
                        <td>₹{recommended.costBreakdown.preTreatment}/MMBtu</td>
                      </tr>
                      <tr>
                        <th>Liquefaction / Compression O&M</th>
                        <td>₹{recommended.costBreakdown.processingPowerAndOm}/MMBtu</td>
                      </tr>
                      <tr>
                        <th>Virtual Pipeline Transport ({input.distanceKm} km)</th>
                        <td>₹{recommended.costBreakdown.transport}/MMBtu</td>
                      </tr>
                      <tr>
                        <th>Skid CAPEX Recovery</th>
                        <td>₹{recommended.costBreakdown.capexRecovery}/MMBtu</td>
                      </tr>
                      <tr>
                        <th>Total Delivered Cost</th>
                        <td><strong>₹{recommended.deliveredCostInrMmbtu}/MMBtu</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Tab 3: Process Digital Twin */}
          {activeTab === 'twin' && (
            <>
              <div className="card" style={{ marginBottom: '1rem' }}>
                <h2 className="card-title">Thermodynamic & Process Digital Twin (Skid PFD)</h2>
                <p style={{ fontSize: '0.82rem', color: '#475569', marginTop: 0 }}>
                  Models CO₂/H₂S pre-treatment, molecular-sieve dehydration, and mixed-refrigerant liquefaction under Assam ambient conditions ({input.ambientTempC}°C).
                </p>
                <ProcessTwin input={input} twin={twin} />
              </div>

              <div className="card">
                <h3 className="card-title">Mass, Energy & Cryogenic Duty Balance</h3>
                <div className="table-wrap">
                  <table>
                    <tbody>
                      <tr>
                        <th>Sweetened Feed Gas</th>
                        <td>{twin.sweetGasMmscfd} MMSCFD</td>
                        <th>Net LNG Production</th>
                        <td><strong>{twin.netLngTpd} TPD</strong></td>
                      </tr>
                      <tr>
                        <th>Specific Liquefaction Power</th>
                        <td>{twin.specificPowerKwhKg} kWh/kg LNG</td>
                        <th>Total Skid Power Duty</th>
                        <td>{twin.totalPowerKw} kW</td>
                      </tr>
                      <tr>
                        <th>Amine Reboiler Duty</th>
                        <td>{twin.amineDutyKw} kW</td>
                        <th>Cryo Buffer Tank Sizing</th>
                        <td>{twin.cryoTankVolumeM3} m³ (Vacuum Insulated)</td>
                      </tr>
                      <tr>
                        <th>Boil-Off Gas (BOG) Rate</th>
                        <td>{twin.bogRatePercentDay}% / day (Re-compressed)</td>
                        <th>Flared Gas Eliminated</th>
                        <td>{twin.flaringAvoidedM3Day.toLocaleString()} m³/day</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Tab 4: Virtual Pipeline Dispatch & SCADA/MRV */}
          {activeTab === 'dispatch' && (
            <>
              <div className="card" style={{ marginBottom: '1rem' }}>
                <h2 className="card-title">Virtual Pipeline Cryogenic Dispatch Schedule</h2>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Trip ID</th>
                        <th>Cryo ISO-Tanker</th>
                        <th>Buyer Destination</th>
                        <th>Distance</th>
                        <th>Payload</th>
                        <th>Turnaround</th>
                        <th>Buyer Buffer</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispatchTrips.map((t) => (
                        <tr key={t.tripId}>
                          <td><strong>{t.tripId}</strong></td>
                          <td>{t.vehicle}</td>
                          <td>{t.buyerName}</td>
                          <td>{t.distanceKm} km</td>
                          <td>{t.payloadTonnes} t</td>
                          <td>{t.roundTripHours} hrs</td>
                          <td>{t.buyerBufferDaysAfter} days</td>
                          <td>
                            <span
                              className={`pill ${
                                t.status === 'En Route'
                                  ? 'pill-green'
                                  : t.status === 'Monsoon Hold Buffer'
                                  ? 'pill-amber'
                                  : 'pill-blue'
                              }`}
                            >
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid-2">
                <div className="card">
                  <h3 className="card-title">
                    <ShieldCheck size={17} color="#0d7377" /> PESO / OISD Safety & SCADA Telemetry
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                      Simulated LEL Methane Detector State:
                    </span>
                    <button
                      className="btn btn-primary"
                      style={{ background: lelSpikeTest ? '#dc2626' : '#0f2942' }}
                      onClick={() => setLelSpikeTest(!lelSpikeTest)}
                    >
                      {lelSpikeTest ? 'Reset Normal State' : 'Simulate >20% LEL Spike'}
                    </button>
                  </div>

                  {lelSpikeTest ? (
                    <div
                      style={{
                        padding: '0.75rem',
                        background: '#fee2e2',
                        border: '1px solid #dc2626',
                        borderRadius: 8,
                        color: '#991b1b',
                        fontSize: '0.82rem',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                      }}
                    >
                      <AlertTriangle size={18} />
                      <div>
                        <strong>CRITICAL ALARM (0.65s latency):</strong> Skid LEL at 24% — Hardwired PLC ESD Valve Tripped; Cloud write remains DMZ-isolated.
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '0.75rem',
                        background: '#dcfce7',
                        border: '1px solid #16a34a',
                        borderRadius: 8,
                        color: '#166534',
                        fontSize: '0.82rem',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                      }}
                    >
                      <CheckCircle2 size={18} />
                      <div>
                        <strong>ALL INTERLOCKS NOMINAL:</strong> LEL 0% | Cold Box -162°C | Edge MQTT Buffer 100% Synced | ESD Armed.
                      </div>
                    </div>
                  )}
                </div>

                <div className="card">
                  <h3 className="card-title">Carbon MRV & Flare-Elimination Ledger</h3>
                  <table>
                    <tbody>
                      <tr>
                        <th>Daily Flaring Avoided</th>
                        <td>{twin.flaringAvoidedM3Day.toLocaleString()} m³/day</td>
                      </tr>
                      <tr>
                        <th>Annual CO₂e Abatement</th>
                        <td><strong>{recommended.avoidedCo2TonnesYear.toLocaleString()} tCO₂e/yr</strong></td>
                      </tr>
                      <tr>
                        <th>OT/IT Edge Resilience</th>
                        <td>72-hr Local Store-and-Forward (Zero Data Loss)</td>
                      </tr>
                      <tr>
                        <th>Regulatory Alignment</th>
                        <td>PESO SMPV · OISD-194 · PNGRB Technical Norms</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-left">
          <span>© {new Date().getFullYear()} <strong>Flugelsoft Labs</strong>. All rights reserved.</span>
          <span>·</span>
          <span>Lead Applicant: <strong>Kalyanjit Hatibaruah</strong></span>
        </div>
        <div className="footer-links">
          <a
            href="#how-to-use-tutorial"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              setTutorialOpen(true);
              window.history.replaceState(null, '', '#how-to-use-tutorial');
            }}
          >
            <BookOpen size={14} /> How to Use
          </a>
          <a
            href="#technical-documents-architecture"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              setTechDocsOpen(true);
              window.history.replaceState(null, '', '#technical-documents-architecture');
            }}
          >
            <FileCode2 size={14} /> Technical Documents
          </a>
        </div>
      </footer>

      <TutorialModal open={tutorialOpen} onClose={() => setTutorialOpen(false)} />
      <TechnicalDocsModal open={techDocsOpen} onClose={() => setTechDocsOpen(false)} />
    </div>
  );
}

export default App;
