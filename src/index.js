import Create from './template/html';
import ImageDeal from './collection/ImageDeal';

// const fabric = require('fabric').fabric;
// share type draw
// let canvas = new fabric.Canvas('canvas');
// let rect = new fabric.Rect({
//     left: 100,
//     top: 100,
//     fill: '#6cf',
//     width: 20,
//     height: 20,
//     angle: 45
// });
// let circle = new fabric.Circle({
//     radius: 20, fill: '#6cf', left: 150, top: 150
// });
// let triangle = new fabric.Triangle({
//     width: 20, height: 30, fill: 'aqua', left: 50, top: 50
// })
// canvas.add(rect, circle, triangle);

// let urls = [
//     'https://avatars0.githubusercontent.com/u/24516654?s=460&v=4'
// ];
// urls.forEach(src => {
//     fabric.Image.fromURL(src, function(oImg){
//         canvas.add(oImg);
//     });
// })

// let ele = new Create({tag: 'input', class: 'image', type: 'file'});
// ele.create();
// ele.ele.addEventListener('change', function(e){
//     const file = e.target.files[0];
//     const imageObj = new ImageDeal();
//     imageObj.fileToDataUrl(file, addUrl);

// });

// function addUrl(src){
//     fabric.Image.fromURL(src, function(oImg){
//         canvas.add(oImg);
//     });
// }
import imageEditor from './imageEditor';
let editor = new imageEditor();
console.log(editor);
editor.addText();
editor.addImage('https://avatars3.githubusercontent.com/u/26399528?s=180&v=4');
editor.addImage('https://avatars0.githubusercontent.com/u/24516654?s=460&v=4');
let undo = document.getElementsByClassName('undo')[0];
undo.addEventListener('click', () => {
    editor.undo();
});

let next = document.getElementsByClassName('next')[0];
next.addEventListener('click', () => {
    editor.next();
})


import dragElement from './template/drag';
new dragElement({
    element: document.getElementsByClassName('box')[0]
})

