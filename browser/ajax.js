function Ajax(options) {
    var xhr = null;
    var params = formsParams(options.data);
    // 第一步： 创建请求对象
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        // 兼容IE
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 第二步： 连接，执行open和send方法；
    if(options.type == 'GET') {
        xhr.open(options.type, options.url + '?' + params, options.async);
        xhr.send();
    } else if(options.type == 'POST') {
        xhr.open(options.type, options.url, options.async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
    // 绑定onreadystatechange事件
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            options.success(xhr.responseText);
        }
    }

    function formsParams(data) {
        var arr = [];
        for(var i in data) {
            arr.push(i + '=' + data[i]);
        }
        arr.join('&');
    }
}


// 使用方法
Ajax({
    type: 'GET',
    url: 'a.php',
    async: true,
    data: {
        name: 'zhangsan',
        age: 10
    },
    success: function(data) {
        console.log(data);
    }
});