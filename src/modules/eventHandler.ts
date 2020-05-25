import {EVENT_TYPE} from '../index'
import { wait } from '../helpers/wait';
import {move} from './transform'

/**
 * create a resize event that adds recalculate to the event queue;
 * @param ctx {Object} - bubble instance
 */
export const createResizeEvent = (ctx:BubbleInterface) => wait(() => {
    ctx.emit(EVENT_TYPE.EVENT_RESIZE);
    // ctx.queue.add(() => ctx.recalculate(true, true));
}, 100);

/**
 * create a move event;
 * @param ctx {Object} - bubble instance
 * @param event {Object} - bubble instance
 */
export const createMoveEvent = (event: HammerInput,ctx:BubbleInterface) => {
    ctx.emit(EVENT_TYPE.EVENT_MOVE);
    move(ctx.element, event.center )
}
