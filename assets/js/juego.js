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

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML         = document.querySelectorAll('small');

    // Esta función se encarga de ordenar los elementos del array (Mezclar la baraja)
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    // Esta función me permite inicialiazar el juego
    const inicialiazarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
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
    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] += valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    // Esta función me permite crear la carta en el HTML
    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        imgCarta.alt = 'carta';
        divCartasJugadores[turno].append( imgCarta );
    }

    // Esta función le permite mostrar las cartas en el HTML a la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length - 1 );

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
        const puntosJugador = acumularPuntos( carta, 0 );

        crearCarta( carta, 0 );

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

        /* puntosHTML.forEach((punto) => {
            punto.innerText = 0;
        }); */

        /* puntosJugador     = 0;
        puntosComputadora = 0; */

        /* divJugadorCartas.innerHTML     = '';
        divComputadoraCartas.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false; */
    });

})();
