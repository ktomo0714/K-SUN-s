import { NextRequest, NextResponse } from 'next/server';
import { SimulationInput, SimulationResult } from '@/types';
import { genres } from '@/lib/genres';

// 業種別の基本パラメータ
const industryParams: Record<string, {
  foodCostRatio: number;
  laborCostRatio: number;
  rentRatio: number;
  turnoverRate: number;
  initialInvestmentPerSeat: number;
}> = {
  // 和食
  sushi: { foodCostRatio: 0.35, laborCostRatio: 0.30, rentRatio: 0.10, turnoverRate: 2.0, initialInvestmentPerSeat: 80000 },
  tempura: { foodCostRatio: 0.32, laborCostRatio: 0.28, rentRatio: 0.10, turnoverRate: 2.5, initialInvestmentPerSeat: 70000 },
  ramen: { foodCostRatio: 0.30, laborCostRatio: 0.25, rentRatio: 0.12, turnoverRate: 4.0, initialInvestmentPerSeat: 50000 },
  udon: { foodCostRatio: 0.28, laborCostRatio: 0.25, rentRatio: 0.12, turnoverRate: 3.5, initialInvestmentPerSeat: 45000 },
  izakaya: { foodCostRatio: 0.30, laborCostRatio: 0.28, rentRatio: 0.10, turnoverRate: 1.5, initialInvestmentPerSeat: 60000 },
  yakitori: { foodCostRatio: 0.28, laborCostRatio: 0.28, rentRatio: 0.10, turnoverRate: 2.0, initialInvestmentPerSeat: 55000 },
  tonkatsu: { foodCostRatio: 0.32, laborCostRatio: 0.26, rentRatio: 0.10, turnoverRate: 3.0, initialInvestmentPerSeat: 50000 },
  teishoku: { foodCostRatio: 0.30, laborCostRatio: 0.26, rentRatio: 0.12, turnoverRate: 3.5, initialInvestmentPerSeat: 45000 },
  // 洋食
  italian: { foodCostRatio: 0.32, laborCostRatio: 0.28, rentRatio: 0.10, turnoverRate: 2.0, initialInvestmentPerSeat: 70000 },
  french: { foodCostRatio: 0.35, laborCostRatio: 0.30, rentRatio: 0.08, turnoverRate: 1.5, initialInvestmentPerSeat: 100000 },
  steak: { foodCostRatio: 0.38, laborCostRatio: 0.25, rentRatio: 0.10, turnoverRate: 2.0, initialInvestmentPerSeat: 80000 },
  hamburg: { foodCostRatio: 0.32, laborCostRatio: 0.26, rentRatio: 0.12, turnoverRate: 3.0, initialInvestmentPerSeat: 50000 },
  yoshoku: { foodCostRatio: 0.30, laborCostRatio: 0.26, rentRatio: 0.12, turnoverRate: 3.0, initialInvestmentPerSeat: 50000 },
  // カフェ
  coffee: { foodCostRatio: 0.25, laborCostRatio: 0.30, rentRatio: 0.12, turnoverRate: 3.0, initialInvestmentPerSeat: 60000 },
  sweets: { foodCostRatio: 0.28, laborCostRatio: 0.28, rentRatio: 0.12, turnoverRate: 2.5, initialInvestmentPerSeat: 65000 },
  lunch: { foodCostRatio: 0.30, laborCostRatio: 0.28, rentRatio: 0.12, turnoverRate: 2.5, initialInvestmentPerSeat: 55000 },
  night: { foodCostRatio: 0.28, laborCostRatio: 0.30, rentRatio: 0.10, turnoverRate: 1.5, initialInvestmentPerSeat: 70000 },
  // アジア料理
  chinese: { foodCostRatio: 0.30, laborCostRatio: 0.26, rentRatio: 0.10, turnoverRate: 3.0, initialInvestmentPerSeat: 55000 },
  korean: { foodCostRatio: 0.32, laborCostRatio: 0.26, rentRatio: 0.10, turnoverRate: 2.5, initialInvestmentPerSeat: 55000 },
  thai: { foodCostRatio: 0.28, laborCostRatio: 0.26, rentRatio: 0.10, turnoverRate: 2.5, initialInvestmentPerSeat: 50000 },
  vietnamese: { foodCostRatio: 0.28, laborCostRatio: 0.26, rentRatio: 0.10, turnoverRate: 2.5, initialInvestmentPerSeat: 50000 },
  indian: { foodCostRatio: 0.28, laborCostRatio: 0.26, rentRatio: 0.10, turnoverRate: 2.5, initialInvestmentPerSeat: 55000 },
  // ファストフード
  burger: { foodCostRatio: 0.30, laborCostRatio: 0.28, rentRatio: 0.12, turnoverRate: 4.0, initialInvestmentPerSeat: 50000 },
  pizza: { foodCostRatio: 0.28, laborCostRatio: 0.26, rentRatio: 0.12, turnoverRate: 3.0, initialInvestmentPerSeat: 55000 },
  chicken: { foodCostRatio: 0.32, laborCostRatio: 0.26, rentRatio: 0.12, turnoverRate: 4.0, initialInvestmentPerSeat: 45000 },
  bento: { foodCostRatio: 0.35, laborCostRatio: 0.24, rentRatio: 0.12, turnoverRate: 5.0, initialInvestmentPerSeat: 35000 },
  // バー
  bar: { foodCostRatio: 0.22, laborCostRatio: 0.30, rentRatio: 0.10, turnoverRate: 1.5, initialInvestmentPerSeat: 80000 },
  wine: { foodCostRatio: 0.35, laborCostRatio: 0.28, rentRatio: 0.10, turnoverRate: 1.5, initialInvestmentPerSeat: 85000 },
  'craft-beer': { foodCostRatio: 0.30, laborCostRatio: 0.28, rentRatio: 0.10, turnoverRate: 2.0, initialInvestmentPerSeat: 75000 },
  standing: { foodCostRatio: 0.28, laborCostRatio: 0.26, rentRatio: 0.10, turnoverRate: 3.0, initialInvestmentPerSeat: 40000 },
};

// 立地による補正係数
const locationMultiplier: Record<string, { rent: number; customer: number }> = {
  station: { rent: 1.3, customer: 1.2 },
  office: { rent: 1.2, customer: 1.1 },
  residential: { rent: 0.8, customer: 0.9 },
  shopping: { rent: 1.5, customer: 1.3 },
  roadside: { rent: 0.7, customer: 1.0 },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mainCategory, subCategory, basicInfo }: SimulationInput = body;

    // パラメータ取得
    const params = industryParams[subCategory] || industryParams.teishoku;
    const locMulti = locationMultiplier[basicInfo.location] || locationMultiplier.station;

    // 営業時間から営業時間数を計算
    const hoursMatch = basicInfo.openingHours.match(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/);
    let operatingHours = 11; // デフォルト
    if (hoursMatch) {
      const startHour = parseInt(hoursMatch[1]);
      const endHour = parseInt(hoursMatch[3]);
      operatingHours = endHour > startHour ? endHour - startHour : 24 - startHour + endHour;
    }

    // KPI計算
    const dailyCustomers = Math.round(basicInfo.seats * params.turnoverRate * locMulti.customer);
    const monthlyRevenue = dailyCustomers * basicInfo.unitPrice * 25; // 月25営業日
    const yearlyRevenue = monthlyRevenue * 12;

    // コスト計算
    const monthlyFoodCost = monthlyRevenue * params.foodCostRatio;
    const monthlyLaborCost = monthlyRevenue * params.laborCostRatio;
    const monthlyRent = monthlyRevenue * params.rentRatio * locMulti.rent;
    const monthlyOtherCost = monthlyRevenue * 0.08; // 水道光熱費、消耗品等
    const monthlyFixedCost = monthlyRent + monthlyLaborCost * 0.7 + monthlyOtherCost * 0.5;
    const monthlyVariableCost = monthlyFoodCost + monthlyLaborCost * 0.3 + monthlyOtherCost * 0.5;

    // 初期投資計算
    const initialInvestment = basicInfo.seats * params.initialInvestmentPerSeat;

    // 月間利益計算
    const monthlyProfit = monthlyRevenue - monthlyFoodCost - monthlyLaborCost - monthlyRent - monthlyOtherCost;
    const yearlyProfit = monthlyProfit * 12;

    // 損益分岐点（月数）
    const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(initialInvestment / monthlyProfit) : 999;

    // ジャンル名取得
    const mainGenre = genres.find(g => g.id === mainCategory);
    const subGenre = mainGenre?.subCategories.find(s => s.id === subCategory);
    const genreName = `${mainGenre?.name || ''} ${subGenre?.name || ''}`.trim();

    // AIによるコンセプト生成（実際の実装ではOpenAI APIを使用）
    const concept = generateConcept(genreName, basicInfo, subCategory);
    const strategy = generateStrategy(genreName, basicInfo, locMulti);

    const result: SimulationResult = {
      concept,
      kpi: {
        monthlyRevenue: Math.round(monthlyRevenue),
        dailyCustomers,
        turnoverRate: params.turnoverRate,
        averageSpending: basicInfo.unitPrice,
        laborCostRatio: params.laborCostRatio * 100,
        foodCostRatio: params.foodCostRatio * 100,
        rentRatio: params.rentRatio * locMulti.rent * 100,
      },
      strategy,
      financialForecast: {
        initialInvestment: Math.round(initialInvestment),
        monthlyFixedCost: Math.round(monthlyFixedCost),
        monthlyVariableCost: Math.round(monthlyVariableCost),
        breakEvenMonths,
        yearlyProfit: Math.round(yearlyProfit),
      },
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Simulation error:', error);
    return NextResponse.json(
      { success: false, error: 'シミュレーション処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

// コンセプト生成（簡易版）
function generateConcept(
  genreName: string,
  basicInfo: SimulationInput['basicInfo'],
  subCategory: string
): SimulationResult['concept'] {
  const locationNames: Record<string, string> = {
    station: '駅前',
    office: 'オフィス街',
    residential: '住宅街',
    shopping: '商業施設',
    roadside: 'ロードサイド',
  };

  const storeNamePrefix: Record<string, string> = {
    ramen: '麺屋',
    sushi: '鮨処',
    izakaya: '酒場',
    cafe: 'カフェ',
    coffee: 'コーヒーハウス',
    italian: 'リストランテ',
    french: 'ビストロ',
    bar: 'バー',
  };

  const prefix = storeNamePrefix[subCategory] || 'お店';
  const storeName = `${prefix}・○○（仮）`;

  const concept = basicInfo.specialFeature
    ? `${basicInfo.specialFeature}を活かした${genreName}店。${locationNames[basicInfo.location]}の立地を活かし、${basicInfo.targetCustomer || '地域のお客様'}に愛される店づくりを目指します。`
    : `${locationNames[basicInfo.location]}で展開する${genreName}店。${basicInfo.seats}席のアットホームな空間で、本格的な味をお手頃価格で提供します。`;

  const targetMessage = basicInfo.targetCustomer
    ? `${basicInfo.targetCustomer}に向けて、くつろげる空間と満足のいく料理を提供します。`
    : '地域に愛される、何度も来たくなるお店を目指します。';

  const uniquePoints = [
    `客単価${basicInfo.unitPrice.toLocaleString()}円のコストパフォーマンス`,
    `${locationNames[basicInfo.location]}という好立地`,
    `${basicInfo.seats}席で目の届くサービス`,
  ];

  if (basicInfo.specialFeature) {
    uniquePoints.unshift(basicInfo.specialFeature);
  }

  return {
    storeName,
    concept,
    targetMessage,
    uniquePoints,
  };
}

// 戦略生成（簡易版）
function generateStrategy(
  genreName: string,
  basicInfo: SimulationInput['basicInfo'],
  locMulti: { rent: number; customer: number }
): SimulationResult['strategy'] {
  const marketing: string[] = [];
  const operation: string[] = [];
  const menuRecommendations: string[] = [];

  // 立地別マーケティング戦略
  switch (basicInfo.location) {
    case 'station':
      marketing.push('駅看板・のぼり旗での視認性向上');
      marketing.push('モバイルオーダー・テイクアウト対応');
      marketing.push('SNS映えするメニュー開発');
      break;
    case 'office':
      marketing.push('ランチタイムの回転率重視オペレーション');
      marketing.push('法人向け宴会プランの開発');
      marketing.push('Googleマップ・食べログでの上位表示対策');
      break;
    case 'residential':
      marketing.push('地域密着型のイベント参加');
      marketing.push('ポスティング・地域情報誌への掲載');
      marketing.push('リピーター向けポイントカード制度');
      break;
    case 'shopping':
      marketing.push('施設内イベントとの連動企画');
      marketing.push('ファミリー向けメニューの充実');
      marketing.push('施設のポイントシステム活用');
      break;
    case 'roadside':
      marketing.push('目立つ外観・看板デザイン');
      marketing.push('駐車場の確保と案内表示');
      marketing.push('ドライブスルー・テイクアウト強化');
      break;
  }

  // オペレーション戦略
  operation.push('食材の一括仕入れによるコスト削減');
  operation.push('ピークタイム対応のシフト最適化');
  operation.push('POSシステムによる在庫・売上管理');

  if (basicInfo.seats > 30) {
    operation.push('キッチン動線の効率化');
    operation.push('パート・アルバイトの教育システム構築');
  }

  // メニュー提案
  menuRecommendations.push(`看板メニュー（客単価${Math.round(basicInfo.unitPrice * 0.8).toLocaleString()}円）の開発`);
  menuRecommendations.push('季節限定メニューによるリピート促進');
  menuRecommendations.push('ドリンク・サイドメニューの利益率向上');

  return {
    marketing,
    operation,
    menuRecommendations,
  };
}
