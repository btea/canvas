class ImageDeal{
    constructor(){}

    urlToImage(url, fn){
        /**
         * @param url 需要转换的图片路径
         * @param fn 回调函数，将url转换成image对象后要做的操作，参数为转换的iamge对象 
         * */
        const image = new Image();
        image.onload = function(){
            fn(image);
        }
        image.src = url;
    }

    imageToCanvas(image){
        // 将image对象绘制到canvas上
        let cvs, ctx;
        cvs = document.createElement('canvas');
        ctx = cvs.getContext('2d');
        cvs.width = image.naturalWidth || image.width;
        cvs.height = image.naturalHeight || image.height;
        ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
        return cvs;
    }

    canvasResizetoFile(canvas, quality, fn){
        /** 
         * @param quality表示一个0-1的number类型，表示图片的压缩质量
        */
        canvas.toBlob(function(blob){
            fn(blob);
        }, 'image/jpeg', quality);
    }

    canvasResizetoDataURL(canvas, quality){
        /** 
         * @param canvas canvas对象
         * @param 0-1的number类型，表示图片压缩质量
        */
        return canvas.toDataURL('image/jpeg', quality);
    }

    fileToDataUrl(file, fn){
        /** 
         * 将File(Blob)类型文件转变为dataURL字符串
         * @param file 一个File(Blob)类型文件
         * @param fn 回调函数
         * */
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            fn(e.target.result);
        }
    }

    dataURLtoImage(url, fn){
        let img = new Image();
        img.src = url;
        img.onload = function(){
            fn(img);
        }
    }

    dataURLtoBlob(dataurl){
        /** 
         * 将一串dataurl字符串转变成blob对象
        */
        let arr, mime, bstr, n, u8arr;
        arr = dataurl.split(',');
        mime = arr[0].match(/:(.*?);/)[1];
        bstr = atob(arr[1]);
        n = bstr.length;
        u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([arr], {type: mime});
    }
}

export default ImageDeal;