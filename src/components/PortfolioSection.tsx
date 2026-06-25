/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Calendar, Bookmark, Briefcase, X, ArrowUpRight } from 'lucide-react';
import { Portfolio, SiteConfig } from '../types';

interface PortfolioSectionProps {
  config: SiteConfig;
  portfolios: Portfolio[];
  theme: any;
}

export default function PortfolioSection({ config, portfolios, theme }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Portfolio | null>(null);

  const categories = ['전체', '물류도급', '창고 관리', '인력 아웃소싱', '업무 대행'];

  // Filtering Logic
  const filteredPortfolios = portfolios.filter((item) => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="portfolio-section" className="bg-slate-50 py-10 space-y-8">
      
      {/* Page Header inside Bento Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-sm text-center max-w-7xl mx-auto space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Achievements</h2>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900">도급 운영 및 사업 실적</h3>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            <span className="text-red-600 font-bold">(주)순순</span>이 성공적으로 운영 중이거나 완수한 주요 파트너사의 물류 위탁 프로젝트 실적입니다.
          </p>
        </div>
      </div>

      {/* Filtering & Search Controls Bento Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/50 rounded-3xl p-6 flex flex-col md:flex-row gap-6 justify-between items-center shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`cat-tab-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 ${
                    isActive
                      ? `${theme.primary} text-white shadow-sm`
                      : 'bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="portfolio-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="프로젝트명, 파트너사 검색..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>

        </div>
      </div>

      {/* Portfolio Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPortfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {filteredPortfolios.map((item) => (
              <div
                key={item.id}
                id={`portfolio-card-${item.id}`}
                onClick={() => setActiveProject(item)}
                className="bg-white border border-slate-200/50 rounded-3xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col cursor-pointer group shadow-sm"
              >
                {/* Photo Header */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category overlay */}
                  <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full shadow-sm ${theme.primary}`}>
                    {item.category}
                  </span>
                </div>

                {/* Body details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1 text-[11px] text-slate-400 font-mono">
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold">{item.client}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-slate-950 transition-colors duration-200 line-clamp-1">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights overview */}
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Highlights</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights.slice(0, 3).map((hl, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-50 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md">
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100/50 flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>운영 개시: {item.date}</span>
                  </span>
                  <span className={`flex items-center space-x-1 ${theme.text}`}>
                    <span>상세 실적서 보기</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3 shadow-sm">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">검색된 포트폴리오가 없습니다.</p>
            <p className="text-xs text-slate-400">다른 키워드나 전체 카테고리 탭을 선택해 주십시오.</p>
          </div>
        )}
      </div>

      {/* Portfolio Detail Modal (팝업) */}
      {activeProject && (
        <div id="portfolio-detail-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl flex flex-col">
            
            {/* Header image background */}
            <div className="relative h-64 w-full bg-slate-100 shrink-0">
              <img
                src={activeProject.imageUrl}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer transition-colors"
                title="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Title inside overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded ${theme.primary}`}>
                  {activeProject.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                  {activeProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6 overflow-y-auto">
              
              {/* Project brief meta */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-semibold text-slate-700">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">주관 파트너사</p>
                  <p className="text-slate-900 font-bold">{activeProject.client}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">도급 가동 개시일</p>
                  <p className="text-slate-900 font-bold">{activeProject.date}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h5 className="text-sm font-bold text-slate-900">운영 성과 및 프로젝트 개요</h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                  {activeProject.description}
                </p>
              </div>

              {/* Detailed Highlights */}
              <div className="space-y-3 border-t border-slate-100 pt-5">
                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide">수행 성과 성적표 (KPI 기준)</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50/60 border border-slate-100 p-3 rounded-xl font-semibold">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${theme.primary}`}></span>
                      <span className="leading-relaxed">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveProject(null)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-950 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                확인 및 닫기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
