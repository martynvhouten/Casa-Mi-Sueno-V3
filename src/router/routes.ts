import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        name: 'home',
        component: () => import('pages/IndexPage.vue') 
      },
      { 
        path: 'over-ons', 
        name: 'about',
        component: () => import('pages/AboutPage.vue') 
      },
      { 
        path: 'het-huis', 
        name: 'house',
        component: () => import('pages/HousePage.vue') 
      },
      { 
        path: 'buiten-leven', 
        name: 'outdoor',
        component: () => import('pages/OutdoorPage.vue') 
      },
      { 
        path: 'omgeving', 
        name: 'surroundings',
        component: () => import('pages/LocationPage.vue') 
      },
      { 
        path: 'fotos', 
        name: 'photos',
        component: () => import('pages/PhotosPage.vue') 
      },
      { 
        path: 'praktisch', 
        name: 'practical',
        component: () => import('pages/PracticalPage.vue') 
      },
      { 
        path: 'contact', 
        name: 'contact',
        component: () => import('pages/ContactPage.vue') 
      },
      { 
        path: 'reserveren', 
        name: 'booking',
        component: () => import('pages/BookingPage.vue') 
      },
      { 
        path: 'privacy', 
        name: 'privacy',
        component: () => import('pages/PrivacyPage.vue') 
      },
      { 
        path: 'voorwaarden', 
        name: 'terms',
        component: () => import('pages/TermsPage.vue') 
      },
      { 
        path: 'sitemap', 
        name: 'sitemap',
        component: () => import('pages/SitemapPage.vue') 
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes; 