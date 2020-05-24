type ElementType = Element | string;

declare enum EVENT_TYPE {
  EVENT_RESIZE = "bubble.resize"
}

interface PropsInterface {
  holdFrame: boolean;
  onOpen: (element: Element) => null;
}


interface BubbleInterface {
  options: PropsInterface & { element: Element | string };
  element: Element;
  emit: (key: typeof EVENT_TYPE, data?:object) => null,
  on: (key:typeof EVENT_TYPE, data:object) => null,
}


