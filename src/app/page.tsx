"use client";

import { useState, useRef } from "react";
import {
  Camera,
  Upload,
  Trash2,
  Leaf,
  Info,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import {
  analyzeImage,
  type AnalysisResult,
  type RecyclingItem,
} from "@/lib/ai-analysis";
import Link from "next/link";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setError(null);
        analyzeImageData(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    fileInputRef.current?.click();
  };

  const analyzeImageData = async (imageData: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeImage(imageData);
      setAnalysisResult(result);
    } catch (err) {
      setError("이미지 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetApp = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const selectAlternative = (item: RecyclingItem) => {
    if (analysisResult) {
      setAnalysisResult({
        item,
        alternatives: analysisResult.alternatives?.filter(
          (alt) => alt.id !== item.id
        ),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-8 h-8 text-green-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">재활용 가이드</h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto mb-4">
            사진을 찍거나 업로드하면 AI가 올바른 분리수거 방법을 알려드립니다
          </p>
          <Link
            href="/info"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            재활용 정보 보기
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {!selectedImage ? (
            /* Upload Section */
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  버릴 물건의 사진을 찍어주세요
                </h2>
                <p className="text-gray-600 mb-6">
                  AI가 물건을 분석하여 올바른 분리수거 방법을 알려드립니다
                </p>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleCameraCapture}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    사진 촬영
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    파일 업로드
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            /* Analysis Section */
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Uploaded item"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={resetApp}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Analysis Status */}
              {isAnalyzing && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">
                      AI가 이미지를 분석하고 있습니다...
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      잠시만 기다려주세요
                    </p>
                  </div>
                </div>
              )}

              {/* Results */}
              {analysisResult && !isAnalyzing && (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 ${analysisResult.item.color} rounded-full mr-3`}
                        ></div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {analysisResult.item.category}
                        </h3>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {Math.round(analysisResult.item.confidence * 100)}%
                          일치
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                      <strong>{analysisResult.item.name}</strong>로
                      분석되었습니다.
                    </p>

                    {/* Instructions */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        분리수거 방법
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.item.instructions.map(
                          (instruction, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-700">
                                {instruction}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <Info className="w-4 h-4 mr-2" />
                        유용한 팁
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.item.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-600 text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Alternatives */}
                  {analysisResult.alternatives &&
                    analysisResult.alternatives.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h4 className="font-semibold text-gray-700 mb-4">
                          다른 가능성도 있습니다
                        </h4>
                        <div className="space-y-3">
                          {analysisResult.alternatives.map((alternative) => (
                            <button
                              key={alternative.id}
                              onClick={() => selectAlternative(alternative)}
                              className="w-full p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div
                                    className={`w-3 h-3 ${alternative.color} rounded-full mr-3`}
                                  ></div>
                                  <span className="font-medium text-gray-800">
                                    {alternative.category}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {Math.round(alternative.confidence * 100)}%
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {alternative.name}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  <button
                    onClick={resetApp}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    새로운 물건 분석하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>환경을 생각하는 분리수거로 더 나은 미래를 만들어가요 🌱</p>
        </div>
      </div>
    </div>
  );
}
