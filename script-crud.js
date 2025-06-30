const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
const paragrafoTarefas = document.querySelector('.app__section-active-task-description')

const btnRemoverConcluida = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] 
let tarefaSelecionada = null
let liTarefaSelecionada = null

function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
        `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
       //debugger
       const novaDescricao = prompt("Qual é o novo nome da tarefa?",)
       console.log('Nova Descricao:', novaDescricao)
       if (novaDescricao) {
       paragrafo.textContent = novaDescricao
       tarefa.descricao = novaDescricao
       atualizarTarefas()
       }
    }

    const imagemBotao = document.createElement('img')


    imagemBotao.setAttribute('src', '/imagens/edit.png')

    botao.append(imagemBotao)
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if(tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
        

        const isActive = li.classList.contains('app__section-task-list-item--active');
        if (isActive) {
            li.classList.remove('app__section-task-list-item--active');
            paragrafoTarefas.textContent = '';
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
        } else {
            document.querySelectorAll('.app__section-task-list-item')
                .forEach(item => item.classList.remove('app__section-task-list-item--active'));
            li.classList.add('app__section-task-list-item--active');
            paragrafoTarefas.textContent = tarefa.descricao;
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
        }
    
        

    return li
        }
    }    
    return li;
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (event) => {
    event.preventDefault()
    const tarefa = {
        descricao: textArea.value
        
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    textArea.value = ''
    atualizarTarefas()
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

const limparFormulario = () => {
    formAdicionarTarefa.classList.add('hidden')
    textArea.value = ''
}

btnCancelar.addEventListener('click', limparFormulario)

// Evento para finalizar tarefa
document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item--active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        tarefaSelecionada = null;
        liTarefaSelecionada = null;
    }
})

    const removerTarefas= (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : "app__section-task-list-item"
    document.querySelectorAll(seletor).forEach((elemento => {
        elemento.remove()
    }))
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()
    }

    btnRemoverConcluida.onclick = () => removerTarefas(true)
    btnRemoverTodas.addEventListener('click', () => {
        tarefas = [];
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        ulTarefas.innerHTML = '';
        paragrafoTarefas.textContent = '';
    });