import { colors } from '@core/tokens/colors.stylex';
import LoginButton from './_components/LoginButton';
import * as stylex from '@stylexjs/stylex';

const LoginPage = () => {
  return (
    <main {...stylex.props(pageStyles.main)}>
      {/* <div {...stylex.props(pageStyles.logo)}>로고</div> */}
      <div {...stylex.props(pageStyles.header)}>
        <h1 {...stylex.props(pageStyles.headerBrand)}>PorTracker</h1>
        <span {...stylex.props(pageStyles.headerDescription)}>
          Intelligent Life-Cycle Portfolio Management for the Modern Investor
        </span>
      </div>
      <div {...stylex.props(pageStyles.loginBox)}>
        <div {...stylex.props(pageStyles.loginGreetingArea)}>
          <h3 {...stylex.props(pageStyles.loginTitle)}>Welcome!</h3>
          <span {...stylex.props(pageStyles.loginDescription)}>
            Access our service instantly with one click
          </span>
        </div>
        <LoginButton />
      </div>
      <div {...stylex.props(pageStyles.footer)}>
        {/* <span {...stylex.props(pageStyles.footerText)}>SUPPORT</span>
        <span {...stylex.props(pageStyles.footerText)}>SECURITY</span>
        <span {...stylex.props(pageStyles.footerText)}>CONTACT</span> */}
      </div>
    </main>
  );
};

export default LoginPage;

const pageStyles = stylex.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
  },
  logo: {
    height: '20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  headerBrand: {
    fontSize: '36px',
    fontWeight: '700',
    // color: colors.textStrong,
    color: colors.textPrimary,
    margin: 0,
  },
  headerDescription: {
    fontSize: '12px',
    fontWeight: '500',
    color: colors.textNormal,
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: `0 10px 20px 10px ${colors.bgNormal}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    width: '300px',
    height: '160px',
  },
  loginGreetingArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  loginTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.textStrong,
    margin: 0,
  },
  loginDescription: {
    fontSize: '12px',
    fontWeight: '300',
    color: colors.textStrong,
  },
  footer: {
    display: 'flex',
    gap: '40px',
    height: '100px',
    // justifyContent: 'space-between',
  },
  footerText: {
    fontSize: '14px',
    fontWeight: '400',
    color: colors.textNormal,
  },
});

// <!DOCTYPE html>

// <html class="light" lang="en"><head>
// <meta charset="utf-8"/>
// <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
// <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
// <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&amp;family=Inter:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
// <script id="tailwind-config">
//       tailwind.config = {
//         darkMode: "class",
//         theme: {
//           extend: {
//             colors: {
//               "tertiary-container": "#e2fbda",
//               "primary-fixed": "#adefe4",
//               "tertiary-fixed": "#e2fbda",
//               "secondary": "#58615f",
//               "surface-bright": "#f8fafa",
//               "on-tertiary": "#eaffe3",
//               "on-tertiary-container": "#4c6148",
//               "inverse-surface": "#0b0f0f",
//               "primary": "#256960",
//               "on-tertiary-fixed": "#3a4f37",
//               "error-container": "#fe8983",
//               "surface-variant": "#dae5e6",
//               "surface": "#f8fafa",
//               "primary-fixed-dim": "#9fe1d6",
//               "on-surface-variant": "#566162",
//               "surface-container-high": "#e1eaeb",
//               "on-secondary": "#f2fbf8",
//               "on-primary": "#dcfff8",
//               "on-tertiary-fixed-variant": "#566c52",
//               "secondary-fixed": "#dbe4e2",
//               "on-surface": "#2a3435",
//               "tertiary-dim": "#435940",
//               "outline-variant": "#a9b4b5",
//               "on-secondary-fixed": "#38413f",
//               "surface-container-low": "#f0f4f5",
//               "primary-container": "#adefe4",
//               "on-background": "#2a3435",
//               "on-secondary-fixed-variant": "#545d5b",
//               "on-secondary-container": "#4b5352",
//               "tertiary-fixed-dim": "#d3eccc",
//               "on-error": "#fff7f6",
//               "on-primary-container": "#145c53",
//               "background": "#f8fafa",
//               "secondary-fixed-dim": "#cdd6d4",
//               "on-primary-fixed-variant": "#22665d",
//               "surface-tint": "#256960",
//               "secondary-dim": "#4c5553",
//               "surface-container-highest": "#dae5e6",
//               "on-primary-fixed": "#004841",
//               "surface-container-lowest": "#ffffff",
//               "outline": "#727d7e",
//               "tertiary": "#4f654c",
//               "surface-container": "#e9eff0",
//               "secondary-container": "#dbe4e2",
//               "primary-dim": "#155c54",
//               "on-error-container": "#752121",
//               "error": "#9f403d",
//               "error-dim": "#4e0309",
//               "surface-dim": "#cfdcde",
//               "inverse-primary": "#bbfef2",
//               "inverse-on-surface": "#9b9d9d"
//             },
//             fontFamily: {
//               "headline": ["Manrope"],
//               "body": ["Inter"],
//               "label": ["Inter"]
//             },
//             borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
//           },
//         },
//       }
//     </script>
// <style>
//         body { font-family: 'Inter', sans-serif; }
//         .font-manrope { font-family: 'Manrope', sans-serif; }
//         .material-symbols-outlined {
//             font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
//         }
//     </style>
// </head>
// <body class="bg-surface text-on-surface min-h-screen flex items-center justify-center p-6 selection:bg-primary-container selection:text-on-primary-container">
// <!-- Subtle Background Texture -->
// <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
// <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
// <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]"></div>
// </div>
// <!-- Main Container: Focused Transactional View -->
// <main class="relative z-10 w-full max-w-[440px] flex flex-col items-center">
// <!-- Branding Anchor -->
// <header class="mb-12 text-center">
// <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-dim rounded-2xl mb-6 shadow-sm overflow-hidden">
// <img alt="PorTracker Logo" class="w-full h-full object-cover" onerror="this.outerHTML='&lt;span class=\'material-symbols-outlined text-surface text-4xl\' style=\'font-variation-settings: &quot;FILL&quot; 1;\'&gt;account_balance_wallet&lt;/span&gt;'" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhLLZpblRi91-YLFcyHyhHrMr8f---JJwfOusHXNZxECPwTQ6NOiwT6QbwDqFlTsJKbfjWM4dqQfMgNpGX0n6Hu5xeVjFMwYqo2ADg3jSCIjRK_UUlsh73iOmuTB5g0XipMDNRhnqdaCqWiY3lr7q9kGHK4HkKZf5o3FYhBCfbIMnrES3w1r1PCeahhZfArz2oIZ2Mi1CYzzM8uEgRWozDlQW4npnvk7-MwdR_8zpLzKS81uEqhh4L0s1-qqYaiwdEuWZhwvEs_oB8"/>
// </div>
// <h1 class="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">PorTracker</h1>
// <p class="font-body text-secondary text-sm tracking-wide">Intelligent Portfolio Management for the Modern Investor</p>
// </header>
// <!-- Login Card: Editorial Glassmorphism -->
// <section class="w-full bg-surface-container-lowest/80 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(42,52,53,0.12)] border border-white/40">
// <div class="space-y-8">
// <div class="text-center space-y-2">
// <h2 class="font-headline text-xl font-bold text-on-surface">Welcome back</h2>
// <p class="font-body text-xs text-secondary/70">Sign in to access your dashboard</p>
// </div>
// <!-- Primary Action: Continue with Google -->
// <div class="space-y-4">
// <button class="w-full h-14 bg-white border border-surface-container-high flex items-center justify-center gap-3 rounded-2xl hover:bg-surface-container-low active:scale-[0.98] transition-all duration-300 shadow-sm group">
// <svg class="w-5 h-5" viewbox="0 0 24 24">
// <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
// <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
// <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
// <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
// </svg>
// <span class="font-manrope font-bold text-on-surface group-hover:text-primary transition-colors">Continue with Google</span>
// </button>
// <p class="px-6 text-center font-body text-[11px] leading-relaxed text-outline-variant">
//                         By continuing, you agree to our automated portfolio syncing and data security protocols.
//                     </p>
// </div>
// </div>
// </section>
// <!-- Reflection Footer -->
// <footer class="mt-12 text-center space-y-4">
// <p class="font-body text-secondary text-sm">
//                 New to the platform?
//                 <a class="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4" href="#">Create Portfolio</a>
// </p>
// <div class="pt-8">
// <div class="inline-block p-4 bg-surface-container-low/50 rounded-2xl max-w-[320px]">
// <p class="font-body italic text-secondary text-[13px] leading-relaxed">
//                         "Precision tracking for the calculated path to financial freedom."
//                     </p>
// </div>
// </div>
// <nav class="flex justify-center gap-6 pt-6">
// <a class="font-label text-[10px] uppercase tracking-widest text-outline-variant hover:text-secondary transition-colors" href="#">Privacy</a>
// <a class="font-label text-[10px] uppercase tracking-widest text-outline-variant hover:text-secondary transition-colors" href="#">Terms</a>
// <a class="font-label text-[10px] uppercase tracking-widest text-outline-variant hover:text-secondary transition-colors" href="#">Support</a>
// </nav>
// </footer>
// </main>
// </body></html>
