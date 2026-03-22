export function clearLocalstorage(name) {
    localStorage.removeItem( name)
}

export function getItem(name) {
    const saved = localStorage.getItem(name)
    return JSON.parse(saved);
}

export function setItem(name , data) {
     const result = JSON.stringify(data);
     localStorage.setItem(name , result);
     return;
}