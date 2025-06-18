import { boot } from 'quasar/wrappers';
import { Router } from 'vue-router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router;
  }
}

export default boot(({ router }) => {
  // Handle navigation errors
  router.onError((error) => {
    console.error('Navigation error:', error);
  });

  // Add navigation guards if needed
  router.beforeEach((to, from, next) => {
    // Always scroll to top when navigating
    window.scrollTo(0, 0);
    next();
  });
}); 