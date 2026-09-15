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
import { Link as RouterLink } from "react-router-dom";
import { getApiErrorMessage, signupUser } from "../services/auth";
import "./pages.scss";

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
    <Box className="auth-page auth-page--signup">
      <Paper elevation={0} className="auth-page__card">
        <Stack className="auth-page__content">
          <Box>
            <Typography variant="h4" className="auth-page__title">
              Create account
            </Typography>
            <Typography className="auth-page__subtitle">
              Join WeChat and start chatting with your friends.
            </Typography>
          </Box>

          <Stack component="form" className="auth-page__form" onSubmit={handleSubmit}>
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
              className="auth-page__submit"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </Stack>

          <Typography className="auth-page__footer">
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              className="auth-page__link"
            >
              Log in
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
