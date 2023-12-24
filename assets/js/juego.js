/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias HTML
const btnNuevaCarta = document.querySelector('#btnNuevaCarta');
const divJugadorCartas = document.querySelector('#jugador-carta');

const puntosHTML = document.querySelectorAll('small');

// Esta función se encarga de ordenar los elementos del array (Mezclar la baraja)
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

// Esta función crea un nuevo deck
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    shuffle(deck);
    console.log(deck);
}

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en la baraja';
    }

    const carta = deck.pop();
    return carta;
}

// pedirCarta();
/**
 * Esta función me permite saber el valor de una carta
 * 
 * Cuando la carta sea A entonces vale 11 puntos, en cualquier 
 * otro caso el valor de la carta será 10
 * 
 * Cuando la carta sea de tipo númerico (5D) entonces el valor 
 * de la carta será igual a ese número (5)
 */
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return ( isNaN(valor) ) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;
}

// Eventos
/**
 * Este detector de eventos se encarga de obtener y 
 * mostrar los puntos en el HTML
 */
btnNuevaCarta.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    // <img class="carta" src="assets/cartas/10C.png" alt="carta-10C">
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    imgCarta.alt = 'Carta';
    divJugadorCartas.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste!');
        btnNuevaCarta.disabled = true;
    } else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnNuevaCarta.disabled = true;
    }
});
