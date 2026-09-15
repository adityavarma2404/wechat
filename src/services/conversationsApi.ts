import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { api } from "./api";
// import type { User } from "./auth";

export type Conversation = {
  conversationId: string;
};

type ConversationApiError = {
  status: number | "FETCH_ERROR";
  data: unknown;
};

export const conversationsApi = createApi({
  reducerPath: "conversationsApi",
  baseQuery: fakeBaseQuery<ConversationApiError>(),
  tagTypes: ["Conversation"],
  endpoints: (builder) => ({
    openConversation: builder.mutation<Conversation, string>({
      async queryFn(participantId) {
        try {
          const { data } = await api.post<Conversation>(
            "/api/conversations/direct",
            { participantId },
          );

          return { data };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return {
              error: {
                status: error.response?.status ?? "FETCH_ERROR",
                data: error.response?.data ?? error.message,
              },
            };
          }

          return {
            error: {
              status: "FETCH_ERROR",
              data: "Unable to open conversation",
            },
          };
        }
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Conversation", id: result.conversationId }] : [],
    }),
  }),
});

export const { useOpenConversationMutation } = conversationsApi;
