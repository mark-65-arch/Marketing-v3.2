// ⚡ Performance Utilities
// Purpose: Client-side performance optimizations and monitoring
// Features: Lazy loading, critical resource prioritization, performance monitoring

// 🖼️ Lazy Loading for Images
export function initializeLazyLoading(): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          // Load the actual image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');

            // Remove placeholder once loaded
            img.addEventListener('load', () => {
              img.classList.add('fade-in');
              img.removeAttribute('data-src');
            });

            observer.unobserve(img);
          }
        }
      });
    }, {
      // Load images 50px before they enter viewport
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    document.querySelectorAll('img[data-src]').forEach(img => {
      const image = img as HTMLImageElement;
      if (image.dataset.src) {
        image.src = image.dataset.src;
      }
    });
  }
}

// 🎬 Scroll-triggered Animations
export function initializeScrollAnimations(): void {
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      animationObserver.observe(element);
    });
  }
}

// 🎯 Critical Resource Preloading
export function preloadCriticalResources(): void {
  const criticalResources = [
    { href: '/fonts/poppins-bold.woff2', as: 'font', type: 'font/woff2' },
    { href: '/fonts/inter-regular.woff2', as: 'font', type: 'font/woff2' },
    { href: '/images/hero-bg.webp', as: 'image' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) {
      link.type = resource.type;
    }
    if (resource.as === 'font') {
      link.crossOrigin = 'anonymous';
    }

    // Only preload if resource exists
    fetch(resource.href, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          document.head.appendChild(link);
        }
      })
      .catch(() => {
        // Resource doesn't exist, skip preloading
        console.debug(`Skipping preload of ${resource.href} - not found`);
      });
  });
}

// 📊 Performance Monitoring
export interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  };

  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver(entryList => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.debug('LCP observer not supported');
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver(entryList => {
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            this.metrics.fid = entry.processingStart - entry.startTime;
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.debug('FID observer not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsScore = 0;
        const clsObserver = new PerformanceObserver(entryList => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
              this.metrics.cls = clsScore;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.debug('CLS observer not supported');
      }

      // First Contentful Paint (FCP)
      try {
        const fcpObserver = new PerformanceObserver(entryList => {
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      } catch (e) {
        console.debug('FCP observer not supported');
      }
    }

    // Time to First Byte (TTFB)
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        this.metrics.ttfb = navigationEntries[0].responseStart;
      }
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logMetrics(): void {
    console.group('🚀 Performance Metrics');
    console.log('Largest Contentful Paint (LCP):', this.metrics.lcp ? `${this.metrics.lcp.toFixed(2)}ms` : 'Not available');
    console.log('First Input Delay (FID):', this.metrics.fid ? `${this.metrics.fid.toFixed(2)}ms` : 'Not available');
    console.log('Cumulative Layout Shift (CLS):', this.metrics.cls ? this.metrics.cls.toFixed(4) : 'Not available');
    console.log('First Contentful Paint (FCP):', this.metrics.fcp ? `${this.metrics.fcp.toFixed(2)}ms` : 'Not available');
    console.log('Time to First Byte (TTFB):', this.metrics.ttfb ? `${this.metrics.ttfb.toFixed(2)}ms` : 'Not available');
    console.groupEnd();

    // Performance scoring
    this.scoreMetrics();
  }

  private scoreMetrics(): void {
    let score = 100;
    const issues: string[] = [];

    // LCP scoring (Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s)
    if (this.metrics.lcp !== null) {
      if (this.metrics.lcp > 4000) {
        score -= 30;
        issues.push('❌ LCP is poor (>4s)');
      } else if (this.metrics.lcp > 2500) {
        score -= 15;
        issues.push('⚠️ LCP needs improvement (>2.5s)');
      } else {
        issues.push('✅ LCP is good (<2.5s)');
      }
    }

    // FID scoring (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
    if (this.metrics.fid !== null) {
      if (this.metrics.fid > 300) {
        score -= 25;
        issues.push('❌ FID is poor (>300ms)');
      } else if (this.metrics.fid > 100) {
        score -= 10;
        issues.push('⚠️ FID needs improvement (>100ms)');
      } else {
        issues.push('✅ FID is good (<100ms)');
      }
    }

    // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (this.metrics.cls !== null) {
      if (this.metrics.cls > 0.25) {
        score -= 25;
        issues.push('❌ CLS is poor (>0.25)');
      } else if (this.metrics.cls > 0.1) {
        score -= 10;
        issues.push('⚠️ CLS needs improvement (>0.1)');
      } else {
        issues.push('✅ CLS is good (<0.1)');
      }
    }

    console.group(`📊 Performance Score: ${score}/100`);
    issues.forEach(issue => console.log(issue));
    console.groupEnd();
  }

  public destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// 🔄 Service Worker Registration (Progressive Web App)
export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker registered:', registration);

        // Update service worker when new version is available
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Show update notification to user
                console.log('🔄 New version available. Refresh to update.');
              }
            });
          }
        });
      } catch (error) {
        console.log('❌ Service Worker registration failed:', error);
      }
    });
  }
}

// 🎯 Critical CSS Inlining Helper
export function inlineCriticalCSS(cssContent: string): void {
  const style = document.createElement('style');
  style.textContent = cssContent;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
}

// 📦 Resource Hints Helper
export function addResourceHints(hints: Array<{
  rel: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';
  href: string;
  as?: string;
  type?: string;
  crossorigin?: boolean;
}>): void {
  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;

    if (hint.as) link.setAttribute('as', hint.as);
    if (hint.type) link.type = hint.type;
    if (hint.crossorigin) link.crossOrigin = 'anonymous';

    document.head.appendChild(link);
  });
}

// 🎯 Initialize All Performance Optimizations
export function initializePerformanceOptimizations(): void {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runOptimizations);
  } else {
    runOptimizations();
  }
}

function runOptimizations(): void {
  // Initialize lazy loading
  initializeLazyLoading();

  // Initialize scroll animations
  initializeScrollAnimations();

  // Preload critical resources
  preloadCriticalResources();

  // Start performance monitoring
  const monitor = new PerformanceMonitor();

  // Log metrics after page fully loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      monitor.logMetrics();
    }, 1000);
  });

  // Register service worker for PWA functionality
  registerServiceWorker();
}

// 🎭 Image Optimization Helpers
export function generateResponsiveImageSrcSet(
  basePath: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  return sizes
    .map(size => `${basePath}?w=${size}&q=80 ${size}w`)
    .join(', ');
}

export function generateImageSizes(
  breakpoints: Array<{ media?: string; size: string }>
): string {
  return breakpoints
    .map(bp => bp.media ? `${bp.media} ${bp.size}` : bp.size)
    .join(', ');
}