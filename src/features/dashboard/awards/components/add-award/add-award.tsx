import { Button } from "@mui/material";
import { type ChangeEvent, type FC } from "react";
import AddIcon from "@mui/icons-material/Add";

import { useAddAwardMutation } from "@/store/apis/awards-api";

export const AddAward: FC = () => {
  const [addAward, { isLoading }] = useAddAwardMutation();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    await addAward(formData);
  };

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<AddIcon />}
      loading={isLoading}
    >
      Add Award
      <input
        type="file"
        accept="image/png,image/jpeg"
        hidden
        onChange={handleFileChange}
      />
    </Button>
  );
};