import { timingSafeEqual } from "crypto";
import { relative } from "path";

export default class dragElement{
    constructor(object){
        this.element = object.element || null;
        this.container = document.createElement('div');
        this.containerParent = this.element.parentNode;
        this.points = []; // 保存所有拖拽的点
        this.isMove = false; // 状态，用来判断当前是否可以拉伸
        this.isBoxMove = false; // 状态，拖动整个盒子
        this.initLeft = void 0; // 保存开始元素开始拖动时的默认位置
        this.initTop = void 0; 
        this.initElement();
        this.boxMove();
    }
    initElement(){
        if(!this.element){return;}
        let w = this.getStyle(this.element, 'width');
        let h = this.getStyle(this.element, 'height');
        w = parseInt(w);
        h = parseInt(h);
        this.w = w;
        this.h = h;
        this.boxW = parseInt(this.getStyle(this.containerParent, 'width'));
        this.boxH = parseInt(this.getStyle(this.containerParent, 'height'));
        this.left = 300;
        this.top = 300;
        this.container.style = `width: ${w}px;height: ${h}px;position: absolute;left: 300px;top: 300px; cursor: move;z-index: 10;`;
        this.createPoints();
        
        this.container.appendChild(this.element.cloneNode(true)); // 克隆一个元素副本，不然替换的新元素包含原来被替换的旧元素会报错
        this.containerParent.replaceChild(this.container, this.element); // 替换原本标签

    }
    boxMove(){
        /** 
         * 拖动盒子元素绑定
        */
        // document.addEventListener('mouseup', () => {
        //     this.isBoxMove = false;
        // })
        this.container.addEventListener('mousedown', (e) => {
            this.isBoxMove = true;
            this.initLeft = parseInt(this.getStyle(this.container, 'left'));
            this.initTop = parseInt(this.getStyle(this.container, 'top'));
            this.offsetX = this.container.offsetLeft;
            this.offsetY = this.container.offsetTop;
            this.x = e.clientX;
            this.y = e.clientY;
            e.stopPropagation();
        });
        this.container.addEventListener('mouseup', (e) => {
            this.isBoxMove = false;
            e.stopPropagation();
        });
        this.container.addEventListener('mousemove', (e) => {
            e.stopPropagation();
            if(this.isBoxMove){
                let x = e.clientX, y = e.clientY, left, top;
                left = this.initLeft + x - this.x;
                top = this.initTop + y - this.y;

                // this.elementMove(left, top);
                // return;

                // 已经移动到最左边，禁止继续往左拖动
                if(!this.offsetX){
                    e.clientX <= this.x && (left = 0);
                }else{
                    if(e.clientX <= e.layerX){ return }
                }
                // 禁止往右边界继续拖拽
                if(this.offsetX === this.boxW - this.w){
                    if(e.clientX - this.offsetX >= e.layerX){ return }
                }else{
                    this.container.offsetLeft + this.w >= this.boxW && (left = this.boxW - this.w);
                }
            
                // 拖拽至顶部，禁止继续往顶部拖拽
                if(!this.offsetY){
                    e.clientY <= this.y && (top = 0);
                }else{
                    if(e.clientY <= e.layerY){ return };
                }
                // 禁止往超出盒子的底部部分继续拖拽
                if(this.offsetY === this.boxH - this.h){
                    if(e.clientY - this.offsetY >= e.layerY){ return }
                }else{
                    this.container.offsetTop + this.h >= this.boxH && (top = this.boxH - this.h);
                }

                this.elementMove(left, top);
                
            }
            
            
        })
    }
    elementMove(left, top){
        this.left = left;
        this.top = top;
        this.container.style.left = `${left}px`;
        this.container.style.top = `${top}px`;
    }
    createPoints(){
        let p_w = 10, color = '#6cf';
        let points = {
            // top: {
            //     cursor: 'crosshair'
            // },
            leftTop: {
                cursor: 'nw-resize',
                left: -p_w / 2,
                top: -p_w / 2,
                'margin-left': 0,
                'margin-top': 0
            },
            leftMid: {
                cursor: 'w-resize',
                left: -p_w / 2,
                top: '50%',
                'margin-left': 0,
                'margin-top': -p_w / 2
            },
            leftBottom: {
                cursor: 'sw-resize',
                left: -p_w / 2,
                top: '100%',
                'margin-left': 0,
                'margin-top': -p_w / 2
            },
            midTop: {
                cursor: 'n-resize',
                left: '50%',
                top: -p_w / 2,
                'margin-left': -p_w / 2,
                'margin-top': 0
            },
            midBottom: {
                cursor: 'n-resize',
                left: '50%',
                top: '100%',
                'margin-left': -p_w / 2,
                'margin-top': -p_w / 2
            },
            rightTop: {
                cursor: 'sw-resize',
                left: '100%',
                top: -p_w / 2,
                'margin-left': -p_w / 2,
                'margin-top': 0
            },
            rightMid: {
                cursor: 'w-resize',
                left: '100%',
                top: '50%',
                'margin-left': -p_w / 2,
                'margin-top': -p_w / 2
            },
            rightBottom: {
                cursor: 'nw-resize',
                left: '100%',
                top: '100%',
                'margin-left': -p_w / 2,
                'margin-top': -p_w / 2
            }
        };
        for(let point in points){
            let p = document.createElement('em'), text;
            text = `position: absolute;width: ${p_w}px; height: ${p_w}px; background: none; border: 1px solid ${color};`;
            for(let attr in points[point]){
                let v = points[point][attr], val;
                val = typeof v === 'number' ? v + 'px;' : `${v};`;
                text += `${attr}: ${val};`;
            }
            p.style.cssText = text;
            this.points.push(p);
            this.container.appendChild(p);
            this.bindEvent(p, point);
        }
        this.container.style.border = '1px solid rgba(102, 204, 255, .5)';
        document.addEventListener('mousemove', () => {
            this.isMove = false;
        });
        document.addEventListener('mousedown', () => {
            this.isMove = false;
        });
        document.addEventListener('mouseup', () => {
            this.isMove = false;
            this.w = parseInt(this.getStyle(this.container, 'width'));
        })
    }
    bindEvent(el, type){
        /**
         * @param el 需要绑定鼠标事件的元素
         * @param type 用来区分不同按钮，拖拽事件进行的不同操作处理
         */
        
        el.addEventListener('mousedown', (e) => {
            // e.stopImmediatePropagation();
            e.stopPropagation();
            this.isMove = true;
            this.mouseStartVal(e);
            
        });
        el.addEventListener('mouseup', (e) => {
            // e.stopImmediatePropagation();
            e.stopPropagation();
            this.isMove = false;
            this.w = parseInt(this.getStyle(this.container, 'width'));
        });
        el.addEventListener('mousemove', (e) => {
            // e.stopImmediatePropagation();
            e.stopPropagation();
            if(this.isMove){
                this.throttle(this.elementChange, 10)(type, e);
                // this.elementChange(type, e);
            }
        })
    }
    mouseStartVal(e){
        this.c_x  = e.clientX;
        this.c_y = e.clientY;
    }
    mouseEnd(obj){
        /**
         * @param obj  Object
         * @param obj.key 表示要设置的元素属性
         * @param obj.val 表示要设置的元素属性值
         */
        for(let key in obj){
            this.container.style[key] = obj[key];
        }
    }
    elementChange(...arg){
        /** 
         * @param arg包含鼠标移动取到的点数据（e）和当前操操作的点的类别
        */
        let type = arg[0];
        let e = arg[1];
        let w, h;
        // 往右边拉伸，left不变，宽度变化
        if(type === 'rightMid'){
            console.log('this.w', this.w);
            console.log('e.clientX', e.clientX);
            console.log('this.c_x', this.c_x);
            w = this.w + e.clientX - this.c_x;
            console.log('w', w);
            this.mouseEnd({width: `${w}px`});
        }
        // 往左侧拉伸，left变化，宽度也跟着变化
        if(type === 'leftMid'){

        }
        console.log(type);
        console.log(e);
    }
    
    throttle(fn, t){
        let time = 0;
        return (...arg) => {
            let now = +new Date();
            if(now - time > t){
                fn.call(this,...arg);
                time = now;
            }
        }
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
}