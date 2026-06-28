import { Box } from "@mui/material";
import { useEffect, useState, type FC } from "react";

type ImagePreviewProps = {
    file: File;
}

export const ImagePreview: FC<ImagePreviewProps> = ({ file }) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <Box
      component="img"
      src={url}
      alt={file.name}
      sx={{
        borderRadius: 1,
        width: 68,
        height: 82,
        objectFit: "cover",
      }}
    />
  );
};