'use strict';

// Модуль каталога
var catalog = (function($) {

    // Инициализация модуля
    function init() {
        _render();
    }

    // Рендерим каталог
    function _render() {
        var template = _.template($('#catalog-template').html()),
            $goods = $('#featured_items_slider_1');

        $.getJSON('https://raw.githubusercontent.com/Golovastov/js-level-2/master/kursovoj_proekt/app/response/futuredItems.json', function(data) {
            $goods.html(template({goods: data}));
        });
    }


    // Экспортируем наружу
    return {
        init: init
    }
    
})(jQuery);
