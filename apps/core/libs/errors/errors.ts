export class AppError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'AppError';
  }
}

// 백엔드 응답 에러
export class ApiError extends AppError {
  constructor(
    message: string,
    code: string,
    public status: number,
    public details?: any
  ) {
    super(message, 'HTTP_ERROR');
    this.name = 'ApiError';
  }
}

// 네트워크 에러 (연결 끊김, 타임아웃 등)
export class NetworkError extends AppError {
  constructor(message: string = '네트워크 연결이 원활하지 않습니다.') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

// 알 수 없는 에러
export class UnknownError extends AppError {
  constructor(message: string = '알 수 없는 에러가 발생했습니다.') {
    super(message, 'UNKNOWN_ERROR');
    this.name = 'UnknownError';
  }
}
