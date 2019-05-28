const addText = function(text = 'this is text!', options){
    /** 
     * @params options
     * fontFamily
     * fontSize (number)
     * fontWeight (string 'bold'/'normal' | number 100/200/400/600...)
     * underline (boolen) 下划线
     * linethroguh (boolean) 删除线
     * overline (boolean)  上划线
     * shadow （string）
     * fontStyle （string 'italic'/'normal'）
     * stroke (string colot)
     * strokeWidth (number)
     * textAlign (string 'left'/'center'/'right')
     * lineHeight (number)
     * textBackGroundColor (string color)
     * 
    */
    let obj = Object.assign({
        fontFamily: 'Comic Sans',
        fontSize: 20,
        fontWeight: 500
    }, options);
    const textBox = new this.fabric.Text(text, obj);
    const editText = new this.fabric.IText(text, Object.assign(obj,{left: 50, top: 100})); // 添加的文本内容可编辑
    editText.set('selectable', false);
    this.operatorStack.push(textBox, editText);
    this.instance.add(textBox, editText);
};

export default addText;