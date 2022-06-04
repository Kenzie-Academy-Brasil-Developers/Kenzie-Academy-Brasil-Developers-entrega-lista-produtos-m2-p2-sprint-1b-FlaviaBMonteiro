

function criarDados(produto, index) {
    const id = produto.id
    const tagLi = document.createElement("li")

    
    const tagImg = document.createElement("img")
    tagImg.src = produto.img
    tagImg.alt = produto.nome
    tagLi.appendChild(tagImg)

    const tagTitulo = document.createElement("h3")
    tagTitulo.innerText = produto.nome
    tagLi.appendChild(tagTitulo)

    const tagSecao  = document.createElement("span")
    tagSecao.innerText = produto.secao
    tagLi.appendChild(tagSecao)


    const tagDescricao  = document.createElement("h6")
    const tagConteudo = document.createElement("h6")
    for (let i = 0; i < produto.componentes.length; i++) {
        tagConteudo.innerHTML += `${produto.componentes[i]} <br>` 
    }
    tagDescricao.appendChild(tagConteudo)
    tagLi.appendChild(tagDescricao)


    const tagPrecoEButton  = document.createElement("div")
    const tagPreco  = document.createElement("p")
    const precoReal = produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    const tagAddCar  = document.createElement("button")
    tagAddCar.id = id - 1
    
    tagPreco.innerText = precoReal
    tagAddCar.innerText = 'Comprar'

    tagPrecoEButton.appendChild(tagPreco)
    tagPrecoEButton.appendChild(tagAddCar)
    tagLi.appendChild(tagPrecoEButton)

    return tagLi
}

function montarDados(listaProdutos) {
    const div = document.getElementById("cardProdutos")
    div.innerHTML = ""
    listaProdutos.forEach(function(produto, index){
    const producto = criarDados(produto, index)
    div.appendChild(producto)
    })
    
}

montarDados(produtos)

// CARRINHO

//Criando Array Carrinho
const vitrine = document.querySelector(".containerListaProdutos")
const prodcarrinho = document.querySelector(".precoTotalDescricao")
const textoQtdade = document.querySelector(".qtdade")
const textoCarrinho = document.querySelector(".total")
const totalQuantidade = document.querySelector(".totalqtdade")
const totalCarrinho = document.querySelector(".precoTotal")


const totalProdutos = []

function carrinhoVazio(totalProdutos) {
    if (totalProdutos.length == 0) {
        prodcarrinho.innerHTML = `
        <p class="precoTotalDescricaoImg"><img src='./src/img/KenzieMarket.svg'></p>
                <p class="precoTotalDescricaoTexto">Por enquanto não temos produtos no carrinho</p>`
    
    textoCarrinho.innerText = ''
    textoQtdade.innerText = '' 
    totalQuantidade.innerText = ""
    totalCarrinho.innerText = ""       
    }
   

}
carrinhoVazio(totalProdutos)

vitrine.addEventListener("click", adicionarAoCarrinho)

function adicionarAoCarrinho(event) {
    
    const button = event.target
        if (button.tagName === "BUTTON") {
            
            textoCarrinho.innerHTML = 'Total'
            textoQtdade.innerHTML = 'Quantidade'
            prodcarrinho.innerHTML = ""
            totalCarrinho.innerHTML = ""
            const indice = button.id
            totalProdutos.push(produtos[indice]) 
            listarCardCarrinho(totalProdutos)
            listarQtdade(totalProdutos)
            listarTotal(totalProdutos)
       } 
  }



//Criando card carrinho
function CardCarrinho(produto, index) {
    //Informaçao dos Produtos no Carrinho
    const img       = produto.img
    const nome      = produto.nome
    const preco     = produto.preco
    const categoria = produto.secao
    const precoReal = preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});


    //Criar elementos Card Carrinho
    const tagDiv        = document.createElement("div")
    const tagDivConteudo = document.createElement("div")
    const tagImg        = document.createElement("img")
    const tagTit        = document.createElement("h3")
    const tagCategoria  = document.createElement("span")
    const tagPreco      = document.createElement("p")
    const tagRemCar     = document.createElement("h5")
    const tagRemCarIcon  = document.createElement("span")

     //Adicionar informaçoes de texto html
    tagImg.src = img
    tagImg.alt = nome
    tagTit.innerText = nome
    tagPreco.innerText = precoReal
    tagCategoria.innerText = categoria
    tagRemCarIcon.innerText = 'delete'
    tagRemCarIcon.id = index

    //Montar o template card carrinho


    tagDiv.appendChild(tagImg)
    tagDivConteudo.appendChild(tagTit)
    tagDivConteudo.appendChild(tagCategoria)
    tagDivConteudo.appendChild(tagPreco)
    tagDiv.appendChild(tagDivConteudo)
    tagRemCar.appendChild(tagRemCarIcon)
    tagDiv.appendChild(tagRemCar)
  

    // Adcionar CSS
    tagDiv.classList.add("divCar") 
    tagDivConteudo.classList.add("divCarConteudo") 
    tagImg.classList.add("imagemCar")  
    tagTit.classList.add("tituloCar")
    tagCategoria.classList.add("infoCar") 
    tagPreco.classList.add("precoCar")
    tagRemCar.classList.add("removerCar")
    tagRemCarIcon.classList.add("material-symbols-outlined")


    return tagDiv
}


//Listando produtos do Carrinho
function listarCardCarrinho (listaProdutos) {
    listaProdutos.forEach(function(produto, index){
        const cardProduto = CardCarrinho(produto, index)
        prodcarrinho.appendChild(cardProduto)
        })
}

function listarRCardCarrinho(listaProdutos) {
    listaProdutos.forEach(function(produto, index){
    const cardProduto = CardCarrinho(produto, index)
    prodcarrinho.appendChild(cardProduto)
    })
}
//Removendo produtos do carrinho
const vitrineCarrinho = document.querySelector(".containerPrecoTotal")

vitrineCarrinho.addEventListener("click", removerDoCarrinho)

function removerDoCarrinho(event) {
    const button = event.target
    if (button.tagName === "SPAN") {
        textoCarrinho.innerHTML = 'Total'
        textoQtdade.innerHTML = 'Quantidade'
        const indice = button.id
        prodcarrinho.innerHTML = ""
        totalQuantidade.innerHTML = ""
        totalCarrinho.innerHTML = ""
        totalProdutos.splice(indice,1)
        listarRCardCarrinho(totalProdutos)
        listarQtdade(totalProdutos)
        listarTotal(totalProdutos)
        carrinhoVazio(totalProdutos)
        
    } 
}


// CALCULOS CARRINHO



function listarQtdade(listaProdutos, index) {
    const totalQuantidades = document.querySelector(".totalqtdade")
    totalQuantidades.innerText = listaProdutos.length 
}


function calcularTotal(listaProdutos) {
    const tagTotal = document.createElement("p")
    let soma = 0
    for (let i = 0; i < listaProdutos.length; i++) {
        soma += listaProdutos[i].preco
    }
    const precoReal = soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    return precoReal
}
function listarTotal(listaProdutos) {
    const cardTotal = calcularTotal(listaProdutos)
    totalCarrinho.innerText = cardTotal
}






//Fim Carrinho

const botaoTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos")
botaoTodos.addEventListener("click", filtrarTodos)
function filtrarTodos(event) {
    montarDados(produtos)
    }

const botaHortiFruti = document.querySelector(".estiloGeralBotoes--filtrarHortifruti")
botaHortiFruti.addEventListener("click", filtrarHortiFruti)

function filtrarHortiFruti (event) {

    const arrayprodutos = []
    produtos.forEach(function(produto){
        const produtoHortFruti = produto.secao
            if (produtoHortFruti == `Hortifruti`) {
                arrayprodutos.push(produto) 
            }
        })
    montarDados(arrayprodutos)

}

const botaoPanificadora = document.querySelector(".estiloGeralBotoes--filtrarPanificadora")
botaoPanificadora.addEventListener("click", filtrarPanificadora)

function filtrarPanificadora (event) {

    const arrayprodutos = []
    produtos.forEach(function(produto){
        const produtoPanificadora = produto.secao
            if (produtoPanificadora == `Panificadora`) {
                arrayprodutos.push(produto) 
            }
        })
    montarDados(arrayprodutos)

}

const botaoLaticinios = document.querySelector(".estiloGeralBotoes--filtrarLaticinio")
botaoLaticinios.addEventListener("click", filtrarLaticinio)

function filtrarLaticinio (event) {

    const arrayprodutos = []
    produtos.forEach(function(produto){
        const produtoLaticidio = produto.secao
            if (produtoLaticidio == `Laticínio`) {
                arrayprodutos.push(produto) 
            }
        })
    montarDados(arrayprodutos)

}

const barraPesquisar = document.querySelector(".campoBuscaPorNome")
const btnPesquisar = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
btnPesquisar.addEventListener("click", filtrarPesquisa)
function filtrarPesquisa(event){
    const arrayPesquisa = []
    produtos.forEach(function(produto){
        let guardarPesquisa = barraPesquisar.value.trim()
        guardarPesquisa = guardarPesquisa.toLowerCase()
        const compPesquisaNom = produto.nome.toLowerCase()
        const compPesquisaSec = produto.secao.toLowerCase()
        const compPesquisaCat = produto.categoria.toLowerCase()
            if (compPesquisaNom.includes(guardarPesquisa) || compPesquisaSec.includes(guardarPesquisa) || compPesquisaCat.includes(guardarPesquisa)) {
                
                arrayPesquisa.push(produto) 
            }
        })
    barraPesquisar.value = ""
    montarDados(arrayPesquisa)
}
    




