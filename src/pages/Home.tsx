import { Box } from "@mui/material";

import { ContactsList } from "../components/ContactsList";
import { ChatWindow } from "../components/ChatWindow";
import { UserProfile } from "../components/UserProfile";
import { useAuth } from "../context/useAuth";
import { UserSearchInput } from "../components/UserSearchInput";

export function Home() {
  const { user } = useAuth();
  console.log("User", user);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(145deg, #B9B7B5 0%, #CFCCC7 100%)",
        px: 2,
        py: 4,
        backgroundImage: 'url("/ChatWindowWallpaper.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          minHeight: "82vh",
          width: { xs: "100%", lg: "86%" },
          maxWidth: "1280px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(30, 34, 40, 0.18)",
          border: "1px solid rgba(226, 232, 240, 0.9)",
        }}
      >
        {" "}
        <Box
          sx={{
            width: "300px",
            bgcolor: "#29333D",
            padding: "30px 20px",
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          <UserProfile userName={user?.fullName} />
          <UserSearchInput />
          <hr
            style={{
              margin: "20px 0 0",
              border: 0,
              borderTop: "1px solid #404C57",
            }}
          />
          <ContactsList />
        </Box>
        <ChatWindow />
      </Box>
    </Box>
  );
}
