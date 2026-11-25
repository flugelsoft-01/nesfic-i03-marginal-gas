export interface SimulationInput {
  flowMmscfd: number;
  pressureBar: number;
  co2Percent: number;
  n2Percent: number;
  h2sPpm: number;
  distanceKm: number;
  wellheadGasPriceInrMmbtu: number;
  ambientTempC: number;
  monsoonMode: boolean;
}

export interface PathwayResult {
  id: 'sslng' | 'cng' | 'micro_gtl' | 'power';
  name: string;
  shortName: string;
  recommended: boolean;
  capexCroreInr: number;
  deliveredCostInrMmbtu: number;
  paybackYears: number;
  preTaxIrrPercent: number;
  viableReachKm: number;
  payloadUnit: string;
  avoidedCo2TonnesYear: number;
  costBreakdown: {
    feedGas: number;
    preTreatment: number;
    processingPowerAndOm: number;
    transport: number;
    capexRecovery: number;
  };
}

export interface DigitalTwinMetrics {
  sweetGasMmscfd: number;
  netLngTpd: number;
  specificPowerKwhKg: number;
  totalPowerKw: number;
  bogRatePercentDay: number;
  cryoTankVolumeM3: number;
  amineDutyKw: number;
  dehydratorDewPointC: number;
  coldBoxTempC: number;
  flaringAvoidedM3Day: number;
}

export interface DispatchTrip {
  tripId: string;
  vehicle: string;
  buyerName: string;
  distanceKm: number;
  payloadTonnes: number;
  roundTripHours: number;
  buyerBufferDaysAfter: number;
  status: 'En Route' | 'Loading' | 'Scheduled' | 'Monsoon Hold Buffer';
}

export function runDigitalTwin(input: SimulationInput): DigitalTwinMetrics {
  const acidGasFraction = (input.co2Percent + input.n2Percent * 0.4) / 100;
  const sweetGasMmscfd = Math.max(0.05, input.flowMmscfd * (1 - acidGasFraction));
  // 1 MMSCFD ~ 19.5 TPD LNG at 90% CH4; adjusted for fuel/shrinkage
  const ambientDerate = 1 + Math.max(0, input.ambientTempC - 28) * 0.008;
  const pressureCredit = Math.max(0.88, 1 - (input.pressureBar - 20) * 0.003);
  const specificPowerKwhKg = Number((0.42 * ambientDerate * pressureCredit).toFixed(3));
  const netLngTpd = Number((sweetGasMmscfd * 19.2).toFixed(2));
  const totalPowerKw = Math.round((netLngTpd * 1000 * specificPowerKwhKg) / 24);
  const bogRatePercentDay = Number((0.12 + (input.ambientTempC - 25) * 0.003).toFixed(2));
  const cryoTankVolumeM3 = Math.max(20, Math.round(netLngTpd * 2.2));
  const amineDutyKw = Math.round(input.flowMmscfd * input.co2Percent * 14.5);
  const flaringAvoidedM3Day = Math.round(input.flowMmscfd * 28316.8 * 0.94);

  return {
    sweetGasMmscfd: Number(sweetGasMmscfd.toFixed(2)),
    netLngTpd,
    specificPowerKwhKg,
    totalPowerKw,
    bogRatePercentDay,
    cryoTankVolumeM3,
    amineDutyKw,
    dehydratorDewPointC: -72,
    coldBoxTempC: -162,
    flaringAvoidedM3Day,
  };
}

export function runPathwayComparison(input: SimulationInput): PathwayResult[] {
  const flow = Math.max(0.15, input.flowMmscfd);
  const d = input.distanceKm;
  const monsoonFactor = input.monsoonMode ? 1.14 : 1.0;
  const scaleFactor = Math.pow(flow / 1.0, 0.68);
  const feed = input.wellheadGasPriceInrMmbtu;

  // 1. Modular SSLNG
  const sslngCapex = Number((18.5 * scaleFactor).toFixed(2));
  const sslngPreTreat = Math.round(120 + input.co2Percent * 6);
  const sslngProcOm = Math.round(210 + (input.ambientTempC - 28) * 3.5);
  const sslngTransport = Math.round(1.35 * d * monsoonFactor);
  const sslngCapexRec = Math.round(230 / Math.pow(flow, 0.22));
  const sslngTotal = feed + sslngPreTreat + sslngProcOm + sslngTransport + sslngCapexRec;
  const dieselParity = 1340;
  const sslngMargin = Math.max(80, dieselParity - sslngTotal);
  const annualMmbtu = flow * 365 * 980;
  const sslngAnnualProfitCr = (sslngMargin * annualMmbtu) / 1e7;
  const sslngPayback = Number(Math.min(12, sslngCapex / Math.max(0.5, sslngAnnualProfitCr)).toFixed(1));
  const sslngIrr = Number(Math.max(6, Math.min(38, (sslngAnnualProfitCr / sslngCapex) * 100 * 1.25)).toFixed(1));

  // 2. High-Pressure CNG Cascade
  const cngCapex = Number((9.2 * scaleFactor).toFixed(2));
  const cngPreTreat = Math.round(65 + input.co2Percent * 3);
  const cngProcOm = 205;
  const cngTransport = Math.round(6.2 * d * monsoonFactor);
  const cngCapexRec = Math.round(195 / Math.pow(flow, 0.2));
  const cngTotal = feed + cngPreTreat + cngProcOm + cngTransport + cngCapexRec;
  const cngMargin = Math.max(40, dieselParity - cngTotal);
  const cngAnnualProfitCr = (cngMargin * annualMmbtu) / 1e7;
  const cngPayback = Number(Math.min(15, cngCapex / Math.max(0.3, cngAnnualProfitCr)).toFixed(1));
  const cngIrr = Number(Math.max(4, Math.min(30, (cngAnnualProfitCr / cngCapex) * 100 * 1.15)).toFixed(1));

  // 3. Micro-GTL (Methanol / Syn-Diesel)
  const gtlCapex = Number((28.0 * scaleFactor).toFixed(2));
  const gtlPreTreat = Math.round(145 + input.co2Percent * 6);
  const gtlProcOm = 310;
  const gtlTransport = Math.round(0.9 * d * monsoonFactor);
  const gtlCapexRec = Math.round(355 / Math.pow(flow, 0.25));
  const gtlTotal = feed + gtlPreTreat + gtlProcOm + gtlTransport + gtlCapexRec;
  const gtlMargin = Math.max(60, dieselParity - gtlTotal);
  const gtlAnnualProfitCr = (gtlMargin * annualMmbtu) / 1e7;
  const gtlPayback = Number(Math.min(14, gtlCapex / Math.max(0.4, gtlAnnualProfitCr)).toFixed(1));
  const gtlIrr = Number(Math.max(5, Math.min(28, (gtlAnnualProfitCr / gtlCapex) * 100 * 1.1)).toFixed(1));

  // 4. Wellhead Gas-to-Power
  const pwrCapex = Number((11.5 * scaleFactor).toFixed(2));
  const pwrPreTreat = 70;
  const pwrProcOm = 240;
  const pwrTransport = Math.round(18 * Math.min(d, 40)); // Wire/grid wheeling penalty
  const pwrCapexRec = Math.round(215 / Math.pow(flow, 0.18));
  const pwrTotal = feed + pwrPreTreat + pwrProcOm + pwrTransport + pwrCapexRec;
  const pwrPayback = Number((pwrCapex / Math.max(0.6, (dieselParity - pwrTotal) * annualMmbtu / 1e7)).toFixed(1));
  const pwrIrr = Number(Math.max(6, Math.min(26, 22 - d * 0.12)).toFixed(1));

  const avoidedCo2 = Math.round(flow * 17200); // tCO2e/year avoided flaring + diesel displacement

  const results: PathwayResult[] = [
    {
      id: 'sslng',
      name: 'Modular Small-Scale LNG (SSLNG)',
      shortName: 'Modular SSLNG',
      recommended: false,
      capexCroreInr: sslngCapex,
      deliveredCostInrMmbtu: sslngTotal,
      paybackYears: sslngPayback,
      preTaxIrrPercent: sslngIrr,
      viableReachKm: 280,
      payloadUnit: '18–20 t Cryo ISO-Tanker',
      avoidedCo2TonnesYear: avoidedCo2,
      costBreakdown: {
        feedGas: feed,
        preTreatment: sslngPreTreat,
        processingPowerAndOm: sslngProcOm,
        transport: sslngTransport,
        capexRecovery: sslngCapexRec,
      },
    },
    {
      id: 'cng',
      name: 'High-Pressure CNG Cascade (250 bar)',
      shortName: 'CNG Cascade',
      recommended: false,
      capexCroreInr: cngCapex,
      deliveredCostInrMmbtu: cngTotal,
      paybackYears: cngPayback,
      preTaxIrrPercent: cngIrr,
      viableReachKm: 48,
      payloadUnit: '3.5–4.5 t Tube Trailer',
      avoidedCo2TonnesYear: Math.round(avoidedCo2 * 0.85),
      costBreakdown: {
        feedGas: feed,
        preTreatment: cngPreTreat,
        processingPowerAndOm: cngProcOm,
        transport: cngTransport,
        capexRecovery: cngCapexRec,
      },
    },
    {
      id: 'micro_gtl',
      name: 'Micro-GTL (Syn-Liquid / Methanol)',
      shortName: 'Micro-GTL',
      recommended: false,
      capexCroreInr: gtlCapex,
      deliveredCostInrMmbtu: gtlTotal,
      paybackYears: gtlPayback,
      preTaxIrrPercent: gtlIrr,
      viableReachKm: 400,
      payloadUnit: '24 t Ambient Liquid Tanker',
      avoidedCo2TonnesYear: Math.round(avoidedCo2 * 0.78),
      costBreakdown: {
        feedGas: feed,
        preTreatment: gtlPreTreat,
        processingPowerAndOm: gtlProcOm,
        transport: gtlTransport,
        capexRecovery: gtlCapexRec,
      },
    },
    {
      id: 'power',
      name: 'Wellhead Gas-to-Power Microgrid',
      shortName: 'Wellhead Power',
      recommended: false,
      capexCroreInr: pwrCapex,
      deliveredCostInrMmbtu: pwrTotal,
      paybackYears: Math.min(14, Math.max(2.5, pwrPayback)),
      preTaxIrrPercent: pwrIrr,
      viableReachKm: 15,
      payloadUnit: 'Local 11/33 kV Feeder',
      avoidedCo2TonnesYear: Math.round(avoidedCo2 * 0.82),
      costBreakdown: {
        feedGas: feed,
        preTreatment: pwrPreTreat,
        processingPowerAndOm: pwrProcOm,
        transport: pwrTransport,
        capexRecovery: pwrCapexRec,
      },
    },
  ];

  // Mark lowest delivered cost as recommended
  let bestIdx = 0;
  for (let i = 1; i < results.length; i++) {
    if (results[i].deliveredCostInrMmbtu < results[bestIdx].deliveredCostInrMmbtu) {
      bestIdx = i;
    }
  }
  results[bestIdx].recommended = true;
  return results;
}

export function buildDispatchSchedule(
  distanceKm: number,
  netLngTpd: number,
  monsoonMode: boolean
): DispatchTrip[] {
  const speedKmph = monsoonMode ? 28 : 38;
  const roundTrip = (d: number) => Number(((2 * d) / speedKmph + 1.5).toFixed(1));

  return [
    {
      tripId: 'VP-101',
      vehicle: 'Cryo ISO-Tanker AS-23-LN-01',
      buyerName: 'Upper Assam Tea Cluster A',
      distanceKm: Math.max(18, Math.round(distanceKm * 0.65)),
      payloadTonnes: Number(Math.min(18.5, Math.max(8, netLngTpd * 0.55)).toFixed(1)),
      roundTripHours: roundTrip(Math.max(18, distanceKm * 0.65)),
      buyerBufferDaysAfter: monsoonMode ? 3.2 : 3.8,
      status: 'En Route',
    },
    {
      tripId: 'VP-102',
      vehicle: 'Cryo ISO-Tanker AS-06-LN-04',
      buyerName: 'Dibrugarh Brick & Ceramic Cluster',
      distanceKm: distanceKm,
      payloadTonnes: Number(Math.min(18.5, Math.max(7, netLngTpd * 0.45)).toFixed(1)),
      roundTripHours: roundTrip(distanceKm),
      buyerBufferDaysAfter: monsoonMode ? 2.4 : 3.1,
      status: monsoonMode ? 'Monsoon Hold Buffer' : 'Loading',
    },
    {
      tripId: 'VP-103',
      vehicle: 'Cryo ISO-Tanker AS-04-LN-02',
      buyerName: 'Sivasagar MSME & Fleet Hub',
      distanceKm: Math.round(distanceKm * 1.15),
      payloadTonnes: 14.0,
      roundTripHours: roundTrip(distanceKm * 1.15),
      buyerBufferDaysAfter: 3.6,
      status: 'Scheduled',
    },
  ];
}
