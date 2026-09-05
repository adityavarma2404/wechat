import { Box } from "@mui/material";

import { ContactsList } from "../components/ContactsList";
import { ChatWindow } from "../components/ChatWindow";
import { UserProfile } from "../components/UserProfile";
import { useAuth } from "../context/useAuth";
import { UserSearchInput } from "../components/UserSearchInput";
import "./pages.scss";

export function Home() {
  const { user } = useAuth();
  return (
    <Box className="home-page">
      <Box className="home-page__layout">
        <Box className="home-page__sidebar">
          <UserProfile userName={user?.fullName} />
          <UserSearchInput />
          <hr className="home-page__divider" />
          <ContactsList />
        </Box>
        <ChatWindow />
      </Box>
    </Box>
  );
}
