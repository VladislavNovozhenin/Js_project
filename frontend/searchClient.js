import { findClient } from "./clientApi.js";
import { getClientItem } from "./createClient.js";
import { renderClient } from "./renderCllient.js";

//Функция поиска клиентов
export function searchClients() {
  const input = document.querySelector('.header__form-input');
  let interval;
  async function rewriteTable(str) {
    const response = await findClient(str);
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';

    for (const client of response) {
      tbody.append(getClientItem(client));
    }
  }

  input.addEventListener('input', async function () {
    if (interval) {
      clearTimeout(interval);
    }
    interval = setTimeout(dataInput, 300);
  })

  function dataInput() {
    const preloader = document.querySelector('.preloader');
    const tableWrapper = document.querySelector('.table-wrapper');

    const value = input.value.trim();
    if (value !== '') {
      preloader.classList.remove('hidden')
      try {
        tableWrapper.style.overflow = 'visible';
        rewriteTable(value);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => preloader.classList.add('hidden'), 300);
        tableWrapper.style.overflow = 'auto';
      }
    } else {
      preloader.classList.remove('hidden')
      try {
        tableWrapper.style.overflow = 'visible';
        document.querySelector('.tbody').innerHTML = '';
        renderClient()
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => preloader.classList.add('hidden'), 300);
        tableWrapper.style.overflow = 'auto';
      }
    }
  }
}
