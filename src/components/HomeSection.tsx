/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Users, ShieldAlert, TrendingUp, ChevronRight, Award, HelpCircle, ChevronDown } from 'lucide-react';
import { SiteConfig, Notice, Portfolio } from '../types';
import Logo from './Logo';

interface HomeSectionProps {
  config: SiteConfig;
  notices: Notice[];
  portfolios: Portfolio[];
  setCurrentSection: (section: string) => void;
  setSelectedNotice: (notice: Notice | null) => void;
  theme: any;
  showAdminMenu?: boolean;
}

export default function HomeSection({
  config,
  notices,
  portfolios,
  setCurrentSection,
  setSelectedNotice,
  theme,
  showAdminMenu = false
}: HomeSectionProps) {
  const [activeDetails, setActiveDetails] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false
  });
  const [hoveredDetails, setHoveredDetails] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false
  });

  const toggleDetail = (index: number) => {
    setActiveDetails(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const setHoverDetail = (index: number, isHovered: boolean) => {
    setHoveredDetails(prev => ({
      ...prev,
      [index]: isHovered
    }));
  };

  const isVisible = (index: number) => {
    return activeDetails[index] || hoveredDetails[index];
  };
  
  // Real-time metrics
  const stats = [
    { label: '누적 위탁 도급 규모', value: '150억', desc: '체계적 예산 및 단가 관리' },
    { label: '연간 누적 물동량', value: '1.4억 건+', desc: '택배 물류 도급 분류/출고 총량' },
    { label: '협력 파트너사', value: '50+', desc: '대기업 및 중견 유통사 신뢰' },
    { label: '인력 평균 가동률', value: '99.8%', desc: '결원 즉각 대체 관리율' },
  ];

  const strengths = [
    {
      title: '현장 맞춤형 전문 인력 매칭',
      desc: '물류 현장의 특성을 완벽히 이해하는 준비된 인력을 매칭하며, 풍부한 도급 및 아웃소싱 노하우로 피크 시즌의 급격한 물량 변동에도 안정적 공급을 보장합니다.',
      icon: Users
    },
    {
      title: '종합 물류 시너지 솔루션',
      desc: '자체 운영관리팀과 택배사업팀의 유기적인 시너지를 통해, 현장 인력 케어부터 실제 물류 배송 연계 프로세스까지 단일 채널로 원스톱 최적화합니다.',
      icon: TrendingUp
    },
    {
      title: '고정비 절감 및 리스크 관리',
      desc: '인력 채용, 교육, 급여, 4대 보험 등 복잡한 행정 및 노무 리스크를 순순이 100% 전담하여 고정비를 유연한 유동비로 전환해 드립니다.',
      icon: ShieldAlert
    },
    {
      title: '철저한 현장 중심 밀착 케어',
      desc: '단순 공급을 넘어 현장 관리자의 밀착 케어로 인력 이탈을 방지하고 생산성을 높여, 오배송율 감소와 높은 업무 연속성 및 신뢰도를 달성합니다.',
      icon: CheckCircle
    }
  ];

  return (
    <div id="home-section" className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-6 lg:py-10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Texts Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-sm relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-20 -mt-20 z-0 opacity-40"></div>
              <div className="relative z-10 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-1.5 border border-slate-200/60"
                >
                  <span className={`flex h-2 w-2 rounded-full ${theme.primary} animate-pulse`}></span>
                  <span className="text-xs font-semibold text-slate-700 tracking-wider">
                    물류·아웃소싱 <span className="text-red-600 font-bold">(주)순순</span>
                  </span>
                </motion.div>

                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-keep"
                  >
                    {config.mainSlogan.split(',').map((part, i) => (
                      <span key={i} className="block">
                        {part}
                        {i === 0 && <span className={theme.text}>,</span>}
                      </span>
                    ))}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base text-slate-500 max-w-xl font-normal leading-relaxed break-keep"
                  >
                    {config.subSlogan}
                  </motion.p>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    id="hero-btn-contact"
                    onClick={() => setCurrentSection('contact')}
                    className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-white font-semibold shadow-sm cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5 ${theme.primary} ${theme.hover}`}
                  >
                    <span>무료 견적 문의하기</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    id="hero-btn-services"
                    onClick={() => setCurrentSection('services')}
                    className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 cursor-pointer hover:bg-slate-50 transition-all duration-200"
                  >
                    <span>당사 핵심 서비스 보기</span>
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Right Graphics: Interactive dashboard teaser / statistics card with clean border */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-sm p-8 space-y-6 relative overflow-hidden flex flex-col justify-between h-full"
              >
                {/* Floating gradient circle in background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full -mr-10 -mt-10 z-0 opacity-20"></div>
                
                <div className="relative z-10 flex justify-between items-center pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Live Control Panel</h3>
                    <p className="text-lg font-bold text-white tracking-tight">당사 종합 성과 현황</p>
                  </div>
                  <span className="text-xs bg-white/10 text-slate-300 px-2.5 py-1 rounded-full font-medium">실시간 집계</span>
                </div>

                <div className="text-[11px] text-slate-400 font-normal leading-normal bg-slate-950/30 p-2.5 rounded-xl border border-slate-800/40 relative z-10 flex items-start gap-1.5">
                  <span className="text-red-400">💡</span>
                  <span>항목을 클릭하거나 마우스를 올려 세부 관리 지표를 확인해 보세요.</span>
                </div>

                <div className="relative z-10 space-y-5">
                  {/* Indicator 1 */}
                  <div 
                    className="space-y-1.5 p-2.5 -mx-2.5 rounded-xl transition-all duration-200 hover:bg-slate-800/30 cursor-pointer group"
                    onClick={() => toggleDetail(1)}
                    onMouseEnter={() => setHoverDetail(1, true)}
                    onMouseLeave={() => setHoverDetail(1, false)}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs font-semibold text-slate-300 gap-1 sm:gap-2">
                      <span className="flex items-center gap-1 group-hover:text-white transition-colors break-keep">
                        인력 운영 효율성 및 공급 안정성 지표
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isVisible(1) ? 'rotate-90 text-red-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      </span>
                      <span className={`${theme.text} font-bold whitespace-nowrap shrink-0`}>98% (요청 대비 적기 투입)</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${theme.primary}`} style={{ width: '98%' }}></div>
                    </div>
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={isVisible(1) ? { height: 'auto', opacity: 1, marginTop: 8 } : { height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 pt-1 text-[10px] text-slate-400 font-normal leading-tight border-t border-slate-800/30 pt-2 break-keep">
                        <div>
                          <span className="block text-slate-500 font-semibold mb-0.5">인력 공급률 (Fill Rate)</span>
                          <span className="text-slate-300">요청 대비 적기 투입 98%</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold mb-0.5">근속 및 이탈률 관리</span>
                          <span className="text-slate-300">현장 숙련도·고용 안정화</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold mb-0.5">물동량 인력 탄력성</span>
                          <span className="text-slate-300">피크 시즌 상시 신속 대응</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Indicator 2 */}
                  <div 
                    className="space-y-1.5 p-2.5 -mx-2.5 rounded-xl transition-all duration-200 hover:bg-slate-800/30 cursor-pointer group pt-2.5 border-t border-slate-800/40"
                    onClick={() => toggleDetail(2)}
                    onMouseEnter={() => setHoverDetail(2, true)}
                    onMouseLeave={() => setHoverDetail(2, false)}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs font-semibold text-slate-300 gap-1 sm:gap-2">
                      <span className="flex items-center gap-1 group-hover:text-white transition-colors break-keep">
                        인사·노무 리스크 제로(Zero) 및 환경·안전(HSE) 준수율
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isVisible(2) ? 'rotate-90 text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      </span>
                      <span className="text-emerald-400 font-bold whitespace-nowrap shrink-0">100% 무결점</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: '100%' }}></div>
                    </div>
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={isVisible(2) ? { height: 'auto', opacity: 1, marginTop: 8 } : { height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 pt-1 text-[10px] text-slate-400 font-normal leading-tight border-t border-slate-800/30 pt-2 break-keep">
                        <div>
                          <span className="block text-slate-500 font-semibold mb-0.5">노무 리스크 발생률(0%)</span>
                          <span className="text-slate-300">근로기준법 완벽 준수</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold mb-0.5">안전사고 발생률</span>
                          <span className="text-slate-300">현장 사고 및 재해 Zero</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold mb-0.5">안전·보건 교육 이수율</span>
                          <span className="text-slate-300">정기 안전 교육 100%</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Indicator 3 */}
                  <div 
                    className="space-y-1.5 p-2.5 -mx-2.5 rounded-xl transition-all duration-200 hover:bg-slate-800/30 cursor-pointer group pt-2.5 border-t border-slate-800/40"
                    onClick={() => toggleDetail(3)}
                    onMouseEnter={() => setHoverDetail(3, true)}
                    onMouseLeave={() => setHoverDetail(3, false)}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs font-semibold text-slate-300 gap-1 sm:gap-2">
                      <span className="flex items-center gap-1 group-hover:text-white transition-colors break-keep">
                        현장 밀착형 전문 관리자(PM) 배치 및 현장 안정화 지표
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isVisible(3) ? 'rotate-90 text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      </span>
                      <span className="text-blue-400 font-bold whitespace-nowrap shrink-0">99.8% 달성</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-blue-500" style={{ width: '99.8%' }}></div>
                    </div>
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={isVisible(3) ? { height: 'auto', opacity: 1, marginTop: 8 } : { height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 pt-1 text-[10px] text-slate-400 font-normal leading-tight border-t border-slate-800/30 pt-2 break-keep">
                        <div>
                          <span className="block text-slate-500 font-semibold mb-0.5">전담 PM 배치율</span>
                          <span className="text-slate-300">신규·기존 현장 99.8%</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold mb-0.5">고객 소통 만족도</span>
                          <span className="text-slate-300">실시간 이슈 즉각 조치</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold mb-0.5">현장 생산성 향상</span>
                          <span className="text-slate-300">업무 오차 최소화 달성</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="relative z-10 bg-slate-950/40 p-4 rounded-xl space-y-2 border border-slate-800/60 mt-4">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
                    <Award className={`w-4 h-4 ${theme.text}`} />
                    <span><span className="text-red-500 font-bold">(주)순순</span>만의 3대 신뢰 보장 마크</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                    본 데이터는 고객사 정기 피드백 실사 지표를 근거로 상시 업데이트되며, 투명하게 입증 가능합니다.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} id={`stat-${idx}`} className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm text-center space-y-2 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase break-keep">{stat.label}</p>
              <p className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${theme.text} whitespace-nowrap`}>{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium break-keep">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Strengths */}
      <section className="py-12 lg:py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Core Value</h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 break-keep">
              기업들이 물류 파트너로 <br />
              <span className="text-red-600 font-extrabold">(주)순순</span>을 선택하는 이유
            </p>
            <p className="text-sm text-slate-500 break-keep">
              차별화된 현장 중심 관리와 현장 리스크 최소화 역량으로 최적의 비용 대비 생산성을 보여드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((str, idx) => {
              const IconComp = str.icon;
              return (
                <div
                  key={idx}
                  id={`strength-card-${idx}`}
                  className="bg-white p-8 rounded-3xl border border-slate-200/50 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 group space-y-5"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${theme.lightBg}`}>
                    <IconComp className={`w-6 h-6 ${theme.text}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-950 transition-colors duration-200 break-keep">{str.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-normal break-keep">{str.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mini CMS Notice Widget & Quick Consult banner */}
      <section className="py-6 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Notice Widget */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/50 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 pb-3 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                    <span>공지사항 및 중요 동향</span>
                    {showAdminMenu && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.lightBg} ${theme.text}`}>CMS 연동</span>
                    )}
                  </h3>
                  {showAdminMenu && (
                    <button
                      onClick={() => {
                        setCurrentSection('admin');
                      }}
                      className="text-xs text-slate-400 hover:text-slate-900 transition-colors flex items-center cursor-pointer font-semibold self-start sm:self-auto"
                    >
                      <span>CMS 제어센터</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {notices.slice(0, 3).map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => setSelectedNotice(notice)}
                      className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 cursor-pointer transition-all duration-200 group gap-3"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center space-x-2 min-w-0">
                          {notice.isImportant && (
                            <span className="text-[10px] font-bold bg-red-100 text-red-700 border border-red-200/50 px-1.5 py-0.5 rounded-md shrink-0">
                              중요
                            </span>
                          )}
                          <h4 className="text-sm font-semibold text-slate-800 group-hover:text-slate-950 transition-colors truncate">
                            {notice.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 font-normal truncate">{notice.writer} · {notice.date}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Consult Card */}
            <div className={`lg:col-span-5 ${theme.primary} rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between border ${config.accentColor === 'slate' ? 'border-slate-700' : 'border-slate-100/10'} shadow-sm`}>
              <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
              
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-white inline-block">Inquiry Portal</span>
                <h4 className="text-2xl font-bold tracking-tight leading-snug text-white break-keep">
                  귀사에 최적화된 맞춤형 <br />
                  도급 설계서를 받아보세요.
                </h4>
                <p className="text-xs text-white/80 leading-relaxed font-normal break-keep">
                  <strong className="text-amber-300 font-extrabold">(주)순순</strong>의 전담 수석 컨설턴트들이 원가 설계 및 효율 분석 모델을 통해 무료로 초안 포트폴리오를 제공합니다.
                </p>
              </div>

              <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/20 mt-6">
                <div className="space-y-0.5">
                  <p className="text-[10px] text-white/60 font-mono">DIRECT HOTLINE</p>
                  <p className="text-lg font-bold font-mono tracking-tight text-white">{config.phone}</p>
                </div>
                <button
                  id="home-btn-goto-contact"
                  onClick={() => setCurrentSection('contact')}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer bg-white text-slate-900 hover:bg-slate-50 transition-all duration-200"
                >
                  <span>견적 신청서 접수</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-900" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Real Looking Client Partner Logos with Infinite Moving Animation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-hidden relative">
        <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-left {
            animation: marquee-left 50s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 50s linear infinite;
          }
          .pause-on-hover:hover .marquee-track {
            animation-play-state: paused;
          }
        `}</style>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/50 shadow-sm text-center space-y-8 relative overflow-hidden">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600">With Valued Partners</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight"><span className="text-red-600">순순</span>과 함께 성장하는 든든한 파트너사</h3>
          </div>

          {/* Left/Right fading gradient overlays for elegant transition */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-white via-white/70 to-transparent pointer-events-none z-10" />

          {/* Helper render block to avoid duplicating SVG code */}
          {(() => {
            const partnersList = [
              { name: '씨제이대한통운', brand: 'CJ_LOGISTICS', isCJ: true },
              { name: '롯데택배', brand: 'LOTTE_GLOBAL', isLotte: true },
              { name: '한진택배', brand: 'HANJIN_LOGISTICS', isHanjin: true },
              { name: '다인로지스틱스', brand: 'DAIN_LOGISTICS', isDain: true },
              { name: '세이브택스', brand: 'SAVETAX', isSaveTax: true },
              { name: '노무법인 평로', brand: 'PYEONG_RO', isPyeongro: true },
              { name: '한국생활물류택배서비스협회', brand: 'KLLCA', isKllca: true },
              { name: '암웨이', brand: 'AMWAY', isAmway: true },
              { name: '(주)용원물류', brand: 'YONGWON_LOGIS', isYongwon: true },
              { name: 'SB물류', brand: 'SB_LOGISTICS', isSB: true },
              { name: '남울산(CJ)대리점', brand: 'NAMULSAN_CJ', isNamulsanCJ: true },
              { name: '강동대리점', brand: 'GANGDONG_DELIVERY', isGangdong: true },
              { name: '(주)스마트로지스', brand: 'SMART_LOGIS', isSmartLogis: true },
              { name: '로지스LK', brand: 'LOGIS_LK', isLogisLK: true },
              { name: '코렉스통운', brand: 'KOREX_TRANS', isKorex: true },
              { name: '위니즈컴퍼니', brand: 'WINIZ', isWiniz: true },
              { name: '마린보이푸드', brand: 'MARINE_BOY_FOOD', isMarineBoy: true },
              { name: '레져타운', brand: 'LEISURE_TOWN', isLeisureTown: true },
              { name: '중앙유통', brand: 'JUNGANG_DIST', isJungang: true },
              { name: '쿠키샵', brand: 'COOKIE_SHOP', isCookieShop: true },
              { name: '명진푸드', brand: 'MYEONGJIN_FOOD', isMyeongjin: true },
              { name: '매곡코렉스', brand: 'MAEGOK_KOREX', isMaegokKorex: true },
              { name: '(주)상상커머스', brand: 'SANGSANG_COMMERCE', isSangsang: true },
              { name: '번창물류', brand: 'BEONCHANG_LOGIS', isBeonchang: true },
              { name: '에스투워크스(주)', brand: 'S2WORKS', isS2Works: true },
              { name: '씨제이택배 거제점', brand: 'GEOJE_CJ', isGeojeCJ: true },
              { name: '옥동시찌다', brand: 'SHICHIDA_OKDONG', isOkdongShichida: true }
            ];

            const renderPartnerCard = (partner: typeof partnersList[0], key: string | number) => (
              <div
                key={key}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center space-y-2.5 grayscale hover:grayscale-0 hover:bg-white hover:border-slate-200 transition-all duration-300 min-h-[125px] w-[180px] sm:w-[220px] shrink-0"
              >
                {partner.isCJ ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 135 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <text x="4" y="66" fill="#000000" fontSize="54" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-5">CJ</text>
                      <path d="M 0 8 C -11 8, -13 -10, 0 -20 C 13 -10, 11 8, 0 8 Z" fill="#0072CE" transform="translate(86, 36) rotate(-35)" />
                      <path d="M 0 8 C -11 8, -13 -10, 0 -20 C 13 -10, 11 8, 0 8 Z" fill="#FF9E1B" transform="translate(112, 46) rotate(60)" />
                      <path d="M 0 8 C -11 8, -13 -10, 0 -20 C 13 -10, 11 8, 0 8 Z" fill="#E41A22" transform="translate(94, 66) rotate(165)" />
                    </svg>
                  </div>
                ) : partner.isLotte ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <rect x="5" y="15" width="40" height="40" rx="8" fill="#E11B22" />
                      <path d="M 18 27 C 18 27, 24 23, 29 27 C 32 29, 32 35, 26 41 C 21 46, 21 51, 32 51" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                      <text x="52" y="44" fill="#1E293B" fontSize="24" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5">LOTTE</text>
                      <text x="52" y="55" fill="#E11B22" fontSize="9" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">글로벌로지스</text>
                    </svg>
                  </div>
                ) : partner.isDain ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 12 22 L 32 22 C 40 22, 45 28, 45 35 C 45 42, 40 48, 32 48 L 12 48 Z" stroke="#2563EB" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M 22 28 L 29 35 L 22 42" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="50" y="38" fill="#1E293B" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">DAIN</text>
                      <text x="50" y="50" fill="#2563EB" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.5">다인로지스틱스</text>
                    </svg>
                  </div>
                ) : partner.isHanjin ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <circle cx="25" cy="35" r="18" stroke="#003399" strokeWidth="4.5" fill="none" />
                      <path d="M 14 35 C 14 35, 25 25, 36 35" stroke="#003399" strokeWidth="4" strokeLinecap="round" fill="none" />
                      <path d="M 14 35 C 14 35, 25 45, 36 35" stroke="#003399" strokeWidth="4" strokeLinecap="round" fill="none" />
                      <circle cx="25" cy="35" r="4" fill="#003399" />
                      <text x="50" y="42" fill="#003399" fontSize="23" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-1">HANJIN</text>
                      <text x="50" y="53" fill="#64748B" fontSize="10" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0">한진택배</text>
                    </svg>
                  </div>
                ) : partner.isSaveTax ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 12 30 L 26 18 L 40 30 L 40 45 C 40 55, 26 62, 26 62 C 26 62, 12 55, 12 45 Z" fill="#0F766E" />
                      <path d="M 20 38 L 25 43 L 33 32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="50" y="42" fill="#0F766E" fontSize="21" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5">SaveTax</text>
                      <text x="50" y="53" fill="#64748B" fontSize="10" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0">세이브택스</text>
                    </svg>
                  </div>
                ) : partner.isPyeongro ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <rect x="23" y="18" width="4" height="34" rx="2" fill="#1E293B" />
                      <line x1="12" y1="26" x2="38" y2="26" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
                      <path d="M 12 26 L 12 42" stroke="#D97706" strokeWidth="2.5" />
                      <path d="M 7 42 C 7 47, 17 47, 17 42 Z" fill="#D97706" />
                      <path d="M 38 26 L 38 42" stroke="#D97706" strokeWidth="2.5" />
                      <path d="M 33 42 C 33 47, 43 47, 43 42 Z" fill="#D97706" />
                      <text x="50" y="38" fill="#1E293B" fontSize="16" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5">노무법인</text>
                      <text x="50" y="54" fill="#D97706" fontSize="18" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">평로</text>
                    </svg>
                  </div>
                ) : partner.isKllca ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <circle cx="25" cy="35" r="17" stroke="#1D4ED8" strokeWidth="4" fill="none" />
                      <path d="M 8 35 C 8 20, 42 20, 42 35 C 42 50, 8 50, 8 35" stroke="#F97316" strokeWidth="3" fill="none" />
                      <path d="M 40 31 L 44 35 L 39 39" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="48" y="34" fill="#1D4ED8" fontSize="12" fontWeight="900" fontFamily="system-ui, -apple-system, 'Malgun Gothic', sans-serif" letterSpacing="-0.5">한국생활물류</text>
                      <text x="48" y="47" fill="#1E293B" fontSize="11" fontWeight="800" fontFamily="system-ui, -apple-system, 'Malgun Gothic', sans-serif" letterSpacing="-0.5">택배서비스협회</text>
                      <text x="48" y="58" fill="#F97316" fontSize="9" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">KLLCA</text>
                    </svg>
                  </div>
                ) : partner.isAmway ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 8 48 C 16 32, 28 32, 36 48" stroke="#004B87" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                      <path d="M 14 42 C 22 28, 32 28, 40 42" stroke="#00A3E0" strokeWidth="4" strokeLinecap="round" fill="none" />
                      <text x="48" y="42" fill="#004B87" fontSize="23" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-1">Amway</text>
                      <text x="48" y="53" fill="#64748B" fontSize="10" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">한국암웨이</text>
                    </svg>
                  </div>
                ) : partner.isYongwon ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 15 25 L 40 50 L 15 75" stroke="#1E3A8A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <path d="M 35 25 L 60 50 L 35 75" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="75" y="44" fill="#1E3A8A" fontSize="22" fontWeight="900" fontFamily="system-ui, sans-serif">YW</text>
                      <text x="75" y="62" fill="#64748B" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">용원물류</text>
                    </svg>
                  </div>
                ) : partner.isSB ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <rect x="10" y="20" width="45" height="45" rx="10" fill="#6D28D9" />
                      <text x="18" y="51" fill="#FFFFFF" fontSize="26" fontWeight="900" fontFamily="system-ui, sans-serif">SB</text>
                      <text x="65" y="44" fill="#1E293B" fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif">SB물류</text>
                      <text x="65" y="56" fill="#7C3AED" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.5">LOGISTICS</text>
                    </svg>
                  </div>
                ) : partner.isNamulsanCJ ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 10 50 C 20 30, 30 30, 40 50" stroke="#0072CE" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                      <path d="M 25 45 C 35 25, 45 25, 55 45" stroke="#E41A22" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                      <circle cx="62" cy="30" r="4" fill="#FF9E1B" />
                      <text x="10" y="70" fill="#1E293B" fontSize="14" fontWeight="900" fontFamily="system-ui, sans-serif">남울산대리점</text>
                      <text x="10" y="84" fill="#0072CE" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">(CJ대한통운)</text>
                    </svg>
                  </div>
                ) : partner.isGangdong ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <circle cx="30" cy="38" r="18" stroke="#D97706" strokeWidth="4.5" fill="none" />
                      <path d="M 30 20 L 48 38 L 30 56" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="60" y="42" fill="#1E293B" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif">강동</text>
                      <text x="60" y="55" fill="#D97706" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">CJ대리점</text>
                    </svg>
                  </div>
                ) : partner.isSmartLogis ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <polygon points="25,12 43,22 43,44 25,54 7,44 7,22" stroke="#0D9488" strokeWidth="4" fill="none" />
                      <path d="M 15 25 L 25 21 L 20 33 L 31 29" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="52" y="38" fill="#0D9488" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif">SMART</text>
                      <text x="52" y="51" fill="#1E293B" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif">스마트로지스</text>
                    </svg>
                  </div>
                ) : partner.isLogisLK ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 10 18 L 10 50 L 28 50" stroke="#047857" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <path d="M 40 18 L 22 34 L 40 50" stroke="#047857" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="52" y="42" fill="#1E293B" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif">LOGIS LK</text>
                      <text x="52" y="53" fill="#047857" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.5">로지스LK</text>
                    </svg>
                  </div>
                ) : partner.isKorex ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <polygon points="25,12 43,22 43,44 25,54 7,44 7,22" stroke="#B91C1C" strokeWidth="4.5" strokeLinejoin="round" fill="none" />
                      <line x1="25" y1="12" x2="25" y2="54" stroke="#B91C1C" strokeWidth="3" />
                      <line x1="25" y1="33" x2="7" y2="22" stroke="#B91C1C" strokeWidth="3" />
                      <line x1="25" y1="33" x2="43" y2="22" stroke="#B91C1C" strokeWidth="3" />
                      <text x="52" y="38" fill="#B91C1C" fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif">KOREX</text>
                      <text x="52" y="50" fill="#1E293B" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif">코렉스통운</text>
                    </svg>
                  </div>
                ) : partner.isWiniz ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 10 38 Q 22 18 34 38" stroke="#DB2777" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                      <path d="M 24 45 Q 36 25 48 45" stroke="#7C3AED" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                      <circle cx="22" cy="18" r="4.5" fill="#DB2777" />
                      <circle cx="36" cy="25" r="4.5" fill="#7C3AED" />
                      <text x="58" y="42" fill="#7C3AED" fontSize="22" fontWeight="900" fontFamily="system-ui, sans-serif">WINIZ</text>
                      <text x="58" y="53" fill="#64748B" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">위니즈컴퍼니</text>
                    </svg>
                  </div>
                ) : partner.isMarineBoy ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 8 38 C 18 28, 22 48, 32 38" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                      <path d="M 12 46 C 22 36, 26 56, 36 46" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                      <circle cx="22" cy="24" r="5" fill="#F97316" />
                      <text x="46" y="38" fill="#0284C7" fontSize="16" fontWeight="900" fontFamily="system-ui, sans-serif">MARINE BOY</text>
                      <text x="46" y="50" fill="#1E293B" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif">마린보이푸드</text>
                    </svg>
                  </div>
                ) : partner.isLeisureTown ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <polygon points="25,16 42,46 8,46" fill="#15803D" opacity="0.85" />
                      <polygon points="36,24 50,46 22,46" fill="#166534" />
                      <text x="58" y="38" fill="#15803D" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">LEISURE</text>
                      <text x="58" y="50" fill="#1E293B" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif">레져타운</text>
                    </svg>
                  </div>
                ) : partner.isJungang ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <circle cx="25" cy="35" r="18" stroke="#1E3A8A" strokeWidth="4" fill="none" />
                      <rect x="18" y="28" width="14" height="14" stroke="#D97706" strokeWidth="3" fill="none" />
                      <text x="50" y="38" fill="#1E3A8A" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">중앙유통</text>
                      <text x="50" y="50" fill="#64748B" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.5">DISTRIBUTION</text>
                    </svg>
                  </div>
                ) : partner.isCookieShop ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <circle cx="25" cy="35" r="18" fill="#D97706" />
                      <circle cx="18" cy="28" r="3" fill="#451A03" />
                      <circle cx="28" cy="24" r="2.5" fill="#451A03" />
                      <circle cx="32" cy="36" r="3.2" fill="#451A03" />
                      <circle cx="20" cy="40" r="2.5" fill="#451A03" />
                      <text x="50" y="38" fill="#78350F" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">COOKIE SHOP</text>
                      <text x="50" y="50" fill="#1E293B" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif">쿠키샵</text>
                    </svg>
                  </div>
                ) : partner.isMyeongjin ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 10 38 Q 25 14 40 38 Z" fill="#10B981" opacity="0.85" />
                      <path d="M 22 44 Q 32 25 42 44 Z" fill="#F59E0B" />
                      <text x="48" y="38" fill="#047857" fontSize="17" fontWeight="900" fontFamily="system-ui, sans-serif">Fresh food</text>
                      <text x="48" y="50" fill="#1E293B" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif">명진푸드</text>
                    </svg>
                  </div>
                ) : partner.isMaegokKorex ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <polygon points="25,12 43,22 43,44 25,54 7,44 7,22" stroke="#4F46E5" strokeWidth="4.5" strokeLinejoin="round" fill="none" />
                      <line x1="25" y1="12" x2="25" y2="54" stroke="#4F46E5" strokeWidth="3" />
                      <line x1="25" y1="33" x2="7" y2="22" stroke="#4F46E5" strokeWidth="3" />
                      <line x1="25" y1="33" x2="43" y2="22" stroke="#4F46E5" strokeWidth="3" />
                      <text x="52" y="38" fill="#4F46E5" fontSize="16" fontWeight="900" fontFamily="system-ui, sans-serif">M-KOREX</text>
                      <text x="52" y="50" fill="#1E293B" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif">매곡코렉스</text>
                    </svg>
                  </div>
                ) : partner.isSangsang ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <rect x="10" y="26" width="30" height="24" rx="3" fill="#6366F1" />
                      <polygon points="10,26 25,14 40,26" fill="#818CF8" />
                      <circle cx="25" cy="38" r="6" fill="#FBBF24" />
                      <text x="48" y="38" fill="#4F46E5" fontSize="14" fontWeight="900" fontFamily="system-ui, sans-serif">상상커머스</text>
                      <text x="48" y="51" fill="#64748B" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">SANGSANG</text>
                    </svg>
                  </div>
                ) : partner.isBeonchang ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <path d="M 8 48 C 16 48, 20 20, 36 12" stroke="#10B981" strokeWidth="5" strokeLinecap="round" fill="none" />
                      <polygon points="36,12 28,12 36,20" fill="#10B981" />
                      <rect x="10" y="30" width="16" height="12" fill="#34D399" rx="1" />
                      <text x="48" y="38" fill="#047857" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">번창물류</text>
                      <text x="48" y="50" fill="#64748B" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.5">BEONCHANG</text>
                    </svg>
                  </div>
                ) : partner.isS2Works ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <rect x="8" y="16" width="36" height="36" rx="18" fill="#0284C7" />
                      <text x="13" y="42" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="-1.5">S2</text>
                      <text x="50" y="34" fill="#0284C7" fontSize="15" fontWeight="900" fontFamily="system-ui, sans-serif">S2 WORKS</text>
                      <text x="50" y="48" fill="#1E293B" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif">에스투워크스</text>
                    </svg>
                  </div>
                ) : partner.isGeojeCJ ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <text x="5" y="48" fill="#000000" fontSize="32" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="-3">CJ</text>
                      <circle cx="44" cy="24" r="5" fill="#1D4ED8" />
                      <circle cx="51" cy="33" r="5" fill="#E11D48" />
                      <circle cx="40" cy="40" r="5" fill="#F59E0B" />
                      <text x="10" y="66" fill="#1E293B" fontSize="15" fontWeight="900" fontFamily="system-ui, sans-serif">거제대리점</text>
                      <text x="10" y="78" fill="#64748B" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">씨제이택배 거제</text>
                    </svg>
                  </div>
                ) : partner.isOkdongShichida ? (
                  <div className="w-14 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                      <circle cx="25" cy="32" r="15" fill="#EA580C" />
                      <path d="M 18 30 Q 25 38 32 30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
                      <circle cx="20" cy="24" r="2" fill="#FFFFFF" />
                      <circle cx="30" cy="24" r="2" fill="#FFFFFF" />
                      <path d="M 25 10 L 25 5" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 40 25 L 45 23" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 10 25 L 5 23" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
                      <text x="46" y="38" fill="#EA580C" fontSize="17" fontWeight="900" fontFamily="system-ui, sans-serif">SHICHIDA</text>
                      <text x="46" y="50" fill="#1E293B" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif">옥동시찌다</text>
                    </svg>
                  </div>
                ) : (
                  <div className={`w-8 h-8 rounded-lg ${theme.lightBg} ${theme.text} flex items-center justify-center font-bold text-xs font-mono`}>
                    {partner.brand[0]}
                  </div>
                )}
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-700 tracking-tight block leading-tight">
                    {partner.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block mt-0.5">{partner.brand}</span>
                </div>
              </div>
            );

            // Split into two distinct rows
            const row1 = partnersList.slice(0, 14);
            const row2 = partnersList.slice(14);

            return (
              <div className="space-y-6 pt-4">
                {/* Track 1: Moving Left */}
                <div className="relative overflow-hidden py-2 select-none pause-on-hover">
                  <div className="flex gap-5 w-max marquee-track animate-marquee-left">
                    {/* Render first copy */}
                    {row1.map((p, i) => renderPartnerCard(p, `r1-1-${i}`))}
                    {/* Render second duplicate copy for infinite loops */}
                    {row1.map((p, i) => renderPartnerCard(p, `r1-2-${i}`))}
                  </div>
                </div>

                {/* Track 2: Moving Right */}
                <div className="relative overflow-hidden py-2 select-none pause-on-hover">
                  <div className="flex gap-5 w-max marquee-track animate-marquee-right">
                    {/* Render first copy */}
                    {row2.map((p, i) => renderPartnerCard(p, `r2-1-${i}`))}
                    {/* Render second duplicate copy for infinite loops */}
                    {row2.map((p, i) => renderPartnerCard(p, `r2-2-${i}`))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}
