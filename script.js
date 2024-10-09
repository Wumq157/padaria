document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { name: "Pão Francês", price: 1.50 },
        { name: "Pão de Queijo", price: 2.00 },
        { name: "Baguete", price: 3.00 },
        { name: "Croissant", price: 4.00 }
    ];
    
    const productList = document.querySelector('.product-list');
    const cartPanel = document.getElementById('cart-panel');
    const cartItemsDiv = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = [];

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <p>${product.name} - R$ ${product.price.toFixed(2)}</p>
                <div class="product-overlay">
                    <button class="minus-btn">-</button>
                    <span class="quantity">1</span>
                    <button class="plus-btn">+</button>
                    <button class="add-to-cart">Adicionar ao Carrinho</button>
                </div>
            `;

            productDiv.querySelector('.add-to-cart').addEventListener('click', function () {
                addToCart(product);
            });

            productList.appendChild(productDiv);
        });
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <input type="checkbox" checked>
                <p>${item.name} x ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item">x</button>
            `;

            cartItem.querySelector('.remove-item').addEventListener('click', function () {
                removeFromCart(index);
            });

            cartItemsDiv.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    document.getElementById('cart-btn').addEventListener('click', function () {
        cartPanel.classList.toggle('hidden');
    });

    renderProducts();
});
