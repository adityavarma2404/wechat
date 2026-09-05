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
import "./pages.scss";

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
    <Box className="auth-page auth-page--login">
      <Paper elevation={0} className="auth-page__card">
        <Stack className="auth-page__content">
          <Box>
            <Typography variant="h4" className="auth-page__title">
              Welcome back
            </Typography>
            <Typography className="auth-page__subtitle">
              Log in to continue your conversations.
            </Typography>
          </Box>

          <Stack component="form" className="auth-page__form" onSubmit={handleSubmit}>
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
              className="auth-page__submit"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </Stack>

          <Typography className="auth-page__footer">
            New to WeChat?{" "}
            <Link
              component={RouterLink}
              to="/signup"
              underline="hover"
              className="auth-page__link"
            >
              Create account
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
