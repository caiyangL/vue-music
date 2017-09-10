export function getData (el, name, val) {
    const prefix = 'data-';
    name = prefix + name;

    if (!val) {
        return el.getAttribute(name);
    } else {
        el.setAttribute(el, name, val);
    }
}