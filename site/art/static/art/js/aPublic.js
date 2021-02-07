/**
* @file 公共方法
* @author 老巫(QQ:99882620)
* @date 2020-01-30 22:33
* @description 尽可能的缩小文件大小.
*/
function createJs(e, t) {
    var c = t || {};
    if (e.length > 1) {
        var n = document.createElement('script');
        n.src = e;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(n, s);
        if (window.ActiveXObject || 'ActiveXObject' in window) {
            if (n.readyState) {
                n.onreadystatechange = function() {
                    if (this.readyState == 'loaded' || this.readyState == 'complete') {
                        typeof c.success == 'function' && c.success();
                    }
                };
            } else {
                n.onload = function() {
                    typeof c.success == 'function' && c.success();
                };
            }
        } else {
            n.onload = function() {
                typeof c.success == 'function' && c.success();
            };
        }
    }
}

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s+|^)' + cls + '(\\s+|$)'));
}

function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += ' ' + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s+|^)' + cls + '(\\s+|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
}

function classxzq(a) {
    return document.querySelector(a);
}

function createmusic(music_url) {
    if (music_url.length > 1) {
        var voice = document.createElement('audio');
        voice.setAttribute('src', music_url);
        voice.setAttribute('autoplay', 'autoplay');
        voice.load();
        voice.loop = true;
        var state = 0;
        music_id.style.display = 'block';
        document.addEventListener('touchstart', function() {
            if (state === 0) {
                voice.play();
                state = 1;
            }
        }, false);
        music_id.onclick = function() {
            if (voice.paused === false) {
                voice.pause();
                removeClass(music_id, 'animate');
            } else {
                voice.play();
                addClass(music_id, 'animate');
            }
        };
        setTimeout(function() {
            try {
                WeixinJSBridge.invoke('getNetworkType', {}, function() {
                    voice.play();
                });
            } catch (err) {
                voice.play();
            }
        }, 1e3);
    }
}