export function debounce(func, delay) {
    //防抖
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
            // func();
        }, delay);
    };
}