"use client";

import { useState } from "react";
import {
  Leaf,
  Info,
  ArrowLeft,
  Search,
  BookOpen,
  Lightbulb,
  Shield,
} from "lucide-react";
import Link from "next/link";

interface RecyclingCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  items: string[];
  tips: string[];
  icon: React.ReactNode;
}

const recyclingCategories: RecyclingCategory[] = [
  {
    id: "plastic",
    name: "플라스틱",
    description: "PET, PP, PE, PS 등 다양한 플라스틱 재질",
    color: "bg-blue-500",
    items: ["PET 병", "플라스틱 용기", "일회용 컵", "플라스틱 봉투"],
    tips: [
      "라벨과 뚜껑을 제거하세요",
      "내용물을 완전히 비우고 헹구세요",
      "재질 표시를 확인하세요",
      "오염된 플라스틱은 일반쓰레기로 분류됩니다",
    ],
    icon: <div className="w-6 h-6 bg-blue-500 rounded"></div>,
  },
  {
    id: "glass",
    name: "유리",
    description: "투명한 유리병과 용기",
    color: "bg-green-500",
    items: ["유리병", "유리 용기", "약품병"],
    tips: [
      "뚜껑과 라벨을 제거하세요",
      "깨진 유리는 일반쓰레기로 분류됩니다",
      "색깔이 있는 유리는 재활용이 어려울 수 있습니다",
      "약품병은 약국에 반납하세요",
    ],
    icon: <div className="w-6 h-6 bg-green-500 rounded"></div>,
  },
  {
    id: "metal",
    name: "금속",
    description: "알루미늄, 철 등의 금속 재질",
    color: "bg-gray-500",
    items: ["알루미늄 캔", "철 캔", "스프레이 캔"],
    tips: [
      "내용물을 완전히 비우고 헹구세요",
      "스프레이 캔은 가스가 완전히 빠져야 합니다",
      "압축하여 부피를 줄이세요",
      "알루미늄은 무한 재활용이 가능합니다",
    ],
    icon: <div className="w-6 h-6 bg-gray-500 rounded"></div>,
  },
  {
    id: "paper",
    name: "종이",
    description: "신문지, 종이상자, 종이팩 등",
    color: "bg-yellow-500",
    items: ["신문지", "종이상자", "종이팩", "책자"],
    tips: [
      "테이프와 스티커를 제거하세요",
      "평평하게 펴서 정리하세요",
      "비닐 코팅된 종이는 재활용이 어렵습니다",
      "종이는 수분에 약하므로 건조하게 보관하세요",
    ],
    icon: <div className="w-6 h-6 bg-yellow-500 rounded"></div>,
  },
];

export default function InfoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = recyclingCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.items.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const selectedCategoryData = selectedCategory
    ? recyclingCategories.find((cat) => cat.id === selectedCategory)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            뒤로가기
          </Link>
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-green-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">재활용 정보</h1>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {!selectedCategoryData ? (
          /* Category List */
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="재활용 카테고리나 물품을 검색하세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
                >
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <h3 className="text-xl font-semibold text-gray-800 ml-3">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.items.slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                    {category.items.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        +{category.items.length - 3}개 더
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* General Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">
                  일반적인 재활용 팁
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-700">
                    • 분리수거 전에 내용물을 완전히 비우세요
                  </p>
                  <p className="text-gray-700">
                    • 라벨과 뚜껑은 별도로 분리하세요
                  </p>
                  <p className="text-gray-700">
                    • 오염된 물품은 일반쓰레기로 분류하세요
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">• 재활용 마크를 확인하세요</p>
                  <p className="text-gray-700">• 부피를 줄여서 배출하세요</p>
                  <p className="text-gray-700">
                    • 지역별 수거 규정을 확인하세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Category Detail */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center">
                  {selectedCategoryData.icon}
                  <h2 className="text-2xl font-bold text-gray-800 ml-3">
                    {selectedCategoryData.name}
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                {selectedCategoryData.description}
              </p>

              {/* Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">주요 물품</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategoryData.items.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  분리수거 방법
                </h3>
                <ul className="space-y-2">
                  {selectedCategoryData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
