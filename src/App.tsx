/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, ChevronRight, ShieldCheck, Mail, Calendar } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import AdminSection from './components/AdminSection';
import PolicyModal from './components/PolicyModal';

import { SiteConfig, Notice, Portfolio, Inquiry } from './types';
import {
  DEFAULT_SITE_CONFIG,
  INITIAL_NOTICES,
  INITIAL_PORTFOLIO,
  INITIAL_INQUIRIES
} from './constants';

// Theme configurations mapping to Tailwind Utility classes
export const COLOR_THEMES = {
  red: {
    primary: 'bg-red-600',
    hover: 'hover:bg-red-700',
    text: 'text-red-600',
    border: 'border-red-600',
    lightBg: 'bg-red-50',
    badge: 'bg-red-50 text-red-700 border-red-100',
  },
  blue: {
    primary: 'bg-blue-600',
    hover: 'hover:bg-blue-700',
    text: 'text-blue-600',
    border: 'border-blue-600',
    lightBg: 'bg-blue-50',
    badge: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  emerald: {
    primary: 'bg-emerald-600',
    hover: 'hover:bg-emerald-700',
    text: 'text-emerald-600',
    border: 'border-emerald-600',
    lightBg: 'bg-emerald-50',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  amber: {
    primary: 'bg-amber-500',
    hover: 'hover:bg-amber-600',
    text: 'text-amber-500',
    border: 'border-amber-500',
    lightBg: 'bg-amber-50',
    badge: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  slate: {
    primary: 'bg-slate-800',
    hover: 'hover:bg-slate-900',
    text: 'text-slate-800',
    border: 'border-slate-800',
    lightBg: 'bg-slate-100',
    badge: 'bg-slate-100 text-slate-800 border-slate-200',
  }
};

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('물류도급');

  // Hidden admin menu visibility state
  const [showAdminMenu, setShowAdminMenu] = useState<boolean>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasParam = urlParams.get('admin') === 'true' || urlParams.get('setup') === 'true';
    localStorage.setItem('soonsoon_show_admin_menu', 'false');
    return hasParam;
  });

  const toggleAdminMenu = () => {
    setShowAdminMenu((prev) => {
      const next = !prev;
      localStorage.setItem('soonsoon_show_admin_menu', next ? 'true' : 'false');
      return next;
    });
  };

  // Listen for Ctrl+Alt+K (Mac: Cmd+Option+K) to toggle admin button visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const isAlt = e.altKey;
      const isShift = e.shiftKey;
      const key = e.key.toLowerCase();

      // Primary: Ctrl+Alt+K / Cmd+Alt(Option)+K
      // Fallback: Ctrl+Shift+K
      if (
        (isCtrlOrMeta && isAlt && key === 'k') ||
        (isCtrlOrMeta && isShift && key === 'k')
      ) {
        e.preventDefault();
        toggleAdminMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Core CMS state loaded from localStorage, falling back to constant defaults
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('soonsoon_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      let updated = false;
      if (parsed.ceoName === '김순순') {
        parsed.ceoName = '권혁빈';
        updated = true;
      }
      if (parsed.phone === '02-588-3490') {
        parsed.phone = '051-782-0122';
        updated = true;
      }
      if (parsed.email === 'contact@soonsoon.co.kr') {
        parsed.email = 'soonsoon@soonsoon.co.kr';
        updated = true;
      }
      if (parsed.fax === '02-588-3491') {
        parsed.fax = '051-783-0122';
        updated = true;
      }
      if (parsed.address === '서울특별시 마포구 마포대로 122, 신덕빌딩 11층') {
        parsed.address = '부산광역시 해운대구 센텀동로 99, 벽산e센텀클래스원 912호';
        updated = true;
      }
      if (parsed.registrationNumber === '120-88-99432') {
        parsed.registrationNumber = '765-81-03215';
        updated = true;
      }
      if (parsed.mainSlogan === '정밀한 물류 도급, 신뢰받는 아웃소싱의 기준' || !parsed.mainSlogan) {
        parsed.mainSlogan = '사람을 연결하고, 현장을 완성합니다.';
        updated = true;
      }
      if (parsed.subSlogan === '체계적인 인력 관리와 첨단 도급 시스템을 통해 귀사의 비즈니스 가치를 극대화합니다.' || !parsed.subSlogan) {
        parsed.subSlogan = '순순, 사람과 현장을 하나로';
        updated = true;
      }
      if (parsed.accentColor !== 'red') {
        parsed.accentColor = 'red';
        updated = true;
      }
      if (parsed.kakaoLink === 'https://pf.kakao.com' || !parsed.kakaoLink || !parsed.kakaoLink.includes('_CVHFn')) {
        parsed.kakaoLink = 'https://pf.kakao.com/_CVHFn';
        updated = true;
      }
      if (updated) {
        localStorage.setItem('soonsoon_config', JSON.stringify(parsed));
      }
      return parsed;
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('soonsoon_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [portfolios, setPortfolios] = useState<Portfolio[]>(() => {
    const saved = localStorage.getItem('soonsoon_portfolios');
    if (saved) {
      const parsed = JSON.parse(saved);
      // If the loaded data is the old mock portfolio, or uses hyphen dates, migrate it
      const hasOldMock = parsed.some((p: any) => p.title && (
        p.title.includes('A사 이커머스') || 
        p.title.includes('B식품 저온') || 
        p.title.includes('D권역 터미널 상하차') ||
        p.title.includes('CJ대한통운 서부집배점') ||
        p.title.includes('CJ대한통운 오네본부 E2 권역 풀필먼트') ||
        p.title.includes('오네본부') ||
        p.title === '분류도우미 계약' ||
        (p.id === 'port-2' && p.category !== '물류도급') ||
        (p.id === 'port-3' && p.category !== '3PL') ||
        (p.id === 'port-4' && p.category !== '인력 아웃소싱') ||
        (p.date && p.date.includes('-'))
      ));
      if (hasOldMock) {
        localStorage.setItem('soonsoon_portfolios', JSON.stringify(INITIAL_PORTFOLIO));
        return INITIAL_PORTFOLIO;
      }
      return parsed;
    }
    return INITIAL_PORTFOLIO;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('soonsoon_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // Active Notice modal state
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Policy modal state
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<'terms' | 'privacy' | 'email'>('terms');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('soonsoon_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('soonsoon_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('soonsoon_portfolios', JSON.stringify(portfolios));
  }, [portfolios]);

  useEffect(() => {
    localStorage.setItem('soonsoon_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Accent theme selector
  const activeTheme = COLOR_THEMES[config.accentColor] || COLOR_THEMES.red;

  // Configuration modifiers
  const updateConfig = (newVals: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...newVals }));
  };

  const resetConfigToDefault = () => {
    if (window.confirm('사이트 구성을 공장출고 기본값으로 리셋하시겠습니까? (도급 단가, 전화번호, 슬로건 등이 초기화됩니다)')) {
      setConfig(DEFAULT_SITE_CONFIG);
      setNotices(INITIAL_NOTICES);
      setPortfolios(INITIAL_PORTFOLIO);
      setInquiries(INITIAL_INQUIRIES);
    }
  };

  // Inquiry actions
  const addInquiry = (newInq: Omit<Inquiry, 'id' | 'date' | 'status'>): Inquiry => {
    const ticketId = `SS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullInq: Inquiry = {
      ...newInq,
      id: ticketId,
      date: new Date().toISOString().split('T')[0],
      status: 'received'
    };
    setInquiries((prev) => [fullInq, ...prev]);
    return fullInq;
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    if (window.confirm('해당 견적 문의 이력을 영구 삭제하시겠습니까?')) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    }
  };

  // Switch sections smoothly with AnimatePresence
  const renderActiveSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <HomeSection
            config={config}
            notices={notices}
            portfolios={portfolios}
            setCurrentSection={setCurrentSection}
            setSelectedNotice={setSelectedNotice}
            theme={activeTheme}
            showAdminMenu={showAdminMenu}
          />
        );
      case 'about':
        return <AboutSection config={config} theme={activeTheme} />;
      case 'services':
        return (
          <ServicesSection
            config={config}
            setCurrentSection={setCurrentSection}
            onNavigateToContact={(serviceType) => {
              setSelectedServiceType(serviceType);
              setCurrentSection('contact');
            }}
            theme={activeTheme}
          />
        );
      case 'portfolio':
        return (
          <PortfolioSection
            config={config}
            portfolios={portfolios}
            theme={activeTheme}
          />
        );
      case 'contact':
        return (
          <ContactSection
            config={config}
            inquiries={inquiries}
            addInquiry={addInquiry}
            theme={activeTheme}
            preselectedServiceType={selectedServiceType}
          />
        );
      case 'admin':
        return (
          <AdminSection
            config={config}
            updateConfig={updateConfig}
            resetConfigToDefault={resetConfigToDefault}
            notices={notices}
            updateNotices={setNotices}
            portfolios={portfolios}
            updatePortfolios={setPortfolios}
            inquiries={inquiries}
            updateInquiryStatus={updateInquiryStatus}
            deleteInquiry={deleteInquiry}
            theme={activeTheme}
          />
        );
      default:
        return (
          <HomeSection
            config={config}
            notices={notices}
            portfolios={portfolios}
            setCurrentSection={setCurrentSection}
            setSelectedNotice={setSelectedNotice}
            theme={activeTheme}
            showAdminMenu={showAdminMenu}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans text-gray-800 bg-slate-50 selection:bg-red-600 selection:text-white">
      {/* Top Navigation */}
      <Header
        config={config}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        theme={activeTheme}
        showAdminMenu={showAdminMenu}
      />

      {/* Main Container with smooth fading transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate footer */}
      <Footer
        config={config}
        setCurrentSection={setCurrentSection}
        theme={activeTheme}
        showAdminMenu={showAdminMenu}
        onOpenPolicy={(tab) => {
          setPolicyTab(tab);
          setIsPolicyOpen(true);
        }}
        onToggleAdminMenu={toggleAdminMenu}
      />

      {/* Corporate Policies Modal Overlay */}
      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
        initialTab={policyTab}
        theme={activeTheme}
      />

      {/* Notice Detail Modal Overlay */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            id="notice-overlay-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedNotice(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                title="공지 닫기"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-3 pb-4 border-b border-gray-100">
                <span className="text-[10px] bg-red-50 text-red-700 border border-red-100 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Bell className="w-3 h-3 text-red-600" />
                  <span>공지 알림</span>
                </span>
                
                <h3 className="text-lg font-bold text-gray-900 tracking-tight pr-8">
                  {selectedNotice.title}
                </h3>
                
                <div className="flex items-center space-x-2 text-[11px] text-gray-400">
                  <span>작성: {selectedNotice.writer}</span>
                  <span>•</span>
                  <span>날짜: {selectedNotice.date}</span>
                </div>
              </div>

              {/* Body */}
              <div className="py-6 overflow-y-auto max-h-[300px] text-xs sm:text-sm text-gray-600 leading-relaxed font-normal whitespace-pre-line">
                {selectedNotice.content}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-950 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  확인 및 닫기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
