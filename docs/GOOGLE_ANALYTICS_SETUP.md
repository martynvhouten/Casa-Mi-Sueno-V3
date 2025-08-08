# 📊 Google Analytics Setup - Casa Mi Sueño

## 🚀 Overzicht

Je website is nu volledig uitgerust met **Google Analytics 4 (GA4)** tracking! Dit document legt uit hoe je jouw eigen Google Analytics account opzet.

## 📋 Stap-voor-stap Setup

### 1. **Google Analytics Account Aanmaken**

1. Ga naar [Google Analytics](https://analytics.google.com/)
2. Klik op **"Meten starten"** of **"Create Account"**
3. Vul je accountnaam in: `Casa Mi Sueño`
4. Kies **"Web"** als platform
5. Vul je website informatie in:
   - **Website naam**: `Casa Mi Sueño - Vakantiehuis`
   - **Website URL**: `https://casamisueno.nl`
   - **Industry**: `Travel & Tourism`
   - **Tijdzone**: `Europe/Amsterdam`
   - **Valuta**: `EUR - Euro`

### 2. **GA4 Tracking ID Verkrijgen**

1. Na het aanmaken krijg je een **Tracking ID** in de vorm: `G-XXXXXXXXXX`
2. Kopieer dit ID (het begint altijd met `G-`)

### 3. **Tracking ID Toevoegen aan je Website**

1. Open het bestand `index.html` in je project
2. Zoek naar **alle** plaatsen waar `G-XXXXXXXXXX` staat (er zijn er 3)
3. Vervang `G-XXXXXXXXXX` door jouw echte tracking ID

**Voorbeelden van wat je moet vervangen:**
```html
<!-- Van dit: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- Naar dit (met jouw ID): -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ9"></script>
```

### 4. **Website Opnieuw Bouwen & Deployen**

```bash
npm run build
```

Dan je website opnieuw uploaden naar je hosting provider.

## 📈 Wat wordt er getracked?

### **🎯 Belangrijke Events**
- ✅ **Booking Inquiries**: Volledige reserveringsaanvragen
- ✅ **Pricing Calculations**: Wanneer gebruikers prijzen bekijken
- ✅ **WhatsApp Clicks**: Contact via WhatsApp
- ✅ **Photo Views**: Welke foto's bekeken worden
- ✅ **Contact Form**: Algemene contactformulier submissies
- ✅ **Seasonal Interest**: Welke maanden interessant zijn
- ✅ **Error Tracking**: Wanneer er problemen optreden

### **💰 Enhanced E-commerce**
- **Booking Values**: Exacte bedragen van reserveringen
- **Season Types**: Regular, Overwinter, Mixed seizoenen
- **Guest Numbers**: Aantal gasten per reservering
- **Stay Duration**: Lengte van verblijf

### **📱 Advanced Tracking**
- **Device Types**: Desktop, tablet, mobile
- **Traffic Sources**: Waar bezoekers vandaan komen
- **Page Performance**: Laadtijden en Core Web Vitals
- **Conversion Funnel**: Van bezoek tot reservering

## 🔍 Nuttige Rapporten in Google Analytics

### **1. Real-time Overview**
- Live bezoekers op je website
- Welke pagina's nu bekeken worden

### **2. Audience Reports** 
- **Demographics**: Leeftijd, geslacht, interesses
- **Geographic**: Welke landen/steden
- **Technology**: Welke apparaten en browsers
- **Behavior**: Nieuwe vs. terugkerende bezoekers

### **3. Acquisition Reports**
- **Traffic Sources**: Google, direct, social media
- **Campaigns**: Als je advertenties gaat doen
- **Search Console**: Welke zoektermen gebruikt worden

### **4. Behavior Reports**
- **Page Views**: Meest bekeken pagina's
- **Site Speed**: Hoe snel je website laadt
- **Events**: Alle getrackte acties (bookings, clicks, etc.)

### **5. Conversion Reports** 🎯
- **Goals**: Hoeveel reserveringen per maand
- **E-commerce**: Totale waarde van reserveringen
- **Funnels**: Waar mensen afhaken in het boekingsproces

## 🎯 Aanbevolen Goals & Conversions

### **Primary Goals:**
1. **Booking Inquiry Submitted** (Meest belangrijk!)
2. **WhatsApp Contact Started** 
3. **Contact Form Completed**
4. **Pricing Calculator Used** (3+ times = serious interest)

### **Secondary Goals:**
1. **Photo Gallery Engagement** (5+ photos viewed)
2. **Multiple Page Views** (3+ pages in session)
3. **Long Session Duration** (3+ minutes)

## 📊 Business Intelligence

### **Seizoensanalyse**
- **Overwinter Interesse**: Welke maanden November-Maart populair zijn
- **Regulier Seizoen**: April-October booking patterns
- **Peak Months**: Wanneer de meeste aanvragen komen

### **Pricing Optimization**
- **Most Calculated Periods**: Welke datums het meest bekeken worden
- **Price Sensitivity**: Bij welke bedragen mensen afhaken
- **Booking Lead Time**: Hoever van tevoren geboekt wordt

### **Marketing Insights**
- **Best Converting Traffic**: Welke bronnen de beste gasten leveren
- **Device Preferences**: Desktop vs. mobile booking behavior
- **Geographic Targeting**: Welke landen/regio's targeten voor marketing

## 🚀 Launch Checklist

- [ ] Google Analytics account aangemaakt
- [ ] GA4 Tracking ID vervangen in `index.html` (3 plaatsen)
- [ ] Website opnieuw gebouwd (`npm run build`)
- [ ] Website gedeployed 
- [ ] GA4 dashboard gecheckt (binnen 24u data zichtbaar)
- [ ] Goals en conversions ingesteld
- [ ] Real-time tracking getest

## 🎉 Je bent klaar!

Je hebt nu **professionele analytics** voor je vakantieverhuur! 

### **Wat je binnen 24-48 uur kunt verwachten:**
- ✅ Live bezoekersdata
- ✅ Exacte booking inquiry tracking
- ✅ Gedetailleerde seizoensanalyse
- ✅ ROI tracking voor je marketing

**Pro tip**: Check je analytics wekelijks en let vooral op de booking inquiry trends om je marketing te optimaliseren! 📈 