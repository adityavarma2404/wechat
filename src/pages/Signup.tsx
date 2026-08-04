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
import { getApiErrorMessage, signupUser } from "../services/auth";

export function Signup() {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });
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

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      await signupUser(formValues);
      setSuccessMessage("Account created successfully. You can log in now.");
      setFormValues({
        fullName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          "Unable to create account. Please try again.",
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
              Create account
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Join WeChat and start chatting with your friends.
            </Typography>
          </Box>

          <Stack component="form" spacing={2.25} onSubmit={handleSubmit}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}

            <TextField
              fullWidth
              label="Full name"
              name="fullName"
              autoComplete="name"
              value={formValues.fullName}
              onChange={handleInputChange}
              required
            />
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
              autoComplete="new-password"
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
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </Stack>

          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="login" underline="hover" sx={{ fontWeight: 700 }}>
              Log in
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
