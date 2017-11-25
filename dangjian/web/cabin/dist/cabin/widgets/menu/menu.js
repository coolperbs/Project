(function () {
    var _fn,kayak,
        OPTION = {
            menu: [
                {
                    name: '默认菜单',
                    router: '默认菜单路由',
                    icon: ''
                }
            ]
        };

    function CabinMenu(id, option) {
        this.menu = [];
        this.id = id;
        _fn.init.call(this, option);
    }

    CabinMenu.prototype = {
        updateDomState: function (dom) {
            var isParent = Number(dom.attr('isparent'));
            //todo 先把同级状态置空 如果是父节点则不清空
            var currentNode = dom;
            debugger
            if(isParent){
                currentNode.toggleClass('open');
            }else {
                this.setHash(dom.attr('href'));
            }
        },
        setHash:function (href) {
            //todo 改变window hash
            window.location.hash = href;
            var that=this;
           //setTimeout(function () {
           //    that.setMenuState();
           //},50)
        },
        getHash:function () {
            return kayak.router;
        },
        setMenuState:function () {
            debugger
            var that=this;
            var list= $('#'+this.id).find('.menu-ul').eq(0);
            //todo 区分iframe
            var currentHref='';
            if(kayak.router.requestParam.iframeUrl){
                currentHref=kayak.router.currentPath+':iframeUrl='+kayak.router.requestParam.iframeUrl;
            }else {
                currentHref=kayak.router.currentPath;
            }
            //快速判断 url存在 不存在则不改变状态
            var menuStr = JSON.stringify(this.menu);
            if (menuStr.indexOf(currentHref) < 0) {
                return
            }
            setTimeout(function () {
                _fn.setState.call(that,list,currentHref);
            },100)

        }
    };
    _fn = {
        init: function (option) {
            //整理option
            if (!this.id) {
                console.warn('请配置菜单挂入doom id');
                return
            }
            this.menu = option.menu ? option.menu : OPTION.menu;
            _fn.render.call(this);
        },
        render: function () {
            var html = '';
            var that = this;
            html = _fn.getHtml.call(this, this.menu, 1);
            html = '<div class="cabin-widgets-menu">' + html + '</div>';
            $('#' + this.id).html(html);
            _fn.bind.apply(this);
            that.setMenuState();
            $(window).unbind('hashchange');
            $(window).on('hashchange', function () {
                that.setMenuState();
            });
        },
        getHtml: function (menu,level) {
            //level 用来计算菜单深度
            var ulHtml = '';
            for (var i = 0; i < menu.length; i++) {
                var temMenu = menu[i];
                var icon = '';
                if (temMenu.children ? temMenu.children.length : -1 > 0) {
                    icon = level > 1 ? 'menu-icon-arrow' : temMenu.icon;
                    ulHtml += '<li class="menu-item parent" isparent="1"  data-level=' + level  +'>' +
                                    '<div class="menu-title menu-' + level + '" data-level=' + level  +'><i class="menu-icon ' + icon +'"></i>' +
                                        '<span class="menu-href">' + temMenu.name + '</span>'+
                                    '</div>'+
                                    _fn.getHtml(temMenu.children,level+1)+
                               '</li>';
                }else {
                    icon = level === 1 ? temMenu.icon : '';
                    ulHtml += '<li class="menu-item" isparent="0" href="' + temMenu.router + '">' +
                                    '<div class="menu-title menu-' + level + '" data-level=' + level  +'><i class="menu-icon ' + icon + '"></i>'+
                                        '<span class="menu-href">' + temMenu.name + '</span>'+
                                    '</div>'+
                               '</li>';
                }
            }
            ulHtml = '<ul class="menu-ul">' + ulHtml + '</ul>';
            return ulHtml
        },
        bind:function () {
            var that = this;
            $('#' + this.id).find('.menu-item').on('click', function (e) {
                e.stopPropagation();
                var dom = $(e.delegateTarget);
                that.updateDomState(dom)
            });
        },
        setState: function (list, url,callback) {			
            var children = $(list.children());
            for (var i = 0; i < children.length; i++) {
                var el = children[i];
                var li = $(el);
                var isParent = Number(li.attr('isparent'));
                var ul = li.children().eq(1);
                if (isParent) {
                    _fn.setState(ul, url, function () {
                        var shouldOpen = false;
                        var ulList = $(ul.children());
                        for (var k = 0; k < ulList.length; k++) {
                            var el=ulList[k];
                            shouldOpen=$(el).hasClass('active')||$(el).hasClass('open');
                            if(shouldOpen){
                                break
                            }
                        }
                        if (shouldOpen) {
                            li.addClass('open active');
                        } else {
                            li.removeClass('open active');
                        }
                    });
                } else {
                    var href = li.attr('href');
                    if (href == '#' + url) {
                        li.addClass('active');
                    } else {
                        li.removeClass('active');
                    }
                }
                if(i==children.length-1){
                   if(callback){
                       callback();
                   }
                }
            }
        }
    };
    $.fn.CabinMenu = function (option) {
        var id = this.prop('id');
        return new CabinMenu(id, option);
    };
    define('cabin/widgets/menu/menu', function (require, exports, module1) {
        kayak = require('kayak/core/kayak');
        require('cabin/widgets/menu/menu.css');
        module1.exports = function (id, option) {
            return new CabinMenu(id, option);
        }
    });
})();
