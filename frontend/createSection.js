import { addClient } from "./addClient.js";
import { upSvg, downSvg, addClientSvg } from "./svg.js";
import { createPreloader } from "./preloader.js";

//Создание section
export function createSection() {
  const main = document.createElement('main');
  const section = document.createElement('section');
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const tableWrapper = document.createElement('div');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tableRow = document.createElement('tr');
  const idTh = document.createElement('th');
  const fullNameTh = document.createElement('th');
  const fullNameThContent = document.createElement('span')
  const dateTimeTh = document.createElement('th');
  const recentChangeTh = document.createElement('th');
  const contactsTh = document.createElement('th');
  const actionsTh = document.createElement('th');
  const tbody = document.createElement('tbody');
  const blockAdd = document.createElement('button')

  section.classList.add('section')
  container.classList.add('section__container', 'container')
  thead.classList.add('table__thead', 'thead')
  tbody.classList.add('table__tbody', 'tbody')
  table.classList.add('section__table', 'table')
  tableWrapper.classList.add('table-wrapper')
  title.classList.add('section__title')
  tableRow.classList.add('thead__tr', 'tr')
  idTh.classList.add('tr__th', 'th-sort')
  fullNameTh.classList.add('tr__th', 'th-sort')
  dateTimeTh.classList.add('tr__th', 'th-sort')
  recentChangeTh.classList.add('tr__th', 'th-sort')
  contactsTh.classList.add('tr__th')
  actionsTh.classList.add('tr__th')
  blockAdd.classList.add('section__btn', 'btn-reset')

  title.textContent = 'Клиенты'
  idTh.innerHTML = `ID${upSvg()}`;
  idTh.dataset.column = 'id'
  fullNameTh.innerHTML = `Фамилия Имя Отчество${downSvg()}`;
  fullNameThContent.textContent = 'А-Я'
  fullNameTh.dataset.column = 'surname'
  dateTimeTh.innerHTML = `Дата и время создания${downSvg()}`;
  dateTimeTh.dataset.column = 'createdAt'
  recentChangeTh.innerHTML = `Последние изменения${downSvg()}`;
  recentChangeTh.dataset.column = 'updatedAt'
  contactsTh.textContent = 'Контакты'
  actionsTh.textContent = 'Действия'
  blockAdd.innerHTML = `${addClientSvg()}Добавить клиента`

  blockAdd.addEventListener('click', function () {
    const createClient = addClient()
    document.body.append(createClient.modal)
  })

  fullNameTh.append(fullNameThContent);
  tableRow.append(
    idTh,
    fullNameTh,
    dateTimeTh,
    recentChangeTh,
    contactsTh,
    actionsTh
  )

  thead.append(tableRow);
  table.append(thead, tbody);
  tableWrapper.append(table, createPreloader());
  container.append(title, tableWrapper, blockAdd);
  section.append(container);
  main.append(section);

  return {
    main,
    table,
    tbody
  }
}
