/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];


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
    console.log(deck);
    console.log(carta);
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

const carta = pedirCarta();
console.log(valorCarta(carta));