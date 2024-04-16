import { spinerSvg } from "./svg.js";
import { createContactItemByType } from "./utils.js";
import { deleteClient } from "./deleteClient.js";
import { editClientModal } from "./editClient.js";

//Функция отрисовки одного клиента
export function getClientItem(client) {
    const tableRow = document.createElement('tr');
    const idTd = document.createElement('td',);
    const fullNameTd = document.createElement('td');
    const dateTimeTd = document.createElement('td');
    const recentChangeTd = document.createElement('td');
    const contactsTd = document.createElement('td');
    const contactsContentTd = document.createElement('div');
    const actionsTd = document.createElement('td');
    const actionsContentTd = document.createElement('div');
    const editTd = document.createElement('button');
    const deleteTd = document.createElement('button');
    const editClient = editClientModal(client);
    const editSpinner = document.createElement('span');
    const deleteSpinner = document.createElement('span');
    
    

    editSpinner.classList.add('actions__spinner');
    deleteSpinner.classList.add('actions__spinner');
    tableRow.classList.add('tbody__tr', 'tr')
    idTd.classList.add('tr__td')
    fullNameTd.classList.add('tr__td', 'search')
    dateTimeTd.classList.add('tr__td')
    recentChangeTd.classList.add('tr__td')
    contactsTd.classList.add('tr__td')
    contactsContentTd.classList.add('tr__td-contacts', 'contacts')
    actionsTd.classList.add('tr__td')
    actionsContentTd.classList.add('tr__td-actions')
    editTd.classList.add('tr__td-btn', 'btn-reset', 'tr__td-btn-edit')
    deleteTd.classList.add('tr__td-btn', 'btn-reset', 'tr__td-btn-delete')

    idTd.textContent = client.id.substr(0, 6);
    fullNameTd.textContent = getFIO(client);
    dateTimeTd.innerHTML = `${getFormatDate(client.createdAt)} <span class ='tr__td-time'>${getFormatTime(client.createdAt)}</span>`;
    recentChangeTd.innerHTML = `${getFormatDate(client.updatedAt)} <span class ='tr__td-time'>${getFormatTime(client.updatedAt)}</span>`;
    editTd.textContent = 'Изменить'
    deleteTd.textContent = 'Удалить'
    deleteSpinner.innerHTML = spinerSvg();
    editSpinner.innerHTML = spinerSvg();

    editTd.addEventListener('click', function () {
        editSpinner.style.display = 'block';
        editTd.classList.add('actions__wait');
        setTimeout(() => {
            document.body.append(editClient.modal);
            editSpinner.style.display = 'none';
            editTd.classList.remove('actions__wait');
            // editClient.saveBtn.remove()
        }, 500);
    });

    deleteTd.addEventListener('click', function () {
        deleteSpinner.style.display = 'block';
        deleteTd.classList.add('actions__wait');
        const deleteClients = deleteClient(client.id)
        setTimeout(() => {
            document.body.append(deleteClients.modal)
            deleteSpinner.style.display = 'none';
            deleteTd.classList.remove('actions__wait');
        }, 500);
    })

    for (const contact of client.contacts) {
        createContactItemByType(contact.type, contact.value, contactsContentTd);
    }


    const contactOpen = document.createElement('span');
    contactOpen.innerHTML = ` +${((client.contacts).length - 4)}`
    contactOpen.classList.add('contacts__link-open')
    if ((client.contacts).length > 3) {
        contactsContentTd.append(contactOpen)
    }

    contactOpen.addEventListener('click', () => {
        let contactLink = contactsContentTd.getElementsByClassName('contacts__link')
        for (const i of contactLink) {
            i.style.display = 'block'
        }
        contactOpen.remove()
    })

    contactsTd.append(contactsContentTd)
    editTd.append(editSpinner)
    deleteTd.append(deleteSpinner)
    actionsContentTd.append(editTd, deleteTd)
    actionsTd.append(actionsContentTd)
    tableRow.append(idTd, fullNameTd, dateTimeTd, recentChangeTd, contactsTd, actionsTd);

    return tableRow
}


// Функция создания ФИО
export function getFIO(object) {
    return object.surname + ' ' + object.name + ' ' + object.lastName;
}

// Функция форматирования даты
export function getFormatDate(object) {
    var dateString = ("0" + new Date(object).getDate()).slice(-2) + "." + ("0" + (new Date(object).getMonth() + 1)).slice(-2) + "." + new Date(object).getFullYear();
    return dateString
}

// Функция форматирования времени
export function getFormatTime(object) {
    var timeString = ("0" + new Date(object).getHours()).slice(-2) + "." + ("0" + new Date(object).getMinutes()).slice(-2);
    return timeString
}

