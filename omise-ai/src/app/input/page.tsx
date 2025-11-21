'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { genres, locationOptions } from '@/lib/genres';
import { BasicInfo, LocationType } from '@/types';

function InputForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mainCategory = searchParams.get('main');
  const subCategory = searchParams.get('sub');

  const mainGenre = genres.find((g) => g.id === mainCategory);
  const subGenre = mainGenre?.subCategories.find((s) => s.id === subCategory);

  const [formData, setFormData] = useState<BasicInfo>({
    seats: 20,
    unitPrice: 1500,
    openingHours: '11:00-22:00',
    location: 'station',
    targetCustomer: '',
    specialFeature: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.seats < 1 || formData.seats > 500) {
      newErrors.seats = '席数は1〜500の範囲で入力してください';
    }
    if (formData.unitPrice < 100 || formData.unitPrice > 100000) {
      newErrors.unitPrice = '客単価は100〜100,000円の範囲で入力してください';
    }
    if (!formData.openingHours) {
      newErrors.openingHours = '営業時間を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const params = new URLSearchParams({
        main: mainCategory || '',
        sub: subCategory || '',
        seats: formData.seats.toString(),
        unitPrice: formData.unitPrice.toString(),
        openingHours: formData.openingHours,
        location: formData.location,
        targetCustomer: formData.targetCustomer,
        specialFeature: formData.specialFeature,
      });
      router.push(`/result?${params.toString()}`);
    }
  };

  if (!mainGenre || !subGenre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">ジャンルが選択されていません</p>
          <Link href="/genre" className="btn-primary">
            ジャンル選択に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <Link href={`/genre`} className="text-sm hover:underline">
            ← ジャンル選択に戻る
          </Link>
          <h1 className="text-2xl font-bold text-center mt-2">基本情報入力</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* ステップインジケーター */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <span className="text-sm text-green-600">ジャンル</span>
              <div className="w-8 h-1 bg-primary mx-2"></div>
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span className="text-sm font-medium text-primary">基本情報</span>
              <div className="w-8 h-1 bg-gray-300 mx-2"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-sm text-gray-500">結果</span>
            </div>
          </div>

          {/* 選択済みジャンル表示 */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">{mainGenre.icon}</span>
            <span className="text-gray-600">→</span>
            <span className="text-2xl">{subGenre.icon}</span>
            <span className="font-medium text-gray-800">
              {mainGenre.name} / {subGenre.name}
            </span>
          </div>

          {/* 入力フォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 席数 */}
            <div className="card">
              <label className="label">
                席数 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.seats}
                onChange={(e) =>
                  setFormData({ ...formData, seats: parseInt(e.target.value) || 0 })
                }
                className={`input-field ${errors.seats ? 'border-red-500' : ''}`}
                min="1"
                max="500"
              />
              {errors.seats && (
                <p className="text-red-500 text-sm mt-1">{errors.seats}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                想定する座席数を入力してください
              </p>
            </div>

            {/* 客単価 */}
            <div className="card">
              <label className="label">
                客単価（円） <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unitPrice: parseInt(e.target.value) || 0,
                  })
                }
                className={`input-field ${errors.unitPrice ? 'border-red-500' : ''}`}
                min="100"
                max="100000"
                step="100"
              />
              {errors.unitPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                お客様一人当たりの平均支払額
              </p>
            </div>

            {/* 営業時間 */}
            <div className="card">
              <label className="label">
                営業時間 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.openingHours}
                onChange={(e) =>
                  setFormData({ ...formData, openingHours: e.target.value })
                }
                className={`input-field ${
                  errors.openingHours ? 'border-red-500' : ''
                }`}
                placeholder="例: 11:00-22:00"
              />
              {errors.openingHours && (
                <p className="text-red-500 text-sm mt-1">{errors.openingHours}</p>
              )}
            </div>

            {/* 立地イメージ */}
            <div className="card">
              <label className="label">
                立地イメージ <span className="text-red-500">*</span>
              </label>
              <div className="grid gap-3">
                {locationOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.location === option.value
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="location"
                      value={option.value}
                      checked={formData.location === option.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: e.target.value as LocationType,
                        })
                      }
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* ターゲット顧客 */}
            <div className="card">
              <label className="label">ターゲット顧客（任意）</label>
              <input
                type="text"
                value={formData.targetCustomer}
                onChange={(e) =>
                  setFormData({ ...formData, targetCustomer: e.target.value })
                }
                className="input-field"
                placeholder="例: 30代のビジネスマン、子連れファミリー"
              />
            </div>

            {/* 特徴・こだわり */}
            <div className="card">
              <label className="label">特徴・こだわり（任意）</label>
              <textarea
                value={formData.specialFeature}
                onChange={(e) =>
                  setFormData({ ...formData, specialFeature: e.target.value })
                }
                className="input-field min-h-[100px]"
                placeholder="例: 産地直送の新鮮な食材、手作りにこだわった料理"
              />
            </div>

            {/* 送信ボタン */}
            <button type="submit" className="btn-primary w-full text-lg py-4">
              シミュレーション結果を見る
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function InputPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <InputForm />
    </Suspense>
  );
}
