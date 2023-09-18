//variables
var body = document.querySelector('body');
var descanso = document.getElementById('descanso');
var trabajo = document.getElementById('trabajo');

var tiempoTrabajo = 30 * 60;  
var tiempoDescanso = 5 * 60; 

var esDescanso = false;
var segundos = 0;

var negro = 100;
var morado = 100;

// Cuando cargue la página
window.onload = () => {
    actualizarTiempo();
}

function formatoDosDigitos(num) {
    return num < 10 ? "0" + num : num;
}

function actualizarTiempo() {
    var minutos = Math.floor(segundos / 60);
    var segundosRestantes = segundos % 60;

    document.getElementById('minutos').innerHTML = minutos;
    document.getElementById('segundos').innerHTML = formatoDosDigitos(segundosRestantes);
}

function comenzar() {
    document.getElementById('comenzar').style.width = '0';
    segundos = tiempoTrabajo;

    var intervalo = setInterval(function () {
        segundos--;

        if (segundos < 0) {
            clearInterval(intervalo);

            if (esDescanso == false) {
                esDescanso = true;
                segundos = tiempoDescanso;

                trabajo.classList.add('luego');
                trabajo.classList.remove('ahora');
                descanso.classList.add('ahora');
                descanso.classList.remove('luego');
            } else {
                esDescanso = false;
                segundos = tiempoTrabajo;

                trabajo.classList.remove('luego');
                trabajo.classList.add('ahora');
                descanso.classList.remove('ahora');
                descanso.classList.add('luego');
            }

            setTimeout(comenzar, 1000); // Comienza el siguiente ciclo después de 1 segundo
        }

        actualizarTiempo();

        if (esDescanso == false) {
            negro -= 100 / (tiempoTrabajo);
        } else {
            morado += 100 / (tiempoDescanso);
        }

        body.style.background = `linear-gradient(45deg, rgba(4, 28, 50, 1)${negro}%, rgba(95, 30, 148, 1)${morado}%)`;
    }, 1000);
}
