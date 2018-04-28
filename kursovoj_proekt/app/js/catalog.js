'use strict';

// Модуль каталога
var catalog = (function($) {
 
    // Инициализация модуля
    function init() {
        _render();
    }
 
    // Рендер каталога
    function _render() {
        var template = _.template($('#catalog-template').html()),
            $goods = $('#goods');
 
        //$.getJSON('https://raw.githubusercontent.com/Golovastov/js-level-2/master/kursovoj_proekt/app/response/futuredItems.json', function(data) {
            $.getJSON('response/futuredItems.json', function(data) {    
            $goods.html(template({goods: data}));
        });
    }

    // Экспорт наружу
    return {
        init: init
    }
     
})(jQuery);