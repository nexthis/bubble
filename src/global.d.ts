

type ElementType = HTMLElement | string;


interface PropsInterface {
  holdFrame: boolean;
  dock: Array<[number, number]>;
}

interface BubbleOutInterface {
  emit: (key: typeof EVENT_TYPE, data?: object) => void,
  on: (key: typeof EVENT_TYPE, data: object) => void,
}

interface BubbleInterface extends BubbleOutInterface {
  options: PropsInterface & { element: HTMLElement | string };
  element: HTMLElement;
  hammerjs: HammerManager,
  queue: { run: () => void, add: (event: Function | boolean | [Function]) => void, clear: () => void },
  events: {on: () => void, emmit: () => void},
  isOpen: boolean,
}

