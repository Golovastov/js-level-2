(function ($) {
  $(function () {
    $('#citieName').on('input', function () {
      var citieNamePart = $(this).val();
      if (citieNamePart.length >= 3) {
        $('#citiesList option').remove();
        $.post('http://geoapi.spacenear.ru/api.php?method=getCities&limit=10', {patern: citieNamePart}, function (data) {
          var result = JSON.parse(data);
          for (var i = 0; i < result.length; i++) {
            $('<option>', {
              text: result[i].name
            }).appendTo('#citiesList');
          }
        });
      }
    })
  });
})(jQuery);


// Валидация формы

function validation() {
  var doc = document,
    valueName = doc.getElementById('name').value,
    valueTel = doc.getElementById('tel').value,
    valueMail = doc.getElementById('mail').value;
  //RegExp для имени
  if (/^[a-zа-яё]{2,}$/i.test(valueName) === true) {
    // для телефона
    if (/\+?\d{1,3}\(?\s?\d{3}\s?\)?\d{3}-?\s?\d{4}/.test(valueTel) === true) {
      // для E-mail
      if (/(^\w+(|(\.|\-)\w+))(?=@[a-z]{2,}\.[a-z]{2,4}\b)/i.test(valueMail) === true) {
        alert('отправлено');
      } else
        var mail = doc.getElementById('mail');
      mail.classList.add('err');
      mail.oninput = function () {
        mail.classList.remove('err');
      }
    } else
      var tel = doc.getElementById('tel');
    tel.classList.add('err');
    tel.oninput = function () {
      tel.classList.remove('err');
    }
  } else
    var name = doc.getElementById('name');
  name.classList.add('err');
  name.oninput = function () {
    name.classList.remove('err');
  }
}