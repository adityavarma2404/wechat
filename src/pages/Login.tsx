import {
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

export function Login() {
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

          <Stack component="form" spacing={2.25}>
            <TextField
              fullWidth
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
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
                control={<Checkbox />}
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
              size="large"
              type="submit"
              variant="contained"
              sx={{ py: 1.25, textTransform: "none", fontWeight: 700 }}
            >
              Log in
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
