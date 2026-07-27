import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface LogoProps {
  src?: string;
}

export const Logo: React.FC<LogoProps> = ({
  src = "/SGM.png",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth cinematic reveal
  const reveal = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 70,
      mass: 1.2,
    },
  });

  const scale = interpolate(
    reveal,
    [0, 1],
    [0.6, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const opacity = interpolate(
    reveal,
    [0, 1],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Slow floating motion
  const translateY =
    Math.sin(frame / 35) * 6;

  // Very subtle breathing
  const breathing =
    1 + Math.sin(frame / 45) * 0.015;

  // Golden glow animation
  const glow =
    25 + Math.sin(frame / 20) * 10;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          transform: `
            translateY(${translateY}px)
            scale(${scale * breathing})
          `,
          opacity,
          transition: "transform 0.2s linear",
        }}
      >
        {/* Outer Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            filter: `blur(${glow}px)`,
            opacity: 0.45,
            background:
              "radial-gradient(circle, rgba(212,175,55,0.75) 0%, rgba(212,175,55,0) 70%)",
            borderRadius: "50%",
            transform: "scale(1.35)",
          }}
        />

        {/* Logo */}
        <Img
          src={src}
          style={{
            width: 520,
            objectFit: "contain",
            position: "relative",
            zIndex: 5,

            filter: `
              drop-shadow(0 0 10px rgba(255,255,255,.45))
              drop-shadow(0 0 25px rgba(212,175,55,.65))
              drop-shadow(0 0 70px rgba(212,175,55,.35))
            `,
          }}
        />

        {/* Reflection */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "100%",
            width: "80%",
            height: 120,
            transform:
              "translateX(-50%) scaleY(-1)",
            opacity: 0.12,
            filter: "blur(12px)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,.25), transparent)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export default Logo;