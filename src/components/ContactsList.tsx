import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  Badge,
  Avatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export function ContactsList() {
  return (
    <Box>
      <List
        sx={{
          width: "100%",
        }}
      >
        <ListItemButton
          // key={conversation.id}
          // selected={selectedId === conversation.id}
          // onClick={() => setSelectedId(conversation.id)}
          sx={{
            px: 1.25,
            py: 1.25,
            my: 1,
            borderRadius: 2.5,
            transition: "background-color 160ms ease, transform 160ms ease",
            color: "#DED9D1",
            "&:hover": { bgcolor: "#35414C", transform: "translateX(2px)" },
            "&.Mui-selected": { bgcolor: "#414D59", color: "#F0EBE3" },
            bgcolor: "transparent",
          }}
        >
          <ListItemAvatar sx={{ minWidth: { xs: 0, sm: 56 } }}>
            <Badge
              overlap="circular"
              variant="dot"
              color="success"
              // invisible={!conversation.online}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar
                sx={{
                  bgcolor: "#8A789D",
                  color: "primary.contrastText",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                ASS
              </Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText
            sx={{ display: { xs: "none", sm: "block" }, minWidth: 0 }}
            primary={
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "space-between" }}
              >
                  <Typography variant="body2" noWrap sx={{ fontFamily: '"Trebuchet MS", sans-serif', fontWeight: 700, color: "inherit" }}>
                  Adha
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#9FA6AB" }}
                >
                  2 PM
                </Typography>
              </Stack>
            }
            secondary="Hello thereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!"
            slotProps={{ secondary: { noWrap: true, sx: { color: "#AEB4B8" } } }}
          />

          <Box
            sx={{
              display: { xs: "none", sm: "grid" },
              placeItems: "center",
              minWidth: 20,
              height: 20,
              ml: 1,
              borderRadius: 99,
              bgcolor: "#A9785E",
              color: "#F1EFE9",
              fontSize: 12,
              fontWeight: 400,
              alignSelf: "top",
            }}
          >
            2
          </Box>
        </ListItemButton>
      </List>
    </Box>
  );
}
