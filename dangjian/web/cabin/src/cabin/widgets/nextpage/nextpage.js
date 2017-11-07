/*同时满足 jq插件 和 全局插件*/
(function () {
    var template, _fn,
        OPTION = {
            pageSize: 30, //每页大小,
            currentPage: 1, //当前页
            totalCount: 0, //总条数
            callback: null, //点击回调
            container: null, //插入id
            pageRange: 9, //间隔多少个
            select: [30, 60, 100], //下拉选项
            showTotal:false,//显示同条数
            position: null //位置
        };

    function NextPage(id, option) {
        this.opt = null;
        this.id = id;
        this.spin = {
            head: 1,
            end: 9
        };
        this.init(option);
    }

    NextPage.prototype = {
        init: function (option) {
            if (!this.id) {
                console.warn('请设置分页id');
                return
            }
            if (typeof option.callback !== 'function') {
                console.warn('分页配置callback 不是一个方法');
                return
            }
            var container = $('#' + this.id);
            var DOM = $(template).clone();
            this.opt = {
                pageSize: option.pageSize ? option.pageSize : OPTION.pageSize,
                currentPage: option.currentPage ? option.currentPage : OPTION.currentPage,
                totalCount: option.totalCount ? option.totalCount : OPTION.totalCount,
                callback: option.callback ? option.callback : OPTION.callback,
                select: option.select ? option.select : OPTION.select,
                pageRange: option.pageRange ? option.pageRange : OPTION.pageRange,
                position: option.position ? option.position : OPTION.position,
                showTotal:option.showTotal?option.showTotal:OPTION.showTotal
            };
            container.html('');
            if (this.opt.position) {
                DOM.addClass(this.opt.position)
            }
            container.append(DOM);
            _fn.formatOptions.apply(this);
            _fn.updateSpin.apply(this);
            _fn.render.apply(this);
            _fn.bind.apply(this);
        },
        update: function (option) {
            for (k in option) {
                this.opt[k] = option[k];
            }
            _fn.formatOptions.apply(this);
            _fn.updateSpin.apply(this);
            _fn.render.apply(this);
        },
        next: function (e) {
            if ($(e.target).hasClass('disabled')) {
                return
            }
            var totalPage = Math.ceil(this.opt.totalCount / this.opt.pageSize);
            if (this.opt.currentPage + 1 > totalPage) {
                this.opt.currentPage = totalPage;
            } else {
                this.opt.currentPage += 1;
            }
            _fn.updateSpin.apply(this);
            _fn.render.apply(this, [true]);
        },
        prev: function (e) {
            if ($(e.target).hasClass('disabled')) {
                return
            }
            if (this.opt.currentPage - 1 < 1) {
                this.opt.currentPage = 1;
            } else {
                this.opt.currentPage -= 1;
            }
            _fn.updateSpin.apply(this);
            _fn.render.apply(this, [true]);
        }
    };
    _fn = {
        bind: function () {
            var container = $('#' + this.id);
            var pageContainer = container.find('.nextpage-pagelist');
            var input = container.find('.nextpage-input');
            var prev = container.find('.prev');
            var next = container.find('.next');
            var select = container.find('.nextpage-select-input');
            var chosen = container.find('.nextpage-select-chosen');
            var that = this;
            pageContainer.on('click', function (e) {
                e.stopPropagation();
                _fn.checkPage.apply(that, [e])
            });
            prev.on('click', function (e) {
                e.stopPropagation();
                that.prev(e)
            });
            next.on('click', function (e) {
                e.stopPropagation();
                that.next(e);
            });
            input.on('click', function (e) {
                e.stopPropagation();
            });
            input.on('keyup', function (e) {
                _fn.setCurrentPage.apply(that, [e])
            });
            select.on('click', function (e) {
                e.stopPropagation();
                _fn.showSelect.apply(that, [e]);
            });
            chosen.on('click', function (e) {
                e.stopPropagation();
                _fn.chosenCheck.apply(that, [e]);
            });
            $('body').on('click', function (e) {
                e.stopPropagation();
                _fn.hideSelect.apply(that, [e]);
            });
        },
        render: function (isCallback) {
            var container = $('#' + this.id
            );
            var pageContainer = container.find('.nextpage-pagelist');
            var select = container.find('.nextpage-select-input');
            var input = container.find('.nextpage-input');
            var prev = container.find('.prev');
            var next = container.find('.next');
            var chosen = container.find('.nextpage-select-chosen');
            var total = container.find('.total');
            var totalPage = Math.ceil(this.opt.totalCount / this.opt.pageSize);
            var pages = '';
            var chosens = '';
            var i = 1;
            if (totalPage > 10) {
                for (i = this.spin.head; i < this.spin.end + 1; i++) {
                    if (this.opt.currentPage === i) {
                        pages += '<li class="active" data-page="' + i + '">' + i + '</li>';
                    } else {
                        pages += '<li data-page="' + i + '">' + i + '</li>';
                    }
                }
                if (this.opt.currentPage < this.opt.pageRange) {
                    pages += '<li>...</li>';
                    pages += '<li data-page="' + totalPage + '">' + totalPage + '</li>';
                    pageContainer.html('');
                    pageContainer.html(pages);
                } else {
                    if (this.spin.end < totalPage) {
                        pages = '<li data-page="1">1</li></li><li data-page="' + i + '">...</li>' + pages;
                        pages += '<li>...</li>';
                        pages += '<li data-page="' + totalPage + '">' + totalPage + '</li>';
                        pageContainer.html('');
                        pageContainer.html(pages);
                    } else {
                        pages = '<li data-page="1">1</li></li><li>...</li>' + pages;
                        pageContainer.html('');
                        pageContainer.html(pages)
                    }
                }
            } else {
                for (i = 1; i <= totalPage; i++) {
                    if (this.opt.currentPage === i) {
                        pages += '<li class="active" data-page="' + i + '">' + i + '</li>';
                    } else {
                        pages += '<li data-page="' + i + '">' + i + '</li>';
                    }
                }
                pageContainer.html('');
                pageContainer.html(pages)
            }


            for (i = 0; i < this.opt.select.length; i++) {
                if (this.opt.pageSize === this.opt.select[i]) {
                    chosens += '<li class="active" data-size="' + this.opt.select[i] + '">' + this.opt.select[i] + '</li>';
                } else {
                    chosens += '<li data-size="' + this.opt.select[i] + '">' + this.opt.select[i] + '</li>';
                }

            }
            input.val(this.opt.currentPage);
            select.html(this.opt.pageSize);
            chosen.html(chosens);
            if(this.opt.showTotal){
                total.html('共'+this.opt.totalCount+'条');
            }
            prev.removeClass('disabled');
            next.removeClass('disabled');
            if (this.opt.currentPage === 1) {
                prev.addClass('disabled')
            }
            if (this.opt.currentPage === totalPage) {
                next.addClass('disabled')
            }
            if (isCallback) {
                this.opt.callback(JSON.parse(JSON.stringify(this.opt)));
            }
        },
        checkPage: function (e) {
            var li = $(e.target);
            var value = li.attr('data-page');
            if (!value) {
                return
            }
            value = Number(value);
            if (isNaN(value)) {
                value = 1
            }
            if (this.opt.currentPage === value) {
                return
            }
            this.opt.currentPage = value;
            _fn.updateSpin.apply(this);
            _fn.render.apply(this, [true]);
        },
        updateSpin: function () {
            var totalPage = Math.ceil(this.opt.totalCount / this.opt.pageSize);
            if (this.opt.currentPage > this.opt.pageRange - 1) {
                this.spin.head = this.opt.currentPage - 4;
                this.spin.end = this.opt.currentPage + 4;
                if (this.spin.end > totalPage) {
                    this.spin.end = totalPage;
                    this.spin.head = this.spin.end - 8;
                }
            } else {
                this.spin.head = 1;
                this.spin.end = 9
            }
        },
        setCurrentPage: function (e) {
            var totalPage = Math.ceil(this.opt.totalCount / this.opt.pageSize);
            var input = $(e.target);
            var value = input.val();
            if (!value) {
                return
            }
            value = Number(value);
            if (isNaN(value)) {
                value = 1
            }
            if (e.keyCode === 13) {
                if (value > totalPage) {
                    value = totalPage
                }
                this.opt.currentPage = value;
                _fn.updateSpin.apply(this);
                _fn.render.apply(this, [true]);
            }
        },
        showSelect: function (e) {
            var container = $('#' + this.id);
            var select = container.find('.nextpage-select-input');
            var chosen = container.find('.nextpage-select-chosen');
            var top = select.offset().top;
            var height = $(document).height();
            var border = height - top;
            chosen.removeClass('top bottom');
            if (border > 150) {
                chosen.addClass('bottom active')
            } else {
                chosen.addClass('top active')
            }
        },
        hideSelect: function (e) {
            var container = $('#' + this.id);
            var chosen = container.find('.nextpage-select-chosen');
            chosen.removeClass('active');
        },
        chosenCheck: function (e) {
            var li = $(e.target);
            var value = li.attr('data-size');
            if (!value) {
                return
            }
            value = Number(value);
            if (isNaN(value)) {
                value = this.opt.select[0];
            }
            if (this.opt.pageSize === value) {
                return
            }
            this.opt.pageSize = value;
            this.opt.currentPage = 1;
            _fn.updateSpin.apply(this);
            _fn.render.apply(this, [true]);
            _fn.hideSelect.apply(this);
        },
        formatOptions: function () {
            this.opt.pageSize = isNaN(Number(this.opt.pageSize)) ? OPTION.pageSize : Number(this.opt.pageSize);
            this.opt.currentPage = isNaN(Number(this.opt.currentPage)) ? OPTION.currentPage : Number(this.opt.currentPage);
            this.opt.totalCount = isNaN(Number(this.opt.totalCount)) ? OPTION.totalCount : Number(this.opt.totalCount);
            this.opt.pageRange = isNaN(Number(this.opt.pageRange)) ? OPTION.pageRange : Number(this.opt.pageRange);
            var that = this;
            $.each(this.opt.select, function (index, el) {
                if (isNaN(Number(el))) {
                    that.opt.select[index] = OPTION.select[index];
                } else {
                    that.opt.select[index] = Number(el)
                }
            })
        }
    };
    $.fn.NextPage = function (option) {
        var id = this.prop('id');
        return new NextPage(id, option);
    };
    define('cabin/widgets/nextpage/nextpage', function (require, exports, module1) {
        template = require('cabin/widgets/nextpage/nextpage.tpl');
        //require('cabin/widgets/nextpage/nextpage.css');
        module1.exports = function (id, option) {
            return new NextPage(id, option);
        }
    });
})();
