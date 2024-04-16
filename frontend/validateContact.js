
//Функция валидации контактов
export function validateClientContact( contactInput) {
    let result = true;
    const error  = document.querySelector('.error');
    
    function showErrorMessage(message, input) {
        error.textContent = message;
        input.style.borderColor = 'red';
        error.style.display = 'block'
    };

    if (!contactInput.value) {
        showErrorMessage('Заполните все поля контактов!', contactInput);
        result = false;
    }
    return result
}