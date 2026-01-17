export type ApiErrorRes<TErrorDetail> = {
  type:
    | 'APP_ERROR'
    | 'HTTP_ERROR'
    | 'NETWORK_ERROR'
    | 'VALIDATION_ERROR'
    | 'UNKNOWN_ERROR';
  message: string;
  status?: number; // HTTP 상태 코드 (404, 500 등)
  code?: string; // 백엔드 고유 에러 코드
  // details?: any; // Zod 에러 상세 등
  details?: TErrorDetail; // Zod 에러 상세 등
};

type Response<T, TErrorDetail = any> =
  | { success: true; data: T; error: null }
  | {
      success: false;
      data: null;
      error: ApiErrorRes<TErrorDetail>;
    };

export type RestfulMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
