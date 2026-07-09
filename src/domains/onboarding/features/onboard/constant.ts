export const TOTAL_PROGRESS_STEP = 5;

export const ONBOARD_COUNTRY_OPTIONS = [
  { id: 1, name: '프랑스' },
  { id: 2, name: '미국' },
  { id: 3, name: '영국' },
  { id: 5, name: '일본' },
  { id: 6, name: '호주' },
] as const;

export const INTEREST_CITY_OPTIONS_BY_COUNTRY_ID = {
  1: [
    { id: 101, name: '파리' },
    { id: 102, name: '리옹' },
    { id: 103, name: '마르세유' },
  ],
  2: [
    { id: 201, name: '뉴욕' },
    { id: 202, name: '로스앤젤레스' },
    { id: 203, name: '보스턴' },
  ],
  3: [
    { id: 301, name: '런던' },
    { id: 302, name: '맨체스터' },
    { id: 303, name: '에든버러' },
  ],
  4: [
    { id: 401, name: '베를린' },
    { id: 402, name: '뮌헨' },
    { id: 403, name: '함부르크' },
  ],
  5: [
    { id: 501, name: '도쿄' },
    { id: 502, name: '오사카' },
    { id: 503, name: '교토' },
  ],
  6: [
    { id: 601, name: '시드니' },
    { id: 602, name: '멜버른' },
    { id: 603, name: '브리즈번' },
  ],
} as const;

export const EXCHANGE_SCHOOL_OPTIONS_BY_COUNTRY_ID = {
  1: [
    { id: 1001, name: '소르본 대학교' },
    { id: 1002, name: '파리 시테 대학교' },
  ],
  2: [
    { id: 2001, name: '뉴욕 대학교' },
    { id: 2002, name: '보스턴 대학교' },
  ],
  3: [
    { id: 3001, name: '런던 대학교' },
    { id: 3002, name: '맨체스터 대학교' },
  ],
  4: [
    { id: 4001, name: '베를린 자유대학교' },
    { id: 4002, name: '뮌헨 대학교' },
  ],
  5: [
    { id: 5001, name: '와세다 대학교' },
    { id: 5002, name: '게이오 대학교' },
  ],
  6: [
    { id: 6001, name: '시드니 대학교' },
    { id: 6002, name: '멜버른 대학교' },
  ],
} as const;
