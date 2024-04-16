
//Функция валидации
export function validation() {

    function removeError(input) {
        if (input.classList.contains('error-input')) {
            input.classList.remove('error-input');
            error.style.display = 'none'
            error.textContent = ''
            input.style.removeProperty('border-color')
        }
    }

    function createError(input, name) {
        input.classList.add('error-input');
        input.style.borderColor = 'red';
        error.style.display = 'block'
        error.textContent = name;
    }

    let result = true;
    const regexp = /[^а-яА-ЯёЁ]+$/g
    const inputSurname = document.querySelector('.modal__input-surname')
    const inputName = document.querySelector('.modal__input-name')
    const inputLastname = document.querySelector('.modal__input-lastname')
    const error = document.querySelector('.error')

    const checkRequiredName = (input, name) => {
        removeError(input,)
        if (!input.value) {

            createError(input, name)
            return false;
        }
        return true;
    };

    const checkByRegexp = (input, regexp, name) => {
        removeError(input)
        if (regexp.test(input.value)) {
            createError(input, name)
            return false;
        }
        return true;
    };

    if (!checkRequiredName(inputSurname, 'Вы не ввели данные!')) { result = false }
    if (!checkRequiredName(inputName, 'Вы не ввели данные!')) { result = false }
    if (!checkRequiredName(inputLastname, 'Вы не ввели данные!')) { result = false }
    if (result === true) {
        if (!checkByRegexp(inputSurname, regexp, 'Недопустимые символы!')) { result = false };
        if (!checkByRegexp(inputName, regexp, 'Недопустимые символы!')) { result = false };
        if (!checkByRegexp(inputLastname, regexp, 'Недопустимые символы!')) { result = false };
    }

    return result
}






