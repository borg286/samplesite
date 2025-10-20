// Configuration for self-hosted JavaScript modules
const NGINX_BASE_URL = 'https://borg286.github.io/samplesite'; // Update this to your nginx server URL

// Lazy loading utility
class ModuleLoader {
    constructor() {
        this.loadedModules = new Set();
        this.loadingPromises = new Map();
    }

    async loadModule(moduleName) {
        if (this.loadedModules.has(moduleName)) {
            return Promise.resolve();
        }

        if (this.loadingPromises.has(moduleName)) {
            return this.loadingPromises.get(moduleName);
        }

        const loadPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${NGINX_BASE_URL}/${moduleName}.js`;
            script.async = true;
            
            script.onload = () => {
                this.loadedModules.add(moduleName);
                this.loadingPromises.delete(moduleName);
                resolve();
            };
            
            script.onerror = () => {
                this.loadingPromises.delete(moduleName);
                reject(new Error(`Failed to load module: ${moduleName}`));
            };
            
            document.head.appendChild(script);
        });

        this.loadingPromises.set(moduleName, loadPromise);
        return loadPromise;
    }
}

const moduleLoader = new ModuleLoader();

// Intersection Observer for lazy loading sections
const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            const sectionId = section.id;
            
            switch(sectionId) {
                case 'pricing':
                    loadPricingSection();
                    break;
                case 'reviews':
                    loadReviewsSection();
                    break;
                case 'contact':
                    loadContactSection();
                    break;
            }
            
            sectionObserver.unobserve(section);
        }
    });
}, observerOptions);

// Load pricing section
async function loadPricingSection() {
    try {
        await moduleLoader.loadModule('pricing');
        if (typeof initPricing === 'function') {
            initPricing();
        }
    } catch (error) {
        console.error('Error loading pricing module:', error);
        document.getElementById('pricingContent').innerHTML = 
            '<div class="alert alert-danger">Failed to load pricing information.</div>';
    }
}

// Load reviews section
async function loadReviewsSection() {
    try {
        await moduleLoader.loadModule('reviews');
        if (typeof initReviews === 'function') {
            initReviews();
        }
    } catch (error) {
        console.error('Error loading reviews module:', error);
        document.getElementById('reviewsContent').innerHTML = 
            '<div class="alert alert-danger">Failed to load reviews.</div>';
    }
}

// Load contact section
async function loadContactSection() {
    try {
        await moduleLoader.loadModule('contacts');
        if (typeof initContacts === 'function') {
            initContacts();
        }
    } catch (error) {
        console.error('Error loading contacts module:', error);
        document.getElementById('contactContent').innerHTML = 
            '<div class="alert alert-danger">Failed to load contact form.</div>';
    }
}

// Initialize observers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Observe sections for lazy loading
    const pricingSection = document.getElementById('pricing');
    const reviewsSection = document.getElementById('reviews');
    const contactSection = document.getElementById('contact');
    
    if (pricingSection) sectionObserver.observe(pricingSection);
    if (reviewsSection) sectionObserver.observe(reviewsSection);
    if (contactSection) sectionObserver.observe(contactSection);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
