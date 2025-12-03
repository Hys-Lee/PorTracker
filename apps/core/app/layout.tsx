import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <head>
          {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/src/styles.css" /> */}
        </head>
        <body>
          {children}
          {/* <script type="module" src="/src/main.tsx"></script> */}
        </body>
      </html>
    </>
  );
}
