const { spawn } = require('child_process');
const path = require('path');

// 1. [핵심] 현재 이 스크립트를 실행하고 있는 Node의 "진짜 절대 경로"를 가져옵니다.
// (pnpm이 22.21.1로 실행했다면, 이것도 무조건 22.21.1 경로가 됩니다.)
const currentNodePath = process.execPath;

// 2. Storybook 실행 파일의 경로를 찾습니다. (상대 경로라 공유 가능)
const storybookBin = path.resolve(
  __dirname,
  'node_modules/storybook/dist/bin/dispatcher.js'
);

// 3. 설정 파일 위치와 포트
const configDir = 'apps/core/.storybook';
const args = [storybookBin, 'dev', '-p', '6006', '-c', configDir];

console.log(`🚀 Starting Storybook using Node: ${currentNodePath}`);

// 4. 자식 프로세스 실행 (시스템 'node' 명령어가 아니라, 위에서 찾은 절대 경로를 사용)
const child = spawn(currentNodePath, args, {
  stdio: 'inherit', // 로그를 터미널에 그대로 출력
  cwd: process.cwd(), // 루트 폴더 기준 실행
  env: process.env, // 환경 변수 물려받기
});

child.on('close', (code) => {
  process.exit(code);
});
