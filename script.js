const produtos = [
    {
        nome: "Pão Francês",
        descricao: "Delicioso pão francês crocante por fora e macio por dentro.",
        preco: 1.00,
        imagem: "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSd7ebiFFPvpPevb1LAVCYfBldZ_9L7A4-sSTW7M23YlQVAdk17o5BJ5sT7lLDoYP_5"
    },
    {
        nome: "Pão de Queijo",
        descricao: "Pão de queijo quentinho e saboroso.",
        preco: 2.50,
        imagem: "https://cdn.oceanserver.com.br/lojas/eat/uploads_produto/pao-de-queijojpeg-62011aa6d5fb8.jpeg"
    },
    {
        nome: "Croissant",
        descricao: "Croissant folhado com manteiga.",
        preco: 4.00,
        imagem: "https://panificiomallet.com/storage/app/uploads/public/5f4/e58/a0a/5f4e58a0ac2f9552490546.jpg"
    }
];

// Função para renderizar os produtos no HTML
function renderizarProdutos() {
    const container = document.getElementById('produto-container');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    produtos.forEach(produto => {
        const produtoElement = document.createElement('div');
        produtoElement.classList.add('produto');

        produtoElement.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
            <div class="produto-descricao">
                <h3 class="nome-produto">${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <span class="preco-produto">R$ ${produto.preco.toFixed(2)}/unidade</span>
            </div>
            <div class="produto-overlay">
                <button class="quantidade-btn" data-action="subtrair">-</button>
                <span class="quantidade">1</span>
                <button class="quantidade-btn" data-action="adicionar">+</button>
                <button class="adicionar-btn">Adicionar ao Carrinho</button>
            </div>
        `;

        container.appendChild(produtoElement);
    });
}

// Chame a função para renderizar os produtos ao carregar a página
renderizarProdutos();


document.querySelectorAll('.produto').forEach(produto => {
    const quantidadeElement = produto.querySelector('.quantidade');
    let quantidade = parseInt(quantidadeElement.textContent);

    produto.querySelectorAll('.quantidade-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.getAttribute('data-action');
            if (action === 'adicionar') {
                quantidade++;
            } else if (action === 'subtrair' && quantidade > 1) {
                quantidade--;
            }
            quantidadeElement.textContent = quantidade;
        });
    });

    prouto.querySelector('.adicionar-btn').addEventListener('click', () => {
        alert(`${quantidade} unidade(s) de Pão Francês adicionada(s) ao carrinho!`);
        produto.querySelector('.adicionar-btn').addEventListener('click', () => {
            const produtoNome = produto.querySelector('.nome-produto').textContent; // Supondo que tenha uma classe 'nome-produto'
            const preco = produto.querySelector('.preco-produto').textContent; // Supondo que tenha uma classe 'preco-produto'
        
            addItemToCart(produtoNome, preco, quantidade); // Chama a função para adicionar o item ao carrinho
        });
        
    });
});

const cartBtn = document.getElementById('cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const finalizarBtn = document.getElementById('finalizar-btn');
const limparBtn = document.getElementById('limpar-btn');
const fecharCartBtn = document.getElementById('fechar-cart');
let cartItems = [];

// Função para abrir/fechar o carrinho
cartBtn.addEventListener('click', () => {
    cartOverlay.classList.toggle('open');
});

fecharCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('open');
});

// Função para adicionar um item ao carrinho
function addItemToCart(produtoNome, preco, quantidade) {
    const item = {
        nome: produtoNome,
        preco: parseFloat(preco),
        quantidade: quantidade,
        selecionado: false
    };
    cartItems.push(item);
    renderCartItems();
}

// Função para renderizar os itens no carrinho
function renderCartItems() {
    cartItemsList.innerHTML = '';
    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" data-index="${index}" ${item.selecionado ? 'checked' : ''}>
            <span>${item.quantidade} x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
            <button class="remove-btn" data-index="${index}">X</button>
        `;
        cartItemsList.appendChild(li);
    });
    updateTotal();
}

// Função para atualizar o valor total dos itens selecionados
function updateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        if (item.selecionado) {
            total += item.preco * item.quantidade;
        }
    });
    totalPriceElement.textContent = total.toFixed(2);
}

// Evento para manipular seleção de produtos e remoção
cartItemsList.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    if (e.target.type === 'checkbox') {
        cartItems[index].selecionado = e.target.checked;
    } else if (e.target.classList.contains('remove-btn')) {
        cartItems.splice(index, 1);
    }
    renderCartItems();
});

// Evento para finalizar a compra
finalizarBtn.addEventListener('click', () => {
    const produtosSelecionados = cartItems.filter(item => item.selecionado);
    if (produtosSelecionados.length === 0) {
        alert('Selecione pelo menos um item para finalizar a compra.');
        return;
    }

    const total = produtosSelecionados.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    alert(`Compra finalizada! Valor total: R$ ${total.toFixed(2)}`);
    // Aqui você pode implementar a lógica para finalizar a compra
});

// Evento para limpar o carrinho
limparBtn.addEventListener('click', () => {
    cartItems = [];
    renderCartItems();
});
