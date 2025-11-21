// 飲食店ジャンルの型定義
export interface MainCategory {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
}

// 基本情報入力の型定義
export interface BasicInfo {
  seats: number;           // 席数
  unitPrice: number;       // 客単価
  openingHours: string;    // 営業時間
  location: LocationType;  // 立地イメージ
  targetCustomer: string;  // ターゲット顧客
  specialFeature: string;  // 特徴・こだわり
}

export type LocationType =
  | 'station'      // 駅前
  | 'office'       // オフィス街
  | 'residential'  // 住宅街
  | 'shopping'     // 商業施設内
  | 'roadside';    // ロードサイド

// シミュレーション入力の型定義
export interface SimulationInput {
  mainCategory: string;
  subCategory: string;
  basicInfo: BasicInfo;
}

// シミュレーション結果の型定義
export interface SimulationResult {
  concept: ConceptResult;
  kpi: KPIResult;
  strategy: StrategyResult;
  financialForecast: FinancialForecast;
}

export interface ConceptResult {
  storeName: string;        // 店舗名案
  concept: string;          // コンセプト
  targetMessage: string;    // ターゲットへのメッセージ
  uniquePoints: string[];   // 差別化ポイント
}

export interface KPIResult {
  monthlyRevenue: number;       // 月間売上予測
  dailyCustomers: number;       // 日次来客数
  turnoverRate: number;         // 回転率
  averageSpending: number;      // 平均客単価
  laborCostRatio: number;       // 人件費率
  foodCostRatio: number;        // 原価率
  rentRatio: number;            // 家賃比率
}

export interface StrategyResult {
  marketing: string[];          // 集客戦略
  operation: string[];          // オペレーション戦略
  menuRecommendations: string[]; // メニュー提案
}

export interface FinancialForecast {
  initialInvestment: number;    // 初期投資
  monthlyFixedCost: number;     // 月間固定費
  monthlyVariableCost: number;  // 月間変動費
  breakEvenMonths: number;      // 損益分岐点（月数）
  yearlyProfit: number;         // 年間利益予測
}

// APIレスポンスの型定義
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
