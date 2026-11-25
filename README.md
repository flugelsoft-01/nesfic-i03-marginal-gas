# StrataGas NE — NESFIC-I-03

**Modular Monetisation of Stranded and Marginal Gas in the North-East — Small-Scale Liquefaction and Micro-Conversion for Fields Without Pipeline Connectivity**

## Contents
- `stratagas-ne/` — Interactive React + TypeScript + Vite web application:
  1. **Basin & Demand GIS Profiler** (Upper Assam: Tinsukia, Dibrugarh, Sivasagar, Charaideo, Jorhat, Golaghat)
  2. **Multi-Pathway Techno-Economic Sizing** (Modular SSLNG, 250-bar CNG Cascade, Micro-GTL, Wellhead Gas-to-Power)
  3. **Thermodynamic Process Digital Twin** (Amine Sweetening → Mol-Sieve Dehydration → MR Cold Box → Cryo Tank & BOG)
  4. **Virtual Pipeline Dispatch & SCADA/MRV Console** (Cryo ISO-tanker scheduling, PESO/OISD LEL/ESD interlocks, Carbon MRV)
- `NESFIC-I-03_Proposal_Content.md` & `NESFIC-I-03_Proposal.pdf` — 12-section NESFIC 2026 proposal (<500 words per section)
- `NESFIC-I-03_Proof_of_Work.pdf` — Proof of Work & Solution Evidence Dossier

## Run Locally
```bash
cd stratagas-ne
npm install
npm run dev
```

## Deploy to Cloudflare
### Option A: Cloudflare Pages (Git Integration)
- **Root directory:** `stratagas-ne`
- **Build command:** `npm run build`
- **Build output directory:** `dist`

### Option B: CLI via Wrangler
```bash
cd stratagas-ne
npx wrangler login
npm run deploy        # Cloudflare Workers Static Assets
# or
npm run deploy:pages  # Cloudflare Pages
```
