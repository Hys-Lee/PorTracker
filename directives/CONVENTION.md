# CONVENTION — 개발 스타일·질·방법

설계·작업 목록·구현 단계에서 읽힌다. 전역에서 같을 수도, 프로젝트마다 다를 수도 있다.

- 들어갈 것: 코드 스타일, 이름 짓기, 질 지표(파일·함수 크기, 한 번에 고치는 양의 상한 같은 것), 테스트를 언제 어떻게 쓰나(TDD 같은 방법).
- 안 들어갈 것: 기술 선택은 `STRATEGY.md`, 도메인 규칙은 그 도메인 폴더의 `RULE.md`.

기계로 잴 수 있는 것은 검증 단계의 검사로 옮기고 여기에는 까닭만 남긴다. 글로만 둔 것은 지켜졌는지 아무도 모른다.

## 스타일

사람이 손으로 짠 기존 코드에 맞춘다. 아래는 2026-11-13 에 `apps/core` 를 읽고 뽑은 것이다(포트폴리오 화면·ActualFormModal 묶음·SegmentControl·Button·Navbar·layout, repository·aggregate·query·serverFunction 각 1개 이상). 기존 코드와 이 글이 어긋나면 기존 코드가 맞다.

**🔴 더 나은 꼴이 있어도 혼자 바꾸지 않는다.** 새 추상화·새 라이브러리·새 폴더 꼴·기존 코드 손대기는 사람에게 먼저 묻고, 물을 때 기존 꼴과 제안 꼴의 코드 예시를 나란히 보인다. 사람의 기준이 깐깐하고, 복잡한 것보다 단순한 것을 고른다.

- 컴포넌트: `const Xxx = ({ … }: XxxProps) => { … }; export default Xxx;`. props 는 바로 위 `interface XxxProps`. 남의 props 꼴을 빌릴 때는 `ComponentProps<typeof Other>['prop']`.
- 스타일: 파일 맨 아래 `const xxxStyles = stylex.create({ base: {…}, … })`, 적용은 `{...stylex.props(xxxStyles.base, 조건 ? xxxStyles.active : undefined)}`. 밖에서 스타일을 받는 자리는 `xxxStylex?: stylex.StyleXStyles` props. 색은 `@core/tokens/colors.stylex` 의 `colors.*` 만 쓴다 — 색 값을 박지 않는다. radix `data-state` 같은 선택자만 `.module.css`.
- 공용 컴포넌트는 기본 HTML 속성을 펼쳐 받는다(`interface ButtonProps extends ButtonHTMLAttributes<…>`).
- 이름: 컴포넌트 파일·폴더는 PascalCase 같은 이름(`Button/Button.tsx`), 스토리는 옆에 `Button.stories.tsx`. 상수 묶음은 `XXX_VALUES`·`XXX_MAP`(`@core/constants`). jotai atom 은 `xxxAtom`.
- 따옴표는 홑따옴표(prettier `singleQuote`). 주석·에러 메시지는 한국어.
- 응답은 늘 `Response<T>` 꼴(`{ success, data, error }`)로 다루고, 화면에서는 `res.data?.map(…) ?? []` 처럼 빈 값으로 떨어뜨린다.

## 질

- 화면 하나를 새로 지을 때 STRATEGY 의 층을 모두 거친다: repository → mock 핸들러 → aggregate → feature 스키마 → query → page → ORGANISM(바깥/View). 층 하나를 건너뛰면 리뷰에서 걸린다.
- 새 ATOM·MOLECULE·ORGANISM 에는 스토리를 붙인다(현재 컴포넌트 33개 중 스토리 30개).
- 디버그용 `console.log`·주석 처리한 옛 코드를 새 코드에 남기지 않는다. 기존 코드에 있는 것은 건드리지 않는다.

## 방법

- 검증은 `pnpm nx test core` · `pnpm lint` · `pnpm exec nx build core`.
- 화면 확인은 msw 목업으로 한다(BE 없이도 화면이 떠야 한다). 더미 데이터는 `mocks/repositories/mockData.ts` 에 둔다.

## 주석

함수·클래스·상수·변수는 선언 바로 위에(빈 줄 없이), 파일은 맨 앞(import 보다 앞)에 이 꼴로 적는다. 킷의 지도 화면이 이것을 읽어 상자와 옆 칸에 띄운다.

```js
/**
 * @책임 이것을 한 문장으로.
 *
 * 자유 글 — 왜 이렇게 했나, 배경, 🔴 조심할 것. 여러 문단이어도 된다.
 *
 * @param 이름 무엇을 받나
 * @returns 무엇을 돌려주나
 */
```

- `@책임` 은 빈 줄이나 다음 태그에서 끝난다. 그 뒤 태그 없는 글이 자유 글이다. 다른 태그는 이름을 정해 두지 않았다 — 필요한 것을 쓴다.
- `// @책임 …` 처럼 줄 주석으로 적어도 같다.
- `@책임` 이 없으면 주석의 첫 문장을 책임으로 띄운다. 주석이 아예 없으면 화면이 「설명 없음」이라고 말할 뿐 막지는 않는다.
