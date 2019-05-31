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
        this.boxW = parseInt(this.containerParent, 'width');
        this.boxH = parseInt(this.containerParent, 'height');
        this.left = 300;
        this.top = 300;
        this.container.style = `width: ${w}px;height: ${h}px;position: absolute;left: 300px;top: 300px; cursor: move;`;
        this.createPoints();
        
        this.container.appendChild(this.element.cloneNode(true)); // 克隆一个元素副本，不然替换的新元素包含原来被替换的旧元素会报错
        this.containerParent.replaceChild(this.container, this.element); // 替换原本标签

        // this.element.parentNode.removeChild(this.element);
        // this.element.parentNode.appendChild(this.container);

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
    }
    bindEvent(el, type){
        /**
         * @param el 需要绑定鼠标事件的元素
         * @param type 用来区分不同按钮，拖拽事件进行的不同操作处理
         */
        el.addEventListener('mousedown', () => {
            this.isMove = true;
        });
        el.addEventListener('mouseup', () => {
            this.isMove = false;
        });
        el.addEventListener('mousemove', (e) => {
            if(this.isMove){
                this.throttle(this.elementChange, 500)(type, e);
            }
        })
    }
    elementChange(arg){
        /** 
         * @param arg包含鼠标移动取到的点数据（e）和当前操操作的点的类别
        */
       console.log(arg);
    }
    boxMove(){
        /** 
         * 拖动盒子元素绑定
        */
        this.container.addEventListener('mousedown', (e) => {
            this.isBoxMove = true;
            this.initLeft = parseInt(this.getStyle(this.container, 'left'));
            this.initTop = parseInt(this.getStyle(this.container, 'top'));
        });
        this.container.addEventListener('mouseup', () => {
            this.isBoxMove = false;
        });
        this.container.addEventListener('mousemove', (e) => {
            let x = e.clientX, y = e.clientY, left, top;
            left = e.clientX - e.layerX;
            top = e.clientY - e.layerY;
            if(x <= e.layerX){
                left = 0;
            }
            if(y <= e.layerY){
                top = 0;
            }
            this.container.style.left = `${left}px;`;
            this.container.style.top = `${top}px;`;
            
        })
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