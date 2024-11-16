const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const musica = new Audio('sonidos/luna-rise-part-one.mp3')
let tiempoTranscurridoEnSegundos = 1500
let idItervalo = null
const sonidoPlay = new Audio('sonidos/play.wav')
const sonidoPausa = new Audio('sonidos/pause.mp3')
const sonidoTerminando = new Audio('sonidos/beep.mp3')
const botonIniciarPausar = document.querySelector('#start-pause')
const textoIniciarPausar = document.querySelector('#start-pause span')
const tiempoEnPantalla = document.querySelector('#timer')
const botonInciarPausar = document.querySelector('#start-pause')

musica.loop = true;

inputEnfoqueMusica.addEventListener('change',()=>{
    if(musica.paused){
        sonidoPlay.play()
        musica.play()

    }
    else{
        sonidoPausa.play()
        musica.pause()

    } 
})
botonCorto.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

botonEnfoque.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonLargo.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})

function cambiarContexto(contexto){
    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src',`./imagenes/${contexto}.png`)

    switch(contexto){
        case "enfoque":
            titulo.innerHTML = `
                Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            </h1>
            `
        break
        case "descanso-corto":
            titulo.innerHTML =  `
            Que tal tomar un respiro?
            <strong class="app__title-strong">Haz una pausa corta!.</strong>
            `
        break
        case "descanso-largo":
            titulo.innerHTML =  `
            Que tal tomar un respiro?
            <strong class="app__title-strong">Haz una pausa larga!.</strong>
            `
            default: 
            break;
        
    }
    
}

const cuentaRegresiva = ()=>{

    if(tiempoTranscurridoEnSegundos <= 6){
        sonidoTerminando.play()
    }
    
    if(tiempoTranscurridoEnSegundos <= 0){
        reiniciar()
        alert('tiempo final')
        return
    }
    textoIniciarPausar.textContent= "Pausar"
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
    }


botonInciarPausar.addEventListener('click', iniciarPausar)

function iniciarPausar(){
   if(idItervalo){
    reiniciar()
    return
}
idItervalo = setInterval(cuentaRegresiva, 1000)
}

function reiniciar(){
    clearInterval(idItervalo)
    idItervalo=null
    textoIniciarPausar.textContent= "Comenzar"

}

function mostrarTiempo(){
    const tiempo = new Date( tiempoTranscurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-AR', {minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `
        ${tiempoFormateado}
    `
}