
let cuentas = [
    { nombre: "Mali", saldo: 200, password: "1234", dni: 44788834 },
    { nombre: "Gera", saldo: 150, password: "5678", dni: 10247439 },
    { nombre: "Sabi", saldo: 60, password: "9102", dni: 98005362 }
];

let cuentaActiva = null;

let alertTimeout = null;

window.alert = function(mensaje) {
    const toast = document.getElementById('cajero-alert-toast');
    const toastTitulo = document.getElementById('alert-toast-titulo');
    const toastMensaje = document.getElementById('alert-toast-mensaje');
    const toastIcono = document.getElementById('alert-toast-icono');

    if (toast && toastMensaje) {
        clearTimeout(alertTimeout);

        toastMensaje.innerText = mensaje;
        
        if (mensaje.includes("finalizada") || mensaje.includes("tarjeta")) {
            toastTitulo.innerText = "¡Muchas Gracias!";
            toastIcono.innerText = "✓";
            toast.classList.add('toast-exito');
        } else {
            toastTitulo.innerText = "Aviso del Sistema";
            toastIcono.innerText = "!";
            toast.classList.remove('toast-exito');
        }

        toast.classList.remove('oculto-toast');
        toast.classList.add('visible-toast');

        alertTimeout = setTimeout(() => {
            ocultarAlerta();
        }, 4500);
    } else {
        console.log("Alerta interna: " + mensaje);
    }
};

function ocultarAlerta() {
    const toast = document.getElementById('cajero-alert-toast');
    if (toast) {
        toast.classList.remove('visible-toast');
        toast.classList.add('oculto-toast');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const inputDniRef = document.getElementById('input-dni');
    const tarjetaNumeroRef = document.getElementById('tarjeta-numero-ref');

    if (inputDniRef && tarjetaNumeroRef) {
        inputDniRef.addEventListener('input', (e) => {
            let valor = e.target.value;
            
            if (valor.length === 0) {
                tarjetaNumeroRef.textContent = "•••• ••••";
                return;
            }

            if (valor.length > 4) {
                tarjetaNumeroRef.textContent = valor.slice(0, 4) + " " + valor.slice(4);
            } else {
                tarjetaNumeroRef.textContent = valor;
            }
        });
    }
});

const pantallaDni = document.getElementById('pantalla-dni');
const pantallaClave = document.getElementById('pantalla-clave');
const pantallaMenu = document.getElementById('pantalla-menu');
const pantallaSaldo = document.getElementById('pantalla-saldo');
const pantallaDepositar = document.getElementById('pantalla-depositar');
const pantallaRetirar = document.getElementById('pantalla-retirar');
const pantallaCarga = document.getElementById('pantalla-carga');
const pantallaExito = document.getElementById('pantalla-exito');

const inputDni = document.getElementById('input-dni');
const inputClave = document.getElementById('input-clave');
const inputMontoDeposito = document.getElementById('input-monto-deposito');
const inputMontoRetiro = document.getElementById('input-monto-retiro');
const zonaOtroMonto = document.getElementById('zona-otro-monto');

const btnDniSiguiente = document.getElementById('btn-dni-siguiente');
const btnClaveIngresar = document.getElementById('btn-clave-ingresar');
const btnRegresarMenu = document.getElementById('btn-regresar-menu');
const btnSacarTarjeta = document.getElementById('btn-sacar-tarjeta');

const btnMenuSaldo = document.getElementById('btn-menu-saldo');
const btnMenuDepositar = document.getElementById('btn-menu-depositar');
const btnMenuRetirar = document.getElementById('btn-menu-retirar');

const btnEjecutarDeposito = document.getElementById('btn-ejecutar-deposito');
const btnOtroMonto = document.getElementById('btn-otro-monto');
const btnEjecutarRetiroManual = document.getElementById('btn-ejecutar-retiro-manual');
const botonesRetiroRapido = document.querySelectorAll('.btn-rapido');

const saludoUsuario = document.getElementById('saludo-usuario');
const textoSaldoDisponible = document.getElementById('texto-saldo-disponible');
const textoCarga = document.getElementById('texto-carga');
const textoExito = document.getElementById('texto-exito');

btnDniSiguiente.addEventListener('click', verificarPasoDni);
btnClaveIngresar.addEventListener('click', verificarPasoClave);
btnRegresarMenu.addEventListener('click', regresarAlMenuPrincipal);
btnSacarTarjeta.addEventListener('click', cerrarSesionCajero);

btnMenuSaldo.addEventListener('click', mostrarPantallaSaldo);
btnMenuDepositar.addEventListener('click', mostrarPantallaDepositar);
btnMenuRetirar.addEventListener('click', mostrarPantallaRetirar);

btnEjecutarDeposito.addEventListener('click', ejecutarTransaccionDeposito);
btnOtroMonto.addEventListener('click', mostrarCampoOtroMonto);
btnEjecutarRetiroManual.addEventListener('click', ejecutarRetiroManual);

for (let i = 0; i < botonesRetiroRapido.length; i++) {
    botonesRetiroRapido[i].addEventListener('click', ejecutarRetiroRapido);
}

function limpiarPantallas() {
    pantallaDni.classList.add('oculto');
    pantallaClave.classList.add('oculto');
    pantallaMenu.classList.add('oculto');
    pantallaSaldo.classList.add('oculto');
    pantallaDepositar.classList.add('oculto');
    pantallaRetirar.classList.add('oculto');
    pantallaCarga.classList.add('oculto');
    pantallaExito.classList.add('oculto');
}

function verificarPasoDni() {
    const dniIngresado = parseInt(inputDni.value);

    if (isNaN(dniIngresado) || inputDni.value.length !== 8) {
        alert("El DNI debe tener exactamente 8 caracteres numéricos.");
        return;
    }

    let encontrado = null;
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].dni === dniIngresado) {
            encontrado = cuentas[i];
            break;
        }
    }

    if (encontrado) {
        cuentaActiva = encontrado;
        limpiarPantallas();
        pantallaClave.classList.remove('oculto');
        inputClave.focus();
    } else {
        alert("Número de DNI no registrado.");
    }
}

function verificarPasoClave() {
    const claveIngresada = inputClave.value;

    if (cuentaActiva.password === claveIngresada) {
        saludoUsuario.textContent = "Bienvenido, " + cuentaActiva.nombre + ".";
        limpiarPantallas();
        pantallaMenu.classList.remove('oculto');
    } else {
        alert("Contraseña incorrecta. Inténtalo de nuevo.");
        inputClave.value = "";
        inputClave.focus();
    }
}

function regresarAlMenuPrincipal() {
    btnRegresarMenu.classList.add('oculto');
    limpiarPantallas();
    pantallaMenu.classList.remove('oculto');
}

function cerrarSesionCajero() {
    cuentaActiva = null;
    inputDni.value = "";
    inputClave.value = "";
    
    const tarjetaNumeroRef = document.getElementById('tarjeta-numero-ref');
    if (tarjetaNumeroRef) tarjetaNumeroRef.textContent = "•••• ••••";

    btnRegresarMenu.classList.add('oculto');
    limpiarPantallas();
    pantallaDni.classList.remove('oculto');
    alert("Operación finalizada. No olvide retirar su tarjeta.");
}

function mostrarPantallaSaldo() {
    btnRegresarMenu.classList.remove('oculto');
    limpiarPantallas();
    textoSaldoDisponible.textContent = "S/ " + cuentaActiva.saldo.toFixed(2);
    pantallaSaldo.classList.remove('oculto');
}

function mostrarPantallaDepositar() {
    btnRegresarMenu.classList.remove('oculto');
    limpiarPantallas();
    inputMontoDeposito.value = "";
    pantallaDepositar.classList.remove('oculto');
    inputMontoDeposito.focus();
}

function mostrarPantallaRetirar() {
    btnRegresarMenu.classList.remove('oculto');
    limpiarPantallas();
    zonaOtroMonto.classList.add('oculto');
    inputMontoRetiro.value = "";
    pantallaRetirar.classList.remove('oculto');
}

function mostrarCampoOtroMonto() {
    zonaOtroMonto.classList.remove('oculto');
    inputMontoRetiro.focus();
}

function lanzarPantallasDeEfecto(mensajeCarga, mensajeExito) {
    btnRegresarMenu.classList.add('oculto');
    limpiarPantallas();
    
    textoCarga.textContent = mensajeCarga;
    pantallaCarga.classList.remove('oculto');

    setTimeout(function() {
        limpiarPantallas();
        textoExito.textContent = mensajeExito;
        pantallaExito.classList.remove('oculto');

        setTimeout(function() {
            regresarAlMenuPrincipal();
        }, 2000);

    }, 1800);
}

function ejecutarTransaccionDeposito() {
    const monto = parseFloat(inputMontoDeposito.value);

    if (isNaN(monto) || monto <= 0) {

alert("Por favor, introduce un monto válido.");
return;
}
cuentaActiva.saldo = cuentaActiva.saldo + monto;
lanzarPantallasDeEfecto("Procesando depósito...", "Depósito realizado con éxito.");
}
function ejecutarRetiroManual() {
const monto = parseFloat(inputMontoRetiro.value);
procesarValidacionYRetiro(monto);
}
function ejecutarRetiroRapido(event) {
const monto = parseFloat(event.target.value);
procesarValidacionYRetiro(monto);
}
function procesarValidacionYRetiro(monto) {
if (isNaN(monto) || monto <= 0) {
alert("Selecciona o ingresa un monto válido para el retiro.");
return;
}
if (cuentaActiva.saldo - monto < 0) {
alert("Operación rechazada: Fondos insuficientes. No puedes tener menos de S/ 0 en tu cuenta.");
return;
}
cuentaActiva.saldo = cuentaActiva.saldo - monto;
lanzarPantallasDeEfecto("Procesando retiro...", "Retiro realizado con éxito.");
}