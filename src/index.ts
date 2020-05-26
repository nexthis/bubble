
import "./style/index";
import setup from './modules/setup'


const defaults: PropsInterface = {
  holdFrame: true,
  dock: [[5,5],[95,5],[5,95],[95,95]]
};

/**
 * Bubble Factory
 * @param {Element} element - The bubble element.
 * @param {Object} props - The configuration object for bubble.
 */
const Bubble = function (this: BubbleInterface, element: ElementType, props: PropsInterface) {
  /**
  * Create instance of bubble if not instantiated with new Bubble
  */
  if (!(this instanceof Bubble)) {
    ///@ts-ignore
    return new Bubble(element, props)
  }

  ///@ts-ignore
  this.options = {};
  this.isOpen = false;
  Object.assign(this.options, defaults, props, { element });
  setup(this);
};

/**
 * Event listener for bubble events
 * @param key {String} - Event name to listen to
 * @param func {Function} - Function to be called when event happens
 */
Bubble.prototype.on = function (key: typeof EVENT_TYPE, func: Function) {
  this.events.on(key, func);
};

/**
 * Emit an event to bubble.
 * @param key {String} - Event name to listen to
 * @param data {Object} - Extra data to be passed to the event object that is passed to the event listener.
 */
Bubble.prototype.emit = function (key: typeof EVENT_TYPE, data: object) {
  this.events.emit(key, data);
};


export default Bubble;




export enum EVENT_TYPE {
  EVENT_RESIZE = "bubble.resize",
  EVENT_MOVE = "bubble.move",
  EVENT_MOVE_END = "bubble.move.end",
  EVENT_TAB = "bubble.tab",
  EVENT_INITIALIZED = "bubble.initialized",
}