import Queue from './queue'
import EventsManager from './events'
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


/**
 * create a resize event that adds recalculate to the event queue;
 * @param ctx {Object} - Macy instance
 */
const createResizeEvent = (ctx:BubbleInterface) => wait(() => {
  ctx.emit(EVENT_TYPE.EVENT_RESIZE);
  ctx.queue.add(() => ctx.recalculate(true, true));
}, 100);


const setup = (ctx:BubbleInterface) => {
  setupContainer(ctx)
  setupState(ctx)
};

export default setup;