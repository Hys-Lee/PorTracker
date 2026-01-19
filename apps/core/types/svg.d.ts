// image.d.ts

// declare module '*.svg?react' {
//   import * as React from 'react';
//   const ReactComponent: React.FunctionComponent<
//     React.SVGProps<SVGSVGElement> & { title?: string }
//   >;
//   export default ReactComponent;
// }
declare module '*.svg?react' {
  // SVG를 리액트 컴포넌트로 사용할 때의 타입 정의
  const content: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default content;
}
declare module '*.svg' {
  // 기본 SVG 임포트 (Next.js 기본 로더가 처리하는 이미지 객체 타입)
  const content: any;
  export default content;
}
