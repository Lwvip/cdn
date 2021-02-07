layui.define(['jquery', 'element', 'carousel', 'laypage', 'layer'], function (exports) {
    var $ = layui.jquery,
        element = layui.element,
        carousel = layui.carousel,
        laypage = layui.laypage,
        layer = layui.layer;

    //轮播渲染
    carousel.render({
        elem: '#banner',
        width: '100%',
        height: '700px',
        arrow: 'always'
    });

    //滚动监听
    $(window).scroll(function () {
        var scr = $(document).scrollTop();
        scr > 0 ? $(".nav").addClass('scroll') : $(".nav").removeClass('scroll');
    });

    //轮播文字
    $(function () {
        $('.banner').children('.title').addClass('active');

        var thisId = window.location.hash;
        switch (thisId) {
            case '#jieshao':
                $(".jieshao").addClass('layui-this');
                break;
            case '#liangdian':
                $(".liangdian").addClass('layui-this');
                break;
            case '#contact':
                $(".contact").addClass('layui-this');
                break;
            case '#index':
                $(".index").addClass('layui-this');
                break;
            default:
                $(".index").addClass('layui-this');
                break;
        }
        if (thisId == "#honor") { //判断对象是否存在
            var pos = mao.offset().top;
            $("html,body").animate({
                scrollTop: pos
            }, 3000);
        }
    });

    //导航切换
    var btn = $('.nav').find('.nav-list').children('button'),
        spa = btn.children('span'),
        ul = $('.nav').find('.nav-list').children('.layui-nav');
    btn.on('click', function () {
        if (!$(spa[0]).hasClass('spa1')) {
            spa[0].className = 'spa1';
            spa[1].style.display = 'none';
            spa[2].className = 'spa3';
            $('.nav')[0].style.height = 90 + ul[0].offsetHeight + 'px';
        } else {
            spa[0].className = '';
            spa[1].style.display = 'block';
            spa[2].className = '';
            $('.nav')[0].style.height = 80 + 'px';
        }
    });

    //关于内容
    $('.main-about').find('.aboutab').children('li').each(function (index) {
        $(this).on('click', function () {
            $(this).addClass('layui-this').siblings().removeClass('layui-this');
            $('.aboutab').siblings().fadeOut("fast");
            $('.aboutab').siblings().eq(index).fadeIn("");
        });
    });

    //动态分页
    laypage.render({
        elem: 'newsPage',
        count: 50,
        theme: '#2db5a3',
        layout: ['page', 'next']
    });

    //案例分页
    laypage.render({
        elem: 'casePage',
        count: 50,
        theme: '#2db5a3',
        layout: ['page', 'next']
    });

    //新闻字段截取
    $(function () {
        $(".main-news").find(".content").each(function () {
            var span = $(this).find(".detail").children("span"),
                spanTxt = span.html();
            if (document.body.clientWidth > 463) {
                span.html(spanTxt);
            } else {
                span.html(span.html().substring(0, 42) + '...')
            };
            $(window).resize(function () {
                if (document.body.clientWidth > 463) {
                    span.html(spanTxt);
                } else {
                    span.html(span.html().substring(0, 42) + '...')
                };
            });
        });
    });


    $(function () {
        $('.changj span').click(function () {
            //var index = $(this).index();
            var changjact = $(this).attr('data-act');
            //$('#index').val(index);
            $('#changjact').html(changjact);
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('.changj span').eq(1).trigger('click');
        // $('.pay-box button').click(function () {
        //   layer.prompt({title: '留个昵称吧',value:'匿名', formType: 3}, function(name, t){
        //     layer.close(t);
        //     var index = $('#index').val();
        //     var url = '/index/pay/qrcode?index='+index+'&name='+name;
        //     $.post(url,{index:index},function (data) {
        //       layer.open({
        //         type: 2
        //         ,title: '打赏'
        //         ,content: url
        //         ,maxmin: true
        //         ,area: ['400px', '400px']
        //       });
        //     })
        //   });
        // })
    });

    exports('firm', {});
});