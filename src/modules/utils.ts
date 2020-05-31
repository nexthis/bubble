export const wait = (func: Function, delta: number) => {
  let to: any;

  return function() {
    if (to) {
      clearTimeout(to);
    }

    to = setTimeout(func, delta);
  };
};
