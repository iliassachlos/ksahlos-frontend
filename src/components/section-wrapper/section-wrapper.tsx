import { Box, Container, useTheme } from "@mui/material";
import type { FC, ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  tinted?: boolean;
}

export const SectionWrapper: FC<SectionWrapperProps> = ({
  children,
  tinted = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        left: "50%",
        ml: "-50vw",
        mr: "-50vw",
        width: "100vw",
        bgcolor: tinted ? theme.palette.background.tinted : "transparent",
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
};
