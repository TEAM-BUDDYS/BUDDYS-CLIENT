export const TOTAL_STEP = 4;

// TODO: 국가 목록 API 연동 후 삭제
export const COUNTRY_OPTIONS = [
  '미국',
  '영국',
  '프랑스',
  '독일',
  '일본',
  '호주',
];

// TODO: 도시 검색 API 연동 후 삭제
export const CITY_OPTIONS = ['서울'];

export const STEP_CONTENTS = [
  {
    title: '어느 국가에서 동행을 구하시나요?',
    description: '한글 검색이 안 될 경우 영어로 검색해주세요.',
  },
  {
    title: '어느 도시에서 동행을 구하시나요?',
    description: '한글 검색이 안 될 경우 영어로 검색해주세요.',
  },
  {
    title: '어떤 일정으로 계획하고 계신가요?',
    description: '동행할 날짜를 선택해주세요',
  },
] as const;
