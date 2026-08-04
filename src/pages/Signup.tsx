import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export function Signup() {
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

          <Stack component="form" spacing={2.25}>
            <TextField
              fullWidth
              label="Full name"
              name="fullName"
              autoComplete="name"
            />
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
              autoComplete="new-password"
            />

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ py: 1.25, textTransform: "none", fontWeight: 700 }}
            >
              Sign up
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
