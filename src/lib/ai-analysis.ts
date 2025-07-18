export interface RecyclingItem {
  id: string;
  name: string;
  category: string;
  material: string;
  instructions: string[];
  tips: string[];
  color: string;
  confidence: number;
}

export interface AnalysisResult {
  item: RecyclingItem;
  alternatives?: RecyclingItem[];
}

// 재활용 가능한 물품들의 데이터베이스 (실제로는 더 큰 데이터셋이 필요)
const recyclingDatabase: RecyclingItem[] = [
  {
    id: "pet-bottle",
    name: "PET 병",
    category: "플라스틱 (PET)",
    material: "PET",
    instructions: [
      "라벨과 뚜껑을 제거하세요",
      "내용물을 완전히 비우고 헹구세요",
      "압축하여 부피를 줄이세요",
      "투명한 재활용 수거함에 배출하세요",
    ],
    tips: [
      "라벨이 완전히 제거되지 않으면 재활용이 어려울 수 있습니다",
      "오염된 플라스틱은 일반쓰레기로 분류됩니다",
      "PET 마크가 있는지 확인하세요",
    ],
    color: "bg-blue-500",
    confidence: 0.95,
  },
  {
    id: "glass-bottle",
    name: "유리병",
    category: "유리",
    material: "Glass",
    instructions: [
      "뚜껑과 라벨을 제거하세요",
      "내용물을 완전히 비우고 헹구세요",
      "깨진 유리는 일반쓰레기로 분류됩니다",
      "유리 전용 수거함에 배출하세요",
    ],
    tips: [
      "깨진 유리는 위험하므로 신문지에 싸서 버리세요",
      "색깔이 있는 유리는 재활용이 어려울 수 있습니다",
      "약품병은 약국에 반납하세요",
    ],
    color: "bg-green-500",
    confidence: 0.92,
  },
  {
    id: "aluminum-can",
    name: "알루미늄 캔",
    category: "금속",
    material: "Aluminum",
    instructions: [
      "내용물을 완전히 비우고 헹구세요",
      "압축하여 부피를 줄이세요",
      "금속 수거함에 배출하세요",
    ],
    tips: [
      "스프레이 캔은 가스가 완전히 빠져야 합니다",
      "오염된 캔은 일반쓰레기로 분류됩니다",
      "알루미늄은 무한 재활용이 가능합니다",
    ],
    color: "bg-gray-500",
    confidence: 0.88,
  },
  {
    id: "paper-box",
    name: "종이상자",
    category: "종이",
    material: "Paper",
    instructions: [
      "테이프와 스티커를 제거하세요",
      "평평하게 펴서 정리하세요",
      "종이 수거함에 배출하세요",
    ],
    tips: [
      "비닐 코팅된 종이는 재활용이 어렵습니다",
      "오염된 종이는 일반쓰레기로 분류됩니다",
      "종이는 수분에 약하므로 건조하게 보관하세요",
    ],
    color: "bg-yellow-500",
    confidence: 0.85,
  },
  {
    id: "plastic-container",
    name: "플라스틱 용기",
    category: "플라스틱 (기타)",
    material: "PP/PE",
    instructions: [
      "라벨과 뚜껑을 제거하세요",
      "내용물을 완전히 비우고 헹구세요",
      "플라스틱 수거함에 배출하세요",
    ],
    tips: [
      "재질 표시를 확인하세요 (PP, PE, PS 등)",
      "오염된 플라스틱은 일반쓰레기로 분류됩니다",
      "투명한 플라스틱이 재활용에 유리합니다",
    ],
    color: "bg-blue-400",
    confidence: 0.82,
  },
];

// 실제 API를 사용한 이미지 분석 함수
export async function analyzeImage(imageData: string): Promise<AnalysisResult> {
  try {
    // API 호출
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageData }),
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API 호출 오류:", error);

    // API 호출 실패 시 시뮬레이션 데이터 반환
    return await simulateAnalysis();
  }
}

// 시뮬레이션 분석 함수 (API 호출 실패 시 사용)
async function simulateAnalysis(): Promise<AnalysisResult> {
  // 시뮬레이션을 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 랜덤하게 아이템 선택
  const randomIndex = Math.floor(Math.random() * recyclingDatabase.length);
  const selectedItem = recyclingDatabase[randomIndex];

  // 신뢰도 조정 (시뮬레이션)
  const adjustedItem = {
    ...selectedItem,
    confidence: Math.random() * 0.3 + 0.7, // 0.7 ~ 1.0 사이의 신뢰도
  };

  // 대안 아이템들 (신뢰도가 낮은 경우)
  const alternatives = recyclingDatabase
    .filter((item) => item.id !== selectedItem.id)
    .slice(0, 2)
    .map((item) => ({
      ...item,
      confidence: Math.random() * 0.3 + 0.5, // 0.5 ~ 0.8 사이의 신뢰도
    }));

  return {
    item: adjustedItem,
    alternatives: adjustedItem.confidence < 0.8 ? alternatives : undefined,
  };
}

// 이미지 전처리 함수 (실제 구현에서 사용)
export function preprocessImage(imageData: string): string {
  // 이미지 크기 조정, 노이즈 제거, 밝기 조정 등
  // 실제 구현에서는 Canvas API나 이미지 처리 라이브러리 사용
  return imageData;
}

// 재활용 카테고리별 색상 매핑
export const categoryColors: Record<string, string> = {
  "플라스틱 (PET)": "bg-blue-500",
  "플라스틱 (기타)": "bg-blue-400",
  유리: "bg-green-500",
  금속: "bg-gray-500",
  종이: "bg-yellow-500",
  일반쓰레기: "bg-red-500",
};

// 재활용 불가능한 물품 감지
export function isNonRecyclable(itemName: string): boolean {
  const nonRecyclableItems = [
    "비닐",
    "스티로폼",
    "일회용컵",
    "플라스틱봉투",
    "음식물쓰레기",
    "의류",
    "전자제품",
    "건전지",
    "형광등",
  ];

  return nonRecyclableItems.some((keyword) =>
    itemName.toLowerCase().includes(keyword.toLowerCase())
  );
}
