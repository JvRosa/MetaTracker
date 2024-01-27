const elementoARolar = document.querySelector(".Principal");
let estaPressionado = false;
let inicioX;
let inicioScrollLeft;

elementoARolar.addEventListener('mousedown', (e) => {
    estaPressionado = true;
    inicioX = e.clientX;
    inicioScrollLeft = elementoARolar.scrollLeft;
});

document.addEventListener('mouseup', () => {
    estaPressionado = false;
});

document.addEventListener('mousemove', (e) => {
    if (!estaPressionado) return;

    const deltaX = e.clientX - inicioX;
    elementoARolar.scrollLeft = inicioScrollLeft - deltaX;
});

elementoARolar.addEventListener('mouseenter', () => {
    elementoARolar.style.cursor = 'grabbing';
});

elementoARolar.addEventListener('mouseleave', () => {
    if (!estaPressionado) {
        elementoARolar.style.cursor = 'grab';
    }
});

let vetCategorias = [];
let proximaIdCategoria = 0;

const botaoAdicionarCategoria = document.querySelector(".adicionaCategoria");
const conteudoPrincipal = document.querySelector(".Principal");

botaoAdicionarCategoria.addEventListener("click", adicionarNovaCategoria);

function adicionarNovaCategoria() {

    let novaCategoria = {
        id: proximaIdCategoria,
        nome: "Nova categoria",
        cor: "#bbbbbb",
        metas: [
            {
                idMeta: 0,
                texto: "Nova meta",
                concluida: false,
                dataConclusao: ""
            }
        ]
    };

    vetCategorias.push(novaCategoria);

    proximaIdCategoria++;

    let novaCategoriaDiv = document.createElement('div');
    novaCategoriaDiv.className = 'Categoria';
    novaCategoriaDiv.id = 'categoria' + novaCategoria.id;

    novaCategoriaDiv.innerHTML = `
        <header class="CabecalhoCartao">
            <div class="CabecalhoCartaoParteSuperior">
                <h2 class="TituloCategoria">${novaCategoria.nome}</h2>
                <div class="menuCategoria">
                    <input type="color" class="inputCorDaCategoria" name="corDoCartao" value="${novaCategoria.cor}">
                    <i class="fa-solid fa-trash excluirCategoria" onclick="excluirCategoria(${novaCategoria.id})"></i>
                    <i class="fa-solid fa-pen editarTituloCartao" onclick="editarCategoria(${novaCategoria.id})"></i>
                </div>
            </div>
            <div class="CabecalhoCartaoParteInferior">
                <i class="fa-solid fa-list-ol"></i>
                <p class="quantidadeMetas${novaCategoria.id}">1 meta</p>
            </div>
        </header>
        <ul class="AreaMetas">
            ${novaCategoria.metas.map(meta => `
                <li class="meta">
                    <div class="checkboxEMeta">
                    <input type="checkbox" id="categoria${novaCategoria.id}Meta${meta.idMeta}" class="checkbox-escondido" onchange="marcarMetaConcluida(${novaCategoria.id}, ${meta.idMeta}, this)" ${meta.concluida ? 'checked' : ''}>
                        <label for="categoria${novaCategoria.id}Meta${meta.idMeta}" class="checkbox-personalizado"></label>
                        <p class="tituloTarefa${novaCategoria.id}Meta${meta.idMeta}">${meta.texto}</p>
                    </div>
                    <div class="EditarEApagar">
                        <i class="fa-solid fa-pen editarMeta${novaCategoria.id}Meta${meta.idMeta}" onclick="editarMeta(${novaCategoria.id}, ${meta.idMeta})"></i>
                        <i class="fa-solid fa-trash excluirMeta" onclick="excluirMeta(${novaCategoria.id}, ${meta.idMeta})"></i>
                    </div>
                </li>
            `).join('')}
            <li class="adicionarMeta" onclick="adicionarNovaMeta(${novaCategoria.id})">
                <i class="fa-solid fa-plus"></i>
            </li>
        </ul>
    `;

    let botaoAdicionarCategoria = document.querySelector('.AdicionarCategoria');

    botaoAdicionarCategoria.parentNode.insertBefore(novaCategoriaDiv, botaoAdicionarCategoria);
}

function marcarMetaConcluida(idCategoria, idMeta, checkbox) {
    const categoria = vetCategorias.find(c => c.id === idCategoria);

    if (!categoria) {
        console.error('Categoria não encontrada.');
        return;
    }

    const meta = categoria.metas.find(m => m.idMeta === idMeta);

    if (!meta) {
        console.error('Meta não encontrada.');
        return;
    }

    if (checkbox.checked) {
        // Marcar a meta como concluída e atribuir a data atual
        meta.concluida = true;
        meta.dataConclusao = obterDataAtual();
    } else {
        // Desmarcar a meta e limpar a data de conclusão
        meta.concluida = false;
        meta.dataConclusao = "";
    }

    // Atualizar o HTML e o console
    atualizarHTMLCategoria(idCategoria);
    console.log(vetCategorias);
}


function obterDataAtual() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicionar 1 ao mês, pois janeiro é 0
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function adicionarNovaMeta(idCategoria) {
    let categoria = vetCategorias.find(c => c.id === idCategoria);

    if (!categoria) {
        console.error('Categoria não encontrada.');
        return;
    }

    let novaMeta = {
        idMeta: categoria.metas.length,
        texto: "Nova meta",
        concluida: false,  // Valor inicial como false ao adicionar uma nova meta
        dataConclusao: ""
    };

    categoria.metas.push(novaMeta);

    atualizarHTMLCategoria(idCategoria);

    atualizaQuantidadeDeMetas(idCategoria);

    console.log(vetCategorias);
}


function atualizaQuantidadeDeMetas(idCategoria) {

    let categoria = vetCategorias.find(c => c.id === idCategoria);

    const quantidadeMetas = document.querySelector(`.quantidadeMetas${categoria.id}`);

    if (categoria.metas.length == 1) {
        quantidadeMetas.textContent = `${categoria.metas.length} meta`;

    } else {
        quantidadeMetas.textContent = `${categoria.metas.length} metas`;
    }

}

function atualizarHTMLCategoria(idCategoria) {
    let categoria = vetCategorias.find(c => c.id === idCategoria);
    let categoriaDiv = document.getElementById('categoria' + idCategoria);

    let areaMetas = categoriaDiv.querySelector('.AreaMetas');

    areaMetas.innerHTML = '';

    categoria.metas.forEach(meta => {
        let novaMetaDiv = document.createElement('li');
        novaMetaDiv.className = `meta ${meta.concluida ? 'meta-concluida' : ''}`;

        novaMetaDiv.innerHTML = `
            <div class="checkboxEMeta">
                <input type="checkbox" id="categoria${categoria.id}Meta${meta.idMeta}" class="checkbox-escondido" onchange="marcarMetaConcluida(${categoria.id}, ${meta.idMeta}, this)" ${meta.concluida ? 'checked' : ''}>
                <label for="categoria${categoria.id}Meta${meta.idMeta}" class="checkbox-personalizado"></label>
                <p class="tituloTarefa${categoria.id}Meta${meta.idMeta} ${meta.concluida ? 'meta-texto-concluido' : ''}">${meta.texto}</p>
                ${meta.concluida ? `<p class="dataConclusao">${'Concluído em: ' + meta.dataConclusao}</p>` : ''}
            </div>
            <div class="EditarEApagar">
                <i class="fa-solid fa-pen editarMeta${categoria.id}Meta${meta.idMeta}" onclick="editarMeta(${categoria.id}, ${meta.idMeta})"></i>
                <i class="fa-solid fa-trash excluirMeta" onclick="excluirMeta(${categoria.id}, ${meta.idMeta})"></i>
            </div>
        `;

        areaMetas.appendChild(novaMetaDiv);
    });

    let novaMetaDiv = document.createElement('li');
    novaMetaDiv.className = 'adicionarMeta';
    novaMetaDiv.innerHTML = `<i class="fa-solid fa-plus" onclick="adicionarNovaMeta(${idCategoria})"></i>`;
    areaMetas.appendChild(novaMetaDiv);
}



function editarCategoria(idCategoria) {
    const categoriaAtual = document.getElementById('categoria' + idCategoria);

    if (categoriaAtual) {
        const inputAlterarCorCategoria = categoriaAtual.querySelector(".inputCorDaCategoria");
        const botaoExcluirCategoria = categoriaAtual.querySelector(".excluirCategoria");
        const botaoEditarCategoria = categoriaAtual.querySelector(".editarTituloCartao");
        const tituloCategoria = categoriaAtual.querySelector(".TituloCategoria");

        if (botaoEditarCategoria.classList.contains("fa-pen")) {

            inputAlterarCorCategoria.style.display = "block";
            botaoExcluirCategoria.style.display = "block";
            botaoEditarCategoria.classList.remove("fa-pen");
            botaoEditarCategoria.classList.add("fa-check");

            const inputTitulo = document.createElement("input");
            inputTitulo.type = "text";
            inputTitulo.value = tituloCategoria.textContent;
            inputTitulo.className = "inputEditarTitulo";
            tituloCategoria.replaceWith(inputTitulo);
            inputTitulo.focus();

            inputAlterarCorCategoria.value = vetCategorias[idCategoria].cor;
            mudarAparenciaDaCategoria();

            inputAlterarCorCategoria.addEventListener("input", () => {
                
                mudarAparenciaDaCategoria(idCategoria);
            });
        } else {

            const inputEditarTitulo = categoriaAtual.querySelector(".inputEditarTitulo");
            const tituloCategoria = document.createElement("h2");
            tituloCategoria.classList.add("TituloCategoria");

            if (vetCategorias[idCategoria]) {
                vetCategorias[idCategoria].nome = inputEditarTitulo.value;
                tituloCategoria.textContent = vetCategorias[idCategoria].nome;
                inputEditarTitulo.replaceWith(tituloCategoria);

                inputAlterarCorCategoria.style.display = "none";
                botaoExcluirCategoria.style.display = "none";
                botaoEditarCategoria.classList.remove("fa-check");
                botaoEditarCategoria.classList.add("fa-pen");
            }
        }
    }
    mudarAparenciaDaCategoria(idCategoria);
}

function excluirCategoria(idCategoria) {

    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const popupConfirm = document.getElementById('popup-confirm');
    const popupCancel = document.getElementById('popup-cancel');

    if (!popup || !popupText || !popupConfirm || !popupCancel) {
        console.error('Um ou mais elementos do popup não foram encontrados.');
        return;
    }

    popupText.textContent = "Tem certeza que deseja excluir esta categoria?";
    popupConfirm.addEventListener('click', () => {

        const categoriaParaExcluir = vetCategorias.find(c => c.id === idCategoria);

        if (categoriaParaExcluir) {

            vetCategorias = vetCategorias.filter(c => c.id !== idCategoria);

            const categoriaElemento = document.getElementById('categoria' + idCategoria);
            if (categoriaElemento) {
                categoriaElemento.remove();
            }

            popup.style.display = 'none';

            mudarAparenciaDaCategoria(idCategoria);
        }
    });

    popupCancel.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    popup.style.display = 'block';

    console.log(vetCategorias);
}

function editarMeta(idCategoria, idMeta) {
    const categoria = vetCategorias.find(c => c.id === idCategoria);

    const meta = categoria.metas.find(m => m.idMeta === idMeta);

    const botaoEditarMeta = document.querySelector(`.editarMeta${idCategoria}Meta${idMeta}`);
    const nomeMeta = document.querySelector(`.tituloTarefa${idCategoria}Meta${idMeta}`);

    if (botaoEditarMeta.classList.contains("fa-pen")) {
        const inputNomeMeta = document.createElement("input");
        inputNomeMeta.type = "text";
        inputNomeMeta.value = meta.texto;
        inputNomeMeta.className = "inputEditarMeta";
        nomeMeta.replaceWith(inputNomeMeta);
        inputNomeMeta.focus();

        botaoEditarMeta.classList.remove("fa-pen");
        botaoEditarMeta.classList.add("fa-check");
    } else {
        const inputEditarMeta = document.querySelector(".inputEditarMeta");
        meta.texto = inputEditarMeta.value;

        const tituloMeta = document.createElement("p");
        tituloMeta.className = `tituloTarefa${idCategoria}Meta${idMeta}`;
        tituloMeta.textContent = meta.texto;
        inputEditarMeta.replaceWith(tituloMeta);

        botaoEditarMeta.classList.remove("fa-check");
        botaoEditarMeta.classList.add("fa-pen");
    }
}


function excluirMeta(idCategoria, idMeta) {
    let categoria = vetCategorias.find(c => c.id === idCategoria);

    if (categoria) {
        categoria.metas = categoria.metas.filter(meta => meta.idMeta !== idMeta);


        atualizarHTMLCategoria(idCategoria);

        console.log(vetCategorias);
    } else {
        console.error('Categoria não encontrada.');
    }
    atualizaQuantidadeDeMetas(idCategoria)
}

function mudarAparenciaDaCategoria(idCategoria) {
    const categoriaAtual = document.getElementById('categoria' + idCategoria);

    if (categoriaAtual) {
        const inputAlterarCorCategoria = categoriaAtual.querySelector(".inputCorDaCategoria");
        const cabecalhoCategoria = categoriaAtual.querySelector(".CabecalhoCartao");
        const checkbox = categoriaAtual.querySelector(".checkbox-personalizado");
        const botaoAdicionaMeta = categoriaAtual.querySelector(".adicionarMeta");
        const botaoExcluirMeta = categoriaAtual.querySelector(".excluirMeta");
        const botaoEditarMeta = categoriaAtual.querySelector(".editarMeta");

        var corDoInputCategoria = inputAlterarCorCategoria.value;

        let categoria = vetCategorias.find(c => c.id === idCategoria);

        if (categoria) {

            categoria.cor = corDoInputCategoria;

            corDoInputCategoria = corDoInputCategoria.replace(/^#/, '');
            var bigint = parseInt(corDoInputCategoria, 16);
            var red = (bigint >> 16) & 255;
            var green = (bigint >> 8) & 255;
            var blue = bigint & 255;

            categoriaAtual.style.backgroundColor = `rgba(${red},${green},${blue})`;
            categoriaAtual.style.boxShadow = `-2px 2px 4px rgb(${red}, ${green}, ${blue})`;
            categoriaAtual.querySelector('.CabecalhoCartao').style.backgroundImage = `linear-gradient(rgb(${red + 160},${green + 160},${blue + 160}), rgb(${red},${green},${blue}))`;

        }
    }
}