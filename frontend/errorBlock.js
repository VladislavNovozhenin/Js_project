//Функция добавления ошибки с сервера
export function errorMassage(value) {
    const errorBlock = document.querySelector('.modal__content-down')
    const error = document.createElement('p')
    
    error.classList.add('error-massage')
    error. innerHTML = 'Ошибка HTTP: ' + value
    
    errorBlock.prepend(error)
}

export function errorNet() {
    document.body.innerHTML = ''
    const errorBlock = document.createElement('div')
    const errorDesr = document.createElement('p')
    const errorBtn = document.createElement('button')

    errorBlock.classList.add('error-block')
    errorDesr.classList.add('error-descr')
    errorBtn.classList.add('error-btn')

    errorDesr. innerHTML = 'Что-то пошло не так...'
    errorBtn.textContent = 'Обновить страницу'

    errorBtn.addEventListener('click', function() {
        window.location.reload();
    })

    errorBlock.append(errorDesr, errorBtn)
    document.body.append(errorBlock)
}