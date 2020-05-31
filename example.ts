import { makeBubble, makeEventManager, EVENT_TYPE } from "./src";

const element = document.querySelector(".bubble") as HTMLElement;
const eventManager = makeEventManager();
const bubble = makeBubble({ element, eventManager });

console.log(bubble);
eventManager.on(EVENT_TYPE.EVENT_INITIALIZED, () => {
  console.log("assd1");
});
eventManager.on(EVENT_TYPE.EVENT_RESIZE, () => {
  console.log("assd2");
});
