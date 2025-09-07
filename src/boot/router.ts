import { boot } from 'quasar/wrappers';
import { Router } from 'vue-router';
import { trackPageView } from 'src/utils/analytics';
import { DEFAULT_META } from 'src/utils/meta';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router;
  }
}

export default boot(({ router }) => {
  // Handle navigation errors
  router.onError((error) => {
    // eslint-disable-next-line no-console
    console.error('Navigation error:', error);
  });

  // Add navigation guards
  router.beforeEach((to, from, next) => {
    // Always scroll to top when navigating
    window.scrollTo(0, 0);
    next();
  });

  // Send GA4 page_view on every route change complete
  router.afterEach((to) => {
    const path = to.fullPath;
    const pageTitle = document.title || DEFAULT_META.title;
    const pageLocation = `https://casamisueno.nl${path}`;
    trackPageView({
      page_title: pageTitle,
      page_location: pageLocation
    });
  });
}); 