/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { HISTORY_TIMELINE } from '../constants';
import { SiteConfig } from '../types';
import { Heart, Compass, History, Network, MapPin, Award } from 'lucide-react';
import Logo from './Logo';

interface AboutSectionProps {
  config: SiteConfig;
  theme: any;
}

export default function AboutSection({ config, theme }: AboutSectionProps) {
  return (
    <div id="about-section" className="bg-slate-50 py-10 space-y-8">
      
      {/* 1. CEO Greeting Section (인사말) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Interactive CEO Profile Card */}
          <div className="lg:col-span-5 relative flex">
            <div className="relative bg-slate-900 text-white rounded-3xl p-8 sm:p-10 overflow-hidden shadow-sm border border-slate-800 flex flex-col justify-between w-full">
              <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
              
              {/* Subtle Logo Watermark background */}
              <div className="absolute right-6 bottom-6 w-32 h-32 opacity-[0.07] pointer-events-none text-white">
                <Logo variant="symbol" className="w-full h-full" />
              </div>

              <div className="relative z-10 space-y-8 flex-grow flex flex-col justify-between">
                <span className={`text-[10px] tracking-widest font-bold uppercase bg-white/10 px-3 py-1 rounded-full ${theme.text} self-start`}>CEO GREETING</span>
                <blockquote className="text-xl sm:text-2xl font-bold leading-normal tracking-tight my-6">
                  "순간의 약속도 순수하게 <br />
                  이행하여 끝까지 <br />
                  보답해 드립니다."
                </blockquote>
                <div className="pt-6 border-t border-slate-800 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400">대표이사</p>
                    <p className="text-2xl font-bold tracking-tight">{config.ceoName}</p>
                  </div>
                  {/* Small red seal emblem */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center p-1.5 bg-red-600/20 text-red-500 border border-red-500/30 shadow-inner">
                    <Logo variant="symbol" className="w-full h-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: CEO Message details inside white Bento card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/50 shadow-sm space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">CEO Message</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              안녕하십니까, <br />
              <span className="text-red-600 font-bold">{isCompany(config.companyName) ? config.companyName : '(주)순순'}</span> 대표 {config.ceoName}입니다.
            </h3>
            
            <div className="text-slate-600 space-y-4 text-xs sm:text-sm leading-relaxed font-normal">
              <p>
                오늘날 급변하는 유통 및 제조 시장에서 물류 도급 및 인재 아웃소싱은 더 이상 단순한 대행이 아닙니다. 비즈니스의 성공 유무를 결정짓는 중추이자, 핵심 전략 자산입니다.
              </p>
              <p>
                저희 <strong className="text-red-600 font-bold">(주)순순</strong>은 <b>'약속의 이행'과 '정밀한 관리'</b>를 사명으로 삼고, 고객사가 고부가가치 비즈니스에 전념하실 수 있도록 현장의 무결점 물류 인프라를 완비해 드립니다. 입출고의 속도, 재고 관리의 정확성, 현장 노무 이슈의 완벽한 예방에 이르기까지 당사의 엄격한 지표를 토대로 책임 운영을 약속합니다.
              </p>
              <p>
                한 번 맺은 인연을 가볍게 여기지 않고, 신뢰를 바탕으로 귀사의 가장 정교하고 튼튼한 날개가 되겠습니다. <strong className="text-red-600 font-bold">(주)순순</strong>과 함께 기업 경쟁력을 한 차원 높여보시기 바랍니다.
              </p>
              <p className="pt-4 font-bold text-slate-900 text-sm sm:text-base">
                <span className="text-red-600 font-bold">(주)순순</span> 임직원 일동 드림
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Vision & Values (비전) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-sm space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Vision</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">핵심 가치 및 미래 비전</h3>
            <p className="text-sm text-slate-500"><span className="text-red-600 font-bold">순순</span>이 추구하는 세 가지 경영 지표는 고객사의 신뢰와 효율로 보답합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: '순도 높은 신뢰 (Trust)',
                desc: '불필요한 타협이나 중간 관리의 혼선 없이, 고객사와 사전에 약속된 KPI(핵심 성과 지표) 기준을 정량적으로 입증하고 투명하게 공유합니다.',
                icon: Heart,
                color: 'text-rose-600',
                bg: 'bg-rose-50'
              },
              {
                title: '정밀한 가동성 (Accuracy)',
                desc: '현장 투입 전 철저한 직무 사전 교육과 현장 매니저(Supervisor) 제도를 의무화하여 인력 미스매칭과 생산성 누수를 완전히 제거합니다.',
                icon: Compass,
                color: 'text-blue-600',
                bg: 'bg-blue-50'
              },
              {
                title: '상생 협력 (Partnership)',
                desc: '단순 임금 대리 지급처가 아닌 근로 환경 개선과 투명한 노무 관리를 수반하여 임직원의 장기 근무를 유도하고 현장 리스크를 줄입니다.',
                icon: Award,
                color: 'text-amber-600',
                bg: 'bg-amber-50'
              }
            ].map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 space-y-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${val.bg}`}>
                    <IconComp className={`w-6 h-6 ${val.color}`} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">{val.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Organization Chart (조직도) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-sm space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Organization Chart</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900"><span className="text-red-600 font-bold">(주)순순</span> 조직도</h3>
            <p className="text-sm text-slate-500">
              각 분야의 전문 센터와 안전 감사 위원회를 산하에 두어, 유기적이고 안정적인 현장 운영을 자랑합니다.
            </p>
          </div>

          {/* Custom drawn responsive org chart with pure React components */}
          <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 sm:p-10 space-y-8 overflow-x-auto shadow-inner">
            <div className="min-w-[700px] flex flex-col items-center">
              
              {/* Level 1: CEO */}
              <div className="text-center">
                <div className={`px-8 py-3.5 rounded-xl text-white font-bold tracking-wide shadow ${theme.primary}`}>
                  대표이사 {config.ceoName}
                </div>
                <div className="w-0.5 h-8 bg-slate-300 mx-auto"></div>
              </div>

              {/* Level 2: Board & Advisors */}
              <div className="flex justify-center items-center w-full relative">
                <div className="grid grid-cols-4 gap-6 pt-8 w-11/12 max-w-5xl relative">
                  {/* Vertical connector line going down between 세무/회계 자문단 (Col 2) and 안전보건·준법 감시단 (Col 3) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-300"></div>

                  {/* Board Group Left 1 */}
                  <div className="text-center relative">
                    <div className="absolute -top-8 left-1/2 right-[-12px] h-0.5 bg-slate-300"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                    <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm text-xs font-bold text-slate-700">
                      전담 노무자문단
                    </div>
                  </div>

                  {/* Board Group Left 2 */}
                  <div className="text-center relative">
                    <div className="absolute -top-8 left-[-12px] right-[-12px] h-0.5 bg-slate-300"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                    <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm text-xs font-bold text-slate-700">
                      세무/회계 자문단
                    </div>
                  </div>

                  {/* Board Group Center */}
                  <div className="text-center relative">
                    <div className="absolute -top-8 left-[-12px] right-[-12px] h-0.5 bg-slate-300"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                    <div className="bg-white text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm text-xs font-bold">
                      안전보건·준법 감시단
                    </div>
                  </div>

                  {/* Board Group Right */}
                  <div className="text-center relative">
                    <div className="absolute -top-8 left-[-12px] right-1/2 h-0.5 bg-slate-300"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                    <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm text-xs font-bold text-slate-700">
                      전략경영기획 본부
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-0.5 h-12 bg-slate-300 mx-auto"></div>

              {/* Level 3: Department Divisions */}
              <div className="flex justify-center items-center w-full relative">
                <div className="grid grid-cols-5 gap-4 pt-8 w-full">
                  
                  {/* Dept 1 */}
                  <div className="text-center relative">
                    <div className="absolute -top-8 left-1/2 right-[-8px] h-0.5 bg-slate-300"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                    <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
                      <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">도급 본부</span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">물류 위탁도급 사업부</h5>
                      <p className="text-[10px] text-slate-400 font-normal">풀필먼트 운영, 현장 SV 관리</p>
                    </div>
                  </div>

                  {/* Dept 2: New 택배사업팀 */}
                  <div className="text-center relative">
                    <div className="absolute -top-8 left-[-8px] right-[-8px] h-0.5 bg-slate-300"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                    <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
                      <span className="text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">택배 사업</span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">택배사업팀</h5>
                      <p className="text-[10px] text-slate-400 font-normal">분류 지원, 집화 및 대리점 관리</p>
                    </div>
                  </div>

                  {/* Dept 3 */}
                  <div className="text-center relative">
                    <div className="absolute -top-8 left-[-8px] right-[-8px] h-0.5 bg-slate-300"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                    <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">아웃소싱</span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">HR 파견·공급 본부</h5>
                      <p className="text-[10px] text-slate-400 font-normal">전문 인재 매칭, 상시 수급 조율</p>
                    </div>
                  </div>

                  {/* Dept 4 */}
                  <div className="text-center relative">
                    <div className="absolute -top-8 left-[-8px] right-[-8px] h-0.5 bg-slate-300"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                    <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">운영 관리</span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">운영관리본부</h5>
                      <p className="text-[10px] text-slate-400 font-normal">현장 지표 수립, 프로세스 관리</p>
                    </div>
                  </div>

                  {/* Dept 5 */}
                  <div className="text-center relative">
                    <div className="absolute -top-8 left-[-8px] right-1/2 h-0.5 bg-slate-300"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                    <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
                      <span className="text-[9px] font-bold text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">재무 회계</span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">재무관리팀</h5>
                      <p className="text-[10px] text-slate-400 font-normal">예산 수립, 자금 집행 및 결산</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Corporate History (연혁) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-sm space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Corporate History</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900"><span className="text-red-600 font-bold">(주)순순</span> 연혁</h3>
            <p className="text-sm text-slate-500">신뢰와 실력으로 한걸음씩 쌓아 올린 상생 물류의 히스토리입니다.</p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto pt-6">
            {/* Vertical Center Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-slate-100"></div>

            <div className="space-y-12">
              {HISTORY_TIMELINE.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className="flex flex-col sm:flex-row items-center justify-between relative">
                    
                    {/* Left block (Only displays on even indexes on desktop) */}
                    <div className={`w-full sm:w-5/12 ${isEven ? 'sm:text-right' : 'sm:order-last sm:text-left'} space-y-1 order-last sm:order-none px-4`}>
                      <span className={`text-xl font-bold font-mono ${theme.text}`}>{item.year}</span>
                      <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                    </div>

                    {/* Timeline Center Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-slate-300 z-10 hidden sm:block">
                      <div className={`w-1.5 h-1.5 rounded-full ${theme.primary} mx-auto mt-0.5 animate-ping`}></div>
                    </div>

                    {/* Right spacer block to balance the flexbox */}
                    <div className="w-full sm:w-5/12 hidden sm:block"></div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Location / Directions (오시는 길) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-sm space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Location Map</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">오시는 길</h3>
            <p className="text-sm text-slate-500">편리한 교통 환경으로 언제든 방문과 상담이 원활합니다.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Details & Info */}
            <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">HEADQUARTER ADDRESS</span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{config.address}</p>
                </div>

                {/* Transportation guides */}
                <div className="space-y-4 border-t border-slate-200/60 pt-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center">2</span>
                      <span>지하철 이용 시</span>
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      2호선 <b>센텀시티역 4번 출구</b>에서 도보 8분 (약 550m 직진 후 우측) 또는 동해선 <b>센텀역 2번 출구</b>에서 도보 5분
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center font-mono">P</span>
                      <span>자가용/네비게이션 이용 시</span>
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      네비게이션에 <b>'벽산e센텀클래스원'</b> 검색. 건물 지하 주차장에 방문 차량 주차가 가능합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={`https://map.kakao.com/?q=${encodeURIComponent(config.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-xl bg-[#FEE500] hover:bg-[#EED000] text-[#191919] font-bold text-xs cursor-pointer transition-colors"
                >
                  카카오맵으로 길찾기
                </a>
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(config.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-xl bg-[#03C75A] hover:bg-[#02B34E] text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  네이버 지도로 열기
                </a>
              </div>
            </div>

            {/* Luxury Vector Drawn Mini Map Mock */}
            <div className="lg:col-span-7 bg-slate-100 border border-slate-200/60 rounded-3xl overflow-hidden min-h-[350px] relative p-8 flex flex-col justify-between shadow-inner">
              {/* Grid Backdrop for Map simulation */}
              <div className="absolute inset-0 bg-slate-100 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:30px_30px] opacity-70"></div>
              
              <div className="relative z-10 bg-white/95 backdrop-blur-sm shadow-sm border border-slate-200/50 rounded-lg p-2.5 max-w-[220px] text-[11px] space-y-1">
                <p className="font-bold text-slate-900">📍 <span className="text-red-600 font-bold">(주)순순</span> 본사</p>
                <p className="text-slate-500 leading-normal">{config.address}</p>
              </div>

              {/* Custom stylized map components using pure React elements */}
              <div className="relative w-full h-48 bg-slate-200/50 rounded-lg border border-slate-300/30 overflow-hidden">
                {/* Horizontal road */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-white border-y border-slate-300/60 flex items-center px-4 justify-between text-[10px] font-bold text-slate-400">
                  <span>수영강 방면</span>
                  <span className="tracking-wider">센 텀 동 로 (CENTUMDONG-RO)</span>
                  <span>벡스코 방면</span>
                </div>

                {/* Vertical road */}
                <div className="absolute left-1/3 -translate-x-1/2 top-0 bottom-0 w-8 bg-white border-x border-slate-300/60"></div>

                {/* Landmarks */}
                {/* MapPin / Target Office */}
                <div className="absolute left-[55%] top-[30%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full ${theme.primary} text-white flex items-center justify-center shadow-lg animate-bounce`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded shadow mt-1">
                    벽산e센텀클래스원 912호
                  </span>
                </div>

                {/* Subway icon Map station */}
                <div className="absolute left-1/3 top-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="bg-emerald-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px] shadow-sm">
                    2
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 block text-center -mt-0.5 bg-white px-1 rounded shadow-sm border border-emerald-100">
                    센텀시티역 (4번출구)
                  </span>
                </div>

                {/* Ground buildings */}
                <div className="absolute right-4 top-4 bg-white/80 border border-slate-200 rounded p-1.5 text-[9px] text-slate-500 font-medium">
                  🏢 센텀고등학교
                </div>
                <div className="absolute right-12 bottom-4 bg-white/80 border border-slate-200 rounded p-1.5 text-[9px] text-slate-500 font-medium">
                  🌳 APEC 나루공원
                </div>
                <div className="absolute left-4 bottom-4 bg-white/80 border border-slate-200 rounded p-1.5 text-[9px] text-slate-500 font-medium">
                  🏢 부산디자인진흥원
                </div>
              </div>

              <p className="relative z-10 text-[10px] text-slate-400 text-center italic font-medium">
                * 지도 정보가 올바르게 나오지 않을 경우, 좌측 하단의 Kakao/Naver 길찾기 전용 버튼을 이용해 주십시오.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function isCompany(name: string) {
  return name.includes('순순');
}
