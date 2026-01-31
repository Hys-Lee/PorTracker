## 개발 유의 사항

> 디렉토리 구조 및 import 경로 처리에 대해 - **Mocking**

- mocks 폴더 내에서 **서로를 참조**할 때는 **상대 경로**만 사용 및 **index.ts(배럴 파일) 참조 금지**

- **services** 폴더 내의 **client, server** 구조와 **mocks/services** 폴더 내 구조를 **동일하게** 맞춘다.

  - 디렉토리 구조만이 아니라, 함수에 대해서도 같도록 **mocks/services 정의 시 services에서의 interface를 사용한다**.

- **services**에서 새로운 queries 및 actions 파일 **생성 시, 배럴 파일에서 export**

- **mocks/services**에서 새로운 queries 및 actions 파일 생성 시, **배럴 파일에서 mockTotalServices에 추가 + named export에 관련 함수들 추가**

---

> #### Mocking 관리 상세 정보

- Storybook에서의 alias를 활용해 mocking 시스템이 동작
- rsc관련 parameter에 따라 msw 사용 여부 결정됨.

  - 이는 storybook rsc관련 플러그인이 msw와 함께 동작할 때 에러가 나는 이슈가 있기 때문.

  - 시스템 제작하여 위 이슈를 해결.
