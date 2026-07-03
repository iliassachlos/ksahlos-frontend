import { IconButton } from "@mui/material";
import { useState, type FC } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDeleteAwardMutation } from "@/store/apis/awards-api";

type DeleteAwardProps = {
  awardId: string;
};

export const DeleteAward: FC<DeleteAwardProps> = ({ awardId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [deleteAward, { isLoading }] = useDeleteAwardMutation();

  const handleDelete = async () => {
    await deleteAward(awardId);
    setIsDialogOpen(false);
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={() => setIsDialogOpen(true)}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.85)",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
        }}
      >
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>

      {isDialogOpen && (
        <ConfirmDialog
          type="error"
          title="Delete Award"
          message="Are you sure you want to delete this award?"
          isLoading={isLoading}
          onCancel={() => setIsDialogOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};