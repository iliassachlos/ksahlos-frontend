import { paths } from "@/routes/paths";
import { Button, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundView: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        height: "70vh",
        gap: 4,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 500 }}>
        Page Not Found
      </Typography>

      <Button variant="outlined" onClick={() => navigate(paths.home)}>
        Back to homepage
      </Button>
    </Stack>
  );
};
