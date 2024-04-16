import { createHeader } from "./createHeader.js";
import { createSection } from "./createSection.js";
import { errorNet } from "./errorBlock.js";
import { renderClient } from "./renderCllient.js";
import { searchClients } from "./searchClient.js";

function createApp() {

  const header = createHeader();
  const section = createSection()
  document.body.append(header, section.main)
  const preloader = document.querySelector('.preloader');
  const tableWrapper = document.querySelector('.table-wrapper');

  try {
    tableWrapper.style.overflow = 'visible';
    renderClient()
    searchClients();
    if(!window.navigator.onLine) {
      errorNet()
    }
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => preloader.classList.add('hidden'), 1500);
    tableWrapper.style.overflow = 'auto';
  }
};

createApp()

export let column = 'id',
  columnDir = false;
const clientList = document.querySelector('.thead'),
  clientListAll = clientList.querySelectorAll('.th-sort')

clientListAll.forEach(function (element) {
  element.addEventListener('click', async function () {
    column = this.dataset.column;
    columnDir = !columnDir;
    element.classList.add('tr__th--active')
    if (column == 'id') {
      if (columnDir == false) {
        element.classList.remove('th-sort--active')
      } else {
        element.classList.add('th-sort--active')
      }
    } else {
      if (columnDir == false) {
        element.classList.add('th-sort--active')
      } else {
        element.classList.remove('th-sort--active')
      }
    }
    document.querySelector('.tbody').innerHTML = ''

    renderClient()
  })
})



window.onoffline = (event) => {
  errorNet()
}


