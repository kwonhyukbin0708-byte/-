/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Notice, Portfolio, Inquiry, SiteConfig } from './types';
import port1Img from './assets/images/ecommerce_fulfillment_hub_1782369849849.jpg';
import port2Img from './assets/images/cj_one_d_zone_warehouse_1782370457660.jpg';
import port3Img from './assets/images/lastmile_delivery_terminal_1782369878787.jpg';
import port4Img from './assets/images/parcel_sorting_line_1782378709883.jpg';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  companyName: '(주)순순',
  companyNameEng: 'SoonSoon Co., Ltd.',
  mainSlogan: '사람을 연결하고, 현장을 완성합니다.',
  subSlogan: '순순, 사람과 현장을 하나로',
  accentColor: 'red',
  phone: '051-782-0122',
  email: 'soonsoon@soonsoon.co.kr',
  fax: '051-783-0122',
  address: '부산광역시 해운대구 센텀동로 99, 벽산e센텀클래스원 912호',
  registrationNumber: '765-81-03215',
  ceoName: '권혁빈',
  kakaoLink: 'https://pf.kakao.com',
  instagramLink: 'https://instagram.com',
  linkedinLink: 'https://linkedin.com'
};

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'notice-1',
    title: '[공지] (주)순순 공식 웹사이트 리뉴얼 및 고객 지원 강화 안내',
    content: `안녕하세요, (주)순순 임직원 및 고객 여러분.
당사 비즈니스의 성장과 고객 서비스 만족도 극대화를 위해 공식 웹사이트를 리뉴얼 오픈하였습니다.
이번 리뉴얼을 통해 실시간 온라인 견적 문의 기능과 포트폴리오 관리 시스템이 고도화되었습니다.
앞으로도 최고의 물류 파트너로서 신뢰와 만족을 드리기 위해 최선을 다하겠습니다.
감사합니다.`,
    writer: '관리자',
    date: '2026-06-20',
    viewCount: 142,
    isImportant: true
  },
  {
    id: 'notice-2',
    title: '[인증] ISO 9001 품질경영시스템 인증 획득 안내',
    content: `(주)순순이 물류 도급 서비스 및 업무 대행 부문에서 ISO 9001:2015 품질경영시스템 인증을 획득하였습니다.
이번 인증은 당사의 체계적인 창고 관리와 인력 아웃소싱 가이드라인이 글로벌 표준 규격에 적합함을 입증한 결과입니다.
더욱 엄격하고 정밀한 관리를 통해 무결점 물류 서비스를 약속드립니다.`,
    writer: '경영지원팀',
    date: '2026-05-15',
    viewCount: 95,
    isImportant: true
  },
  {
    id: 'notice-3',
    title: '2026년 상반기 물류 전문 인력 공개 채용 및 위탁 교육 실시',
    content: `(주)순순에서 대형 물류 허브 및 저온 물류창고 도급 운영 관리를 담당할 전문 인력을 모집합니다.
선발된 인원은 자체 아웃소싱 교육원 시스템을 통해 창고관리시스템(WMS), 지게차 안전 정비 교육을 거쳐 즉시 현장에 투입될 예정입니다.
많은 관심과 지원 부탁드립니다.`,
    writer: '인사팀',
    date: '2026-04-10',
    viewCount: 218,
    isImportant: false
  }
];

export const INITIAL_PORTFOLIO: Portfolio[] = [
  {
    id: 'port-1',
    title: 'CJ대한통운 ONE본부 E2 권역 도급 계약',
    client: 'CJ대한통운',
    category: '물류도급',
    date: '2023.07.01',
    description: 'CJ대한통운 ONE(O-NE) 본부 E2 권역의 풀필먼트 및 허브 분류 도급 전 과정을 총괄 운영합니다. 숙련된 인적 자원과 효율적인 공정 분담을 통해 실시간 입출고 정확도 99.9%를 달성하고 고효율 현장 제어를 정착시켰습니다.',
    imageUrl: port1Img,
    highlights: ['실시간 입출고 정확도 99.9%', 'O-NE 오퍼레이션 완벽 매칭', '분류 가공 리드타임 단축', '현장 오차율 ZERO화 실현']
  },
  {
    id: 'port-2',
    title: 'CJ대한통운 ONE본부 D권역 도급 계약',
    client: 'CJ대한통운',
    category: '물류도급',
    date: '2026.03.31',
    description: 'CJ대한통운 주요 터미널 D권역의 허브 상하차, 입출고 및 분류 도급 운영을 대행합니다. 정밀한 인력 수급과 체계적인 조별 순환 근무 시스템을 도입하여 성수기 물동량 폭증에도 가동률 100%를 달성했습니다.',
    imageUrl: port2Img,
    highlights: ['D권역 허브 오퍼레이션 대행', '성수기 물동량 가동률 100%', '교대 정밀 배치 시스템 운영', '산업 안전 보건 기준 철저 이행']
  },
  {
    id: 'port-3',
    title: 'CJ대한통운 울산동구 서부집배점 운영',
    client: 'CJ대한통운 울산동구 서부집배점',
    category: '업무 대행',
    date: '2026.01.01',
    description: '울산동구 서부집배점의 배송 및 라스트마일 허브 오퍼레이터 전문 인력 도급 및 순환 관리를 책임 운영합니다. 현장 대체 인력의 신속한 조달 시스템을 통해 결원율 0%를 기록하며 일일 배송 출발 마감 타임을 완벽 준수하고 있습니다.',
    imageUrl: port3Img,
    highlights: ['라스트마일 전담 인력 공급', '배송 출발 마감 타임 준수 100%', '현장 대체 인력 상시 대기', '안정적인 장기 파트너십 구축']
  },
  {
    id: 'port-4',
    title: 'CJ대한통운 택배대리점 분류도우미 계약',
    client: 'CJ대한통운',
    category: '인력 아웃소싱',
    date: '2023.02.01',
    description: '물류 터미널 내 분류도우미 전담 인력을 일일 집중 배치하여 신속하고 정확한 포장 분류 공정을 지원합니다. 근골격계 안전사고 예방 교육과 스트레칭 프로그램을 상시 병행하여 무재해 1,000일 돌파 성과를 일궈냈습니다.',
    imageUrl: port4Img,
    highlights: ['자동 컨베이어 분류 지원', '무재해 운영 1,000일 돌파', '현장 안전 교육 주기적 이행', '정확한 시간당 처리율 달성']
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    companyName: '(주)미래유통',
    requester: '박민우 팀장',
    phone: '010-1234-5678',
    email: 'mwpark@mirae.com',
    serviceType: '물류도급',
    message: '인천에 위치한 신축 의류 물류센터(약 2,000평 규모)의 입출고 및 검수 공정에 대한 도급 위탁 비용과 상주 인력 가이드라인 제안을 요청드립니다.',
    budget: '협의 후 결정',
    date: '2026-06-23',
    status: 'received'
  },
  {
    id: 'inq-2',
    companyName: '삼정프레시',
    requester: '이지혜 과장',
    phone: '010-9876-5432',
    email: 'jhlee@samjung.co.kr',
    serviceType: '창고 관리',
    message: '용인 저온 창고의 콜드체인 포장 및 야간 분류 도급 가능 여부와 단가표 확인을 희망합니다. 현재 일일 평균 3천 건 가량 유통되고 있습니다.',
    budget: '월 5,000만원 내외',
    date: '2026-06-22',
    status: 'in_progress'
  }
];

export const SERVICE_DETAILS = [
  {
    title: '물류도급 (Logistics Contract)',
    icon: 'Package',
    description: '입고부터 재고 관리, 피킹, 패킹, 최종 출고까지 물류센터 내 모든 공정을 최적의 KPI 지표에 맞춰 책임지고 위탁 운영합니다.',
    details: [
      '풀필먼트 센터 전 과정 맞춤형 위탁 운영',
      '전문 현장 관리자(Supervisor) 밀착 배치',
      'WMS(창고관리시스템) 및 PDA 정밀 리딩 연동',
      '지속적인 공정 분석을 통한 리드 타임 단축'
    ]
  },
  {
    title: '창고 관리 (Warehouse Control)',
    icon: 'Warehouse',
    description: '상온, 저온, 냉동 등 최적의 창고 컨디션 유지와 엄격한 재고 실사 시스템을 결합하여 자산 가치 유실을 방지합니다.',
    details: [
      '선입선출(FIFO) 기반 유통 기한/배치 관리',
      '콜드체인 냉동·냉장 정밀 검수 시스템',
      '정기 재고 실사 대행 및 손실률 미니멀화',
      '소방 및 산업안전 관리 가이드라인 완벽 이행'
    ]
  },
  {
    title: '인력 아웃소싱 (HR Outsourcing)',
    icon: 'Users',
    description: '검증된 맞춤형 전문 인력 풀을 확보하여 비즈니스 급성장기나 계절적 성수기에 발생할 수 있는 인력 부족 문제를 완벽히 해결합니다.',
    details: [
      '철저히 교육된 특수 지게차 및 오퍼레이터 매칭',
      '성수기 긴급 대체 인력 가동 네트워크 가동',
      '근로 기준법 준수 및 노무 리스크 제로화',
      '근무 태도 및 가동률 모니터링 리포트 제공'
    ]
  },
  {
    title: '업무 대행 (Business Proxy)',
    icon: 'Shuffle',
    description: '기업의 비핵심 업무를 위탁 대행하여 핵심 역량에 집중할 수 있도록 포장 가공, 조립, 부대 서비스 등 맞춤 공정을 설계합니다.',
    details: [
      '제품 라벨링, 박스 조립, 세트 상품 재포장 대행',
      '공장 내 최종 검수 및 출하 검사 지원',
      '정기 보고서를 통한 비용 절감 성과 투명 공개',
      '고객사 요청에 맞춘 맞춤형 조립 가이드 적용'
    ]
  }
];

export const HISTORY_TIMELINE = [
  { year: '2026', title: '브랜드 가치 혁신', desc: '실시간 물류 예측 관제 및 도급 관리 플랫폼 구축.' },
  { year: '2025', title: '사업 및 아웃소싱 다각화', desc: '메가 풀필먼트 도급 위탁 사업부 신설, 협력사 50개사 돌파.' },
  { year: '2024', title: '(주)순순 설립', desc: '전문 물류 도급 및 인력 공급 인허가 획득 및 법인 설립.' }
];

export const CORE_STRENGTHS = [
  {
    title: '정밀한 무결점 운영',
    desc: '독자적인 작업 가이드라인과 3단계 검수 공정을 통해 오배송율 및 불량률을 최저치로 유지합니다.',
    icon: 'CheckCircle'
  },
  {
    title: '유연한 인력 공급망',
    desc: '전국 5,000명 이상의 숙련된 물류인력 데이터베이스를 활용하여 성수기 긴급 수요에도 당일 충원 가능합니다.',
    icon: 'Users'
  },
  {
    title: '완벽한 리스크 관리',
    desc: '노무 법인과의 상시 자문을 통해 근로 기준 및 산업 안전 보건법을 철저히 준수하여 리스크를 원천 차단합니다.',
    icon: 'ShieldAlert'
  },
  {
    title: '체계적인 원가 절감',
    desc: '자체 생산성 지표 분석 툴을 통해 동선을 최적화하고 공정별 생산 시간을 측정하여 고객사 위탁 비용을 절감합니다.',
    icon: 'TrendingUp'
  }
];
