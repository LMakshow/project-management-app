import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError, FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/query';
import { BoardResponse, ColumnRequest } from './interfaces';

export type MutationDefinitionDeleteElement = MutationDefinition<string | ColumnRequest, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "BoardList" | "ColumnList", BoardResponse, "boardsApi">;