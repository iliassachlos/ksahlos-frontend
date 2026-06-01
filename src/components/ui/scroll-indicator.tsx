import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import type { FC } from "react";

const travel = keyframes`
  0%   { top: 0%;   opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

export const ScrollIndicator: FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1.5,
      mt: 8,
    }}
  >
    <Typography
      variant="overline"
      sx={{
        fontSize: "10px",
        letterSpacing: "0.28em",
        color: "text.disabled",
      }}
    >
      Scroll
    </Typography>

    <Box
      sx={{
        position: "relative",
        width: "1px",
        height: "56px",
        bgcolor: "divider",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          width: "1px",
          height: "10px",
          bgcolor: "text.secondary",
          animation: `${travel} 2s cubic-bezier(.16,1,.3,1) infinite`,
        }}
      />
    </Box>
  </Box>
);
