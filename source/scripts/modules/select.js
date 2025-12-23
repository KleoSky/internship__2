const selects = document.querySelectorAll('.form__select');

const initSelectArrow = () => {
  for (const select of selects) {
    if (!select) {
      return;
    }

    select.addEventListener('mousedown', () => {
      if (select.options.length > 0 && select.options[0].value === '') {
        select.options[0].hidden = true;
      }
    });

    select.addEventListener('focus', () => {
      select.classList.remove('form__select--closed');
      select.classList.add('form__select--opened');
    });

    select.addEventListener('blur', () => {
      select.classList.remove('form__select--opened');
      select.classList.add('form__select--closed');

      if (select.options.length > 0 && select.options[0].value === '') {
        select.options[0].hidden = false;
      }
    });

    select.addEventListener('change', () => {
      select.classList.remove('form__select--opened');
      select.classList.add('form__select--closed');

      if (select.options.length > 0 && select.options[0].value === '') {
        select.options[0].hidden = false;
      }

      select.blur();
    });


    document.addEventListener('click', (e) => {
      if (!select.contains(e.target)) {
        select.classList.remove('form__select--opened');
        select.classList.add('form__select--closed');

        if (select.options.length > 0 && select.options[0].value === '') {
          select.options[0].hidden = false;
        }
      }
    });
  }
};

export { initSelectArrow };
