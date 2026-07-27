import React from "react";
import { Composition } from "remotion";
import LogoReveal from "./compositions/LogoReveal";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SGMLogoReveal"
        component={LogoReveal}
        durationInFrames={600} // 20 sec @ 30 FPS
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: "SGM Special Effects",
          subtitle: "Engineering Extraordinary Experiences",
          logo: "/SGM.png",
          theme: {
            background: "#000000",
            primary: "#D4AF37",
            secondary: "#00AEEF",
            text: "#FFFFFF",
          },
          effects: {
            smoke: true,
            coldPyro: true,
            laser: true,
          },
        }}
      />
    </>
  );
};

export default RemotionRoot;