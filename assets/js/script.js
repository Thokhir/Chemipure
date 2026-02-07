const products = [
    { id: 1, category: "API", name: "Paracetamol", cas: "103-90-2", img: "https://picsum.photos/id/180/400/300", desc: "High purity API" },
    { id: 2, category: "API", name: "Ibuprofen", cas: "15687-27-1", img: "https://picsum.photos/id/181/400/300", desc: "NSAID API" },
    { id: 3, category: "Linkers", name: "PEG4 Linker", cas: "123-45-6", img: "https://picsum.photos/id/201/400/300", desc: "Bioconjugation" },
    { id: 4, category: "Linkers", name: "SMCC", cas: "64987-00-8", img: "https://picsum.photos/id/202/400/300", desc: "Crosslinker" },
    { id: 5, category: "Custom Synthesis", name: "Custom Peptide", cas: "Custom", img: "https://picsum.photos/id/220/400/300", desc: "Tailor-made" },
    { id: 6, category: "Drug Discovery", name: "Kinase Inhibitor", cas: "98765-43-2", img: "https://picsum.photos/id/251/400/300", desc: "Lead compound" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let inquiryList = JSON.parse(localStorage.getItem('inquiryList')) || [];
let saveLater = JSON.parse(localStorage.getItem('saveLater')) || [];

// Visit counter
function updateVisitCounter() {
    let visits = parseInt(localStorage.getItem('visits') || '0') + 1;
    localStorage.setItem('visits', visits);
    document.getElementById('visit-count').textContent = visits;
}

// Cart count
function updateCartCount() {
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = cart.length);
}

// Add to Cart
function addToCart(id) {
    const prod = products.find(p => p.id === id);
    cart.push(prod);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(prod.name + " added to cart");
}

// Add to Inquiry
function addToInquiry(id) {
    const prod = products.find(p => p.id === id);
    if (!inquiryList.some(p => p.id === id)) {
        inquiryList.push(prod);
        localStorage.setItem('inquiryList', JSON.stringify(inquiryList));
        alert(prod.name + " added to Inquiry");
    }
}

// Save for Later
function saveForLater(id) {
    const prod = products.find(p => p.id === id);
    if (!saveLater.some(p => p.id === id)) {
        saveLater.push(prod);
        localStorage.setItem('saveLater', JSON.stringify(saveLater));
        alert(prod.name + " saved for later");
    }
}

function renderInquiryList() {
    const container = document.getElementById('inquiry-container');
    if (!container) return;
    container.innerHTML = inquiryList.length ? '' : '<p>No items yet.</p>';
    inquiryList.forEach((item, i) => {
        container.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card"><img src="${item.img}" class="card-img-top">
                    <div class="card-body"><h5>${item.name}</h5><p>CAS: ${item.cas}</p>
                        <button class="btn btn-danger btn-sm" onclick="removeFromInquiry(${i})">Remove</button>
                    </div>
                </div>
            </div>`;
    });
}

function removeFromInquiry(i) {
    inquiryList.splice(i, 1);
    localStorage.setItem('inquiryList', JSON.stringify(inquiryList));
    renderInquiryList();
}

function loadProductDetail() {
    const id = new URLSearchParams(window.location.search).get('id');
    const prod = products.find(p => p.id == id);
    if (!prod) return;
    document.getElementById('prod-name').textContent = prod.name;
    document.getElementById('prod-cas').textContent = prod.cas;
    document.getElementById('prod-desc').textContent = prod.desc;
    document.getElementById('prod-img').src = prod.img;
}

function login() {
    localStorage.setItem('user', JSON.stringify({name: "Demo User"}));
    alert("Logged in successfully");
    location.reload();
}

window.onload = () => {
    updateVisitCounter();
    updateCartCount();
    if (typeof renderInquiryList === 'function') renderInquiryList();
    if (typeof loadProductDetail === 'function') loadProductDetail();
};
