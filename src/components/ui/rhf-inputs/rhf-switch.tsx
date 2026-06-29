import { FormControlLabel, Switch } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type RHFSwitchProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
};

export const RHFSwitch = <T extends FieldValues>(
  props: RHFSwitchProps<T>,
) => {
  const { name, control, label } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Switch
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
            />
          }
          label={label}
        />
      )}
    />
  );
};
