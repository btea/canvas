import fabric from 'fabric';
import * as list from './functionList';
class ImageEditor{
    constructor(el = '#map'){
        this.fabric = fabric.fabric;
        this.operatorStack = []; // 执行的操作记录
        this.undoStack = []; // 执行的回退记录
        this.box = document.querySelector(el);
        this.width = parseInt(this.getStyle(this.box, 'width'));
        this.height = parseInt(this.getStyle(this.box, 'height'));
        this.initEelment();
    }
    getStyle(el, attr, pseudo){
        /**
         * @params el(elementObject)   attr(string)  pseudo(string) 
         * @param el 需要获取样式的元素 
         * @param attr 需要获取值的
         * @param pseudo 需要获取样式的伪元素
         */
        if(window.getComputedStyle) return window.getComputedStyle(el, pseudo)[attr];
        return el.currentStyle[attr];
    }
    createEle(name){
        return document.createElement(name);
    }
    initEelment(){
        this.canvas = this.createEle('canvas');
        this.canvas.id = 'canvas';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.box.appendChild(this.canvas);
        this.instance = new fabric.fabric.Canvas('canvas',{
            selection: false,
            uniScaleTransform: true
        });

        const banner = document.createElement('div');
        banner.classList = 'banner head';
        // banner.style
    }
    undo(){
        /**撤销操作 */
        let n = this.operatorStack.length, ope;
        if(n){
            ope = this.operatorStack.pop();
            this.instance.remove(ope);
            this.undoStack.push(ope);
        }
    }
    next(){
        /**恢复撤销的操作 */
        let n = this.undoStack.length, ope;
        if(n){
            ope = this.undoStack.pop();
            this.instance.add(ope);
            this.operatorStack.push(ope);            
        }
    }
}
Object.assign(ImageEditor.prototype, list);
export default ImageEditor;
