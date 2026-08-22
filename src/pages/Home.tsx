import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { ContactsList } from "../components/ContactsList";
import { ChatWindow } from "../components/ChatWindow";

export function Home() {
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
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
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
                Aditya Mudunuri
              </Box>
            </div>
            <IconButton
              sx={{
                color: "#AAAEB2",
                "&:hover": { color: "#E0A4A8", bgcolor: "#35414C" },
              }}
            >
              <LogoutIcon fontSize="small" color="primary" />
            </IconButton>
          </div>
          <Autocomplete
            id="search-user"
            freeSolo
            resetHighlightOnMouseLeave
            options={[1, 2, 3, 4, 5]}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Search username"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#35414C",
                    borderRadius: "20px",
                    color: "#E8E2D8",
                    "& fieldset": { borderColor: "#46535F" },
                    "& input::placeholder": { color: "#AEB4B8", opacity: 1 },
                  },
                }}
              />
            )}
          />
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
