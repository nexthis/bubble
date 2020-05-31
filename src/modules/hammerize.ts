import Hammer from "hammerjs";

import { EventManager, EVENT_TYPE } from "../eventManager";
import { wait } from "./utils";

export const hammerize = (element: HTMLElement, eventManager: EventManager) => {
  const hammerjs = new Hammer(element);
  hammerjs.get("pan").set({ direction: Hammer.DIRECTION_ALL });

  window.addEventListener(
    "resize",
    wait(() => {
      eventManager.emit(EVENT_TYPE.EVENT_RESIZE);
    }, 100)
  );

  hammerjs.on("panleft panright panup pandown", event => {
    eventManager.emit(EVENT_TYPE.EVENT_MOVE, event);
  });

  hammerjs.on("tap press", event => {
    eventManager.emit(EVENT_TYPE.EVENT_TAB, event);
  });

  hammerjs.on("panend pancancel", event => {
    eventManager.emit(EVENT_TYPE.EVENT_MOVE_END, event);
  });
};
