import {
  Autocomplete,
  Avatar,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import type { User } from "../services/auth";
import { searchUsers } from "../services/users";

export function UserSearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const requestControllerRef = useRef<AbortController | null>(null);
  const debouncedQuery = useDebounce(searchQuery, 350);

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
      id="search-user"
      resetHighlightOnMouseLeave
      options={users}
      inputValue={inputValue}
      loading={isLoading}
      filterOptions={(options) => options}
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
            sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
          >
            <Avatar
              src={option.profileImage || undefined}
              alt={option.fullName}
              sx={{ width: 36, height: 36, color: "#29333D" }}
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
  );
}
