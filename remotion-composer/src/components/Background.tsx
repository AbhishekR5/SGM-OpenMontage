import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const PARTICLE_COUNT = 80;

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = interpolate(
    Math.sin(frame / (fps * 2)),
    [-1, 1],
    [0.75, 1]
  );

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Main Background */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center,#111827 0%,#050505 45%,#000000 100%)",
        }}
      />

      {/* Blue Volumetric Glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,180,255,0.22) 0%, rgba(0,180,255,0.08) 25%, transparent 70%)",
          opacity: pulse,
          filter: "blur(80px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Gold Ambient Glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      {/* Animated Particles */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => {
        const x = (index * 37) % 100;
        const y = (index * 61) % 100;

        const drift =
          Math.sin((frame + index * 11) * 0.015) * 18;

        const opacity =
          0.15 +
          ((Math.sin((frame + index * 23) * 0.03) + 1) / 2) *
            0.45;

        const scale =
          0.5 +
          ((Math.sin((frame + index * 17) * 0.02) + 1) / 2);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `calc(${y}% + ${drift}px)`,
              width: 2 + (index % 4),
              height: 2 + (index % 4),
              borderRadius: "50%",
              background: "#ffffff",
              opacity,
              transform: `scale(${scale})`,
              boxShadow:
                "0 0 8px rgba(255,255,255,.8),0 0 20px rgba(0,180,255,.5)",
            }}
          />
        );
      })}

      {/* Vignette */}
      <AbsoluteFill
        style={{
          boxShadow:
            "inset 0 0 350px rgba(0,0,0,0.95)",
        }}
      />

      {/* Film Grain */}
      <AbsoluteFill
        style={{
          opacity: 0.035,
          backgroundImage:
            "radial-gradient(#ffffff 0.5px, transparent 0.5px)",
          backgroundSize: "5px 5px",
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};

export default Background;