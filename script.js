function buscaFilmes(){
    const requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes');
    requisicao.then(adicionarFilmes);
}
let filmes;
function adicionarFilmes(respostaRequisicao){
    const dadosFilmes = respostaRequisicao.data;
    console.log(dadosFilmes)
    renderizarFilmes(dadosFilmes);
    filmes=dadosFilmes;
}

function renderizarFilmes(dadosFilmes){
    for(let i=0;i<dadosFilmes.length;i++){
        const conteudoFilmes = document.querySelector(".movies");
        conteudoFilmes.innerHTML += `<div class="movie">
        <img src=${dadosFilmes[i].imagem}>
        <div class="title">${dadosFilmes[i].titulo}</div>
        <button onclick="comprar(this)" id=${dadosFilmes[i].id}>
          Comprar
          <ion-icon name="cart-outline"></ion-icon>
        </button>
      </div>`;
    }
    
}

buscaFilmes();

function comprar(elementoClicado){
    const nomeComprador = prompt("Qual seu nome?");
    const qtdAssento = Number(prompt("Qual a quantidade de assento?"));
    const dadosEnviados = {
        nome: nomeComprador,
        quantidade: qtdAssento
    }
    const atributoElementoClicado = elementoClicado.getAttribute("id");
    console.log(atributoElementoClicado);
    let url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${atributoElementoClicado}/ingresso`;
    const enviar = axios.post(url,dadosEnviados);

    enviar.then(sucesso);
    enviar.catch(falha);
}

function sucesso(){
    alert("Inbgresso Comprado");
}

function falha(){
    alert("Os ingressos para esse filme estao esgotados")
}