layui.define(function(exports) {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        setter = layui.setter,
        view = layui.view,
        admin = layui.admin,
        table = layui.table,
        form = layui.form

    //公共业务的逻辑处理可以写在此处，切换任何页面都会执行
    //……
    , active = {
            add: function(othis) {
                var title = othis.attr('title') || othis.html();
                var url = othis.attr('data-url');
                var width = othis.attr('data-width');
                var height = othis.attr('data-height');
                var is_full = othis.attr('data-full');
                var shade = othis.attr('data-shade');
                if (width == undefined || width == '') {
                    width = '800px';
                }
                if (height == undefined || height == '') {
                    height = '600px';
                }
                if (shade == undefined || shade == '') {
                    shade = 0.3;
                } else {
                    shade = parseFloat(shade);
                }
                //窗口小于500统一设置为 90%宽高
                var client_w = document.body.clientWidth;
                if (client_w < parseInt(width)) {
                    width = '90%';
                    height = '90%';
                }
                var this_index = layer.open({
                    type: 2,
                    shade: shade,
                    skin: 'layui-layer-black',
                    title: title,
                    content: url,
                    maxmin: true,
                    area: [width, height],
                    success: function(layero, index) {

                    }
                });
                if (is_full == 1) {
                    layer.full(this_index);
                }
            },
            del: function(othis, obj) {
                // console.log(obj)
                var data = {};
                var id = othis.attr('data-id');
                if (id != undefined && id != '') {
                    data.id = id;
                } else {
                    var checkStatus = table.checkStatus(obj.config.id);
                    var obj = checkStatus.data;
                    if (obj.length === 0) {
                        return layer.msg('请选择数据');
                    }
                    var ids = [];
                    for (let i = 0; i < obj.length; i++) {
                        ids.push(obj[i].id);
                    }
                    data.id = ids;
                }

                var title = othis.attr('title');
                var url = othis.attr('data-url');
                if (title == undefined || title == '') {
                    tip = '确定要删除该信息吗？';
                } else {
                    tip = title;
                }

                //询问框
                layer.confirm(tip, {
                    title: "操作提示",
                    skin: 'layui-layer-black',
                    icon: 7,
                    btn: ['确定', '取消'] //按钮
                }, function() {
                    console.log(data)
                    $.get(url, data, function(res) {
                        layer.closeAll();
                        if (res.code == 1) {
                            layer.msg(res.msg, {
                                icon: 1
                            })
                            obj.del(); //动态移除
                            // setTimeout(function() {
                            //     // if (data.id.length > 1) {
                            //     //     table.reload('list'); // 刷新表格
                            //     //     // location.reload();// 刷新界面
                            //     // } else {
                            //         obj.del(); //动态移除
                            //     // }
                            // }, 800);
                        } else {
                            xn_alert(res.msg);
                        }
                    }, 'json')
                }, function() {

                });
            },
            edit: function(othis) {
                var id = othis.attr('data-id');
                var title = othis.attr('title');
                var url = othis.attr('data-url');
                if (id) {
                    url = url + '?id=' + id;
                }
                var skin = othis.attr('data-skin');
                if (title == '') title = othis.html();
                var width = othis.attr('data-width');
                var height = othis.attr('data-height');
                var is_full = othis.attr('data-full');
                var shade = othis.attr('data-shade');
                if (width == undefined || width == '') {
                    width = '800px';
                }
                if (height == undefined || height == '') {
                    height = '600px';
                }
                if (shade == undefined || shade == '') {
                    shade = 0.3;
                } else {
                    shade = parseFloat(shade);
                }
                if (skin == undefined || skin == '') {
                    skin = 'layui-layer-black';
                }
                //窗口小于500统一设置为 90%宽高
                var client_w = document.body.clientWidth;
                if (client_w < width) {
                    width = '90%';
                    height = '90%';
                }
                var this_index = layer.open({
                    type: 2,
                    shade: shade,
                    skin: skin,
                    title: title,
                    content: url,
                    maxmin: true,
                    area: [width, height],
                    success: function(layero, index) {

                    }
                });
                if (is_full == 1) {
                    layer.full(this_index);
                }
            },
            gmedit: function(othis) {
                var title = othis.attr('title');
                var url = othis.attr('data-url');
                if (title == '') title = othis.html();
                var width = othis.attr('data-width');
                var height = othis.attr('data-height');
                var is_full = othis.attr('data-full');
                var shade = othis.attr('data-shade');
                if (width == undefined || width == '') {
                    width = '800px';
                }
                if (height == undefined || height == '') {
                    height = '600px';
                }
                if (shade == undefined || shade == '') {
                    shade = 0.3;
                } else {
                    shade = parseFloat(shade);
                }
                //窗口小于500统一设置为 90%宽高
                var client_w = document.body.clientWidth;
                if (client_w < parseInt(width)) {
                    width = '90%';
                    height = '90%';
                }
                var this_index = layer.open({
                    type: 2,
                    shade: shade,
                    skin: 'layui-layer-red',
                    title: title,
                    content: url,
                    maxmin: true,
                    area: [width, height]
                        // ,btn: ['确定', '取消']
                        ,
                    yes: function(index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        /*var submit = layero.find('iframe').contents().find("#layui-submit");
                        submit.click();*/
                    },
                    success: function(layero, index) {

                    }
                });
                if (is_full == 1) {
                    layer.full(this_index);
                }
            },
            detail: function(othis) {
                var id = othis.attr('data-id');
                var title = othis.attr('title');
                var url = othis.attr('data-url');
                if (id) {
                    url = url + '?id=' + id;
                }
                if (title == '') title = othis.html();
                var width = othis.attr('data-width');
                var height = othis.attr('data-height');
                var is_full = othis.attr('data-full');
                if (width == undefined || width == '') {
                    width = '800px';
                }
                if (height == undefined || height == '') {
                    height = '600px';
                }
                //窗口小于500统一设置为 90%宽高
                var client_w = document.body.clientWidth;
                if (client_w < parseInt(width)) {
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
                        // ,btn: ['确定', '取消']
                        ,
                    yes: function(index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        /*var submit = layero.find('iframe').contents().find("#layui-submit");
                        submit.click();*/
                    },
                    success: function(layero, index) {

                    }
                });
                if (is_full == 1) {
                    layer.full(this_index);
                }
            },
            open: function(_url, title = undefined, width, height = '700px') { //弹出打开
                //console.log(othis.html())
                is_full = 0;
                if (width === 100) {
                    is_full = 1;
                    width = '90%';
                } else if (width == undefined || width == '') {
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
                                        if(typeof _close == 'function'){
                                            _close(_json);
                                        }else{
                                            layui.table.reload(_close, {
                                                where: {}
                                            }, 'data');
                                        }
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
        };
        //退出
    admin.events.logout = function() {
        //执行退出接口
        admin.req({
            url: '/login/logout',
            type: 'get',
            data: {},
            done: function(res) { //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行
                //清空本地记录的 token，并跳转到登入页
                // layui.data(setter.tableName, {
                //   key: setter.request.tokenName
                //   ,value: ''
                // });

                admin.exit(function() {

                    location.href = res.url;
                });
            }
        });
    };

    //对外暴露的接口
    exports('common', active);
});