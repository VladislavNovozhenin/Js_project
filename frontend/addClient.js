import { closeModalSvg, spinerSvg } from "./svg.js";
import { createContact } from "./createContact.js";
import { serverAddClient } from "./clientApi.js";
import { validation } from "./validate.js";
import { validateClientContact } from "./validateContact.js";
import { renderClient } from "./renderCllient.js";
import { errorNet } from "./errorBlock.js";

//Функция создания модального окна добавления клиента
export function addClient() {
    const modal = document.createElement('div')
    const modalForm = document.createElement('form')
    const modalContentUp = document.createElement('div')
    const modalSubtitle = document.createElement('h2')
    const modalCloseBtn = document.createElement('button')
    const modalFormContent = document.createElement('div')
    const modalInputSurname = document.createElement('input')
    const modalInputContentSurname = document.createElement('span')
    const modalInputName = document.createElement('input')
    const modalInputContentName = document.createElement('span')
    const modalInputLastname = document.createElement('input')
    const modalInputContentLastname = document.createElement('span')
    const modalContact = document.createElement('div')
    const modalAddBtn = document.createElement('button')
    const modalContentDown = document.createElement('div')
    const modalSaveBtn = document.createElement('button')
    const modalCancelBtn = document.createElement('button')
    const errorBlock = document.createElement('p')
    const svgSpiner = document.createElement('span')

    modal.classList.add('modal')
    modalForm.classList.add('modal__form')
    modalContentUp.classList.add('modal__content-up')
    modalSubtitle.classList.add('modal__subtitle')
    modalCloseBtn.classList.add('modal__close-btn', 'btn-reset')
    modalFormContent.classList.add('modal__form-content')
    modalInputSurname.classList.add('modal__input', 'modal__input-surname')
    modalInputContentSurname.classList.add('modal__input-content-surname')
    modalInputName.classList.add('modal__input', 'modal__input-name')
    modalInputContentName.classList.add('modal__input-content-name')
    modalInputLastname.classList.add('modal__input', 'modal__input-lastname')
    modalInputContentLastname.classList.add('modal__input-content-lastname')
    modalContact.classList.add('modal__contact', 'contact')
    modalAddBtn.classList.add('modal__add-btn', 'btn-reset')
    errorBlock.classList.add('error')
    modalContentDown.classList.add('modal__content-down')
    modalSaveBtn.classList.add('modal__save-btn', 'btn-reset')
    modalCancelBtn.classList.add('modal__cancel-btn', 'btn-reset')
    svgSpiner.classList.add('modal-spiner')

    modalInputSurname.type = 'text'
    modalInputSurname.placeholder = ' '
    modalInputContentSurname.innerHTML = `Фамилия<span class = 'modal__input-content-img'>*</span`
    modalInputName.type = 'text'
    modalInputName.placeholder = ' '
    modalInputContentName.innerHTML = `Имя<span class = 'modal__input-content-img'>*</span`
    modalInputLastname.type = 'text'
    modalInputLastname.placeholder = ' '
    modalInputContentLastname.textContent = 'Отчество'
    modalSubtitle.textContent = 'Новый клиент'
    modalAddBtn.innerHTML = `Добавить контакт`
    modalAddBtn.type = 'button'
    modalCloseBtn.innerHTML = `${closeModalSvg()}`
    modalCloseBtn.type = 'button'
    modalSaveBtn.textContent = 'Сохранить'
    modalSaveBtn.type = 'submit'
    modalCancelBtn.textContent = 'Отмена'
    modalCancelBtn.type = 'button'
    svgSpiner.innerHTML = spinerSvg()

    modalAddBtn.addEventListener('click', function (e) {
        e.preventDefault()
        modalContact.classList.add('modal__contact--active');
        let contactsItems = document.getElementsByClassName('contact__content')
        if (contactsItems.length < 9) {
            const contactItem = createContact()
            modalContact.prepend(contactItem.contact)
            if (contactsItems.length >= 5) {
                modalForm.style.top = '70%'
            }
        } else {
            console.log(contactsItems.length)
            const contactItem = createContact()
            modalContact.prepend(contactItem.contact)
            modalAddBtn.classList.add('hidden')
        }
    })

    modalCloseBtn.addEventListener('click', function () {
        modal.remove()
    })

    modalSaveBtn.addEventListener('click', async function (e) {
        e.preventDefault()
        if (validation() == true) {
                const contactTypes = document.querySelectorAll('.contact__name');
                const contactValues = document.querySelectorAll('.contact__input');
                let contacts = []

                for (let i = 0; i < contactTypes.length; i++) {
                    if (!validateClientContact(contactValues[i])) {
                        return;
                    }
                    contacts.push({
                        type: contactTypes[i].innerHTML,
                        value: contactValues[i].value,
                    });
                }
                let clientObj = {
                    name: modalInputName.value,
                    surname: modalInputSurname.value,
                    lastName: modalInputLastname.value,
                    contacts: contacts,
                }

                const spinner = document.querySelector('.modal-spiner');
                try {
                    spinner.style.display = 'block';
                    await serverAddClient(clientObj)
                    setTimeout(function () {
                        document.querySelector('.tbody').innerHTML = ''
                        renderClient()
                        modal.remove();
                    }, 500);
                } catch (error) {
                    errorNet()
                } finally {
                    setTimeout(() => spinner.style.display = 'none', 500);
                }

            }
    })

    modalCancelBtn.addEventListener('click', function () {
        modal.remove()
    })

    document.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.remove()
        }
    })

    modalContentUp.append(modalSubtitle, modalCloseBtn)
    modalFormContent.append(modalInputSurname, modalInputContentSurname, modalInputName, modalInputContentName, modalInputLastname, modalInputContentLastname)
    modalSaveBtn.append(svgSpiner)
    modalContact.append(modalAddBtn)
    modalContentDown.append(modalSaveBtn, modalCancelBtn)
    modalForm.append(modalContentUp, modalFormContent, modalContact, errorBlock, modalContentDown)
    modal.append(modalForm)

    return {
        modal,
        modalSubtitle,
        modalForm,
        modalCloseBtn,
        modalAddBtn,
        modalCancelBtn,
        modalSaveBtn,
        modalInputLastname,
        modalInputName,
        modalInputSurname,
        modalContact,
        modalContentDown,
        errorBlock
    }
}

