const colorCircle = document.querySelectorAll('.color-circle');
const sizeSlider = document.querySelector('.size-slider');
let penSize = 3;
let isDrawing;
let x, y;

let selectTool = "brush";
var canvas = document.querySelector("canvas");
c = canvas.getContext("2d");

// Retrieve the drawing data from local storage on page load
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const savedDrawing = localStorage.getItem("savedDrawing");
    if (savedDrawing) {
        const img = new Image();
        img.onload = function () {
            c.drawImage(img, 0, 0);
        };
        img.src = savedDrawing;
    }
});

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    x = undefined;
    y = undefined;

    // Save the drawing data to local storage
    saveDrawing();
});

canvas.addEventListener('mousemove', (event) => {
    draw(event.offsetX, event.offsetY);
});

function draw(x2, y2) {
    if (isDrawing) {
        c.fillStyle = selectTool === "eraser" ? "antiquewhite" : c.fillStyle;
        c.beginPath();
        c.arc(x2, y2, penSize, 0, Math.PI * 2);
        c.closePath();
        c.fill();
        drawLine(x, y, x2, y2);
    }
    x = x2;
    y = y2;
}

function drawLine(x1, y1, x2, y2) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = selectTool === "eraser" ? "antiquewhite" : c.fillStyle;
    c.lineWidth = penSize * 2;
    c.stroke();
}

document.querySelector(".fa-refresh").addEventListener('click', () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem("savedDrawing");
});

sizeSlider.addEventListener("change", () => penSize = sizeSlider.value);

function saveDrawing() {
    const dataURL = canvas.toDataURL();
    localStorage.setItem("savedDrawing", dataURL);
}
