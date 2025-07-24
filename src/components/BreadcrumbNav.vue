<template>
  <nav class="breadcrumb-nav q-py-md" aria-label="Breadcrumb navigatie">
    <div class="container">
      <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li 
          v-for="(breadcrumb, index) in breadcrumbs" 
          :key="index"
          class="breadcrumb-item"
          itemprop="itemListElement" 
          itemscope 
          itemtype="https://schema.org/ListItem"
        >
          <router-link 
            v-if="!breadcrumb.isLast"
            :to="breadcrumb.path"
            class="breadcrumb-link"
            itemprop="item"
          >
            <span itemprop="name">{{ breadcrumb.name }}</span>
          </router-link>
          <span 
            v-else 
            class="breadcrumb-current"
            itemprop="name"
          >
            {{ breadcrumb.name }}
          </span>
          <meta itemprop="position" :content="index + 1" />
          <q-icon 
            v-if="!breadcrumb.isLast" 
            name="chevron_right" 
            class="breadcrumb-separator" 
            size="14px"
            aria-hidden="true"
          />
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

interface Breadcrumb {
  name: string;
  path: string;
  isLast: boolean;
}

const route = useRoute();

const breadcrumbMap: Record<string, string> = {
  '/': 'Home',
  '/over-ons': 'Over Ons',
  '/het-huis': 'Het Huis',
  '/buiten-leven': 'Buiten Leven',
  '/omgeving': 'Omgeving',
  '/fotos': 'Foto\'s',
  '/praktisch': 'Praktische Informatie',
  '/contact': 'Contact',
  '/reserveren': 'Reserveren',
  '/privacy': 'Privacy',
  '/algemene-voorwaarden': 'Algemene Voorwaarden'
};

const breadcrumbs = computed((): Breadcrumb[] => {
  const currentPath = route.path;
  
  // Always start with home
  const crumbs: Breadcrumb[] = [
    { name: 'Home', path: '/', isLast: false }
  ];
  
  // Add current page if not home
  if (currentPath !== '/') {
    const currentName = breadcrumbMap[currentPath] || 'Pagina';
    crumbs.push({
      name: currentName,
      path: currentPath,
      isLast: true
    });
    
    // Mark home as not last
    crumbs[0].isLast = false;
  } else {
    // If we're on home, mark it as last
    crumbs[0].isLast = true;
  }
  
  return crumbs;
});
</script>

<style scoped>
.breadcrumb-nav {
  background: var(--cms-sand);
  border-bottom: 1px solid rgba(139, 90, 60, 0.1);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-link {
  color: var(--cms-olive);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--cms-deep-terracotta);
  text-decoration: underline;
}

.breadcrumb-current {
  color: var(--cms-navy);
  font-weight: 500;
}

.breadcrumb-separator {
  color: var(--cms-olive);
  opacity: 0.6;
}

@media (max-width: 768px) {
  .breadcrumb-nav {
    padding: 0.5rem 0;
  }
  
  .breadcrumb-list {
    font-size: 0.8rem;
    gap: 0.375rem;
  }
  
  .breadcrumb-item {
    gap: 0.375rem;
  }
}
</style> 