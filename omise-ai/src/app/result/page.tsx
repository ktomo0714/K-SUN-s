'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SimulationResult, SimulationInput, LocationType } from '@/types';
import { genres } from '@/lib/genres';

function ResultContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mainCategory = searchParams.get('main') || '';
  const subCategory = searchParams.get('sub') || '';
  const seats = parseInt(searchParams.get('seats') || '20');
  const unitPrice = parseInt(searchParams.get('unitPrice') || '1500');
  const openingHours = searchParams.get('openingHours') || '11:00-22:00';
  const location = (searchParams.get('location') || 'station') as LocationType;
  const targetCustomer = searchParams.get('targetCustomer') || '';
  const specialFeature = searchParams.get('specialFeature') || '';

  const mainGenre = genres.find((g) => g.id === mainCategory);
  const subGenre = mainGenre?.subCategories.find((s) => s.id === subCategory);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        const input: SimulationInput = {
          mainCategory,
          subCategory,
          basicInfo: {
            seats,
            unitPrice,
            openingHours,
            location,
            targetCustomer,
            specialFeature,
          },
        };

        const response = await fetch('/api/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });

        const data = await response.json();

        if (data.success) {
          setResult(data.data);
        } else {
          setError(data.error || 'エラーが発生しました');
        }
      } catch (err) {
        setError('シミュレーション結果の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchSimulation();
  }, [mainCategory, subCategory, seats, unitPrice, openingHours, location, targetCustomer, specialFeature]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">シミュレーション結果を生成中...</p>
          <p className="text-gray-500 text-sm mt-2">AIがあなたの開業プランを分析しています</p>
        </div>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Link href="/genre" className="btn-primary">
            最初からやり直す
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-sm hover:underline">
            ← ホームに戻る
          </Link>
          <h1 className="text-2xl font-bold text-center mt-2">シミュレーション結果</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* ステップインジケーター */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <span className="text-sm text-green-600">ジャンル</span>
              <div className="w-8 h-1 bg-green-500 mx-2"></div>
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <span className="text-sm text-green-600">基本情報</span>
              <div className="w-8 h-1 bg-primary mx-2"></div>
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-sm font-medium text-primary">結果</span>
            </div>
          </div>

          {/* 選択済み情報サマリー */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{mainGenre?.icon}</span>
              <span className="text-2xl">{subGenre?.icon}</span>
              <span className="font-medium">{subGenre?.name}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">{seats}席</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">客単価 {unitPrice.toLocaleString()}円</span>
          </div>

          {/* コンセプト */}
          <section className="card mb-6">
            <h2 className="section-title flex items-center gap-2">
              <span className="text-2xl">💡</span>
              コンセプト提案
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-primary mb-2">{result.concept.storeName}</h3>
                <p className="text-gray-700">{result.concept.concept}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">ターゲットへのメッセージ</h4>
                <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">{result.concept.targetMessage}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">差別化ポイント</h4>
                <ul className="space-y-2">
                  {result.concept.uniquePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* KPI */}
          <section className="card mb-6">
            <h2 className="section-title flex items-center gap-2">
              <span className="text-2xl">📊</span>
              KPI予測
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">月間売上予測</p>
                <p className="text-xl font-bold text-primary">
                  {Math.round(result.kpi.monthlyRevenue / 10000).toLocaleString()}万円
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">日次来客数</p>
                <p className="text-xl font-bold text-green-600">
                  {result.kpi.dailyCustomers}人
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">回転率</p>
                <p className="text-xl font-bold text-orange-600">
                  {result.kpi.turnoverRate}回
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">平均客単価</p>
                <p className="text-xl font-bold text-purple-600">
                  {result.kpi.averageSpending.toLocaleString()}円
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">原価率</p>
                <p className="font-bold">{result.kpi.foodCostRatio.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">人件費率</p>
                <p className="font-bold">{result.kpi.laborCostRatio.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">家賃比率</p>
                <p className="font-bold">{result.kpi.rentRatio.toFixed(1)}%</p>
              </div>
            </div>
          </section>

          {/* 収支予測 */}
          <section className="card mb-6">
            <h2 className="section-title flex items-center gap-2">
              <span className="text-2xl">💰</span>
              収支予測
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">初期投資</p>
                  <p className="text-lg font-bold">
                    {Math.round(result.financialForecast.initialInvestment / 10000).toLocaleString()}万円
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">損益分岐点</p>
                  <p className="text-lg font-bold">
                    {result.financialForecast.breakEvenMonths < 100
                      ? `${result.financialForecast.breakEvenMonths}ヶ月`
                      : '要検討'}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">月間固定費</p>
                  <p className="text-lg font-bold text-red-600">
                    {Math.round(result.financialForecast.monthlyFixedCost / 10000).toLocaleString()}万円
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">月間変動費</p>
                  <p className="text-lg font-bold text-red-600">
                    {Math.round(result.financialForecast.monthlyVariableCost / 10000).toLocaleString()}万円
                  </p>
                </div>
              </div>
              <div className="bg-green-100 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">年間利益予測</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(result.financialForecast.yearlyProfit / 10000).toLocaleString()}万円
                </p>
              </div>
            </div>
          </section>

          {/* 戦略提案 */}
          <section className="card mb-6">
            <h2 className="section-title flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              戦略提案
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📣</span> 集客戦略
                </h3>
                <ul className="space-y-2">
                  {result.strategy.marketing.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>⚙️</span> オペレーション戦略
                </h3>
                <ul className="space-y-2">
                  {result.strategy.operation.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🍽️</span> メニュー提案
                </h3>
                <ul className="space-y-2">
                  {result.strategy.menuRecommendations.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* アクションボタン */}
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/genre" className="btn-outline flex-1 text-center">
              条件を変更して再シミュレーション
            </Link>
            <button className="btn-secondary flex-1" disabled>
              詳細シミュレーションへ（準備中）
            </button>
          </div>

          {/* 注意事項 */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
            <p className="font-bold mb-2">※ 注意事項</p>
            <ul className="space-y-1">
              <li>• この結果はあくまで簡易的なシミュレーションであり、実際の経営結果を保証するものではありません。</li>
              <li>• 詳細な事業計画の策定には、専門家への相談をお勧めします。</li>
              <li>• 数値は業界平均値を基に算出した概算です。</li>
            </ul>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 K SUN&apos;s - おみせ開業AI</p>
        </div>
      </footer>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </main>
    }>
      <ResultContent />
    </Suspense>
  );
}
