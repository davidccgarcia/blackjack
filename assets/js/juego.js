/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const divJugadorCartas = document.querySelector('#jugador-cartas');

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

    deck = shuffle(deck);
}

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {
    
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

// pedirCarta();
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}

// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/2C.png" alt="carta">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    imgCarta.alt = 'carta';
    divJugadorCartas.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste!');
        btnPedir.disabled = true;
    } else if (puntosJugador === 21) {
        console.warn('21, Genial!');
        btnPedir.disabled = true;
    }
});