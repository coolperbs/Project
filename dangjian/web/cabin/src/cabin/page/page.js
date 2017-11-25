(function () {
    define('cabin/page/page', function (require) {
        var Layout = require('cabin/layout/layout'),
            template = require('lib/arttemplate3.0/template-native'),
            kDom = kayak.dom,
            _fn,
            //默认白名单方法
            whiteList = ['render', 'temps'];

        function PageClass(opt) {
            //opt key 依次拷贝
            _fn.filter.apply(this, [opt]);
        }

        PageClass.prototype = {
            enter: function () {
                var self = this;
                Layout.on('inited', function () {
                    var source = _fn.getSource.apply(self);
                    seajs.use(source, function () {
                        _fn.initDom.apply(self);
                        if (!self.inited) {
                            _fn.bind.apply(self);
                            self.inited = true;
                        }
                        self.show && self.show();
                    });
                });
            },
            exit: function () {
                var self = this;
                // 移除dom
                self.temps = {};
                if (self.jView) {
                    self.jView.kRemove();
                }
                self.hide && self.hide();
            },
            render: function (options) {

                if (!options ? options.data : null) {
                    return
                }
                var tempClass = options.class;
                var tempClass2 = options.tempclass ? options.tempclass : null;
                var data = options.data;
                var jView = this.jView;
                var temp = this.temps[tempClass];
                if (tempClass2) {
                    this.temps[tempClass2] = template.compile(jView.find('script.' + tempClass2).text());
                    temp = this.temps[tempClass2];
                } else {
                    this.temps[tempClass] = template.compile(jView.find('script.' + tempClass).text());
                    temp = this.temps[tempClass];
                }
                jView.find('div.' + tempClass).html(temp(data));
            },
            temps: {}
        };


        _fn = {
            initDom: function () {
                var opt = this;
                if (this.jView) {
                    this.jView.kInsert($('.' + opt.parentClass));
                    return;
                }

                // this.jView = this.opt.jView = kDom.get( opt.id );
                this.jView = kDom.get(opt.nodeClass);
                if (opt.parentClass) {
                    this.jView.kInsert($('.' + opt.parentClass));
                }
                // this.jView.kInsert( kayak.jBody );
                // this.jView.kInsert( $( '.' + opt.cont ) ); // 没有就插入body
            },
            getSource: function () {
                var key = ['tpl', 'css', 'source'],
                    opt = this,
                    i, v,
                    result = [];
                for (i = 0; v = key[i]; ++i) {
                    result = result.concat(_fn.parseSource(opt[v]) || []);
                }
                return result;
            },
            parseSource: function (source) {
                if (!source) {
                    return;
                }
                var result = [];
                if (typeof source == 'string') {
                    result.push(source);
                }
                if (Object.prototype.toString.apply(source) == '[object Array]') {
                    result = result.concat(source);
                }
                return result;
            },
            bind: function () {
                var opt = this,
                    key, e, selector;

                if (Object.prototype.toString.apply(opt.on) !== '[object Object]') {
                    return;
                }
                for (key in opt.on) {
                    selector = $.trim(key).split(' '); // 处理多空格情况
                    e = selector.shift();
                    opt.jView.on(e, selector.join(' '), opt.on[key]);
                }
            },
            filter: function (opt) {
                for (var i in opt) {
                    if (!(whiteList.indexOf(i) > -1)) {
                        //深度拷贝
                        //result[i] = typeof opt[i] === "object" ? _fn.filter(opt[i]) : obj[i];
                        //拷贝1层
                        var o = {};
                        o[i] = opt[i];
                        $.extend(this, o)
                    } else {
                        console.warn(i + '方法或属性为系统占有，请修改')
                    }
                }
            }
        }

        window.Page = function (opt) {
            return new PageClass(opt);
        };
        return function (opt) {
            return new PageClass(opt);
        };
    });

})();