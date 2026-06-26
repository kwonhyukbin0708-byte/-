/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { X, Shield, FileText, Ban } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'terms' | 'privacy' | 'email';
  theme: any;
}

export default function PolicyModal({ isOpen, onClose, initialTab, theme }: PolicyModalProps) {
  const [currentTab, setCurrentTab] = useState<'terms' | 'privacy' | 'email'>(initialTab);

  // Synchronize initialTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'terms', label: '이용약관', icon: FileText },
    { id: 'privacy', label: '개인정보처리방침', icon: Shield },
    { id: 'email', label: '이메일무단수집거부', icon: Ban },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal content box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${theme.bg}`}></span>
              <span>(주)순순 기업 정책 및 약관</span>
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 px-6">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? `border-red-600 text-red-600 bg-white -mb-px rounded-t-xl shadow-[0_-2px_10px_rgba(0,0,0,0.02)]`
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Policy Body */}
          <div className="p-6 overflow-y-auto text-sm text-slate-600 leading-relaxed space-y-6 flex-1 font-sans">
            {currentTab === 'terms' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">제1조 (목적)</h4>
                  <p>본 약관은 (주)순순(이하 "회사")이 운영하는 공식 웹사이트가 제공하는 제반 서비스 및 온라인 도급/상담 제안 시스템의 이용 조건, 절차 및 이용자의 권리와 책임 사항을 규정함을 목적으로 합니다.</p>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">제2조 (용어의 정의)</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"서비스"란 회사가 웹사이트를 통해 제공하는 견적 문의, 사업 실적 조회, 상담 서비스 등을 의미합니다.</li>
                    <li>"이용자"란 본 약관에 따라 웹사이트에 접속하여 회사가 제공하는 서비스를 이용하는 고객(개인 및 기업)을 의미합니다.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">제3조 (약관의 명시와 개정)</h4>
                  <p>회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 사이트 하단에 게시합니다. 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있으며, 약관 개정 시 최소 7일 전에 홈페이지를 통해 공지합니다.</p>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">제4조 (서비스 제공 및 중단)</h4>
                  <p>회사는 연중무휴, 1일 24시간 서비스 제공을 원칙으로 합니다. 다만, 시스템 정기 점검, 설비 장애, 국가 비상사태 등의 합리적 사유가 있을 경우에는 예외적으로 서비스의 전부 또는 일부를 제한하거나 일시 중지할 수 있습니다.</p>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">제5조 (이용자의 의무)</h4>
                  <p>이용자는 다음 각 호의 행위를 하여서는 안 됩니다.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>견적 문의 및 상담 신청 시 타인의 정보 도용 및 허위 사실 기재</li>
                    <li>회사가 제공하는 콘텐츠의 무단 복제, 배포 및 변경 행위</li>
                    <li>당사 서버에 해킹 시도 또는 악성 프로그램을 업로드하는 행위</li>
                    <li>기타 관계 법령 및 미풍양속에 반하는 행위</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">제6조 (관할 법원)</h4>
                  <p>본 서비스 이용과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우, 회사 소재지 관할 법원을 제1심 관할 법원으로 지정합니다.</p>
                </div>
              </div>
            )}

            {currentTab === 'privacy' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 mb-4">시행일자: 2026년 06월 26일</p>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">1. 수집하는 개인정보 항목</h4>
                  <p>회사는 온라인 견적 및 파트너 제안 문의 접수 시 다음과 같은 필수 개인정보를 수집하고 있습니다.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>필수 항목: 회사명, 담당자 이름, 연락처(휴대폰 번호), 이메일 주소, 상담 세부 내용</li>
                    <li>선택 항목: 첨부파일(회사 소개서, 사업자등록증 등)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">2. 수집 및 이용 목적</h4>
                  <p>회사는 수집한 개인정보를 다음의 목적 이외의 용도로는 사용하지 않으며, 목적이 변경될 시 사전 동의를 구합니다.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>물류 도급 및 라스트마일 인력 배치 등 견적 산출 및 제안서 제공</li>
                    <li>상담 요청에 대한 유선 및 서면 피드백, 일정 조율 및 진행 상황 고지</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">3. 개인정보의 보유 및 이용 기간</h4>
                  <p>이용자의 개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기하는 것을 원칙으로 합니다. 다만, 상담 이력 관리 및 향후 분쟁 조정을 위하여 내부 방침에 따라 3년간 보관 후 영구 파기합니다.</p>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">4. 개인정보의 파기 절차 및 방법</h4>
                  <p>회사는 보유 기간이 경과한 개인정보를 아래의 방법으로 안전하게 파기합니다.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>전자적 파일 형태: 복구 및 재생이 불가능한 기술적 방법을 사용하여 영구 삭제</li>
                    <li>종이 출력물 형태: 분쇄기를 이용하여 완전히 파쇄 처리</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">5. 동의 거부 권리 및 제한 사항</h4>
                  <p>귀하는 본 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 다만, 동의를 거부하는 경우 온라인 문의하기 및 도급 견적 분석 답변 서비스의 이용이 제한될 수 있음을 안내드립니다.</p>
                </div>
              </div>
            )}

            {currentTab === 'email' && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-red-800 text-xs sm:text-sm">
                  <p className="font-bold mb-1">📢 무단 이메일 수집을 전면 거부합니다.</p>
                  <p className="leading-relaxed">본 홈페이지에 게시된 이메일 주소가 자동 이메일 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반할 시 정보통신망법에 의해 민형사상 처벌을 받을 수 있습니다.</p>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">법적 근거 (정보통신망 이용촉진 및 정보보호 등에 관한 법률)</h4>
                  <div className="bg-slate-50 p-4 rounded-xl space-y-3 font-mono text-xs text-slate-600 leading-normal border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">제50조의2 (전자우편주소의 무단 수집행위 등 금지)</p>
                      <p className="mt-1">① 누구든지 전자우편주소의 수집을 거부하는 의사가 명시된 인터넷 홈페이지에서 자동으로 전자우편주소를 수집하는 프로그램 그 밖의 기술적 장치를 이용하여 전자우편주소를 수집하여서는 아니된다.</p>
                      <p className="mt-1">② 누구든지 제1항의 규정을 위반하여 수집된 전자우편주소를 판매·유통하여서는 아니된다.</p>
                      <p className="mt-1">③ 누구든지 제1항 및 제2항의 규정에 의하여 수집·판매 및 유통이 금지된 전자우편주소임을 알고 이를 정보전송에 이용하여서는 아니된다.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">위반 시 조치</h4>
                  <p>이메일 무단 수집 행위가 발각될 시 예고 없이 차단 조치되며, 민형사상의 소송 제기 및 정보통신망법에 근거한 과태료 부과 등의 강력한 법적 대응을 취할 것임을 알려드립니다.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer close */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-xl text-sm font-semibold shadow-sm text-white transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
            >
              확인 및 닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
