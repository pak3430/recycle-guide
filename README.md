# 재활용 가이드 (Recycle Guide)

AI 기반 폐기물 분리수거 가이드 웹 애플리케이션입니다. 사용자가 버릴 물건의 사진을 찍으면 AI가 이를 분석하여 올바른 분리수거 방법을 알려주는 서비스입니다.

## 🌱 주요 기능

### 📸 AI 이미지 분석

- 사진 촬영 또는 이미지 업로드
- AI 기반 물품 식별 및 분류
- 신뢰도 점수 제공
- 대안 분류 제안

### 📋 상세한 분리수거 가이드

- 단계별 분리수거 방법 안내
- 유용한 팁과 주의사항
- 재활용 불가능한 물품 감지
- 카테고리별 색상 구분

### 📚 재활용 정보 섹션

- 플라스틱, 유리, 금속, 종이 카테고리별 정보
- 검색 기능
- 상세한 분리수거 방법
- 일반적인 재활용 팁

## 🚀 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Headless UI
- **AI Integration**: 준비된 (실제 AI 모델 연동 가능)

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd recycle-guide

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 🏗️ 프로젝트 구조

```
recycle-guide/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 메인 페이지 (AI 분석)
│   │   ├── info/
│   │   │   └── page.tsx      # 재활용 정보 페이지
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   └── globals.css       # 전역 스타일
│   └── lib/
│       └── ai-analysis.ts    # AI 분석 로직
├── public/                   # 정적 파일
└── package.json
```

## 🔧 AI 분석 기능

현재는 시뮬레이션 데이터를 사용하고 있으며, 실제 AI 모델과의 연동을 위해 다음과 같은 옵션들이 있습니다:

### 추천 AI 서비스

1. **Google Cloud Vision API** - 이미지 라벨링 및 객체 감지
2. **Azure Computer Vision** - Microsoft의 컴퓨터 비전 서비스
3. **AWS Rekognition** - Amazon의 이미지 및 비디오 분석
4. **커스텀 모델** - TensorFlow.js 또는 ONNX.js 사용

### 구현 방법

`src/lib/ai-analysis.ts` 파일의 `analyzeImage` 함수를 수정하여 실제 AI 서비스와 연동할 수 있습니다.

```typescript
export async function analyzeImage(imageData: string): Promise<AnalysisResult> {
  // 실제 AI API 호출 로직
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: imageData }),
  });

  return response.json();
}
```

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **직관적인 인터페이스**: 사용자 친화적인 UI/UX
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원
- **성능 최적화**: Next.js의 최적화 기능 활용

## 📱 모바일 최적화

- 카메라 직접 촬영 지원
- 터치 친화적인 인터페이스
- PWA 지원 가능
- 오프라인 기능 (향후 구현 예정)

## 🔮 향후 개발 계획

### 단기 계획

- [ ] 실제 AI 모델 연동
- [ ] 사용자 피드백 시스템
- [ ] 지역별 분리수거 규정 데이터베이스
- [ ] 다국어 지원

### 중기 계획

- [ ] PWA (Progressive Web App) 구현
- [ ] 오프라인 모드
- [ ] 사용자 계정 및 히스토리
- [ ] 커뮤니티 기능

### 장기 계획

- [ ] AR (증강현실) 기능
- [ ] 음성 인식 기능
- [ ] IoT 센서 연동
- [ ] 환경 영향 측정

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 말

- 환경 보호에 기여하는 모든 분들
- 분리수거 가이드라인을 제공하는 지자체 및 기관들
- 오픈소스 커뮤니티

## 📞 문의

프로젝트에 대한 문의사항이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**환경을 생각하는 분리수거로 더 나은 미래를 만들어가요 🌱**
