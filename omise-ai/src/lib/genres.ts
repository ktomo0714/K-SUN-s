import { MainCategory } from '@/types';

export const genres: MainCategory[] = [
  {
    id: 'japanese',
    name: '和食',
    icon: '🍣',
    subCategories: [
      { id: 'sushi', name: '寿司', icon: '🍣' },
      { id: 'tempura', name: '天ぷら', icon: '🍤' },
      { id: 'ramen', name: 'ラーメン', icon: '🍜' },
      { id: 'udon', name: 'うどん・そば', icon: '🥢' },
      { id: 'izakaya', name: '居酒屋', icon: '🍶' },
      { id: 'yakitori', name: '焼鳥', icon: '🍢' },
      { id: 'tonkatsu', name: 'とんかつ', icon: '🥩' },
      { id: 'teishoku', name: '定食屋', icon: '🍱' },
    ],
  },
  {
    id: 'western',
    name: '洋食',
    icon: '🍝',
    subCategories: [
      { id: 'italian', name: 'イタリアン', icon: '🍝' },
      { id: 'french', name: 'フレンチ', icon: '🥐' },
      { id: 'steak', name: 'ステーキ', icon: '🥩' },
      { id: 'hamburg', name: 'ハンバーグ', icon: '🍔' },
      { id: 'yoshoku', name: '洋食屋', icon: '🍽️' },
    ],
  },
  {
    id: 'cafe',
    name: 'カフェ',
    icon: '☕',
    subCategories: [
      { id: 'coffee', name: 'コーヒー専門店', icon: '☕' },
      { id: 'sweets', name: 'スイーツカフェ', icon: '🍰' },
      { id: 'lunch', name: 'ランチカフェ', icon: '🥪' },
      { id: 'night', name: 'ナイトカフェ', icon: '🌙' },
    ],
  },
  {
    id: 'asian',
    name: 'アジア料理',
    icon: '🥟',
    subCategories: [
      { id: 'chinese', name: '中華料理', icon: '🥟' },
      { id: 'korean', name: '韓国料理', icon: '🥘' },
      { id: 'thai', name: 'タイ料理', icon: '🍛' },
      { id: 'vietnamese', name: 'ベトナム料理', icon: '🍜' },
      { id: 'indian', name: 'インド料理', icon: '🫓' },
    ],
  },
  {
    id: 'fastfood',
    name: 'ファストフード',
    icon: '🍔',
    subCategories: [
      { id: 'burger', name: 'ハンバーガー', icon: '🍔' },
      { id: 'pizza', name: 'ピザ', icon: '🍕' },
      { id: 'chicken', name: 'チキン', icon: '🍗' },
      { id: 'bento', name: '弁当・惣菜', icon: '🍱' },
    ],
  },
  {
    id: 'bar',
    name: 'バー・居酒屋',
    icon: '🍸',
    subCategories: [
      { id: 'bar', name: 'バー', icon: '🍸' },
      { id: 'wine', name: 'ワインバー', icon: '🍷' },
      { id: 'craft-beer', name: 'クラフトビール', icon: '🍺' },
      { id: 'standing', name: '立ち飲み', icon: '🥂' },
    ],
  },
];

export const locationOptions = [
  { value: 'station', label: '駅前・駅近', description: '通勤客や買い物客が多い' },
  { value: 'office', label: 'オフィス街', description: 'ランチ需要が高い' },
  { value: 'residential', label: '住宅街', description: 'リピーター獲得しやすい' },
  { value: 'shopping', label: '商業施設内', description: '集客力が高い' },
  { value: 'roadside', label: 'ロードサイド', description: '駐車場確保で車客狙い' },
];
