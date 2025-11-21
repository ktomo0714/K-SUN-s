'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">おみせ開業AI</h1>
          <p className="text-center mt-2 text-blue-100">
            〜あなたの夢を、実現可能なビジネスプランに。〜
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* イントロセクション */}
          <section className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              飲食店開業の夢を
              <br className="md:hidden" />
              具体的なプランに
            </h2>
            <p className="text-gray-600 text-lg">
              漠然とした開業の夢を、AIが具体的なビジネスプランに変えます。
              <br />
              まずは簡易シミュレーションで、あなたの夢を形にしてみましょう。
            </p>
          </section>

          {/* アクション選択 */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            {/* 簡易シミュレーション */}
            <div className="card border-2 border-transparent hover:border-primary">
              <div className="text-center">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  簡易シミュレーション
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  登録不要で今すぐ開始できます。
                  <br />
                  夢のイメージを簡単な開業プランとして具体化しましょう。
                </p>
                <Link href="/genre" className="btn-primary inline-block">
                  今すぐ始める
                </Link>
              </div>
            </div>

            {/* ログイン */}
            <div className="card border-2 border-transparent hover:border-secondary">
              <div className="text-center">
                <div className="text-5xl mb-4">👤</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  ログイン
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  すでにアカウントをお持ちの方は
                  <br />
                  ログインして続きから始められます。
                </p>
                <button className="btn-outline" disabled>
                  ログイン（準備中）
                </button>
              </div>
            </div>
          </section>

          {/* 機能説明 */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="section-title text-center mb-8">
              簡易シミュレーションでわかること
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">💡</div>
                <h4 className="font-bold text-gray-800 mb-2">コンセプト提案</h4>
                <p className="text-sm text-gray-600">
                  あなたの店の特徴や差別化ポイントを明確にします
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <h4 className="font-bold text-gray-800 mb-2">KPI予測</h4>
                <p className="text-sm text-gray-600">
                  売上・来客数・回転率などの重要指標を算出します
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💰</div>
                <h4 className="font-bold text-gray-800 mb-2">収支予測</h4>
                <p className="text-sm text-gray-600">
                  初期投資から月次収支、損益分岐点まで試算します
                </p>
              </div>
            </div>
          </section>

          {/* ステップ説明 */}
          <section className="mt-12">
            <h3 className="section-title text-center mb-8">シミュレーションの流れ</h3>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                  1
                </div>
                <p className="text-sm font-medium">ジャンル選択</p>
              </div>
              <div className="hidden md:block text-gray-300 text-2xl">→</div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                  2
                </div>
                <p className="text-sm font-medium">基本情報入力</p>
              </div>
              <div className="hidden md:block text-gray-300 text-2xl">→</div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                  3
                </div>
                <p className="text-sm font-medium">結果表示</p>
              </div>
            </div>
          </section>
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
