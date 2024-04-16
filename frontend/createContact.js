import { deleteContactSvg } from "./svg.js";

//Функция создания блока с контактами в модальном окне
export function createContact() {
    const contact = document.createElement('div');
    const contactType = document.createElement('div');
    const contactName = document.createElement('button');
    const contactList = document.createElement('ul');
    const contactPhone = document.createElement('li');
    const contactVk = document.createElement('li');
    const contactFb = document.createElement('li');
    const contactEmail = document.createElement('li');
    const contactOther = document.createElement('li');
    const contactInput = document.createElement('input');
    const contactDelete = document.createElement('button');
    const contactDeleteTooltip = document.createElement('span');

    contact.classList.add('contact__content')
    contactType.classList.add('contact__type')
    contactName.classList.add('contact__name')
    contactList.classList.add('contact__list', 'list-reset')
    contactPhone.classList.add('contact__item')
    contactVk.classList.add('contact__item')
    contactFb.classList.add('contact__item')
    contactEmail.classList.add('contact__item')
    contactOther.classList.add('contact__item')
    contactInput.classList.add('contact__input')
    contactDelete.classList.add('contact__delete', 'btn-reset')
    contactDeleteTooltip.classList.add('contact__tooltip', 'site-tooltip','tooltip')

    contactName.textContent = 'Телефон'
    contactPhone.textContent = 'Телефон'
    contactVk.textContent = 'VK'
    contactFb.textContent = 'Facebook'
    contactEmail.textContent = 'Email'
    contactOther.textContent = 'Другое'
    contactInput.placeholder = 'Введите данные контакта'
    contactInput.type = 'text'
    contactDelete.innerHTML = `${deleteContactSvg()}`
    contactDeleteTooltip.textContent = 'Удалить контакт'

    contactDelete.addEventListener('click', function (e) {
        e.preventDefault();
        contact.remove();
        document.querySelector('.modal__add-btn').classList.remove('hidden');
        if (document.getElementsByClassName('contact__content').length < 1) {
           document.querySelector('.modal__contact').classList.remove('modal__contact--active') 
        }
    });

    contactName.addEventListener('click', function (e) {
        e.preventDefault();
        contactList.classList.toggle('contact__list--active');
        contactName.classList.toggle('contact__list--active');
    });

    contactType.addEventListener('mouseleave', function () {
        contactList.classList.remove('contact__list--active');
        contactName.classList.remove('contact__list--active');
    });

    function setType(kind) {
        kind.addEventListener('click', function () {
            contactName.textContent = kind.textContent;
            contactList.classList.remove('contact__list--active');
            contactName.classList.remove('contact__list--active');
        });
    }

    const typesArray = [contactEmail, contactFb, contactVk, contactPhone, contactOther];

    for (const type of typesArray) {
        setType(type);
    }

    contactDelete.append(contactDeleteTooltip)
    contactList.append(contactPhone, contactVk, contactFb, contactEmail, contactOther)
    contactType.append(contactName, contactList)
    contact.append(contactType, contactInput, contactDelete)

    return {
        contact,
        contactName,
        contactInput,
        contactDelete
    }
}