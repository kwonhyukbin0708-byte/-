/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Notice {
  id: string;
  title: string;
  content: string;
  writer: string;
  date: string;
  viewCount: number;
  isImportant: boolean;
}

export interface Portfolio {
  id: string;
  title: string;
  client: string;
  category: string;
  date: string;
  description: string;
  imageUrl: string;
  highlights: string[];
}

export interface Inquiry {
  id: string;
  companyName: string;
  requester: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
  budget: string;
  date: string;
  status: 'received' | 'in_progress' | 'completed';
}

export interface SiteConfig {
  companyName: string;
  companyNameEng: string;
  mainSlogan: string;
  subSlogan: string;
  accentColor: 'red' | 'blue' | 'emerald' | 'amber' | 'slate';
  phone: string;
  email: string;
  fax: string;
  address: string;
  registrationNumber: string;
  ceoName: string;
  kakaoLink: string;
  instagramLink: string;
  linkedinLink: string;
}

