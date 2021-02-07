//layui.define(function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
layui.define('layer', function(exports) {

    var obj= {

        open: function(_url, title = undefined, width, height = '700px') { //弹出打开
            is_full = 0;
            if(width === 100) {
                is_full = 1;
                width = '90%';
            }else if (width == undefined || width == '') {
                width = '900px';
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
                content: _url,
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
        },
        /**
         * 表格重载
         * @param tableid
         * @constructor
         */
        CreateReload: function(tableid) {
            //执行重载
            layui.table.reload(tableid, {
                where: {}
            }, 'data');
        },
        post: function(_data, _close, _url) {

            var _load = layer.load(2);
            if (_url == undefined) _url = window.location.href;
            $.ajax({
                    url: _url,
                    type: 'POST',
                    dataType: 'json',
                    data: _data,
                })
                .done(function(_json) {
                    if (_json.code == 1) {
                        if (_close == 1) {
                            top.layer.msg(_json.msg, {
                                shift: -1,
                                time: 1000
                            });
                            parent.window.location.reload();
                        } else if (_close == 2) {
                            top.layer.msg(_json.msg, {
                                shift: -1,
                                time: 1000
                            });
                        } else {
                            layer.msg(_json.msg, {
                                shift: -1,
                                time: 1000
                            }, function() {
                                if (_json.url) {
                                    window.location.href = _json.url;
                                } else {
                                    tableIns.reload();
                                }
                            });
                        }
                    } else {
                        layer.alert(_json.msg, {
                            icon: 5
                        });
                    }
                })
                .fail(function() {
                    layer.msg('出问题了,请联系管理员');
                })
                .always(function() {
                    layer.close(_load);
                });
        }
    }

    //输出
    exports('app', obj);
});