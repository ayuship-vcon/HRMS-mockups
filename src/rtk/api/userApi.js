import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL USERS
  getUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      // TRANSFORM RESPONSE
      transformResponse: (response) => {
        return response.users;
      },
      providesTags: ["User"],
    }),

    // GET USER BY ID
    getUserById: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),

      providesTags: (result, error, id) => [
        { type: "User", id },
      ],
    }),

    // CREATE USER
    createUser: builder.mutation({
      query: (body) => ({
        url: "users/add",
        method: "POST",
        body,
      }),

      invalidatesTags: ["User"],
    }),

    // UPDATE USER (FULL)
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.id },
      ],
    }),

    // UPDATE USER (PARTIAL)
    patchUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.id },
      ],
    }),

    // DELETE USER
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  usePatchUserMutation,
  useDeleteUserMutation,
} = userApi;