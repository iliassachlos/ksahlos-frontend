import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import type { FC, ReactNode } from "react";
import { Header } from "./header";
import { HEADER_HEIGHT } from "@/data/globals";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        // bgcolor
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ mt: `${HEADER_HEIGHT}px` }}>
        {children}
      </Container>
    </Stack>
  );
};
