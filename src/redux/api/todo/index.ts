import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTodo: build.query<IUploadTodo.GetTodoResponse, IUploadTodo.GetTodoRequest>({
      query: () => ({
        url: '/f9fc31c9c4e1c72fb20fc8ed15096895/egzamen',
        method: 'GET',
      }),
      providesTags: ['todo'],
    }),
    postTodo: build.mutation({
      query: (newData) => ({
        url: `/f9fc31c9c4e1c72fb20fc8ed15096895/egzamen`,
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: ['todo'],
    }),
    uplaodTodo: build.mutation({
      query: (newData) => ({
        url: `/upload/file`,
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: ['todo'],
    }),
    deleteTodo: build.mutation({
      query: (_id) => ({
        url: `/f9fc31c9c4e1c72fb20fc8ed15096895/egzamen/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todo'],
    }),
    editTodo: build.mutation({
      query: ({ newData, _id }) => ({
        url: `/f9fc31c9c4e1c72fb20fc8ed15096895/egzamen/${_id}`,
        method: 'PATCH',
        body: newData,
      }),
      invalidatesTags: ['todo'],
    }),
  }),
  overrideExisting: true,
});
export const {
  useGetTodoQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useUplaodTodoMutation,
  useEditTodoMutation,
} = api;
