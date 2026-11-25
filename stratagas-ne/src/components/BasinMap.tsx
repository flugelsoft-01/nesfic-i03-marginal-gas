import React from 'react';
import { WELLHEAD_NODES, OFFTAKER_NODES, WellheadNode, OffTakerNode, haversineRoadKm } from '../data/assamBasin';

interface BasinMapProps {
  selectedWellId: string;
  selectedBuyerId: string;
  onSelectWell: (well: WellheadNode) => void;
  onSelectBuyer: (buyer: OffTakerNode) => void;
}

export const BasinMap: React.FC<BasinMapProps> = ({
  selectedWellId,
  selectedBuyerId,
  onSelectWell,
  onSelectBuyer,
}) => {
  // Bounding box for Upper Assam
  const minLon = 93.75;
  const maxLon = 95.65;
  const minLat = 26.38;
  const maxLat = 27.68;

  const width = 720;
  const height = 370;
  const pad = 36;

  const project = (lat: number, lon: number) => {
    const x = pad + ((lon - minLon) / (maxLon - minLon)) * (width - 2 * pad);
    const y = height - pad - ((lat - minLat) / (maxLat - minLat)) * (height - 2 * pad);
    return { x, y };
  };

  const selectedWell = WELLHEAD_NODES.find((w) => w.id === selectedWellId) || WELLHEAD_NODES[0];
  const selectedBuyer = OFFTAKER_NODES.find((b) => b.id === selectedBuyerId) || OFFTAKER_NODES[0];
  const pWell = project(selectedWell.lat, selectedWell.lon);
  const pBuyer = project(selectedBuyer.lat, selectedBuyer.lon);
  const routeKm = haversineRoadKm(selectedWell.lat, selectedWell.lon, selectedBuyer.lat, selectedBuyer.lon);

  // Brahmaputra schematic curve
  const riverPoints = Array.from({ length: 16 }, (_, i) => {
    const lon = minLon + (i / 15) * (maxLon - minLon);
    const lat = 26.62 + 0.55 * (lon - 93.7) + 0.03 * Math.sin(5 * lon);
    const pt = project(lat, lon);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', background: '#f8fafc', borderRadius: 10, border: '1px solid #cbd5e1' }}
        role="img"
        aria-label="Assam-Arakan Basin Stranded Gas and Off-Taker GIS Map"
      >
        {/* Grid lines */}
        {[0.2, 0.4, 0.6, 0.8].map((f) => (
          <g key={f}>
            <line
              x1={pad}
              x2={width - pad}
              y1={pad + f * (height - 2 * pad)}
              y2={pad + f * (height - 2 * pad)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <line
              y1={pad}
              y2={height - pad}
              x1={pad + f * (width - 2 * pad)}
              x2={pad + f * (width - 2 * pad)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
          </g>
        ))}

        {/* Brahmaputra River */}
        <polyline fill="none" stroke="#93c5fd" strokeWidth="10" strokeLinecap="round" opacity={0.55} points={riverPoints} />
        <text x={250} y={248} fontSize="10" fill="#1d4ed8" fontWeight={600}>
          Brahmaputra River Corridor
        </text>

        {/* Active Virtual Pipeline Route */}
        <line
          x1={pWell.x}
          y1={pWell.y}
          x2={pBuyer.x}
          y2={pBuyer.y}
          stroke="#0d7377"
          strokeWidth="2.8"
          strokeDasharray="7 5"
        />
        <rect
          x={(pWell.x + pBuyer.x) / 2 - 42}
          y={(pWell.y + pBuyer.y) / 2 - 12}
          width="84"
          height="20"
          rx="10"
          fill="#0f2942"
        />
        <text
          x={(pWell.x + pBuyer.x) / 2}
          y={(pWell.y + pBuyer.y) / 2 + 2}
          textAnchor="middle"
          fontSize="10"
          fontWeight={700}
          fill="#ffffff"
        >
          {routeKm} km Road
        </text>

        {/* Off-Takers (Squares) */}
        {OFFTAKER_NODES.map((b) => {
          const { x, y } = project(b.lat, b.lon);
          const active = b.id === selectedBuyerId;
          return (
            <g
              key={b.id}
              onClick={() => onSelectBuyer(b)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={x - (active ? 9 : 7)}
                y={y - (active ? 9 : 7)}
                width={active ? 18 : 14}
                height={active ? 18 : 14}
                rx="3"
                fill={active ? '#0d7377' : '#0284c7'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x={x + 12} y={y + 8} fontSize="10" fontWeight={active ? 700 : 500} fill="#0f2942">
                {b.name}
              </text>
            </g>
          );
        })}

        {/* Wellheads (Triangles) */}
        {WELLHEAD_NODES.map((w) => {
          const { x, y } = project(w.lat, w.lon);
          const active = w.id === selectedWellId;
          const r = active ? 11 : 8;
          const pts = `${x},${y - r} ${x - r},${y + r * 0.8} ${x + r},${y + r * 0.8}`;
          return (
            <g
              key={w.id}
              onClick={() => onSelectWell(w)}
              style={{ cursor: 'pointer' }}
            >
              <polygon
                points={pts}
                fill={active ? '#dc2626' : '#f97316'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x={x + 12} y={y - 10} fontSize="10" fontWeight={active ? 700 : 600} fill="#7f1d1d">
                {w.district} ({w.flowMmscfd} MMSCFD)
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(18, 14)">
          <rect width="238" height="48" rx="6" fill="white" stroke="#cbd5e1" />
          <polygon points="16,12 10,22 22,22" fill="#dc2626" />
          <text x="28" y="20" fontSize="10" fill="#0f172a">Stranded / Associated Wellhead</text>
          <rect x="11" y="29" width="10" height="10" rx="2" fill="#0d7377" />
          <text x="28" y="38" fontSize="10" fill="#0f172a">Tea Estate / Kiln / Fleet Off-Taker</text>
        </g>
      </svg>
    </div>
  );
};
