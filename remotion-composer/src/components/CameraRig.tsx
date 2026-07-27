import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from "remotion";

interface CameraRigProps {
  children: React.ReactNode;

  orbitRadius?: number;
  orbitSpeed?: number;

  zoomStart?: number;
  zoomEnd?: number;

  floatAmount?: number;

  rotateStart?: number;
  rotateEnd?: number;
}

const CameraRig: React.FC<CameraRigProps> = ({
  children,

  orbitRadius = 40,
  orbitSpeed = 1,

  zoomStart = 1,
  zoomEnd = 1.12,

  floatAmount = 12,

  rotateStart = -2,
  rotateEnd = 2,
}) => {
  const frame = useCurrentFrame();

  //---------------------------------------------
  // Smooth camera progress
  //---------------------------------------------
  const progress = interpolate(frame, [0, 600], [0, 1], {
    easing: Easing.bezier(0.42, 0, 0.58, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  //---------------------------------------------
  // Dolly Zoom
  //---------------------------------------------
  const scale = interpolate(progress, [0, 1], [zoomStart, zoomEnd]);

  //---------------------------------------------
  // Orbit Motion
  //---------------------------------------------
  const orbitX =
    Math.sin(progress * Math.PI * 2 * orbitSpeed) * orbitRadius;

  const orbitY =
    Math.cos(progress * Math.PI * 2 * orbitSpeed) * (orbitRadius * 0.35);

  //---------------------------------------------
  // Floating Motion
  //---------------------------------------------
  const floatY =
    Math.sin(frame / 28) * floatAmount;

  //---------------------------------------------
  // Camera Rotation
  //---------------------------------------------
  const rotate =
    interpolate(progress, [0, 0.5, 1], [
      rotateStart,
      rotateEnd,
      rotateStart,
    ]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        transform: `
          translate(${orbitX}px, ${orbitY + floatY}px)
          scale(${scale})
          rotate(${rotate}deg)
        `,

        transformStyle: "preserve-3d",

        willChange: "transform",

        overflow: "hidden",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export default CameraRig;