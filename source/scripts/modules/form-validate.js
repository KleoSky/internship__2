const FIELDS = {
  'name-input': {
    pattern: /^[A-Za-zА-Яа-яЁё\s]+$/,
    errorMessage: 'Только буквы русского/английского языка и пробелы'
  },
  'tel-input': {
    pattern: /^\+7\d{10}$/,
    errorMessage: 'Только 10 цифр без пробелов (формат: +7XXX...)'
  }
};

const initFormValidation = () => {
  const forms = document.querySelectorAll('.form');

  const handleTelEvents = (input) => {
    input.addEventListener('input', handleTelInput);
    input.addEventListener('focus', handleTelFocus);
    input.addEventListener('blur', handleTelBlur);
  };

  for (const form of forms) {
    if (!form) {
      continue;
    }

    const telInputs = form.querySelectorAll('[id^="tel"]');
    telInputs.forEach(handleTelEvents);

    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      input.removeAttribute('pattern');
      input.addEventListener('input', () => validateField(input));
      input.addEventListener('blur', () => validateField(input));
    });

    const nameInput = form.querySelectorAll('.form__name-input');
    const telInput = form.querySelectorAll('.form__tel-input');

    nameInput.forEach((input) => {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[0-9]/g, '');
      })
    })

    telInput.forEach((input) => {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[a-zA-Za-яА-Я]/g, '');
      })
    })

    form.addEventListener('submit', handleFormSubmit);
  }
};

function handleTelFocus(e) {
  const input = e.target;
  if (input.value === '') {
    input.value = '+7';
  }
}

function handleTelBlur(e) {
  const input = e.target;
  if (input.value === '+7') {
    input.value = '';
  }
}

function handleTelInput(e) {
  const input = e.target;
  let value = input.value.replace(/\D/g, '');

  if (input.dataset.originalValue === '' && value.length > 0) {
    value = `+7${value}`;
    input.dataset.originalValue = 'edited';
  } else if (input.value.startsWith('+7') && value.length > 1) {
    value = `+7${value.substring(1)}`;
  } else if (!input.value.startsWith('+7') && value.length > 0) {
    value = `+7${value}`;
  }

  if (value.length > 0) {
    value = value.substring(0, 12);
  }

  input.value = value;
}

function validateWithPattern(input, errorElement, { pattern, errorMessage }) {
  if (input.value === '') {
    input.style.borderColor = '#ff5e66';
    input.style.backgroundColor = 'rgba(255, 94, 102, 0.2)';
    errorElement.textContent = '';
    return false;
  }
  const isValid = pattern.test(input.value);

  if (!isValid) {
    showError(input, errorElement, errorMessage);
    return false;
  } else {
    hideError(input, errorElement);
    return true;
  }
}

function validateField(input) {
  const fieldName = input.name;
  const errorElement = getErrorElement(input);

  if (FIELDS[fieldName]) {
    return validateWithPattern(input, errorElement, FIELDS[fieldName]);
  } else {
    return validateRequired(input);
  }

}

function validateRequired(input) {
  if (!input.value === '') {
    input.style.borderColor = '#ff5e66';
    input.style.backgroundColor = 'rgba(255, 94, 102, 0.2)';
    return false;
  } else {
    input.style.borderColor = '';
    input.style.backgroundColor = '';
    return true;
  }
}

function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.style.borderColor = '#ff5e66';
  input.style.backgroundColor = 'rgba(255, 94, 102, 0.2)';
}

function hideError(input, errorElement) {
  errorElement.textContent = '';
  input.style.borderColor = '';
  input.style.backgroundColor = '';
}

function getErrorElement(input) {
  if (input.type === 'checkbox') {
    return {
      textContent: '',
      style: {}
    };
  }
  let errorElement = input.nextElementSibling;

  if (!errorElement || !errorElement.classList.contains('error-message')) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#ff5e66';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '-17px';
    errorElement.style.marginBottom = '5px';
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }

  return errorElement;
}

function handleFormSubmit(e) {
  const form = e.target;
  let isFormValid = true;

  const inputs = form.querySelectorAll('input', 'select');
  inputs.forEach((input) => {
    const isValid = validateField(input);
    if (!isValid) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    e.preventDefault();
  }
}

export { initFormValidation };
