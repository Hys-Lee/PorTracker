// module.exports = function (plop) {
//   plop.setGenerator('story', {
//     description: 'PorTracker 앱 전용 스토리 생성',
//     prompts: [
//       {
//         type: 'input',
//         name: 'name',
//         message: '컴포넌트 이름은 무엇인가요? (예: Header)',
//       },
//       // 앱 내부이므로 '라이브러리 이름'을 물어볼 필요가 없습니다.
//       // 필요하다면 '폴더 경로' 등을 물어볼 수는 있습니다.
//     ],
//     actions: [
//       {
//         type: 'add',
//         // plopfile.js가 있는 위치(apps/my-shop) 기준 상대 경로입니다.
//         path: 'components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
//         templateFile: './storybook/_templates/story.hbs',
//         skipIfExists: true,
//       },
//     ],
//   });
// };

/**
 * ------------------------------------------
 */

// const path = require('path');
// const fs = require('fs');
// const glob = require('glob');

// module.exports = function (plop) {
//   // 헬퍼: 스토리가 없는 컴포넌트 찾기
//   const getMissingStories = () => {
//     const appRoot = process.cwd(); // 현재 plop이 실행되는 위치 (apps/my-shop)

//     // 1. 모든 tsx 파일 검색 (node_modules, test, spec, stories 제외)
//     const files = glob.sync('./apps/core/components/**/*.tsx', {
//       ignore: [
//         '**/*.stories.tsx',
//         '**/*.spec.tsx',
//         '**/*.test.tsx',
//         '**/node_modules/**',
//       ],
//       cwd: appRoot,
//     });

//     //test
//     console.log('appRoot, files: ', appRoot, files);

//     // 2. 필터링: "스토리 파일이 진짜 없는 놈만 남겨라"
//     const missing = files.filter((filePath) => {
//       const dir = path.dirname(filePath);
//       const ext = path.extname(filePath);
//       const baseName = path.basename(filePath, ext);

//       // 예상되는 스토리 파일의 절대 경로 생성
//       // 예: /Users/.../apps/core/components/Button/Button.stories.tsx
//       const storyPath = path.resolve(appRoot, dir, `${baseName}.stories.tsx`);

//       //test
//       console.log('storypath: ', storyPath);

//       // 파일이 존재하면(true) -> !true = false (목록에서 제외)
//       // 파일이 없으면(false) -> !false = true (목록에 포함)
//       return !fs.existsSync(storyPath);
//     });

//     return missing;
//   };

//   plop.setGenerator('story', {
//     description: '컴포넌트 위치에 스토리 파일 자동 생성',
//     prompts: [
//       // 질문 1: 방식 선택
//       {
//         type: 'list',
//         name: 'mode',
//         message: '어떤 방식으로 생성하시겠습니까?',
//         choices: [
//           { name: '🔍 스토리가 없는 컴포넌트 자동 검색', value: 'auto' },
//           { name: '✍️ 직접 경로 입력', value: 'manual' },
//         ],
//       },
//       // 질문 2 (Auto): 검색된 목록에서 선택
//       {
//         type: 'list',
//         name: 'selectedPath',
//         message: '스토리를 생성할 컴포넌트를 선택하세요:',
//         when: (answers) => answers.mode === 'auto',
//         choices: () => {
//           const files = getMissingStories();
//           if (files.length === 0) {
//             return ['(스토리가 없는 컴포넌트가 없습니다)'];
//           }
//           return files;
//         },
//       },
//       // 질문 2 (Manual): 직접 입력
//       {
//         type: 'input',
//         name: 'manualPath',
//         message:
//           '컴포넌트 파일 경로를 입력하세요 (예: ./components/Button.tsx):',
//         when: (answers) => answers.mode === 'manual',
//         validate: (value) => {
//           if (!value) return '경로를 입력해주세요.';
//           return true;
//         },
//       },
//     ],
//     actions: (data) => {
//       // 선택된 경로 가져오기 (Auto 또는 Manual)
//       let targetPath =
//         data.mode === 'auto' ? data.selectedPath : data.manualPath;

//       // 예외 처리: 검색된 파일이 없을 때
//       if (targetPath === '(스토리가 없는 컴포넌트가 없습니다)') {
//         return []; // 아무것도 안 함
//       }

//       // 경로 분석
//       // targetPath 예시: "src/components/Header/Header.tsx"
//       const dir = path.dirname(targetPath); // "src/components/Header"
//       const ext = path.extname(targetPath); // ".tsx"
//       const baseName = path.basename(targetPath, ext); // "Header"

//       //test
//       console.log('dir: ', dir);

//       return [
//         {
//           type: 'add',
//           // 핵심: 원본 파일이 있는 폴더(dir)에 스토리 파일 생성
//           path: `${dir}/{{pascalCase name}}.stories.tsx`,
//           templateFile: './.storybook/_template/story.hbs',
//           data: {
//             name: baseName, // 템플릿 내부에서 {{name}}으로 쓸 변수 주입
//           },
//           skipIfExists: true,
//         },
//       ];
//     },
//   });
// };

////////////////////////////////////////////////

const path = require('path');
const fs = require('fs');
const glob = require('glob');

module.exports = function (plop) {
  // [핵심 1] 기준점 설정
  // process.cwd()는 프로젝트 루트지만, 우리는 apps/core 안에서만 놀아야 함.
  // __dirname은 이 파일이 있는 'apps/core' 경로를 가리킴.
  const appRoot = __dirname;

  const getMissingStories = () => {
    // [핵심 2] 검색 기준을 appRoot로 고정
    // 이렇게 하면 결과값(files)은 'components/Button.tsx' 처럼 깔끔하게 나옴
    const files = glob.sync('components/**/*.tsx', {
      ignore: [
        '**/*.stories.tsx',
        '**/*.spec.tsx',
        '**/*.test.tsx',
        '**/node_modules/**',
        '**/.next/**',
        '**/dist/**',
      ],
      cwd: appRoot, // 여기가 중요! 루트에서 실행해도 apps/core 안만 뒤짐
    });

    // 필터링 로직
    const missing = files.filter((filePath) => {
      const dir = path.dirname(filePath);
      const ext = path.extname(filePath);
      const baseName = path.basename(filePath, ext);

      const pascalName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

      // 존재 여부 확인은 절대 경로로 확실하게
      const path1 = path.resolve(appRoot, dir, `${baseName}.stories.tsx`);
      const path2 = path.resolve(appRoot, dir, `${pascalName}.stories.tsx`);

      if (fs.existsSync(path1) || fs.existsSync(path2)) {
        return false;
      }
      return true;
    });

    return missing;
  };

  plop.setGenerator('story', {
    description: 'PorTracker 앱 전용 스토리 생성',
    prompts: [
      {
        type: 'list',
        name: 'mode',
        message: '어떤 방식으로 생성하시겠습니까?',
        choices: [
          { name: '🔍 스토리가 없는 컴포넌트 자동 검색', value: 'auto' },
          { name: '✍️ 직접 경로 입력', value: 'manual' },
        ],
      },
      {
        type: 'list',
        name: 'selectedPath',
        message: '스토리를 생성할 컴포넌트를 선택하세요:',
        when: (answers) => answers.mode === 'auto',
        choices: () => {
          const files = getMissingStories();
          if (files.length === 0)
            return ['(스토리가 없는 컴포넌트가 없습니다)'];
          return files;
        },
      },
      {
        type: 'input',
        name: 'manualPath',
        message:
          '컴포넌트 경로를 입력하세요 (apps/core 기준 상대경로, 예: components/Header.tsx):',
        when: (answers) => answers.mode === 'manual',
        validate: (value) => {
          if (!value) return '경로를 입력해주세요.';
          return true;
        },
      },
    ],
    actions: (data) => {
      let targetPath =
        data.mode === 'auto' ? data.selectedPath : data.manualPath;

      if (targetPath === '(스토리가 없는 컴포넌트가 없습니다)') return [];

      // [핵심 3] 경로 정제 (윈도우/맥 호환 및 불필요한 접두사 제거)
      targetPath = targetPath.split(path.sep).join('/');

      // 사용자가 실수로 'apps/core/'를 붙였거나 './'를 붙였으면 제거
      // 우리는 무조건 apps/core 내부 경로(components/...)만 취급함
      if (targetPath.startsWith('./')) targetPath = targetPath.substring(2);
      if (targetPath.startsWith('apps/core/'))
        targetPath = targetPath.replace('apps/core/', '');

      const dir = path.dirname(targetPath);
      const ext = path.extname(targetPath);
      const baseName = path.basename(targetPath, ext);

      // [핵심 4] 절대 경로로 생성 위치 지정
      // 루트에서 실행하든 어디서 실행하든, 무조건 apps/core(appRoot) 안에 꽂아버림
      const destinationPath = path.resolve(
        appRoot,
        dir,
        '{{pascalCase name}}.stories.tsx'
      );

      // 템플릿 경로도 절대 경로로 지정하는 게 안전함
      const templatePath = path.resolve(
        appRoot,
        '.storybook/_template/story.hbs'
      );

      return [
        {
          type: 'add',
          path: destinationPath,
          templateFile: templatePath,
          data: {
            name: baseName,
          },
          skipIfExists: true,
        },
      ];
    },
  });
};
