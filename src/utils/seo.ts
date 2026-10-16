import { SITE_CONFIG } from '../config/site';

export interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  schema?: object;
  ogType?: 'website' | 'article';
}

const BASE_URL = SITE_CONFIG.url;

export function updateSeo(config: SeoConfig) {
  const fullTitle = config.title.includes('AINOVEX')
    ? config.title
    : `${config.title} | AINOVEX`;

  document.title = fullTitle;

  const url = `${BASE_URL}${config.path || window.location.pathname}`;

  // Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // Canonical
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', url);

  // Open Graph
  updateMeta('property', 'og:title', fullTitle);
  updateMeta('property', 'og:description', config.description);
  updateMeta('property', 'og:url', url);
  updateMeta('property', 'og:type', config.ogType || 'website');

  // Twitter
  updateMeta('name', 'twitter:title', fullTitle);
  updateMeta('name', 'twitter:description', config.description);
  updateMeta('name', 'twitter:url', url);

  // Structured Data (JSON-LD)
  let scriptSchema = document.getElementById('page-dynamic-schema') as HTMLScriptElement | null;
  if (config.schema) {
    if (!scriptSchema) {
      scriptSchema = document.createElement('script');
      scriptSchema.id = 'page-dynamic-schema';
      scriptSchema.type = 'application/ld+json';
      document.head.appendChild(scriptSchema);
    }
    scriptSchema.textContent = JSON.stringify(config.schema);
  } else if (scriptSchema) {
    scriptSchema.remove();
  }
}

function updateMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}
