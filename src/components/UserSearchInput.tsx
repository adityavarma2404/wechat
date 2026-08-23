import {
  Autocomplete,
  Avatar,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import type { User } from "../services/auth";
import { searchUsers } from "../services/users";

export function UserSearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedInput = useDebounce(inputValue, 350);

  useEffect(() => {
    const email = debouncedInput.trim();

    if (!email) return;

    const controller = new AbortController();

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
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadUsers();

    return () => controller.abort();
  }, [debouncedInput]);

  return (
    <Autocomplete<User, false, false, true>
      id="search-user"
      freeSolo
      resetHighlightOnMouseLeave
      options={users}
      inputValue={inputValue}
      loading={isLoading}
      filterOptions={(options) => options}
      onInputChange={(_, value) => {
        setInputValue(value);
        setUsers([]);
        setIsLoading(Boolean(value.trim()));
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.email
      }
      isOptionEqualToValue={(option, value) =>
        typeof option !== "string" &&
        typeof value !== "string" &&
        option._id === value._id
      }
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
