// Updated assets/js/script.js
const products = [
    { id: 1, category: "API", name: "Paracetamol", cas: "103-90-2", img: "https://picsum.photos/id/180/400/300", desc: "High purity API for pharmaceutical research" },
    { id: 2, category: "API", name: "Ibuprofen", cas: "15687-27-1", img: "https://picsum.photos/id/181/400/300", desc: "Non-steroidal anti-inflammatory API" },
    { id: 3, category: "API", name: "Metformin HCl", cas: "657-24-9", img: "https://picsum.photos/id/183/400/300", desc: "Antidiabetic API" },
    { id: 4, category: "Linkers", name: "PEG4 Linker", cas: "123-45-6", img: "https://picsum.photos/id/201/400/300", desc: "Bioconjugation linker" },
    { id: 5, category: "Linkers", name: "SMCC Crosslinker", cas: "64987-00-8", img: "https://picsum.photos/id/202/400/300", desc: "Heterobifunctional linker" },
    { id: 6, category: "Custom Synthesis", name: "Custom Peptide", cas: "Custom", img: "https://picsum.photos/id/220/400/300", desc: "Tailor-made peptides" },
    { id: 7, category: "Custom Synthesis", name: "Impurity Standard", cas: "Custom", img: "https://picsum.photos/id/221/400/300", desc: "Reference impurity" },
    { id: 8, category: "Drug Discovery", name: "Kinase Inhibitor Lead", cas: "98765-43-2", img: "https://picsum.photos/id/251/400/300", desc: "Targeted kinase inhibitor" },
    { id: 9, category: "Drug Discovery", name: "PROTAC Degrader", cas: "Custom", img: "https://picsum.photos/id/252/400/300", desc: "Protein degrader" },
    { id: 10, category: "API", name: "Aspirin", cas: "50-78-2", img: "https://picsum.photos/id/182/400/300", desc: "Analgesic API" }
];

let inquiryList = JSON.parse(localStorage.getItem('inquiryList')) || [];
let saveLater = JSON.parse(localStorage.getItem('saveLater')) || [];

// Add to Inquiry
function addToInquiry(id) {
    const prod = products.find(p => p.id === id);
    if (!inquiryList.some(p => p.id === id)) {
        inquiryList.push(prod);
        localStorage.setItem('inquiryList', JSON.stringify(inquiryList));
        alert(prod.name + " added to Inquiry List");
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

// Remove from Inquiry
function removeFromInquiry(index) {
    inquiryList.splice(index, 1);
    localStorage.setItem('inquiryList', JSON.stringify(inquiryList));
    renderInquiryList();
}

// Render Inquiry List
function renderInquiryList() {
    const container = document.getElementById('inquiry-container');
    if (!container) return;
    container.innerHTML = '';
    if (inquiryList.length === 0) {
        container.innerHTML = `<p class="text-muted">No items in inquiry list yet.</p>`;
        return;
    }
    inquiryList.forEach((item, i) => {
        container.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <img src="${item.img}" class="card-img-top">
                    <div class="card-body">
                        <h5>${item.name}</h5>
                        <p><strong>CAS:</strong> ${item.cas}</p>
                        <button class="btn btn-danger btn-sm" onclick="removeFromInquiry(${i})">Remove</button>
                    </div>
                </div>
            </div>`;
    });
}

// Load Product Detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('prod-name').textContent = product.name;
    document.getElementById('prod-cas').textContent = product.cas;
    document.getElementById('prod-desc').textContent = product.desc;
    document.getElementById('prod-img').src = product.img;
    document.getElementById('inquiry-btn').setAttribute('onclick', `addToInquiry(${product.id})`);
    document.getElementById('save-btn').setAttribute('onclick', `saveForLater(${product.id})`);
}
