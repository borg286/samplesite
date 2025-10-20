// Contact form state and validation
const formState = {
    name: '',
    email: '',
    phone: '',
    message: '',
    spaIncluded: false,
    newsletter: false,
    productInterest: {
        case: false,
        wallet: false,
        holder: false,
        charger: false
    }
};

// Calculate form completion progress
function calculateProgress() {
    let filled = 0;
    let total = 7; // name, email, phone, message, spa, newsletter, at least one product
    
    if (formState.name) filled++;
    if (formState.email) filled++;
    if (formState.phone) filled++;
    if (formState.message) filled++;
    if (formState.newsletter !== null) filled++;
    if (formState.spaIncluded !== null) filled++;
    
    const hasProductSelected = Object.values(formState.productInterest).some(v => v);
    if (hasProductSelected) filled++;
    
    return Math.round((filled / total) * 100);
}

// Update progress bar
function updateProgressBar() {
    const progress = calculateProgress();
    const progressBar = document.getElementById('formProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
        progressBar.textContent = progress + '%';
    }
}

// Validate form
function validateForm() {
    let isValid = true;
    const errors = {};
    
    // Name validation
    if (!formState.name || formState.name.trim().length < 2) {
        errors.name = 'Please enter your full name';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email || !emailRegex.test(formState.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!formState.phone || !phoneRegex.test(formState.phone) || formState.phone.length < 10) {
        errors.phone = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Message validation
    if (!formState.message || formState.message.trim().length < 10) {
        errors.message = 'Please enter a message (at least 10 characters)';
        isValid = false;
    }
    
    // Product interest validation
    const hasProductSelected = Object.values(formState.productInterest).some(v => v);
    if (!hasProductSelected) {
        errors.products = 'Please select at least one product you\'re interested in';
        isValid = false;
    }
    
    return { isValid, errors };
}

// Display validation errors
function displayErrors(errors) {
    // Clear all previous errors
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.style.display = 'none';
    });
    
    // Display new errors
    Object.keys(errors).forEach(field => {
        const input = document.getElementById(field);
        const feedback = document.getElementById(field + 'Feedback');
        
        if (field === 'products') {
            const productsSection = document.getElementById('productsSection');
            const productsFeedback = document.getElementById('productsFeedback');
            if (productsSection && productsFeedback) {
                productsSection.classList.add('border', 'border-danger', 'rounded', 'p-2');
                productsFeedback.textContent = errors[field];
                productsFeedback.style.display = 'block';
            }
        } else if (input && feedback) {
            input.classList.add('is-invalid');
            feedback.textContent = errors[field];
            feedback.style.display = 'block';
        }
    });
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    const validation = validateForm();
    
    if (validation.isValid) {
        // Clear errors
        displayErrors({});
        
        // Simulate API call
        const submitButton = document.getElementById('submitButton');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        
        // Simulate backend submission
        setTimeout(() => {
            // Replace with actual backend URL
            console.log('Submitting to backend:', {
                ...formState,
                timestamp: new Date().toISOString()
            });
            
            // Show success message
            const contactContent = document.getElementById('contactContent');
            contactContent.innerHTML = `
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Thank You!</h4>
                    <p>Your message has been received. We'll get back to you within 24 hours.</p>
                    <hr>
                    <p class="mb-0">Check your email for confirmation.</p>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary" onclick="location.reload()">Send Another Message</button>
                </div>
            `;
        }, 1500);
    } else {
        displayErrors(validation.errors);
    }
}

// Initialize contact form
function initContacts() {
    const contactContent = document.getElementById('contactContent');
    
    const formHTML = `
        <div class="contact-form">
            <div class="form-progress mb-4">
                <label class="form-label">Form Completion</label>
                <div class="progress">
                    <div id="formProgress" class="progress-bar progress-bar-striped progress-bar-animated" 
                         role="progressbar" style="width: 0%" 
                         aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                </div>
            </div>
            
            <form id="contactForm" novalidate>
                <div class="form-section">
                    <h5 class="mb-3">Contact Information</h5>
                    
                    <div class="mb-3">
                        <label for="name" class="form-label">Full Name *</label>
                        <input type="text" class="form-control" id="name" placeholder="John Doe" required>
                        <div id="nameFeedback" class="invalid-feedback"></div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="email" class="form-label">Email Address *</label>
                        <input type="email" class="form-control" id="email" placeholder="john@example.com" required>
                        <div id="emailFeedback" class="invalid-feedback"></div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone Number *</label>
                        <input type="tel" class="form-control" id="phone" placeholder="+1 (555) 123-4567" required>
                        <div id="phoneFeedback" class="invalid-feedback"></div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h5 class="mb-3">Product Interest</h5>
                    <div id="productsSection">
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="productCase">
                            <label class="form-check-label" for="productCase">
                                MagSafe Case
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="productWallet">
                            <label class="form-check-label" for="productWallet">
                                MagSafe Wallet
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="productHolder">
                            <label class="form-check-label" for="productHolder">
                                Car Phone Holder
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="productCharger">
                            <label class="form-check-label" for="productCharger">
                                MagSafe Charger
                            </label>
                        </div>
                    </div>
                    <div id="productsFeedback" class="invalid-feedback"></div>
                </div>
                
                <div class="form-section">
                    <h5 class="mb-3">Visit Preferences</h5>
                    
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="spaIncluded">
                        <label class="form-check-label" for="spaIncluded">
                            Include spa treatment with visit
                        </label>
                        <small class="form-text text-muted d-block">
                            Enjoy a complimentary spa experience during your product consultation
                        </small>
                    </div>
                    
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="newsletter">
                        <label class="form-check-label" for="newsletter">
                            Subscribe to our newsletter
                        </label>
                        <small class="form-text text-muted d-block">
                            Get exclusive deals and product updates
                        </small>
                    </div>
                </div>
                
                <div class="form-section">
                    <h5 class="mb-3">Your Message</h5>
                    <div class="mb-3">
                        <label for="message" class="form-label">Message *</label>
                        <textarea class="form-control" id="message" rows="4" 
                                  placeholder="Tell us about your needs and how we can help..." required></textarea>
                        <div id="messageFeedback" class="invalid-feedback"></div>
                    </div>
                </div>
                
                <div class="text-center">
                    <button type="submit" id="submitButton" class="btn btn-primary btn-lg">
                        Submit Contact Form
                    </button>
                </div>
            </form>
        </div>
    `;
    
    contactContent.innerHTML = formHTML;
    
    // Attach event listeners
    const form = document.getElementById('contactForm');
    
    // Input change listeners
    document.getElementById('name').addEventListener('input', (e) => {
        formState.name = e.target.value;
        updateProgressBar();
    });
    
    document.getElementById('email').addEventListener('input', (e) => {
        formState.email = e.target.value;
        updateProgressBar();
    });
    
    document.getElementById('phone').addEventListener('input', (e) => {
        formState.phone = e.target.value;
        updateProgressBar();
    });
    
    document.getElementById('message').addEventListener('input', (e) => {
        formState.message = e.target.value;
        updateProgressBar();
    });
    
    document.getElementById('spaIncluded').addEventListener('change', (e) => {
        formState.spaIncluded = e.target.checked;
        updateProgressBar();
    });
    
    document.getElementById('newsletter').addEventListener('change', (e) => {
        formState.newsletter = e.target.checked;
        updateProgressBar();
    });
    
    // Product checkboxes
    document.getElementById('productCase').addEventListener('change', (e) => {
        formState.productInterest.case = e.target.checked;
        updateProgressBar();
    });
    
    document.getElementById('productWallet').addEventListener('change', (e) => {
        formState.productInterest.wallet = e.target.checked;
        updateProgressBar();
    });
    
    document.getElementById('productHolder').addEventListener('change', (e) => {
        formState.productInterest.holder = e.target.checked;
        updateProgressBar();
    });
    
    document.getElementById('productCharger').addEventListener('change', (e) => {
        formState.productInterest.charger = e.target.checked;
        updateProgressBar();
    });
    
    // Form submission
    form.addEventListener('submit', handleSubmit);
    
    // Initialize progress bar
    updateProgressBar();
}

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.initContacts = initContacts;
}
