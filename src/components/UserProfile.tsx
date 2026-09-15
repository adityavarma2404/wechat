import { Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./components.scss";

type UserProfileProps = {
  userName?: string;
};

export function UserProfile({ userName }: UserProfileProps) {
  return (
    <Box className="user-profile">
      <Box className="user-profile__identity">
        <img
          className="user-profile__avatar"
          src="https://2pick.app/storage/default-avatar.webp"
          width={50}
          height={50}
          alt=""
        />
        <Box component="span" className="user-profile__name">
          {userName}
        </Box>
      </Box>
      <IconButton className="user-profile__logout" aria-label="Log out">
        <LogoutIcon fontSize="small" color="primary" />
      </IconButton>
    </Box>
  );
}
