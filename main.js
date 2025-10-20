// Configuration
const NGINX_BASE_URL = 'https://borg286.github.io/samplesite';

// Utilities
const createSection = (title, content = '') => `
    <h2 class="section-title">${title}</h2>
    <div id="${title.toLowerCase().replace(/\s+/g, '')}Content">${content}</div>
`;

const spinner = '<div class="text-center"><div class="spinner-border text-primary"><span class="visually-hidden">Loading...</span></div></div>';
const errorMsg = (type) => `<div class="alert alert-danger">Failed to load ${type} information.</div>`;

// Module Loader
class ModuleLoader {
    constructor() {
        this.loaded = new Set();
        this.loading = new Map();
    }

    async load(name) {
        if (this.loaded.has(name)) return Promise.resolve();
        if (this.loading.has(name)) return this.loading.get(name);

        const promise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${NGINX_BASE_URL}/${name}.js`;
            script.async = true;
            script.onload = () => {
                this.loaded.add(name);
                this.loading.delete(name);
                resolve();
            };
            script.onerror = () => {
                this.loading.delete(name);
                reject(new Error(`Failed to load: ${name}`));
            };
            document.head.appendChild(script);
        });

        this.loading.set(name, promise);
        return promise;
    }
}

const loader = new ModuleLoader();

// Section Loaders
const sections = {
    pricing: {
        title: 'Pricing',
        init: 'initPricing',
        module: 'pricing'
    },
    reviews: {
        title: 'Customer Reviews',
        init: 'initReviews',
        module: 'reviews'
    },
    contact: {
        title: 'Contact Us',
        init: 'initContacts',
        module: 'contacts',
        subtitle: '<p class="text-center mb-4">Get in touch with us to learn more about our products</p>'
    }
};

async function loadSection(id) {
    const section = sections[id];
    const container = document.querySelector(`#${id} .container`);
    
    container.innerHTML = createSection(section.title, spinner);
    if (section.subtitle) {
        container.querySelector('.section-title').insertAdjacentHTML('afterend', section.subtitle);
    }

    try {
        await loader.load(section.module);
        if (typeof window[section.init] === 'function') {
            window[section.init]();
        }
    } catch (error) {
        console.error(`Error loading ${id}:`, error);
        document.getElementById(`${id.toLowerCase()}Content`).innerHTML = errorMsg(id);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadSection(entry.target.id);
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '100px', threshold: 0.1 });

    // Observe sections
    Object.keys(sections).forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
