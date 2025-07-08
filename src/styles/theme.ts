export const theme = {
  colors: {
    // 토스 브랜드 컬러
    primary: {
      50: '#f0f4ff',
      100: '#e0edff',
      200: '#b8d4ff',
      300: '#7bb3ff',
      400: '#3182f6', // 토스 메인 블루
      500: '#1b64da',
      600: '#1a56db',
      700: '#1e40af',
      800: '#1e3a8a',
      900: '#1e3a8a',
    },
    // iOS 스타일 그레이
    gray: {
      50: '#fafafa',
      100: '#f5f5f7', // iOS 배경
      200: '#e5e5ea', // iOS 구분선
      300: '#d1d1d6', // iOS 비활성
      400: '#8e8e93', // iOS 보조 텍스트
      500: '#636366',
      600: '#48484a',
      700: '#3a3a3c',
      800: '#2c2c2e', // iOS 다크 배경
      900: '#1c1c1e', // iOS 다크 텍스트
    },
    // 토스 포인트 컬러
    toss: {
      blue: '#3182f6',
      lightBlue: '#e8f3ff',
      red: '#ff6b6b',
      orange: '#ff9500',
      yellow: '#ffb800',
      green: '#00c896',
      purple: '#8b5cf6',
      pink: '#f472b6',
    },
    success: '#00c896', // 토스 초록
    warning: '#ff9500', // 토스 오렌지
    error: '#ff6b6b', // 토스 빨강
    white: '#ffffff',
    black: '#1c1c1e',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['SF Mono', 'Monaco', 'monospace'],
    },
    fontSize: {
      xs: '11px',
      sm: '13px',
      md: '15px',
      lg: '17px',
      xl: '19px',
      '2xl': '22px',
      '3xl': '28px',
      '4xl': '34px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },
  borderRadius: {
    none: '0px',
    sm: '6px',  // iOS 스타일
    md: '12px', // iOS 카드
    lg: '16px', // iOS 모달
    xl: '20px', // iOS 큰 카드
    '2xl': '24px',
    full: '50%',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)', // iOS 가벼운 그림자
    md: '0 4px 12px rgba(0, 0, 0, 0.15)', // iOS 카드 그림자
    lg: '0 8px 25px rgba(0, 0, 0, 0.15)', // iOS 모달 그림자
    xl: '0 16px 40px rgba(0, 0, 0, 0.12)', // iOS 드롭 그림자
  },
};