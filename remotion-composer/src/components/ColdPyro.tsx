import React from "react";
import {
    AbsoluteFill,
    interpolate,
    random,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

interface Spark {
    id: number;
    x: number;
    delay: number;
    speed: number;
    size: number;
    rotation: number;
    opacity: number;
}

interface ColdPyroProps {
    enabled?: boolean;
    intensity?: number;
    color?: string;
}

const ColdPyro: React.FC<ColdPyroProps> = ({
    enabled = true,
    intensity = 120,
    color = "#FFD54F",
}) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    if (!enabled) return null;

    const sparks: Spark[] = Array.from({ length: intensity }).map((_, index) => ({
        id: index,
        x: random(index) * width,
        delay: random(index + 100) * 20,
        speed: 4 + random(index + 200) * 10,
        size: 2 + random(index + 300) * 5,
        rotation: random(index + 400) * 360,
        opacity: 0.4 + random(index + 500) * 0.6,
    }));

    return (
        <AbsoluteFill pointerEvents="none">
            {sparks.map((spark) => {
                const localFrame = Math.max(frame - spark.delay, 0);

                const y = height + 30 - localFrame * spark.speed;

                if (y < -100) return null;

                const opacity = interpolate(
                    localFrame,
                    [0, 10, 40, 70],
                    [0, spark.opacity, spark.opacity, 0],
                    {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }
                );

                const scale = interpolate(
                    localFrame,
                    [0, 20],
                    [0.3, 1],
                    {
                        extrapolateRight: "clamp",
                    }
                );

                return (
                    <div
                        key={spark.id}
                        style={{
                            position: "absolute",
                            left: spark.x,
                            top: y,
                            width: spark.size,
                            height: spark.size * 6,
                            transform: `rotate(${spark.rotation}deg) scale(${scale})`,
                            opacity,
                            borderRadius: 100,
                            background: color,
                            boxShadow: `
                                0 0 4px ${color},
                                0 0 10px ${color},
                                0 0 18px ${color},
                                0 0 28px rgba(255,255,255,0.85)
                            `,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};

export default ColdPyro;