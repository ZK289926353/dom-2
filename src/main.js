const div = dom.create("<div id='div3'>newDiv</div>");
console.log(div);

// dom.after(test, div);
// dom.wrap(div, test);

const nodes = dom.empty(empty);
console.log(nodes);

dom.attr(test, 'title', 'Hi,I\'m Frank');
const title = dom.attr(test, 'title');
console.log(`title:${title}`);

dom.text(test, '你好，这是新的内容');

dom.style(test, { border: '1px solid red', color: 'blue' });
console.log(dom.style(test, 'border'));
dom.style(test, 'border', '1px solid black');

dom.class.add(test, 'red');
dom.class.add(test, 'blue');
dom.class.remove(test, 'red');
console.log(dom.class.has(test, 'red'));

const fn = () => { console.log('点击了'); }
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0];
console.log(testDiv);
const div1 = dom.find('.red', testDiv);
console.log(div1);

console.log(dom.parent(testDiv));

const e2 = dom.find('#e2')[0]
console.log(dom.siblings(e2));
console.log(dom.next(e2));
console.log(dom.previous(e2));

const t = dom.find('#travel')[0];
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'));

console.log(dom.index(t2));