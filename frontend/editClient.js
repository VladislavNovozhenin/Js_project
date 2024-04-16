import { addClient } from "./addClient.js";
import { deleteClient } from "./deleteClient.js";
import { serverEditClient } from "./clientApi.js";
import { createContact } from "./createContact.js";
import { validation } from "./validate.js";
import { validateClientContact } from "./validateContact.js";
import { renderClient } from "./renderCllient.js";
import { spinerSvg } from "./svg.js";
import { errorNet } from "./errorBlock.js";


//Функция создания модального окна изменения клиента
export function editClientModal(data) {
    const createClient = addClient();
    const modalForm = createClient.modalForm
    const modal = createClient.modal
    const saveBtn = createClient.modalSaveBtn
    const titleId = document.createElement('span');
    const btnSave = document.createElement('button');
    const svgSpiner = document.createElement('span')

    titleId.classList.add('modal__id')
    btnSave.classList.add('modal__save-btn', 'btn-reset')
    svgSpiner.classList.add('modal-spiner')

    createClient.modalSubtitle.textContent = 'Изменить данные';
    createClient.modalCancelBtn.textContent = 'Удалить клиента';
    titleId.textContent = 'ID: ' + data.id.substr(0, 6);
    createClient.modalInputName.value = data.name;
    createClient.modalInputSurname.value = data.surname;
    createClient.modalInputLastname.value = data.lastName;
    btnSave.textContent = 'Сохранить'
    btnSave.type = 'submit'
    svgSpiner.innerHTML = spinerSvg()

    saveBtn.remove()

    createClient.modalCancelBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const deleteModal = deleteClient(data.id);
        document.body.append(deleteModal.modal);
    });
    createClient.modalCloseBtn.addEventListener('click', function () {
        modal.remove();
    });

    for (const contact of data.contacts) {
        const createContacts = createContact();
        createContacts.contactName.textContent = contact.type;
        createContacts.contactInput.value = contact.value;
        createClient.modalContact.prepend(createContacts.contact);
        createClient.modalContact.classList.add('modal__contact--active')
    }

    if (data.contacts.length == 10) {
        createClient.modalAddBtn.classList.remove('modal__btn-contact--active');
    }

    btnSave.addEventListener('click', async function (e) {
        e.preventDefault();
        if (validation() == true) {

            const contactTypes = document.querySelectorAll('.contact__name');
            const contactValues = document.querySelectorAll('.contact__input');
            let contacts = [];

            for (let i = 0; i < contactTypes.length; i++) {
                if (!validateClientContact(contactValues[i])) {
                    return;
                }
                contacts.push({
                    type: contactTypes[i].innerHTML,
                    value: contactValues[i].value
                });
            }
            let client = {
                name: createClient.modalInputName.value,
                surname: createClient.modalInputSurname.value,
                lastName: createClient.modalInputLastname.value,
                contacts: contacts,
            }

            const spinner = document.querySelector('.modal-spiner');

            try {
                spinner.style.display = 'block';
                await serverEditClient(client, data.id);
                setTimeout(async function () {
                    document.querySelector('.tbody').innerHTML = ''
                    renderClient()
                    createClient.modal.remove()
                }, 500);
            } catch (error) {
                errorNet()
            } finally {
                setTimeout(() => spinner.style.display = 'none', 500);
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.remove()
        }
    })

    createClient.modalSubtitle.append(titleId);
    btnSave.append(svgSpiner)
    createClient.modalContentDown.prepend(btnSave)
    return {
        modal,
        modalForm,
        saveBtn
    }
} 