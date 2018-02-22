'use strict';

(function feedBack() {
//создаю элементы формы
	var doc = document,
	form = doc.createElement('form'),
	title = doc.createElement('legend'),
	name = doc.createElement('input'),
	tel = doc.createElement('input'),
	mail = doc.createElement('input'),
	button = doc.createElement('input'),
	text = doc.createElement('textarea');
//интеграция в DOM
	document.body.appendChild(form);
	form.appendChild(title);
	title.innerHTML = 'Форма обратной связи';
	form.appendChild(name);
	form.appendChild(tel);
	form.appendChild(mail);
	form.appendChild(text);
	form.appendChild(button);
//атрибуты элементов
	name.id = 'name';
	name.setAttribute('type','text');
	name.setAttribute('placeholder','Имя');
	tel.id = 'tel';
	tel.setAttribute('type','tel');
	tel.setAttribute('placeholder','+7(000)000-0000');
	mail.id = 'mail';
	mail.setAttribute('type','mail');
	mail.setAttribute('placeholder','my-mail@mail.ru');
	button.setAttribute('type','button');
	button.setAttribute('value','Отправить');
	button.setAttribute('onclick','validation()');
})();

function validation() {
	var doc = document,
		valueName = doc.getElementById('name').value,
		valueTel = doc.getElementById('tel').value,
		valueMail = doc.getElementById('mail').value;
//RegExp для имени
	if (/^[a-zа-яё]{2,}$/i.test(valueName) == true) {
//для телефона
		if (/\+?\d{1,3}\(?\s?\d{3}\s?\)?\d{3}-?\s?\d{4}/.test(valueTel) == true) {
//для E-mail
			if (/(^\w+(|(\.|\-)\w+))(?=@[a-z]{2,}\.[a-z]{2,4}\b)/i.test(valueMail) == true) {
				alert('отправлено');
			} 
			else 
				doc.getElementById('mail').className = 'err';
		} 
		else 
			doc.getElementById('tel').className = 'err';
	} 
	else 
		doc.getElementById('name').className = 'err';
		
}

