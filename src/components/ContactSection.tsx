/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, Printer, MapPin, CheckCircle, FileText, Send, Search, ShieldCheck } from 'lucide-react';
import { Inquiry, SiteConfig } from '../types';

interface ContactSectionProps {
  config: SiteConfig;
  inquiries: Inquiry[];
  addInquiry: (inq: Omit<Inquiry, 'id' | 'date' | 'status'>) => Inquiry;
  theme: any;
}

export default function ContactSection({ config, inquiries, addInquiry, theme }: ContactSectionProps) {
  // Form States
  const [companyName, setCompanyName] = useState('');
  const [requester, setRequester] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('물류도급');
  const [budget, setBudget] = useState('협의 후 결정');
  const [message, setMessage] = useState('');
  
  // Feedback states
  const [successTicket, setSuccessTicket] = useState<Inquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Search states for status checker
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState<Inquiry[] | null>(null);

  const [faxCopied, setFaxCopied] = useState(false);

  const handleCopyFax = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(config.fax || '');
    setFaxCopied(true);
    setTimeout(() => setFaxCopied(false), 2000);
  };

  const serviceOptions = ['물류도급', '창고 관리', '인력 아웃소싱', '업무 대행', '기타'];
  const budgetOptions = ['협의 후 결정', '월 1,000만원 미만', '월 1,000만원 ~ 3,000만원', '월 3,000만원 ~ 5,000만원', '월 5,000만원 이상'];

  // Handle inquiry submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Basic Validation
    if (!companyName.trim()) return setValidationError('회사명을 입력해 주십시오.');
    if (!requester.trim()) return setValidationError('신청자명과 직급을 입력해 주십시오.');
    if (!phone.trim()) return setValidationError('연락처를 입력해 주십시오.');
    if (!email.trim() || !email.includes('@')) return setValidationError('올바른 이메일 주소를 입력해 주십시오.');
    if (!message.trim()) return setValidationError('상세 문의 내용을 입력해 주십시오.');

    setIsSubmitting(true);
    
    try {
      // Formspree API submission
      const response = await fetch("https://formspree.io/f/mlgyjdjo", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "회사명": companyName,
          "신청자명/직급": requester,
          "연락처": phone,
          "이메일": email,
          "문의유형": serviceType,
          "희망예산": budget,
          "문의내용": message
        })
      });

      if (!response.ok) {
        console.warn("Formspree submission responded with error:", response.status);
      }
    } catch (err) {
      console.error("Failed to send data to Formspree:", err);
    }

    // Always record locally so that the live status check and local database continues to work flawlessly
    const newInq = addInquiry({
      companyName,
      requester,
      phone,
      email,
      serviceType,
      budget,
      message
    });

    setSuccessTicket(newInq);
    setIsSubmitting(false);

    // Reset form fields
    setCompanyName('');
    setRequester('');
    setPhone('');
    setEmail('');
    setServiceType('물류도급');
    setBudget('협의 후 결정');
    setMessage('');
  };

  // Status Checker Logic
  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchEmail.trim()) return;

    const matched = inquiries.filter(
      (inq) => inq.email.toLowerCase().trim() === searchEmail.toLowerCase().trim()
    );
    setSearchResult(matched);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'received': return { text: '접수 완료', style: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'in_progress': return { text: '실사/진행 중', style: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'completed': return { text: '상담 완료', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default: return { text: '대기', style: 'bg-gray-50 text-gray-700 border-gray-200' };
    }
  };

  return (
    <div id="contact-section" className="bg-slate-50 py-10 space-y-8">
      
      {/* Page header inside Bento Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-sm text-center max-w-7xl mx-auto space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Contact Us</h2>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900">온라인 견적 및 제안 문의</h3>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            귀사의 상황과 예산에 최적화된 도급 제안서를 빠르게 회신드리겠습니다. 부담 없이 상담을 신청해 보세요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Corporate Contacts */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-8 relative overflow-hidden border border-slate-800 shadow-sm">
              <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-5"></div>
              
              <div className="relative z-10 space-y-2">
                <span className={`text-[10px] tracking-widest font-bold uppercase bg-white/10 px-3 py-1 rounded-full ${theme.text} inline-block`}>SUPPORT OFFICE</span>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight">상시 고객지원 서비스</h4>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  온라인 접수 외에도 유선 상담 및 메일을 통해 전문 상담원과 직통 연결이 가능합니다.
                </p>
              </div>

              <div className="relative z-10 space-y-4 border-t border-slate-800 pt-6">
                
                {/* Phone Link */}
                <a
                  href={`tel:${config.phone}`}
                  className="flex items-center space-x-4 p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 transition-all duration-200 group cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme.primary} text-white`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono font-bold">REPRESENTATIVE TEL</p>
                    <p className="text-base font-bold font-mono text-white group-hover:underline">{config.phone}</p>
                  </div>
                </a>

                {/* Mail Link */}
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center space-x-4 p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 transition-all duration-200 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-600 text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono font-bold">REPRESENTATIVE EMAIL</p>
                    <p className="text-sm font-bold font-mono text-white group-hover:underline truncate max-w-[180px] sm:max-w-xs">{config.email}</p>
                  </div>
                </a>

                {/* FAX */}
                {config.fax && (
                  <button
                    type="button"
                    onClick={handleCopyFax}
                    className="w-full text-left flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800/85 transition-all duration-200 group cursor-pointer border border-transparent hover:border-indigo-500/20"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-600 text-white shadow-lg shadow-indigo-600/10 shrink-0">
                        <Printer className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-mono font-bold">OFFICE FAX</p>
                        <p className="text-sm font-bold font-mono text-slate-300 group-hover:text-indigo-400 transition-colors">{config.fax}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-800 text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-950 transition-all select-none">
                      {faxCopied ? '복사 완료! ✓' : '팩스 복사'}
                    </span>
                  </button>
                )}

                {/* Headquarters */}
                <a
                  href={`https://search.naver.com/search.naver?query=${encodeURIComponent(config.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800/85 transition-all duration-200 group cursor-pointer border border-transparent hover:border-emerald-500/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-600 text-white shadow-lg shadow-emerald-600/10 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono font-bold">OFFICE ADDRESS</p>
                      <p className="text-xs font-bold text-slate-300 leading-relaxed group-hover:text-emerald-400 transition-colors">{config.address}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-950 transition-all shrink-0 select-none">
                    지도로 보기 ↗
                  </span>
                </a>

              </div>

              <div className="relative z-10 bg-slate-950/40 p-4 rounded-2xl flex items-center space-x-2 border border-slate-800 text-[11px] text-slate-450 font-medium leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>귀사에서 접수해주시는 정보는 개인정보 보호 표준 가이드에 의거하여 철저히 보안됩니다.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Inquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Success ticket card */}
            {successTicket ? (
              <div id="inquiry-success-ticket" className="bg-white border border-slate-200/50 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500"></div>
                
                <div className="flex items-center space-x-3 text-emerald-600">
                  <CheckCircle className="w-8 h-8" />
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 tracking-tight">견적 제안 문의가 정상 접수되었습니다!</h4>
                    <p className="text-xs text-slate-500">담당 컨설턴트가 검토 후 영업일 기준 24시간 내에 연락드리겠습니다.</p>
                  </div>
                </div>

                {/* Ticket Details Panel */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2.5">
                    <span className="text-slate-400 font-mono font-bold">TICKET ID</span>
                    <span className="font-bold text-slate-900 font-mono">{successTicket.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-700">
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono font-bold">COMPANY / SENDER</p>
                      <p className="text-slate-900 font-bold">{successTicket.companyName} ({successTicket.requester})</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono font-bold">CONTACT EMAIL</p>
                      <p className="text-slate-900 font-bold font-mono">{successTicket.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono font-bold">REQUEST SERVICE</p>
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${theme.lightBg} ${theme.text} mt-1`}>
                        {successTicket.serviceType}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono font-bold">SUBMIT DATE</p>
                      <p className="text-slate-900 font-bold font-mono">{successTicket.date}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSuccessTicket(null)}
                    className={`flex-1 py-3 rounded-xl text-white font-bold text-xs cursor-pointer text-center transition-colors ${theme.primary} ${theme.hover}`}
                  >
                    새로운 문의 작성하기
                  </button>
                  <button
                    onClick={() => {
                      setSearchEmail(successTicket.email);
                      setSearchResult([successTicket]);
                      const element = document.getElementById('status-checker-panel');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer text-center transition-colors"
                  >
                    실시간 처리조회 확인
                  </button>
                </div>
              </div>
            ) : (
              /* Core Form */
              <form id="contact-inquiry-form" onSubmit={handleSubmit} className="bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <FileText className={`w-5 h-5 ${theme.text}`} />
                    <span>온라인 간편 상담서 작성</span>
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">* 필수 정보</span>
                </div>

                {validationError && (
                  <div className="bg-rose-550/10 border border-rose-200 text-rose-600 text-xs rounded-xl p-4 font-semibold">
                    ⚠️ {validationError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="comp-name-input" className="text-xs font-bold text-slate-700">회사명 *</label>
                    <input
                      type="text"
                      id="comp-name-input"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="예: (주)순순물류"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    />
                  </div>

                  {/* Requester Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="req-name-input" className="text-xs font-bold text-slate-700">신청자명 및 직급 *</label>
                    <input
                      type="text"
                      id="req-name-input"
                      value={requester}
                      onChange={(e) => setRequester(e.target.value)}
                      placeholder="예: 홍길동 과장"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone-input" className="text-xs font-bold text-slate-700">연락처 *</label>
                    <input
                      type="text"
                      id="phone-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="예: 010-1234-5678"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email-input" className="text-xs font-bold text-slate-700">이메일 주소 *</label>
                    <input
                      type="email"
                      id="email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="예: partner@gmail.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    />
                  </div>

                  {/* Service Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="service-select" className="text-xs font-bold text-slate-700">문의 분야 *</label>
                    <select
                      id="service-select"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label htmlFor="budget-select" className="text-xs font-bold text-slate-700">예상 소요 예산</label>
                    <select
                      id="budget-select"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Details */}
                <div className="space-y-1.5">
                  <label htmlFor="message-area" className="text-xs font-bold text-slate-700">상세 문의 사항 (물량 규모 등) *</label>
                  <textarea
                    id="message-area"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="예: 경기도 군포 소재의 약 1,500평 저온 허브센터 분류 인력 도급이 필요합니다. 지게차 전문 인원 수급 기간 및 대략적인 도급비 설계 테이블이 궁금합니다."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all leading-relaxed"
                  ></textarea>
                </div>

                {/* Terms Acceptance warning */}
                <div className="text-[11px] text-slate-400 font-normal leading-relaxed">
                  * 당사는 고객 상담 이력 저장을 위해 개인정보 보호법에 따른 수집동의서를 갈음합니다. 입력한 개인정보는 오직 견적 발송 및 사후 제안 피드백 업무에만 이용되며 안전하게 처리됩니다.
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="inquiry-submit-btn"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl text-white font-bold text-xs tracking-wider cursor-pointer shadow-md transition-all duration-200 flex items-center justify-center space-x-2 ${theme.primary} ${theme.hover} disabled:opacity-50`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? '서류 안전 송신 중...' : '문의 신청서 제출하기'}</span>
                </button>
              </form>
            )}

            {/* Live Inquiry Status Checker Widget inside white Bento card */}
            <div id="status-checker-panel" className="bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>실시간 내 견적문의 처리 상태 조회</span>
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  작성하셨던 이메일 주소를 입력해 주시면 현재 도급 심사단 검토 상황을 투명하게 확인하실 수 있습니다.
                </p>
              </div>

              <form onSubmit={handleCheckStatus} className="flex gap-2.5">
                <input
                  type="email"
                  id="status-check-email-input"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="예: partner@gmail.com"
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                />
                <button
                  type="submit"
                  id="status-check-submit-btn"
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-950 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  실시간 조회
                </button>
              </form>

              {/* Status search results panel */}
              {searchResult !== null && (
                <div id="status-check-results" className="space-y-3.5 border-t border-slate-200 pt-5">
                  {searchResult.length > 0 ? (
                    searchResult.map((result) => {
                      const badge = getStatusLabel(result.status);
                      return (
                        <div key={result.id} className="bg-slate-50 rounded-2xl border border-slate-200/60 p-4.5 space-y-3 shadow-inner">
                          <div className="flex justify-between items-start">
                            <div className="space-y-0.5">
                              <span className="text-[9px] text-slate-400 font-mono">TICKET: {result.id}</span>
                              <h5 className="text-xs font-bold text-slate-900">{result.companyName} ({result.serviceType})</h5>
                            </div>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.style}`}>
                              {badge.text}
                            </span>
                          </div>
                          
                          <div className="text-[11px] text-slate-500 leading-relaxed font-normal border-t border-slate-200 pt-2 whitespace-pre-line">
                            {result.status === 'received' && '🔍 현재 본사의 배정 위원회가 제안 물량과 지역을 감안하여 담당 수석 컨설턴트를 매칭 중입니다.'}
                            {result.status === 'in_progress' && '💼 담당 컨설턴트가 배치되어 해당 단가표 실사를 완료하고 도급 운영 제안 보고서를 인쇄/전송 준비 중입니다.'}
                            {result.status === 'completed' && '✅ 제안서 전송 및 해피콜 피드백 완료 상태입니다. 담당 매니저와 직접 상담이 완료되었습니다.'}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-xs text-slate-400 py-4 font-normal">
                      해당 이메일 주소로 접수된 이력이 없습니다. 메일 주소를 확인해 주십시오.
                    </p>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
