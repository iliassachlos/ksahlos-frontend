import { paths } from "@/routes/paths";
import { Stack } from "@mui/system";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        height: "48px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          height: "100%",

          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate(paths.home)}
      >
        <img
          src="images/ksahlos-logo.png"
          alt="KSAHLOS Logo"
          style={{ width: 350 }}
        />
      </Stack>
    </Stack>
  );
};
