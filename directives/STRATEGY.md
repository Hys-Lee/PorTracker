# STRATEGY — 기술·구조

프로젝트 전체에 한 번 적는다. 설계·작업 목록 단계에서 읽힌다.
**계획서에 이 내용을 옮겨 적지 않는다.** 계획서에는 여기서 달라지는 것만 적는다 — 기능마다 같은 기술 맥락을 다시 쓰면 문서가 불고 어긋난다.

- 들어갈 것: 언어·프레임워크·저장소, 계층과 패키지 경계(무엇이 무엇을 불러도 되나), API 꼴, 외부 연동.
- 안 들어갈 것: 스타일은 `CONVENTION.md`, 도메인 규칙은 그 도메인 폴더의 `RULE.md`.

## 기술

nx 모노레포(pnpm), 앱은 `apps/core`(Next.js 16 App Router, React 19). 스타일은 StyleX(+ radix 상태 선택자용 `.module.css`), 헤드리스 UI 는 radix-ui, 상태는 jotai, 검증은 zod, BE 호출은 openapi-fetch(+ BE 스키마에서 생성한 `server/types/generated/be-api-schema.d.ts`), 목업은 msw, 컴포넌트 문서는 storybook. 차트는 echarts(`echarts-for-react`). antd 는 공용 컴포넌트 셋(DatePicker·TagInput·TextArea) 안에만 감싸져 있다 — 화면·도메인 컴포넌트에서 antd 를 바로 부르지 않고 그 공용 컴포넌트를 쓴다.

## 구조와 경계

데이터는 아래 층을 위에서 아래로만 부른다. 층을 건너뛰지 않는다.

| 층 | 자리 | 하는 일 |
|---|---|---|
| 화면 | `app/(main)/<화면>/` | RSC 페이지. `searchParams` 를 읽고 `services/server` 를 `Promise.all` 로 부른 뒤 결과를 컴포넌트 props 꼴로 바꿔 넘긴다. 모달 열림 같은 화면 상태는 URL 검색 인자에 둔다 |
| 서비스 | `services/server/queries`·`actions`, `services/serverFunctions`(`'use server'`) | aggregate 결과를 `schemaParser(…, zod 스키마)` 로 검증해 `Response<T>` 로 돌려준다. 폼 제출은 serverFunctions 가 zod `safeParse` 후 actions 로 넘긴다 |
| 모으기 | `server/aggregates/<도메인>/` | 여러 repository 를 묶어 화면 꼴(feature 스키마)로 바꾼다. BE 의 `…Bp`(1/10000 단위) 값을 여기서 실수로 바꾼다. `try/catch` → `aggregateErrorHandler` |
| 저장소 | `server/repositories/` | BE 엔드포인트 하나에 함수 하나. `internalServerFetch.GET/POST…` 후 `handleInternalError(error)` 하고 `data` 를 돌려준다 |
| 목업 | `mocks/repositories/handlers`·`services` | repository 가 부르는 BE 경로를 msw 로 그대로 흉내 낸다. 새 repository 를 더하면 핸들러도 더한다 |

- 스키마: `schemas/domains`(원천 꼴) → `schemas/features/<기능>`(화면 꼴, `pick`·`extend` 로 domains 에서 짓는다).
- 컴포넌트: `components/shared/{ATOMS,MOLECULES}` 는 도메인을 모른다. 도메인 컴포넌트는 `components/<도메인>/ORGANISMS/<이름>/`. 서버에서 데이터를 받는 바깥(`Xxx`, async RSC)과 그리는 안(`XxxView`, `'use client'`)을 나누고, View 안에서만 쓰는 조각은 `XxxView/_ingredients/` 에 둔다. 한 화면에서만 쓰는 것은 `app/(main)/<화면>/_components/`.
- 경로 별칭 `@core/*` 를 쓴다.

## 외부 연동

- BE(`PorTrackerBE`): `INTERNAL_API_URL` 의 `/api/v1/*`. BE 가 바뀌면 `pnpm gen:api-local` 로 스키마 타입을 다시 만든다(BE 가 8080 에 떠 있어야 한다).
- Supabase: 인증 세션. 서버 fetcher 가 세션 토큰·쿠키를 붙인다.
- Sentry: 관측.
