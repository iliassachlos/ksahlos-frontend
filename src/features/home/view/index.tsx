import { Stack } from "@mui/material";
import type { FC } from "react";
import { Hero } from "../components/hero";
import { Welcome } from "../components/welcome";
import { SectionWrapper } from "@/components/section-wrapper/section-wrapper";
import { Collections } from "../components/collections";
import { Journey } from "../components/journey";
import { Awards } from "../components/awards";
import { Contact } from "../components/contact";

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
  journey: {
    component: Journey,
    tinted: true,
  },
  awards: {
    component: Awards,
    tinted: false,
  },
  contact: {
    component: Contact,
    tinted: true,
  }
} as const;

export const HomeView: FC = () => {
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        mt: 8,
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
