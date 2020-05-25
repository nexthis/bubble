interface EventInterface{
  instance:BubbleInterface;
  data: object;
}


interface EventManager{
  events: [Function],
  instance: boolean | BubbleInterface
}

/**
 * Event object that will be passed to callbacks
 * @param instance {bubble} - bubble instance
 * @param data {Object}
 * @returns {Event}
 * @constructor
 */
const Event = function (this:EventInterface, instance:BubbleInterface, data = {}) {
  this.instance = instance;
  this.data = data;

  return this;
} as any;

/**
 * Event manager
 * @param instance {Function/boolean}
 * @constructor
 */
const EventManager = function (this: EventManager, instance: boolean | BubbleInterface = false) {
  ///@ts-ignore
  this.events = {};
  this.instance = instance;
} as any;

/**
 * Event listener for bubble events
 * @param key {String/boolean} - Event name to listen to
 * @param func {Function/boolean} - Function to be called when event happens
 */
EventManager.prototype.on = function (key = false, func = false) {
  if (typeof key === 'boolean' || !func) {
    return false;
  }

  if (!Array.isArray(this.events[key])) {
    this.events[key] = [];
  }

  return this.events[key].push(func);
};

/**
 * Emit an event to bubble.
 * @param key {String/boolean} - Event name to listen to
 * @param data {Object} - Extra data to be passed to the event object that is passed to the event listener.
 */
EventManager.prototype.emit = function (key: string | boolean = false, data = {}) {
  if (typeof key === 'boolean' || !Array.isArray(this.events[key])) {
    return false;
  }

  const evt = new Event(this.instance, data);
  this.events[key].map((fn:any) => fn(evt))
  // foreach(this.events[key], (fn) => fn(evt));
};

export default EventManager;