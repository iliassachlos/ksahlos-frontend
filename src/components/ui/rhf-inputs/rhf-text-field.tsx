import { TextField, type TextFieldProps } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type RHFTextFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

export const RHFTextField = <T extends FieldValues>(
  props: RHFTextFieldProps<T>,
) => {
  const { name, control, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? rest.helperText}
        />
      )}
    />
  );
};
