import { Autocomplete, TextField, type TextFieldProps } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type RHFAutocompleteProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: string[];
  label?: string;
  placeholder?: string;
} & Pick<TextFieldProps, "fullWidth">;

export const RHFAutocomplete = <T extends FieldValues>(
  props: RHFAutocompleteProps<T>,
) => {
  const { name, control, options, label, placeholder, fullWidth } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          freeSolo
          options={options}
          // Free text: the input value IS the field value (typed or selected).
          inputValue={field.value ?? ""}
          onInputChange={(_, value) => field.onChange(value)}
          onBlur={field.onBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              fullWidth={fullWidth}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  );
};
