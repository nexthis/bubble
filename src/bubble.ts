import './style/index';
import { move, dock, toggleMenu, menuClose, dockTo } from './modules/transform';
import { EVENT_TYPE, MoveEvent, TabEvent, MoveEndEvent, EventManager } from './eventManager';
import { hammerize } from './modules/hammerize';
import { events } from './modules/events';

const defaultProps: {
    holdFrame: boolean;
    dock: Array<[number, number]>;
    dockInitial: [number, number];
    open: boolean;
} = {
    holdFrame: true,
    dock: [
        [5, 5],
        [95, 5],
        [5, 95],
        [95, 95],
    ],
    dockInitial: [5, 5],
    open: false,
};

type Bubble = {
    options: typeof defaultProps & { element: HTMLElement };
    state: { isOpen: boolean; dock: [number, number] };
    element: HTMLElement;
};

type BubbleParams = {
    element: HTMLElement;
    props?: Partial<typeof defaultProps>;
    eventManager: EventManager;
};

export const makeBubble = ({ element, eventManager, props = {} }: BubbleParams): Bubble => {
    const bubble: Omit<Bubble, 'events'> = {
        options: { ...defaultProps, ...props, element },
        state: { isOpen: defaultProps.open, dock: defaultProps.dockInitial },
        element,
    };

    hammerize(element, eventManager);
    events(element, eventManager);
    dockTo(element, { x: bubble.options.dockInitial[0], y: bubble.options.dockInitial[1] });

    eventManager.on(EVENT_TYPE.EVENT_RESIZE, () => {
        bubble.state.dock = dock(bubble.element, null, bubble.options.dock);
        if (bubble.state.isOpen) {
            toggleMenu(bubble.element, bubble.state.isOpen, bubble.state.dock);
        }
    });

    eventManager.on<MoveEvent>(EVENT_TYPE.EVENT_MOVE, (event) => {
        if (bubble.state.isOpen) {
            bubble.state.isOpen = !bubble.state.isOpen;
            menuClose(element, element.querySelectorAll('.bubble__menu-item'), [0, 0], false);
        }
        move(element, event.center);
    });

    eventManager.on<TabEvent>(EVENT_TYPE.EVENT_TAB, () => {
        bubble.state.isOpen = !bubble.state.isOpen;
        toggleMenu(element, bubble.state.isOpen, bubble.state.dock);
    });

    eventManager.on<MoveEndEvent>(EVENT_TYPE.EVENT_MOVE_END, (event) => {
        bubble.state.dock = dock(bubble.element, event.center, bubble.options.dock);
    });

    eventManager.emit(EVENT_TYPE.EVENT_INITIALIZED);

    return bubble;
};
