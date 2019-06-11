const SubPub = function() {
    // 用Object格式，可以通过value存储订阅者的一些信息
    // 订阅器 --- 类似于微信公众号这个平台，每一个元素类似于一个公众号，key值为公众号的名字，value值记录订阅公众号的人；
    this._observer = {};
}

SubPub.prototype = {
    // 订阅函数，需要提供我要订阅的公众号名称，以及自己的姓名
    subscribe: function(type, callback) {
        const self = this;
        if(Type(callback) !== 'function') return;
        if(!self._observer[type]) this._observer[type] = []
        this._observer[type].push(callback);
        return self;
    },
    // 发布函数，需要提供哪个公众号需要发布信息，以及发布的内容；
    publish: function() {
        const self = this;
        const type = Array.prototype.shift.call(arguments); // 因为arguments不是数组，是一种类数组类型，所以没有shift、slice这些方法
        //发布的内容
        const theme = Array.prototype.slice.call(arguments);
        const subs  = self._observer[type];
        if(!subs || !subs.length) return;

        subs.forEach(sub => {
            sub.apply(self, theme);
        });
        return this;
    },
    // 取消订阅，需要提供取消公众号的名字，和发起该取消操作的用户
    removeSub: function(type, callback) {
        const _subs = this._observer[type];
        if(!_subs || !_subs.length) return;
        _subs.map((item, index) => {
            if(item === callback) {
                _subs.splice(index, 1);
            }
        })
        
        return this;
    }
}

function Type(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

// 实例一个发布订阅器
let sp = new SubPub();
// 定义订阅者
const sub1 = function(data) {
    console.log('sub1' + data);
}

const sub2 = function(data) {
    console.log('sub2' + data);
}

const sub3 = function(data) {
    console.log('sub3' + data);
}
// 发起订阅操作
sp.subscribe('click', sub1);
sp.subscribe('input',sub1);
sp.subscribe('qqq',sub1);

sp.subscribe('click', sub2);

sp.subscribe('input', sub3);

// 开启发布
sp.publish('click', '第一次发布click事件');
sp.publish('input', '第一次发布input事件');

sp.removeSub('click', sub1).publish('click', '第二次发布click事件');