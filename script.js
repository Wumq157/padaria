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
    },
    {
        nome: "Café",
        descricao: "Café fresco para começar bem o dia.",
        preco: 3.00,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
    },
    {
        nome: "Capuccino",
        descricao: "Delicioso capuccino cremoso.",
        preco: 4.50,
        imagem: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRWm9qKkP2EkvSnBuwhWD7T8-oRTUNKZFq13dgEowlcT4Kqymc2bv4b0ZzJXv0aT4wR"
    }, // Adicione esta vírgula
    {
        nome: "Chocolate Quente",
        descricao: "Chocolate quente cremoso e reconfortante.",
        preco: 5.00,
        imagem: "https://www.nestleprofessional.com.br/sites/default/files/styles/np_recipe_detail/public/2022-06/chocolate-quente-dois-frades%20%281%29.png?itok=GvxmfU5t"
    },
    {
        nome: "Pão Artesanal",
        descricao: "Pão artesanal feito com ingredientes frescos.",
        preco: 6.00,
        imagem: "https://i.panelinha.com.br/i1/228-bk-9296-pao-integral.webp"
    },
    {
        nome: "Sanduíche Natural de Frango",
        descricao: "Sanduíche natural de frango saudável e saboroso.",
        preco: 7.00,
        imagem: "https://receitadaboa.com.br/wp-content/uploads/2024/08/iStock-486583786.jpg"
    },
    {
        nome: "Sanduíche de Presunto",
        descricao: "Sanduíche de presunto com queijo.",
        preco: 6.50,
        imagem: "https://www.academiaassai.com.br/sites/default/files/styles/noticia_1020x640/public/sanduiche-com-queijo-e-presunto-para-agradar-clientela_0.jpg?itok=UUriOiU4"
    },
    {
        nome: "Pão Doce de Creme e Coco",
        descricao: "Delicioso pão doce com recheio de creme e coco.",
        preco: 8.00,
        imagem: "https://anamariareceitas.com.br/wp-content/uploads/2022/10/Pao-doce-de-creme-e-coco.jpg"
    },
    {
        nome: "Crepe de Nutella",
        descricao: "Delicioso crepe recheado com Nutella.",
        preco: 5.50,
        imagem: "https://img.cybercook.com.br/receitas/388/crepe-de-nutella.jpeg"
    },
    {
        nome: "Biscoito",
        descricao: "Biscoito crocante, perfeito para acompanhar o café.",
        preco: 2.00,
        imagem: "https://minhasreceitinhas.com.br/wp-content/uploads/2023/08/biscoito-de-maizena-com-goiabada-aa.png"
    }
];


let carrinho = [];

function adicionarProduto(produto) {
    const main = document.getElementById('produto-container');
    
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto');
    
    produtoDiv.innerHTML = `
        <img class="produto-img" src="${produto.imagem}" alt="${produto.nome}">
        <div class="produto-descricao">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
        </div>
        <div class="produto-overlay">
            <div>
                <button class="quantidade-btn" onclick="alterarQuantidade('${produto.nome}', -1)">-</button>
                <span id="quantidade-${produto.nome}" class="quantidade">1</span>
                <button class="quantidade-btn" onclick="alterarQuantidade('${produto.nome}', 1)">+</button>
            </div>
            <button class="adicionar-btn" onclick="adicionarCarrinho('${produto.nome}')">Adicionar ao Carrinho</button>
        </div>
    `;
    
    main.appendChild(produtoDiv);
}

function alterarQuantidade(nome, delta) {
    const quantidadeSpan = document.getElementById(`quantidade-${nome}`);
    let quantidade = parseInt(quantidadeSpan.textContent);
    quantidade = Math.max(1, quantidade + delta);
    quantidadeSpan.textContent = quantidade;
}

function adicionarCarrinho(nome) {
    const quantidadeSpan = document.getElementById(`quantidade-${nome}`);
    const quantidade = parseInt(quantidadeSpan.textContent);

    if (quantidade > 0) {
        const produtoCarrinho = carrinho.find(item => item.nome === nome);
        if (produtoCarrinho) {
            produtoCarrinho.quantidade += quantidade;
        } else {
            carrinho.push({ nome, quantidade });
        }
        quantidadeSpan.textContent = 1; // Resetar a quantidade no produto
        atualizarCarrinho();
    }
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const produto = produtos.find(prod => prod.nome === item.nome);
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} - ${item.quantidade} x R$ ${produto.preco.toFixed(2)} 
        <button class="remove-btn" onclick="removerProduto('${item.nome}')">Remover</button>`;
        cartItems.appendChild(li);
        total += item.quantidade * produto.preco;
    });

    totalPrice.textContent = total.toFixed(2);
}

function removerProduto(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarCarrinho();
}

document.getElementById('cart-btn').onclick = () => {
    document.getElementById('cart-overlay').classList.toggle('open');
};


// Adicionar produtos ao carregar a página
produtos.forEach(produto => adicionarProduto(produto));
