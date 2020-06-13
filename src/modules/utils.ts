export const wait = (func: () => void, delta: number): (() => void) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let to: any;

    return function () {
        if (to) {
            clearTimeout(to);
        }
        to = setTimeout(func, delta);
    };
};
