export const enum EVENT_TYPE {
  EVENT_RESIZE = "bubble.resize",
  EVENT_MOVE = "bubble.move",
  EVENT_MOVE_END = "bubble.move.end",
  EVENT_TAB = "bubble.tab",
  EVENT_INITIALIZED = "bubble.initialized"
}

export type HammerEvent = HammerInput;

export type ResizeEvent = {
  key: EVENT_TYPE.EVENT_RESIZE;
  data: undefined;
};

export type MoveEvent = {
  key: EVENT_TYPE.EVENT_MOVE;
  data: HammerEvent;
};

export type MoveEndEvent = {
  key: EVENT_TYPE.EVENT_MOVE_END;
  data: HammerEvent;
};

export type TabEvent = {
  key: EVENT_TYPE.EVENT_TAB;
  data: HammerEvent;
};

export type InitializedEvent = {
  key: EVENT_TYPE.EVENT_INITIALIZED;
  data: undefined;
};

type Event =
  | ResizeEvent
  | MoveEvent
  | MoveEndEvent
  | TabEvent
  | InitializedEvent;

export const makeEventManager = () => {
  const subscriptions: {
    [key: string]: Function[];
  } = {};
  return {
    on: <T extends Event>(
      key: T["key"],
      callback: (data: T["data"]) => void
    ) => {
      subscriptions[key] = (subscriptions[key] || []).concat(callback);
    },
    emit: <T extends Event>(key: T["key"], data: T["data"] = undefined) => {
      const callbacks = subscriptions[key] || [];
      callbacks.forEach(callback => callback(data));
    }
  };
};

export type EventManager = ReturnType<typeof makeEventManager>;
