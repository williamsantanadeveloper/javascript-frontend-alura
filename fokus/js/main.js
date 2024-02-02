const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

const banner = document.querySelector('.app__image');

const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');

const musicaFocoInput = document.querySelector('#alternar-musica');

const startPauseBt = document.querySelector('#start-pause');
let intervaloId = null;
let tempoDecorridoEmSegundos = 5;
const musicaPlay = new Audio('../sons/play.wav');
const musicaFinalizado = new Audio('../sons/beep.mp3');
const musicaPausa = new Audio('../sons/pause.mp3');
const musica = new Audio('../sons/luna-rise-part-one.mp3');
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `../imagens/${contexto}.png`);
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar para à superfície. <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaFinalizado.play();
        zerar();
        alert('Tempo finalizado!');
        return
    }
    tempoDecorridoEmSegundos -= 1;
    console.log(`Temporizador: ${tempoDecorridoEmSegundos}`);
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        musicaPausa.play();
        zerar();
        return
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}