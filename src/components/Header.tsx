/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ShieldAlert, FileText, Landmark, Users, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteConfig } from '../types';
import Logo from './Logo';

interface HeaderProps {
  config: SiteConfig;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  theme: any; // theme color object
}

export default function Header({ config, currentSection, setCurrentSection, theme }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'about', label: '회사소개' },
    { id: 'services', label: '서비스' },
    { id: 'portfolio', label: '포트폴리오/실적' },
    { id: 'contact', label: '고객지원' },
  ];

  const handleNavClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="site-header" className="sticky top-4 z-50 bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-sm rounded-2xl max-w-7xl mx-auto w-[calc(100%-2rem)] px-4 sm:px-6 lg:px-8 mb-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            id="header-logo"
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center p-1.5 ${theme.primary} text-white shadow-sm group-hover:scale-105 transition-transform duration-200`}>
              <Logo className="w-full h-full" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-1">
                {config.companyName}
                <span className={`w-1.5 h-1.5 rounded-full ${theme.primary}`}></span>
              </span>
              <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase -mt-1">
                {config.companyNameEng}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-medium tracking-tight transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme.primary}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls (Admin Portal Access) */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="nav-btn-admin"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all duration-200 ${
                currentSection === 'admin'
                  ? `${theme.primary} text-white border-transparent`
                  : 'text-gray-600 bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>관리자 시스템</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-admin-quick-btn"
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-lg border cursor-pointer ${
                currentSection === 'admin' ? `${theme.primary} text-white` : 'text-gray-500 bg-gray-50'
              }`}
              title="관리자 설정"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium cursor-pointer transition-colors ${
                      isActive
                        ? `${theme.lightBg} ${theme.text} font-semibold`
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 mt-2 border-t border-gray-100">
                <button
                  id="mobile-nav-btn-admin"
                  onClick={() => handleNavClick('admin')}
                  className={`flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg text-sm font-semibold border cursor-pointer transition-all ${
                    currentSection === 'admin'
                      ? `${theme.primary} text-white border-transparent`
                      : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>관리자 대시보드 시스템</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
