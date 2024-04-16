import { errorMassage, errorNet} from "./errorBlock.js"

const SERVER_URL = 'http://localhost:3000/api/clients'

export async function serverAddClient(obj) {
  let response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })

  if (!response.ok) {
    errorMassage(response.status)
  } else {
    let date = await response.json()
    return date
  }

}

export async function serverGetClients() {
    let response = await fetch(SERVER_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      errorNet()
    } else {
      let date = await response.json()
      return date
    }
}

export async function serverDeleteClient(id) {
  let response = await fetch(SERVER_URL + '/' + id, {
    method: 'DELETE',
  })
  let date = await response.json()
  return date
}

export async function serverEditClient(obj, id) {
  let response = await fetch(SERVER_URL + '/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
  if (!response.ok) {
    errorMassage(response.status)
  } else {
    let date = await response.json()
    return date
  }
}

export async function findClient(value) {
  let response = await fetch(SERVER_URL + `?search=${value}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  let date = await response.json()
  return date
}
