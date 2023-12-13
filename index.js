const colorCircle = document.querySelectorAll('.color-circle');
const body = document.querySelector('body');
const sizeSlider = document.querySelector('.size-slider');
const option = document.querySelectorAll('.options .option');
let penSize = 3;
let isDrawing;
let x,y;

// this is for changing brush and eraser
let selectTool = "brush";
var canvas = document.querySelector("canvas");
c = canvas.getContext("2d");

// this is used to adjust rhe height and width of canvas with respect to screen
// the media queries should be written along with this inorder to make it responsive
window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
});

// code for drawing
canvas.addEventListener("mousedown",(e)=>{
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener("mouseup",()=>{
    isDrawing = false;
    x = undefined;
    y = undefined;
})

c.fillStyle = "orange";
c.strokeStyle = c.fillStyle;
canvas.addEventListener('mousemove',(event)=>{
    draw(event.offsetX,event.offsetY);
})

function draw(x2,y2){
    if(isDrawing){
        c.fillStyle = selectTool==="eraser" ? "antiquewhite":c.fillStyle;
        c.beginPath();
        c.arc(x2,y2,penSize,0,Math.PI * 2);
        c.closePath();
        c.fill();
        // draw line
        drawLine(x,y,x2,y2);
    }
    x = x2;
    y = y2;
}


function drawLine(x1,y1,x2,y2){
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.strokeStyle = selectTool === "eraser" ? "antiquewhite":c.fillStyle;
    c.lineWidth = penSize * 2;
    c.stroke();
}

document.querySelector(".fa-refresh").addEventListener('click', () => {
    c.clearRect(0,0,canvas.width,canvas.height);
})

const selectColor = (elem)=>{
    removeActiveCircleColor();
    c.fillStyle = elem.getAttribute("data-color");
    elem.classList.add("active");
}

const removeActiveCircleColor = () => {
    colorCircle.forEach((circle)=>{
        circle.classList.remove("active");
    });
};

const removeactive = ()=>{
    option.forEach((elem)=>{
        elem.classList.remove("activeb");
    })
}

const changeactive=(elem)=>{
    removeactive();
    elem.classList.add("activeb");
    selectTool = elem.id;
    
}

const penSizeChange = (pensize) => {
    penSize = pensize;
}

const favColor = (elem) => {
    removeActiveCircleColor();
    c.fillStyle = elem.value;
};

document.querySelector("a").addEventListener('click',(event)=> event.target.href = canvas.toDataURL());

sizeSlider.addEventListener("change",()=> penSize=sizeSlider.value);