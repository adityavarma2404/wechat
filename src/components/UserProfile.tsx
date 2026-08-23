import { Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

type UserProfileProps = {
  userName?: string;
};

export function UserProfile({ userName }: UserProfileProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://2pick.app/storage/default-avatar.webp"
          width={50}
          height={50}
          style={{ borderRadius: "50%", marginRight: "10px" }}
        />
        <Box
          component="span"
          sx={{
            color: "#E8E2D8",
            fontFamily: '"Trebuchet MS", sans-serif',
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          {userName}
        </Box>
      </Box>
      <IconButton
        sx={{
          color: "#AAAEB2",
          "&:hover": { color: "#E0A4A8", bgcolor: "#35414C" },
        }}
      >
        <LogoutIcon fontSize="small" color="primary" />
      </IconButton>
    </Box>
  );
}
