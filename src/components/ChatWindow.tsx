import { Box, IconButton, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export function ChatWindow() {
  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        backgroundColor: "#C8C1BA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "72px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          backgroundColor: "#D9D2CB",
        }}
      >
        <img
          src="https://2pick.app/storage/default-avatar.webp"
          width={50}
          height={50}
          style={{ borderRadius: "50%", marginRight: "10px" }}
        />
        <Box
          component="span"
          sx={{ fontWeight: 700, color: "text.primary", mr: 1 }}
        >
          Adha
        </Box>
        <Box
          component="span"
          aria-label="Online"
          sx={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#6F9981",
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "95%",
            width: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              alignSelf: "flex-end",
              borderRadius: "10px 10px 0px 10px",
              backgroundColor: "#756A91",
              color: "#F1EFE9",
              padding: "10px 20px",
              marginBottom: "10px",
              boxShadow: "0 5px 14px rgba(55, 48, 73, .16)",
            }}
          >
            Hi
          </Box>
          <Box
            sx={{
              alignSelf: "flex-start",
              borderRadius: "10px 10px 10px 0px",
              backgroundColor: "#DED6CE",
              color: "#292D33",
              padding: "10px 20px",
              marginBottom: "10px",
              boxShadow: "0 3px 12px rgba(48, 53, 64, .06)",
            }}
          >
            Hello there
          </Box>
          <Box
            sx={{
              alignSelf: "flex-end",
              borderRadius: "10px 10px 0px 10px",
              backgroundColor: "#756A91",
              color: "#F1EFE9",
              padding: "10px 20px",
              marginBottom: "10px",
              boxShadow: "0 5px 14px rgba(55, 48, 73, .16)",
            }}
          >
            How are you?
          </Box>
          <Box
            sx={{
              alignSelf: "flex-start",
              borderRadius: "10px 10px 10px 0px",
              backgroundColor: "#DED6CE",
              color: "#292D33",
              padding: "10px 20px",
              marginBottom: "10px",
              boxShadow: "0 3px 12px rgba(48, 53, 64, .06)",
            }}
          >
            I am good, what about you?
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "80px",
          width: "100%",
          flexShrink: 0,
          backgroundColor: "#D9D2CB",
          borderTop: "1px solid #B8AFA7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextareaAutosize
          minRows={1}
          maxRows={2}
          aria-label="maximum height"
          placeholder="write something..."
          style={{
            width: 500,
            border: "1px solid #B8AFA7",
            borderRadius: "20px",
            resize: "none",
            outline: "none",
            lineHeight: "20px",
            boxSizing: "border-box",
            padding: "10px 20px",
            backgroundColor: "#C8C0B8",
            color: "#292D33",
            fontFamily: "inherit",
            marginRight: 16,
          }}
        />
        <IconButton
          sx={{
            bgcolor: "primary.main",
            color: "#F1EFE9",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
