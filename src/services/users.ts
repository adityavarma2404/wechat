import { api } from "./api";
import type { User } from "./auth";

type UserSearchResponse = {
  users: User[];
};

export function searchUsers(email: string, signal?: AbortSignal) {
  return api.get<UserSearchResponse>("/api/users/search", {
    params: { email },
    signal,
  });
}
