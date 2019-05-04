class CreateHtml{
    constructor(options){
        this.tag = options.tag || 'div';
        this.text = options.text || '';
        this.class = options.class || '';
        this.type = options.type || null;
    }
    create(){
        const ele = document.createElement(this.tag);
        this.text && (ele.text = this.text);
        ele.classList = this.class;
        ele.type = this.type;
        this.ele = ele;
        document.body.appendChild(ele);
    }
}
export default CreateHtml