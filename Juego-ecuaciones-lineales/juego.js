document.addEventListener('DOMContentLoaded', iniciarJuego);

const preguntas = [
    { texto: "¿Cuál es el valor de X en la ecuación 2x + 3 = 7?", opciones: ["2", "1", "4", "3"], respuestaCorrecta: "2" },
    { texto: "Si 5x - 10 = 0, ¿cuál es el valor de X?", opciones: ["5", "2", "10", "0"], respuestaCorrecta: "2" },
    { texto: "Encuentra X en la ecuación x/4 - 2 = 3", opciones: ["20", "12", "16", "8"], respuestaCorrecta: "20" },
    { texto: "¿Cuál es el valor de X si 3x = 9?", opciones: ["3", "6", "2", "9"], respuestaCorrecta: "3" },
    { texto: "Resuelve para X: 4x + 4 = 12", opciones: ["2", "1", "3", "4"], respuestaCorrecta: "2" }
];

class Usuario {
    constructor() {
        this.nombre = prompt("Ingresa tu nombre de usuario:");
        this.clave = this.solicitarContrasena();
        this.edad = this.solicitarEdad();
        this.idUsuario = Date.now(); 
        alert(`Bienvenido ${this.nombre}. Tu ID de usuario es ${this.idUsuario}. Tienes ${this.edad} años. ¡Buena suerte!`);
    }

    solicitarContrasena() {
        let contrasena;
        do {
            contrasena = prompt("Ingresa tu contraseña (debe contener al menos un número):");
        } while (!/\d/.test(contrasena));
        return contrasena;
    }

    solicitarEdad() {
        let edad;
        do {
            edad = parseInt(prompt("Ingresa tu edad (debe estar entre 12 y 14 años):"), 10);
        } while (isNaN(edad) || edad < 11 || edad > 15);
        return edad;
    }
}

class Game {
    constructor(usuario) {
        this.usuario = usuario;
        this.vidas = 3;
        this.puntos = 0;
        this.preguntasCorrectas = 0;
        this.temporizadorPregunta = null;
        this.tiempoInicio = Date.now();
    }

    iniciar() {
        this.actualizarUI();
        this.mostrarPregunta(0);
    }

    mostrarPregunta(indicePregunta) {
        if (indicePregunta < preguntas.length) {
            const pregunta = preguntas[indicePregunta];
            const questionContainer = document.getElementById('question-container');
            questionContainer.textContent = pregunta.texto;
            
            const answersContainer = document.getElementById('answers-container');
            answersContainer.innerHTML = '';
            pregunta.opciones.forEach(opcion => {
                const boton = document.createElement('button');
                boton.textContent = opcion;
                boton.onclick = () => {
                    clearTimeout(this.temporizadorPregunta);
                    this.verificarRespuesta(indicePregunta, opcion);
                };
                answersContainer.appendChild(boton);
            });
            this.iniciarTemporizador(indicePregunta);
        } else {
            this.finalizarJuego();
        }
    }

    iniciarTemporizador(indicePregunta) {
        if (this.temporizadorPregunta) {
            clearTimeout(this.temporizadorPregunta);
        }
        this.temporizadorPregunta = setTimeout(() => {
            alert("¡Tiempo fuera!");
            this.vidas--;
            this.actualizarUI();
            if (this.vidas > 0) {
                this.mostrarPregunta(indicePregunta + 1);
            } else {
                this.finalizarJuego();
            }
        }, 30000);
    }

    verificarRespuesta(indicePregunta, respuestaSeleccionada) {
        const pregunta = preguntas[indicePregunta];
        if (respuestaSeleccionada === pregunta.respuestaCorrecta) {
            this.puntos += 10;
            this.preguntasCorrectas++;
            alert("¡Excelente!");
        } else {
            this.vidas--;
        }
        this.actualizarUI();
        if (this.vidas === 0) {
            this.finalizarJuego();
        } else {
            this.mostrarPregunta(indicePregunta + 1);
        }
    }

    actualizarUI() {
        document.getElementById('lives').innerHTML = `Vidas: ${'❤️'.repeat(this.vidas)}`;
        document.getElementById('score').textContent = `Puntos: ${this.puntos}`;
    }

    finalizarJuego() {
        const tiempoTotalJugado = ((Date.now() - this.tiempoInicio) / 1000).toFixed(2);
        alert(`Juego terminado. Puntuación final: ${this.puntos}. Tiempo total jugado: ${tiempoTotalJugado} segundos.`);
        clearTimeout(this.temporizadorPregunta);
        if (confirm("¿Quieres reintentar el juego?")) {
            this.reintentar();
        }
    }

    reintentar() {
        this.vidas = 3;
        this.puntos = 0;
        this.preguntasCorrectas = 0;
        this.tiempoInicio = Date.now();
        this.iniciar();
    }
}

function iniciarJuego() {
    const usuario = new Usuario();
    const juego = new Game(usuario);
    juego.iniciar();
}
