/**
 * Repository Mocks - 진입점
 *
 * repository 레이어를 MSW로 모킹하기 위한 모듈입니다.
 * server/repositories의 각 메서드가 호출하는 내부 API(/api/v1/*)를
 * MSW 핸들러로 인터셉트하여 mock 데이터를 반환합니다.
 *
 * 사용법:
 *   import { repositoryHandlers } from '@core/mocks/repositories';
 *   // setupServer(...repositoryHandlers) 또는
 *   // 기존 handlers에 spread하여 사용
 */
export { repositoryHandlers } from './handlers';
export { mockRepositoryDB } from './mockData';
export type * from './types';
