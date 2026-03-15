/**
 * Repository MSW Handlers - 모든 repository 핸들러를 통합하여 export
 *
 * 각 핸들러는 server/repositories의 각 repo 파일이 호출하는
 * /api/v1/* 엔드포인트를 MSW로 인터셉트하여 mock 데이터를 반환합니다.
 */
import { memoRepoHandlers } from './memoRepoHandler';
import { actualPortfolioRepoHandlers } from './actualPortfolioRepoHandler';
import { targetPortfolioRepoHandlers } from './targetPortfolioRepoHandler';
import { assetRepoHandlers } from './assetRepoHandler';
import { assetTypeRepoHandlers } from './assetTypeRepoHandler';
import { currencyRepoHandlers } from './currencyRepoHandler';
import { credentialRepoHandlers } from './credentialRepoHandler';
import { tagRepoHandlers } from './tagRepoHandler';

export const repositoryHandlers = [
  ...memoRepoHandlers,
  ...actualPortfolioRepoHandlers,
  ...targetPortfolioRepoHandlers,
  ...assetRepoHandlers,
  ...assetTypeRepoHandlers,
  ...currencyRepoHandlers,
  ...credentialRepoHandlers,
  ...tagRepoHandlers,
];

// 개별 핸들러도 re-export (필요시 선택적으로 사용 가능)
export {
  memoRepoHandlers,
  actualPortfolioRepoHandlers,
  targetPortfolioRepoHandlers,
  assetRepoHandlers,
  assetTypeRepoHandlers,
  currencyRepoHandlers,
  credentialRepoHandlers,
  tagRepoHandlers,
};
