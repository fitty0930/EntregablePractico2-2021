class Ficha {
    
    constructor(x, y, radius, jugador, color, imagen, canvas) {
        this.x = x; // posicion de la ficha
        this.y = y; // posicion de la ficha
        this.radius = radius;
        this.jugador = jugador; // rojo o azul
        this.color = color; // es perfectamente eliminable 
        this.imagen = imagen; // mi fichin.png
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.pilePosX=x; // posicion en la pila en x
        this.pilePosY=y; // posicion en la pila en y
        // variable para mover o borrar
        
    }


    // me dibujo
    dibujarFicha() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.fill();
        this.context.closePath();
        if (this.imagen!=null) {
            this.context.drawImage(this.imagen, this.x - this.radius, this.y - this.radius, 2*this.radius, 2*this.radius);
        }
    }

    // chequeo si me clickearon
    isClicked(clickx, clicky) {
        return Math.sqrt((clickx - this.x) ** 2 + (clicky - this.y) ** 2) < this.radius;
    }

    // posiciono en una nueva posicion
    posicionarFicha(posx, posy) {
        this.x = posx;
        this.y = posy;
    }


    volverALaPila(){
        this.x=this.pilePosX;
        this.y=this.pilePosY;
    }

}