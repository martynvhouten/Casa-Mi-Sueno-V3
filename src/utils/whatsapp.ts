interface WhatsAppConfig {
  phoneNumber: string;
  defaultMessage: string;
  getWhatsAppUrl: (isMobile: boolean, message?: string) => string;
}

export const WHATSAPP_CONFIG: WhatsAppConfig = {
  phoneNumber: '31683645489',
  defaultMessage: 'Hallo, ik heb een vraag over Casa Mi Sueño...',
  
  getWhatsAppUrl(isMobile: boolean, message = WHATSAPP_CONFIG.defaultMessage): string {
    const encodedMessage = encodeURIComponent(message);
    return isMobile
      ? `whatsapp://send?phone=${WHATSAPP_CONFIG.phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${WHATSAPP_CONFIG.phoneNumber}&text=${encodedMessage}`;
  }
}; 