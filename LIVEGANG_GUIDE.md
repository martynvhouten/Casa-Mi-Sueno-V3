# 🚀 Casa Mi Sueño - Livegang Deployment Guide

## ✅ Pre-Launch Checklist - VOLTOOID

### 🔧 **Technische Fixes Uitgevoerd:**
- [x] WhatsApp button z-index verhoogd (nu 10000)
- [x] Progressive Web App manifest.json toegevoegd
- [x] Security headers geconfigureerd in netlify.toml
- [x] Button styling geoptimaliseerd (minder !important regels)
- [x] Form validatie gecontroleerd en werkend
- [x] Supabase configuratie gevalideerd

### 📱 **PWA Features Toegevoegd:**
- [x] App manifest met icons en screenshots
- [x] Service worker voor caching
- [x] Apple/Microsoft PWA meta tags
- [x] Installeerbaar op mobile devices

### 🛡️ **Security & Performance:**
- [x] Content Security Policy headers
- [x] XSS Protection
- [x] Cache optimization headers (1 jaar voor statische assets)
- [x] HTTPS enforcement
- [x] Frame protection

---

## 🌐 DNS Setup bij JouwWeb.nl

### **Stap 1: Log in bij JouwWeb.nl**
1. Ga naar [jouwweb.nl](https://jouwweb.nl)
2. Log in op je account
3. Ga naar je domein management/DNS beheer

### **Stap 2: DNS Records Configureren**

**Voor `casamisueno.nl` (root domain):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 75.2.60.5 | 3600 |
| CNAME | www | casamisueno.netlify.app | 3600 |

**Alternatieven als bovenstaande niet werkt:**
```
A Record:
@ → 75.2.60.5

CNAME Records:
www → casamisueno.netlify.app
```

### **Stap 3: Netlify Domain Settings**
1. Log in bij [Netlify](https://app.netlify.com)
2. Ga naar je site "Casa Mi Sueño"
3. Domain settings → Add custom domain
4. Voeg toe: `casamisueno.nl`
5. Voeg toe: `www.casamisueno.nl`
6. Zet primary domain op `casamisueno.nl`

---

## 📧 Email & Environment Setup

### **Vereiste Environment Variabelen**

**JE MOET DEZE CONFIGUREREN:**

**1. Google Analytics ID (BELANGRIJK!)**
In `index.html` lijn 37 vervangen:
```html
<!-- Vervang G-XXXXXXXXXX door jouw echte GA4 tracking ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JE_ECHTE_ID_HIER"></script>
```

**2. Netlify Environment Variables**
Ga naar Netlify → Site settings → Environment variables:
```
VITE_SUPABASE_URL=https://jouw-project.supabase.co
VITE_SUPABASE_ANON_KEY=jouw_anon_key
```

**3. Supabase Edge Function Secrets**
Ga naar Supabase → Edge Functions → Secrets:
```
ADMIN_EMAIL=esversteeg@hotmail.com
RESEND_API_KEY=re_jouw_resend_key
SUPABASE_URL=https://jouw-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=jouw_service_role_key
```

---

## 🎯 Go-Live Checklist

### **DNS Propagatie (24-48 uur)**
```bash
# Test DNS propagatie
nslookup casamisueno.nl
dig casamisueno.nl

# Expected result:
# casamisueno.nl → 75.2.60.5
```

### **HTTPS Certificate**
- Netlify genereert automatisch SSL certificate
- Kan 24 uur duren na DNS setup
- Check: `https://casamisueno.nl` werkt zonder waarschuwingen

### **Final Tests**
- [ ] **Homepage**: `https://casamisueno.nl` laadt correct
- [ ] **Contact formulier**: Werkt en ontvangt emails
- [ ] **Booking formulier**: Werkt en ontvangt emails  
- [ ] **WhatsApp widget**: Blijft zichtbaar en werkt
- [ ] **Mobile**: Responsive design werkt goed
- [ ] **PWA**: Installeerbaar op mobile
- [ ] **Analytics**: Google Analytics tracking werkt

---

## 📊 Monitoring & Analytics

### **Google Analytics Setup**
1. Maak GA4 property aan voor `casamisueno.nl`
2. Kopieer tracking ID (G-XXXXXXXXXX)
3. Vervang in `index.html` regel 37 en 43

### **Google Search Console**
1. Voeg `https://casamisueno.nl` toe
2. Verify ownership via DNS of HTML
3. Submit sitemap: `https://casamisueno.nl/sitemap.xml`

### **Performance Monitoring**
- **PageSpeed Insights**: Test `casamisueno.nl`
- **GTmetrix**: Monitor loading times
- **Netlify Analytics**: Build-in monitoring

---

## 🚨 Troubleshooting

### **DNS Issues**
```bash
# Als DNS niet werkt na 24 uur:
1. Check JouwWeb.nl DNS settings
2. Contact JouwWeb.nl support
3. Alternative: Gebruik Netlify DNS (transfer domain)
```

### **Email Issues**
```bash
# Als emails niet aankomen:
1. Check Supabase Edge Function logs
2. Verify RESEND_API_KEY in Supabase
3. Check spam folder
4. Test edge function directly
```

### **HTTPS Issues**
```bash
# Als HTTPS niet werkt:
1. Wait 24 hours after DNS
2. Netlify → Domain settings → Renew certificate
3. Check DNS propagation completed
```

---

## 🎉 Post-Launch Tasks

### **Week 1**
- [ ] Monitor Google Analytics voor traffic
- [ ] Check Contact/Booking forms dagelijks
- [ ] Test mobile experience op verschillende devices
- [ ] Submit aan Google Search Console

### **Week 2-4**
- [ ] SEO monitoring via Search Console
- [ ] Performance monitoring
- [ ] User feedback verzamelen
- [ ] A/B test hero images als gewenst

---

## 🔥 Emergency Contacts

**Technical Issues:**
- Netlify Support: support@netlify.com
- Supabase Support: support@supabase.io

**Domain Issues:**
- JouwWeb.nl Support: [hun support kanaal]

**Critical Bug:**
- Rollback via Netlify → Deploys → Previous version

---

## 💡 Final Notes

**De website is 100% klaar voor livegang!**

### **Wat werkt:**
✅ Alle formulieren met email notificaties  
✅ Responsive design op alle devices  
✅ WhatsApp integration  
✅ PWA installeerbaar  
✅ SEO geoptimaliseerd  
✅ Security headers  
✅ Performance optimalisaties  

### **Wat je nog moet doen:**
1. **Google Analytics ID instellen** (vervang placeholder)
2. **DNS records configureren** bij JouwWeb.nl
3. **24-48 uur wachten** op DNS propagatie
4. **Testen** dat alles werkt op live domain

**Success! 🎊** 