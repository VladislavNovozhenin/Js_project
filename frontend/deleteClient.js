import { closeModalSvg, spinerSvg } from "./svg.js";
import { serverDeleteClient } from "./clientApi.js";
import { renderClient } from "./renderCllient.js";

//Функция создания модального окна удаления клиента
export function deleteClient(id) {
    const modal = document.createElement('div')
    const modalContent = document.createElement('div')
    const modalSubtitle = document.createElement('h2')
    const modalCloseBtn = document.createElement('button')
    const modalDescr = document.createElement('p')
    const modalDeleteBtn = document.createElement('button')
    const modalCancelBtn = document.createElement('button')
    const svgSpiner = document.createElement('span')

    modal.classList.add('modal')
    modalContent.classList.add('modal__content-delete')
    modalSubtitle.classList.add('modal__subtitle-delete')
    modalCloseBtn.classList.add('modal__close-btn', 'btn-reset')
    modalDescr.classList.add('modal__descr-delete')
    modalDeleteBtn.classList.add('modal__delete-btn', 'btn-reset')
    modalCancelBtn.classList.add('modal__cancel-btn', 'btn-reset')
    svgSpiner.classList.add('modal-spiner')

    modalSubtitle.textContent = 'Удалить клиента'
    modalCloseBtn.innerHTML = `${closeModalSvg()}`
    modalDescr.textContent = 'Вы действительно хотите удалить данного клиента?'
    modalDeleteBtn.textContent = 'Удалить'
    modalCancelBtn.textContent = 'Отмена'
    svgSpiner.innerHTML = spinerSvg()

    modalDeleteBtn.addEventListener('click', async function () {

        try {
            svgSpiner.style.display = 'block';
            await serverDeleteClient(id)
            setTimeout(async function () {
                document.querySelector('.tbody').innerHTML = ''
                renderClient()
                modal.remove()
            }, 500);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => svgSpiner.style.display = 'none', 500);
        }
    })
    modalCloseBtn.addEventListener('click', function () {
        modal.remove()
    })

    modalCancelBtn.addEventListener('click', function () {
        modal.remove()
    })

    document.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.remove()
        }
    })

    modalDeleteBtn.append(svgSpiner)
    modalContent.append(modalSubtitle)
    modalContent.append(modalCloseBtn)
    modalContent.append(modalDescr)
    modalContent.append(modalDeleteBtn)
    modalContent.append(modalCancelBtn)
    modal.append(modalContent)

    return {
        modal,
        modalDeleteBtn,
        svgSpiner
    }
}