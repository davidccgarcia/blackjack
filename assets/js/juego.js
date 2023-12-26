(() => {
    'use strict';

    /**
     * 2C = Two of Clubs (Tréboles)
     * 2D = Two of Diamonds (Diamantes)
     * 2H = Two of Hearts (Corazones)
     * 2S = Two of Spades (Espadas)
     */

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'], 
          especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0,
    //    puntosComputadora = 0;
    let puntosJugadores = [];

    // Referencias HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divJugadorCartas     = document.querySelector('#jugador-cartas'),
          divComputadoraCartas = document.querySelector('#computadora-cartas'),
          puntosHTML = document.querySelectorAll('small');

    // Esta función se encarga de ordenar los elementos del array (Mezclar la baraja)
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    // Esta función me permite inicialiazar el juego
    const inicialiazarJuego = ( numJugadores = 1 ) => {
        deck = crearDeck();

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        console.log({ puntosJugadores });
    }

    // Esta función crea un nuevo deck
    const crearDeck = () => {
        deck = [];

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

        return shuffle(deck);
    }

    // Esta función me permite tomar una carta
    const pedirCarta = () => {
        
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    // Esta función sirve para obtener el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

    // Esta función permite acumular puntos a el jugador
    const acumularPuntos = () => {

    }

    // Esta función le permite mostrar las cartas en el HTML a la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);

            puntosHTML[1].innerText = puntosComputadora;

            // <img class="carta" src="assets/cartas/2C.png" alt="carta">
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            imgCarta.alt = 'carta';
            divComputadoraCartas.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) )

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana!');
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana!');
            } else {
                alert('Computadora gana!');
            }
        }, 20);
            
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
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();

        inicialiazarJuego();
        /* deck = [];
        crearDeck(); */

        puntosHTML.forEach((punto) => {
            punto.innerText = 0;
        });

        puntosJugador     = 0;
        puntosComputadora = 0;

        divJugadorCartas.innerHTML     = '';
        divComputadoraCartas.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });

})();
