import React from "react";
import {
    AbsoluteFill,
    interpolate,
    random,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface LaserBeam {
    id: number;
    top: number;
    rotation: number;
    delay: number;
    duration: number;
    opacity: number;
    width: number;
}

const LASER_COUNT = 6;

export const Laser: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const beams: LaserBeam[] = Array.from({ length: LASER_COUNT }).map((_, i) => ({
        id: i,
        top: random(i) * height,
        rotation: random(i + 100) * 8 - 4,
        delay: Math.floor(random(i + 200) * 40),
        duration: 90 + Math.floor(random(i + 300) * 50),
        opacity: 0.45 + random(i + 400) * 0.35,
        width: 2 + random(i + 500) * 5,
    }));

    return (
        <AbsoluteFill style={{ pointerEvents: "none" }}>
            {beams.map((beam) => {
                const progress = (frame - beam.delay) / beam.duration;

                const x = interpolate(
                    progress,
                    [0, 1],
                    [-width * 0.3, width * 1.3],
                    {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }
                );

                const fade = interpolate(
                    progress,
                    [0, 0.15, 0.85, 1],
                    [0, beam.opacity, beam.opacity, 0],
                    {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }
                );

                return (
                    <div
                        key={beam.id}
                        style={{
                            position: "absolute",
                            left: x,
                            top: beam.top,
                            width: width * 1.8,
                            height: beam.width,
                            opacity: fade,
                            transform: `rotate(${beam.rotation}deg)`,
                            transformOrigin: "left center",
                            background:
                                "linear-gradient(90deg, rgba(0,184,255,0) 0%, rgba(0,184,255,1) 50%, rgba(0,184,255,0) 100%)",
                            boxShadow: `
                                0 0 8px rgba(0,184,255,0.9),
                                0 0 18px rgba(0,184,255,0.8),
                                0 0 35px rgba(0,184,255,0.7),
                                0 0 60px rgba(0,184,255,0.5)
                            `,
                            filter: "blur(1px)",
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};

export default Laser;