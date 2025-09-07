/**
 * Google Analytics 4 (GA4) utility for Casa Mi Sueño
 * Tracks important events for vacation rental business insights
 */

// GA4 Event Types for vacation rental business
export interface BookingEventData {
  check_in_date: string;
  check_out_date: string;
  nights: number;
  guests: number;
  total_price: number;
  season: string;
  booking_type: 'regular' | 'overwinter' | 'mixed';
}

export interface ContactEventData {
  form_type: 'booking' | 'contact' | 'whatsapp';
  page_location: string;
}

export interface PageViewData {
  page_title: string;
  page_location: string;
  content_group?: string;
}

// Check if gtag is available
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track page views with enhanced data
 */
export const trackPageView = (data: PageViewData): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('config', 'G-KK47JYMKEJ', {
    page_title: data.page_title,
    page_location: data.page_location,
    content_group1: data.content_group || 'Vacation Rental'
  });
};

/**
 * Track booking inquiry submissions
 */
export const trackBookingInquiry = (data: BookingEventData): void => {
  if (!isGtagAvailable()) return;

  // Track as enhanced ecommerce event
  window.gtag!('event', 'booking_inquiry', {
    event_category: 'engagement',
    event_label: 'Booking Form Submission',
    value: data.total_price,
    currency: 'EUR',
    check_in_date: data.check_in_date,
    check_out_date: data.check_out_date,
    nights: data.nights,
    guests: data.guests,
    season: data.season,
    booking_type: data.booking_type,
    custom_parameter_1: `${data.nights}nights_${data.guests}guests`,
    custom_parameter_2: data.season
  });

  // Also track as conversion
  window.gtag!('event', 'conversion', {
    send_to: 'G-KK47JYMKEJ/booking_inquiry',
    value: data.total_price,
    currency: 'EUR'
  });
};

/**
 * Track contact form submissions
 */
export const trackContactForm = (data: ContactEventData): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'contact_form_submit', {
    event_category: 'engagement',
    event_label: `${data.form_type} Form Submission`,
    page_location: data.page_location,
    form_type: data.form_type
  });
};

/**
 * Track WhatsApp clicks
 */
export const trackWhatsAppClick = (page_location: string): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'whatsapp_click', {
    event_category: 'engagement',
    event_label: 'WhatsApp Contact',
    page_location: page_location,
    outbound: true
  });
};

/**
 * Track photo gallery interactions
 */
export const trackPhotoView = (photo_name: string, gallery_type: 'house' | 'surroundings'): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'photo_view', {
    event_category: 'engagement',
    event_label: `Photo: ${photo_name}`,
    gallery_type: gallery_type,
    photo_name: photo_name
  });
};

/**
 * Track pricing calculator usage
 */
export const trackPricingCalculation = (data: Partial<BookingEventData>): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'pricing_calculation', {
    event_category: 'engagement',
    event_label: 'Price Calculator Used',
    nights: data.nights || 0,
    guests: data.guests || 0,
    season: data.season || 'unknown',
    estimated_value: data.total_price || 0
  });
};

/**
 * Track PDF downloads (if any)
 */
export const trackPdfDownload = (pdf_name: string): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'file_download', {
    event_category: 'engagement',
    event_label: `PDF Download: ${pdf_name}`,
    file_name: pdf_name,
    file_extension: 'pdf'
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, link_text: string): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'click', {
    event_category: 'outbound',
    event_label: link_text,
    outbound: true,
    destination: url
  });
};

/**
 * Track scroll depth (useful for engagement)
 */
export const trackScrollDepth = (percentage: number, page: string): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'scroll', {
    event_category: 'engagement',
    event_label: `${percentage}% Scroll`,
    scroll_depth: percentage,
    page_location: page
  });
};

/**
 * Track seasonal interest (which months users are looking at)
 */
export const trackSeasonalInterest = (month: string, season: string): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'seasonal_interest', {
    event_category: 'engagement',
    event_label: `Interest in ${month}`,
    month: month,
    season: season
  });
};

/**
 * Track booking errors/issues
 */
export const trackBookingError = (error_type: string, error_message: string): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'booking_error', {
    event_category: 'error',
    event_label: error_type,
    error_message: error_message,
    fatal: false
  });
};

export default {
  trackPageView,
  trackBookingInquiry,
  trackContactForm,
  trackWhatsAppClick,
  trackPhotoView,
  trackPricingCalculation,
  trackPdfDownload,
  trackExternalLink,
  trackScrollDepth,
  trackSeasonalInterest,
  trackBookingError
}; 