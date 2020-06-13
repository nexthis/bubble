import Hammer from 'hammerjs';

import { EventManager, EVENT_TYPE } from '../eventManager';

export const hammerize = (element: HTMLElement, eventManager: EventManager): void => {
    const hammerjs = new Hammer(element);
    hammerjs.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    hammerjs.on('panleft panright panup pandown', (event) => {
        eventManager.emit(EVENT_TYPE.EVENT_MOVE, event);
    });

    hammerjs.on('tap press', (event) => {
        eventManager.emit(EVENT_TYPE.EVENT_TAB, event);
    });

    hammerjs.on('panend pancancel', (event) => {
        eventManager.emit(EVENT_TYPE.EVENT_MOVE_END, event);
    });
};
