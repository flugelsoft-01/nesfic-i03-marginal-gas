import React from 'react';
import { SimulationInput, PathwayResult } from '../engine/simulation';

interface BreakEvenChartProps {
  input: SimulationInput;
  results: PathwayResult[];
}

export const BreakEvenChart: React.FC<BreakEvenChartProps> = ({ input, results }) => {
  const width = 560;
  const height = 270;
  const padL = 54;
  const padR = 20;
  const padT = 22;
  const padB = 38;

  const distances = [10, 30, 50, 80, 100, 130, 160, 200, 250];
  const monsoon = input.monsoonMode ? 1.14 : 1.0;

  const sslngPts = distances.map((d) => ({
    d,
    cost: results[0].deliveredCostInrMmbtu - results[0].costBreakdown.transport + Math.round(1.35 * d * monsoon),
  }));
  const cngPts = distances.map((d) => ({
    d,
    cost: results[1].deliveredCostInrMmbtu - results[1].costBreakdown.transport + Math.round(6.2 * d * monsoon),
  }));
  const gtlPts = distances.map((d) => ({
    d,
    cost: results[2].deliveredCostInrMmbtu - results[2].costBreakdown.transport + Math.round(0.9 * d * monsoon),
  }));

  const maxY = 1850;
  const minY = 600;
  const mapX = (d: number) => padL + ((d - 10) / 240) * (width - padL - padR);
  const mapY = (c: number) => height - padB - ((Math.min(maxY, Math.max(minY, c)) - minY) / (maxY - minY)) * (height - padT - padB);

  const toPoly = (pts: { d: number; cost: number }[]) =>
    pts.map((p) => `${mapX(p.d)},${mapY(p.cost)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }} role="img" aria-label="Break-even distance curve">
      {[800, 1000, 1200, 1400, 1600, 1800].map((val) => (
        <g key={val}>
          <line x1={padL} x2={width - padR} y1={mapY(val)} y2={mapY(val)} stroke="#e2e8f0" strokeDasharray="3 3" />
          <text x={padL - 8} y={mapY(val) + 3} textAnchor="end" fontSize="9.5" fill="#475569">
            ₹{val}
          </text>
        </g>
      ))}
      {distances.map((d) => (
        <text key={d} x={mapX(d)} y={height - 16} textAnchor="middle" fontSize="9.5" fill="#475569">
          {d} km
        </text>
      ))}

      {/* Diesel Parity Line */}
      <line x1={padL} x2={width - padR} y1={mapY(1340)} y2={mapY(1340)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x={width - padR - 4} y={mapY(1340) - 5} textAnchor="end" fontSize="9" fill="#dc2626" fontWeight={700}>
        Diesel Parity (₹1,340/MMBtu)
      </text>

      {/* Current selected distance marker */}
      <line x1={mapX(input.distanceKm)} x2={mapX(input.distanceKm)} y1={padT} y2={height - padB} stroke="#0f2942" strokeDasharray="3 3" />

      <polyline fill="none" stroke="#d97706" strokeWidth="2.4" points={toPoly(cngPts)} />
      <polyline fill="none" stroke="#0d7377" strokeWidth="2.8" points={toPoly(sslngPts)} />
      <polyline fill="none" stroke="#6366f1" strokeWidth="2.0" strokeDasharray="5 3" points={toPoly(gtlPts)} />

      {/* Legend */}
      <g transform={`translate(${padL + 10}, 10)`}>
        <line x1="0" y1="6" x2="18" y2="6" stroke="#0d7377" strokeWidth="2.8" />
        <text x="22" y="10" fontSize="9.5" fontWeight={700} fill="#0f2942">SSLNG</text>
        <line x1="72" y1="6" x2="90" y2="6" stroke="#d97706" strokeWidth="2.4" />
        <text x="94" y="10" fontSize="9.5" fontWeight={700} fill="#0f2942">CNG Cascade</text>
        <line x1="175" y1="6" x2="193" y2="6" stroke="#6366f1" strokeWidth="2.0" strokeDasharray="5 3" />
        <text x="197" y="10" fontSize="9.5" fontWeight={700} fill="#0f2942">Micro-GTL</text>
      </g>
    </svg>
  );
};
