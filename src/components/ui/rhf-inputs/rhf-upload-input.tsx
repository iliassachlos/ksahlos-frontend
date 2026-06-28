import {
  Box,
  FormHelperText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useRef, type DragEvent } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { ImagePreview } from "../image-preview";

type RHFUploadInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  hint?: string;
  accept?: string;
  previewUrl?: string;
};

export const RHFUploadInput = <T extends FieldValues>(
  props: RHFUploadInputProps<T>,
) => {
  const { name, control, hint, accept = "image/png,image/jpeg", previewUrl } =
    props;

  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const file = field.value as File | null;

        const handleDrop = (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          const dropped = e.dataTransfer.files?.[0] ?? null;
          if (dropped) field.onChange(dropped);
        };

        return (
          <Stack direction="column" sx={{ gap: 1 }}>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              hidden
              onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
              onBlur={field.onBlur}
            />

            <Stack
              direction="row"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              sx={{
                alignItems: "center",
                p: 4,
                gap: 4,
                border: `1px dashed ${
                  fieldState.error
                    ? theme.palette.error.main
                    : theme.palette.divider
                }`,
                borderRadius: 2,
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
                "&:hover": {
                  borderColor: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.tinted,
                },
              }}
            >
              {file ? (
                <ImagePreview file={file} />
              ) : previewUrl ? (
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Current image"
                  sx={{
                    borderRadius: 1,
                    width: 68,
                    height: 82,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(22, 23, 26, .05) 0 1px, transparent 1px 10px)",
                    backgroundColor: theme.palette.grey[300],
                    borderRadius: 1,
                    width: 68,
                    height: 82,
                  }}
                />
              )}

              <Stack direction="column" sx={{ alignItems: "flex-start" }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {file
                    ? file.name
                    : previewUrl
                      ? "Click or drag to replace image"
                      : "Drag an image or click to browse"}
                </Typography>
                {hint && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: 12 }}
                  >
                    {hint}
                  </Typography>
                )}
              </Stack>
            </Stack>

            {fieldState.error && (
              <FormHelperText error>{fieldState.error.message}</FormHelperText>
            )}
          </Stack>
        );
      }}
    />
  );
};
