;(function (global, undefined) {

    var $ = global.jQuery,
        _ = global.Utils,
        // ---
        $body = $(global.document.body);



    var isDescriptor = function (target) {
        return target.nodeName === 'A' && target.getAttribute('data-include') !== 'false';
    }



    function PageFragmentLoader (containerNode) {
        this.$containerNode = $(containerNode);

        this.$navigationNode = $(_.tag('div', {
            className: 'pagefragmentloader-nav'
        }));

        this.$contentContainer = $(_.tag('div'));
        this.$backBtnContainer = $(_.tag('div', {
            className: 'pagefragmentloader-back',
            style: {
                display: 'none'
            }
        }));
        this.$backBtn = $(_.tag('button', {
            className: 'pagefragmentloader-backbtn btn',
            innerHTML: 'Zurück zur Übersicht'
        }));
    }

    PageFragmentLoader.prototype = {
        constructor: PageFragmentLoader,
        $navigationNode: null,
        $containerNode: null,

        cmdWidget: null,

        state: 0, // 0 => created, 1 => rendered, 2 => ready

        _handleNavClicks: function (event) {
            var targetNow = event.currentTarget,
                target = event.target;

            if (targetNow === this.$navigationNode[0] && isDescriptor(target)) {
                event.preventDefault();
                event.stopPropagation();

                this._hideNavi()._showBackBtn().load(target.href);
            }
        },

        _handleBtnClicks: function (event) {
            event.preventDefault();
            event.stopPropagation();

            this._showNavi()._hideBackBtn();
        },

        _handleCmd: function (event) {
            var targetNow = event.currentTarget,
                target = event.target;

            if (this.cmdWidget && targetNow === this.cmdWidget.el && isDescriptor(target)) {
                event.preventDefault();
                event.stopPropagation();

                this._hideNavi()._showBackBtn().load(target.href);
                this.cmdWidget._resetMenu();
            }
        },

        _showBackBtn: function () {
            if (this.state === 1) {
                this.state = 2;
                this.$backBtnContainer.css('display', 'block');
            }

            return this;
        },

        _hideBackBtn: function () {
            if (this.state === 2) {
                this.state = 1;
                this.$backBtnContainer.css('display', 'none');
                this.$contentContainer.empty();
            }

            return this;
        },

        _showNavi: function () {
            if (this.state === 2) {
                this.$navigationNode.css('display', 'block');
            }
            return this;
        },

        _hideNavi: function () {
            if (this.state === 1) {
                this.$navigationNode.css('display', 'none');
            }
            return this;
        },

        render: function () {
            var $childs;

            if (this.state === 0) {
                this.state = 1;

                $childs = this.$containerNode.children().detach();

                this.$backBtnContainer.append(this.$backBtn);
                this.$navigationNode.append($childs);

                this.$containerNode.append(this.$navigationNode);
                this.$containerNode.append(this.$backBtnContainer);
                this.$containerNode.append(this.$contentContainer);
            }

            return this;
        },

        startUp: function () {
            $body.on(
                _.eventType.CLICK,
                '.pagefragmentloader-nav',
                _.bind(this._handleNavClicks, this)
            );

            $body.on(
                _.eventType.CLICK,
                '.pagefragmentloader-backbtn',
                _.bind(this._handleBtnClicks, this)
            );
        },

        load: function (url) {
            if (_.isString(url)) {
                this.$contentContainer.load(url);
            }
        },

        command: function (widget) {
            var clnm = '.' + _.first(widget.el.className.split(/\s+/));

            $body.on(
                _.eventType.CLICK,
                clnm,
                _.bind(this._handleCmd, this)
            );

            this.cmdWidget = widget;
        }
    }


    global.PageFragmentLoader = PageFragmentLoader;

})(this, (void 0));