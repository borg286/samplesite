// Pricing data
const pricingData = [
    {
        product: 'MagSafe Case',
        description: 'Premium protective case with MagSafe technology',
        basic: '$29.99',
        pro: '$39.99',
        premium: '$49.99'
    },
    {
        product: 'MagSafe Wallet',
        description: 'Sleek card holder with secure magnetic attachment',
        basic: '$24.99',
        pro: '$34.99',
        premium: '$44.99'
    },
    {
        product: 'Car Phone Holder',
        description: 'Hands-free magnetic mount for vehicles',
        basic: '$34.99',
        pro: '$44.99',
        premium: '$59.99'
    },
    {
        product: 'MagSafe Charger',
        description: 'Fast wireless charging pad',
        basic: '$19.99',
        pro: '$29.99',
        premium: '$39.99'
    },
    {
        product: 'Bundle Pack',
        description: 'Case + Wallet + Charger combo',
        basic: '$69.99',
        pro: '$89.99',
        premium: '$119.99'
    }
];

// Initialize pricing table
function initPricing() {
    const pricingContent = document.getElementById('pricingContent');
    
    const tableHTML = `
        <div class="table-responsive">
            <table class="table table-hover table-striped pricing-table">
                <thead class="table-primary">
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Description</th>
                        <th scope="col">Basic</th>
                        <th scope="col">Pro</th>
                        <th scope="col">Premium</th>
                    </tr>
                </thead>
                <tbody>
                    ${pricingData.map(item => `
                        <tr>
                            <td><strong>${item.product}</strong></td>
                            <td>${item.description}</td>
                            <td><span class="badge bg-secondary">${item.basic}</span></td>
                            <td><span class="badge bg-info">${item.pro}</span></td>
                            <td><span class="badge bg-primary">${item.premium}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="text-center mt-4">
            <p class="text-muted">All prices include free shipping within the continental US</p>
            <a href="#contact" class="btn btn-primary btn-lg">Get a Quote</a>
        </div>
    `;
    
    pricingContent.innerHTML = tableHTML;
}

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.initPricing = initPricing;
}
