import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import type { FC, ReactNode } from "react";
import { Header } from "./header";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
      }}
    >
      <Container maxWidth="lg">
        <Header />
        {children}
      </Container>
    </Stack>
  );
};
