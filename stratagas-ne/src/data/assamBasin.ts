export interface WellheadNode {
  id: string;
  name: string;
  district: 'Tinsukia' | 'Dibrugarh' | 'Sivasagar' | 'Charaideo' | 'Jorhat' | 'Golaghat';
  lat: number;
  lon: number;
  flowMmscfd: number;
  pressureBar: number;
  gasType: 'Associated Gas' | 'Isolated Marginal';
  composition: {
    ch4: number; // %
    c2Plus: number; // %
    co2: number; // %
    n2: number; // %
    h2sPpm: number; // ppmv
  };
  nearestTrunkKm: number;
  flareStatus: 'Flaring' | 'Shut-in' | 'Re-injected';
}

export interface OffTakerNode {
  id: string;
  name: string;
  district: string;
  sector: 'Tea Estate' | 'Brick Kiln' | 'MSME Industrial' | 'Commercial Fleet';
  lat: number;
  lon: number;
  demandMmbtuDay: number;
  currentFuel: 'Diesel' | 'Furnace Oil' | 'Coal';
  currentFuelPriceInrMmbtu: number;
  storageBufferDays: number;
  monsoonAccessRisk: 'Low' | 'Moderate' | 'High';
}

export const WELLHEAD_NODES: WellheadNode[] = [
  {
    id: 'w-tsk-04',
    name: 'Tinsukia-M04 (Makum Belt)',
    district: 'Tinsukia',
    lat: 27.49,
    lon: 95.36,
    flowMmscfd: 0.85,
    pressureBar: 24,
    gasType: 'Associated Gas',
    composition: { ch4: 89.0, c2Plus: 3.8, co2: 4.2, n2: 3.0, h2sPpm: 18 },
    nearestTrunkKm: 38,
    flareStatus: 'Flaring',
  },
  {
    id: 'w-dbg-02',
    name: 'Dibrugarh-A02 (Naharkatiya)',
    district: 'Dibrugarh',
    lat: 27.47,
    lon: 94.91,
    flowMmscfd: 0.60,
    pressureBar: 19,
    gasType: 'Associated Gas',
    composition: { ch4: 87.5, c2Plus: 4.5, co2: 5.0, n2: 3.0, h2sPpm: 25 },
    nearestTrunkKm: 29,
    flareStatus: 'Flaring',
  },
  {
    id: 'w-svg-07',
    name: 'Sivasagar-S07 (Rudrasagar)',
    district: 'Sivasagar',
    lat: 26.98,
    lon: 94.64,
    flowMmscfd: 1.10,
    pressureBar: 32,
    gasType: 'Isolated Marginal',
    composition: { ch4: 91.2, c2Plus: 3.2, co2: 3.1, n2: 2.5, h2sPpm: 8 },
    nearestTrunkKm: 52,
    flareStatus: 'Shut-in',
  },
  {
    id: 'w-chr-01',
    name: 'Charaideo-C01 (Sonari)',
    district: 'Charaideo',
    lat: 27.02,
    lon: 95.02,
    flowMmscfd: 0.45,
    pressureBar: 16,
    gasType: 'Associated Gas',
    composition: { ch4: 86.0, c2Plus: 5.0, co2: 5.5, n2: 3.5, h2sPpm: 35 },
    nearestTrunkKm: 44,
    flareStatus: 'Flaring',
  },
  {
    id: 'w-jrt-03',
    name: 'Jorhat-J03 (Mariani)',
    district: 'Jorhat',
    lat: 26.75,
    lon: 94.22,
    flowMmscfd: 0.55,
    pressureBar: 22,
    gasType: 'Isolated Marginal',
    composition: { ch4: 90.0, c2Plus: 3.5, co2: 3.8, n2: 2.7, h2sPpm: 12 },
    nearestTrunkKm: 61,
    flareStatus: 'Shut-in',
  },
  {
    id: 'w-glg-02',
    name: 'Golaghat-G02 (Borholla)',
    district: 'Golaghat',
    lat: 26.52,
    lon: 93.96,
    flowMmscfd: 0.40,
    pressureBar: 18,
    gasType: 'Isolated Marginal',
    composition: { ch4: 88.4, c2Plus: 3.6, co2: 4.8, n2: 3.2, h2sPpm: 20 },
    nearestTrunkKm: 67,
    flareStatus: 'Re-injected',
  },
];

export const OFFTAKER_NODES: OffTakerNode[] = [
  {
    id: 'b-tea-a',
    name: 'Upper Assam Tea Cluster A',
    district: 'Tinsukia',
    sector: 'Tea Estate',
    lat: 27.32,
    lon: 95.20,
    demandMmbtuDay: 420,
    currentFuel: 'Coal',
    currentFuelPriceInrMmbtu: 1090,
    storageBufferDays: 3.4,
    monsoonAccessRisk: 'Moderate',
  },
  {
    id: 'b-kiln-b',
    name: 'Dibrugarh Brick & Ceramic Cluster',
    district: 'Dibrugarh',
    sector: 'Brick Kiln',
    lat: 27.35,
    lon: 94.82,
    demandMmbtuDay: 310,
    currentFuel: 'Coal',
    currentFuelPriceInrMmbtu: 1050,
    storageBufferDays: 2.7,
    monsoonAccessRisk: 'High',
  },
  {
    id: 'b-msme-c',
    name: 'Sivasagar MSME & Fleet Hub',
    district: 'Sivasagar',
    sector: 'Commercial Fleet',
    lat: 26.86,
    lon: 94.55,
    demandMmbtuDay: 380,
    currentFuel: 'Diesel',
    currentFuelPriceInrMmbtu: 1340,
    storageBufferDays: 3.8,
    monsoonAccessRisk: 'Low',
  },
  {
    id: 'b-tea-d',
    name: 'Jorhat Tea & Industrial Belt',
    district: 'Jorhat',
    sector: 'Tea Estate',
    lat: 26.68,
    lon: 94.30,
    demandMmbtuDay: 460,
    currentFuel: 'Furnace Oil',
    currentFuelPriceInrMmbtu: 1180,
    storageBufferDays: 3.1,
    monsoonAccessRisk: 'Moderate',
  },
  {
    id: 'b-agro-e',
    name: 'Golaghat Agro-Process Hub',
    district: 'Golaghat',
    sector: 'MSME Industrial',
    lat: 26.58,
    lon: 94.08,
    demandMmbtuDay: 240,
    currentFuel: 'Diesel',
    currentFuelPriceInrMmbtu: 1340,
    storageBufferDays: 4.0,
    monsoonAccessRisk: 'Low',
  },
];

export function haversineRoadKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const straightKm = 2 * R * Math.asin(Math.sqrt(a));
  // Assam terrain & river-crossing road winding factor ~1.38x
  return Math.round(straightKm * 1.38);
}
