/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  FileText,
  Briefcase,
  Layers,
  Inbox,
  Check,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  RefreshCw,
  Phone,
  Bookmark,
  Calendar,
  Sparkles,
  Lock,
  Unlock,
  Key
} from 'lucide-react';
import { SiteConfig, Notice, Portfolio, Inquiry } from '../types';

interface AdminSectionProps {
  config: SiteConfig;
  updateConfig: (updater: Partial<SiteConfig>) => void;
  resetConfigToDefault: () => void;
  notices: Notice[];
  updateNotices: (newNotices: Notice[]) => void;
  portfolios: Portfolio[];
  updatePortfolios: (newPortfolios: Portfolio[]) => void;
  inquiries: Inquiry[];
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  theme: any;
}

export default function AdminSection({
  config,
  updateConfig,
  resetConfigToDefault,
  notices,
  updateNotices,
  portfolios,
  updatePortfolios,
  inquiries,
  updateInquiryStatus,
  deleteInquiry,
  theme
}: AdminSectionProps) {
  
  // Admin authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === 'tnstns24!') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('비밀번호가 올바르지 않습니다. 다시 입력해주세요.');
    }
  };

  // Tab states inside Admin Console
  const [activeSubTab, setActiveSubTab] = useState<'branding' | 'notices' | 'portfolios' | 'inquiries'>('branding');

  // Notices CMS Form states
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeIsImportant, setNoticeIsImportant] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);

  // Portfolio CMS Form states
  const [portTitle, setPortTitle] = useState('');
  const [portClient, setPortClient] = useState('');
  const [portCategory, setPortCategory] = useState('물류도급');
  const [portDesc, setPortDesc] = useState('');
  const [portImgUrl, setPortImgUrl] = useState('');
  const [portHighlights, setPortHighlights] = useState<string>('');
  const [editingPortId, setEditingPortId] = useState<string | null>(null);

  // Stats
  const statsWidgets = [
    { label: '실시간 접수 문의', value: inquiries.length, desc: '누적 온라인 문의 수량' },
    { label: 'CMS 공지글 수', value: notices.length, desc: '프론트 활성 게시물' },
    { label: '사업 수행 실적', value: portfolios.length, desc: '포트폴리오 게시글' },
    { label: '적용 테마 컬러', value: config.accentColor.toUpperCase(), desc: '브랜드 메인 포인트색' }
  ];

  // NOTICE CRUD handlers
  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;

    if (editingNoticeId) {
      // Edit
      const updated = notices.map((n) =>
        n.id === editingNoticeId
          ? { ...n, title: noticeTitle, content: noticeContent, isImportant: noticeIsImportant }
          : n
      );
      updateNotices(updated);
      setEditingNoticeId(null);
    } else {
      // Add
      const newNotice: Notice = {
        id: `notice-${Date.now()}`,
        title: noticeTitle,
        content: noticeContent,
        writer: '최고관리자',
        date: new Date().toISOString().split('T')[0],
        viewCount: 0,
        isImportant: noticeIsImportant
      };
      updateNotices([newNotice, ...notices]);
    }

    // Reset Form
    setNoticeTitle('');
    setNoticeContent('');
    setNoticeIsImportant(false);
  };

  const handleEditNotice = (n: Notice) => {
    setEditingNoticeId(n.id);
    setNoticeTitle(n.title);
    setNoticeContent(n.content);
    setNoticeIsImportant(n.isImportant);
    const element = document.getElementById('notice-form-anchor');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteNotice = (id: string) => {
    const updated = notices.filter((n) => n.id !== id);
    updateNotices(updated);
  };


  // PORTFOLIO CRUD handlers
  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle.trim() || !portClient.trim() || !portDesc.trim()) return;

    // Split highlights by newline or comma
    const hlArray = portHighlights
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const fallbackImg = portImgUrl.trim() || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';

    if (editingPortId) {
      // Edit
      const updated = portfolios.map((p) =>
        p.id === editingPortId
          ? {
              ...p,
              title: portTitle,
              client: portClient,
              category: portCategory,
              description: portDesc,
              imageUrl: fallbackImg,
              highlights: hlArray
            }
          : p
      );
      updatePortfolios(updated);
      setEditingPortId(null);
    } else {
      // Add
      const newPort: Portfolio = {
        id: `port-${Date.now()}`,
        title: portTitle,
        client: portClient,
        category: portCategory,
        date: new Date().toISOString().split('T')[0],
        description: portDesc,
        imageUrl: fallbackImg,
        highlights: hlArray.length > 0 ? hlArray : ['위탁 계약 안정 운영', '표준 가이드 적용 완료']
      };
      updatePortfolios([newPort, ...portfolios]);
    }

    // Reset
    setPortTitle('');
    setPortClient('');
    setPortCategory('물류도급');
    setPortDesc('');
    setPortImgUrl('');
    setPortHighlights('');
  };

  const handleEditPort = (p: Portfolio) => {
    setEditingPortId(p.id);
    setPortTitle(p.title);
    setPortClient(p.client);
    setPortCategory(p.category);
    setPortDesc(p.description);
    setPortImgUrl(p.imageUrl);
    setPortHighlights(p.highlights.join('\n'));
    const element = document.getElementById('port-form-anchor');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeletePort = (id: string) => {
    const updated = portfolios.filter((p) => p.id !== id);
    updatePortfolios(updated);
  };

  if (!isAuthenticated) {
    return (
      <div id="admin-login-gate" className="bg-slate-50 py-20 min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
          <div className={`p-6 ${theme.primary} text-white flex flex-col items-center text-center space-y-2`}>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">관리자 시스템 로그인</h3>
            <p className="text-xs text-white/80">보안 구역 - 승인된 관리자만 진입할 수 있습니다.</p>
          </div>
          
          <form onSubmit={handleAdminLogin} className="p-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="admin-passcode" className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                관리자 비밀번호
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Key className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="admin-passcode"
                  type={showPasscode ? 'text' : 'password'}
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="비밀번호를 입력하세요"
                  className="block w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPasscode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {authError && (
                <p className="text-xs font-semibold text-red-600 animate-pulse mt-1">
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 ${theme.primary} ${theme.hover}`}
            >
              <Unlock className="w-4 h-4" />
              <span>로그인 및 시스템 접속</span>
            </button>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                <Sparkles className="w-3 h-3" /> 관리자 시스템 안내
              </span>
              <p className="text-xs text-gray-500 leading-relaxed">
                본 시스템은 인증된 담당자만 사용 가능합니다. 비밀번호 분실 시 개발 부서에 문의해 주시기 바랍니다.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-suite" className="bg-slate-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Admin Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-red-600">
              <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-bold uppercase tracking-wider">SOONSOON CMS INTEGRATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              (주)순순 관리자 관제 시스템
            </h2>
            <p className="text-xs text-gray-400 font-normal leading-relaxed">
              본 페이지는 관리자 가이드를 위해 노출된 통합 제어 센터입니다. 여기서 수정되는 내용들은 메인 홈페이지에 실시간으로 반영됩니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={resetConfigToDefault}
              className="flex items-center space-x-1.5 px-4.5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-xs cursor-pointer transition-colors shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>기본 설정값 복원</span>
            </button>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPasscodeInput('');
              }}
              className="flex items-center space-x-1.5 px-4.5 py-3 rounded-xl bg-gray-950 hover:bg-gray-900 text-white font-semibold text-xs cursor-pointer transition-colors shrink-0 shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>안전 로그아웃</span>
            </button>
          </div>
        </div>

        {/* Real-time CMS Status Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsWidgets.map((wid, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6 space-y-1.5 shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{wid.label}</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-mono tracking-tight">{wid.value}</p>
              <p className="text-[10px] text-gray-500 font-normal">{wid.desc}</p>
            </div>
          ))}
        </div>

        {/* Control Desk Sub-navigation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'branding', label: '1. 브랜드 & 테마 관리', icon: Sliders },
              { id: 'notices', label: '2. 공지사항 (CMS)', icon: FileText },
              { id: 'portfolios', label: '3. 사업실적 (CMS)', icon: Briefcase },
              { id: 'inquiries', label: '4. 실시간 온라인 문의', icon: Inbox }
            ].map((sub) => {
              const IconComp = sub.icon;
              const isActive = activeSubTab === sub.id;
              return (
                <button
                  key={sub.id}
                  id={`admin-tab-${sub.id}`}
                  onClick={() => setActiveSubTab(sub.id as any)}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    isActive
                      ? `${theme.primary} text-white shadow`
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Inner Tab Render */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-10">
          
          {/* TAB 1: Branding & Customization */}
          {activeSubTab === 'branding' && (
            <div id="branding-panel" className="space-y-10">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                  <Sparkles className={`w-5 h-5 ${theme.text}`} />
                  <span>브랜드 비주얼 및 문구 제어 커스터마이저</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-normal mt-1">
                  회사의 주요 슬로건, 연락처 및 CSS 테마 포인트를 동적으로 제어합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Form fields */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Theme Accent Color */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-700 block">브랜드 포인트 컬러 변경</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'red', label: '강렬한 레드 (기본)', bg: 'bg-red-600', ring: 'ring-red-500' },
                        { id: 'blue', label: '신뢰의 블루', bg: 'bg-blue-600', ring: 'ring-blue-500' },
                        { id: 'emerald', label: '친환경 에메랄드', bg: 'bg-emerald-600', ring: 'ring-emerald-500' },
                        { id: 'amber', label: '안전성 앰버', bg: 'bg-amber-500', ring: 'ring-amber-500' },
                        { id: 'slate', label: '고급스러운 차콜/슬레이트', bg: 'bg-slate-800', ring: 'ring-slate-800' }
                      ].map((color) => (
                        <button
                          key={color.id}
                          id={`theme-select-${color.id}`}
                          type="button"
                          onClick={() => updateConfig({ accentColor: color.id as any })}
                          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                            config.accentColor === color.id
                              ? `border-gray-900 bg-gray-50 ring-2 ${color.ring}/20`
                              : 'border-gray-200 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full ${color.bg}`}></span>
                          <span>{color.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slogans */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">메인 슬로건 (쉼표 기준 줄바꿈)</label>
                      <input
                        type="text"
                        value={config.mainSlogan}
                        onChange={(e) => updateConfig({ mainSlogan: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">서브 슬로건 (상세 설명)</label>
                      <input
                        type="text"
                        value={config.subSlogan}
                        onChange={(e) => updateConfig({ subSlogan: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Company meta information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-gray-100 pt-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">회사명 (국문)</label>
                      <input
                        type="text"
                        value={config.companyName}
                        onChange={(e) => updateConfig({ companyName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">회사명 (영문)</label>
                      <input
                        type="text"
                        value={config.companyNameEng}
                        onChange={(e) => updateConfig({ companyNameEng: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">대표이사명</label>
                      <input
                        type="text"
                        value={config.ceoName}
                        onChange={(e) => updateConfig({ ceoName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">대표 전화번호</label>
                      <input
                        type="text"
                        value={config.phone}
                        onChange={(e) => updateConfig({ phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">대표 이메일</label>
                      <input
                        type="text"
                        value={config.email}
                        onChange={(e) => updateConfig({ email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">대표 팩스번호</label>
                      <input
                        type="text"
                        value={config.fax}
                        onChange={(e) => updateConfig({ fax: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Address and registration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">본사 주소</label>
                      <input
                        type="text"
                        value={config.address}
                        onChange={(e) => updateConfig({ address: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">사업자등록번호</label>
                      <input
                        type="text"
                        value={config.registrationNumber}
                        onChange={(e) => updateConfig({ registrationNumber: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                </div>

                {/* Live Preview Teaser Card */}
                <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between border border-slate-800">
                  <div className="space-y-4">
                    <span className="text-[9px] bg-white/10 text-slate-300 font-mono font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">실시간 적용 미리보기</span>
                    <div className="border-t border-slate-800 pt-4 space-y-2">
                      <p className="text-xs font-bold text-slate-400">대시보드 메인 헤드라인</p>
                      <h5 className="text-lg font-bold leading-normal">
                        {config.mainSlogan}
                      </h5>
                    </div>
                    <div className="border-t border-slate-800 pt-4 space-y-1">
                      <p className="text-xs font-bold text-slate-400">회사명 및 대표번호</p>
                      <p className="text-sm font-bold">{config.companyName}</p>
                      <p className="text-xs text-slate-400 font-mono">{config.phone}</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-800 mt-6 text-[11px] text-slate-500 leading-relaxed">
                    ⚙️ 위의 변경 값들은 `localStorage`와 리액트 상위 상태 관리를 통해 즉각 사이트 전역에 연동되어 즉시 작동합니다.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Notices CMS Manager */}
          {activeSubTab === 'notices' && (
            <div id="notices-cms-panel" className="space-y-10">
              <div id="notice-form-anchor" className="border-b border-gray-100 pb-4">
                <h4 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                  <FileText className={`w-5 h-5 ${theme.text}`} />
                  <span>공지사항 콘텐츠 매니저 (CMS)</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-normal mt-1">
                  웹사이트 메인 및 공지 탭에 게시할 글을 등록, 편집, 삭제합니다.
                </p>
              </div>

              {/* Form to Create/Edit Notice */}
              <form onSubmit={handleSaveNotice} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4 max-w-3xl">
                <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {editingNoticeId ? '📍 공지사항 수정 중' : '➕ 신규 공지 작성'}
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  <div className="sm:col-span-3 space-y-1">
                    <input
                      type="text"
                      id="notice-title-input"
                      value={noticeTitle}
                      onChange={(e) => setNoticeTitle(e.target.value)}
                      placeholder="공지사항 제목을 입력해 주십시오."
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                  </div>
                  <div className="sm:col-span-1 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notice-important-check"
                      checked={noticeIsImportant}
                      onChange={(e) => setNoticeIsImportant(e.target.checked)}
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                    />
                    <label htmlFor="notice-important-check" className="text-xs font-bold text-gray-700 cursor-pointer">
                      중요 공지 지정
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <textarea
                    id="notice-content-area"
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    rows={4}
                    placeholder="공지 내용을 자세히 작성해 주십시오."
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    id="notice-save-btn"
                    className={`px-6 py-2.5 text-white font-bold text-xs cursor-pointer rounded-xl ${theme.primary} ${theme.hover}`}
                  >
                    {editingNoticeId ? '공지 내용 수정저장' : '새로운 공지 발행하기'}
                  </button>
                  {editingNoticeId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNoticeId(null);
                        setNoticeTitle('');
                        setNoticeContent('');
                        setNoticeIsImportant(false);
                      }}
                      className="px-6 py-2.5 bg-gray-200 text-gray-800 font-bold text-xs cursor-pointer rounded-xl"
                    >
                      취소
                    </button>
                  )}
                </div>
              </form>

              {/* Notice List */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">현재 게재중인 공지 목록</h5>
                
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-100 text-xs">
                    <thead className="bg-gray-50 text-gray-500 font-bold">
                      <tr>
                        <th className="px-6 py-3.5 text-left uppercase tracking-wider">구분</th>
                        <th className="px-6 py-3.5 text-left uppercase tracking-wider">제목</th>
                        <th className="px-6 py-3.5 text-left uppercase tracking-wider">작성일</th>
                        <th className="px-6 py-3.5 text-center uppercase tracking-wider">제어</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-gray-600 font-medium">
                      {notices.map((n) => (
                        <tr key={n.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {n.isImportant ? (
                              <span className="text-[9px] font-bold bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded">
                                중요
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold bg-gray-50 text-gray-500 px-2 py-0.5 rounded">
                                일반
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 truncate max-w-sm font-semibold text-gray-900">
                            {n.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-mono">
                            {n.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                            <button
                              onClick={() => handleEditNotice(n)}
                              className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded cursor-pointer"
                              title="수정"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteNotice(n.id)}
                              className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Portfolios CMS Manager */}
          {activeSubTab === 'portfolios' && (
            <div id="portfolios-cms-panel" className="space-y-10">
              <div id="port-form-anchor" className="border-b border-gray-100 pb-4">
                <h4 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                  <Briefcase className={`w-5 h-5 ${theme.text}`} />
                  <span>수행 프로젝트 실적 콘텐츠 매니저 (CMS)</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-normal mt-1">
                  도급 및 창고운영 성과 성적표를 등록 및 변경합니다. Unsplash 이미지 매칭을 제공합니다.
                </p>
              </div>

              {/* Create/Edit Portfolio Form */}
              <form onSubmit={handleSavePortfolio} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4 max-w-3xl">
                <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {editingPortId ? '📍 사업 실적 수정 중' : '➕ 신규 실적 등록'}
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400">카테고리</label>
                    <select
                      value={portCategory}
                      onChange={(e) => setPortCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      {['물류도급', '3PL', '인력 아웃소싱', '업무 대행'].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-400">프로젝트 타이틀 *</label>
                    <input
                      type="text"
                      value={portTitle}
                      onChange={(e) => setPortTitle(e.target.value)}
                      placeholder="예: L사 수도권 메가허브 허브분류도급 전체 운영"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400">주관사/의뢰사 *</label>
                    <input
                      type="text"
                      value={portClient}
                      onChange={(e) => setPortClient(e.target.value)}
                      placeholder="예: (주)엘에스로지스"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400">Unsplash 배경사진 대표 URL</label>
                    <input
                      type="text"
                      value={portImgUrl}
                      onChange={(e) => setPortImgUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... (생략 시 기본 물류창고 사진)"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400">세부 성과 설명 및 개요 *</label>
                  <textarea
                    value={portDesc}
                    onChange={(e) => setPortDesc(e.target.value)}
                    rows={4}
                    placeholder="도급 범위, 일동량 처리량, 오배송율 개선 등을 상세 기술해 주십시오."
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none leading-relaxed"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400">핵심 포인트 지표 (한 줄당 한 개씩 입력)</label>
                  <textarea
                    value={portHighlights}
                    onChange={(e) => setPortHighlights(e.target.value)}
                    rows={3}
                    placeholder="예: 일 평균 35만건 풀필먼트 완벽 출고&#10;KPI 오배송율 0.01% 극비수 준수&#10;현장 전문 오퍼레이터 150명 상주관리"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none font-mono"
                  ></textarea>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className={`px-6 py-2.5 text-white font-bold text-xs cursor-pointer rounded-xl ${theme.primary} ${theme.hover}`}
                  >
                    {editingPortId ? '수정 내용 최종 저장' : '새로운 실적 등록 발행'}
                  </button>
                  {editingPortId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPortId(null);
                        setPortTitle('');
                        setPortClient('');
                        setPortCategory('물류도급');
                        setPortDesc('');
                        setPortImgUrl('');
                        setPortHighlights('');
                      }}
                      className="px-6 py-2.5 bg-gray-200 text-gray-800 font-bold text-xs cursor-pointer rounded-xl"
                    >
                      취소
                    </button>
                  )}
                </div>
              </form>

              {/* Portfolio Grid lists */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">현재 게재 중인 포트폴리오 목록</h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {portfolios.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between hover:border-gray-200">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${theme.lightBg} ${theme.text}`}>
                            {p.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">{p.date}</span>
                        </div>
                        <h5 className="text-sm font-bold text-gray-900">{p.title}</h5>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{p.description}</p>
                      </div>

                      <div className="pt-4 border-t border-gray-50 mt-4 flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-700">{p.client}</span>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleEditPort(p)}
                            className="text-gray-500 hover:text-gray-950 font-bold cursor-pointer"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDeletePort(p.id)}
                            className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Inquiries Real-time Manager */}
          {activeSubTab === 'inquiries' && (
            <div id="inquiries-cms-panel" className="space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                  <Inbox className={`w-5 h-5 ${theme.text}`} />
                  <span>실시간 온라인 견적문의 및 심사 대시보드</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-normal mt-1">
                  온라인 문의서 접수 내역을 확인하고 현재 상담 진행 단계를 라이브 조율합니다.
                </p>
              </div>

              {inquiries.length > 0 ? (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      id={`admin-inq-card-${inq.id}`}
                      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 hover:border-gray-200"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 border-b border-gray-50 pb-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-gray-900">{inq.companyName}</span>
                            <span className="text-xs text-gray-400">({inq.requester})</span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-mono">TICKET: {inq.id} · 접수일: {inq.date}</p>
                        </div>

                        {/* Status Selection and Delete */}
                        <div className="flex items-center space-x-3 w-full sm:w-auto">
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold focus:outline-none"
                          >
                            <option value="received">접수 완료 (대기)</option>
                            <option value="in_progress">실사 및 진행 중</option>
                            <option value="completed">상담 종결</option>
                          </select>
                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Inquiry Content details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-gray-700 bg-gray-50/60 p-4 rounded-xl border border-gray-100">
                        <div>
                          <p className="text-[10px] text-gray-400">연락처 및 메일</p>
                          <p className="text-gray-900 font-bold font-mono mt-0.5">{inq.phone} | {inq.email}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400">신청 서비스 분야</p>
                          <span className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded ${theme.lightBg} ${theme.text} mt-0.5`}>
                            {inq.serviceType}
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400">예산 상황</p>
                          <p className="text-gray-900 font-bold mt-0.5">{inq.budget}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] text-gray-400 uppercase font-mono font-bold">문의 본문 내용</p>
                        <p className="text-xs text-gray-700 leading-relaxed font-normal whitespace-pre-line bg-white border border-gray-50 p-4 rounded-xl">
                          {inq.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200 rounded-2xl space-y-3">
                  <Inbox className="w-10 h-10 text-gray-300 mx-auto" />
                  <p className="text-sm font-semibold text-gray-600">온라인 문의가 존재하지 않습니다.</p>
                  <p className="text-xs text-gray-400">고객지원(Contact) 탭에서 새로운 문의를 작성하여 테스트해 보십시오.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
