<!-- agentic-dev 가 관리한다 — 프로젝트 층의 입구. 이 구역 안은 손으로 고치지 말고, 바꾸려면 킷의 install/start.mjs 를 다시 친다 -->
이 프로젝트의 규칙 층은 `directives/` 에 있다. 늘 읽을 것은 없고, 하는 일에 따라 읽는다.
- 설계·작업 목록·구현: `directives/CONVENTION.md`
- 설계·작업 목록: `directives/STRATEGY.md`
- 보안·권한(전역 정책에 더한다): `directives/POLICY.md`
- 도메인 규칙: 도메인 폴더마다 `RULE.md` 파일이 있고, 그 폴더의 입구 파일이 그것을 가리킨다.
<!-- /agentic-dev -->

## 리드와 소통 (버스)

이 저장소는 리드 작업 폴더(이 저장소의 부모 폴더) 아래에서 담당 세션으로 돈다. 버스는 리드 폴더에 하나뿐이다.
킷의 `install/bus.mjs` 를 칠 때는 **늘 `--project <리드 폴더>`** 를 붙인다(이 저장소 맨 위에서는 `--project ..`). 안 붙이면 이 저장소의 `.agentic/` 를 프로젝트로 잡아 리드가 못 보는 다른 버스에 쓴다.
