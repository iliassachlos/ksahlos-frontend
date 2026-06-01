import { Stack } from "@mui/material";
import type { FC } from "react";
import { Hero } from "../components/hero";
import { Welcome } from "../components/welcome";
import { SectionWrapper } from "@/components/section-wrapper/section-wrapper";
import { Collections } from "../components/collections";

type HomeSection = {
  component: FC;
  tinted: boolean;
};

const homeSectionMap: Record<string, HomeSection> = {
  hero: {
    component: Hero,
    tinted: false,
  },
  welcome: {
    component: Welcome,
    tinted: true,
  },
  collections: {
    component: Collections,
    tinted: false,
  },
} as const;

export const HomeView: FC = () => {
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        mt: 9,
        gap: 10,
      }}
    >
      {Object.values(homeSectionMap).map((section, index) => {
        const Component = section.component;

        return (
          <SectionWrapper key={index} tinted={section.tinted}>
            <Component />
          </SectionWrapper>
        );
      })}
    </Stack>
  );
};
