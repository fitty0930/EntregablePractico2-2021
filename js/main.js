document.addEventListener('DOMContentLoaded', function () {
    // CONSTANTES
    const FICHASTOTALES = 42; // borrar si no se usa
    const FICHASJUGADOR = 21;
    const RADIOESPACIOS = 30;
    const DESELECCIONAR = 99;
    const POSYENCIMATABLERO = 45; // la posicion y suficiente para evaluar si meto o no la ficha
    const INICIOTABLEROX = 230; // inicio del tablero en X
    const FINTABLEROX = 720; // final del tableor en X

    // VARIABLES
    let canvas = document.getElementById('connectfour');
    let ctx = canvas.getContext('2d')
    let partida;
    let imageData = null;
    let btnreload = document.getElementById('reload');
    let avisorojo = document.getElementById('avisorojo');
    let avisoazul = document.getElementById('avisoazul');

    btnreload.addEventListener('click', function () {
        imageData = null;
        iniciar();
    });

    iniciar();

    // FUNCIONES
    function iniciar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        partida = new Tablero(canvas);
        partida.nuevaPartida();
        dibujarFondo();
        escucharEventos();
    }

    function dibujarFondo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (imageData != null) {
            ctx.putImageData(imageData, 0, 0);
            dibujarTablero();

        } else {
            let background = new Image();
            background.src = "./images/fondo-juegosdemesa.png";
            background.onload = function () {
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                crearFichas();
            }
        }
    }


    function crearFichas() {
        let imagenFichasRojas = new Image();
        imagenFichasRojas.src = './images/redchip.png';
        imagenFichasRojas.onload = () => {
            for (let i = 0; i < FICHASJUGADOR; i++) {
                ficha = new Ficha(100, 50 + (i * 25), RADIOESPACIOS, 'rojo', 'red', imagenFichasRojas, canvas); // poner datos de la ficha
                partida.fichasRojas.push(ficha);
            }

            let imagenFichasAzules = new Image();
            imagenFichasAzules.src = './images/bluechip.png';
            imagenFichasAzules.onload = () => {
                for (let i = 0; i < FICHASJUGADOR; i++) {
                    ficha = new Ficha(875, 50 + (i * 25), RADIOESPACIOS, 'azul', 'blue', imagenFichasAzules, canvas);
                    partida.fichasAzules.push(ficha);
                }
                dibujarTablero();
            }
        }


    }


    function escucharEventos() {
        canvas.addEventListener('mousedown', (event) => {
            // verificar si se clickeo alguna de mis fichas
            if (partida.turnoDe == 'rojo') {
                let i = 0;
                let clickeado = false;
                // RECORRO CADA FICHIN ROJO Y LE PREGUNTO SI LO CLICKEARON
                while (i < partida.fichasRojas.length && !clickeado) {
                    if (partida.turnoDe == partida.fichasRojas[i].jugador) { // iniciando el rojo 
                        if (partida.fichasRojas[i].isClicked(event.offsetX, event.offsetY)) { // pregunto si le clickearon alguna ficha
                            partida.fichaSeleccionada = i;
                            clickeado = true;
                        }
                    }
                    i++;
                }

            } else if (partida.turnoDe == 'azul') {
                let j = 0;
                let clickeado = false;
                while (j < partida.fichasAzules.length && !clickeado) {
                    if (partida.turnoDe == partida.fichasAzules[j].jugador) {
                        if (partida.fichasAzules[j].isClicked(event.offsetX, event.offsetY)) {
                            partida.fichaSeleccionada = j;
                            clickeado = true;
                        }
                    }
                    j++;
                }
            }
        })

        canvas.addEventListener('mousemove', (event) => {
            if (partida.fichaSeleccionada < 21 && partida.fichaSeleccionada >= 0) {
                if (partida.turnoDe == 'rojo') {
                    partida.fichasRojas[partida.fichaSeleccionada].posicionarFicha(event.offsetX, event.offsetY);
                }
                else if ((partida.turnoDe == 'azul')) {
                    partida.fichasAzules[partida.fichaSeleccionada].posicionarFicha(event.offsetX, event.offsetY);
                }
                dibujarFondo();
            }
        })

        canvas.addEventListener('mouseup', (event) => {
            eventoTerminado()
        })

        canvas.addEventListener('mouseover', () => {
            eventoTerminado()
        })

        canvas.addEventListener('mouseleave',()=>{
            eventoTerminado();
            let selection=window.getSelection();
            selection.removeAllRanges();
            // evita que se seleccione todo al hacer mouseleave con el click presionado 
            // y se intente draggear el contenido de la pagina seleccionado en lugar de la ficha
        })
    }

    function eventoTerminado() {
        let ingreso = verificarSiIngreso();
        if (!ingreso) {
            if (imageData != null) {
                //volver a la pila
                // pregunto de quien es el turno para saber que array mirar
                if (partida.turnoDe == 'rojo') {
                    if (partida.fichasRojas[partida.fichaSeleccionada] != null)
                        partida.fichasRojas[partida.fichaSeleccionada].volverALaPila();

                } else if (partida.turnoDe == 'azul') {
                    if (partida.fichasRojas[partida.fichaSeleccionada] != null)
                        partida.fichasAzules[partida.fichaSeleccionada].volverALaPila();

                }
                dibujarFondo();
            }

        } else {
            partida.cambiarTurno()
            dibujarFondo()
        }
        partida.fichaSeleccionada = DESELECCIONAR;
    }

    function dibujarTablero() {
        // el tablero
        ctx.fillStyle = "rgb(28, 138, 46)";
        ctx.fillRect(220, 80, 500, 450);
        // la base del tablero
        ctx.fillStyle = "rgb(20, 65, 34)"
        ctx.fillRect(200, 525, 540, 30)

        // mis agujeros
        for (let i = 0; i < partida.tablero.length; i++) {
            for (let j = 0; j < partida.tablero[i].length; j++) {
                partida.tablero[i][j].dibujarFicha();
            }
        }

        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height) // despues de mi tablero
        dibujarFichas();
        crearAviso();
    }

    function dibujarFichas() {
        // fichas de cada player
        for (let i = 0; i < partida.fichasRojas.length; i++) {
            partida.fichasRojas[i].dibujarFicha(); // dibujo mis fichas rojas   
        }
        for (let i = 0; i < partida.fichasAzules.length; i++) {
            partida.fichasAzules[i].dibujarFicha(); // dibujo mis fichas azules
        }
    }

    function crearAviso(ganador) {
        // avisito
        if (ganador) {
            let imagenganador = new Image();
            imagenganador.src = './images/ganaste.png'
            imagenganador.onload = () => {
                ctx.fillStyle = "rgb(0,0,0)"
                if (ganador == 'rojo') {
                    ctx.drawImage(imagenganador, 150, 10, 150, 50)
                }
                else if (ganador == 'azul') {
                    ctx.drawImage(imagenganador, 670, 10, 150, 50)
                }
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height) // para que se congele al ganar
            }

        }

        if (partida.turnoDe == 'rojo') {
            avisorojo.classList.remove('ocultar')
            avisoazul.classList.add('ocultar')
        } else if (partida.turnoDe == 'azul') {
            avisoazul.classList.remove('ocultar')
            avisorojo.classList.add('ocultar')
        } else {
            avisorojo.classList.add('ocultar')
            avisoazul.classList.add('ocultar')
        }


    }

    function verificarSiIngreso() {
        let fichas;
        // pregunto de quien es el turno para saber que array mirar
        if (partida.turnoDe == 'rojo') {
            fichas = partida.fichasRojas[partida.fichaSeleccionada];
        } else if (partida.turnoDe == 'azul') {
            fichas = partida.fichasAzules[partida.fichaSeleccionada];
        }
        if (fichas != null) {
            if (fichas.y < POSYENCIMATABLERO && (fichas.x > INICIOTABLEROX && fichas.x < FINTABLEROX)) { // pregunto si esta sobre el tablero
                for (let i = 0; i < partida.tablero.length; i++) {
                    // posicion en x de cada circulo tablero[i][0].x + - el radio /2 
                    let mayor = partida.tablero[i][0].x + (RADIOESPACIOS / 2); // pos + 1/2 radio
                    let menor = partida.tablero[i][0].x - (RADIOESPACIOS / 2) // pos - 1/2 radio
                    if (fichas.x < mayor && fichas.x > menor) {
                        let j = 5;
                        while (j >= 0) {
                            if (partida.tablero[i][j].jugador == 'ninguno') {
                                partida.tablero[i][j].jugador = partida.turnoDe;
                                partida.tablero[i][j].color = fichas.color;
                                partida.tablero[i][j].imagen = fichas.imagen;

                                if (partida.turnoDe == 'rojo') {
                                    partida.fichasRojas.splice(partida.fichaSeleccionada, 1);
                                }
                                else if (partida.turnoDe == 'azul') {
                                    partida.fichasAzules.splice(partida.fichaSeleccionada, 1);
                                }
                                dibujarFondo();
                                if (partida.chequearGanador(i, j)) {
                                    ganador(partida.turnoDe)
                                    partida.turnoDe = 'ninguno'
                                } else if (partida.fichasAzules.length == 0 && partida.fichasRojas.length == 0) {
                                    partida.turnoDe = 'ninguno'
                                }
                                return true;
                            }

                            j--;


                        }
                    }
                }
                return false;
            } else {
                return false;
            }
        }

    }

    function ganador(ganador) {
        if (ganador == 'rojo') {
            crearAviso('rojo')
        } else if (ganador == 'azul') {
            crearAviso('azul')
        }
    }
})



