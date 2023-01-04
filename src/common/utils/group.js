export function getGroupArray(list, attr) {
    const map = new Map();
    list.forEach((item, index, arr) => {
        if (!map.has(item[attr])) {
            map.set(
                item[attr],
                arr.filter(a => a[attr] == item[attr])
            );
        }
    });
    return Array.from(map).map(item => [...item[1]]);
}
// 对象
export function getGroupObject(list, attr) {
    const map = new Map();
    list.forEach((item, index, arr) => {
        if (!map.has(item[attr])) {
            map.set(
                item[attr],
                arr.filter(a => a[attr] == item[attr])
            );
        }
    });
    return Object.fromEntries(Array.from(map).map(item => [item[0], item[1]]));
}