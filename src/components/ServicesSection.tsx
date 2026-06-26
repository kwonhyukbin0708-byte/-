/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Package, Warehouse, Users, Shuffle, Check, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICE_DETAILS } from '../constants';
import { SiteConfig } from '../types';

interface ServicesSectionProps {
  config: SiteConfig;
  setCurrentSection: (section: string) => void;
  onNavigateToContact?: (serviceType: string) => void;
  theme: any;
}

export default function ServicesSection({ config, setCurrentSection, onNavigateToContact, theme }: ServicesSectionProps) {
  
  // Icon selector helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package': return Package;
      case 'Warehouse': return Warehouse;
      case 'Users': return Users;
      case 'Shuffle': return Shuffle;
      default: return Package;
    }
  };

  const getServiceTypeForForm = (title: string) => {
    if (title.includes('물류도급')) return '물류도급';
    if (title.includes('3PL') || title.includes('3자 물류')) return '3PL';
    if (title.includes('인력 아웃소싱')) return '인력 아웃소싱';
    if (title.includes('업무 대행')) return '업무 대행';
    return '기타';
  };

  const processes = [
    { step: '01', title: '상담 및 현장 니즈 분석', desc: '고객사 물류 환경 진단 및 위탁 공정 파악' },
    { step: '02', title: '원가 설계 및 제안서 전달', desc: '현장 실사에 기반한 합리적 도급 단가 및 인력 구성 설계' },
    { step: '03', title: '계약 체결 및 현장 셋업', desc: '산업안전 보건 기준 준수 계약 및 전문 파트 관리자(SV) 배정' },
    { step: '04', title: '현장 교육 및 실전 배치', desc: '자체 교육 프로그램을 수료한 숙련된 인재 맞춤형 가동' },
    { step: '05', title: '운영 성과 평가 (KPI) 피드백', desc: '시간당 처리 물량(UPH) 및 공정별 오분류율 분석을 통한 운영 프로세스 최적화' }
  ];

  return (
    <div id="services-section" className="bg-slate-50 py-10 space-y-8">
      
      {/* Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-sm space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Services</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">제공 서비스 상세 소개</h3>
            <p className="text-sm text-slate-500">
              <span className="text-red-600 font-bold">(주)순순</span>은 물류도급에서 인재 아웃소싱까지 원스톱으로 해결할 수 있는 최상의 비즈니스 파트너입니다.
            </p>
          </div>

          {/* Detailed Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {SERVICE_DETAILS.map((service, idx) => {
              const IconComponent = getIcon(service.icon);
              const isLogisticsContract = service.title.includes('물류도급');
              
              return (
                <div
                  key={idx}
                  id={`service-detail-card-${idx}`}
                  className={`rounded-3xl border p-8 sm:p-10 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-300 relative group ${
                    isLogisticsContract
                      ? 'bg-gradient-to-br from-white to-red-50/20 border-red-200 shadow-md ring-1 ring-red-500/10'
                      : 'bg-slate-50 border-slate-200/60 shadow-sm'
                  }`}
                >
                  {/* Visual Accent Top Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl transition-all duration-300 group-hover:h-2.5 ${isLogisticsContract ? 'bg-red-600' : theme.primary}`}></div>

                  {/* Highlight Badge for Logistics Contract */}
                  {isLogisticsContract && (
                    <div className="absolute -top-3.5 right-6 bg-red-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider animate-pulse select-none">
                      <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                      순순 NO.1 핵심 전문 분야
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Title and icon */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${isLogisticsContract ? 'bg-red-50' : theme.lightBg}`}>
                        <IconComponent className={`w-6 h-6 ${isLogisticsContract ? 'text-red-600' : theme.text}`} />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{service.title}</h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal break-keep">
                      {service.description}
                    </p>

                    {/* Bullet check list */}
                    <ul className="space-y-3.5 pt-4 border-t border-slate-200">
                      {service.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-3 text-xs text-slate-600">
                          <span className={`p-0.5 rounded-full mt-0.5 shrink-0 ${isLogisticsContract ? 'bg-red-50' : theme.lightBg}`}>
                            <Check className={`w-3 h-3 ${isLogisticsContract ? 'text-red-600' : theme.text}`} />
                          </span>
                          <span className="leading-relaxed font-semibold text-slate-700 break-keep">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => {
                        const formType = getServiceTypeForForm(service.title);
                        if (onNavigateToContact) {
                          onNavigateToContact(formType);
                        } else {
                          setCurrentSection('contact');
                        }
                      }}
                      className={`flex items-center space-x-1.5 text-xs font-bold ${isLogisticsContract ? 'text-red-600' : theme.text} hover:underline underline-offset-4 cursor-pointer`}
                    >
                      <span>본 서비스 견적 문의하기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5-Step Operation Process Flowchart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-sm space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Process</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">도급 운영 가이드 프로세스</h3>
            <p className="text-sm text-slate-500">
              상담 신청부터 현장 실사 및 최종 사후 분석에 이르는 정밀한 5단계 시스템을 통해 효율을 극대화합니다.
            </p>
          </div>

          {/* Process horizontal layout on desktop, list on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
            {processes.map((proc, pIdx) => (
              <div
                key={pIdx}
                id={`process-step-${pIdx}`}
                className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-between space-y-4 hover:border-slate-200 hover:shadow-sm shadow-sm relative group transition-all duration-200"
              >
                {/* Index circle */}
                <div className="flex justify-between items-start">
                  <span className={`text-2xl font-extrabold font-mono tracking-tighter ${theme.text}`}>
                    {proc.step}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-red-500 transition-colors duration-200"></span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 break-keep">{proc.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-normal break-keep">{proc.desc}</p>
                </div>

                {/* Arrow indicator on desktop between columns */}
                {pIdx < 4 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA (Service Level Agreement) Assurance section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-sm">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className={`text-[10px] tracking-widest font-bold uppercase bg-white/10 px-3 py-1 rounded-full ${theme.text}`}>SLA GUARANTEE</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight break-keep">
                무단 지각 및 이탈 리스크 ZERO를 지향합니다.
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-2xl break-keep">
                <span className="text-red-500 font-bold">(주)순순</span>은 비정상 결원 발생 시, 자체 대체 인력 공급망을 가동하여 3시간 이내에 현장을 정상화하는 백업 규정(SLA)을 제공합니다. 어떠한 상황에서도 귀사의 물류 가동 벨트가 멈추지 않도록 정밀 대응합니다.
              </p>
            </div>
            
            <div className="lg:col-span-4 text-left lg:text-right">
              <button
                id="services-btn-goto-contact"
                onClick={() => setCurrentSection('contact')}
                className={`w-full lg:w-auto px-8 py-3.5 rounded-xl text-white font-bold cursor-pointer transition-all ${theme.primary} ${theme.hover}`}
              >
                상담 및 실사 제안 신청
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
