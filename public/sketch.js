let font;
let fontsize = 40;
let circleSize = 120;
let circleX_R = 100;
let circleY_R = 160;
let circleX_A = 100;
let circleY_A = 300;
let circleX_V = 100;
let circleY_V = 440;
let rojoOver = false;
let amarilloOver = false;
let verdeOver = false;
let rojoOn = false;
let amarilloOn = false;
let verdeOn = false;
let socket, local;
let estatusRojo, estatusAmarillo, estatusVerde;

function preload() {
    font = loadFont('assets/Roboto-Bold.ttf');
}

function setup() {
    createCanvas(600, 600);
    rojo = false;
    amarillo = false;
    verde = false;
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    socket = io.connect('http://localhost:3000');
    socket.on('local', selectorLocal);
    socket.on('estatusRojo', selectorRojo);
    socket.on('estatusAmarillo', selectorAmarillo);
    socket.on('estatusVerde', selectorVerde);
    local = 0;
}

function draw() {
    update();
    background("#3B83BD");
    fill(255);
    text("Semáforo", 300, 40);
    if (local == 1) {
        text("Control Local", 400, 200);
    } else {
        text("Control Remoto", 400, 200);
    }
    draw_semaforo();
}

function draw_semaforo() {
    strokeWeight(6);
    // Botón Semáforo Lámpara Roja
    if (rojoOn) {
        fill(255, 0, 0);
    } else {
        fill(127, 0, 0);
    }
    ellipse(100, 160, 120);
    // Botón Semáforo Lámpara Amarilla
    if (amarilloOn) {
        fill(255, 255, 0);
    } else {
        fill(127, 127, 0);
    }
    ellipse(100, 300, 120);
    // Botón Semáforo Lámpara Verde
    if (verdeOn) {
        fill(0, 255, 0);
    } else {
        fill(0, 127, 0);
    }
    ellipse(100, 440, 120);
}

// Funciones de Recepción de datos desde Servidor (selector)
function selectorLocal(data) {
    local = data;
}

function selectorRojo(data) {
    rojoOn = !!parseInt(data, 2);
}

function selectorAmarillo(data) {
    amarilloOn = !!parseInt(data, 2);
}

function selectorVerde(data) {
    verdeOn = !!parseInt(data, 2);
}

function update() {
    // Selección Rojo
    if (overCircle(circleX_R, circleY_R, circleSize)) {
        rojoOver = true;
        amarilloOver = false;
        verdeOver = false;
    }
    // Selección Amarillo
    else if (overCircle(circleX_A, circleY_A, circleSize)) {
        rojoOver = false;
        amarilloOver = true;
        verdeOver = false;
    }
    // Selección Verde
    else if (overCircle(circleX_V, circleY_V, circleSize)) {
        rojoOver = false;
        amarilloOver = false;
        verdeOver = true;
    }
    // Condición excepción
    else {
        rojoOver = false;
        amarilloOver = false;
        verdeOver = false;
    }
}

function mousePressed() {
    console.log("click");
    if (local == 0) {
        if (rojoOver) {
            rojoOn = !rojoOn;
            socket.emit("rojo", rojoOn);
        }
        if (amarilloOver) {
            amarilloOn = !amarilloOn;
            socket.emit("amarillo", amarilloOn);
        }
        if (verdeOver) {
            verdeOn = !verdeOn;
            socket.emit("verde", verdeOn);
        }
    }
}

function overCircle(x, y, diameter) {
    let disX = x - mouseX;
    let disY = y - mouseY;
    if (Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2)) < diameter / 2) {
        return true;
    } else {
        return false;
    }
}