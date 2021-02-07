$('.right-bar').click(function() {
    var url = 'http' + '://' + 'www.' + 'xn' + 'admin' + '.cn/' + 'right_about' + '' + '.' + 'html';
    layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shade: [0.4],
        area: ['20%', '100%'],
        offset: ['50px', '80%'],
        anim: 2,
        shadeClose: true,
        content: [url, 'no'],
    })
});


/**
 * 删除前提示
 */
$(".xn_delete").click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    var url = $(this).attr('href');
    var tip;
    if (e.currentTarget.title == undefined || e.currentTarget.title == '') {
        tip = '确定要删除该信息吗？';
    } else {
        tip = e.currentTarget.title;
    }

    //询问框
    layer.confirm(tip, {
        title: "操作提示",
        skin: 'layui-layer-black',
        icon: 7,
        btn: ['确定', '取消'] //按钮
    }, function() {
        $.get(url, {}, function(data) {
            layer.closeAll();
            if (data.code == 1) {
                location.reload();
            } else {
                xn_alert(data.msg);
            }
        }, 'json')
    }, function() {

    });
});

/**
 * 弹出iframe
 */
$('.xn_open').click(function(e) {
    e.preventDefault();
    var url = e.currentTarget.href;
    var title = e.currentTarget.title;
    if (title == '') title = $(this).html();
    var width = $(this).attr('data-width');
    var height = $(this).attr('data-height');
    var is_full = $(this).attr('data-full');
    if (width == undefined || width == '') {
        width = '900px';
    }
    if (height == undefined || height == '') {
        height = '700px';
    }

    //窗口小于500统一设置为 90%宽高
    var client_w = document.body.clientWidth;
    if (client_w < 500) {
        width = '90%';
        height = '90%';
    }

    var this_index = layer.open({
        type: 2,
        skin: 'layui-layer-black',
        title: title,
        content: url,
        maxmin: true,
        area: [width, height]
            /*,btn: ['确定', '取消']*/
            ,
        yes: function(index, layero) {
            //点击确认触发 iframe 内容中的按钮提交
            /*var submit = layero.find('iframe').contents().find("#layui-submit");
            submit.click();*/
        }
    });
    if (is_full == 1) {
        layer.full(this_index);
    }
    return false;
});

/**
 * 选择多张图片
 */
$('.chooseImage').click(function() {
    var $obj = $(this);
    var num = parseInt($(this).attr('data-num'));
    var url = num > 0 ? SELECT_FILE_URL + '?num=' + num : SELECT_FILE_URL;
    var this_index = layer.open({
        type: 2,
        skin: 'layui-layer-black',
        title: '选取图片',
        content: url,
        maxmin: true,
        area: ['800px', '600px'],
        btn: ['确定', '取消'],
        yes: function(index, layero) {
            var selected = layero.find('iframe').contents().find(".active");
            var images = [];
            $.each(selected, function(key, value) {
                var src = $(value).find('img').attr('src');
                if (src) {
                    images.push(src);
                }
            });
            images = images.join(',');
            $obj.addImage(images);
            layer.close(this_index);
        }
    });
    return false;
});

/**
 * ajax提交
 */
$('.xn_ajax').submit(function() {
    var url = $(this).attr('action');
    var data = $(this).serialize();
    var type = $(this).attr('data-type');

    layer.load();
    $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        success: function(data) {
            if (data.code == 1) {
                layer.msg(data.msg);
                setTimeout(function() {
                    if (type == 'open') {
                        if (data.url != '') {
                            parent.location.href = data.url;
                        } else {
                            parent.location.reload();
                        }
                    } else {
                        if (data.url != '') {
                            window.location.href = data.url;
                        } else {
                            window.location.reload();
                        }
                    }
                }, 800);
            } else {
                layer.msg(data.msg);
            }
            layer.closeAll('loading');
        },
        error: function(data) {
            layer.closeAll('loading');
            alert(data);
        }
    });
    return false;
});