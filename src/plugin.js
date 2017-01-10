import "./style/plugin.scss";

import selectTemplate from  "./html/select.html";
import optionsTemplate from "./html/options.html";


let $select = $(selectTemplate);
let $options = $(optionsTemplate);


$.fn.jqSelect = function (options) {
    let $this = $(this);
    let defaults = {};
    let settings = $.extend({}, defaults, options);

    return new JqSelect($this, settings);
};

let JqSelect = function ($element, settings) {
    this.$element = $element;
    this.$parent = $element.parent();
    this.settings = settings;

    this.$select = $select.clone();
    this.$options = $options.clone();

    //save any global data or status
    this.data = {
        open: false
    };

    this._init();

    //test
    this._optionsOpen();
};

JqSelect.prototype = {
    _init: function () {
        let $this = this;
        this._selectInit();
        this._optionsInit();


        $(document).on({
            "mousedown": function () {
                $this._optionsClose();
            }
        });
    },

    _selectInit: function () {
        let $this = this;
        this.$element.addClass("jq-select-element-hide");
        this.$parent.append(this.$select);


        this.$select.on({
            "click": function () {
                $this._optionsToggle();
            },
            "mousedown": function (e) {
                e.stopPropagation();
            }
        });
    },


    _optionsInit: function () {
        $("body").append(this.$options);

        this.$options.on({
            "mousedown": function (e) {
                e.stopPropagation();
            }
        });
    },
    _optionsPosition: function () {
        let selectOffset = this.$select.offset();
        let selectWidth = this.$select.outerWidth();
        selectOffset.top += this.$select.outerHeight();

        this.$options.css({
            top: selectOffset.top + "px",
            left: selectOffset.left + "px",
            width: selectWidth + "px"
        });
    },
    _optionsOpen: function () {
        this.data.open = true;
        this._optionsPosition();


        this.$options.addClass("jq-options-open");

        //reset scroll when open options
        this.$options.find(".jq-options-container").scrollTop(0);
    },
    _optionsClose: function () {
        this.data.open = false;

        this.$options.removeClass("jq-options-open");
    },
    _optionsToggle: function () {
        if (this.data.open) {
            this._optionsClose();
        } else {
            this._optionsOpen();
        }
    }
};






