(() => {

    'use strict';

    /**
     * 2C = Two of Clubs (Tréboles)
     * 2D = Two of Diamonds (Diamantes)
     * 2H = Two of Hearts (Corazones)
     * 2S = Two of Spades (Espadas)
     */

    let deck = [];
    let tipos = ['C', 'D', 'H', 'S'];
    let especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias HTML
    const btnNuevaCarta = document.querySelector('#btnNuevaCarta'),
          btnDetener    = document.querySelector('#btnDetener'),
          btnNuevoJuego = document.querySelector('#btnNuevoJuego');

    const divCartasJugadores     = document.querySelectorAll('.divCartas');

    const puntosHTML = document.querySelectorAll('small');

    // Esta función se encarga de ordenar los elementos del array (Mezclar la baraja)
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
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

    // Esta función me permite inicializar el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
    }

    // Esta función me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en la baraja';
        }

        return deck.pop();
    }

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

    // Esta función le permite acumular puntos a los jugadores
    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    // Esta función me permite crear cartas en el HTML
    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        imgCarta.alt = 'Carta';
        divCartasJugadores[turno].append(imgCarta);
    }

    // Esta función le permite a la computadora mostras las cartas en el HTML
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;
        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length - 1 );

            if (puntosMinimos > 21) {
                break;
            }

        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) )

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('computadora gana!');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana!');
            } else {
                alert('Computadora gana!');
            }
        }, 20);
    }

    // Eventos
    /**
     * Este detector de eventos se encarga de obtener y 
     * mostrar los puntos en el HTML
     */
    btnNuevaCarta.addEventListener('click', () => {
        const carta = pedirCarta();
        let puntosJugador = acumularPuntos( carta, 0 );
        crearCarta( carta, 0 );

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste!');
            btnNuevaCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnNuevaCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnNuevaCarta.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    });

    btnNuevoJuego.addEventListener('click', () => {
        console.clear();
        inicializarJuego();
        /* deck = [];
        crearDeck(); */

        /* puntosHTML.forEach((punto) => {
            punto.innerText = 0;
        });

        puntosJugador     = 0;
        puntosComputadora = 0;

        divJugadorCartas.innerHTML     = '';
        divComputadoraCartas.innerHTML = '';

        btnNuevaCarta.disabled = false;
        btnDetener.disabled = false; */
    });

})();
