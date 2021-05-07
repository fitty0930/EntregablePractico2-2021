class Tablero {
    constructor(canvas) {
        this.TABLEROCOLS = 7 // cantidad de columnas
        this.TABLEROROWS = 6; // cantidad de filas
        this.TOTALFICHAS = 42; // total de fichas
        this.RADIOESPACIOS = 30; // radio de mis circulos blancos/ espacios
        this.POSTABLEROX = 215; // posicion del tablero en x (donde inicia su rect)
        this.POSTABLEROY = 85; // posicion del tablero en y (donde inicia su rect)
        this.MULTRADIO = 1.5; // multiplicar el radio x esto (a ojo)
        this.MULTCONT = 70;  // multiplicar el contador x esto (a ojo)

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.fichasRojas = []; // 21
        this.fichasAzules = []; // 21
        this.turnoDe = 'rojo'; // siempre empieza el rojo
        this.tablero = [[], [], [], [], [], [], []] // un array de arrays de 6 alto x 7 de ancho
        this.fichaSeleccionada = 99; // un numero del 0 al 20
    }

    nuevaPartida() {
        for (let i = 0; i < this.TABLEROCOLS; i++) { // 7 
            for (let j = 0; j < this.TABLEROROWS; j++) {  // 6 
                // RELLENO TODO EL TABLERO DE FICHAS VACIAS
                let ficha = new Ficha((this.POSTABLEROX + this.RADIOESPACIOS * this.MULTRADIO + this.MULTCONT * i), (this.POSTABLEROY + this.RADIOESPACIOS * this.MULTRADIO + this.MULTCONT * j), this.RADIOESPACIOS, 'ninguno', 'white', null, this.canvas);
                this.tablero[i][j] = ficha;
            }
        }

    }

    cambiarTurno() {
        if (this.turnoDe == 'rojo') {
            this.turnoDe = 'azul'
        } else if (this.turnoDe == 'azul') {
            this.turnoDe = 'rojo'
        }
    }

    chequearGanador(posI, posJ) {
        // recorrido horizontal
        this.chequearHorizontal(posJ);

        // recorrido vertical
        this.chequearVertical(posI);

        // recorrido diagonal
        this.chequearDiagonal(posI, posJ)
    }

    chequearHorizontal(posJ) {
        let count = 0;
        for (let i = 0; i < this.TABLEROCOLS - 1; i++) {
            if (this.tablero[i][posJ].jugador == this.turnoDe && this.tablero[i + 1][posJ].jugador == this.turnoDe) {
                count++;
            }
        }
        if (count == 3) {
            console.log("ganaste");
            // hacer algo con lo ganado
        }
    }

    chequearVertical(posI) {
        let count = 0;
        for (let j = 0; j < this.tablero[posI].length - 1; j++) {
            if (this.tablero[posI][j].jugador == this.turnoDe && this.tablero[posI][j + 1].jugador == this.turnoDe) {
                count++;
            }
        }
        if (count == 3) {
            console.log("ganaste");
            // hacer algo con lo ganado
        }
    }

    chequearDiagonal(posI, posJ) {
        // TBC
    }
}