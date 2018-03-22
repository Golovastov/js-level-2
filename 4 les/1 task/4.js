(function ($) {
	$(function () {
		$('.tab_header').on('click', 'li:not(.active)'/*все кроме*/, function () {
			$(this).addClass('active') 
			/* добавление класса 'active' ко всем елементам 'li' не имеющим его */
				.siblings().removeClass('active') 
			/* удаление класса 'active' у всех братьев элемента 'li' на которм событие 'click' */
				.closest('body').find('div') 
			/* поднимаемся по DOM до 'body' и ищем все 'div' в нем */
				.removeClass('active')
			/* удаление класса 'active' у всех 'div' */
				.eq($(this).index()).addClass('active'); 
			/* добавление класа 'active' по порядковому номеру элемента 'li' на котором событие 'click' */
		});
	});
})(jQuery);
