# 🏦 토스뱅크 포트폴리오 데모

> **⚠️ 중요 고지사항**  
> 이 프로젝트는 **포트폴리오 목적으로 제작된 데모**입니다. 실제 토스뱅크 서비스가 아니며, 토스뱅크 주식회사와 관련이 없습니다.

## 📖 프로젝트 개요

현대적인 핀테크 UI/UX를 구현한 뱅킹 앱 포트폴리오입니다. 토스뱅크의 디자인 언어에서 영감을 받아 제작되었으며, 최신 웹 기술 스택을 활용하여 반응형 뱅킹 인터페이스를 구현했습니다.

## ✨ 주요 기능

### 🏠 홈 화면
- **계좌 카드 슬라이더**: 터치/마우스 드래그로 계좌 정보 탐색
- **잔액 표시/숨김**: 개인정보 보호를 위한 잔액 토글 기능
- **반응형 레이아웃**: 데스크톱(3열)/태블릿(2열)/모바일(1열) 적응형 디자인
- **스켈레톤 로딩**: 레이아웃 시프트 방지를 위한 로딩 상태 표시

### 💳 결제 서비스
- **QR 코드 결제**: 실시간 QR 코드 생성 및 스캔
- **거래 내역**: 카테고리별 거래 기록 관리
- **결제 요약**: 월별/일별 결제 통계

### 📈 투자 포트폴리오
- **포트폴리오 개요**: 총 평가금액 및 수익률 표시
- **종목 관리**: 주식/펀드/ETF 통합 관리
- **실시간 가격**: 모의 실시간 가격 데이터 표시
- **필터링**: 투자 유형별 필터링 기능

### 🎨 UI/UX 특징
- **Moneygraphy 커스텀 폰트**: 금융 서비스 특화 타이포그래피
- **글래스모피즘**: 현대적인 반투명 디자인
- **부드러운 애니메이션**: 자연스러운 전환 효과
- **스크롤 트리거 헤더**: 스크롤 시 나타나는 헤더

## 🛠 기술 스택

### Core Framework
- **Next.js 15** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성 보장
- **React 18** - 최신 React 기능 활용

### 스타일링
- **Emotion** - CSS-in-JS 라이브러리
- **Styled Components** - 컴포넌트 기반 스타일링
- **Responsive Design** - 모바일 퍼스트 반응형 디자인

### 상태 관리
- **React Query** - 서버 상태 관리
- **React Hooks** - 클라이언트 상태 관리

### 개발 도구
- **Yarn Berry** - 모던 패키지 매니저
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Storybook** - 컴포넌트 문서화

### 빌드 & 배포
- **Webpack** - 모듈 번들러
- **SWC** - 고성능 TypeScript/JavaScript 컴파일러
- **GitHub Actions** - CI/CD 파이프라인

## 🚀 시작하기

### 환경 요구사항
- **Node.js**: 18.17.0 이상
- **Yarn**: 4.0.0 이상

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/lhg1006/toss-portfolio.git
cd toss-portfolio

# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 사용 가능한 스크립트

```bash
# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 서버 실행
yarn start

# 린팅
yarn lint

# 타입 체크
yarn type-check

# 스토리북 실행
yarn storybook
```

## 📱 반응형 디자인

| 디바이스 | 해상도 | 레이아웃 |
|---------|--------|----------|
| 모바일 | ~768px | 1열 세로 스택 |
| 태블릿 | 768px~1024px | 2열 그리드 |
| 데스크톱 | 1024px~ | 3열 그리드 |

## 🎯 핵심 컴포넌트

### CardSlider
- 터치/마우스 드래그 지원
- 자동 스냅 기능
- 반응형 카드 개수 조정

### AccountCard
- 잔액 표시/숨김 토글
- 계좌번호 복사 기능
- 그라데이션 테마 지원

### InvestmentPortfolio
- 실시간 가격 업데이트
- 수익률 계산 및 표시
- 포트폴리오 분석

## 🔧 커스터마이징

### 테마 설정
```typescript
// src/styles/theme.ts
export const theme = {
  colors: {
    primary: '#3182f6',
    // ... 기타 색상 설정
  },
  // ... 기타 테마 설정
}
```

### 반응형 브레이크포인트
```typescript
breakpoints: {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
}
```

## 📸 스크린샷

### 데스크톱
- 3열 그리드 레이아웃
- 네비게이션 버튼 표시
- 호버 효과 적용

### 모바일
- 1열 세로 스택
- 터치 제스처 지원
- 하단 네비게이션

## 🤝 기여하기

이 프로젝트는 포트폴리오 목적으로 제작되었지만, 개선 사항이나 버그 리포트는 언제든 환영합니다.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## ⚖️ 법적 고지

- 이 프로젝트는 **교육 및 포트폴리오 목적**으로만 제작되었습니다
- **토스뱅크 주식회사**와 관련이 없으며, 공식 서비스가 아닙니다
- 토스뱅크의 상표권 및 저작권은 해당 회사에 있습니다
- 실제 금융 서비스가 아니므로 개인정보 입력을 지양해주세요

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 아래로 연락주세요:

- GitHub: [@lhg1006](https://github.com/lhg1006)
- Email: your.email@example.com

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**