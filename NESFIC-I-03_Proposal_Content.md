# NESFIC-I-03 Proposal Content — Modular Monetisation of Stranded and Marginal Gas in the North-East

> **Challenge:** Stream 1 · NESFIC-I-03 — *Modular Monetisation of Stranded and Marginal Gas in the North-East — Small-Scale Liquefaction and Micro-Conversion for Fields Without Pipeline Connectivity*  
> **Challenge Owner:** MC² Foundation (Assam / North-East India)  
> **Note:** Each section below is authored to fit strictly within the **500-word limit** on the Assam Startup NESFIC 2026 submission portal.

---

## 1. Problem understanding & user workflow

Across the Assam-Arakan basin—particularly in Tinsukia, Dibrugarh, Sivasagar, Charaideo, Jorhat, and Golaghat, and extending into Tripura, Arunachal Pradesh, and Nagaland—numerous small, isolated gas discoveries and associated-gas wells remain disconnected from trunk gas pipelines. At marginal flow rates (typically 0.1 to 2.0 MMSCFD per wellhead), laying conventional underground steel pipelines is economically unviable due to low volume amortisation, undulating terrain, river crossings, and prolonged forest and environmental clearances. Consequently, upstream operators are forced to flare associated gas, re-inject it, or leave marginal wells shut-in—resulting in continuous revenue loss, wasted domestic hydrocarbon resources, and avoidable greenhouse gas emissions.

Simultaneously, within the exact same geography, regional industrial and commercial energy users—including tea estates (withering and drying boilers), brick kilns, MSMEs, and heavy commercial fleets—remain heavily dependent on expensive, high-emission imported fuels such as diesel, furnace oil, and coal. This creates a paradox of co-located stranded clean gas supply and unmet clean fuel demand.

**Users & Beneficiaries:**
- **Primary Users:** Upstream asset managers, field production engineers, and gas marketing teams evaluating marginal/associated gas monetisation; virtual-pipeline logistics operators; and plant/skid operators.
- **End Beneficiaries:** Tea estates, brick kilns, industrial units, and transport fleet operators gaining reliable, lower-cost gaseous or liquid fuel, alongside regional communities benefiting from reduced flaring and particulate emissions.

**Current Workflow & Gaps:**
Currently, upstream teams rely on ad-hoc spreadsheets or static feasibility studies to evaluate wellhead monetisation. Existing alternatives fail at marginal scale:
1. **Road CNG Cascades:** Constrained by low energy-density payload (~200–250 bar), high compression/transport cost per MMBtu, and rapidly deteriorating economics beyond 40–60 km.
2. **Conventional LNG Plants:** Engineered for large baseload volumes, requiring prohibitive CAPEX, large land footprints, and long permitting cycles unsuitable for mobile wellhead deployment.
3. **Lack of Integrated Decision & Dispatch Tooling:** Operators lack a unified digital platform to match scattered wellhead gas profiles (flow, pressure, C1–C4+, H₂S/CO₂/moisture) with nearby off-taker demand, simulate modular small-scale liquefaction or micro-conversion economics, and manage virtual-pipeline delivery and safety compliance.

**Intended Outcome:**
Enable rapid, bankable screening, modular deployment, and continuous operational management of skid-mounted Small-Scale LNG (SSLNG) and micro-conversion units—turning flared or shut-in marginal gas into dispatchable clean fuel for North-East industries at competitive delivered cost.

---

## 2. Proposed solution & key features

We propose **StrataGas NE**, an integrated **Modular Marginal Gas Monetisation & Virtual Pipeline Platform** combining standardized, skid-mounted wellhead gas processing/small-scale liquefaction (SSLNG) & micro-conversion architecture with a full-stack **Techno-Economic Digital Twin, Virtual Pipeline Dispatch, and Safety/MRV Software Application**.

Rather than building custom, capital-intensive fixed plants for each isolated well, our approach pairs **relocatable modular skids** (pre-treatment + nitrogen/mixed-refrigerant small-scale liquefaction at 2–15 TPD, or modular micro-GTL / CNG-to-power where optimal) with an intelligent software platform that de-risks sizing, deployment, and daily operations.

**Main Software Modules & Key Features:**
1. **Assam-Arakan Wellhead & Demand GIS Profiler:** Maps isolated gas wells and associated-gas flare points across Upper Assam against nearby tea estates, brick kilns, and industrial clusters, factoring in road quality, river crossings, and seasonal monsoon constraints.
2. **Multi-Pathway Techno-Economic Sizing Engine:** Evaluates four modular pathways side-by-side—Small-Scale Modular LNG (SSLNG), Micro-GTL (methanol/syn-diesel), High-Pressure CNG Cascade, and Wellhead Gas-to-Power—computing CAPEX, OPEX, delivered cost (₹/MMBtu and ₹/kg), IRR, payback period, and break-even distance against diesel/furnace oil/coal.
3. **Thermodynamic & Process Digital Twin:** Models gas sweetening (CO₂/H₂S removal), dehydration, compression, liquefaction specific energy (kWh/kg LNG), and boil-off gas (BOG) recovery under North-East ambient temperature and high-humidity conditions.
4. **Virtual Pipeline & Cryogenic Dispatch Optimizer:** Schedules cryogenic ISO-tanker/LCNG trailer routes, optimizes milk-run deliveries to multiple tea estates/kilns, tracks regasification buffer inventory, and minimizes transport cost per MMBtu.
5. **Live Telemetry, Safety & Carbon MRV Dashboard:** Monitors skid pressures, temperatures, methane LEL/ESD safety interlocks, and quantifies avoided flaring and CO₂e reductions with audit-ready MRV logs for ESG and carbon-credit monetization.

**What Changes vs. Current Approach:**
- Shifts from **static, siloed feasibility spreadsheets** to **dynamic, well-specific digital twin sizing** before capital commitment.
- Replaces **uneconomic long-distance CNG cascades and oversized LNG plants** with **right-sized, relocatable SSLNG/micro-conversion skids** that can be redeployed as a marginal well depletes.
- Connects **upstream gas producers directly to regional off-takers** via automated virtual-pipeline scheduling and transparent delivered-fuel pricing, displacing diesel, furnace oil, and coal.

---

## 3. Describe User Journey, Wireframes, Prototype & Proof of Work

**Proposed User Journey:**
1. **Asset & Demand Onboarding:** An upstream engineer or gas marketer selects an isolated wellhead or flare point in Upper Assam (e.g., Tinsukia/Sivasagar), inputs gas flow rate (MMSCFD), wellhead pressure, and molar gas composition (C₁–C₄+, CO₂, N₂, H₂S, H₂O), and selects target regional off-takers (e.g., tea estates within 50–150 km).
2. **Pathway Screening & Sizing:** The platform runs real-time thermodynamic and financial models, recommending the optimal modular skid configuration (e.g., 5 TPD SSLNG vs. CNG cascade vs. Micro-GTL), displaying delivered fuel cost vs. diesel/furnace oil, payback period, and skid footprint.
3. **Virtual Pipeline & Off-Taker Contracting:** The user simulates fleet routing across Assam road networks, checks storage autonomy at buyer sites (e.g., 3-day cryogenic buffer), and generates a bankable techno-economic & ESG dossier.
4. **Live Operations & Safety Monitoring:** Once deployed, field operators and control rooms use the telemetry console to monitor compressor/cold-box health, tanker dispatch status, boil-off gas recovery, and automated LEL/pressure safety alerts.

**Prototype, Simulation Outputs & Proof of Work:**
We have developed a working interactive software prototype (**StrataGas NE Platform**) demonstrating the complete end-to-end workflow:
- **Interactive Basin & Demand Map:** Visualizes representative Assam-Arakan marginal gas nodes and regional industrial demand clusters with road-distance and terrain-adjusted routing.
- **Live Techno-Economic & Process Simulator:** Computes real-time mass/energy balances, liquefaction power duty, methane slip/BOG losses, CAPEX/OPEX breakdown, and sensitivity curves across flow rates (0.2–2.0 MMSCFD) and transport distances (10–250 km).
- **Virtual Pipeline Dispatch & Telemetry Console:** Simulates multi-site cryogenic delivery schedules, tank inventory levels, and real-time SCADA/ESD alarm states.
- **Proof of Work Dossier (PDF):** Attached in the supporting material upload, containing application wireframes, UI screenshots, sample Assam marginal-field simulation outputs (comparing SSLNG vs. CNG vs. Micro-GTL), and validation test results.

*(Note: Live prototype / demo repository and video walkthrough links are provided in the Supporting Material section.)*

---

## 4. Technology & solution architecture

**System Architecture Overview:**
StrataGas NE is built on a modular, cloud-ready **4-tier architecture** designed for low-bandwidth field connectivity and industrial reliability:

1. **Edge & Field Telemetry Layer (Hardware/OT Interface):**
   - Interfaces with skid-mounted PLC/SCADA controllers (Modbus TCP/RTU, OPC-UA) via ruggedized industrial IoT gateways.
   - Supports edge buffering (store-and-forward over MQTT/TLS) to ensure zero data loss during intermittent 4G/cellular connectivity at remote Upper Assam wellheads.
   - Monitors key process variables: inlet gas flow, suction/discharge pressure, amine/molecular-sieve regeneration temperatures, cold-box cryogenic temperatures (-162 °C), tank level, and LEL/H₂S gas detectors.

2. **Core Simulation & Optimization Engine (Backend/Algorithms):**
   - **Process & Thermodynamic Models:** Peng-Robinson / SRK Equation-of-State (EoS) approximations for natural gas phase behavior, liquefaction specific power curves, and pre-treatment (CO₂/H₂S/H₂O) sizing rules.
   - **Techno-Economic & Financial Engine:** Discounted Cash Flow (DCF), LCOLNG/LCOE, NPV, IRR, and diesel/furnace-oil parity calculators parameterized for Indian capex, power tariff, and transport costs.
   - **Virtual Pipeline Routing Algorithm:** Vehicle Routing Problem with Time Windows (VRPTW) heuristic optimizing cryogenic ISO-tanker/cascade dispatch, turnaround times, and buyer inventory buffers.
   - **Anomaly & Predictive Maintenance ML:** Isolation Forest / time-series thresholding on compressor vibration, pressure drop across dehydrators, and BOG rate spikes.

3. **API & Integration Layer:**
   - RESTful & WebSocket APIs (FastAPI / Node.js) with role-based access control (RBAC).
   - Ready for integration with upstream SCADA historians, ERP/billing systems, and geospatial routing APIs (OSRM/OpenStreetMap).

4. **Presentation & Hosting Layer:**
   - Responsive React/TypeScript web application with interactive charts, GIS mapping, and offline-capable field operator views.
   - Containerized deployment (Docker) hostable on Indian cloud regions (AWS Mumbai / NIC / MeitY-empaneled cloud) or on-premise industrial servers.

---

## 5. Development methodology & intermediate steps

We follow an **agile, stage-gated engineering methodology** moving systematically from domain discovery to field-ready validation:

1. **Phase 1 — Discovery & Domain Requirements:**
   - Characterize Assam-Arakan marginal gas profiles (flow range, pressure, C₁–C₄+, CO₂, N₂, H₂S, moisture) and regional off-taker demand profiles (tea estate thermal load curves, brick kiln firing cycles, fleet fuel demand).
   - Define regulatory, PESO (Petroleum and Explosives Safety Organisation), and environmental compliance baselines.
   - *Key Output:* System Requirements Specification (SRS), Assam Gas-Demand Archetype Library, and Process Design Basis.

2. **Phase 2 — Architecture & UX/UI Design:**
   - Design thermodynamic sizing models, VRPTW dispatch logic, and database schemas for wellhead, skid, and off-taker entities.
   - Create low- and high-fidelity wireframes for engineers, dispatchers, and field operators.
   - *Key Output:* Technical Architecture Blueprint, API Contracts, and Interactive Wireframes.

3. **Phase 3 — Core Prototype & Simulation Engine Build:**
   - Implement the multi-pathway techno-economic calculator, EoS-based process sizing engine, and GIS mapping UI.
   - Validate sizing outputs against published small-scale LNG and CNG cascade benchmarks.
   - *Key Output:* Working Software Prototype (v0.5) & Benchmark Validation Report.

4. **Phase 4 — MVP Integration (Dispatch, Telemetry & MRV):**
   - Build the virtual-pipeline dispatch optimizer, simulated Modbus/MQTT telemetry ingestion, safety alarm engine, and carbon MRV reporting module.
   - *Key Output:* Full-stack MVP Application (v1.0) with simulated field-to-buyer end-to-end workflows.

5. **Phase 5 — Testing, Stakeholder Walkthrough & Refinement:**
   - Conduct usability testing with upstream engineers and gas marketing teams; refine cost assumptions, terrain/monsoon logistics factors, and local-language operator alerts.
   - *Key Output:* Pilot-Ready Software Platform & Technical Documentation for Field Trial.

---

## 6. Development timeline & milestones

We propose an **18-month structured development and pilot-readiness roadmap** aligned with field validation in Assam:

- **Months 1–3 (Phase 1: Discovery & Process Design Basis):**
  - *Milestones:* Collect anonymized wellhead gas compositions and off-taker demand profiles; finalize techno-economic assumptions and PESO/PNGRB regulatory checklist.
  - *Deliverable:* Process Design Basis & Assam Marginal Gas Archetype Dataset.
  - *Dependencies:* Access to challenge owner's sample field/demand data and domain mentor reviews.

- **Months 4–6 (Phase 2: Core Simulation & Sizing Platform):**
  - *Milestones:* Complete thermodynamic sizing module (SSLNG, micro-GTL, CNG, power) and GIS well-to-demand matcher.
  - *Deliverable:* Interactive Sizing & Feasibility Web Application (Beta).

- **Months 7–9 (Phase 3: Virtual Pipeline, Telemetry & MRV MVP):**
  - *Milestones:* Integrate cryogenic fleet dispatch optimizer, edge MQTT/Modbus telemetry simulator, safety alarm workflows, and flare-reduction MRV ledger.
  - *Deliverable:* **Software MVP Ready for Pre-Pilot Validation (Month 9)**.

- **Months 10–12 (Phase 4: Hardware-in-the-Loop & Skid Integration Prep):**
  - *Milestones:* Integrate software edge gateway with partner skid PLC/SCADA testbed; execute stress, cybersecurity, and offline-buffering tests; finalize pilot site engineering (HAZOP/PESO dossier).
  - *Deliverable:* Field-Hardened Edge + Cloud Platform & Pilot Deployment Package.

- **Months 13–18 (Phase 5: Field Pilot Execution & Refinement):**
  - *Milestones:* Deploy at nominated Upper Assam marginal gas wellhead and 2–3 industrial/tea-estate off-taker sites; run continuous telemetry, dispatch optimization, and economic/emission tracking across seasonal (including monsoon) conditions.
  - *Deliverable:* Final Pilot Validation Report, Unit-Economics Proof, and Scale-Up Blueprint.

---

## 7. Data & information requirements

Development, calibration, and pilot validation require well-defined technical, commercial, and geospatial datasets, without assuming unconfirmed proprietary access:

1. **Gas Field & Wellhead Data (Development & Pilot):**
   - *Parameters:* Daily/monthly flow rate (MMSCFD), flowing tubing-head pressure (FTHP) and temperature, molar gas composition (CH₄, C₂H₆, C₃H₈, C₄+, N₂, CO₂, H₂S, H₂O dew point), and expected decline curve.
   - *Format:* CSV, Excel, or JSON logs; laboratory gas chromatography (GC) reports.
   - *Assumptions:* Where exact wellhead GC data is confidential or unavailable during early development, we use representative Assam-Arakan basin gas archetypes and synthetic sensitivity ranges, calibrated later with actual field samples.

2. **Regional Off-Taker & Demand Data:**
   - *Parameters:* Fuel consumption volumes (diesel, furnace oil, coal), thermal load profiles (e.g., seasonal tea-processing peaks), delivery site coordinates, and storage footprint availability.
   - *Format:* Tabular survey data / GeoJSON.

3. **Logistics, Terrain & Cost Benchmarks:**
   - *Parameters:* Road network geometry, bridge/ferry load limits, seasonal monsoon access constraints, local industrial power tariffs, and indicative modular skid CAPEX/OPEX quotes from OEMs.
   - *Format:* OpenStreetMap (OSM) road graphs, public tariff schedules, and OEM specification sheets.

4. **Operational & Telemetry Streams (Pilot Phase):**
   - *Parameters:* Time-series sensor readings (pressure, temperature, flow, tank level, LEL alarms) at 1–60 second intervals.
   - *Format:* Modbus/OPC-UA registers mapped to JSON/MQTT payloads.
   - *Processing Needs:* Unit normalization, outlier filtering, missing-value interpolation during cellular dropouts, and time-series aggregation for MRV reporting.

---

## 8. Team, manpower & expertise

Delivering a credible marginal-gas monetisation platform requires multidisciplinary expertise spanning process engineering, software/IoT systems, and North-East energy operations:

- **Project Lead & Energy Systems Architect (1 FTE across all phases):**
  - *Expertise:* Oil & gas midstream/downstream economics, modular LNG/CNG/GTL commercialization, stakeholder coordination with upstream operators and industrial buyers.
- **Process & Cryogenic Simulation Specialist (1 FTE in Phases 1–4, 0.5 FTE in Phase 5):**
  - *Expertise:* Natural gas sweetening, dehydration, Equation-of-State modeling, small-scale liquefaction cycle design, and HAZOP/PESO safety standards.
- **Full-Stack Software & GIS Engineer (1.5 FTE in Phases 2–4, 0.5 FTE in Phase 5):**
  - *Expertise:* React/TypeScript, Python/FastAPI, geospatial routing (VRPTW/OSM), and interactive data visualization.
- **Industrial IoT / Edge & SCADA Engineer (1 FTE in Phases 3–5):**
  - *Expertise:* PLC/SCADA protocols (Modbus, OPC-UA), MQTT edge gateways, store-and-forward resilience, and industrial cybersecurity.
- **Data Scientist / Optimization Engineer (0.5 FTE in Phases 2–4):**
  - *Expertise:* Techno-economic optimization, predictive maintenance anomaly detection, and carbon MRV accounting.
- **Field Operations & Business Development Lead — Assam (0.5 FTE in Phases 1–3, 1 FTE in Phase 5):**
  - *Expertise:* Local tea-estate/MSME engagement, logistics coordination across Upper Assam, and field operator training.

**Critical Specialist Skills:**
Cryogenic/gas-processing thermodynamics, PESO/OISD regulatory engineering, VRPTW logistics optimization, and ruggedized OT/IT edge integration for remote oilfield environments.

---

## 9. Testing, validation & evidence

We implement a rigorous, multi-layered testing and validation framework:

1. **Thermodynamic & Techno-Economic Verification:**
   - Unit and integration tests verifying mass/energy balances, liquefaction power duty (kWh/kg), boil-off gas rates, and DCF/IRR calculations against published industry benchmarks and reference process simulations.
   - Sensitivity testing across varying gas compositions (lean vs. rich gas, high CO₂/N₂) and transport distances (10–250 km).

2. **Software, API & Edge Resilience Testing:**
   - Automated backend API tests (pytest), frontend UI/workflow tests, and load/latency tests for real-time telemetry ingestion.
   - Network-partition testing (simulating 24–72 hour cellular outages) to verify edge MQTT store-and-forward buffering and zero data loss.

3. **Proposed Performance & Quality KPIs:**
   - **Sizing Accuracy:** <5% deviation in energy balance and <10% CAPEX/OPEX estimation variance against OEM engineering quotes.
   - **Delivered Fuel Parity:** Demonstrate ≥15–25% fuel cost savings vs. diesel/furnace oil for off-takers within 150 km.
   - **System Availability:** ≥99.5% telemetry uptime and <2 second alert latency for critical LEL/pressure safety alarms.
   - **Emissions Impact:** Quantifiable >85% reduction in flared gas volume at pilot wellheads.

4. **Evidence of Progress:**
   - A working interactive prototype (**StrataGas NE**) has been built and tested with representative Upper Assam marginal-field scenarios, demonstrating real-time pathway comparison (SSLNG vs. CNG vs. Micro-GTL), GIS demand matching, and dispatch simulation—documented in the attached Proof of Work PDF.

---

## 10. Security, privacy, safety & compliance

Handling upstream hydrocarbon data and operating cryogenic/high-pressure gas systems demands strict adherence to safety, regulatory, and cybersecurity standards:

1. **Process Safety & Regulatory Compliance:**
   - Software workflows enforce checklists and operational envelopes aligned with **PESO** (Static and Mobile Pressure Vessels Rules, SMPV), **OISD** (Oil Industry Safety Directorate) standards, and **PNGRB** technical regulations.
   - Real-time monitoring integrates Emergency Shutdown (ESD) status, Lower Explosive Limit (LEL) methane leak thresholds, H₂S limits, and cryogenic pressure-relief monitoring.

2. **OT/IT Cybersecurity:**
   - Strict unidirectional or DMZ-isolated gateway architecture between field PLC/SCADA networks and cloud servers so cloud users cannot directly actuate safety-critical valves.
   - End-to-end TLS 1.3 encryption, mutual authentication (mTLS) for edge gateways, and Role-Based Access Control (RBAC) with Multi-Factor Authentication (MFA).

3. **Data Privacy & Sovereignty:**
   - Upstream wellhead production and reserve data are sensitive; all data is encrypted at rest (AES-256), tenant-isolated, and hosted in India-based data centers compliant with Indian data protection norms.

4. **Auditability & Human-in-the-Loop Review:**
   - Immutable audit logs record all sizing assumptions, dispatch changes, safety alarms, and MRV carbon calculations.
   - Mandatory human-in-the-loop engineering sign-off is required before exporting feasibility dossiers, approving tanker dispatch overrides, or acknowledging critical safety alarms.

---

## 11. Innovation & differentiation

**Novel Element:**
Most existing solutions treat small-scale gas monetisation as either a **pure hardware sale** (expensive, rigid OEM skids) or a **generic pipeline/logistics problem**. Our innovation is a **Unified Modular-Skid + Digital-Twin Virtual Pipeline OS** tailored specifically for fragmented, low-volume, difficult-terrain fields like the Assam-Arakan basin. By coupling dynamic multi-pathway screening (SSLNG vs. Micro-GTL vs. CNG vs. Power) with monsoon-aware cryogenic dispatch and automated flare-reduction MRV, the platform turns previously unbankable marginal wells into financeable, repeatable micro-utilities.

**Existing Alternatives & Basis of Differentiation:**
- *Conventional LNG / Large GTL:* Require >20–50 MMSCFD and multi-year civil construction; our modular approach targets 0.2–2.0 MMSCFD with relocatable skids.
- *Standard CNG Cascades:* Economically limited to <50 km due to heavy steel tube trailers; our SSLNG pathway achieves ~3x higher energy density per truckload, extending viable reach to 150–300 km across Assam's tea and industrial belts.
- *Generic Process Simulators (e.g., Aspen/HYSYS):* Expensive, specialist-only desktop tools lacking GIS demand matching, Indian diesel/coal parity modeling, and live virtual-pipeline dispatch.

**IP & Dependencies:**
- *Proprietary IP:* Assam-Arakan marginal gas sizing heuristics, integrated VRPTW cryogenic dispatch algorithm, and automated flare-to-fuel MRV engine.
- *Open-Source / Standard Dependencies:* Built on proven open-source stacks (React, FastAPI, PostgreSQL/TimescaleDB, OpenStreetMap/OSRM, MQTT) avoiding vendor lock-in while remaining interoperable with major OEM skid PLCs.

---

## 12. Resources, risks & pilot validation

**Indicative Resource & Cost Drivers:**
- **Software & Digital Twin Development (Months 1–9):** Engineering manpower, cloud/GIS infrastructure, and simulation calibration (~₹18–22 lakh).
- **Edge Telemetry & Pilot Integration (Months 10–12):** Industrial IoT gateways, SCADA protocol testing, and safety/compliance documentation (~₹6–8 lakh).
- **Field Pilot Execution (Months 13–18):** On-site commissioning support, operator training, and 6-month monitoring (~₹10–12 lakh). *(Note: Heavy liquefaction skid hardware CAPEX for field trials is assumed to be co-funded/leased via OEM partner or upstream asset budget, separate from the ₹40 lakh NESFIC innovation grant).*

**Key Risks & Mitigations:**
1. *Feed-Gas Variability (High CO₂/N₂/Declining Flow):* Mitigated via modular pre-treatment sizing and relocatable skids that can move to a new wellhead if flow drops below threshold.
2. *Monsoon & Terrain Logistics Disruptions:* Mitigated by 3–5 day cryogenic buffer storage at tea estates/industrial buyers and monsoon-adjusted routing in the dispatch optimizer.
3. *PESO / Regulatory Delays:* Mitigated by early engagement with PESO-approved skid OEMs and standardized compliance templates from Month 1.
4. *Off-Taker Adoption Hesitancy:* Mitigated by guaranteed fuel-cost discount vs. diesel/furnace oil and turnkey regasification support.

**Pilot Validation Plan:**
Post-MVP (Month 10+), the platform will be pilot-validated at **1 nominated Upper Assam marginal/associated-gas wellhead** paired with **2–3 regional off-takers (e.g., tea estates or brick kilns)** over 6+ months, measuring avoided flaring, delivered fuel cost parity, dispatch uptime, and safety compliance.
