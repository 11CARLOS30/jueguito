document.addEventListener("DOMContentLoaded", function() {
    let nombreJugador1 = prompt("Ingrese el nombre del Jugador 1:");
    let nombreJugador2 = prompt("Ingrese el nombre del Jugador 2:");

    const cartas = ['♥', '♦', '♣', '♠', '★', '☁', '♪', '❦'];
    const pares = cartas.concat(cartas); 
    let cartasBarajadas = barajarArray(pares); 
    let cartasVolteadas = [];
    let cartasCoincidentes = [];
    let jugadorActual = 1;
    let puntajeJugador1 = 0;
    let puntajeJugador2 = 0;
    let tiempo = 0; 
    let intervaloTemporizador; 

    const tableroJuego = document.getElementById('tableroJuego');
    const puntajeJugador1Mostrado = document.getElementById('puntajeJugador1');
    const puntajeJugador2Mostrado = document.getElementById('puntajeJugador2');
    const contadorElemento = document.getElementById('contador'); 
    const cartaAlerta = document.getElementById('cartaAlerta');

    puntajeJugador1Mostrado.textContent = `${nombreJugador1}: ${puntajeJugador1}`;
    puntajeJugador2Mostrado.textContent = `${nombreJugador2}: ${puntajeJugador2}`;

    // Función para actualizar el contador de tiempo
    function actualizarContador() {
        tiempo++;
        contadorElemento.textContent = 'Tiempo: ' + tiempo + 's';
    }

    // Comenzar el contador de tiempo
    intervaloTemporizador = setInterval(actualizarContador, 1000);

    // Crear y mostrar las cartas en el tablero de juego
    cartasBarajadas.forEach((carta, indice) => {
        const cartaElemento = document.createElement('div');
        cartaElemento.classList.add('carta');
        cartaElemento.dataset.index = indice;
        cartaElemento.dataset.value = carta;
        cartaElemento.dataset.flipped = 'false';
        cartaElemento.addEventListener('click', () => voltearCarta(cartaElemento));
        const cartaInterior = document.createElement('div');
        cartaInterior.classList.add('carta-interior');
        const cartaFrente = document.createElement('div');
        cartaFrente.classList.add('carta-frente');
        cartaFrente.textContent = '';
        const cartaDorso = document.createElement('div');
        cartaDorso.classList.add('carta-dorso');
        cartaDorso.textContent = carta;
        cartaInterior.appendChild(cartaFrente);
        cartaInterior.appendChild(cartaDorso);
        cartaElemento.appendChild(cartaInterior);
        tableroJuego.appendChild(cartaElemento);
    });

    // Función para voltear una carta
    function voltearCarta(cartaElemento) {
        if (cartasVolteadas.length < 2 && !cartasCoincidentes.includes(cartaElemento)) {
            cartaElemento.classList.add('volteada');
            cartasVolteadas.push(cartaElemento);
            if (cartasVolteadas.length === 2) {
                setTimeout(verificarCoincidencia, 1000);
            }
        }
    }

    // Función para verificar si las cartas volteadas coinciden
    function verificarCoincidencia() {
        const carta1 = cartasVolteadas[0];
        const carta2 = cartasVolteadas[1];
        if (carta1.dataset.value === carta2.dataset.value) {
            cartasCoincidentes.push(carta1, carta2);
            actualizarPuntajes();
            if (cartasCoincidentes.length === pares.length) {
                clearInterval(intervaloTemporizador); 
                mostrarAlerta(`El ganador del juego es ${puntajeJugador1 > puntajeJugador2 ? nombreJugador1 : nombreJugador2} en ${tiempo} segundos`);
            }
        } else {
            cartasVolteadas.forEach(carta => {
                setTimeout(() => {
                    carta.classList.remove('volteada');
                }, 1000);
            });
            cambiarJugador();
        }
        cartasVolteadas = [];
    }

    // Función para actualizar los puntajes de los jugadores
    function actualizarPuntajes() {
        if (jugadorActual === 1) {
            puntajeJugador1++;
            puntajeJugador1Mostrado.textContent = `${nombreJugador1}: ${puntajeJugador1}`;
        } else {
            puntajeJugador2++;
            puntajeJugador2Mostrado.textContent = `${nombreJugador2}: ${puntajeJugador2}`;
        }
    }

    // Función para cambiar los turnos de los jugadores
    function cambiarJugador() {
        jugadorActual = jugadorActual === 1 ? 2 : 1;
        mostrarAlerta(`Turno del Jugador ${jugadorActual === 1 ? nombreJugador1 : nombreJugador2}`);
    }

    // Función para barajar un array
    function barajarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Función para mostrar la alerta en el card flotante
    function mostrarAlerta(mensaje) {
        const elementoMensajeAlerta = document.querySelector('.mensaje-alerta');
        elementoMensajeAlerta.textContent = mensaje;
        cartaAlerta.style.display = 'block';
    }

    // Función para cerrar la alerta
    function cerrarAlerta() {
        cartaAlerta.style.display = 'none';
    }

    document.getElementById('cerrarAlertaBtn').addEventListener('click', cerrarAlerta);
});
