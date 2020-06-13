import { EventManager, EVENT_TYPE } from '../eventManager';
import { wait } from './utils';

export const events = (element: HTMLElement, eventManager: EventManager): void => {
    window.addEventListener(
        'resize',
        wait(() => {
            eventManager.emit(EVENT_TYPE.EVENT_RESIZE);
        }, 100),
    );
};
