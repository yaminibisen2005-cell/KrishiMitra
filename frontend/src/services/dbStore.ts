/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MarketPrice, CropRecommendationResult } from '../types';

export interface HelplineTicket {
  id: string;
  farmerName: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Resolved';
  adminReply?: string;
  date: string;
}

// Default initial datasets
const DEFAULT_MARKET_PRICES: MarketPrice[] = [
  {
    id: 'm-001',
    crop: 'Tomato',
    price: 2200,
    previousPrice: 1950,
    trend: 'up',
    hub: 'Kalyan APMC',
    state: 'Maharashtra',
    category: 'Vegetables',
  },
  {
    id: 'm-002',
    crop: 'Onion',
    price: 1800,
    previousPrice: 1850,
    trend: 'down',
    hub: 'Lasalgaon APMC',
    state: 'Maharashtra',
    category: 'Vegetables',
  },
  {
    id: 'm-003',
    crop: 'Wheat (Likhia)',
    price: 2600,
    previousPrice: 2600,
    trend: 'stable',
    hub: 'Khanna Mandi',
    state: 'Punjab',
    category: 'Grains',
  },
  {
    id: 'm-004',
    crop: 'Rice (Basmati)',
    price: 3000,
    previousPrice: 2800,
    trend: 'up',
    hub: 'Karnal Mandi',
    state: 'Haryana',
    category: 'Grains',
  },
  {
    id: 'm-005',
    crop: 'Cotton',
    price: 7200,
    previousPrice: 7350,
    trend: 'down',
    hub: 'Adoni APMC',
    state: 'Andhra Pradesh',
    category: 'Cash Crops',
  },
  {
    id: 'm-006',
    crop: 'Soybean (Yellow)',
    price: 4600,
    previousPrice: 4400,
    trend: 'up',
    hub: 'Indore APMC',
    state: 'Madhya Pradesh',
    category: 'Cash Crops',
  },
  {
    id: 'm-007',
    crop: 'Tur Dal',
    price: 9800,
    previousPrice: 9500,
    trend: 'up',
    hub: 'Latur APMC',
    state: 'Maharashtra',
    category: 'Grains',
  },
  {
    id: 'm-008',
    crop: 'Potato (Jyoti)',
    price: 1450,
    previousPrice: 1450,
    trend: 'stable',
    hub: 'Hooghly APMC',
    state: 'West Bengal',
    category: 'Vegetables',
  },
];

const DEFAULT_HELPLINE_TICKETS: HelplineTicket[] = [
  {
    id: 'ticket-101',
    farmerName: 'Ramesh Kumawat',
    phone: '9845210452',
    subject: 'Yellowing of soybean leaves',
    message: 'My yellow soybean crop leaves have started showing minor rust stains. I have sprayed neem mixture but it is rising.',
    status: 'Pending',
    date: '2026-06-11 14:30',
  },
  {
    id: 'ticket-102',
    farmerName: 'Sukhdev Singh',
    phone: '7765123049',
    subject: 'Mandi pricing query basmati',
    message: 'Is the Basmati Rice mandi rate expected to hit ₹3200 this week? Let me know the trend index.',
    status: 'Resolved',
    adminReply: 'High demand trends in Haryana APMC forecast price reaching ₹3205 within 4 days. Keep checking live Market Prices tracker.',
    date: '2026-06-10 11:15',
  },
];

// Localstorage keys
const KEYS = {
  MARKET: 'krishimitra_market_prices',
  HELPLINE: 'krishimitra_helpline_tickets',
};

export function initializeDB() {
  if (!localStorage.getItem(KEYS.MARKET)) {
    localStorage.setItem(KEYS.MARKET, JSON.stringify(DEFAULT_MARKET_PRICES));
  }
  if (!localStorage.getItem(KEYS.HELPLINE)) {
    localStorage.setItem(KEYS.HELPLINE, JSON.stringify(DEFAULT_HELPLINE_TICKETS));
  }
}

// Get prices list
export function getSavedMarketPrices(): MarketPrice[] {
  initializeDB();
  try {
    const raw = localStorage.getItem(KEYS.MARKET);
    return raw ? JSON.parse(raw) : DEFAULT_MARKET_PRICES;
  } catch {
    return DEFAULT_MARKET_PRICES;
  }
}

// Save prices list
export function saveMarketPrices(prices: MarketPrice[]) {
  localStorage.setItem(KEYS.MARKET, JSON.stringify(prices));
}

// Get ticket list
export function getSavedHelplineTickets(): HelplineTicket[] {
  initializeDB();
  try {
    const raw = localStorage.getItem(KEYS.HELPLINE);
    return raw ? JSON.parse(raw) : DEFAULT_HELPLINE_TICKETS;
  } catch {
    return DEFAULT_HELPLINE_TICKETS;
  }
}

// Save tickets list
export function saveHelplineTickets(tickets: HelplineTicket[]) {
  localStorage.setItem(KEYS.HELPLINE, JSON.stringify(tickets));
}
