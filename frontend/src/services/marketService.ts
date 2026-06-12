/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MarketPrice } from '../types';
import { getSavedMarketPrices } from './dbStore';

export async function getMarketPrices(): Promise<MarketPrice[]> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  return getSavedMarketPrices();
}
