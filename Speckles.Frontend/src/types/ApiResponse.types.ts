export type ApiResponse<T> = ApiSuccessResponse<T>;

interface ApiSuccessResponse<T> {
  requestId: string;
  timestamp: number;
  data: T;
  totalCount?: number;
}

export interface ApiCount {
  count: number;
}

export interface ApiOffsetLimit {
  offset?: number;
  limit?: number;
}

// type ApiErrorResponse = {
//   status: number;
//   title: string;
//   detail: string;
// };
