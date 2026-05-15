const produtos = [ {
    id: 1,
    nome: "camisa",
    preco: 49.90,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
{
    id: 2,
    nome: "calça para jovens de 16 anos",
    preco: 300.01,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
{
    id: 3,
    nome: "bolsa para familia",
    preco: 130.90,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
{
    id: 4,
    nome: "tenis masculino",
    preco: 491.90,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
{
    id: 5,
    nome: "celular xing ling pong",
    preco: 12.80,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
{
    id: 6,
    nome: "computador ryzen 18 500gb ram",
    preco: 999.99,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
{
    id: 7,
    nome: "oculos do rafa",
    preco: 777.777,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
{
    id: 8,
    nome: "creatina do cariani 4g",
    preco: 40.00,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
{
    id: 9,
    nome: "torre para funcionar o computador",
    preco: 4009.90,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
{
    id: 10,
    nome: "kit para castigar frontend",
    preco: 2047.00,
    imagem: "https://i.pinimg.com/originals/18/19/23/181923b741e12786cf72b17c21d8057d.jpg"
},
];

let carrinho = [];

function carregarProdutos() {
  const listaProdutos = document.getElementById("lista-produtos");

  listaProdutos.innerHTML = "";

  produtos.forEach(function(produto) {
    listaProdutos.innerHTML += `
      <div class="produto">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho(${produto.id})">
          Adicionar ao Carrinho
        </button>
      </div>
    `;
  });
}

function adicionarAoCarrinho(idProduto) {
  const produtoEncontrado = produtos.find(function(produto) {
    return produto.id === idProduto;
  });

  const itemNoCarrinho = carrinho.find(function(item) {
    return item.id === idProduto;
  });

  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade++;
  } else {
    carrinho.push({
      id: produtoEncontrado.id,
      nome: produtoEncontrado.nome,
      preco: produtoEncontrado.preco,
      quantidade: 1
    });
  }

  mostrarCarrinho();
}

function mostrarCarrinho() {
  document.getElementById("area-produtos").classList.add("oculto");
  document.getElementById("area-carrinho").classList.remove("oculto");

  renderizarCarrinho();
}

function mostrarProdutos() {
  document.getElementById("area-carrinho").classList.add("oculto");
  document.getElementById("area-produtos").classList.remove("oculto");
}

function renderizarCarrinho() {
  const listaCarrinho = document.getElementById("lista-carrinho");

  listaCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
  }

  carrinho.forEach(function(item) {
    listaCarrinho.innerHTML += `
      <div class="item-carrinho">
        <div>
          <h3>${item.nome}</h3>
          <p>Preço: R$ ${item.preco.toFixed(2)}</p>
          <p>Quantidade: ${item.quantidade}</p>
          <p>Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
        </div>

        <div class="controles">
          <button onclick="diminuirQuantidade(${item.id})">-</button>
          <button onclick="aumentarQuantidade(${item.id})">+</button>
          <button class="btn-remover" onclick="removerProduto(${item.id})">
            Remover
          </button>
        </div>
      </div>
    `;
  });

  atualizarTotal();
}

function aumentarQuantidade(idProduto) {
  const item = carrinho.find(function(produto) {
    return produto.id === idProduto;
  });

  item.quantidade++;

  renderizarCarrinho();
}

function diminuirQuantidade(idProduto) {
  const item = carrinho.find(function(produto) {
    return produto.id === idProduto;
  });

  if (item.quantidade > 1) {
    item.quantidade--;
  } else {
    removerProduto(idProduto);
    return;
  }

  renderizarCarrinho();
}

function removerProduto(idProduto) {
  carrinho = carrinho.filter(function(item) {
    return item.id !== idProduto;
  });

  renderizarCarrinho();
}

function atualizarTotal() {
  const total = carrinho.reduce(function(soma, item) {
    return soma + item.preco * item.quantidade;
  }, 0);

  document.getElementById("total").innerText = "Total: R$ " + total.toFixed(2);
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("O carrinho está vazio!");
    return;
  }

  alert("Compra finalizada com sucesso!");

  carrinho = [];

  renderizarCarrinho();
}

carregarProdutos();