// indexDB使用
var request = window.indexedDB.open('testIndexDB', '5.0');
var db;

request.onerror = function(e) {
    console.log(e);
    console.log('数据库打开错误------');
}

request.onsuccess = function(e) {
    console.log('数据库打开成功过------');
    db = request.result;
    console.log(request.result);
    db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
}

request.onupgradeneeded = function (event) {
    db = event.target.result;
    var objectStore;
    if(!db.objectStoreNames.contains('person')) {
        objectStore = db.createObjectStore('person', {keyPath: 'id'});
    }
}

