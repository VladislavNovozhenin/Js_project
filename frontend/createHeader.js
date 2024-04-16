// Создание header
export function createHeader() {
    const header = document.createElement('header')
    const logo = document.createElement('a')
    const form = document.createElement('form')
    const input = document.createElement('input')
    const container = document.createElement('div')

    header.classList.add('header')
    container.classList.add('header__container')
    logo.classList.add('header__logo')
    form.classList.add('header__form')
    input.classList.add('header__form-input')

    logo.textContent = 'skb.'
    input.placeholder = 'Введите запрос'

    form.append(input)
    container.append(logo, form)
    header.append(container)

    return header
  }
  