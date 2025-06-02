// SEO and Performance Optimization JavaScript
(function() {
    'use strict';

    // Lazy loading images for better performance
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Optimize font loading
    function optimizeFonts() {
        // Add font-display: swap to Google Fonts for better performance
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            if (!link.href.includes('display=swap')) {
                link.href += link.href.includes('?') ? '&display=swap' : '?display=swap';
            }
        });
    }

    // Add structured data for better SEO
    function addBreadcrumbStructuredData() {
        const breadcrumbs = document.querySelector('nav[aria-label="Breadcrumb"]');
        if (breadcrumbs) {
            const breadcrumbData = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": []
            };

            const links = breadcrumbs.querySelectorAll('a');
            links.forEach((link, index) => {
                breadcrumbData.itemListElement.push({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": link.textContent.trim(),
                    "item": link.href
                });
            });

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(breadcrumbData);
            document.head.appendChild(script);
        }
    }

    // Optimize critical resources loading
    function optimizeResourceLoading() {
        // Preload critical CSS
        const criticalCSS = [
            './assets/css/style.css'
        ];

        criticalCSS.forEach(css => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = css;
            link.onload = function() {
                this.onload = null;
                this.rel = 'stylesheet';
            };
            document.head.appendChild(link);
        });

        // Preload critical images
        const criticalImages = [
            './assets/img/profile_img.jpg'
        ];

        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img;
            document.head.appendChild(link);
        });
    }

    // Add meta viewport for better mobile SEO
    function ensureViewportMeta() {
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(viewport);
        }
    }

    // Optimize images alt attributes for accessibility and SEO
    function optimizeImageAltText() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            // Add generic alt text if missing
            if (!img.alt) {
                const figcaption = img.closest('figure')?.querySelector('figcaption');
                const title = img.title;
                const filename = img.src.split('/').pop().split('.')[0];
                
                img.alt = figcaption?.textContent || title || `Image: ${filename}` || 'Portfolio image';
            }
        });
    }

    // Add loading indicators for better UX
    function addLoadingIndicators() {
        // Add loading state for async content
        const asyncElements = document.querySelectorAll('[data-async]');
        asyncElements.forEach(element => {
            element.setAttribute('aria-busy', 'true');
            element.setAttribute('aria-live', 'polite');
        });
    }

    // Performance monitoring for Core Web Vitals
    function monitorPerformance() {
        if ('web-vital' in window) {
            // Monitor Core Web Vitals if web-vitals library is available
            import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            }).catch(() => {
                // Fallback if web-vitals is not available
                console.log('Web Vitals monitoring not available');
            });
        }
    }

    // Service Worker registration for offline functionality
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Initialize all optimizations
    function init() {
        // Run immediately
        ensureViewportMeta();
        optimizeFonts();
        
        // Run after DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                lazyLoadImages();
                addBreadcrumbStructuredData();
                optimizeImageAltText();
                addLoadingIndicators();
            });
        } else {
            lazyLoadImages();
            addBreadcrumbStructuredData();
            optimizeImageAltText();
            addLoadingIndicators();
        }

        // Run after page is fully loaded
        window.addEventListener('load', () => {
            optimizeResourceLoading();
            monitorPerformance();
            registerServiceWorker();
        });
    }

    // Start optimization
    init();

})(); 