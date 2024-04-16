
//Функция сортировки
export function sortStudent(prop, dir, array) {
    if (prop) {
      return array.sort(function (a, b) {
        let dirIf = a[prop] < b[prop];
        if (dir == true) dirIf = a[prop] > b[prop]
        if (dirIf == true) return -1;
      });
    } else {
      return array
    }
}
