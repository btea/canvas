
class Canvas{
    constructor(options){
        this.w = options.width || 600;
        this.h = options.height || 400;
        this.el = options.el;
        this.init();
        this.lists = [];
        this.style = {
            leftT: 'nw-resize',
            leftM: 'w-resize',
            leftB: 'sw-resize',
            midT: 'n-resize',
            midB: 'n-resize',
            rightT: 'ne-resize',
            rightM: 'e-resize',
            rightB: 'se-resize'
        };
    }
    init(){
        let canvas = document.createElement('canvas');
        canvas.width = this.w;
        canvas.height = this.h;
        canvas.style.border = '1px solid aqua';
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        if(this.el){
            this.el.appendChild(canvas);
        }else{
            document.body.appendChild(canvas);
        }
        this.eventBind();
        this.transfromFunction();
    }
    eventBind(){
        this.canvas.addEventListener('mousemove', (e) => {
            // console.log(e);
            this.isInImage(e);
            this.isInRect(e);
        });
        this.canvas.addEventListener('mousedown', (e) => {
            this.initLeft = e.offsetX;
            this.initTop = e.offsetY;
            this.isMove = true;
        });
        this.canvas.addEventListener('mouseup', () => {
            this.isMove = false;
            this.addImage = this.newImage;
        })
    }
    addImage(img){
        if(typeof img === 'string'){
            this.srcToImage(img);
        }
    }
    srcToImage(src){
        let img = new Image, w, h;
        img.crossOrigin = 'Aonymouns';
        img.src = src;
        img.onload = () => {
            let obj, left = 10, top = 10, c = '#6cf';
            w = img.naturalWidth || img.width;
            h = img.naturalHeight || img.height;
            obj = {
                type: 'image',
                w: w,
                h: h,
                left: left,
                top: top,
                c: c,
                image: img,
                $w: 12 
            };
            this.addImage = obj;
            this.drawImage(obj);
        };
        img.onerror = function(err){
            console.error('load image fail ', err);
        }
    }
    drawImage(options){
        let img = options.image;
        let {left, top, w, h, c} = options;
        this.ctx.drawImage(img, left, top);
        this.addBox({
            w: w,
            h: h,
            left: left,
            top: top,
            c: c
        })
    }
    isInImage(e){
        let x = e.offsetX, y = e.offsetY;
        let o = this.addImage;
        if(x >= o.left && x <= o.left + o.w && y >= o.top && y <= o.top + o.h){
            this.canvas.style.cursor = 'move';
        }else{
            this.canvas.style.cursor = 'default';
        }
        if(this.isMove){
            // this.clearImage(this.addImage);
            this.ctx.clearRect(0, 0, this.w, this.h);
            let left, top, obj;
            left = this.addImage.left + e.offsetX - this.initLeft;
            top = this.addImage.top + e.offsetY - this.initTop;
            obj = Object.assign({}, this.addImage);
            obj.left = left;
            obj.top = top;
            // this.addImage = obj;
            this.newImage = obj;
            this.drawImage(obj);
        }
    }
    isInRect(e){
        let x = e.offsetX,
        y = e.offsetY;

        this.allPoints.forEach(p => {
            if(x >= (p.left - p.w / 2) && x <= (p.left + p.w / 2) && y >= (p.top - p.h / 2) && y <= (p.top + p.h / 2)){
                this.canvas.style.cursor = p.style;
                if(this.isMove){
                    if(p.style === 'nw-resize'){
                        this.leftTopMove(e);
                    }
                    console.log(p);
                }
            }
        });
    }
    transfromFunction(){
        this.leftTopMove = (e) => {
            let x = e.offsetX - this.initLeft;
            let y = e.offsetY - this.initTop;
            let obj = this.addImage;
            obj.left += x;
            obj.top += y;
            obj.w -= x;
            obj.h -= y;
            this.drawImage(obj);
        };
        this.leftMidMove = () => {

        };
        this.leftBottomMove = () => {

        };
        this.midTopMove = () => {

        };
        this.midBottomMove = () => {

        };
        this.rightTopMove = () => {

        };
        this.rightMidMove = () => {

        };
        this.rightBottomMove = () => {

        };
    }
    clearImage(options){
        let left = options.left - options.$w / 2;
        let top = options.top - options.$w / 2;
        let w = left + options.w + options.$w / 2;
        let h = left + options.h + options.$w / 2;
        this.ctx.clearRect(left, top, w, h);
    }
    addBox(options){
        /** 
         * @params options object
         * w h c(color)
        */
        let $w = 12;
        let {w, h, c, left, top} = options;
        this.drawRect(options);

        // 左侧
        let $left = [
            {w: $w, h: $w, left: left - ($w / 2), top: top - $w / 2, c: c, style: this.style.leftT},
            {w: $w, h: $w, left: left - ($w / 2), top: top + h / 2 - $w / 2, c: c, style: this.style.leftM},
            {w: $w, h: $w, left: left - ($w / 2), top: top + h - $w / 2, c: c, style: this.style.leftB}
        ];
        // 中间部分
        let $mid = [
            {w: $w, h: $w, left: left + (w / 2) - $w / 2, top: top - $w / 2, c: c, style: this.style.midT},
            {w: $w, h: $w, left: left + (w / 2) - $w / 2, top: top + h - $w / 2, c: c, style: this.style.midB}
        ];
        // 右侧
        let $right = [
            {w: $w, h: $w, left: left + w - ($w / 2), top: top - $w / 2, c: c, style: this.style.rightT},
            {w: $w, h: $w, left: left + w - ($w / 2), top: top + h / 2 - $w / 2, c: c, style: this.style.rightM},
            {w: $w, h: $w, left: left + w - ($w / 2), top: top + h - $w / 2, c: c, style: this.style.rightB}
        ];
        this.allPoints = [...$left, ...$mid, ...$right];
        this.allPoints.forEach(item => { this.drawRect(item)});
    }
    drawRect(options){
        let {w, h, c, left, top} = options;
        this.ctx.beginPath();
        this.ctx.strokeStyle = c;
        this.ctx.rect(left - 0.5, top - 0.5, w, h);
        this.ctx.stroke();
    }
}

export default Canvas;