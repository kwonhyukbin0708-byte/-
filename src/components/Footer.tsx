/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquare, Instagram, Linkedin, Phone, Mail, Printer, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types';
import Logo from './Logo';

interface FooterProps {
  config: SiteConfig;
  setCurrentSection: (section: string) => void;
  theme: any;
  showAdminMenu?: boolean;
  onOpenPolicy: (tab: 'terms' | 'privacy' | 'email') => void;
}

export default function Footer({ config, setCurrentSection, theme, showAdminMenu = false, onOpenPolicy }: FooterProps) {
  const handleQuickLink = (sectionId: string) => {
    setCurrentSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div id="footer-col-brand" className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleQuickLink('home')}>
              <div className={`w-8 h-8 rounded flex items-center justify-center p-1 ${theme.primary} text-white shadow-sm`}>
                <Logo className="w-full h-full" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight flex items-center gap-1">
                  {config.companyName}
                  <span className={`w-1 h-1 rounded-full ${theme.primary}`}></span>
                </span>
                <p className="text-[9px] text-slate-500 font-mono tracking-wider uppercase -mt-1">
                  {config.companyNameEng}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {config.mainSlogan}
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href={config.kakaoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-yellow-500 hover:text-slate-950 flex items-center justify-center text-slate-400 transition-all duration-200"
                title="카카오톡 플러스친구 상담"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={config.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-200"
                title="인스타그램"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={config.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-200"
                title="링크드인"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div id="footer-col-links" className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">빠른 메뉴</h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: '홈' },
                { id: 'about', label: '회사소개' },
                { id: 'services', label: '서비스 소개' },
                { id: 'portfolio', label: '사업 실적' },
                { id: 'contact', label: '온라인 견적 문의' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleQuickLink(link.id)}
                    className="hover:text-white transition-colors cursor-pointer text-slate-400 hover:underline decoration-slate-600 underline-offset-4"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Quick View */}
          <div id="footer-col-contact" className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">고객 센터</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center space-x-2">
                <Phone className={`w-4 h-4 ${theme.text} shrink-0`} />
                <a
                  href={`tel:${config.phone}`}
                  className="hover:text-white transition-colors cursor-pointer hover:underline focus:outline-none"
                  title="전화 걸기"
                >
                  {config.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className={`w-4 h-4 ${theme.text} shrink-0`} />
                <a
                  href={`mailto:${config.email}`}
                  className="hover:text-white transition-colors cursor-pointer hover:underline focus:outline-none break-all"
                  title="이메일 보내기"
                >
                  {config.email}
                </a>
              </li>
              {config.fax && (
                <li className="flex items-center space-x-2">
                  <Printer className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>FAX: {config.fax}</span>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Corporate Legal Declarations */}
        <div id="footer-legal" className="pt-8 text-xs text-slate-500 leading-relaxed space-y-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-400 font-medium">
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              이용약관
            </button>
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-white font-semibold text-slate-300 transition-colors cursor-pointer focus:outline-none"
            >
              개인정보처리방침
            </button>
            <button
              onClick={() => onOpenPolicy('email')}
              className="hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              이메일무단수집거부
            </button>
            {showAdminMenu && (
              <button onClick={() => handleQuickLink('admin')} className="hover:text-white transition-colors text-slate-500 cursor-pointer">
                관리자페이지로그인
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 border-t border-slate-800/50 pt-4">
            <p>상호: {config.companyNameEng} | 대표이사: {config.ceoName}</p>
            <p>사업자등록번호: {config.registrationNumber}</p>
            <p>주소: {config.address}</p>
          </div>
          <div className="flex items-center justify-between pt-4 text-[11px]">
            <p>© 2026 {config.companyNameEng}. All Rights Reserved. Designed for Logistics & OutSourcing Excellence.</p>
            <div className="flex items-center space-x-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>보안서버 작동중</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
