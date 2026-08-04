import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getApiErrorMessage, loginUser } from "../services/auth";

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function handleRememberMeChange(event: ChangeEvent<HTMLInputElement>) {
    setRememberMe(event.target.checked);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await loginUser(formValues);
      const token = response.data?.token;

      if (typeof token === "string") {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", token);
      }

      setSuccessMessage("Logged in successfully.");
      setFormValues({
        email: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, "Unable to log in. Please check your details."),
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
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}

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

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    Remember me
                  </Typography>
                }
              />
              <Link href="#" underline="hover" sx={{ fontWeight: 700 }}>
                Forgot password?
              </Link>
            </Box>

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
            <Link href="signup" underline="hover" sx={{ fontWeight: 700 }}>
              Create account
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
