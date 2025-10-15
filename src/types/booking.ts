// Booking-related type definitions

export interface SeasonBreakdown {
  season: 'high' | 'mid' | 'low' | 'unavailable';
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  name: string;
}

export interface PriceDetails {
  pricePerNight: number;
  totalNights: number;
  basePrice: number;
  cleaningFee: number;
  securityDeposit: number;
  discount?: {
    percentage: number;
    amount: number;
    reason: string;
  };
  totalPrice: number;
  season: 'high' | 'mid' | 'low' | 'unavailable' | 'mixed';
  seasonBreakdown?: SeasonBreakdown[];
}

