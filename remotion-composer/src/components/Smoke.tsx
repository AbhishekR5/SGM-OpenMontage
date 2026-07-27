import React from "react";
import {
    AbsoluteFill,
    interpolate,
    random,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface SmokeProps {
    count?: number;
    opacity?: number;
}

export const Smoke: React.FC<SmokeProps> = ({
    count = 40,
    opacity = 0.35,
}) => {
    const frame = useCurrentFrame();
    const { width, height, durationInFrames } = useVideoConfig();

    return (
        <AbsoluteFill>
            {Array.from({ length: count }).map((_, i) => {
                const seed = random(i);

                const size = 200 + seed * 400;

                const x =
                    seed * width;

                const startY =
                    height + random(i + 10) * 300;

                const rise =
                    interpolate(
                        frame,
                        [0, durationInFrames],
                        [0, height + 500]
                    );

                const drift =
                    Math.sin(frame / 50 + i) * 40;

                const scale =
                    interpolate(
                        frame,
                        [0, durationInFrames],
                        [0.7, 1.5]
                    );

                const alpha =
                    opacity *
                    interpolate(
                        frame,
                        [
                            0,
                            durationInFrames * 0.25,
                            durationInFrames * 0.75,
                            durationInFrames,
                        ],
                        [
                            0,
                            1,
                            1,
                            0,
                        ]
                    );

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            width: size,
                            height: size,

                            left: x + drift,

                            top: startY - rise,

                            borderRadius: "50%",

                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(210,210,210,0.12) 40%, rgba(120,120,120,0.05) 70%, rgba(0,0,0,0) 100%)",

                            filter: "blur(70px)",

                            transform: `scale(${scale})`,

                            opacity: alpha,

                            mixBlendMode: "screen",

                            pointerEvents: "none",
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};

export default Smoke;