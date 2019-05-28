const addRect = function(options){
    let init = {
        width: 10,
        height: 20,
        left: 100,
        top: 100,
        fill: 'aqua',
        angle: 45
    };
    const rect = new this.fabric.Rect(Object.assign(init, options));
    this.operatorStack.push(rect); //  保存操作，可执行撤销
    this.instance.add(rect);
}
export default addRect;