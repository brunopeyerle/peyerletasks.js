const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaBotaoComecar = new Audio ('/sons/play.wav')
const musicaPausar = new Audio ('/sons/pause.mp3')
const musicaTempoFinalizado = new Audio ('/sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const trocarImagemBtn = document.getElementById('icon');
const tempoNaTela = document.querySelector('#timer');

musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500
  alterarContexto('foco')
  focoBt.classList.add('active')
})

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
  alterarContexto('descanso-curto')
  curtoBt.classList.add('active')
})

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Foco no que importa,<br>
                <strong class="app__title-strong">ignore o resto.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Um respiro
            <strong class="app__title-strong"> para clarear a mente.</strong>`
            break;
        
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora do café!
            <strong class="app__title-strong"> Faça uma pausa mais longa!</strong>`
            break;

        default:
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        musicaTempoFinalizado.play()
        alert('tempo finalizado')
        const focoAtivo = html.getAttribute('data-contexto') === 'foco'
        if(focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()

}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        musicaPausar.play()
        trocarImagemBtn.setAttribute('src', '/imagens/play_arrow.png')
        zerar()
        return
    }

    if(musicaBotaoComecar.paused) {
        musicaBotaoComecar.play() 
        iniciarOuPausarBt.textContent = "Pausar"
        trocarImagemBtn.setAttribute('src', '/imagens/pause.png')
    }

    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    trocarImagemBtn.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado= tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})       
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()