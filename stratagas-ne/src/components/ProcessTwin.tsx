import React from 'react';
import { DigitalTwinMetrics, SimulationInput } from '../engine/simulation';

interface ProcessTwinProps {
  input: SimulationInput;
  twin: DigitalTwinMetrics;
}

export const ProcessTwin: React.FC<ProcessTwinProps> = ({ input, twin }) => {
  const blocks = [
    {
      title: '1. Inlet Separator',
      sub: `${input.flowMmscfd} MMSCFD @ ${input.pressureBar} bar`,
      metric: `H₂S: ${input.h2sPpm} ppmv`,
      bg: '#e2e8f0',
      border: '#0f2942',
    },
    {
      title: '2. Amine Sweetening',
      sub: `CO₂: ${input.co2Percent}% → <50 ppmv`,
      metric: `Reboiler: ${twin.amineDutyKw} kW`,
      bg: '#e0f2fe',
      border: '#0369a1',
    },
    {
      title: '3. Mol-Sieve Dehydration',
      sub: '260°C Regen Cycle',
      metric: `Dew Pt: ${twin.dehydratorDewPointC}°C`,
      bg: '#ccfbf1',
      border: '#0d7377',
    },
    {
      title: '4. MR Cold Box',
      sub: `Ambient: ${input.ambientTempC}°C`,
      metric: `Temp: ${twin.coldBoxTempC}°C`,
      bg: '#dbeafe',
      border: '#1d4ed8',
    },
    {
      title: '5. Cryo Tank & BOG',
      sub: `${twin.cryoTankVolumeM3} m³ Vacuum Tank`,
      metric: `Net: ${twin.netLngTpd} TPD LNG`,
      bg: '#dcfce7',
      border: '#15803d',
    },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
      {blocks.map((b, idx) => (
        <React.Fragment key={b.title}>
          <div
            style={{
              flex: '1 1 155px',
              background: b.bg,
              border: `2px solid ${b.border}`,
              borderRadius: 10,
              padding: '0.75rem',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f2942' }}>{b.title}</div>
            <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: 4 }}>{b.sub}</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: b.border, marginTop: 6 }}>{b.metric}</div>
          </div>
          {idx < blocks.length - 1 && (
            <span style={{ fontWeight: 800, color: '#0d7377', fontSize: '1.1rem' }}>→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
