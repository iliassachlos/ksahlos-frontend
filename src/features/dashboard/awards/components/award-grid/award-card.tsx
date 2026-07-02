import { Box, useTheme } from "@mui/material";
import type { FC } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import type { Award } from "@/types/awards";

import { DeleteAward } from "../delete-award/delete-award";

type AwardCardProps = {
  award: Award;
  isArranging?: boolean;
};

export const AwardCard: FC<AwardCardProps> = ({ award, isArranging }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        aspectRatio: "4/3",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: theme.palette.background.tinted,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        component="img"
        src={award.url}
        alt="Award"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />

      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        {isArranging ? (
          <DragIndicatorIcon
            sx={{
              color: theme.palette.text.disabled,
              bgcolor: "rgba(255, 255, 255, 0.85)",
              borderRadius: 1,
            }}
          />
        ) : (
          <DeleteAward awardId={award._id} />
        )}
      </Box>
    </Box>
  );
};
