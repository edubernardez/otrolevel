const PRODUCTOS = [
    { id: 1, nombre: "Parlante Neon Pro", precio: 8500, img: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400" },
    { id: 2, nombre: "Smartwatch G-Series", precio: 4200, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
    { id: 3, nombre: "Auriculares Gamer", precio: 5900, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { id: 4, nombre: "Auriculares In-Ear", precio: 2800, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400" }
];

let cart = [];

function renderProducts() {
    const grid = document.getElementById('productos-grid');
    grid.innerHTML = PRODUCTOS.map(p => `
        <div class="product-card">
            <div class="img-wrapper">
                <img src="${p.img}" alt="${p.nombre}">
            </div>
            <h3>${p.nombre}</h3>
            <p class="price">$${p.precio}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">AÑADIR</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const p = PRODUCTOS.find(item => item.id === id);
    cart.push(p);
    document.getElementById('cart-count').innerText = cart.length;
}

function toggleCart() {
    const m = document.getElementById('cart-modal');
    m.style.display = (m.style.display === 'block') ? 'none' : 'block';
    renderCartList();
}

function renderCartList() {
    const list = document.getElementById('cart-list');
    let total = 0;
    list.innerHTML = cart.map(item => {
        total += item.precio;
        return `<div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size: 0.9rem;">
            <span>${item.nombre}</span>
            <span>$${item.precio}</span>
        </div>`;
    }).join('');
    document.getElementById('total-amount').innerText = total;
}

function finalizeOrder() {
    if (cart.length === 0) return alert("Carrito vacío");

    const phone = "5491140987533";
    const payment = document.querySelector('input[name="pay"]:checked').value;
    const total = document.getElementById('total-amount').innerText;

    let text = `🚀 *PEDIDO OTRO LEVEL IMPORTACIONES*\n\n`;
    const summary = {};
    cart.forEach(p => summary[p.nombre] = (summary[p.nombre] || 0) + 1);
    
    for (const [name, qty] of Object.entries(summary)) {
        text += `• ${qty}x ${name}\n`;
    }

    text += `\n💰 *Total:* $${total}`;
    text += `\n💳 *Pago:* ${payment}`;
    text += `\n\n_Hola! Vi estos productos en la web. ¿Me confirmarían stock?_`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    
    cart = [];
    document.getElementById('cart-count').innerText = "0";
    toggleCart();
}

renderProducts();