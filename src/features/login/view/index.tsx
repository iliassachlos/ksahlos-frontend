import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  loginDefaultValues,
  loginSchema,
  type LoginSchema,
} from "@/features/login/schemas/login-schema";
import { RHFTextField } from "@/components/ui/rhf-inputs/rhf-text-field";
import { paths } from "@/routes/paths";
import { useLoginMutation } from "@/store/apis/auth-api";

export const LoginView: FC = () => {
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = async (formData: LoginSchema) => {
    const { data, error } = await login(formData);

    if (error) {
      const message =
        "data" in error
          ? ((error.data as { error?: string }).error ?? "Something went wrong")
          : "Something went wrong";
      setError("root", { message });
      return;
    }

    if (data) {
      localStorage.setItem("token", data);
      navigate(paths.dashboard);
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        maxWidth: 440,
        gap: 2,
      }}
    >
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ textTransform: "uppercase" }}
      >
        studio access
      </Typography>

      <Stack
        direction="column"
        sx={{ justifyContent: "center", alignItems: "flex-start", gap: 1 }}
      >
        <Typography variant="h3">Welcome back</Typography>
        <Typography variant="body2">
          Sign in to manage your portfolio and collections.
        </Typography>
      </Stack>

      {errors.root && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {errors.root.message}
        </Alert>
      )}

      <RHFTextField
        name="username"
        control={control}
        label="Username"
        fullWidth
      />

      <RHFTextField
        name="password"
        control={control}
        label="Password"
        type="password"
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        loading={isLoading}
      >
        Sign in
      </Button>
    </Stack>
  );
};
