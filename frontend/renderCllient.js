import { getClientItem } from "./createClient.js";
import { serverGetClients } from "./clientApi.js";
import { column, columnDir } from "./script.js";
import { sortStudent } from "./sort.js";
import { errorNet } from "./errorBlock.js";

//Фунцкия отрисовки всех клиентов
export async function renderClient() {
    try {
        let clients = await serverGetClients();
        clients = sortStudent(column, columnDir, clients)
        for (const client of clients) {
            document.querySelector('.tbody').append(getClientItem(client));
        }

    } catch (error) {
        errorNet()
    }
}
