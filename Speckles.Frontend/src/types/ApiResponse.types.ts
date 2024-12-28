export type ApiResponse<T> = ApiSuccessResponse<T>;

type ApiSuccessResponse<T> = {
  requestId: string;
  timestamp: number;
  data: T;
  totalCount?: number;
};

// type ApiErrorResponse = {
//   status: number;
//   title: string;
//   detail: string;
// };
