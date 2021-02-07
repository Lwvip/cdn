// 客服弹窗
$(document).ready(function () {
    var _height = $(window).height();
    var _url = $("#kfjs").attr("src");

    // 获取地址上qq号码与电话号码参数
    function getparam(urlStr, paras) {
        var url = urlStr || "0";
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        var i;
        var j;
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof(returnValue) === "undefined") {
            return "";
        } else {
            return returnValue;
        }
    }

    var _qqhm = getparam(_url, 'qqhm'); // qq号码
    var regSS2 = new RegExp("[*]", "gi");
    var _qqlj = getparam(_url, 'qqlj').replace(regSS2, "&"); // qq号码
    var _dhhm = getparam(_url, 'dhhm'); // 电话号码
    var _isdl = getparam(_url, 'isdl'); // 是否是代理
    var _tpurl = getparam(_url, 'tpurl') || "https://cdn.jsdelivr.net/gh/Lwvip/cdn";
    var _agenturl = getparam(_url, 'agenturl').replace(regSS2, "&") || "http://www.masuyun.com";
    var _ywbdurl = getparam(_url, 'ywbdurl').replace(regSS2, "&") || "http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=LBUVHhweFRQVHmxdXQJPQ0E";
    // 插入dom信息
    $("body").append('<div id="kf" style="position: fixed;right: 10%;top: 20%;border:1px #365092 solid;background:#fff url('+_tpurl+'/img/icon_kf.png) no-repeat center 14px;width:37px;height:122px;box-shadow:0 0 18px 0 rgba(0,0,0,.08);cursor:pointer;z-index:999;"><div class="kf-touch" style="display:block;width:12px;margin:0 auto;margin-top:42px;color:#365092;font-size:14px;line-height:18px">联系我们</div><div class="c-wrap" style="display:none;width:300px;height:525px;position:absolute;left:-297px;top:-1px"><div class="kf-contact" style="display:none;width:235px;padding:0 24px;border:1px #e5e5e5 solid;box-shadow:0 0 15px 0 rgba(0,0,0,.15);background-color:#fff"><div class="qqhm" style="padding:10px 0;background:url('+_tpurl+'/img/icon_qq.png) no-repeat left 20px"><a target="_blank" href="' + _qqlj + '" style="display:block;padding-left:35px;color:#333;font-size:14px;text-decoration:none;text-align:left;white-space:nowrap"><span style="display:block">在线客服（9:00-22:30）</span><strong style="display:block;margin-top:10px;line-height:1;color:#ff8300;font-size:16px;font-family:Arial">' + _qqhm + '</strong></a></div><div class="dhhm" style="padding:10px 0;border-bottom:1px solid #eee;border-top:1px solid #eee;background:url('+_tpurl+'/img/icon_call.png) no-repeat left 20px"><a href="javascript:;" style="display:block;padding-left:35px;color:#333;font-size:14px;text-decoration:none;text-align:left;white-space:nowrap"><span style="display:block">服务热线（工作日9:00-17:30）</span><strong style="display:block;margin-top:10px;line-height:1;color:#ff8300;font-size:16px;font-family:Arial">' + _dhhm + '</strong></a></div><div class="kf-item kf-wd" style="padding:10px 0;background:url('+_tpurl+'/img/icon_wt.png) no-repeat left 20px"><a  target="_blank" href="'+_ywbdurl+'" style="display:block;padding-left:35px;color:#333;font-size:14px;text-decoration:none;text-align:left;white-space:nowrap"><span style="display:block">有问必答</span><span style="display:block;margin-top:10px;line-height:1;color:#999">咨询与意见反馈</span></a></div></div><div class="kf-contact kf-msg" style="display:none;width:235px;height:180px;margin-top:5px;padding:0 24px;border:1px #e5e5e5 solid;box-shadow:0 0 15px 0 rgba(0,0,0,.15);background:#fff url('+_tpurl+'/img/icon_kf_on.png) no-repeat 23px 26px;padding-left:60px;text-align:left"><h4 style="margin-top:18px;margin-bottom:18px;color:#ff7200;font-size:15px;line-height:1">您的专属客户经理</h4><p style="margin-bottom:14px;color:#333;font-size:14px;line-height:1">昵称：<span class="nickname">加载中...</span></p><p style="margin-bottom:14px;color:#333;font-size:14px;line-height:1">QQ&nbsp;：<span class="k-qq">加载中...</span></p><p style="margin-bottom:14px;color:#333;font-size:14px;line-height:1">电话：<span class="k-call">加载中...</span></p><a target="_blank" href="javascript:;" style="width:85%;height:30px;display:block;background-color:#ff7200;color:#fff;font-size:14px;text-decoration:none;line-height:30px;text-align:center">在线咨询</a></div><div class="isdaili" style="display:none;width: 235px; margin-top: 5px; padding: 13px; border: 1px solid rgb(229, 229, 229); box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 15px 0px; background: rgb(255, 255, 255); text-align: left; display: block;"><a target="_blank" href="'+_agenturl+'" style="width:100%;height:36px;display:block;background-color:#ff7200;color:#fff;font-size:14px;text-decoration:none;line-height:36px;text-align:center">申请代理</a></div></div></div><div class="ttop" style="display:none;background:#000 url('+_tpurl+'/img/icon_top.png) no-repeat center;opacity:.2;width:39px;height:37px;position:fixed;right:0;left:50%;margin-left:502px;top:321px;cursor:pointer;"></div>')
    !_qqhm && $(".qqhm").remove();
    !_dhhm && $(".dhhm").remove();
    // 鼠标显示隐藏
    $("#kf").click(function () {
        // 获取客户经理信息
        if(_isdl > 0) {
	    let data = {"code":"1","sjhm":"","qqhm":"992029892","xm":"sncdma"}
            $(".nickname").text(data.xm)
            $(".k-qq").text(data.qqhm)
            $(".k-call").text(data.sjhm)
            $(".kf-msg a").attr("href", "http://wpa.qq.com/msgrd?v=3&uin=" + data.qqhm + "&site=qq&menu=yes");
            $(".kf-contact,.c-wrap").show();	    
	    $(".isdaili").hide();
        } else {
            $(".kf-contact,.c-wrap").show();
            $(".kf-msg").hide();
	    $(".isdaili").show();
        }
    }).mouseleave(function(event) {
        $(".kf-contact,.c-wrap").hide();
    });
    var _dom = $(".ttop");
    // 监听页面滚动隐藏按钮
    $(window).scroll(function() {
        if($(window).scrollTop() > _height) {
            _dom.fadeIn();
        } else {
            _dom.fadeOut();
        }
    });
    // 返回顶部
    _dom.click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
    });
})
