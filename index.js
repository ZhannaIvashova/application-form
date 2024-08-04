$(document).ready(function() {
  $('select[name="document-type"]').change(checkDocumentType);
  $('input[name="checkbox-address"]').change(checkAddressRegistration);

  $('input[name="payment_method"]').change(function() {
    checkPaymentMethod.call(this);
  });

  $('.btn-click').click(function() {
    handlerButtons.call(this);
  })

  //Отправка формы с проверкой на документ, подтверждающий личность
  $('#registration-form').submit(function(evt) {
    evt.preventDefault();
    let isValid = true;

    // Проверка дат
    const dates = $('input[type="date"]');
    if (!isDateValid(dates)) {
      isValid = false;
      alert('Проверьте корректность дат/даты');
    }
  
    if ($('#identity').val() === '') {
        isValid = false;
        alert('Прикрепите документ, подтверждающий личность');
    }
  
    if (isValid) alert('Форма успешно отправлена');
  });
})

const checkDocumentType = () => {
  const selectedValue = $('select[name="document-type"]').val();
  if (selectedValue === '01') {
    $('.series span').removeClass('hidden');
    addRequiredFields($('.series'));
  } else {
    $('.series span').addClass('hidden');
    removeRequiredFields($('.series'));
  }
}

function checkAddressRegistration() {
  if ($('input[name="checkbox-address"]').prop('checked')) {
    $('.container-address-mail').addClass('hidden');
    removeRequiredFields($('.container-address-mail'));
  } else {
    $('.container-address-mail').removeClass('hidden');
    addRequiredFields($('.container-address-mail'));
  }
}

function checkPaymentMethod() {
  if ($(this).val() === 'post') {
    $('.account-details').addClass('hidden');
    $('.organization-number-post').removeClass('hidden');
    addRequiredFields($('.organization-number-post'));
    removeRequiredFields($('.account-details'));

  } else if ($(this).val() === 'bank') {
    $('.organization-number-post').addClass('hidden');
    $('.account-details').removeClass('hidden');
    addRequiredFields($('.account-details'));
    removeRequiredFields($('.organization-number-post'));
  }

}

function addRequiredFields(object) {
  const objectInputs = object.find('input, textarea');
  objectInputs.each(function(index, item) {
    if (item.name === 'branch-number' || item.name === 'apartment') {
      return
    } else {
      $(item).attr('required', 'required');
    }
  });
}

function removeRequiredFields(object) {
  const objectInputs = object.find('input, textarea');
  objectInputs.each(function(index, item) {
    $(item).removeAttr('required');
  });
}

//Валидация даты
function isDateValid(dates) {
  let isValid = true;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  dates.each(function(index, item) {
    const inputDate = new Date($(item).val());
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate > currentDate) {
      isValid = false;
      return false;
    }
  })
  return isValid
}

//Обработчик для кнопок
function handlerButtons() {
  if ($(this).hasClass('btn-clean-address')) $('#address-regist').val('')
  else if ($(this).hasClass('btn-clean-mail')) $('#address-mail').val('')
  else if ($(this).hasClass('file-upload-button')) $('#identity').click();
}
