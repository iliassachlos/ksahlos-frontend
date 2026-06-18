import {
  Button,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useState, type FC } from "react";

export const LoginView: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
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

      <Stack direction="column" sx={{ gap: 0.75, width: "100%" }}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          fullWidth
          required
        />
      </Stack>

      <Stack direction="column" sx={{ gap: 0.75, width: "100%" }}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          fullWidth
          required
        />
      </Stack>

      <Button type="submit" variant="contained" size="large" fullWidth>
        Sign in
      </Button>
    </Stack>
  );
};
