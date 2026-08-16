import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getApiErrorMessage } from "../services/auth";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login(formValues);

      setFormValues({
        email: "",
        password: "",
      });
      const destination =
        (location.state as { from?: string } | null)?.from ?? "/home";
      navigate(destination, { replace: true });
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          "Unable to log in. Please check your details.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f7fb",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          p: { xs: 3, sm: 4 },
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Welcome back
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Log in to continue your conversations.
            </Typography>
          </Box>

          <Stack component="form" spacing={2.25} onSubmit={handleSubmit}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <TextField
              fullWidth
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleInputChange}
              required
            />

            <Button
              fullWidth
              disabled={isSubmitting}
              size="large"
              type="submit"
              variant="contained"
              sx={{ py: 1.25, textTransform: "none", fontWeight: 700 }}
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </Stack>

          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            New to WeChat?{" "}
            <Link
              component={RouterLink}
              to="/signup"
              underline="hover"
              sx={{ fontWeight: 700 }}
            >
              Create account
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
