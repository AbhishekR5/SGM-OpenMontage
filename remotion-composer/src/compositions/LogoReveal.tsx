import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Smoke from "../components/Smoke";
import ColdPyro from "../components/ColdPyro";
import Laser from "../components/Laser";
import CameraRig from "../components/CameraRig";

const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progress = frame / durationInFrames;

  const cameraProgress = spring({
    frame,
    fps,
    config: {
      damping: 120,
      stiffness: 40,
      mass: 1,
    },
  });

  const logoOpacity = interpolate(
    frame,
    [0, 45, 120],
    [0, 0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const logoScale = interpolate(
    frame,
    [40, 180],
    [0.65, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const glow = interpolate(
    frame,
    [80, 220],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const taglineOpacity = interpolate(
    frame,
    [420, 500],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      <Background progress={progress} />

      <CameraRig progress={cameraProgress}>
        <Smoke progress={progress} />

        <Laser progress={progress} />

        <ColdPyro progress={progress} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 ${40 * glow}px rgba(212,175,55,.9))`,
          }}
        >
          <Logo progress={progress} />
        </div>
      </CameraRig>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          textAlign: "center",
          opacity: taglineOpacity,
          color: "#FFFFFF",
          fontFamily: "Arial, Helvetica, sans-serif",
          letterSpacing: 8,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          ENGINEERING EXTRAORDINARY EXPERIENCES
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 18,
            color: "#D4AF37",
            letterSpacing: 5,
          }}
        >
          www.sgmsfx.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default LogoReveal;