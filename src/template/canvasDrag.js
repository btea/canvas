
class Canvas{
    constructor(options){
        this.w = options.width || 600;
        this.h = options.height || 400;
        this.el = options.el;
        this.init();
        this.lists = [];
    }
    init(){
        let canvas = document.createElement('canvas');
        canvas.width = this.w;
        canvas.height = this.h;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        if(this.el){
            this.el.appendChild(canvas);
        }else{
            document.body.appendChild(canvas);
        }
        this.eventBind();
    }
    eventBind(){
        this.canvas.addEventListener('mousemove', (e) => {
            // console.log(e);
            this.isInImage(e);
        });
        this.canvas.addEventListener('mousedown', () => {
            this.isMove = true;
        });
        this.canvas.addEventListener('mouseup', () => {
            this.isMove = false;
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
            this.ctx.drawImage(img, left, top);
            this.addBox({
                w: w,
                h: h,
                left: left,
                top: top,
                c: c
            })
        };
        img.onerror = function(err){
            console.error('load image fail ', err);
        }
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
            // let l = o.left, top
        }
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
        this.drawRect({
            w: $w, h: $w, left: left - ($w / 2), top: top - $w / 2, c: c
        });
        this.drawRect({
            w: $w, h: $w, left: left - ($w / 2), top: top + h / 2 - $w / 2, c: c
        });
        this.drawRect({
            w: $w, h: $w, left: left - ($w / 2), top: top + h - $w / 2, c: c
        });

        // 中间部分
        this.drawRect({
            w: $w, h: $w, left: left + (w / 2) - $w / 2, top: top - $w / 2, c: c
        });
        this.drawRect({
            w: $w, h: $w, left: left - (w / 2) - $w / 2, top: top + h - $w / 2, c: c
        });

        // 右侧
        this.drawRect({
            w: $w, h: $w, left: left + w - ($w / 2), top: top - $w / 2, c: c
        });
        this.drawRect({
            w: $w, h: $w, left: left + w - ($w / 2), top: top + h / 2 - $w / 2, c: c
        });
        this.drawRect({
            w: $w, h: $w, left: left + w - ($w / 2), top: top + h - $w / 2, c: c
        });
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