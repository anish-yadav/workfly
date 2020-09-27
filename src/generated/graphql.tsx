import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  stats: Stats;
  tasks: PaginatedTask;
  task: Task;
};


export type QueryTasksArgs = {
  criteria?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
};


export type QueryTaskArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  status: Scalars['String'];
  bcCity: Scalars['String'];
  contact: Scalars['String'];
  zohoID: Scalars['String'];
  tasks?: Maybe<Array<Task>>;
  myTasks?: Maybe<Array<Task>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  status: Scalars['String'];
  department?: Maybe<Scalars['String']>;
  creatorId: Scalars['Float'];
  creator?: Maybe<User>;
  createdAt: Scalars['String'];
  handlerId?: Maybe<Scalars['Int']>;
  handler?: Maybe<User>;
  updatedAt: Scalars['String'];
};

export type Stats = {
  __typename?: 'Stats';
  open: Scalars['Int'];
  working: Scalars['Int'];
  completed: Scalars['Int'];
};

export type PaginatedTask = {
  __typename?: 'PaginatedTask';
  tasks: Array<Task>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login: LoginResponse;
  setPushToken: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createTask: Task;
  editTask: Task;
  doTask: Task;
  updateMany: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationSetPushTokenArgs = {
  token: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  input: TaskInput;
};


export type MutationEditTaskArgs = {
  description: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDoTaskArgs = {
  taskId: Scalars['Float'];
};


export type MutationUpdateManyArgs = {
  description: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type TaskInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  department: Scalars['String'];
};

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  department: Scalars['String'];
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'title' | 'description' | 'status' | 'createdAt' | 'creatorId'>
  ) }
);

export type DoTaskMutationVariables = Exact<{
  taskId: Scalars['Float'];
}>;


export type DoTaskMutation = (
  { __typename?: 'Mutation' }
  & { doTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'title' | 'description' | 'handlerId'>
    & { creator?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )>, handler?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'zohoID' | 'status' | 'contact' | 'bcCity'>
    )> }
  ) }
);

export type SetPushTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type SetPushTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setPushToken'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'id' | 'contact'>
  )> }
);

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = (
  { __typename?: 'Query' }
  & { stats: (
    { __typename?: 'Stats' }
    & Pick<Stats, 'open' | 'completed' | 'working'>
  ) }
);

export type GetTaskQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetTaskQuery = (
  { __typename?: 'Query' }
  & { task: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'title' | 'description' | 'createdAt'>
    & { creator?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )>, handler?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  ) }
);

export type GetTasksQueryVariables = Exact<{
  limit: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
  criteria?: Maybe<Scalars['String']>;
}>;


export type GetTasksQuery = (
  { __typename?: 'Query' }
  & { tasks: (
    { __typename?: 'PaginatedTask' }
    & Pick<PaginatedTask, 'hasMore'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title' | 'description' | 'createdAt' | 'status'>
    )> }
  ) }
);


export const CreateTaskDocument = gql`
    mutation CreateTask($title: String!, $description: String!, $department: String!) {
  createTask(input: {title: $title, description: $description, department: $department}) {
    id
    title
    description
    status
    createdAt
    creatorId
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      department: // value for 'department'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DoTaskDocument = gql`
    mutation DoTask($taskId: Float!) {
  doTask(taskId: $taskId) {
    id
    title
    description
    creator {
      name
    }
    handlerId
    handler {
      name
    }
  }
}
    `;
export type DoTaskMutationFn = Apollo.MutationFunction<DoTaskMutation, DoTaskMutationVariables>;

/**
 * __useDoTaskMutation__
 *
 * To run a mutation, you first call `useDoTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doTaskMutation, { data, loading, error }] = useDoTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDoTaskMutation(baseOptions?: Apollo.MutationHookOptions<DoTaskMutation, DoTaskMutationVariables>) {
        return Apollo.useMutation<DoTaskMutation, DoTaskMutationVariables>(DoTaskDocument, baseOptions);
      }
export type DoTaskMutationHookResult = ReturnType<typeof useDoTaskMutation>;
export type DoTaskMutationResult = Apollo.MutationResult<DoTaskMutation>;
export type DoTaskMutationOptions = Apollo.BaseMutationOptions<DoTaskMutation, DoTaskMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    error
    user {
      id
      name
      zohoID
      status
      contact
      bcCity
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SetPushTokenDocument = gql`
    mutation SetPushToken($token: String!) {
  setPushToken(token: $token)
}
    `;
export type SetPushTokenMutationFn = Apollo.MutationFunction<SetPushTokenMutation, SetPushTokenMutationVariables>;

/**
 * __useSetPushTokenMutation__
 *
 * To run a mutation, you first call `useSetPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPushTokenMutation, { data, loading, error }] = useSetPushTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSetPushTokenMutation(baseOptions?: Apollo.MutationHookOptions<SetPushTokenMutation, SetPushTokenMutationVariables>) {
        return Apollo.useMutation<SetPushTokenMutation, SetPushTokenMutationVariables>(SetPushTokenDocument, baseOptions);
      }
export type SetPushTokenMutationHookResult = ReturnType<typeof useSetPushTokenMutation>;
export type SetPushTokenMutationResult = Apollo.MutationResult<SetPushTokenMutation>;
export type SetPushTokenMutationOptions = Apollo.BaseMutationOptions<SetPushTokenMutation, SetPushTokenMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    name
    id
    contact
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const StatsDocument = gql`
    query Stats {
  stats {
    open
    completed
    working
  }
}
    `;

/**
 * __useStatsQuery__
 *
 * To run a query within a React component, call `useStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatsQuery(baseOptions?: Apollo.QueryHookOptions<StatsQuery, StatsQueryVariables>) {
        return Apollo.useQuery<StatsQuery, StatsQueryVariables>(StatsDocument, baseOptions);
      }
export function useStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          return Apollo.useLazyQuery<StatsQuery, StatsQueryVariables>(StatsDocument, baseOptions);
        }
export type StatsQueryHookResult = ReturnType<typeof useStatsQuery>;
export type StatsLazyQueryHookResult = ReturnType<typeof useStatsLazyQuery>;
export type StatsQueryResult = Apollo.QueryResult<StatsQuery, StatsQueryVariables>;
export const GetTaskDocument = gql`
    query getTask($id: Float!) {
  task(id: $id) {
    id
    title
    description
    creator {
      id
      name
    }
    handler {
      id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions?: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, baseOptions);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, baseOptions);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export const GetTasksDocument = gql`
    query getTasks($limit: Float!, $cursor: String, $criteria: String) {
  tasks(limit: $limit, cursor: $cursor, criteria: $criteria) {
    tasks {
      id
      title
      description
      createdAt
      status
    }
    hasMore
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      criteria: // value for 'criteria'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, baseOptions);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, baseOptions);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;