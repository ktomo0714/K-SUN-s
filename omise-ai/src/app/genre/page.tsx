'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { genres } from '@/lib/genres';

export default function GenrePage() {
  const router = useRouter();
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const selectedMainCategory = genres.find((g) => g.id === selectedMain);

  const handleNext = () => {
    if (selectedMain && selectedSub) {
      router.push(`/input?main=${selectedMain}&sub=${selectedSub}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-sm hover:underline">
            ← ホームに戻る
          </Link>
          <h1 className="text-2xl font-bold text-center mt-2">ジャンル選択</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* ステップインジケーター */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <span className="text-sm font-medium text-primary">ジャンル</span>
              <div className="w-8 h-1 bg-gray-300 mx-2"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span className="text-sm text-gray-500">基本情報</span>
              <div className="w-8 h-1 bg-gray-300 mx-2"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-sm text-gray-500">結果</span>
            </div>
          </div>

          {/* メインカテゴリ選択 */}
          <section className="mb-8">
            <h2 className="section-title">
              {selectedMain ? '✓ メインカテゴリ' : 'メインカテゴリを選択'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => {
                    setSelectedMain(genre.id);
                    setSelectedSub(null);
                  }}
                  className={`category-card ${
                    selectedMain === genre.id ? 'selected' : ''
                  }`}
                >
                  <span className="text-4xl">{genre.icon}</span>
                  <span className="font-medium text-gray-800">{genre.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* サブカテゴリ選択 */}
          {selectedMainCategory && (
            <section className="mb-8 animate-fade-in">
              <h2 className="section-title">
                {selectedSub ? '✓ サブカテゴリ' : 'サブカテゴリを選択'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedMainCategory.subCategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSub(sub.id)}
                    className={`category-card ${
                      selectedSub === sub.id ? 'selected' : ''
                    }`}
                  >
                    <span className="text-3xl">{sub.icon}</span>
                    <span className="font-medium text-gray-800 text-sm">
                      {sub.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* 選択サマリーと次へボタン */}
          {selectedMain && selectedSub && (
            <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-4">選択内容</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {genres.find((g) => g.id === selectedMain)?.icon}
                  </span>
                  <span className="font-medium">
                    {genres.find((g) => g.id === selectedMain)?.name}
                  </span>
                </div>
                <span className="text-gray-400">→</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {
                      selectedMainCategory?.subCategories.find(
                        (s) => s.id === selectedSub
                      )?.icon
                    }
                  </span>
                  <span className="font-medium">
                    {
                      selectedMainCategory?.subCategories.find(
                        (s) => s.id === selectedSub
                      )?.name
                    }
                  </span>
                </div>
              </div>
              <button onClick={handleNext} className="btn-primary w-full">
                次へ：基本情報を入力する
              </button>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
