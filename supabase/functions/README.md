# Supabase Edge Functions 안내서

이 저장소에는 PorTracker 앱을 위한 Supabase Edge Functions가 포함되어 있습니다.

## 디렉토리 구조

```
supabase/functions/
├── portfolio/       # 포트폴리오 데이터 관련 API
├── memo/           # 메모 데이터 관련 API
├── combined/       # 포트폴리오 및 메모 통합 관련 API
└── shared.ts       # 공통 타입 및 유틸리티 함수
```

## API 엔드포인트

### 포트폴리오 API (portfolio)

포트폴리오 데이터에 대한 CRUD 기능을 제공합니다.

#### GET /portfolio

포트폴리오 데이터를 조회합니다.

**쿼리 파라미터**:

- `startDate`: 시작 날짜 (YYYY-MM-DD)
- `endDate`: 종료 날짜 (YYYY-MM-DD)
- `asset`: 자산 필터
- `transactionType`: 거래 유형 필터

**예제 요청**:

```bash
curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/portfolio?startDate=2023-01-01&endDate=2023-12-31&asset=AAPL' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]'
```

#### POST /portfolio

새 포트폴리오 데이터를 생성합니다.

**예제 요청**:

```bash
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/portfolio' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]' \
  --header 'Content-Type: application/json' \
  --data '{
    "date": "2023-05-01",
    "asset": "AAPL",
    "price": 150.25,
    "shares": 10,
    "currency": "USD",
    "exchange_rate": 1300.50,
    "transaction_type": "BUY"
  }'
```

#### PUT /portfolio/:id

기존 포트폴리오 데이터를 업데이트합니다.

**예제 요청**:

```bash
curl -i --location --request PUT 'http://127.0.0.1:54321/functions/v1/portfolio/123' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]' \
  --header 'Content-Type: application/json' \
  --data '{
    "price": 155.50,
    "shares": 15
  }'
```

#### DELETE /portfolio/:id

포트폴리오 데이터를 삭제합니다.

**예제 요청**:

```bash
curl -i --location --request DELETE 'http://127.0.0.1:54321/functions/v1/portfolio/123' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]'
```

### 메모 API (memo)

메모 데이터에 대한 CRUD 기능을 제공합니다.

#### GET /memo

메모 데이터를 조회합니다.

**쿼리 파라미터**:

- `startDate`: 시작 날짜 (YYYY-MM-DD)
- `endDate`: 종료 날짜 (YYYY-MM-DD)
- `asset`: 자산 필터
- `transactionType`: 거래 유형 필터
- `searchTerm`: 제목 및 내용 검색어

**예제 요청**:

```bash
curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/memo?startDate=2023-01-01&searchTerm=투자' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]'
```

#### POST /memo

새 메모 데이터를 생성합니다.

**예제 요청**:

```bash
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/memo' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]' \
  --header 'Content-Type: application/json' \
  --data '{
    "date": "2023-05-01",
    "asset": "AAPL",
    "title": "애플 주식 매수",
    "content": "경제 지표 개선으로 인해 애플 주식 매수함",
    "transaction_type": "BUY",
    "tags": ["기술주", "장기투자"]
  }'
```

#### PUT /memo/:id

기존 메모 데이터를 업데이트합니다.

**예제 요청**:

```bash
curl -i --location --request PUT 'http://127.0.0.1:54321/functions/v1/memo/123' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "애플 주식 매수 결정",
    "content": "경제 지표 개선 및 신제품 출시 전망으로 애플 주식 매수함"
  }'
```

#### DELETE /memo/:id

메모 데이터를 삭제합니다.

**예제 요청**:

```bash
curl -i --location --request DELETE 'http://127.0.0.1:54321/functions/v1/memo/123' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]'
```

### 통합 API (combined)

포트폴리오와 메모 데이터를 동시에 조회하거나 업데이트하는 기능을 제공합니다.

#### GET /combined

포트폴리오와 메모 데이터를 동시에 조회합니다.

**쿼리 파라미터**:

- `date`: 날짜 필터 (YYYY-MM-DD)
- `asset`: 자산 필터
- `transactionType`: 거래 유형 필터

**예제 요청**:

```bash
curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/combined?date=2023-05-01&asset=AAPL' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]'
```

#### PUT /combined

포트폴리오와 메모 데이터를 동시에 업데이트합니다.

**예제 요청**:

```bash
curl -i --location --request PUT 'http://127.0.0.1:54321/functions/v1/combined' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]' \
  --header 'Content-Type: application/json' \
  --data '{
    "portfolioId": 123,
    "portfolioData": {
      "price": 160.75,
      "shares": 12,
      "transaction_type": "SELL"
    },
    "memoId": 456,
    "memoData": {
      "title": "애플 주식 일부 매도",
      "content": "목표가 도달로 인한 일부 수익 실현",
      "transaction_type": "SELL"
    }
  }'
```

## 로컬 개발 환경에서 실행하기

1. Supabase CLI 설치 (아직 설치하지 않았다면):

   ```bash
   npm install -g supabase
   ```

2. 로컬 Supabase 인스턴스 시작:

   ```bash
   supabase start
   ```

3. 함수 개발 후 배포:
   ```bash
   supabase functions deploy [function-name]
   ```

## 배포된 함수 테스트하기

```bash
curl -i --location --request GET 'https://[YOUR_PROJECT_ID].supabase.co/functions/v1/portfolio' \
  --header 'Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]'
```

## 데이터 형식

각 API 엔드포인트는 JSON 형식으로 데이터를 반환합니다. 자세한 데이터 구조는 `shared.ts` 파일의 타입 정의를 참조하세요.

예제 응답:

```json
{
  "data": [
    {
      "id": 1,
      "date": "2023-05-01",
      "asset": "AAPL",
      "price": 150.25,
      "shares": 10,
      "total_amount": 1502.5,
      "currency": "USD",
      "exchange_rate": 1300.5,
      "transaction_type": "BUY",
      "created_at": "2023-05-01T12:34:56Z"
    }
  ]
}
```

## 오류 처리

모든 API 엔드포인트는 오류 발생 시 적절한 HTTP 상태 코드와 함께 다음과 같은 형식의 응답을 반환합니다:

```json
{
  "error": "오류 메시지"
}
```
