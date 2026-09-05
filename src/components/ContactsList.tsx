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
import "./components.scss";

export function ContactsList() {
  return (
    <Box className="contacts-list">
      <List className="contacts-list__list">
        <ListItemButton
          // key={conversation.id}
          // selected={selectedId === conversation.id}
          // onClick={() => setSelectedId(conversation.id)}
          className="contacts-list__item"
        >
          <ListItemAvatar className="contacts-list__avatar-wrapper">
            <Badge
              overlap="circular"
              variant="dot"
              color="success"
              // invisible={!conversation.online}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar className="contacts-list__avatar">
                ASS
              </Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText
            className="contacts-list__details"
            primary={
              <Stack
                direction="row"
                spacing={1}
                className="contacts-list__heading"
              >
                <Typography variant="body2" noWrap className="contacts-list__name">
                  Adha
                </Typography>
                <Typography variant="caption" className="contacts-list__time">
                  2 PM
                </Typography>
              </Stack>
            }
            secondary="Hello thereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!"
            slotProps={{ secondary: { noWrap: true, className: "contacts-list__preview" } }}
          />

          <Box className="contacts-list__unread-count">
            2
          </Box>
        </ListItemButton>
      </List>
    </Box>
  );
}
