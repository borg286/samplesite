// Sample reviews data
const reviewsData = [
    {
        name: 'Sarah Johnson',
        rating: 5,
        title: 'Absolutely Love It!',
        review: 'The MagSafe case is incredible. It fits perfectly and the magnetic connection is super strong. I can easily swap between my wallet and car mount.',
        product: 'MagSafe Case',
        date: 'March 2025'
    },
    {
        name: 'Michael Chen',
        rating: 5,
        title: 'Perfect for My Commute',
        review: 'The car phone holder is a game changer. No more fumbling with clips or suction cups. It just snaps on and stays secure even on bumpy roads.',
        product: 'Car Phone Holder',
        date: 'February 2025'
    },
    {
        name: 'Emily Rodriguez',
        rating: 4,
        title: 'Great Wallet Design',
        review: 'Love the sleek design of the wallet. Holds my cards securely and the magnetic attachment is strong. Only wish it could hold one more card.',
        product: 'MagSafe Wallet',
        date: 'March 2025'
    },
    {
        name: 'David Thompson',
        rating: 5,
        title: 'Quality Products',
        review: 'Bought the bundle pack and every item exceeded my expectations. The build quality is outstanding and the MagSafe connection works flawlessly.',
        product: 'Bundle Pack',
        date: 'January 2025'
    },
    {
        name: 'Jessica Lee',
        rating: 5,
        title: 'Best Purchase This Year',
        review: 'I was skeptical about MagSafe at first, but these products convinced me. The convenience is unmatched and everything feels premium.',
        product: 'MagSafe Case',
        date: 'February 2025'
    },
    {
        name: 'Robert Martinez',
        rating: 4,
        title: 'Solid Car Mount',
        review: 'Very impressed with the car holder. Easy to install and the magnetic grip is strong enough that I trust it with my phone even on rough terrain.',
        product: 'Car Phone Holder',
        date: 'March 2025'
    }
];

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

// Initialize reviews section
function initReviews() {
    const reviewsContent = document.getElementById('reviewsContent');
    
    const reviewsHTML = `
        <div class="row g-4">
            ${reviewsData.map(review => `
                <div class="col-md-6 col-lg-4">
                    <div class="card review-card h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h5 class="card-title mb-1">${review.name}</h5>
                                    <small class="text-muted">${review.date}</small>
                                </div>
                                <div class="star-rating">
                                    ${generateStars(review.rating)}
                                </div>
                            </div>
                            <h6 class="card-subtitle mb-2 text-primary">${review.title}</h6>
                            <p class="card-text">${review.review}</p>
                            <span class="badge bg-info">${review.product}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="text-center mt-5">
            <p class="lead">Join hundreds of satisfied customers!</p>
            <a href="#contact" class="btn btn-primary btn-lg">Share Your Review</a>
        </div>
    `;
    
    reviewsContent.innerHTML = reviewsHTML;
}

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.initReviews = initReviews;
}
