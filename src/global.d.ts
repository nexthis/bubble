type ElementType = Element | string;


interface PropsInterface {
  holdFrame: boolean;
  onOpen: (element: Element) => void;
}

interface BubbleOutInterface {
  emit: (key: typeof EVENT_TYPE, data?: object) => void,
  on: (key: typeof EVENT_TYPE, data: object) => void,
}

interface BubbleInterface extends BubbleOutInterface {
  options: PropsInterface & { element: Element | string };
  element: Element;
  hammerjs: HammerManager,
  queue: { run: () => void, add: (event: Function | boolean | [Function]) => void, clear: () => void },
  events: {on: () => void, emmit: () => void},
  resizer: () => void,
}

