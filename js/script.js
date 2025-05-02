let tarefas = carregarTarefas();
let editandoIndex = -1; // Índice da tarefa sendo editada
renderizarTarefas(tarefas);

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const inputNovaTarefa = document.getElementById('novaTarefa');
    const textoNovaTarefa = inputNovaTarefa.value.trim();

  if (textoNovaTarefa !== "") {
    tarefas.push({ texto: textoNovaTarefa, concluida: false });
    inputNovaTarefa.value = "";
    salvarTarefas();
    renderizarTarefas(tarefas);
    }
}

function marcarConcluida(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvarTarefas();
    renderizarTarefas(tarefas);
}

function removerTarefa(index) {
    tarefas.splice(index, 1);
    salvarTarefas();
    renderizarTarefas(tarefas);
}

function iniciarEdicao(index) {
    editandoIndex = index;
    renderizarTarefas(tarefas); // Re-renderiza para mostrar o input de edição
}

function salvarEdicao(index) {
    const inputEdicao = document.getElementById(`editar-${index}`);
    if (inputEdicao) {
        const novoTexto = inputEdicao.value.trim();
        if (novoTexto !== "") {
            tarefas[index].texto = novoTexto;
            editandoIndex = -1; // Sai do modo de edição
            salvarTarefas();
            renderizarTarefas(tarefas);
            }
        }
}

function cancelarEdicao() {
    editandoIndex = -1;
    renderizarTarefas(tarefas); // Re-renderiza para voltar à visualização normal
}

function renderizarTarefas(listaDeTarefas) {
    const listaElemento = document.getElementById('listaDeTarefas');
    listaElemento.innerHTML = ""; // Limpa a lista antes de renderizar

    listaDeTarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');

    if (editandoIndex === index) {
        li.classList.add('editando');
        const inputEdicao = document.createElement('input');
        inputEdicao.type = 'text';
        inputEdicao.id = `editar-${index}`;
        inputEdicao.value = tarefa.texto;
        li.appendChild(inputEdicao);

        const botaoSalvar = document.createElement('button');
        botaoSalvar.textContent = 'Salvar';
        botaoSalvar.onclick = () => salvarEdicao(index);
        li.appendChild(botaoSalvar);

        const botaoCancelar = document.createElement('button');
        botaoCancelar.textContent = 'Cancelar';
        botaoCancelar.onclick = cancelarEdicao;
        li.appendChild(botaoCancelar);

        } else {
            const textoTarefa = document.createElement('span');
            textoTarefa.textContent = tarefa.texto;
        if (tarefa.concluida) {

            textoTarefa.classList.add('concluida');
         }
        li.appendChild(textoTarefa);

        const botoesAcoes = document.createElement('div');

        const botaoConcluir = document.createElement('button');
        botaoConcluir.textContent = tarefa.concluida ? 'Desmarcar' : 'Concluir';
        botaoConcluir.onclick = () => marcarConcluida(index);
        botoesAcoes.appendChild(botaoConcluir);

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.onclick = () => iniciarEdicao(index);
        botoesAcoes.appendChild(botaoEditar);

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerTarefa(index);
        botoesAcoes.appendChild(botaoRemover);

        li.appendChild(botoesAcoes);
        }

                listaElemento.appendChild(li);
            });
}

function filtrarTarefas() {
    const filtro = document.getElementById('filtrarTarefas').value;
    let tarefasFiltradas;

        if (filtro === 'todas') {
            tarefasFiltradas = tarefas;
        } else if (filtro === 'concluidas') {
            tarefasFiltradas = tarefas.filter(tarefa => tarefa.concluida);
        } else if (filtro === 'pendentes') {
                tarefasFiltradas = tarefas.filter(tarefa => !tarefa.concluida);
        }

            renderizarTarefas(tarefasFiltradas);
}

function limparTudo() {
    tarefas = [];
    localStorage.removeItem('tarefas');
    renderizarTarefas(tarefas);
}