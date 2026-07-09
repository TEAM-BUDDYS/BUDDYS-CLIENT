export interface PreferenceTag {
  id: number;
  name: string;
}

// TODO: 태그 목록 API 연동 후 서버 응답 id로 변경
export const ACTIVITY_TAGS = [
  { id: 1, name: '여행' },
  { id: 2, name: '맛집 탐방' },
  { id: 3, name: '카페 탐방' },
  { id: 4, name: '쇼핑' },
  { id: 5, name: '문화생활' },
  { id: 6, name: '사진 촬영' },
  { id: 7, name: '공부' },
  { id: 8, name: '파티' },
  { id: 9, name: '언어교환' },
  { id: 10, name: '생활 도움' },
  { id: 11, name: '투어' },
  { id: 12, name: '운동' },
] satisfies PreferenceTag[];

export const INTEREST_TAGS = [
  { id: 101, name: '자연' },
  { id: 102, name: '도시' },
  { id: 103, name: '예술' },
  { id: 104, name: '게임' },
  { id: 105, name: '영화' },
  { id: 106, name: '음악' },
  { id: 107, name: '운동' },
  { id: 108, name: '요리' },
  { id: 109, name: '역사' },
  { id: 110, name: '패션' },
  { id: 111, name: '사진' },
  { id: 112, name: '독서' },
  { id: 113, name: '휴양' },
  { id: 114, name: '액티비티' },
] satisfies PreferenceTag[];

export const COMPANION_STYLE_TAGS = [
  { id: 201, name: '계획형' },
  { id: 202, name: '즉흥형' },
  { id: 203, name: '아침형' },
  { id: 204, name: '저녁형' },
  { id: 205, name: '조용한' },
  { id: 206, name: '활발한' },
  { id: 207, name: '여유롭게' },
  { id: 208, name: '알차게' },
  { id: 209, name: '각자 다니기' },
  { id: 210, name: '함께 다니기' },
] satisfies PreferenceTag[];
