import type { CSSProperties } from "react";

const drops = Array.from({ length: 42 }, (_, index) => index);
const stars = Array.from({ length: 9 }, (_, index) => index);

export default function GlobalParticles() {
  return (
    <div className="global-particles" aria-hidden="true">
      {drops.map(index => (
        <span
          className="rain-drop"
          key={`drop-${index}`}
          style={{
            "--rain-x": `${(index * 37) % 100}%`,
            "--rain-delay": `${(index % 13) * -0.42}s`,
            "--rain-duration": `${3.6 + (index % 7) * 0.38}s`,
            "--rain-length": `${12 + (index % 5) * 7}px`,
            "--rain-opacity": `${0.16 + (index % 4) * 0.08}`,
          } as CSSProperties}
        />
      ))}
      {stars.map(index => (
        <span
          className="falling-star"
          key={`star-${index}`}
          style={{
            "--star-x": `${8 + ((index * 31) % 88)}%`,
            "--star-delay": `${(index % 7) * -1.8}s`,
            "--star-duration": `${5.5 + (index % 4) * 0.9}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
