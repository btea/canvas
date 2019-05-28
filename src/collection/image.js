import imageDeal from './ImageDeal';

export const addImage = function(img, options){
    /**
     * @params img(element|string) options(object)
     * @param img可以直接是img标签元素，也可以为图片路径
     * @param options 添加的图片信息，位置、透明度等等
     */
    let init = {
        left: 50,
        top: 50,
        angle: 0,
        opacity: 1
    };
    if(this.width && this.height){
        let w, h;
        if(typeof img === 'string'){
            let i = document.createElement('img');
            i.onload = (e) => {
                w = i.naturalWidth || i.width;
                h = i.naturalHeight || i.height;
                init.left = (this.width - w) / 2;
                init.top = (this.height - h) / 2;
                this.maskImage(i, init);
            };
            i.src = img;
        }else{
            w = img.width;
            h = img.height;
            init.left = (this.width - w) / 2;
            init.top = (this.height - h) / 2;
            this.loadImage(img, init);
        }
    }
}
export const loadImage = function(ele, options){
    const image = new this.fabric.Image(ele, options);
    image.set('selectable', false);
    this.operatorStack.push(image);
    this.instance.add(image);
}

export const maskImage = function(ele, options){
    const image = new this.fabric.Image(ele, options);
    this.operatorStack.push(image);
    this.instance.add(image);
}

export const fileToImage = function(file){
    if(!this.imageDeal){
        this.imageDeal = new ImageDeal();
    }
    this.imageDeal.fileToDataUrl(file, (url) => {
        this.fabric.Image.fromURL(url, (img) => {
            this.operatorStack.push(img);
            this.instance.add(img);
        })
    })
}
