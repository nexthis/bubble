import { makeBubble, makeEventManager, EVENT_TYPE } from './src';

const element = document.querySelector('.bubble') as HTMLElement;
const eventManager = makeEventManager();
const bubble = makeBubble({ element, eventManager });
