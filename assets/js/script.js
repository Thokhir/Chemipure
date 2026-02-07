// Fake products data
const products = [
    { id: 1, category: "API", name: "Paracetamol", cas: "103-90-2", img: "https://picsum.photos/id/180/300/300", desc: "High purity API for research" },
    { id: 2, category: "Linkers", name: "PEG4 Linker", cas: "123-45-6", img: "https://picsum.photos/id/201/300/300", desc: "Custom linker for bioconjugation" },
    { id: 3, category: "Custom Synthesis", name: "Custom Molecule X", cas: "987-65-4", img: "https://picsum.photos/id/220/300/300", desc: "Tailor-made synthesis" },
    { id: 4, category: "Drug Discovery", name: "Lead Compound A", cas: "555-66-7", img: "https://picsum.photos/id/251/300/300", desc: "Early stage drug candidate" }
];

// Cart & Inquiry storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let inquiryList = JSON.parse(localStorage.getItem('inquiryList')) || [];
let saveLater = JSON.parse(localStorage.getItem('saveLater')) || [];

// Add to cart
function addToCart(id) {
    const prod = products.find(p => p.id === id);
    cart.push(prod);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(prod.name + ' added to cart');
}

// Add to inquiry
function addToInquiry(id) {
    const prod = products.find(p => p.id === id);
    if (!inquiryList.find(p => p.id === id)) {
        inquiryList.push(prod);
        localStorage.setItem('inquiryList', JSON.stringify(inquiryList));
        alert(prod.name + ' added to Inquiry list');
    }
}

// Save for later
function saveForLater(id) {
    const prod = products.find(p => p.id === id);
    if (!saveLater.find(p => p.id === id)) {
        saveLater.push(prod);
        localStorage.setItem('saveLater', JSON.stringify(saveLater));
        alert(prod.name + ' saved for later');
    }
}

// Render inquiry list (used in inquiry.html & my-page.html)
function renderInquiryList() {
    const container = document.getElementById('inquiry-list');
    if (!container) return;
    container.innerHTML = '';
    inquiryList.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'col-md-4 mb-4';
        div.innerHTML = `
            <div class="card">
                <img src="${item.img}" class="card-img-top">
                <div class="card-body">
                    <h5>${item.name}</h5>
                    <p>CAS: ${item.cas}</p>
                    <button class="btn btn-danger btn-sm" onclick="removeFromInquiry(${i})">Remove</button>
                </div>
            </div>`;
        container.appendChild(div);
    });
}

function removeFromInquiry(i) {
    inquiryList.splice(i, 1);
    localStorage.setItem('inquiryList', JSON.stringify(inquiryList));
    renderInquiryList();
}

// Fake login
function login() {
    localStorage.setItem('user', JSON.stringify({name: "Demo User", email: "demo@chemi-pure.com"}));
    alert("Logged in as Demo User");
    location.reload();
}
