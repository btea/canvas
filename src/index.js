const fabric = require('fabric').fabric;
// let canvas = document.getElementById('canvas');
let canvas = new fabric.Canvas('canvas');
let rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: '#6cf',
    width: 20,
    height: 20,
    angle: 45
});
let circle = new fabric.Circle({
    radius: 20, fill: '#6cf', left: 150, top: 150
});
let triangle = new fabric.Triangle({
    width: 20, height: 30, fill: 'aqua', left: 50, top: 50
})
canvas.add(rect, circle, triangle);

let urls = [
    // 'https://www.kkkk1000.com/images/bg.jpg',
    'https://avatars0.githubusercontent.com/u/24516654?s=460&v=4'
];
urls.forEach(src => {
    fabric.Image.fromURL(src, function(oImg){
        canvas.add(oImg);
    });
})

