import CrossLineSquare from '../../../public/svg/CrossLineSquare';
import Paper from '../../../public/svg/Paper';

export const FontFamily: { [key: string]: string } = {
  Pretendard: 'font-Pretendard',
  GmarketSans: 'font-Gmarket Sans',
  'S-CoreDream': 'font-S-CoreDream',
  NPSfontBold: 'font-NPSfontBold',
  NanumSquare: 'font-NanumSquare',
  NotoSansKR: 'font-NotoSansKR',
  Chosunilbo_myungjo: 'font-Chosunilbo_myungjo',
  'KBO-Dia-Gothic': 'font-KBO-Dia-Gothic',
  BMJUA: 'font-BMJUA',
  Hahmlet: 'font-Hahmlet',
  GyeonggiTitle: 'font-GyeonggiTitle',
};

export const Fonts = [
  {
    name: '',
    text: '기본 폰트',
  },
  {
    name: 'Pretendard',
    text: '프리텐다드',
  },
  {
    name: 'GmarketSans',
    text: 'Gmarket Sans',
  },
  {
    name: 'S-CoreDream',
    text: '에스코어드림',
  },
  {
    name: 'NPSfontBold',
    text: '국민연금체',
  },
  {
    name: 'NanumSquare',
    text: '나눔스퀘어',
  },
  {
    name: 'NotoSansKR',
    text: '본고딕',
  },
  {
    name: 'Chosunilbo_myungjo',
    text: '조선일보명조체',
  },
  {
    name: 'KBO-Dia-Gothic',
    text: 'KBO 다이아고딕체',
  },
  {
    name: 'BMJUA',
    text: '주아체',
  },
  {
    name: 'Hahmlet',
    text: '함렛',
  },
  {
    name: 'GyeonggiTitle',
    text: '경기천년제목',
  },
];

export const SidebarMenus = [
  {
    name: 'display',
    text: '페이지 편집',
    svg: <Paper />,
    svgSelected: <Paper color="#8000ff" />,
  },
  {
    name: 'form',
    text: '폼 편집',
    svg: <CrossLineSquare />,
    svgSelected: <CrossLineSquare color="#8000ff" />,
  },
] as const;

export const FONT_SIZE = [
  { id: 10, value: '10px' },
  { id: 12, value: '12px' },
  { id: 14, value: '14px' },
  { id: 16, value: '16px' },
  { id: 18, value: '18px' },
  { id: 20, value: '20px' },
  { id: 24, value: '24px' },
  { id: 30, value: '30px' },
  { id: 36, value: '36px' },
  { id: 40, value: '40px' },
  { id: 48, value: '48px' },
  { id: 60, value: '60px' },
];

export const PALETTE_COLOR = [
  [
    { id: '#000000', value: '#000000' },
    { id: '#434343', value: '#434343' },
    { id: '#666666', value: '#666666' },
    { id: '#999999', value: '#999999' },
    { id: '#B7B7B7', value: '#B7B7B7' },
    { id: '#CCCCCC', value: '#CCCCCC' },
    { id: '#D9D9D9', value: '#D9D9D9' },
    { id: '#EFEFEF', value: '#EFEFEF' },
    { id: '#F3F3F3', value: '#F3F3F3' },
    { id: '#FFFFFF', value: '#FFFFFF' },
  ],
  [
    { id: '#980000', value: '#980000' },
    { id: '#FF0000', value: '#FF0000' },
    { id: '#FF9900', value: '#FF9900' },
    { id: '#FFFF00', value: '#FFFF00' },
    { id: '#03FF00', value: '#03FF00' },
    { id: '#03FFFF', value: '#03FFFF' },
    { id: '#4A85E8', value: '#4A85E8' },
    { id: '#0000FF', value: '#0000FF' },
    { id: '#9900FF', value: '#9900FF' },
    { id: '#FF00FF', value: '#FF00FF' },
  ],
  [
    { id: '#E6B8AF', value: '#E6B8AF' },
    { id: '#F5CBCC', value: '#F5CBCC' },
    { id: '#FCE5CD', value: '#FCE5CD' },
    { id: '#FFF2CC', value: '#FFF2CC' },
    { id: '#D9EAD3', value: '#D9EAD3' },
    { id: '#D0DFE2', value: '#D0DFE2' },
    { id: '#C9DEF8', value: '#C9DEF8' },
    { id: '#D0E2F3', value: '#D0E2F3' },
    { id: '#D4D2E9', value: '#D4D2E9' },
    { id: '#EAD1DC', value: '#EAD1DC' },
  ],
  [
    { id: '#DD7E6B', value: '#DD7E6B' },
    { id: '#E99999', value: '#E99999' },
    { id: '#F9CB9C', value: '#F9CB9C' },
    { id: '#FFE598', value: '#FFE598' },
    { id: '#B5D7A8', value: '#B5D7A8' },
    { id: '#A2C4C9', value: '#A2C4C9' },
    { id: '#A4C2F4', value: '#A4C2F4' },
    { id: '#9FC5E8', value: '#9FC5E8' },
    { id: '#B4A6D7', value: '#B4A6D7' },
    { id: '#D5A6BD', value: '#D5A6BD' },
  ],
  [
    { id: '#A61D01', value: '#A61D01' },
    { id: '#CC0100', value: '#CC0100' },
    { id: '#E69138', value: '#E69138' },
    { id: '#F2C231', value: '#F2C231' },
    { id: '#6AA84F', value: '#6AA84F' },
    { id: '#45818E', value: '#45818E' },
    { id: '#3C78D8', value: '#3C78D8' },
    { id: '#3D85C6', value: '#3D85C6' },
    { id: '#674EA7', value: '#674EA7' },
    { id: '#A64D79', value: '#A64D79' },
  ],
  [
    { id: '#5B0F00', value: '#5B0F00' },
    { id: '#660000', value: '#660000' },
    { id: '#783F04', value: '#783F04' },
    { id: '#7F6001', value: '#7F6001' },
    { id: '#284E13', value: '#284E13' },
    { id: '#0C343D', value: '#0C343D' },
    { id: '#264D8C', value: '#264D8C' },
    { id: '#073763', value: '#073763' },
    { id: '#20124D', value: '#20124D' },
    { id: '#4D1130', value: '#4D1130' },
  ],
];
