import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type RHFSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  label?: string;
  fullWidth?: boolean;
};

export const RHFSelect = <T extends FieldValues>(
  props: RHFSelectProps<T>,
) => {
  const { name, control, options, label, fullWidth } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth={fullWidth} error={!!fieldState.error}>
          {label && <InputLabel>{label}</InputLabel>}
          <Select
            {...field}
            value={field.value ?? ""}
            label={label}
            onBlur={field.onBlur}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
