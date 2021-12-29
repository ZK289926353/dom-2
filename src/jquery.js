window.$ = window.jQuery = function(selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            // 创建div
            elements = [createElement(selectorOrArrayOrTemplate)];
        } else {
            // 查找div
            elements = document.querySelectorAll(selectorOrArrayOrTemplate);
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate;
    }

    function createElement(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    // aip可以操作elements
    const api = Object.create(jQuery.prototype) //创建一个对象，这个对象的__proto__为括号里的东西
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })
    return api
}

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jquery: true,
    get(index) {
        return elements[index];
    },
    appendTo(node) {
        if (node instanceof Element) {
            this.each(e1 => node.appendChild(e1));
        } else if (node.jquery === true) {
            this.each(e1 => node.get(0).appendChild(e1));
        }
    },
    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children);
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i]);
            }
        } else if (children.jquery === true) {
            children.each(node => this.get(0).appendChild(node));
        }
    },
    find(selector) {
        let array = [];
        for (let i = 0; i < this.elements.length; i++) {
            array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)));
        }
        array.oldApi = this; //this就是旧api
        // 得到新的api对象，便于链式操作
        return jQuery(array)
    },
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i);
        }
        return this;
    },
    parent() {
        const array = [];
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1)
                array.push(node.parentNode)
        })
        return jQuery(array)
    },
    children() {
        const array = [];
        this.each((node) => {
            array.push(...node.children);
            // ===array.push(node.chilren[1],array.push(node.chilren[2])
        })
        return jQuery(array)
    },
    print() {
        console.log(this.elements);
    },
    // 闭包，函数访问外部变量
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className);
        }
        // 链式操作，返回一个api对象
        return this;
    },
    end() {
        return this.oldApi //this是新的api
    }
}