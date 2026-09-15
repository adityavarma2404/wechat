import { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import type { User } from "../services/auth";
import { useOpenConversationMutation } from "../services/conversationsApi";
import { searchUsers } from "../services/users";
import "./components.scss";
// import { setSelectedConversationId } from "../store/chatSlice";
// import { useAppDispatch } from "../store/hooks";

export function UserSearchInput() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const requestControllerRef = useRef<AbortController | null>(null);
  const debouncedQuery = useDebounce(searchQuery, 350);
  const [openConversation, { isLoading: isOpeningConversation }] =
    useOpenConversationMutation();

  async function handleUserSelected(user: User | null) {
    if (!user) return;

    try {
      const { conversationId } = await openConversation(user._id).unwrap();
      // dispatch(setSelectedConversationId(conversation._id));
      navigate(`chat/${conversationId}`);
      setInputValue("");
      setSearchQuery("");
      setUsers([]);
    } catch (error) {
      console.error("Unable to open conversation:", error);
    }
  }

  useEffect(() => {
    const email = debouncedQuery.trim();

    if (!email) return;

    const controller = new AbortController();
    requestControllerRef.current = controller;

    async function loadUsers() {
      try {
        const { data } = await searchUsers(email, controller.signal);
        setUsers(data.users);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Unable to search users:", error);
          setUsers([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          requestControllerRef.current = null;
          setIsLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      controller.abort();
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
      }
    };
  }, [debouncedQuery]);

  return (
    <Autocomplete<User, false, false, false>
      className="user-search"
      id="search-user"
      resetHighlightOnMouseLeave
      options={users}
      inputValue={inputValue}
      loading={isLoading || isOpeningConversation}
      filterOptions={(options) => options}
      onChange={(_, user) => {
        void handleUserSelected(user);
      }}
      onInputChange={(_, value, reason) => {
        requestControllerRef.current?.abort();
        requestControllerRef.current = null;
        setInputValue(value);
        setUsers([]);
        setSearchQuery(reason === "input" ? value : "");
        setIsLoading(reason === "input" && Boolean(value.trim()));
      }}
      getOptionLabel={(option) => option.email}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <Box
            component="li"
            key={key}
            {...optionProps}
            className={`user-search__option ${optionProps.className ?? ""}`}
          >
            <Avatar
              src={option.profileImage || undefined}
              alt={option.fullName}
              className="user-search__avatar"
            >
              {option.fullName?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2">{option.email}</Typography>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search username"
        />
      )}
    />
  );
}
