// === NEW: Global current product for detail page ===
let currentProductId = null;

// Update loadProductDetail to save the ID
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    
    currentProductId = prod.id;                     // ← IMPORTANT
    document.getElementById('prod-name').textContent = prod.name;
    document.getElementById('prod-cas').textContent = prod.cas;
    document.getElementById('prod-desc').textContent = prod.desc;
    document.getElementById('prod-img').src = prod.img;
}

// Inquiry + go to inquiry page
function addToInquiryAndGo() {
    if (!currentProductId) return;
    addToInquiry(currentProductId);
    setTimeout(() => { window.location.href = 'inquiry.html'; }, 800);
}

// Save for Later + go to My Page
function saveForLaterAndGo() {
    if (!currentProductId) return;
    saveForLater(currentProductId);
    setTimeout(() => { window.location.href = 'my-page.html'; }, 800);
}
