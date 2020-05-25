import Hammer from 'hammerjs'
import Queue from './queue'
import EventsManager from './events'
import {EVENT_TYPE} from '../index'
import { wait } from '../helpers/wait';

const setupState = (ctx:BubbleInterface) => {
  ctx.queue = new Queue();
  ctx.events = new EventsManager(ctx);
  ctx.resizer = createResizeEvent(ctx);
};


const setupContainer = (ctx:BubbleInterface) =>{
  if(ctx.options.element === null) { return null}
  if(typeof ctx.options.element === 'string' ){
    let element = document.querySelector(ctx.options.element)
    if(element === null) return null;
    ctx.element = element;
  }
  else {
    ctx.element = ctx.options.element;
  }
}


const setupHammerjs = (ctx:BubbleInterface) => {
  ctx.hammerjs = new Hammer(ctx.element as HTMLElement);
  ctx.hammerjs.get('pan').set({ direction: Hammer.DIRECTION_ALL })
}

/**
 * create a resize event that adds recalculate to the event queue;
 * @param ctx {Object} - Macy instance
 */
const createResizeEvent = (ctx:BubbleInterface) => wait(() => {
  ctx.emit(EVENT_TYPE.EVENT_RESIZE);
  // ctx.queue.add(() => ctx.recalculate(true, true));
}, 100);


/**
 * Sets up event listeners for resize and image loading (if required)
 * @param ctx {Object} - Macy instance
 */
const setupEventListeners = (ctx:BubbleInterface) => {

  window.addEventListener('resize', ctx.resizer);
  ctx.hammerjs.on("panleft panright panup pandown", (e) => console.log(e)) 
  ctx.hammerjs.on("tap press", (e) => console.log(e, "tap"))
  ctx.emit(EVENT_TYPE.EVENT_INITIALIZED);
};


const setup = (ctx:BubbleInterface) => {
  setupContainer(ctx)
  setupHammerjs(ctx)
  setupState(ctx)
  setupEventListeners(ctx);
};

export default setup;